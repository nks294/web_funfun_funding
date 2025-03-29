package com.first.funfun.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.first.funfun.dao.ProjectDAO;
import com.first.funfun.dto.ProjectDTO;

import lombok.RequiredArgsConstructor;

//서비스 클래스임을 나타내고 스프링 컨테이너에 빈으로 등록되게 함
@Service
@RequiredArgsConstructor//ProjectDAO클래스도 생성자에 의한 의존 자동주입이
//이루어지도록 처리함
public class ProjectServiceImpl implements ProjectService {

	private final ProjectDAO dao;

	@Override
	public int insert(ProjectDTO dto) {
		//DB와 관련된 작업을 할 수 있는 DAO클래스가 필요함
		//:ProjectDAO클래스 정의함
		return dao.insert(dto);
	}

	@Override
	public List<ProjectDTO> getProjectList() {
		//할일 목록 가져오기
		return dao.getProjectList();
	}

	@Override
	public List<ProjectDTO> getProjectRank() {
		// 좋아요 순위 가져오기
		return dao.getProjectRank();
	}
	
	@Override
	public List<ProjectDTO> getPremiumList() {
		// 광고 등록한 게시물 가져오기
		return dao.getPremiumList();
	}

	@Override
	public List<ProjectDTO> getPopularList(String sortBy) {
		return dao.getPopularList(sortBy);
	}

	@Override
	public List<ProjectDTO> getRecentList() {
		return dao.getRecentList();
	}
	
	@Override
	public List<ProjectDTO> getViewList() {
		return dao.getViewList();
	}
	
	@Override
	public List<ProjectDTO> getReadyList() {
		return dao.getReadyList();
	}


	@Override
	public List<ProjectDTO> getProjectSearch(String searchTerm, String sortBy) {
		return dao.getProjectSearch(searchTerm, sortBy);
	}
	
	@Override
	public List<ProjectDTO> getProjectDiscover(String main, String sub, String sortBy) {
		return dao.getProjectDiscover(main, sub, sortBy);
	}
	
	@Override
	public ProjectDTO getProject(String id) {
		//아이디에 해당하는 할일 가져오기
		return dao.getProject(id);
	}

	@Override
	public int updateProject(ProjectDTO dto) {
		return dao.updateProject(dto);
	}

	@Override
	public int deleteProject(String id) {
		return dao.deleteProject(id);
	}




}
