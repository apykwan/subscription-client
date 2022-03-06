import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Nav from './components/Nav';
import AuthRoute from './components/routes/AuthRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import StripeSuccess from './pages/Stripe-Success';
import StripeCancel from './pages/Stripe-Cancel';
import Basic from './pages/plans/Basic';
import Standard from './pages/plans/Standard';
import Premium from './pages/plans/Premium';


function App() {
  return (
    <Router>
      <Nav />
      <Toaster 
        position="buttom-right" 
        toastOptions={{
          duration: 1500
        }} 
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/login" component={Login} />
        <AuthRoute exact path="/stripe/success" component={StripeSuccess} />
        <AuthRoute exact path="/stripe/cancel" component={StripeCancel} />
        <AuthRoute exact path="/account" component={Account} />
        <AuthRoute exact path="/basic" component={Basic} />
        <AuthRoute exact path="/standard" component={Standard} />
        <AuthRoute exact path="/Premium" component={Premium} />
      </Switch>
    </Router>
  );
}

export default App;
