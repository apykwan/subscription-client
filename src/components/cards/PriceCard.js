import { useContext } from 'react';

import UserContext from '../../context';

const PriceCard = ({ price, handleSubscription, userSubscriptions }) => {
    const [state] = useContext(UserContext);

    const dynamicDescription = plan => {
        if (plan === 'BASIC') return "5 execlusive stocks";
        if (plan === 'STANDARD') return "10 execlusive stocks";
        if (plan === 'PREMIUM') return "15 execlusive stocks";
    };

    const buttonStyle = plan => {
        return plan === "BASIC" ? "btn-outline-success" : "btn-success";
    };

    const headerStyle = plan => {
        return plan === "PREMIUM" ? "bg-success text-light" : "";
    };

    const borderStyle = plan => {
        return plan === "PREMIUM" ? "border-success" : "";
    };

    const buttonText = () => {
        return state && state.token ? "Buy the plan" : "Sign Up"
    };

    return (
        <div className="col">
            <div className={`card mb-4 rounded-3 shadow-sm ${borderStyle(price.nickname)}`}>
                <div className={`card-header py-3 ${headerStyle(price.nickname)}`}>
                    <h4 className="my-0">{price.nickname}</h4>
                </div>
                <div className="card-body">
                    <h1 className="card-title pricing-card-title">
                        {(price.unit_amount / 100).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD"
                        })} <small className="text-muted fw-light">/ Month</small>
                    </h1>
                    <ul className="list-unstyled mt-3 mb-4">
                        <li className="p-3 fw-bold text-success">{dynamicDescription(price.nickname)}</li>
                        <li className="p-3">Free Market Analysis</li>
                        <li className="p-3">Email Support</li>
                        <li className="p-3">Help Center Access</li>
                    </ul>

                    <button 
                        className={`w-100 btn btn-lg ${buttonStyle(price.nickname)}`}
                        onClick={e => handleSubscription(e, price)}
                    >
                        {userSubscriptions && userSubscriptions.includes(price.id) ? 'Access Plan' : buttonText()}
                    </button>
                </div>
            </div>
        </div>
  );
};

export default PriceCard;