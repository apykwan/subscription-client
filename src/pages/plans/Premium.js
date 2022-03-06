import { useContext, useEffect } from 'react';

import UserContext from '../../context';

const Premium = ({ history, match }) => {
    const [state] = useContext(UserContext);

    useEffect(() => {
        let result = [];
        state?.user?.subscriptions?.forEach(sub => {
            if (sub.status === 'active') result.push(sub.plan.nickname);
        });
        const plan = match.path.split('/')[1].toUpperCase();
        if (!result.includes(plan)) return history.push('/');
    }, [state, match, history]);

    return (
        <div className="container-fluid">
            <div className="row py-5 bg-light text-center">
                <h1 className="display-4 fw-bold">PREMIUM</h1>
                <p className="lead text-success fw-bold">Here are your 5 exclusive stocks of the month:</p>
            </div>

            <div className="container py-5">
                <div className="row">
                    <div className="col-12 col-md-8 p-5 rounded bg-dark text-light">
                        <ul className="lead">
                            <li>Apple Inc.</li>
                            <li>Microsoft Corp.</li>
                            <li>Amazon Inc.</li>
                            <li>Alphabet Inc. Class A</li>
                            <li>Alphabet Inc. Class C</li>
                            <li>Tesla Inc.</li>
                            <li>Berkshire Hathaway Inc. Class B</li>
                            <li>NVIDIA Corp.</li>
                            <li>Meta Platforms Inc. Class A</li>
                            <li>UnitedHealth Group Inc.</li>
                            <li>Johnson & Johnson</li>
                            <li>JPMorgan Chase & Co.</li>
                            <li>Procter & Gamble Company</li>
                            <li>Visa Inc. Class A</li>
                            <li>Exxon Mobil Corporation</li>
                        </ul>
                        <small className="text-muted">*Source: SPY top holdings</small>
                    </div>

                    <div className="col-12 col-md-4 px-5">
                        <h4>Market Analysis</h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quia provident numquam quae optio eaque, illum dolore pariatur officia a.</p>
                        <h4>Email support</h4>
                        <p>Subscription@domain.com</p>
                        <h4>Help Center</h4>
                        1-800-123-4567
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Premium;