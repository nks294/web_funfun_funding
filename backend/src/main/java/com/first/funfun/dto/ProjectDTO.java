package com.first.funfun.dto;

import java.util.Date;

import lombok.Data;

@Data 
public class ProjectDTO {
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
    private String articleTitle;
    private String userNickname;
    private int projectRank;
    private int projectView;
    
}
