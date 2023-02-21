import FormInput from '../form-input/form-input.component';
import './shop-filter.styles.scss';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/product.context';
import { FilterContext } from '../../contexts/filter.context';

const ShopFilter = () => {
    const { categories } = useContext(ProductContext);
    const { addFilteredCategory, removeFilteredCategory } = useContext(FilterContext);
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
                <input type='search' />
            </div>
            <h4>Categories</h4>
            <div className='inputs category-inputs'>
                { categories.map((category, index) => (
                    <FormInput onChange={ checkboxChangeHandler } key={ index } inputType='checkbox' label={ category } />
                ))}
            </div>
            
        </div>
    );
}

export default ShopFilter;