import Button from '../button/button.component';
import './product-card.styles.scss';

const ProductCard = ({ product, ...props }) => {
    const { name, imageUrl, price } = product;
    return (
        <div className='product-card-container' { ...props }>
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