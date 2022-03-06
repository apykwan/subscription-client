import { useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import Google from '../components/Google';
import Facebook from '../components/Facebook';
import Input from '../components/Input';
import Button from '../components/Button';
import UserContext from '../context';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [state, setState] = useContext(UserContext);

    const history = useHistory();

    const handleClick = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post("/login", {
                email,
                password,
            });

            if (data.error) return toast.error(data.error);
            setState(data);
            toast.success(`Welcome Back, ${data.user.name}.`);
            localStorage.setItem('auth_subscriptions', JSON.stringify(data));
            history.push('/');
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong. Try again");
        }
    };

    useEffect(() => {
        if (state && state.token) history.push('/');
    }, [state, history]);

    return (
        <div className="d-flex justify-content-center register_head">
            <div className="container align-items-center d-flex">
                <div className="row col-md-6 offset-md-3 text-center">
                    <h1 className="pt-5 fw-bold">Let's Get Started</h1>
                    <p className="lead pb-4">
                        Access your subscriptions. Anytime. Anywhere.
                    </p>
                    <div className="mb-4">
                        <Google buttonText="Login with Google" />
                        <Facebook buttonText="Login with Facebook" />
                    </div>
                    <div className="form-group mb-3">
                        <Input 
                            label="Email"
                            value={email}
                            setValue={setEmail}
                            type="email"
                        />
                        <Input 
                            label="Password"
                            value={password}
                            setValue={setPassword}
                            type="password"
                        />
                        <div className="d-grid">
                            <Button 
                                handleClick={handleClick} 
                                type="outline-success" 
                                text="Login" 
                                size="sm" 
                            />
                        </div>
                    </div>
                    <Link to="/register">Not yet have an account? Sign up here.</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;