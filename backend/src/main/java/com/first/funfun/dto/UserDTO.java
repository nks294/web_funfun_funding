package com.first.funfun.dto;

import java.util.Date;

import lombok.Data;

@Data
public class UserDTO {
	private String userEmail; // 사용자 아이디(이메일)
	private String userPw; // 사용자 비밀번호
	private String userBirthday; //사용자 생일(YYYYMMDD형식의 8자리)
	private String userPhone; // 사용자 핸드폰번호(010다음의 -을 포함한 9자리)
	private String userName; // 사용자 실명
	private String userGender; // 사용자 성별
	private String userNickName; // 사용자 닉네임
	private int userAuthLevel; // 회원 권한표기 (1:후원자, 2:창작자, 3:관리자
	private Date userRegDate;// 가입일
	private Date userUpdateDate;// 수정일
	private String userStatus;// 회원상태(삭제요청여부:N(미요청), Y(요청))
}
