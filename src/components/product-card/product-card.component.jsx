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
        <div className='product-card-container' { ...props }>
            <img alt={ name } src={ imageUrl } />
            <div className='footer'>
                <span className='name'>{ name }</span>
                <span className='price'>{ price }</span>
            </div>
            <Button onClick={ addProductToCart } buttonType='inverted' className='ignore-outside-click'>Add to Cart</Button>
        </div>
    );
}

export default ProductCard;