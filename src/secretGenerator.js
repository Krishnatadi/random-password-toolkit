const crypto = require('crypto');

/**
 * Generate one password/secret with the given options.
 * @param {Object} options - Configuration options for the generator.
 * @returns {string} - The generated secret.
 */
const generate = (options = {}) => {
  const {
    length = 10,
    numbers = false,
    symbols = false,
    lowercase = true,
    uppercase = true,
    excludeSimilarCharacters = false,
    exclude = '',
    strict = false,
  } = options;

  if (!numbers && !symbols && !lowercase && !uppercase) {
    throw new Error('At least one of numbers, symbols, lowercase, or uppercase must be true.');
  }

  const numberChars = '0123456789';
  const symbolChars = typeof symbols === 'string' ? symbols : '!@#$%^&*()_+[]{}|;:,.<>?';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let characterPool = '';
  if (numbers) characterPool += numberChars;
  if (symbols) characterPool += symbolChars;
  if (lowercase) characterPool += lowercaseChars;
  if (uppercase) characterPool += uppercaseChars;

  // Exclude similar characters
  if (excludeSimilarCharacters) {
    characterPool = characterPool.replace(/[ilLI|oO0]/g, '');
  }

  // Exclude specified characters
  if (exclude) {
    const excludeSet = new Set(exclude.split(''));
    characterPool = [...characterPool].filter((char) => !excludeSet.has(char)).join('');
  }

  if (characterPool.length === 0) {
    throw new Error('Character pool is empty. Please check your options.');
  }

  const secret = Array.from({ length }, () =>
    characterPool.charAt(crypto.randomInt(0, characterPool.length))
  );

  if (strict) {
    const pools = [];
    if (numbers) pools.push(numberChars);
    if (symbols) pools.push(symbolChars);
    if (lowercase) pools.push(lowercaseChars);
    if (uppercase) pools.push(uppercaseChars);

    pools.forEach((pool) => {
      secret[crypto.randomInt(0, secret.length)] = pool.charAt(crypto.randomInt(0, pool.length));
    });
  }

  return secret.join('');
};

/**
 * Bulk generate multiple secrets with the same options.
 * @param {number} amount - Number of secrets to generate.
 * @param {Object} options - Configuration options for the generator.
 * @returns {string[]} - Array of generated secrets.
 */
const generateMultiple = (amount, options = {}) => {
  if (amount <= 0) throw new Error('Amount must be greater than 0.');
  return Array.from({ length: amount }, () => generate(options));
};

/**
 * Generate a pronounceable password.
 * @param {number} length - Length of the password.
 * @returns {string} - The generated pronounceable password.
 */
function generatePronounceablePassword(length = 10) {
  const vowels = 'aeiouAEIOU';
  const consonants = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';
  const digits = '0123456789';
  let password = '';

  let useVowel = true;  // Start with a vowel
  let charSet = vowels + consonants;  // By default, mix vowels and consonants

  // Create a pronounceable password with some randomness
  for (let i = 0; i < length; i++) {
    let char = '';
    
    if (useVowel) {
      char = vowels.charAt(crypto.randomInt(0, vowels.length));  // Pick a vowel
    } else {
      char = consonants.charAt(crypto.randomInt(0, consonants.length));  // Pick a consonant
    }

    // Randomly insert digits for added complexity, without disturbing pronounceability
    if (crypto.randomInt(0, 5) === 0 && (i > 1 && i < length - 2)) {  // Avoid inserting too early or late
      char = digits.charAt(crypto.randomInt(0, digits.length));  // Add a digit
    }

    password += char;
    useVowel = !useVowel;  // Alternate between vowels and consonants
  }

  return password;
}

/**
 * Generate a password with a custom character pool.
 * @param {number} length - Length of the password.
 * @param {string} customPool - Custom set of characters to draw from.
 * @returns {string} - The generated password.
 */
function generateWithCustomPool(length = 10, customPool = '') {
  if (!customPool) {
    throw new Error('Custom character pool must not be empty.');
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += customPool.charAt(crypto.randomInt(0, customPool.length));
  }

  return password;
}

/**
 * Generate a random number within a given range.
 * @param {number} min - The minimum value for the random number.
 * @param {number} max - The maximum value for the random number.
 * @param {number} length - Length of the number (total digits).
 * @returns {string} - The generated random number as a string.
 */
function generateRandomNumber(min = 0, max = 1000, length = 4) {
  if (min >= max) {
    throw new Error('Max value must be greater than min value.');
  }
  
  // Generate random number within range
  let randomNumber = crypto.randomInt(min, max + 1).toString();

  // Ensure the length of the generated number is as expected
  while (randomNumber.length < length) {
    randomNumber = '0' + randomNumber;  // Pad with leading zeros
  }

  return randomNumber.slice(0, length);  // Return number with exact length
}


/**
 * Generate a temporary OTP (One-Time Password) with the specified length.
 * @param {number} length - The length of the OTP. Default is 6 digits.
 * @returns {string} - The generated OTP.
 * @throws {Error} - If the length is less than 1.
 */
function generateOTP(length = 6) {
  if (length < 1) throw new Error('Length must be a positive integer.');

  const otp = crypto.randomInt(10 ** (length - 1), 10 ** length);  // Generate OTP in range
  return otp.toString();  // Return OTP as a string
}


/**
 * Generate a random API key with the specified number of bytes.
 * @param {number} length - The length of the API key in bytes. Default is 32 bytes.
 * @returns {string} - The generated API key in hexadecimal format.
 */
function generateApiKey(length = 32) {
  const apiKey = crypto.randomBytes(length).toString('hex');  // Generate random bytes and convert to hex
  return apiKey;  // Return API key
}

module.exports = { generate, generateMultiple, generatePronounceablePassword, generateWithCustomPool, generateRandomNumber, generateOTP, generateApiKey };
