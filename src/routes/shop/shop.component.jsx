import './shop.styles.scss';
import { ProductContext } from '../../contexts/product.context';
import { useContext } from 'react';
import ProductCard from '../../components/product-card/product-card.component';

const Shop = () => {
    const { products } = useContext(ProductContext);
    return (
        <div className='products-container'>
            { products.map(shopItem => (
                <ProductCard key={ shopItem.id } product={ shopItem } />
            )) }
        </div>
    );
}

export default Shop;