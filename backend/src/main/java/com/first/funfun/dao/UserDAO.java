package com.first.funfun.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.first.funfun.dto.UserDTO;

import lombok.RequiredArgsConstructor;

//DB와 관련된 작업을 하는 클래스로 스프링 컨테이너에 빈으로 등록
//:@Repository 어노테이션을 붙음
@Repository
@RequiredArgsConstructor
public class UserDAO {

	public static final String Mapper = "com.first.funfun.mapper.UserMapper";
	//MyBatis를 사용할 때 각각의 Mapper 내에 있는 SQL구문을 Mapper의 네임스페이스와 SQL구문의 id값으로
	//구분하므로 각 Mapper파일의 네임스페이스를 상수로 정의해서 SqlSession메소드 호출시 사용함

	private final SqlSession sqlSession;
	//MaBatis를 이용한 DB작업은 SqlSession객체가 담당함

	//로그인
	public UserDTO login(UserDTO dto) {
		return sqlSession.selectOne(Mapper+".login", dto);
	}

	//회원가입
	public int insertUser(UserDTO dto) {
		return sqlSession.insert(Mapper+".insertUser", dto);
	}

	//회원목록 가져오기
	public List<UserDTO> getUserList() {
		return sqlSession.selectList(Mapper+".getUserList");
	}

	//회원정보 변경하기
	public int updateUser(UserDTO dto) {
		return sqlSession.update(Mapper+".updateUser", dto);
	}

	public UserDTO getUser(int uIdx) {
		return sqlSession.selectOne(Mapper+".getUser", uIdx);
	}

	//회원정보 중 user_status 값을 Y로 변경함
	public int deleteUser(int uIdx) {
		return sqlSession.update(Mapper+".deleteUser", uIdx);
	}




}
