package com.first.funfun.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.first.funfun.dto.ProjectDTO;

import lombok.RequiredArgsConstructor;

//DB와 관련해서 작업하는 클래스: @Repository을 붙여서 구분하고
//해당 클래스가 빈으로 등록되게 함
@Repository
@RequiredArgsConstructor
public class ProjectDAO {

	public static final String Mapper = "com.first.funfun.mapper.ProjectMapper";
	//MyBatis를 사용할 때 각각의 Mapper 내에 있는 SQL구문을 Mapper의 네임스페이스와 SQL구문의 id값으로
	//구분하므로 각 Mapper파일의 네임스페이스를 상수로 정의해서 SqlSession메소드 호출시 사용함

	private final SqlSession sqlSession;
	//MaBatis를 이용한 DB작업은 SqlSession객체가 담당함

	//할일 추가하기
	public int insert(ProjectDTO dto) {
		return sqlSession.insert(Mapper+".insertProject", dto);
	}

	//할일 목록 가져오기
	public List<ProjectDTO> getProjectList() {
		return sqlSession.selectList(Mapper+".getProjectList");
	}

	public List<ProjectDTO> getProjectRank() {
		return sqlSession.selectList(Mapper+".getProjectRank");
	}
	
	public List<ProjectDTO> getViewList() {
		return sqlSession.selectList(Mapper+".getViewList");
	}
	
	public List<ProjectDTO> getPremiumList() {
		return sqlSession.selectList(Mapper+".getPremiumList");
	}

	public List<ProjectDTO> getPopularList(String sortBy) {
		Map<String, Object> params = new HashMap<>();
		params.put("sortBy", sortBy);
		return sqlSession.selectList(Mapper+".getPopularList", params);
	}
	
	public List<ProjectDTO> getRecentList() {
		return sqlSession.selectList(Mapper+".getRecentList");
	}
	
	public List<ProjectDTO> getReadyList() {
		return sqlSession.selectList(Mapper+".getReadyList");
	}

	public List<ProjectDTO> getProjectSearch(String searchTerm, String sortBy) {
		Map<String, Object> params = new HashMap<>();
		params.put("searchTerm", searchTerm);
		params.put("sortBy", sortBy);
		return sqlSession.selectList(Mapper+".getProjectSearch", params);
	}

	public List<ProjectDTO> getProjectDiscover(String main, String sub, String sortBy) {
		Map<String, Object> params = new HashMap<>();
		params.put("main", main);
		params.put("sub", sub);
		params.put("sortBy", sortBy);
		return sqlSession.selectList(Mapper+".getProjectDiscover", params);
	}
	
	//할일 1개 가져오기
	public ProjectDTO getProject(String id) {
		return sqlSession.selectOne(Mapper+".getProject", id);
	}

	//할일 변경하기
	public int updateProject(ProjectDTO dto) {
		return sqlSession.update(Mapper+".updateProject", dto);
	}

	//할일 삭제하기
	public int deleteProject(String id) {
		return sqlSession.delete(Mapper+".deleteProject", id);
	}



}
