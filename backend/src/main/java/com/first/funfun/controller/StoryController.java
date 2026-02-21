package com.first.funfun.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.first.funfun.dto.StoryDTO;
import com.first.funfun.service.StoryService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/Story")
@RequiredArgsConstructor
public class StoryController {

    private final StoryService storyService;

    // 모든 스토리 목록 조회
    @GetMapping("/getStoryList")
    public List<StoryDTO> getStoryList() {
        return storyService.getStoryList();
    }
    
    // 특정 사용자의 스토리 목록 조회
    @GetMapping("/getStoryList/{sellerEmail}")
    public List<StoryDTO> getStoryListBySeller(@PathVariable("sellerEmail") String sellerEmail) {
        return storyService.getStoryListBySeller(sellerEmail);
    }

    // 스토리 등록
    @PostMapping("/insert")
    public String insert(@RequestBody StoryDTO dto, @RequestParam(required = false) List<Integer> projectIds) {
        if (storyService.insertStory(dto, projectIds) > 0) {
            return "success";
        } else {
            return "fail";
        }
    }

    // 상세 조회
    @GetMapping("/{id}")
    public StoryDTO getStory(@PathVariable("id") int id) {
        return storyService.getStory(id);
    }

}