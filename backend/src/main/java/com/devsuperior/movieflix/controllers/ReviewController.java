package com.devsuperior.movieflix.controllers;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.movieflix.dto.MovieReviewsDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.services.ReviewService;

@RestController
@RequestMapping(path = "/reviews")
public class ReviewController {
	
	@Autowired
	private ReviewService service;
	
	@PostMapping
	public ResponseEntity<MovieReviewsDTO> save(@RequestBody @Valid ReviewDTO reviewDTO){
		MovieReviewsDTO movieReviewsDTO = service.saveReviews(reviewDTO);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(movieReviewsDTO.getId()).toUri();	
		return ResponseEntity.created(uri).body(movieReviewsDTO);	
	}
}
