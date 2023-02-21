import { createContext, useState, useEffect } from 'react';
import { db } from '../utils/firebase.util';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export const ProductContext = createContext({
    products: [],
    setProducts: () => null,
    categories: [],
    getCategoriesFromProduct: () => [],
});

// If product's categories doesn't contain a gender, add men and women to it
const addUnisexCategory = (categories) => {
    if (!categories.includes('men') && !categories.includes('women')) {
        return ['men', 'women'];
    }
    return [];
}

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const getCategoriesFromProduct = (product) => product.categories;
    const value = { products, setProducts, categories, getCategoriesFromProduct };

    useEffect(() => {
        const categoryQuery = query(collection(db, 'categories'), orderBy('id'));
        getDocs(categoryQuery).then(querySnapshot => {
            const categories = [];
            querySnapshot.forEach(doc => {
                const category = doc.data();
                categories.push(category);
            });
            setCategories(categories);
        });
    }, []);

    useEffect(() => {
        const productQuery = query(collection(db, 'products'), orderBy('id'));
        getDocs(productQuery).then(querySnapshot => {
            const products = [];
            querySnapshot.forEach(doc => {
                const product = doc.data();
                const { categories } = product;
                product.categories = [...categories, ...addUnisexCategory(categories)];
                products.push(product);                
            });
            setProducts(products);
        });
    }, []);

    return (
        <ProductContext.Provider value={ value }>{ children }</ProductContext.Provider>
    );
}
