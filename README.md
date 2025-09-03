# File-Encrypted-AES

- Esse repositório trás uma ideia intuitiva de criptografia e descriptografia de arquivos e diretórios.
- Utilizando o algoritmo de criptografia de alto nivel,AES,tornando o código mais eficientes para arquivos e diretorios maiores
- OBS: a leitura de arquivos não utiliza stream,o que seria o recomendando para leitura de arquivos maiores.Mas você pode criar sua propria versão e aprimora o código conforme sua vontande.Com tudo,deverá fornece os créditos do código original ao autor.

 ## Utilização 
 - O arquivo principal para o funcionamento do código é o arquivo ***aes.ts***.Nesse arquivo contém todo o algoritmo de criptografia e descriptografia.
 - O arquivo ***aes.ts*** convertem todo o contéudo lido dos arquivos em ***Buffer*** para aprimorar ainda mais a manipulação de arquivos,principalmente arquivos binários ou que não sejam ***.txt***

### 1 Criptografia
```typescript
import aes from "./scripts/aes";

function DefineTypeArray<Type>(arr: Array<Type>): Array<Type> {
    return arr;
};
const strings = DefineTypeArray<string>(["javascript", "typescript", "python", "csharp"]);

async function encryptedData(data: Array<string>): Promise<Array<Buffer | ArrayBufferLike>> {
    const arrayDataEncrypted = DefineTypeArray<Buffer | ArrayBufferLike>([]);

    for (const item of data) {
        const encrypted = await aes.EncryptedDataAES(item);

        arrayDataEncrypted.push(encrypted)
    };
    return arrayDataEncrypted;
};

encryptedData(strings).then(r => {
    console.log(r.toString())
    // toString so deve ser usando quando se tem a certeza que o contéudo é uma string ou texto,qualquer utilização dessa função em arquivos binário irá gerar erro ou corrompe o contéudo de retorno
});
```
### 2 descriptografia 
- - Na parte de descriptografia deve-se ter uma obsevação a mais.Como você já deve ter percebido o algoritmo ***AES*** é um algoritmo de criptografia simétrica,utilizamos apenas uma chave,tanto para criptografia quanto para descriptografia.
- - Quando rodamos o código anterior ou a função ***EncryptedDataAES*** a chave (privateKey) e o vetor de inicialização (IV) é salvo em um arquivo .json,por boas pratícas e uma facil manipulação.Toda vez que rodamos a função anterior,privateKey e o IV,são alterados,isso significa que se você criptografou mais de uma vez algum arquivo ou contéudo e deseja descriptografa novamente.Isso não irá funciona mais,por que o IV e o privateKey são toltamente diferentes da criptografia anterior.
  - Caso isso acabe se tornando um problema para você,você pode criar uma forma melhor e mais aprimorada para armazenamento da chave privada e do vetor de inicialização,como o armazenamento em ***NoSQL***(redis,mongodb e etc...)
 
```typescript
import aes from "./scripts/aes";

function DefineTypeArray<Type>(arr: Array<Type>): Array<Type> {
    return arr;
};
const strings = DefineTypeArray<string>(["8370e64cfe192b2aeb61488c25af5a9e", "87565d0e64cfe192b2aeb61488c25af5a9rtfa", "102435d0e64cfe192b2aeb61488c25af5a4e", "75d0e64cfe192b2a3456b61428c25af5a1e"]);

async function dencryptedData(data: Array<string>): Promise<Array<Buffer | ArrayBufferLike>> {
    const arrayDataEncrypted = DefineTypeArray<Buffer | ArrayBufferLike>([]);

    for (const item of data) {
        const encrypted = await aes.DecryptedDataAES(Buffer.from(item));

        arrayDataEncrypted.push(encrypted)
    };
    return arrayDataEncrypted;
};

dencryptedData(strings).then(r => {
    console.log(r.toString());
});

  
```

# Todos os direitos reservados.
