package com.devsuperior.movieflix.services;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.MovieReviewsDTO;
import com.devsuperior.movieflix.dto.MoviesGenreDTO;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.repositories.GenreRepository;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class MovieService {
	
	@Autowired
	private MovieRepository repository;
	
	@Autowired
	private GenreRepository genreRespository;
	
	@Transactional(readOnly = true)
	public MovieDTO findById(Long id){
		Movie movie = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Recurso não encontrado"));
		return new MovieDTO(movie);
	}
	
	@Transactional(readOnly = true)
	public List<MovieReviewsDTO> findMovieWithReviews(Long id) {
		Movie movie = repository.findMovieWithReviews(id)
				.orElseThrow(() -> new ResourceNotFoundException("Recurso não encontrado"));
		return movie.getReviews().stream().map(r -> new MovieReviewsDTO(r)).collect(Collectors.toList());		
	}
	
	@Transactional(readOnly = true)
	public Page<MoviesGenreDTO> findByGenre(Long genreId, Pageable pageable){		
		List<Genre> genres = (genreId == 0) ? null : Arrays.asList(genreRespository.getOne(genreId));
		Page<Movie> movies = repository.findByGenre(genres, pageable);
		return movies.map(m -> new MoviesGenreDTO(m));
	}
}
