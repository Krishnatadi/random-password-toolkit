// Type definitions for random-password-toolkit

export interface GenerateOptions {
  length?: number; // Length of the password (default: 10)
  numbers?: boolean; // Include numbers (default: false)
  symbols?: boolean; // Include symbols (default: false)
  lowercase?: boolean; // Include lowercase letters (default: true)
  uppercase?: boolean; // Include uppercase letters (default: true)
  excludeSimilarCharacters?: boolean; // Exclude similar characters (default: false)
  exclude?: string; // Characters to exclude (default: '')
  strict?: boolean; // Enforce at least one character from each pool (default: false)
}

export interface PasswordStrengthResult {
  score: number; // Strength score (e.g., 0–4)
  feedback: {
    warning: string; // Warning message for weak passwords
    suggestions: string[]; // Suggestions for improving the password
  };
}

export function generate(options?: GenerateOptions): string;

/**
* Bulk generate multiple secrets with the same options.
* @param count - Number of secrets to generate.
* @param options - Configuration options for the generator.
* @returns Array of generated secrets.
*/
export function generateMultiple(count: number, options?: GenerateOptions): string[];

/**
* Generate a pronounceable password.
* @param length - Length of the generated password.
* @returns The generated password.
*/
export function generatePronounceablePassword(length?: number): string;

/**
* Generate a password with a custom pool of characters.
* @param pool - Custom character pool for password generation.
* @param length - Length of the generated password.
* @param strict - Whether to ensure all character types are included.
* @returns The generated password.
*/
export function generateWithCustomPool(pool: string, length: number, strict?: boolean): string;

/**
* Generate a random number between a specified range and length.
* @param min - The minimum number (inclusive).
* @param max - The maximum number (inclusive).
* @param length - The length of the number.
* @returns The generated random number as a string.
*/
export function generateRandomNumber(min: number, max: number, length: number): string;

/**
* Check the strength of a password.
* @param password - The password to check.
* @returns The result of the password strength check.
*/
export function checkPasswordStrength(password: string): PasswordStrengthResult;

/**
* Encrypt a password.
* @param password - The password to encrypt.
* @returns The encrypted password.
*/
export function encryptPassword(password: string): string;

/**
* Decrypt a password.
* @param encryptedPassword - The encrypted password to decrypt.
* @returns The decrypted password.
*/
export function decryptPassword(encryptedPassword: string): string;

export function generateOTP(length: number): string;
export function generateApiKey(length: number): string;
