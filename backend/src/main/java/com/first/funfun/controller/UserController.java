package com.first.funfun.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.first.funfun.dto.UserDTO;
import com.first.funfun.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import lombok.RequiredArgsConstructor;

//REST API를 처리할 수 있는 컨트롤러로 명시함
@RestController
@RequestMapping("/User")
@RequiredArgsConstructor
public class UserController {

    // 요청에 대해서 실제적으로 처리하는 클래스: UserServiceImple클래스
    // 상위의 인터페이스를 이용해서 필드로 정의함
    private final UserService userService;
    // 스프링 컨테이너로 부터 의존 자동주입을 받기 위해서 클래스 위에
    // @RequiredArgsConstructor 어노테이션을 추가함

    // 회원정보 입력하기 : POST
    @PostMapping("/insertUser")
    public Map<String, String> insertUser(@RequestBody UserDTO dto) {
        // @RequestBody: HTTP요청 객체의 Body에 저장된 JSON객체를 UserDTO에
        // 변화시켜서 저장해줌
        // 프론트 엔드로 전송되는 데이터의 형식이 JSON형식으로 전달이 되어야 하기 때문에
        // Map자료구조를 이용함. Map은 데이터를 저장할 때 키와 값의 쌍으로 저장하는 특징을 가짐
        // Map자료구조를 객체로 만들어서 사용할 수 있도록 지원하는 클래스: HashMap
        Map<String, String> result = new HashMap<>();

        if (userService.insertUser(dto) == 1) {
            result.put("result", "OK"); // JSON : {"result":"OK"}
        } else {
            result.put("result", "FAIL");
        }

        return result;
    }

    // 로그인 : POST
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody UserDTO dto, HttpServletRequest request) {
        // 프론트 엔드로 전송되는 데이터의 형식이 JSON형식으로 전달이 되어야 하기 때문에
        // Map자료구조를 이용함. Map은 데이터를 저장할 때 키와 값의 쌍으로 저장하는 특징을 가짐
        // Map자료구조를 객체로 만들어서 사용할 수 있도록 지원하는 클래스: HashMap

        Map<String, String> result = new HashMap<>();
        UserDTO resDto = userService.login(dto);
        if (resDto != null) {
            // 로그인 성공 시 세션 생성
            HttpSession session = request.getSession();
            session.setAttribute("loginUser", resDto);

            result.put("result", "OK");
            result.put("userEmail", resDto.getUserEmail());
            result.put("userNickName", resDto.getUserNickName());
            result.put("userAuthLevel", String.valueOf(resDto.getUserAuthLevel()));
        } else {
            result.put("result", "FAIL");
        }

        return result;
    }

    // 회원목록 가져오기
    @GetMapping("/getUserList")
    public List<UserDTO> getUserList(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("loginUser") == null) {
            return null;
        }

        UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
        if (loginUser.getUserAuthLevel() != 3) {
            return null;
        }

        List<UserDTO> userList = null;// 회원 조회 내용이 없을 때 결과값

        userList = userService.getUserList();

        if (userList != null) {
            System.out.println("Controller: getUserList - 조회 완료");
        } else {
            System.out.println("Controller: getUserList - 결과 없음");
        }

        return userList;
    }

    // 회원정보 수정하기
    @PutMapping("/updateUser")
    public Map<String, String> updateUser(@RequestBody UserDTO dto, HttpServletRequest request) {
        Map<String, String> result = new HashMap<>();

        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("loginUser") == null) {
            result.put("result", "FAIL");
            return result;
        }

        UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
        if (!loginUser.getUserEmail().equals(dto.getUserEmail()) && loginUser.getUserAuthLevel() != 3) {
            result.put("result", "FAIL");
            return result;
        }

        if (userService.updateUser(dto) == 1) {
            result.put("result", "OK");
        } else {
            result.put("result", "FAIL");
        }

        return result;
    }

    // 회원정보 탈퇴 처리하기
    @DeleteMapping("/{uIdx}/deleteUser")
    public Map<String, String> deleteUser(@PathVariable String uIdx, HttpServletRequest request) {
        Map<String, String> result = new HashMap<>();

        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("loginUser") == null) {
            result.put("result", "FAIL");
            return result;
        }

        UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
        UserDTO targetUser = userService.getUser(Integer.parseInt(uIdx));

        if (targetUser == null
                || (!loginUser.getUserEmail().equals(targetUser.getUserEmail()) && loginUser.getUserAuthLevel() != 3)) {
            result.put("result", "FAIL");
            return result;
        }

        if (userService.deleteUser(Integer.parseInt(uIdx)) == 1) {
            result.put("result", "OK");// 회원탈퇴 요청 처리 성공
        } else {
            result.put("result", "FAIL");// 회원탈퇴 요청 처리 실패
        }

        return result;
    }

    // 회원번호(uIdx)로 회원정보 가져오기
    @GetMapping("/{uIdx}/getUser")
    public UserDTO getUser(@PathVariable String uIdx) {
        UserDTO dto = userService.getUser(Integer.parseInt(uIdx));

        if (dto != null) {
            System.out.println("Controller: getUser - 조회 완료");
        } else {
            System.out.println("Controller: getUser - 결과 없음");
        }
        return dto;
    }
}