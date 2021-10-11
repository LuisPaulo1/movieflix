import { ReactComponent as MainImage } from 'assets/images/login.svg';
import Login from 'pages/Login';

import './styles.css';

const Home = () => {
    return (
        <div className="login-container">

            <div className="info-card">
                
                <h1>Avalie Filmes</h1>
                <p>Diga o que você achou do seu <br /> filme favorito</p>

                <div className="login-image">
                    <MainImage />
                </div>

            </div>

            <Login />

        </div>
    )
}

export default Home;