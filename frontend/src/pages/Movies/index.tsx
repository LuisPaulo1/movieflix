import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';
import { MoviesGenres } from 'types/moviesGenres';
import { SpringPage } from "types/vendor/spring";
import { Link } from 'react-router-dom';
import ResultMovie from 'components/ResultMovie';
import MovieFilter, { MovieFilterData } from 'components/MovieFilter';
import Pagination from 'components/Pagination';

import './styles.css';

type ControlComponentsData = {
    activePage: number;
    filterData: MovieFilterData;
};

const Movies = () => {

    const [page, setPage] = useState<SpringPage<MoviesGenres>>();

    const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>(
        {
            activePage: 0,
            filterData: { name: "", genre: null }
        }
    );

    const handlePageChange = (pageNumber: number) => {
        setControlComponentsData({ activePage: pageNumber, filterData: controlComponentsData.filterData });
    };

    const handleSubmitFilter = (data: MovieFilterData) => {
        setControlComponentsData({ activePage: 0, filterData: data });
    };

    const getGenres = useCallback(() => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: '/movies',
            withCredentials: true,
            params: {
                page: controlComponentsData.activePage,
                size: 4,
                name: controlComponentsData.filterData.name,
                genreId: controlComponentsData.filterData.genre?.id
            },
        };

        requestBackend(config).then((response) => {
            setPage(response.data);            
        });
    }, [controlComponentsData]);

    useEffect(() => {
        getGenres();
    }, [getGenres]);

    return (
        <div className="movie-container">
            
            <MovieFilter onSubmitFilter={handleSubmitFilter} />

            <div className="row">
                {
                    page?.content.map((moviesGenre) => (
                        <div className="col-sm-6 col-lg-4 col-xl-3" key={moviesGenre.id}>
                            <Link to={`/movies/${moviesGenre.id}`}>
                                <ResultMovie movie={moviesGenre} />
                            </Link>
                        </div>
                    ))
                }
            </div>
            <Pagination forcePage={page?.number} pageCount={(page) ? page.totalPages : 0} range={3} onChange={handlePageChange} />
        </div>
    )
}

export default Movies;