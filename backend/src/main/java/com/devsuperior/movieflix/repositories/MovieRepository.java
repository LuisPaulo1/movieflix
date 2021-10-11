package com.devsuperior.movieflix.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
	
	@Query("SELECT m FROM Movie m JOIN FETCH m.reviews WHERE m.id = :id")
	Optional<Movie> findMovieWithReviews(Long id);
	
	@Query("SELECT obj FROM Movie obj WHERE COALESCE(:genres) IS NULL OR obj.genre IN :genres ORDER BY obj.title")
	Page<Movie> findByGenre(List<Genre> genres, Pageable pageable);	
}
