import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Genre } from 'types/genre';
import { requestBackend } from "util/requests";
import Select from 'react-select';

import "./styles.css";

export type MovieFilterData = {
    name: string;
    genre: Genre | null;
};

type Props = {
    onSubmitFilter: (data: MovieFilterData) => void;
};

const MovieFilter = ({ onSubmitFilter }: Props) => {

    const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

    const { handleSubmit, setValue, getValues, control } = useForm<MovieFilterData>();

    const onSubmit = (formData: MovieFilterData) => {
        onSubmitFilter(formData);
    };

    const handleChangeGenre = (value: Genre) => {        
        setValue('genre', value);
        
        const obj: MovieFilterData = {
            name: getValues('name'),
            genre: getValues('genre'),
        };

        onSubmitFilter(obj);
    };

    useEffect(() => {
        requestBackend({method: 'GET', url: '/genres', withCredentials: true }).then((response) => {
            setSelectGenres(response.data);            
        });
    }, []);


    return (
        <div className="movie-filter-genre-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="select-container">
                    <Controller
                        name="genre"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={selectGenres}
                                isClearable
                                placeholder="Gênero"
                                classNamePrefix="genre-filter-select"
                                onChange={(value) => handleChangeGenre(value as Genre)}
                                getOptionLabel={(genre: Genre) => genre.name}
                                getOptionValue={(genre: Genre) => String(genre.id)}                                
                            />
                        )}
                    />
                </div>
            </form>
        </div>
    )
}

export default MovieFilter;