import Button from '../button/button.component';
import './product-card.styles.scss';
import { addItemToCart, setIsCartOpen } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({ product, ...props }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, imageUrl, price } = product;
    const addProductToCart = () => {
        dispatch(addItemToCart(cartItems, product));
        // dispatch(setIsCartOpen(true));
    }
    return (
        <div onClick={ addProductToCart } className='product-card-container ignore-outside-click' { ...props }>
            <img alt={ name } src={ imageUrl } />
            <div className='footer'>
                <span className='name'>{ name }</span>
                <span className='price'>{ price }</span>
            </div>
            <Button buttonType='inverted'>Add to Cart</Button>
        </div>
    );
}

export default ProductCard;