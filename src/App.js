import { Routes, Route } from 'react-router-dom';
import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Login from './routes/authentication/login.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import SignUp from './routes/authentication/sign-up.component';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase.util';
import { useEffect } from 'react';
import { setCurrentUser } from './store/user/user.action';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

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
        <Route path='login' element={ <Login /> }></Route>
        <Route path='signup' element={ <SignUp /> }></Route>
        <Route path='shop' element={ <Shop /> }></Route>
        <Route path='checkout' element={ <Checkout /> }></Route>
      </Route>
    </Routes>
  );
}

export default App;
