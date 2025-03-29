package com.first.funfun.service;

import java.util.List;

import com.first.funfun.dto.ProjectDTO;

public interface ProjectService {

	int insert(ProjectDTO dto);

	List<ProjectDTO> getProjectList();
	
	List<ProjectDTO> getProjectRank();
	
	List<ProjectDTO> getPremiumList();
	
	List<ProjectDTO> getViewList();
	
	List<ProjectDTO> getProjectSearch(String searchTerm, String sortBy);

	List<ProjectDTO> getPopularList(String sortBy);
	
	List<ProjectDTO> getReadyList();
	
	List<ProjectDTO> getProjectDiscover(String main, String sub, String sortBy);

	ProjectDTO getProject(String id);

	int updateProject(ProjectDTO dto);

	int deleteProject(String id);

	List<ProjectDTO> getRecentList();




}
