function getRandomChar(charSet: string) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    return charSet.charAt(randomIndex);
}
export function generateStrongPassword() {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = "!@#$%^&*()_-+=~`|:;'<>,.?/";

    let password = '';

    // Ensure at least one character from each character set
    password += getRandomChar(lowercaseChars);
    password += getRandomChar(uppercaseChars);
    password += getRandomChar(numberChars);
    password += getRandomChar(specialChars);

    // Generate the rest of the password
    for (let i = 4; i < 12; i++) {
        const allChars = lowercaseChars + uppercaseChars + numberChars + specialChars;
        password += getRandomChar(allChars);
    }

    // Shuffle the password characters to make it more random
    password = password
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');

    const criteria: Record<string, boolean> = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        special: /[\W_]/.test(password),
    };

    // Calculate the number of criteria met
    const strength = Object.values(criteria).filter((c) => c).length;
    const newMissingCriteria = Object.keys(criteria).filter((criterion) => !criteria[criterion]);

    // Determine the strength level
    let newStrength: '' | 'Weak' | 'Very Weak' | 'Moderate' | 'Strong' | 'Very Strong' = '';

    if (strength === 0) newStrength = '';
    else if (strength === 1) newStrength = 'Very Weak';
    else if (strength === 2) newStrength = 'Weak';
    else if (strength === 3) newStrength = 'Moderate';
    else if (strength === 4) newStrength = 'Strong';
    else if (strength === 5) newStrength = 'Very Strong';

    return { newStrength, password, newMissingCriteria };
}
