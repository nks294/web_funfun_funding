package com.first.funfun.dao;

import java.util.HashMap;
//import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.first.funfun.dto.ArticleDTO;

import lombok.RequiredArgsConstructor;

//DB와 관련된 작업을 하는 클래스로 스프링 컨테이너에 빈으로 등록
//:@Repository 어노테이션을 붙음
@Repository
@RequiredArgsConstructor
public class ArticleDAO {

	public static final String Mapper = "com.first.funfun.mapper.ArticleMapper";
	//MyBatis를 사용할 때 각각의 Mapper 내에 있는 SQL구문을 Mapper의 네임스페이스와 SQL구문의 id값으로
	//구분하므로 각 Mapper파일의 네임스페이스를 상수로 정의해서 SqlSession메소드 호출시 사용함

	private final SqlSession sqlSession;
	//MaBatis를 이용한 DB작업은 SqlSession객체가 담당함

	// 게시글 정보 가져오기
	public ArticleDTO getArticle(int id) {
		return sqlSession.selectOne(Mapper+".getArticle", id);
	}
	
	// 좋아요
	public int articleLike(int id) {
		Map<String, Object> params = new HashMap<>();
		params.put("id", id);
		return sqlSession.update(Mapper+".articleLike", params);
	}

	// 좋아요 취소
	public int articleCancleLike(int id) {
		Map<String, Object> params = new HashMap<>();
		params.put("id", id);
		return sqlSession.update(Mapper+".articleCancleLike", params);
	}
	
	// 좋아요수 조회
	public int getLike(int id) {
		return sqlSession.selectOne(Mapper+".getLike", id);
	}
	
//	//회원목록 가져오기
//	public List<UserDTO> getUserList() {
//		return sqlSession.selectList(Mapper+".getUserList");
//	}


}
