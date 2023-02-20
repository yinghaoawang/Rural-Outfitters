import './home.styles.scss';
import Directory from '../../components/directory/directory.component';

const Home = () => {
    const categories = [
        { id: 1, title: 'mens', imageUrl: 'https://i.imgur.com/ngabpU4.png',},
        { id: 2, title: 'womens', imageUrl: 'https://i.imgur.com/Z2axjKT.png',},
        { id: 3, title: 'hats', imageUrl: 'https://i.imgur.com/9cltHMh.png', },
        { id: 4, title: 'outerwear', imageUrl: 'https://i.imgur.com/adUj2v6.png',},
        { id: 5, title: 'dresses', imageUrl: 'https://i.imgur.com/ApRwlHH.png',},
        { id: 6, title: 'boots', imageUrl: 'https://i.imgur.com/JSmzRFs.jpg',},
        { id: 7, title: 'tops', imageUrl: 'https://i.imgur.com/dCu2Io2.png', },
        { id: 8, title: 'bottoms', imageUrl: 'https://i.imgur.com/nL09y81.jpg', },
        { id: 9, title: 'accessories', imageUrl: 'https://i.imgur.com/oPmW028.jpg',},
      ];
    
    return (
        <div className='outer-container'>
            <Directory categories={categories} />
        </div>
    );
}

export default Home;