function checkPasswordStrength(password) {
    let isLengthSufficient = false;
    let hasDigits = false;
    let hasLowercaseLetters = false;
    let hasUppercaseLetters = false;
    let hasSpecialCharacters = false;
  
    // Check if password length is sufficient (>= 12)
    if (password.length >= 12) {
      isLengthSufficient = true;
    }
  
    // Check if password contains at least one digit
    for (let i = 0; i < password.length; i++) {
      if (!hasDigits && /\d/.test(password[i])) {
        hasDigits = true;
      }
    }
  
    // Check if password contains at least one lowercase letter
    for (let i = 0; i < password.length; i++) {
      if (!hasLowercaseLetters && /[a-z]/.test(password[i])) {
        hasLowercaseLetters = true;
      }
    }
  
    // Check if password contains at least one uppercase letter
    for (let i = 0; i < password.length; i++) {
      if (!hasUppercaseLetters && /[A-Z]/.test(password[i])) {
        hasUppercaseLetters = true;
      }
    }
  
    // Check if password contains at least one special character
    for (let i = 0; i < password.length; i++) {
      if (!hasSpecialCharacters && /[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password[i])) {
        hasSpecialCharacters = true;
      }
    }
  
    // Count the number of criteria met
    let criteriaMet = 0;
    if (isLengthSufficient) criteriaMet++;
    if (hasDigits) criteriaMet++;
    if (hasLowercaseLetters) criteriaMet++;
    if (hasUppercaseLetters) criteriaMet++;
    if (hasSpecialCharacters) criteriaMet++;
  
    // Determine password strength based on criteria met
    let passwordStrength = 'Weak';
    if (criteriaMet === 5) {
      passwordStrength = 'Very Strong';
    } else if (criteriaMet === 4) {
      passwordStrength = 'Strong';
    } else if (criteriaMet === 3) {
      passwordStrength = 'Moderate';
    }
  
    return passwordStrength;
  }
  

module.exports = { checkPasswordStrength };
  