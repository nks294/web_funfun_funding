package com.first.funfun.service;

//import java.util.List;

import com.first.funfun.dto.ArticleDTO;

public interface ArticleService {

	ArticleDTO getArticle(int id);

	int articleLike(int id);

	int articleCancleLike(int id);

	int getLike(int id);
	
}
