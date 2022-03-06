import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import UserContext from '../context';

const Google = ({ buttonText }) => {
    const history = useHistory();
    const [, setState] = useContext(UserContext);

    const responseGoogle = async response => {
        try {
            const { data } = await axios.post('/google-login', {
                idToken: response.tokenId
            });
    
            if (data.error) return toast.error(data.error);
            setState(data);
            toast.success(`Welcome, ${data.user.name}.`);
            localStorage.setItem('auth_subscriptions', JSON.stringify(data));
            history.push('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-grid mb-4">
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                render={renderProps => (
                    <button 
                        onClick={renderProps.onClick} 
                        disabled={renderProps.disabled}
                        className="btn btn-danger btn-lg btn-block"
                    >
                        <i className="fab fa-google mx-3"></i>
                        <span>{buttonText}</span>
                    </button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default Google;