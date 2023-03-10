import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Login from './routes/authentication/login.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import SignUp from './routes/authentication/sign-up.component';
import PaymentSuccess from './routes/payment-success/payment-success.component';
import { createUserDocumentFromAuth, db, onAuthStateChangedListener } from './utils/firebase.util';
import { useEffect } from 'react';
import { setCurrentUser } from './store/user/user.action';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { setProducts } from './store/products/products.action';
import { setCategories } from './store/categories/categories.action';
import { selectCurrentUser } from './store/user/user.selector';
import { setIsCartOpen } from './store/cart/cart.action';
import UserOrders from './routes/account/user-orders/user-orders.component';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(setIsCartOpen(false));
  }, [])

  useEffect(() => {
    const categoryQuery = query(collection(db, 'categories'), orderBy('id'));
    getDocs(categoryQuery).then(querySnapshot => {
        const categories = [];
        querySnapshot.forEach(doc => {
            const category = doc.data();
            categories.push(category);
        });
        dispatch(setCategories(categories));
    });
  }, []);

  useEffect(() => {
    // If product's categories doesn't contain a gender, add men and women to it
    const addUnisexCategory = (categories) => {
      if (!categories.includes('men') && !categories.includes('women')) {
          return ['men', 'women'];
      }
      return [];
    }
    const productQuery = query(collection(db, 'products'), orderBy('id'));
    getDocs(productQuery).then(querySnapshot => {
        const products = [];
        querySnapshot.forEach(doc => {
            const product = doc.data();
            const { categories } = product;
            product.categories = [...categories, ...addUnisexCategory(categories)];
            products.push(product);                
        });
        dispatch(setProducts(products));
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        if (user) {
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path='/' element={ <Navigation /> }>
        <Route index element={ <Home /> }></Route>
        <Route path='login' element={ currentUser ? <Navigate to='/shop' /> : <Login /> }></Route>
        <Route path='signup' element={ !currentUser ? <SignUp /> : <Home /> }></Route>
        <Route path='shop' element={ <Shop /> }></Route>
        <Route path='checkout' element={ <Checkout /> }></Route>
        <Route path='checkout/success' element={ <PaymentSuccess /> }></Route>
        <Route path='account/orders' element={ currentUser ? <UserOrders /> : <Login /> }></Route>
      </Route>
    </Routes>
  );
}

export default App;
