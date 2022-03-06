import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import PriceCard from '../components/cards/PriceCard';
import UserContext from '../context';

const Home = () => {
    const [state] = useContext(UserContext);
    const [prices, setPrices] = useState();
    const [userSubscriptions, setUserSubscriptions] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetchPrices();
    }, []);

    useEffect(() => {
        let result = [];
        state?.user?.subscriptions?.forEach(sub => {
            if (sub.status === 'active') result.push(sub.plan.id);
        });
        setUserSubscriptions(result);
    }, [state]);

    const fetchPrices = async () => {
        const { data } = await axios.get('/prices');
        setPrices(data);
    };

    const handleClick = async (e, price) => {
        e.preventDefault();
        if (userSubscriptions && userSubscriptions.includes(price.id)) {
            return history.push(`/${price.nickname.toLowerCase()}`);
        }
        if (!state || !state.token) return history.push('/register');

        const { data } = await axios.post('/create-subscription', {
            priceId: price.id,
        });

        window.open(data);
    };

    return (
        <div className="container-fluid">
            <div className="row col-md-6 offset-md-3 text-center">
                <h1 className="pt-5 fw-bold">Explore the right plan for your business</h1>
                <p className="lead pb-4">Choose the plan that suites you best!</p>
            </div>
            <div className="row pt-5 mb-3 text-center">
                {prices && prices.map(price => (
                    <PriceCard 
                        key={price.id} 
                        price={price}
                        handleSubscription={handleClick}
                        userSubscriptions={userSubscriptions}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;