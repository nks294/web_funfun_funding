package com.first.funfun.service;

//import java.util.List;

import org.springframework.stereotype.Service;

import com.first.funfun.dao.ArticleDAO;
import com.first.funfun.dto.ArticleDTO;

import lombok.RequiredArgsConstructor;

//서비스 클래스임을 나타내고 스프링 컨테이너에 빈으로 등록되게 함
@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

	private final ArticleDAO dao;

	@Override
	public ArticleDTO getArticle(int id) {
		return dao.getArticle(id);
	}

	@Override
	public int getLike(int id) {
		return dao.getLike(id);
	}

	@Override
	public int articleLike(int id) {
		return dao.articleLike(id);
	}

	@Override
	public int articleCancleLike(int id) {
		return dao.articleCancleLike(id);
	}

}
