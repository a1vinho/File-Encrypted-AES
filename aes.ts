import crypto from "node:crypto";
import fsp from "fs/promises";
import fs from "fs";
// const privateKey = crypto.randomBytes(32);

async function LoadKeyAES() {
    const privateKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    await fsp.writeFile(`keys.json`, JSON.stringify({
        privateKey: privateKey.toString('hex'),
        iv: iv.toString('hex')
    }, null, 2));
};

const algorithm = 'aes-256-cbc';

async function EncryptedDataAES(data: Buffer | string): Promise<Buffer> {
    await LoadKeyAES()
    const { iv, privateKey } = JSON.parse(await fsp.readFile(`keys.json`, 'utf-8')) as {
        iv: string;
        privateKey: string;
    };
    console.log(iv,privateKey)
    const encrypted = crypto.createCipheriv(algorithm, Buffer.from(privateKey, 'hex'), Buffer.from(iv, 'hex'))

    return Buffer.concat([
        encrypted.update(data),
        encrypted.final()
    ]);
};

async function DecryptedDataAES(data: Buffer): Promise<Buffer> {
    const { iv, privateKey } = JSON.parse(await fsp.readFile(`keys.json`, 'utf-8')) as {
        iv: string;
        privateKey: string;
    };

    const decrypted = crypto.createDecipheriv(algorithm, Buffer.from(privateKey, 'hex'), Buffer.from(iv, 'hex'));

    return Buffer.concat([
        decrypted.update(data),
        decrypted.final()
    ]);
}


export default {
    DecryptedDataAES,
    EncryptedDataAES
};