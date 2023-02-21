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

const getUniqueCategories = (categories, newCategories) => {
    const result = [];
    newCategories.forEach(category => {
        if (!categories.includes(category)) result.push(category);
    });
    return result;
}

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const getCategoriesFromProduct = (product) => product.categories;
    const value = { products, setProducts, categories, getCategoriesFromProduct };

    useEffect(() => {
        const q = query(collection(db, 'products'), orderBy('id'));
        getDocs(q).then(querySnapshot => {
            const productData = [];
            const categoryData = [];

            querySnapshot.forEach(doc => {
                const product = doc.data();
                const { categories } = product;
                product.categories = [...categories, ...addUnisexCategory(categories)];
                productData.push(product);
                categoryData.push(...getUniqueCategories(categoryData, doc.data().categories));
            });
            setProducts(productData);
            setCategories(categoryData);
        });
    }, []);

    return (
        <ProductContext.Provider value={ value }>{ children }</ProductContext.Provider>
    )
}
