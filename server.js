import http from 'http';
import crypto from 'crypto';

const server = http.createServer();
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex')
    };
}

var encrypted = encrypt("hello my name is ...");                /*  add normal input */
console.log("encrypted ~ ", encrypted.encryptedData)            /*  output encrypted */

function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');

    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

const decrypted = decrypt(encrypted)            /*  encrypted input  */
console.log("decrypted ~ ", decrypted);         /*  decrypted output */


server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server is running on port 3000');
})

// step by step coding   ----------->>

// 1. npm install

// 2. yarn add  --> example:- npm install -g yarn

//3.yarn run dev