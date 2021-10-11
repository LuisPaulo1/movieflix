package com.devsuperior.movieflix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieReviewsDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.repositories.UserRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class ReviewService {
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private MovieRepository movieRepository; 
	
	@Autowired
	private UserRepository userRepository;	
	
	@PreAuthorize("hasAnyRole('MEMBER')")
	@Transactional
	public MovieReviewsDTO saveReviews(ReviewDTO reviewDTO) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userRepository.findByEmail(username);
		Movie movie = movieRepository.findById(reviewDTO.getMovieId())
				.orElseThrow(() -> new ResourceNotFoundException("Recurso não encontrado"));
		Review review = new Review(reviewDTO.getText(), movie, user);
		return new MovieReviewsDTO(reviewRepository.save(review));
	}

}