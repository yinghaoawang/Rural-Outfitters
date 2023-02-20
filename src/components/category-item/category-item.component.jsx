import './category-item.styles.scss';
import { HiOutlineArrowLongRight as ArrowLongRightIcon } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({ category }) => {
    const { title, imageUrl } = category;
    const navigate = useNavigate();
    const categoryClickHandler = () => {
        navigate('/shop');
    };

    return (
        <div onClick={ categoryClickHandler } className='category-container'>
            <div
                className='background-image'
                style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className='category-body-container'>
                <h2>Shop { title } &nbsp;<ArrowLongRightIcon /></h2>
            </div>
        </div>
    );
}

export default CategoryItem;