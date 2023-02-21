import './home.styles.scss';
import Directory from '../../components/directory/directory.component';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/product.context';

const Home = () => {
    const { categories } = useContext(ProductContext);
    return (
        <div className='outer-container'>
            <Directory categories={categories} />
        </div>
    );
}

export default Home;