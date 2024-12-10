import { API_BASE_URL } from "./appConfig";

export function call(api, method, request) {
  let options = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    options.body = JSON.stringify(request);
    console.log("요청내용: " + options.body);
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

export function update(userDTO) {
  return call("/user/updateUser", "PUT", userDTO);
}

export function deleteUser(uIdx) {
  return call(`/user/${uIdx}/deleteUser`, "DELETE", null);
}

export function join(userDTO) {//회원가입
  return call("/user/insertUser", "POST", userDTO);
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