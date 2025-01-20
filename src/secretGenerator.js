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


module.exports = { generate, generateMultiple, generatePronounceablePassword, generateWithCustomPool };
