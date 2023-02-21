import { db } from '../utils/firebase.util.js';
import { collection, doc, writeBatch } from 'firebase/firestore';
import SHOP_DATA from './shop-data.js';

SHOP_DATA.map(async collectionData => {
    try {
        const batch = writeBatch(db);
        const { title, items } = collectionData;
        const collectionRef = collection(db, title);

        items.forEach(item =>  {
            console.log(item);
            const { id, name } = item;
            const docRef = doc(collectionRef, name);
            batch.set(docRef, item);
        });

        await batch.commit();
        console.log('done');
    } catch(error) {
        console.error('error seeding db: ', error);
    }
    
})
