import './shop.styles.scss';
import { ProductContext } from '../../contexts/product.context';
import { useContext } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import ShopFilter from '../../components/shop-filter/shop-filter.component';
import { FilterContext } from '../../contexts/filter.context';

const Shop = () => {
    const { products, getCategoriesFromProduct } = useContext(ProductContext);
    const { filteredCategories } = useContext(FilterContext);

    const filteredProducts = products.filter(product => {
        const categories = getCategoriesFromProduct(product);
        for (let filteredCategory of filteredCategories) {
            if (!categories.includes(filteredCategory)) return false;
        }
        return true;
    });

    return (
        <div className='shop'>
            <ShopFilter />
            <div className='products-container'>
                <div className='products-grid-container'>
                    { filteredProducts.map(shopItem => (
                        <ProductCard key={ shopItem.id } product={ shopItem } />
                    )) }
                </div>
            </div>
        </div>
    );
}

export default Shop;