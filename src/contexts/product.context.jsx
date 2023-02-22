import { createContext, useReducer, useEffect } from 'react';
import { db } from '../utils/firebase.util';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export const ProductContext = createContext({
    products: [],
    setProducts: () => null,
    categories: [],
    getCategoriesFromProduct: () => [],
});

const INITIAL_VALUES = {
    products: [],
    categories: [],
}

const PRODUCT_ACTION_TYPES = {
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_CATEGORIES: 'SET_CATEGORIES',
};

const productReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case PRODUCT_ACTION_TYPES.SET_PRODUCTS:
            return {
                ...state,
                products: payload
            }
        case PRODUCT_ACTION_TYPES.SET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in productReducer`);
    }
};

// If product's categories doesn't contain a gender, add men and women to it
const addUnisexCategory = (categories) => {
    if (!categories.includes('men') && !categories.includes('women')) {
        return ['men', 'women'];
    }
    return [];
}

export const ProductProvider = ({ children }) => {
    const [{ products, categories }, dispatch] = useReducer(productReducer, INITIAL_VALUES);

    const getCategoriesFromProduct = (product) => product.categories;

    const value = { products, categories, getCategoriesFromProduct };

    const updateProductsReducer = (newProducts) => {
        dispatch({ type: PRODUCT_ACTION_TYPES.SET_PRODUCTS, payload: newProducts });
    }

    const updateCategoriesReducer = (newCategories) => {
        dispatch({ type: PRODUCT_ACTION_TYPES.SET_CATEGORIES, payload: newCategories });
    }

    useEffect(() => {
        const categoryQuery = query(collection(db, 'categories'), orderBy('id'));
        getDocs(categoryQuery).then(querySnapshot => {
            const categories = [];
            querySnapshot.forEach(doc => {
                const category = doc.data();
                categories.push(category);
            });
            updateCategoriesReducer(categories);
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
            updateProductsReducer(products);
        });
    }, []);

    return (
        <ProductContext.Provider value={ value }>{ children }</ProductContext.Provider>
    );
}
