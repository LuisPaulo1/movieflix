import start from 'assets/images/star.svg';
import { MovieReviews } from 'types/movieReviews';

import './styles.css';

type Props = {
    review: MovieReviews;
}

const ResultCard = ({ review }: Props) => {

    return (
        <>
            <div className="info">
                <img src={start} alt="estrela" />
                <h4>{review.user.name}</h4>
            </div>
            <div className="descricao">
                <p>{review.text}</p>
            </div>
        </>
    )
}

export default ResultCard;