//공지사항
import React, { useState } from 'react';

function NoticeBoard() {
  // 상태(state)를 사용하여 현재 선택된 탭을 관리합니다.
  const [selectedTab, setSelectedTab] = useState('공지사항');

  // 탭 버튼들이 클릭될 때 실행되는 함수입니다.
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // 각 탭에 따라 보여줄 내용을 결정합니다.
  const renderContent = () => {
    switch (selectedTab) {
      case '공지사항':
        return <div>공지사항</div>;
      case '이벤트':
        return <div>이벤트</div>;
      case '보도자료':
        return <div>보도자료</div>;
      case '전체보기':
      default:
        return (
          <div>
            <div>전체보기: 공지사항</div>
            <div>전체보기: 이벤트</div>
            <div>전체보기: 보도자료</div>
          </div>
        );
    }
  };

  return (
    <div className="notice-board">
      <div className="header">
        <button
          className={selectedTab === '전체보기' ? 'active' : ''}
          onClick={() => handleTabClick('전체보기')}
        >
          전체보기
        </button>
        <button
          className={selectedTab === '공지사항' ? 'active' : ''}
          onClick={() => handleTabClick('공지사항')}
        >
          공지사항
        </button>
        <button
          className={selectedTab === '이벤트' ? 'active' : ''}
          onClick={() => handleTabClick('이벤트')}
        >
          이벤트
        </button>
        <button
          className={selectedTab === '보도자료' ? 'active' : ''}
          onClick={() => handleTabClick('보도자료')}
        >
          보도자료
        </button>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
    
  );
  
}

export default NoticeBoard;

