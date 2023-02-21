import { createContext, useState, useEffect } from 'react';
import { db } from '../utils/firebase.util';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
const PRODUCTS = [];

export const ProductContext = createContext({
    products: [],
    setProducts: () => null
});

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products, setProducts };

    useEffect(() => {
        const q = query(collection(db, 'products'), orderBy('id'));
        getDocs(q).then(querySnapshot => {
            const data = [];
            querySnapshot.forEach(doc => {
                data.push(doc.data());
            });
            setProducts(data);
        });
    }, []);

    return (
        <ProductContext.Provider value={ value }>{ children }</ProductContext.Provider>
    )
}
