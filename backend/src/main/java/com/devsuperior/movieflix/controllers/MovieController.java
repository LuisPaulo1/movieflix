package com.devsuperior.movieflix.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.MovieReviewsDTO;
import com.devsuperior.movieflix.dto.MoviesGenreDTO;
import com.devsuperior.movieflix.services.MovieService;

@RestController
@RequestMapping(path = "/movies")
public class MovieController {
	
	@Autowired
	private MovieService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<MovieDTO> findById(@PathVariable Long id){
		MovieDTO movieDTO = service.findById(id);
		return ResponseEntity.ok(movieDTO);
	}
	
	@GetMapping("/{id}/reviews")
	public ResponseEntity<List<MovieReviewsDTO>> findMovieWithReviews(@PathVariable Long id){
		List<MovieReviewsDTO> reviews = service.findMovieWithReviews(id);
		return ResponseEntity.ok(reviews);
	}
	
	@GetMapping
	public ResponseEntity<Page<MoviesGenreDTO>> findByGenre(
			@RequestParam(name = "genreId", defaultValue = "0") Long genreId,
			Pageable pageable){		
		Page<MoviesGenreDTO> movies = service.findByGenre(genreId, pageable);
		return ResponseEntity.ok(movies);
	}

}
