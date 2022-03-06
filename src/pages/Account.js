import { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

import UserContext from '../context';

const Account = ({ history }) => {
    const [state] = useContext(UserContext);
    const [subscriptions, setSubscriptions] = useState([]);

    const getSubscriptions = async () => {
        const { data: { data } } = await axios.get('/subscriptions');
        setSubscriptions(data);
    };

    const manageSubscriptions = async () => {
        const { data } = await axios.get('/customer-portal');
        window.open(data);
    };

    useEffect(() => {
        if (!state || !state.token) return;
        getSubscriptions();
    }, [state]);
    console.log(subscriptions);
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6">
                    <h1 className="mt-3">Account</h1>
                    <p className="lead d-none d-md-block">Subscription Status</p>
                </div>
                <div className="col-12 col-md-6">
                    <UserOutlined className="display-4 d-none d-md-inline" />
                    <h5>{state.user.email}</h5>
                </div>
                
                
            </div>

            <div className="row">
                {subscriptions.length > 0 && subscriptions ? subscriptions.map(sub => (
                    <div key={sub.id}>
                        <section>
                            <hr />
                            <h4 className="fw-bold">{sub.plan.nickname}</h4>
                            <h5>
                                {(sub.plan.amount / 100).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: sub.plan.currency
                                })}
                            </h5>
                            <p>Status: {sub.status}</p>
                            <p>Card last 4 digit: {sub.default_payment_method.card.last4}</p>
                            <p>
                                Current Period end: {
                                    moment(sub.current_period_end * 1000)
                                        .format('dddd, MMMM Do YYYY h:mm:ss')
                                        .toString()
                                }
                            </p>
                            {sub.status === 'active' ? (
                                <Fragment>
                                    <button 
                                        className="btn btn-outline-info p-2"
                                        onClick={() => history.push(`/${sub.plan.nickname.toLowerCase()}`)}
                                    >
                                        Access
                                    </button>
                                    <button 
                                        className="btn btn-outline-warning p-2 mx-4"
                                        onClick={manageSubscriptions}
                                    >
                                        Manage Subscription
                                    </button>
                                </Fragment>
                            ) : ""}
                        </section>
                    </div>
                )) : (
                    <div>
                        <hr />
                        <h4 className="fw-bold">you have no subscriptions.</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Account;