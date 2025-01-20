# Random Password Toolkit

> **Random Password Toolkit** is a robust package for generating and managing random passwords with advanced functionalities such as encryption, decryption, strength checking, and customizable options. This toolkit is perfect for developers looking for a secure and feature-rich solution to handle password-related tasks in their applications.

---

## Features

- **Random Password Generation**: Generate strong and secure passwords.
- **Generate Multiple Passwords**: Create multiple passwords in bulk.
- **Pronounceable Passwords**: Generate passwords that are easier to read and pronounce.
- **Custom Password Generation**: Create passwords using a custom pool of characters.
- **Password Strength Checker**: Evaluate the strength of passwords with actionable feedback.
- **Password Encryption**: Secure passwords with AES-256 encryption.
- **Password Decryption**: Decrypt encrypted passwords safely.
- **Customizable Options**: Fully customizable password generation settings.

---

## Benefits

- **Security**: Generate highly secure passwords to protect sensitive data.
- **Flexibility**: Customize password generation to suit any application.
- **Ease of Use**: Simple and intuitive API.
- **Compatibility**: Works seamlessly with JavaScript and TypeScript projects.
- **Encryption & Decryption**: Securely store and retrieve passwords.

---


## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):


Install the package using npm/yarn:

```bash
npm install random-password-toolkit
```
or
```bash
yarn add random-password-toolkit
```


---

## Options

The following options can be used with the password generation functions:

| Option                  | Type     | Description                                             | Default |
|-------------------------|----------|---------------------------------------------------------|---------|
| `length`                | Integer  | Length of the password.                                 | `10`    |
| `numbers`               | Boolean  | Include numbers in the password.                        | `false` |
| `symbols`               | Boolean  | Include symbols in the password.                        | `false` |
| `lowercase`             | Boolean  | Include lowercase letters.                              | `true`  |
| `uppercase`             | Boolean  | Include uppercase letters.                              | `true`  |
| `excludeSimilarCharacters` | Boolean  | Exclude similar characters (e.g., 'i', 'l').         | `false` |
| `exclude`               | String   | Characters to exclude from the password.                | `''`    |
| `strict`                | Boolean  | Enforce at least one character from each pool.          | `false` |

---

## Usage

### Importing the Package

```javascript
const {
  generate,
  generateMultiple,
  generatePronounceablePassword,
  generateWithCustomPool,
  checkPasswordStrength,
  encryptPassword,
  decryptPassword
} = require('random-password-toolkit');
```

---

### 1. Generate a Random Password

Generate a single random password with customizable options:
```javascript
const passwords = generate(5);
console.log(passwords);
// Output: yKsmtgtDsJ
```

```javascript
const password = generate({
  length: 12,
  numbers: true,
  symbols: true,
  uppercase: true,
  strict: true
});
console.log(password);
// Output: @D8cP#9Zr2&f
```

---

### 2. Generate Multiple Passwords

Generate multiple passwords at once:
```javascript
const passwords = generateMultiple(5);
console.log(passwords);
// Output: ['g8sFwLp4Rx', 'pR2zT9qMf7', ...]
```

```javascript
const password = generateMultiple({
  length: 12,
  numbers: true,
  symbols: true,
  uppercase: true,
  strict: true
});
console.log(password);
// Output: ['Fi:G+D1oTU','jec*<KSP:3','Z@ie>^]n7Q','6&J4O12}e?','K$9J|xDv|Y']
```

---

### 3. Generate Pronounceable Passwords

Create passwords that are easier to pronounce:

```javascript
const pronounceablePassword = generatePronounceablePassword(8);
console.log(pronounceablePassword);
// Output: bolozuna
```

---

### 4. Generate Password with Custom Pool

Generate passwords using a specific set of characters:

```javascript
const customPassword = generateWithCustomPool(8, 'abcd');
console.log(customPassword);
// Output: 2c1ea3fb
```

---

### 5. Check Password Strength

Evaluate the strength of a password:

```javascript
const strength = checkPasswordStrength('MyP@ssword123');
console.log(strength);
// Output: Very Strong
```

---

### 6. Encrypt a Password**

Securely encrypt a password:

```javascript
const encryptedData = encryptPassword('MySecurePassword');
console.log('Encrypted Password:', encryptedData.encryptedPassword);
console.log('IV:', encryptedData.iv);
/* Output:
Encrypted Password: 7de8fc05ab01ed48605fa1983c830e98e13716f507b59bbf1203f7f1361ee497
IV: dc23c48d84eed6b07d89c479af6c5845*/
```

---

### 7. Decrypt a Password

Decrypt an encrypted password:

```javascript
// Decrypt the password using the returned IV
const decryptedPassword = decryptPassword(encryptedData.encryptedPassword, encryptedData.iv);
console.log('Decrypted Password:', decryptedPassword);
// Output: MySecurePassword
```

---
### 8. Test generating zero secrets

Test generating zero secrets

```javascript
try {
    console.log(generateMultiple(0));
  } catch (error) {
    console.error(error.message); // Expected: 'Amount must be greater than 0.'
  }
```

---

## Community and Ecosystem

By using **Random Password Toolkit**, you are joining a growing community of developers who are passionate about secure passwords and encryption. We encourage you to share your experiences, ideas, and feedback on GitHub Discussions or any community platform of your choice.

- **GitHub Discussions**: Share use cases, report bugs, and suggest features.

We'd love to hear from you and see how you're using **Random Password Toolkit** in your projects!


## Issues and Feedback
For issues, feedback, and feature requests, please open an issue on our [GitHub Issues page](http://github.com/krishnatadi/random-password-toolkit/issues). We actively monitor and respond to community feedback.



---

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Krishnatadi/random-password-toolkit/blob/main/LICENSE) file for details.