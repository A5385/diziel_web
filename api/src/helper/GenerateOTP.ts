export function GenerateOTP(size: number) {
    const min = Math.pow(10, size - 1);
    const max = Math.pow(10, size) - 1;
    return Math.floor(min + Math.random() * (max - min + 1));
}
