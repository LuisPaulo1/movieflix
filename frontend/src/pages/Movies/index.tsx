import { Link } from 'react-router-dom';

import './styles.css';

const Movies = () => {
    return (
        <div>
            <h1>Tela listagem de filmes</h1>

            <div className="links">
                <Link to="/movies/1">
                   Acessar /movies/1
                </Link>   
                <Link to="/movies/2">
                    Acessar /movies/2
                </Link>   
            </div>
        </div>
    )
}

export default Movies;