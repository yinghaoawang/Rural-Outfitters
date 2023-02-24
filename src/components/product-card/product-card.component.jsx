import Button from '../button/button.component';
import './product-card.styles.scss';
import { addItemToCart } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

// possibly scuffed code
const animateAddItemToCart = (id) => {
    const origImg = document.getElementById(`p${ id }`);
    const animImg = origImg.cloneNode(true);
    animImg.classList.add('animation-image');
    animImg.removeAttribute('id');
    origImg.parentNode.insertBefore(animImg, origImg);
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

    const animationDuration = 500;

    setTimeout(() => {
        animImg.style.transition = `all ${ animationDuration }ms cubic-bezier(.95,.29,.56,.94)`;
        animImg.style.left = newLeft;
        animImg.style.top = newTop;
        animImg.style.opacity = 0;
        animImg.style.scale = .1;
        animImg.style.zIndex = 999;
    }, 0);

    setTimeout(() => {
        animImg.remove();
    }, animationDuration);
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
            <img id={`p${product.id}`} alt={ name } src={ imageUrl } />

            <div className='footer'>
                <span className='name'>{ name }</span>
                <span className='price'>{ price }</span>
            </div>
            <Button buttonType='inverted'>Add to Cart</Button>
        </div>
    );
}

export default ProductCard;