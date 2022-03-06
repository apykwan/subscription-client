import { useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import Google from '../components/Google';
import Facebook from '../components/Facebook';
import Input from '../components/Input';
import Button from '../components/Button';
import UserContext from '../context';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [state] = useContext(UserContext);

    const history = useHistory();

    const handleClick = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post("/register", {
                name,
                email,
                password,
            });

            if (data.error) return toast.error(data.error);

            toast.success(`${data.user.name} has been registered.`);
            history.push('/login');
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
                        Sign up for free. No credit card required.
                    </p>
                    <div className="mb-4">
                        <Google buttonText="Sign up with Google" />
                        <Facebook buttonText="Sign up with Facebook" />
                    </div>
                    <div className="form-group mb-3">
                        <Input 
                            label="Name"
                            value={name}
                            setValue={setName}
                        />
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
                                text="Register" 
                                size="sm" 
                            />
                        </div>
                    </div>
                    <Link to="/login">Already have an account? Login here.</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;