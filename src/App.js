import { Routes, Route } from 'react-router-dom';
import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Login from './routes/authentication/login.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import SignUp from './routes/authentication/sign-up.component';

function App() {
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
