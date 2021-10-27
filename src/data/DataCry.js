import cryptoJS from 'crypto-js';

export function DataCry(url, days) {

    let secretKey = "GSSIOT";
    let method = "POST";
    let space = " ";
    let newLine = "\n";
    let hmac = cryptoJS.algo.HMAC.create(cryptoJS.algo.SHA256, secretKey);
    let host = url;
    let date = days

    hmac.update(method);
    hmac.update(space);
    hmac.update(host);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update('GSSIOT');

    const hash = hmac.finalize();
    return hash.toString(cryptoJS.enc.Base64);
}