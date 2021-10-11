import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTokenData, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';
import { AuthContext } from 'AuthContext';
import history from 'util/history';

import './styles.css';

const Navbar = () => {

    const { authContextData, setAuthContextData } = useContext(AuthContext);
    
    useEffect(() => {
        if (isAuthenticated()) {
            setAuthContextData({
                authenticated: true,
                tokenData: getTokenData()
            });
        } else {
            setAuthContextData({
                authenticated: false
            });
        }
    }, [setAuthContextData]);

    const handleSairClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        removeAuthData();
        setAuthContextData({
          authenticated: false
        });
        history.replace('/');
    }

    return (
        <nav className="navbar bg-primary main-nav">
            <Link to="/movies" className="nav-logo-text">
                <h4>MovieFlix</h4>
            </Link>
            {authContextData.authenticated ? (
                <button onClick={handleSairClick}>Sair</button>
            ) :
              ''
            }
        </nav>
    )
}

export default Navbar;