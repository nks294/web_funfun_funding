import { useState, useEffect } from 'react';
import { getProjectList, getPremiumList, getRecentList, getPopularList, getReadyList, getViewList } from './apiService';

/** 
 * 프로젝트 게시글 데이터를 가공하고 렌더링하는 커스텀 훅
 * @param {HTMLElement} wrap - 렌더링할 html 요소
 * @param {number} count - 렌더링할 데이터 항목 수
 * @param {string} dataType - 데이터 종류
 * @param {number} [start] - 시작 인덱스
 * @param {number} [end] - 끝 인덱스
*/

export const useData = (count, dataType, start = 0, end = Infinity) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;

                switch (dataType) {
                    case 'view':
                        response = await getViewList();
                        break;
                    case 'premium':
                        response = await getPremiumList();
                        break;
                    case 'recent':
                        response = await getRecentList();
                        break;
                    case 'popular':
                        response = await getPopularList();
                        break;
                    case 'rate':
                        response = await getProjectList();
                        break;
                    case 'random':
                        response = await getProjectList();
                        break;
                    case 'ready':
                        response = await getReadyList();
                        break;
                    case 'default':
                        response = await getProjectList();
                        break;
                    default:
                        response = await getProjectList();
                        break;
                }
                const dataSlice = response.slice(start, end);
                const dataList = dataSlice.slice(0, count)

                setData(dataList);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();

    }, [dataType, count, start, end]);

    return [data, error];
};

const dayRemaining = (expiration) => {
    const today = new Date();
    const expDate = new Date(expiration);

    const timeDiff = expDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff
}

const openRemaining = (open) => {
    const today = new Date();
    const openDate = new Date(open);

    const timeDiff = openDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff
}

const openRecent = (open) => {
    const today = new Date();
    const openDate = new Date(open);

    const timeDiff = today - openDate;

    let nowDiff = Math.floor(timeDiff / (1000 * 60 * 60));

    if (nowDiff >= 24) {
        return Math.floor(nowDiff / 24) + '일 전';
    } else {
        return nowDiff + '시간 전'
    }
}

const setProjectDesc = (dataType, data) => {
    if (dataType === 'ready') {
        return `오픈까지 앞으로 ${openRemaining(data.projectOpen)}일!`
    } else if (dataType === 'recent') {
        return `${openRecent(data.projectOpen)} 오픈!`
    } else {
        return `마감까지 앞으로 ${dayRemaining(data.projectExpiration)}일!`
    }
}

const setProjectType = (dataType, data) => {
    if (dataType === 'likes') {
        return `<p class="project-cate-rate heart"><i class="fa-solid fa-heart"></i> ${data.projectLikes}</p>`
    } else {
        return `<p class="project-cate-rate star"><i class="fa-solid fa-star"></i> ${data.projectFun}</p>`
    }
}

// 렌더링 메소드
export const renderData = (wrap, items, dataType) => {
    if (!wrap) return;

    wrap.innerHTML = items.map((data) => {
        return `
            <a href="${process.env.PUBLIC_URL}/project/detail/${data.projectId}" class="list-project-wrap">
                <div class="list-project-img-container">
                    <img src="https://picsum.photos/400/400?random=${data.projectId}" alt=${data.projectName} />
                </div>
                <div class="list-project-desc-wrap">
                    <p class="project-cate name">
                    ${setProjectDesc(dataType, data)}
                    </p>
                    <p class="project-cate title">${data.articleTitle} </p>
                    <div class="project-cate rate">
                        <span class="project-cate-rate percent">
                            <b>${data.projectGoal === 0 ? 0 : Math.floor((data.projectCurrent / data.projectGoal) * 100)}%</b> 달성
                        </span>
                    ${setProjectType(dataType, data)}
                    </div>
                    <p class="project-cate name">${data.userNickname}</p>
                </div>
            </a>
        `;
    }).join('');
}
