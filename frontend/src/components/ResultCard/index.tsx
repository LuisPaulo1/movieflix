import start from 'assets/images/star.svg';
import { MovieReviews } from 'types/movieReviews';

import './styles.css';

type Props = {
    reviews: MovieReviews;
}

const ResultCard = ({ reviews }: Props) => {

    return (
        <>
            <div className="info">
                <img src={start} alt="estrela" />
                <h4>{reviews.user.name}</h4>
            </div>
            <div className="descricao">
                <p>{reviews.text}</p>
            </div>
        </>
    )
}

export default ResultCard;