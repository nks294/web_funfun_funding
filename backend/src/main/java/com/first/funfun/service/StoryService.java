package com.first.funfun.service;

import java.util.List;
import com.first.funfun.dto.StoryDTO;

public interface StoryService {
    List<StoryDTO> getStoryList();

    List<StoryDTO> getStoryListBySeller(String user);
    
    StoryDTO getStory(int storyId);

    int insertStory(StoryDTO dto, List<Integer> projectIds);
}