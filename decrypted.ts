import fsp from "fs/promises";
import fs from "fs";
import path from "path";
import aes from "./aes";

async function ReadFile(path: string) {
    const contentFile = await fsp.readFile(path);

    const decrypted = await aes.DecryptedDataAES(contentFile);

    await fsp.writeFile(path, decrypted);
};


async function ReadDir(dir: string) {
    const dirs = await fsp.readdir(dir);

    for (const item of dirs) {
        const fullPath = path.join(dir, item);
        const stat = await fsp.stat(fullPath);
        if (!stat.isDirectory()) {
            if (item.endsWith('.txt') || item.endsWith('.js')) {
                await ReadFile(fullPath)
            }
        }
        else {
            await ReadDir(fullPath)
        }
    };
}
ReadDir(__dirname)