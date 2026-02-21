const API_BASE_URL = "https://works.294.ink/funfun_api";

export function call(api, method, request) {
    let options = {
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        url: API_BASE_URL + api,
        method: method,
        credentials: "include",
    };
    if (request) {
        options.body = JSON.stringify(request);
        // console.log("요청내용: " + options.body);
    }
    return fetch(options.url, options) //실행 결과 Promise객체 반환
        .then((response) =>
            response.json()
                .then((json) => {
                    if (!response.ok) {
                        //response.ok가 true이면 정상적인 응답,그렇지 않으면 에러 응답
                        return Promise.reject(json);
                    }
                    return json;
                })
        );
}


/* ──────────────────────────────────────
            USER 관련 메서드
───────────────────────────────────────── */

export function login(userDTO) {
    return call("/User/login", "POST", userDTO);
}

export function getUser(uIdx) {
    return call(`/User/${uIdx}/getUser`, "GET");
}

export function getUserList() {
    return call("/User/getUserList", "GET");
}

export function join(userDTO) {
    return call("/User/insertUser", "POST", userDTO);
}

export function update(userDTO) {
    return call("/User/updateUser", "PUT", userDTO);
}

export function deleteUser(uIdx) {
    return call(`/User/${uIdx}/deleteUser`, "DELETE", null);
}

/* ──────────────────────────────────────
        프로젝트 데이터 관련 메서드
───────────────────────────────────────── */

export function getProjectList() {
    return call('/Project/getProjectList', 'GET');
}

export function getPremiumList() {
    return call('/Project/getPremiumList', 'GET');
}

export function getProjectRank() {
    return call('/Project/getProjectRank', 'GET');
}

export function getRecentList() {
    return call('/Project/getRecentList', 'GET');
}

export function getReadyList() {
    return call('/Project/getReadyList', 'GET');
}

export function getViewList() {
    return call('/Project/getViewList', 'GET');
}

export function getPopularList(sortBy) {
    const url = `/Project/getPopularList?sortBy=${sortBy}`;
    return call(url, 'GET');
}

export function searchProjects(searchTerm, sortBy) {
    const url = `/Project/getProjectSearch?q=${encodeURIComponent(searchTerm)}&sortBy=${sortBy}`;
    return call(url, 'GET');
}

export function discoverProjects(main, sub, sortBy) {
    const url = `/Project/getProjectDiscover?main=${main}&sub=${sub}&sortBy=${sortBy}`;
    return call(url, 'GET');
}


/* ──────────────────────────────────────
      프로젝트 세부 게시글 관련 메서드
───────────────────────────────────────── */

export function getArticle(id) {
    const url = `/Article/getArticle/${id}`;
    return call(url, "GET");
}

export function getLike(id) {
    if (id !== undefined) {
        const url = `/Article/getLike/${id}`;
        return call(url, "GET");
    }
}

export function articleLike(id) {
    const url = `/Article/articleLike?id=${id}`;
    return call(url, "PUT");
}

export function articleCancleLike(id) {
    const url = `/Article/articleCancleLike?id=${id}`;
    return call(url, "PUT");
}

/* ──────────────────────────────────────
            스토리 관련 메서드
───────────────────────────────────────── */

// 스토리 전체 목록 조회 
export function getStoryList() {
    return call("/Story/getStoryList", "GET");
}

// 특정 판매자의 스토리 목록 조회
export function getStoryListBySeller(sellerName) {
    return call(`/Story/getStoryList/${encodeURIComponent(sellerName)}`, "GET");
}

// 특정 스토리 상세 조회
export function getStory(id) {
    return call(`/Story/${id}`, "GET");
}

// 스토리 등록
export function insertStory(storyDTO, projectIds = []) {
    let url = "/Story/insert";

    if (projectIds.length > 0) {
        url += `?projectIds=${projectIds.join(',')}`;
    }

    return call(url, "POST", storyDTO);
}