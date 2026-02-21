package com.first.funfun.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.first.funfun.dao.StoryDAO;
import com.first.funfun.dto.StoryDTO;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoryServiceImpl implements StoryService {

    private final StoryDAO dao;

    @Override
    public List<StoryDTO> getStoryList() {
        return dao.getStoryList();
    }

    @Override
    public List<StoryDTO> getStoryListBySeller(String user) {
        return dao.getStoryListBySeller(user);
    }

    @Override
    public StoryDTO getStory(int storyId) {
        return dao.getStory(storyId);
    }

    @Override
    @Transactional
    public int insertStory(StoryDTO dto, List<Integer> projectIds) {
        int result = dao.insertStory(dto);
        if (result > 0 && projectIds != null) {
            for (int projectId : projectIds) {
                dao.insertStoryTag(dto.getStoryId(), projectId);
            }
        }
        return result;
    }
}