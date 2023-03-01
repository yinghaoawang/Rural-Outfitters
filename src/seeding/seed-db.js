// Make sure to add "type": "module", to package.json before running
import { db } from '../utils/firebase.util.js';
import { collection, doc, writeBatch } from 'firebase/firestore';
import SHOP_DATA from './shop-data.js';


import CATEGORY_DATA from './category-data.js';

const escapeRegExp = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
const chars = '.$[]#/%'.split('');
const charCodes = chars.map((c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);

const charToCode = {};
const codeToChar = {};
chars.forEach((c, i) => {
  charToCode[c] = charCodes[i];
  codeToChar[charCodes[i]] = c;
});

const charsRegex = new RegExp(`[${escapeRegExp(chars.join(''))}]`, 'g');
const charCodesRegex = new RegExp(charCodes.join('|'), 'g');

const encode = (str) => str?.replace(charsRegex, (match) => charToCode[match]);
const decode = (str) => str.replace(charCodesRegex, (match) => codeToChar[match]);


[CATEGORY_DATA, SHOP_DATA].map(data => {
    data.map(async collectionData => {
        try {
            const batch = writeBatch(db);
            const { title, items } = collectionData;
            const collectionRef = collection(db, encode(title));
    
            items.forEach(item =>  {
                const { title, name } = item;
                const docRef = doc(collectionRef, encode(title) ?? encode(name) );
                batch.set(docRef, item);
            });
    
            await batch.commit();
            console.log('Done seeding ', title);
        } catch(error) {
            console.error('error seeding db: ', error);
        }
    });
});
