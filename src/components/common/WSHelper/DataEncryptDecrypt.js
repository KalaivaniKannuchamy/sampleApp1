/** 
 * Created by Eswar Sairam on 28/09/20
 **/

import { Component } from 'react';

import CryptoES from 'crypto-es';
var Buffer = require('buffer/').Buffer

export default class DataEncryptDecrypt extends Component {

    static encryptData = (data, key, iv) => {
        const cryptoKey = CryptoES.enc.Latin1.parse(key)
        const cryptoIV = CryptoES.enc.Latin1.parse(iv)
        var encrypted = CryptoES.AES.encrypt(data, cryptoKey, { iv: cryptoIV })
        let buffEncr = new Buffer(encrypted.toString(), 'base64');
        // console.log('encrypted: ' + buffEncr.toString('hex'));
    }

    static decryptData = (encryptedKey, key, iv) => {
        const cryptoKey = CryptoES.enc.Latin1.parse(key)
        const cryptoIV = CryptoES.enc.Latin1.parse(iv)
        let buff = new Buffer(encryptedKey, 'hex');
        var decrypted = CryptoES.AES.decrypt(buff.toString('base64'), cryptoKey, { iv: cryptoIV });
        // console.log('decrypted: ' + decrypted.toString(CryptoES.enc.Utf8));
    }

}