import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase.util';
import Moment from 'react-moment';
import './user-orders.styles.scss';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/user/user.selector';

const UserOrders = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadOrders = async () => {
            const ordersQuery = query(collection(db, 'orders'), where('userId', '==', currentUser.uid));
            const querySnapshot = await getDocs(ordersQuery);
            const ordersData = [];
            querySnapshot.forEach(doc => {
                ordersData.push(doc.data());
            });
            ordersData.sort((a, b) => a - b);
            setOrders(ordersData);
            setIsLoading(false);
        }

        setIsLoading(true);
        loadOrders().catch(console.error);
    }, []);

    return (
        <div className='user-orders-container'>
            <h1 className='header'>Orders</h1>
            <div className='user-orders-grid grid-headers'>
                <div className='grid-header number'>#</div>
                <div className='grid-header'>Date Ordered</div>
                <div className='grid-header'>Amount</div>
                <div className='grid-header'>Items</div>
            </div>

            { !isLoading && orders.length === 0 &&
                <div className='empty-message'>You don't have any orders.</div>
            }

            { !isLoading ? orders.map((order, index) => (
                <div key={ index } className='user-orders-grid'>
                    <div className='number'>{ index + 1 }</div>
                    <div>
                        <Moment format='L kk:mm' date={new Date(order.createdAt.seconds * 1000 )}/>
                    </div>
                    <div>${ order.amount.toString().slice(0, -2) }.{ (order.amount.toString().slice(-2)) }</div>

                    <div className='items'>
                        { order.items.map((item, index) => (
                            <div key={ index } className='item'>
                                <img alt={ item.name } src={ item.imageUrl } />
                                <div key={ index }>{ `${ item.name } ${ item.quantity } x $${ item.price }` }</div>
                            </div>
                        ))}
                    </div>
                </div>
            )) : <div className='loading'><TailSpin stroke='#aaa' /></div>
            }
            
        </div>
    )
}

export default UserOrders;