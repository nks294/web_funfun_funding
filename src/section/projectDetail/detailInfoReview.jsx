import React from 'react';

// // 게시글 데이터 예시
// const notices = [
//   {
//     id: 1,
//     category: '공지',
//     title: '첫 번째 공지사항 제목',
//     date: '2024-08-27',
//     comments: 5
//   },
//   {
//     id: 2,
//     category: '업데이트',
//     title: '두 번째 공지사항 제목',
//     date: '2024-08-25',
//     comments: 2
//   },
//   {
//     id: 3,
//     category: '이벤트',
//     title: '세 번째 공지사항 제목',
//     date: '2024-08-20',
//     comments: 8
//   }
// ];`

// 개별 게시글 항목 컴포넌트
// const NoticeItem = ({ notice }) => {
  
//   return (
//     <>
//       <div className="notice-item">
//         <div className="notice-category">{notice.category}</div>
//         <div className="notice-title">{notice.title}</div>
//         <div className="notice-info">
//           <span className="notice-date">{notice.date}</span>
//           <span className="notice-comments">{notice.comments} 댓글</span>
//         </div>
//       </div>
//     </>
//   );
// };

const detailInfoReview = (props) => {

    // const data = props.data;
    // const articleId = data.articleId;

    return (
      <>
        <div className="notice-list-header">
          <div className="header-left">
            <h1>리뷰</h1>
          </div>
        </div>
        <div className="notice-list">
          <h2>구현 예정</h2>
        </div>
      </>
    );
}

export default detailInfoReview;