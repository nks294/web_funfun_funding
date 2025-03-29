package com.first.funfun.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.first.funfun.dto.ProjectDTO;
import com.first.funfun.service.ProjectService;

import lombok.RequiredArgsConstructor;

//REST API에 대해서 처리해 줄 수 있는 컨트롤러
@RestController
@RequestMapping("/Project")
@RequiredArgsConstructor
public class ProjectController {
	//메소드 내에서 사용되는 클래스에 대한 개체 주입을
	//생성자 방식을 이용해서 자동으로 주입받을 수 있도록 함
	//lombok API에서 @RequiredArgsConstructor 어노테이션을
	//클래스 위에 붙이고 필드에는 final을 붙여줌
	private final ProjectService ProjectService;

	//이하 구문을 lombok의 @RequiredArgsConstructor 어노테이션을
	//사용함으로써 대체함
    //	@Autowired //자동으로 의존주입을 받을 수 있는 방식: 생성자를 이용한 방식
    //	public ProjectController(ProjectService ProjectService) {
    //		this.ProjectService = ProjectService;
    //	}

	//할일 1개를 Project 테이블에 추가하기
	@PostMapping("/insert")
	public List<ProjectDTO> insert(@RequestBody ProjectDTO dto) {
	//@RequestBody: 사용자로부터 전달되는 데이터가 HTTP의 body부분에
	//포함되어졌을 경우 그것을 받는 객체임을 나타내줌

		List<ProjectDTO> projectList = null; //조회된 결과가 없을 때 결과값

		//사용자로부터 받은 데이터를 DB에 저장하려면
		//ProjectServiceImpl 클래스를 이용해야 함
		//스프링으로부터 의존주입을 받아서 이용함
		//입력값이 정상적으로 DB에 입력이 되면 1을 반환하게 됨
		if(ProjectService.insert(dto) == 1) {//정상 입력되어진 경우
			projectList =  getProjectList();//할일 추가 성공 시 할일 목록 조회
		}

		return projectList;
	}

	// 프로젝트 목록 반환
	@GetMapping("/getProjectList")
	public List<ProjectDTO> getProjectList(){
		List<ProjectDTO> ProjectList = null; //조회된 결과가 없을 때 결과값
		ProjectList = ProjectService.getProjectList();
		return ProjectList;
	}

	// 프로젝트 순위 반환하기
	@GetMapping("/getProjectRank")
	public List<ProjectDTO> getProjectRank(){
		List<ProjectDTO> ProjectList = null; //조회된 결과가 없을 때 결과값
		ProjectList = ProjectService.getProjectRank();
		return ProjectList;
	}

	// 광고 등록한 프로젝트 반환
	@GetMapping("/getPremiumList")
	public List<ProjectDTO> getPremiumList(){
		List<ProjectDTO> ProjectList = null; //조회된 결과가 없을 때 결과값
		ProjectList = ProjectService.getPremiumList();
		return ProjectList;
	}

	// 인기 프로젝트 목록
	
	@GetMapping("/getPopularList")
	public List<ProjectDTO> getPopularList(
			@RequestParam(required = false, defaultValue = "") String sortBy){
		List<ProjectDTO> ProjectList = null; //조회된 결과가 없을 때 결과값
		ProjectList = ProjectService.getPopularList(sortBy);
		return ProjectList;
	}

	// 조회수 순위
	@GetMapping("/getViewList")
	public List<ProjectDTO> getViewList() {
		List<ProjectDTO> ProjectList = null; //조회된 결과가 없을 때 결과값
		ProjectList = ProjectService.getViewList();
		return ProjectList;
	}
	
	// 최근 업로드 순서대로 프로젝트 반환
	@GetMapping("/getRecentList")
	public List<ProjectDTO> getRecentList(){
		List<ProjectDTO> ProjectList = null; //조회된 결과가 없을 때 결과값
		ProjectList = ProjectService.getRecentList();
		return ProjectList;
	}
	
	// 최근 업로드 순서대로 프로젝트 반환
	@GetMapping("/getReadyList")
	public List<ProjectDTO> getReadyList(){
		List<ProjectDTO> ProjectList = null; //조회된 결과가 없을 때 결과값
		ProjectList = ProjectService.getReadyList();
		return ProjectList;
	}
	
	// 프로젝트 검색결과 반환하기
	@GetMapping("/getProjectSearch")
	public List<ProjectDTO> getProjectSearch(
			// 파라미터 정의
			@RequestParam(value = "q", required = false, defaultValue = "") String searchTerm,
			@RequestParam(required = false, defaultValue = "") String sortBy ){
		
		//조회된 결과가 없을 때 결과값
		List<ProjectDTO> ProjectList = null;
		
		ProjectList = ProjectService.getProjectSearch(searchTerm, sortBy);
		return ProjectList;
	}
	
	// 프로젝트 카테고리별 반환
	@GetMapping("/getProjectDiscover")
	public List<ProjectDTO> getProjectDiscover(
		// 파라미터 정의
        @RequestParam(required = false, defaultValue = "") String main,
        @RequestParam(required = false, defaultValue = "all") String sub,
        @RequestParam(required = false, defaultValue = "upload") String sortBy) {
		
		//조회된 결과가 없을 때 결과값
		List<ProjectDTO> ProjectList = null;
		
		ProjectList = ProjectService.getProjectDiscover(main, sub, sortBy);
		return ProjectList;
	}
	
	//할일 1개를 반환하기
	@GetMapping("/{id}/getProject")
	// URL을 통해서 들어오는 값을 변수로 사용할 수 있도록 해주는 경로변수
	// {경로변수명}으로 정의함
	// 요청을 처리하는 메소드의 매개변수로 저장할 때는 @PathVariable("경로변수명")을
	// 사용함
	public ProjectDTO getProject(@PathVariable("id") String id) {
		ProjectDTO dto = null; //조회된 데이터가 없을 때 결과값

		dto = ProjectService.getProject(id);

		if(dto != null) {
			System.out.println("정상적으로 조회되었습니다");
		}else {
			System.out.println("조회된 결과가 없습니다");
		}

		return dto;
	}

	//할일 변경하기
	@PutMapping("/updateProject")
	public List<ProjectDTO> updateProject(@RequestBody ProjectDTO dto) {
		List<ProjectDTO> ProjectList = null;// 조회된 결과가 없을 때 결과값

		if(ProjectService.updateProject(dto) == 1) {
			ProjectList =  getProjectList();// 할일 변경 성공 시 할일 목록 조회
		}

		return ProjectList;
	}

	// 완료된 할일 삭제하기
	@DeleteMapping("/{id}/deleteProject")
	// URL을 통해서 들어오는 값을 변수로 사용할 수 있도록 해주는 경로변수
	// {경로변수명}으로 정의함
	// 요청을 처리하는 메소드의 매개변수로 저장할 때는 @PathVariable("경로변수명")을
	// 사용함
	public List<ProjectDTO> deleteProject(@PathVariable("id") String id) {
		List<ProjectDTO> ProjectList = null;//조회된 결과가 없을 때 결과값

		if(ProjectService.deleteProject(id) == 1) {
			ProjectList =  getProjectList();//할일 삭제 성공 시 할일 목록 조회
		}

		return ProjectList;
	}



}
