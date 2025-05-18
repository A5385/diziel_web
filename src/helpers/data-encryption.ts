import CryptoJS from 'crypto-js';

const encryptKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY;
const encryptIv = process.env.NEXT_PUBLIC_ENCRYPT_IV;

if (!encryptKey || encryptKey.length !== 64 || !encryptIv || encryptIv.length !== 32) {
    throw new Error(
        'Encryption key must be 64 hex characters (32 bytes) and IV must be 32 hex characters (16 bytes).',
    );
}

const secretKey = CryptoJS.enc.Hex.parse(encryptKey);
const iv = CryptoJS.enc.Hex.parse(encryptIv);

export function encryptData(data: string | object): string {
    try {
        const plainText = typeof data === 'string' ? data : JSON.stringify(data);
        const encrypted = CryptoJS.AES.encrypt(plainText, secretKey, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return encrypted.toString();
    } catch (error) {
        console.error('Encryption failed:', error);
        return '';
    }
}

export function decryptData(encryptedText: string) {
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        try {
            return JSON.parse(decryptedText);
        } catch {
            return decryptedText;
        }
    } catch (error) {
        console.error('Decryption failed:', error);
        return null;
    }
}
