import './shop.styles.scss';
import { useContext } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import ShopFilter from '../../components/shop-filter/shop-filter.component';
import { FilterContext } from '../../contexts/filter.context';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../store/products/products.selector';

const Shop = () => {
    const products = useSelector(selectProducts);
    const { filteredCategories, searchKey } = useContext(FilterContext);

    const filteredProducts = products.filter(product => {
        if (!product.name.toLowerCase().includes(searchKey.toLowerCase())) return false;

        const { categories } = product;
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