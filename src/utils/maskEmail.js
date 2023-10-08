function maskString(input) {
    if (input.length < 9) {
      return input; // If the string is too short to mask, return it as is.
    }
    const firstFour = input.slice(0, 4);
    const lastFour = input.slice(-4);
    const maskedChars = '*'.repeat(input.length - 8); // Leave 4 characters unmasked at the beginning and 4 at the end
    const maskedString = firstFour + maskedChars + lastFour;
    
    return maskedString;
}
  
export const maskEmail = (email) => {
    const atIndex = email.indexOf('@');
    if (atIndex > 0) {
        const username = email.slice(0, atIndex);
        const domain = email.slice(atIndex);
        const maskedUsername = maskString(username);
        return maskedUsername + domain;
    }
    return email;
}