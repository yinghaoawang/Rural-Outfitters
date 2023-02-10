import './home.styles.scss';
import Directory from '../../components/directory/directory.component';

const Home = () => {
    const categories = [
        { id: 1, title: 'hats', imageUrl: 'https://i.ibb.co/cvpntL1/hats.png', },
        { id: 2, title: 'tops', imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png', },
        { id: 3, title: 'bottoms', imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png', },
        { id: 4, title: 'overalls', imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',},
        { id: 5, title: 'dresses', imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',},
        { id: 5, title: 'shoes', imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',},
        { id: 6, title: 'mens', imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',},
        { id: 7, title: 'womens', imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',},
      ];
    
    return (
        <div className='outer-container'>
            <Directory categories={categories} />
        </div>
    );
}

export default Home;