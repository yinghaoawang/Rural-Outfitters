import './category-item.styles.scss';
import { HiOutlineArrowLongRight as ArrowLongRightIcon } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FilterContext } from '../../contexts/filter.context';

const CategoryItem = ({ category }) => {
    const { title, imageUrl } = category;
    const { addFilteredCategory } = useContext(FilterContext);
    const navigate = useNavigate();

    const pluralize = (word) => {
        if (word.length === 0) return word;
        
        const lastChar = word[word.length - 1];
        if (lastChar === 's') return word.slice(0, word.length) + 'es';
        if (lastChar === 'y') return word.slice(0, word.length - 1) + 'ies';
        return word.slice(0, word.length) + 's';
    }

    const categoryClickHandler = () => {
        addFilteredCategory(title);
        navigate('/shop');
    };

    return (
        <div onClick={ categoryClickHandler } className='category-container'>
            <div
                className='background-image'
                style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className='category-body-container'>
                <h2>Shop { pluralize(title) } &nbsp;<ArrowLongRightIcon /></h2>
            </div>
        </div>
    );
}

export default CategoryItem;