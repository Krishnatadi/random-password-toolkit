const crypto = require('crypto');

// Key and IV (Initialization Vector) settings
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16); // 128-bit IV

function encryptPassword(password) {
    // Using the predefined key and IV
    const cipher = crypto.createCipheriv(algorithm, key, iv); // create cipher object with key and iv
    let encrypted = cipher.update(password, 'utf8', 'hex'); // encrypt password in hex format
    encrypted += cipher.final('hex'); // finalize encryption
  
    // Return both the encrypted password and the iv (in hexadecimal format)
    return {
      encryptedPassword: encrypted,
      iv: iv.toString('hex') // return the IV in hexadecimal format
    };
}

function decryptPassword(encryptedPassword, ivHex) {
    // Convert IV from hexadecimal string back to buffer
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encryptPassword, decryptPassword };
