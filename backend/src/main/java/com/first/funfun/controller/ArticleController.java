package com.first.funfun.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.first.funfun.dto.ArticleDTO;
import com.first.funfun.service.ArticleService;

import lombok.RequiredArgsConstructor;

//REST API를 처리할 수 있는 컨트롤러로 명시함
@RestController
@RequestMapping("/Article")
@RequiredArgsConstructor
public class ArticleController {

	//요청에 대해서 실제적으로 처리하는 클래스: UserServiceImple클래스
	//상위의 인터페이스를 이용해서 필드로 정의함
	private final ArticleService articleService;
	//스프링 컨테이너로 부터 의존 자동주입을 받기 위해서 클래스 위에
	//@RequiredArgsConstructor 어노테이션을 추가함

	//게시글 정보 가져오기
	@GetMapping("/getArticle/{id}")
	public ArticleDTO getAricle(
			@PathVariable int id) {
		ArticleDTO article = null;//회원 조회 내용이 없을 때 결과값

		article = articleService.getArticle(id);

		return article;
	}

	// 좋아요 수 가져오기
	@GetMapping("/getLike/{id}")
	public int getLike(
			@PathVariable String id) {
		int likes = 0;//회원 조회 내용이 없을 때 결과값

		likes = articleService.getLike(Integer.parseInt(id));

		return likes;
	}

	// 좋아요
	@PutMapping("/articleLike")
	public int articleLike(
			@RequestParam int id) {
		int result = 0;//조회된 결과가 없을 때 결과값

//		if(articleService.articleLike(dto) == 1) {
//			result =  getLike();//할일 변경 성공 시 할일 목록 조회
//		}
		result = articleService.articleLike(id);

		return result;
	}
	
	// 좋아요 취소
	@PutMapping("/articleCancleLike")
	public int articleCancleLike(
			@RequestParam int id) {
		int result = 0;//조회된 결과가 없을 때 결과값

//		if(articleService.articleLike(dto) == 1) {
//			ProjectList =  updateArticleLike();//할일 변경 성공 시 할일 목록 조회
//		}
		result = articleService.articleCancleLike(id);

		return result;
	}
		
}
