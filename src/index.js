const { generate, generateMultiple, generatePronounceablePassword, generateWithCustomPool, generateRandomNumber, generateOTP, generateApiKey } = require('./secretGenerator')
const { checkPasswordStrength } = require('./secretStrengthChecker');
const { encryptPassword, decryptPassword } = require('./encryptedSecrets');



module.exports = {
  generate,
  generateMultiple,
  generatePronounceablePassword,
  generateWithCustomPool,
  generateRandomNumber,
  generateOTP, 
  generateApiKey,
  checkPasswordStrength,
  encryptPassword,
  decryptPassword
};
