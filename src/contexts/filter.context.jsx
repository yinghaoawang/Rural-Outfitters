import { createContext, useReducer } from 'react';

export const FilterContext = createContext({
    searchKey: '',
    setSearchKey: () => null,
    filteredCategories: [],
    addFilteredCategory: () => null,
    removeFilteredCategory: () => null,
    clearFilteredCategories: () => null,
});

const FILTER_ACTION_TYPES = {
    SET_SEARCH_KEY: 'SET_SEARCH_KEY',
    SET_FILTERED_CATEGORIES: 'SET_FILTERED_CATEGORIES',
}

const INITIAL_VALUES = {
    searchKey: '',
    filteredCategories: [],
};

const filterReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case FILTER_ACTION_TYPES.SET_SEARCH_KEY:
            return {
                ...state,
                searchKey: payload
            }
        case FILTER_ACTION_TYPES.SET_FILTERED_CATEGORIES:
            return {
                ...state,
                filteredCategories: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in filterReducer`);
    }
};

export const FilterProvider = ({ children }) => {
    const [{ searchKey, filteredCategories }, dispatch] = useReducer(filterReducer, INITIAL_VALUES);

    const setSearchKey = (newSearchKey) => {
        dispatch({ type: FILTER_ACTION_TYPES.SET_SEARCH_KEY, payload: newSearchKey })
    }
    
    const addFilteredCategory = (category) => {
        if (filteredCategories.includes(category)) {
            console.log('Category already filtered, could not add ', category);
            return;
        }
        dispatch({ type: FILTER_ACTION_TYPES.SET_FILTERED_CATEGORIES, payload: [ ...filteredCategories, category ] })
    }

    const removeFilteredCategory = (category) => {
        if (!filteredCategories.includes(category)) {
            console.log('Category not filtered, could not remove ', category);
            return;
        }
        dispatch({ type: FILTER_ACTION_TYPES.SET_FILTERED_CATEGORIES, payload: [ ...filteredCategories.filter(item => item !== category) ] })
    }

    const clearFilteredCategories = () => {
        dispatch({ type: FILTER_ACTION_TYPES.SET_FILTERED_CATEGORIES, payload: [] })
    }

    const value = { searchKey, setSearchKey, filteredCategories, addFilteredCategory, removeFilteredCategory, clearFilteredCategories };
    return (
        <FilterContext.Provider value={ value }>{ children }</FilterContext.Provider>
    );
}
