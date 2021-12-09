import ResultCard from 'components/ResultCard';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { requestBackend } from 'util/requests';
import { MovieReviews } from 'types/movieReviews';
import { MovieDetails } from 'types/movieDetails';
import { Review } from 'types/review';
import { hasAnyRoles } from 'util/auth';

import './styles.css';

type UrlParams = {
    movieId: string;
}

const MoviesDetails = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Review>();

    const { movieId } = useParams<UrlParams>();

    const [movieDetail, setMovieDetails] = useState<MovieDetails>();

    const [movieReview, setMovieReviews] = useState<[MovieReviews]>();    

    const [review, setReview] = useState(0);

    useEffect(() => {
        const params: AxiosRequestConfig = {
            method: 'GET',
            url: `/movies/${movieId}`,
            withCredentials: true
        };
        requestBackend(params)
            .then(response => {
                setMovieDetails(response.data);
            }).catch(error => {
                console.log(error);
            })
    }, [movieId]);

    useEffect(() => {
        const params: AxiosRequestConfig = {
            method: 'GET',
            url: `/movies/${movieId}/reviews`,
            withCredentials: true
        };
        requestBackend(params)
            .then(response => {
                setMovieReviews(response.data);
                setReview(0)
            }).catch(error => {
                console.log(error);
            })
    }, [movieId, review]);


    const onSubmit = (review: Review) => {

        const params: AxiosRequestConfig = {
            method: 'POST',
            url: '/reviews',
            data: review,
            withCredentials: true
        }

        requestBackend(params).then(() => {
            setReview(1)
            setValue("text", "");
        });
    }

    return (

        <div className="bg-container">

            <div className="container-detail-movie">
                <div className="detail-img">
                    <img src={movieDetail?.imgUrl} alt={movieDetail?.title} />
                </div>
                <div className="detail-info">
                    <h2>{movieDetail?.title}</h2>
                    <h4>{movieDetail?.year}</h4>
                    <span>{movieDetail?.subTitle}</span>
                    <p>{movieDetail?.synopsis}</p>
                </div>
            </div>          

            {hasAnyRoles(['ROLE_MEMBER']) &&
                <div className="container-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register("text", {
                                required: 'Campo obrigatório',
                            })}
                            type="text"
                            placeholder="Deixe sua avaliação aqui"
                            name="text"
                        />
                        <div className="invalid-feedback d-block">{errors.text?.message}</div>
                        <input
                            {...register("movieId", {
                                required: 'Campo obrigatório',
                            })}
                            type="text"
                            name="movieId"
                            className="d-none"
                            value={movieId}
                        />
                        <button>Salvar avaliação</button>
                    </form>
                </div>
            }

            <div className="container-result">                                               
                {
                    movieReview?.map((movieReview) => (
                        <ResultCard key={movieReview.id} review={movieReview} />
                    ))
                }
            </div>
        </div>

    )
}

export default MoviesDetails;