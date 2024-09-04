import React, { useRef, useEffect, useCallback, useMemo, useState } from "react";
import { getProjectList } from "util/apiService";
import Slide from "section/slide"

import Aside from "section/rank";

const images = [
    "https://picsum.photos/1330/400?random=8",
    "https://picsum.photos/1330/400?random=9",
    "https://picsum.photos/1330/400?random=10",
    "https://picsum.photos/1330/400?random=11",
    "https://picsum.photos/1330/400?random=12"
]

const CateRecommand = () => {
    const [data, setData] = useState([]);
    const wrapRef = useRef(null);

    const mainList = useMemo(() => [
        "식품", "커피", "향초", "반려동물", "헬스케어", "디지털미디어"
    ], []);

    // 모든 리스트들을 무작위로 가져오는 메서드
    const getRandomSubjectList = useCallback((subject) =>  {
        const items = [...data].filter(item => item.projectMainCate === subject);
        return items.length > 0 ? items[Math.floor(Math.random() * items.length)] : null;
    }, [data]);

    const renderList = useCallback(() => {
        if (wrapRef.current) {
            wrapRef.current.innerHTML = '';

            mainList.forEach((subject) => {
                const item = getRandomSubjectList(subject);
                if (item) {
                    const itemDiv = document.createElement("div");
                    itemDiv.classList.add('catereco-cate-wrap');
                    itemDiv.innerHTML = `
                        <a href="/project/detail/${item.projectId}" class="catereco-cate-thumb-wrap"}>
                            <div class="catereco-cate-thumb"> <!-- 이미지 썸네일 영역 -->
                                <img src="https://picsum.photos/300/300?random=${item.projectId}">
                            </div>
                            <div class="catereco-cate-desc">
                                <div class="catereco-subject">
                                    <p class="catereco-subject-title"><i class=""></i>${item.projectMainCate}</p>
                                </div>
                                <p class="catereco-cate title"> <!-- 프로젝트 제목 영역 -->
                                    ${item.articleTitle}
                                </p>
                                <div class="catereco-cate rate">
                                    <p class="catereco-cate-rate percent font14"> <!-- 달성 % 표시 영역 -->
                                        <b>${item.projectGoal === 0 ? 0 : Math.floor((item.projectCurrent / item.projectGoal) * 100)}%</b> 달성
                                    </p>
                                </div>
                                <div class="catereco-cate icons">
                                    <p class="catereco-cate-rate star"> <!-- 달성 % 표시 영역 -->
                                        <i class="fas fa-stars"></i> ${item.projectFun}
                                    </p>
                                    <p class="catereco-cate-rate heart"> <!-- 달성 % 표시 영역 -->
                                        <i class="fas fa-heart"></i> ${item.projectLikes}
                                    </p>
                                </div>
                                <p class="catereco-cate name font14"> <!-- 창작자/단체명 영역 -->
                                    ${item.userNickname}
                                </p>
                            </div>
                        </a>
                    `;
                    wrapRef.current.appendChild(itemDiv);
                }
            })
        }
    }, [mainList, getRandomSubjectList]);

    useEffect(() => {
        getProjectList()
        .then(response => {
          setData(response);
        })
        .catch(error => {
          console.error('메인 주제별 프로젝트 데이터 불러오기 실패', error);
        })
      }, []);
      
    useEffect(() => {
        if (wrapRef.current && data.length > 0) {
            renderList(); 
        }
    }, [data, renderList]);

    return (
        <section id="section1" className="section-area">
            <div className="section-wrap">
                <div className="section-title">
                    <p>주제별 추천 프로젝트!</p>
                    <span>FunFun에서 선정한 주제별 추천 프로젝트</span>
                </div>
                <div id="catereco">
                    <div className="catereco-container" ref={wrapRef}>
                    </div>
                </div>
                <div className="section-title">
                    <p>진행중인 이벤트</p>
                    <span>이벤트를 통한 특별한 혜택을 놓치지 마세요!</span>
                </div>
                <div className="events-container">
                    <Slide images={images} uiNeed={false}/>
                </div>
            </div>
            <Aside />    
        </section>
    )
}
export default CateRecommand;