package com.first.funfun.dto;

import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class StoryDTO {
    private int storyId;
    private String sellerName;
    private String userEmail;
    private String profilePic;
    private String postImage;
    private String postDescription;
    private Date postUpload;

    private List<ProjectDTO> taggedProjects;
    private int taggedItemCount;
}