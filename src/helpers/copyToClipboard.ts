export const copyToClipboard = (text: string) => {
    try {
        navigator.clipboard.writeText(text);
        return true; // Return true if copying was successful
    } catch (error) {
        console.error('Failed to copy:', error);
        return false; // Return false if copying failed
    }
};
