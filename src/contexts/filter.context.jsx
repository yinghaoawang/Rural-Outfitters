import { createContext, useState } from 'react';

export const FilterContext = createContext({
    searchKey: '',
    setSearchKey: () => null,
    filteredCategories: [],
    addFilteredCategory: () => null,
    removeFilteredCategory: () => null,
    clearFilteredCategories: () => null,
});

export const FilterProvider = ({ children }) => {
    const [searchKey, setSearchKey] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    
    const addFilteredCategory = (category) => {
        if (filteredCategories.includes(category)) {
            console.log('Category already filtered, could not add ', category);
            return;
        }
        setFilteredCategories([ ...filteredCategories, category ]);
    }

    const removeFilteredCategory = (category) => {
        if (!filteredCategories.includes(category)) {
            console.log('Category not filtered, could not remove ', category);
            return;
        }
        setFilteredCategories([ ...filteredCategories.filter(item => item !== category) ]);
    }

    const clearFilteredCategories = () => {
        setFilteredCategories([]);
    }

    const value = { searchKey, setSearchKey, filteredCategories, addFilteredCategory, removeFilteredCategory, clearFilteredCategories };
    return (
        <FilterContext.Provider value={ value }>{ children }</FilterContext.Provider>
    );
}
