import './home.styles.scss';
import Directory from '../../components/directory/directory.component';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../store/categories/categories.selector';

const Home = () => {
    const categories = useSelector(selectCategories);
    return (
        <div className='outer-container'>
            <Directory categories={categories} />
        </div>
    );
}

export default Home;