import Button from '../button/button.component';
import './product-card.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product, ...props }) => {
    const { name, imageUrl, price } = product;
    const { addItemToCart } = useContext(CartContext);
    const addProductToCart = () => addItemToCart(product);
    return (
        <div className='product-card-container' { ...props }>
            <img alt={ name } src={ imageUrl } />
            <div className='footer'>
                <span className='name'>{ name }</span>
                <span className='price'>{ price }</span>
            </div>
            <Button onClick={ addProductToCart } buttonType='inverted'>Add to Cart</Button>
        </div>
    );
}

export default ProductCard;