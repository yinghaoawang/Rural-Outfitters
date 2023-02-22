import FormInput from '../form-input/form-input.component';
import './shop-filter.styles.scss';
import { useContext, useEffect } from 'react';
import { FilterContext } from '../../contexts/filter.context';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/categories.selector';

const ShopFilter = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    
    const { searchKey, setSearchKey, filteredCategories, addFilteredCategory, removeFilteredCategory, clearFilteredCategories } = useContext(FilterContext);

    useEffect(() => {
        return () => {
            clearFilteredCategories();
            setSearchKey('');
        }
    }, []);

    const searchBoxChangeHandler = (event) => {
        const { value } = event.target;
        setSearchKey(value)
    }

    const checkboxChangeHandler = (event) => {
        const { target } = event;
        const { checked, id } = target;
        if (checked) {
            addFilteredCategory(id);
        } else {
            removeFilteredCategory(id);
        }
    }

    return (
        <div className='shop-filter-container'>
            <h2>Filters</h2>
            <h4>Search</h4>
            <div className='inputs search-input'>
                <input onChange={ searchBoxChangeHandler } value={ searchKey } type='search' />
            </div>
            <h4>Categories</h4>
            <div className='inputs category-inputs'>
                { categoriesMap.map((category, index) => (
                    <FormInput checked={ filteredCategories.includes(category) } onChange={ checkboxChangeHandler } key={ index } inputType='checkbox' label={ category } />
                ))}
            </div>
            
        </div>
    );
}

export default ShopFilter;