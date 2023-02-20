import Button from '../button/button.component';
import './product-card.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product, ...props }) => {
    const { name, imageUrl, price } = product;
    const { addItemToCart, setIsCartOpen } = useContext(CartContext);
    const addProductToCart = () => {
        addItemToCart(product);
        setIsCartOpen(true);
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