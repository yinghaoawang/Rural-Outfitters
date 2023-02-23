import './cart-icon.styles.scss';
import { BiCart } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../../store/cart/cart.selector';


const CartIcon = ({ size, ...props }) => {
    const cartCount = useSelector(selectCartCount); 
    return (
        <>
            <div className='cart-icon-container' { ...props }>
                <BiCart size={ size } />
                { cartCount > 0 &&
                    <span className='cart-count'>
                        <span className='text'>{ cartCount }</span>
                    </span>
                }
            </div>
        </>
    );
}

export default CartIcon;