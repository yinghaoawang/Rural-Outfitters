// Make sure to add "type": "module", to package.json before runnig
import { db } from '../utils/firebase.util.js';
import { collection, doc, writeBatch } from 'firebase/firestore';
import SHOP_DATA from './shop-data.js';

import CATEGORY_DATA from './category-data.js';

[CATEGORY_DATA, SHOP_DATA].map(data => {
    data.map(async collectionData => {
        try {
            const batch = writeBatch(db);
            const { title, items } = collectionData;
            const collectionRef = collection(db, title);
    
            items.forEach(item =>  {
                const { title, name } = item;
                const docRef = doc(collectionRef, title ?? name );
                batch.set(docRef, item);
            });
    
            await batch.commit();
            console.log('Done seeding ', title);
        } catch(error) {
            console.error('error seeding db: ', error);
        }
    });
});
