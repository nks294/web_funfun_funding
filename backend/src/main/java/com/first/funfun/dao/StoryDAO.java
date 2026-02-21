package com.first.funfun.dao;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import com.first.funfun.dto.StoryDTO;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class StoryDAO {

    public static final String Mapper = "com.first.funfun.mapper.StoryMapper";
    private final SqlSession sqlSession;

    // 스토리 전체 목록 가져오기 (태그 정보 포함)
    public List<StoryDTO> getStoryList() {
        return sqlSession.selectList(Mapper + ".getStoryList");
    }

    // 스토리 전체 목록 가져오기 (특정 사용자)
    public List<StoryDTO> getStoryListBySeller(String user) {
        return sqlSession.selectList(Mapper + ".getStoryListBySeller", user);
    }

    // 특정 스토리 상세 조회
    public StoryDTO getStory(int storyId) {
        return sqlSession.selectOne(Mapper + ".getStory", storyId);
    }

    // 스토리 등록
    public int insertStory(StoryDTO dto) {
        return sqlSession.insert(Mapper + ".insertStory", dto);
    }

    // 스토리 태그 등록 (프로젝트 연결)
    public int insertStoryTag(int storyId, int projectId) {
        java.util.Map<String, Object> params = new java.util.HashMap<>();
        params.put("storyId", storyId);
        params.put("projectId", projectId);
        return sqlSession.insert(Mapper + ".insertStoryTag", params);
    }
}