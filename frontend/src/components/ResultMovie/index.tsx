import { MoviesGenres } from 'types/moviesGenres';

import './styles.css';

type Props = {
    movie: MoviesGenres;
}

const ResultMovie = ({ movie }: Props) => {
    return (
        <div className="result-movie-container">
            <div className="movie-img">
                <img src={movie.imgUrl} alt={movie.title} />
            </div>
            <div className="movie-info">
                <h2>{movie.title}</h2>
                <h4>{movie.year}</h4>
                <span>{movie.subTitle}</span>      
            </div>
        </div>
    )
}

export default ResultMovie;