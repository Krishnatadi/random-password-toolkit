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
  export function generateMultiple(count: number, options?: GenerateOptions): string[];
  export function generatePronounceablePassword(length?: number): string;
  export function generateWithCustomPool(pool: string, length: number, strict?: boolean): string;
  export function checkPasswordStrength(password: string): PasswordStrengthResult;
  export function encryptPassword(password: string): string;
  export function decryptPassword(encryptedPassword: string): string;
  