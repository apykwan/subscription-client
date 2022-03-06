import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import UserContext from '../context';

const Facebook = ({ buttonText }) => {
    const history = useHistory();
    const [, setState] = useContext(UserContext);

    const responseFacebook = async response => {
        try {
            const url = `https://graph.facebook.com/v2.11/${response.userID}/?fields=id,name,email&access_token=${response.accessToken}`;
            const facebookResponse = await axios.get(url);

            const { email, name } = facebookResponse.data;
            if (!email || !name) return toast.error('Please check your Facebook account!');

            try {
                const { data } = await axios.post('/facebook-login', {
                    name,
                    email
                });

                if (data.error) return toast.error(data.error);
                setState(data);
                toast.success(`Welcome, ${data.user.name}.`);
                localStorage.setItem('auth_subscriptions', JSON.stringify(data));
                history.push('/');
            } catch (err) {
                console.log(err)
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-grid">
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad
                callback={responseFacebook}
                render={renderProps => (
                    <button 
                        onClick={renderProps.onClick} 
                        className="btn btn-primary btn-lg btn-block"
                    >
                        <i className="fab fa-facebook mx-3"></i>
                        <span>{buttonText}</span>
                    </button>
                )}
            />
        </div>
    );
};

export default Facebook;