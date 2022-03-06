import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../context';

const Nav = () => {
    const [state, setState] = useContext(UserContext);
    const logout = () => {
        localStorage.removeItem('auth_subscriptions');
        setState({
            token: '',
            user: {}
        });
    };

    return (
        <ul className="nav border">
            <li className="nav-item p-3">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            {state && state.token ? (
                <div className="nav-item dropdown">
                    <li className="nav-link dropdown-toggle p-4" data-bs-toggle="dropdown">
                        <i className="fa-solid fa-user mx-2"></i>
                        {state.user.name}
                    </li>
                    <ul className="dropdown-menu">
                        <li className="nav-item dropdown-item">
                            <Link className="nav-link" to="/account">
                                Account
                            </Link>
                        </li>
                        <li className="nav-item dropdown-item">
                            <Link className="nav-link" onClick={logout} to="/">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            ) : (
                <Fragment>
                    <li className="nav-item p-3">
                        <Link className="nav-link" to="/register">Sign Up</Link>
                    </li>
                    <li className="nav-item p-3">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </Fragment>
            )}
        </ul>
    );
};

export default Nav;