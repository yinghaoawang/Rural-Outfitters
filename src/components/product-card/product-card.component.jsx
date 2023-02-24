import Button from '../button/button.component';
import './product-card.styles.scss';
import { addItemToCart, setIsCartOpen } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

// possibly scuffed code
const animateAddItemToCart = (id) => {
    const origImg = document.getElementById(`p${ id }`);
    const animImg = document.getElementById(`pa${ id }`);
    const cartIcon = document.getElementsByClassName('cart-icon-container')[0];

    if (!origImg || !animImg || !cartIcon) return;

    const origPos = {
        x: origImg.getBoundingClientRect().left,
        y: origImg.getBoundingClientRect().top,
        w: origImg.offsetWidth,
        h: origImg.offsetHeight
    }

    const cartPos = {
        x: cartIcon.getBoundingClientRect().left,
        y: cartIcon.getBoundingClientRect().top,
    }
    
    animImg.style.transition = 'none';
    animImg.style.left = 0;
    animImg.style.top = 0;
    animImg.style.opacity = 1;
    animImg.style.scale = 1;
    animImg.style.zIndex = 0;

    const newLeft = Math.round(cartPos.x - origPos.x - origPos.w / 2) + 'px';
    const newTop = Math.round(cartPos.y - origPos.y - origPos.h / 2) + 'px';

    setTimeout(() => {
        animImg.style.transition = 'all .5s cubic-bezier(.67,.08,.92,.28)';
        animImg.style.left = newLeft;
        animImg.style.top = newTop;
        animImg.style.opacity = 0;
        animImg.style.scale = .2;
        animImg.style.zIndex = 999;
    }, 0);
}

const ProductCard = ({ product, ...props }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { id, name, imageUrl, price } = product;
    const addProductToCart = () => {
        dispatch(addItemToCart(cartItems, product));
        animateAddItemToCart(id);
    }
    return (
        <div onClick={ addProductToCart } className='product-card-container ignore-outside-click' { ...props }>
            <img id={`p${product.id}`} className='product-image' alt={ name } src={ imageUrl } />
            <img id={`pa${product.id}`} className='animation-image' alt={ name } src={ imageUrl } />

            <div className='footer'>
                <span className='name'>{ name }</span>
                <span className='price'>{ price }</span>
            </div>
            <Button buttonType='inverted'>Add to Cart</Button>
        </div>
    );
}

export default ProductCard;