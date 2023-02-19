import './cart-item.styles.scss';
const CartItem = ({ product }) => {
    const { imageUrl, name, price, quantity } = product;
    return (
        <div className='cart-item-container'>
            <img alt={ name } src={ imageUrl } />
            <div className='item-details'>
                <div className='name'><span>{ name }</span></div>
                <div className='price'><span>{ quantity } x ${ price }</span></div>
            </div>
        </div>
    )
}

export default CartItem;