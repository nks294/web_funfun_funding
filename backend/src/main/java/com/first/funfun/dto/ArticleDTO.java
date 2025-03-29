package com.first.funfun.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ArticleDTO {
	private int articleId; // 게시글의 아이디
	private String articleTitle; // 게시글 제목
	private String articleBody; //게시글 내용
	private int articleRewardBalance1; // 후원 금액 1
	private String articleRewardItem1; // 후원 보상 1
	private int articleRewardBalance2; // 후원 금액 2
	private String articleRewardItem2; // 후원 보상 2
	private int articleRewardBalance3; // 후원 금액 3
	private String articleRewardItem3; // 후원 보상 3
	private int articleRewardBalance4; // 후원 금액 4
	private String articleRewardItem4; // 후원 보상 4
	private int articleRewardBalance5; // 후원 금액 5
	private String articleRewardItem5; // 후원 보상 5
	private int articleRewardBalance6; // 후원 금액 6
	private String articleRewardItem6; // 후원 보상 6
	
	// join 시 표시할 데이터
	private String projectId;
	private String projectName;
	private float projectFun;
	private int projectLikes;
	private int projectGoal;
	private int projectCurrent;
	private int projectPeople;
	private String projectAuthor;
	private String projectMainCate;
	private String projectSubCate;
	private Date projectUpload;
	private Date projectUpdate;
	private Date projectOpen;
	private Date projectExpiration;
	private int projectPremium;
    private String userNickname;
    private int projectRank;
    private int projectView;
}
