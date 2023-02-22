import './home.styles.scss';
import Directory from '../../components/directory/directory.component';
import { useSelector } from 'react-redux';

const Home = () => {
    const { categories } = useSelector(state => state.product);
    return (
        <div className='outer-container'>
            <Directory categories={categories} />
        </div>
    );
}

export default Home;