import { useContext, useEffect } from 'react';
import axios from 'axios';
import { SyncOutlined } from '@ant-design/icons';

import UserContext from '../context';

const StripeSuccess = ({ history }) => {
    const [, setState] = useContext(UserContext);
    useEffect(() => {
        getSubscriptionStatus();
    }, []);

    const getSubscriptionStatus = async () => {
        const { data } = await axios.get('/subscription-status');

        if (data && data.length === 0) return history.push('/');
        
        // update user in local storage
        const auth = JSON.parse(localStorage.getItem('auth_subscriptions'));
        auth.user = data;
        localStorage.setItem('auth_subscriptions', JSON.stringify(auth));
        
        // update user in context
        setState(auth);
        setTimeout(() => {
            history.push('/account');
        }, 1000); 
    };

    return (
        <div className="d-flex justify-content-center fw-bold" style={{ height: "90vh" }}>
            <div className="d-flex align-items-center">
                <SyncOutlined spin style={{ fontSize: "50px" }} />
            </div>
        </div>
    );
};

export default StripeSuccess;