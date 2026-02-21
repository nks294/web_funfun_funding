import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

function Notice() {
    const [selectedTab, setSelectedTab] = useState('전체보기');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    const noticeData = [
        { id: 1, category: '공지사항', title: 'FUNFUN 서비스 점검 안내 (2023.03.01)', date: '2023.02.20' },
        { id: 2, category: '공지사항', title: '개인정보처리방침 개정 안내', date: '2023.01.15' },
        { id: 3, category: '이벤트', title: '신규 창작자 응원 이벤트 - 수수료 0원!', date: '2023.02.10' },
        { id: 4, category: '이벤트', title: '얼리버드 후원자 한정 굿즈 증정 이벤트', date: '2023.01.05' },
        { id: 5, category: '보도자료', title: 'FUNFUN, 누적 후원액 100억 돌파 기념 성과 발표', date: '2023.02.18' },
        { id: 6, category: '보도자료', title: '창작 생태계 활성화를 위한 MOU 체결', date: '2022.12.20' },
        { id: 7, category: '공지사항', title: '시스템 보안 강화 업데이트 완료 안내', date: '2022.11.30' },
        { id: 8, category: '이벤트', title: '겨울 한정 테마 출시 기념 포인트 적립 이벤트', date: '2022.11.15' },
        { id: 9, category: '보도자료', title: '신규 애플리케이션 다운로드 100만 돌파', date: '2022.10.25' },
        { id: 10, category: '공지사항', title: '고객센터 운영 시간 변경 안내', date: '2022.09.10' },
        { id: 11, category: '이벤트', title: '추석 맞이 감사 선물 세트 증정', date: '2022.08.30' },
        { id: 12, category: '보도자료', title: 'FUNFUN, 2022 올해의 앱 수상', date: '2022.08.05' },
    ];

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        setCurrentPage(1);
    };

    const filteredData = selectedTab === '전체보기'
        ? [...noticeData].sort((a, b) => new Date(b.date) - new Date(a.date))
        : noticeData.filter(item => item.category === selectedTab);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredData.length / postsPerPage);

    const renderContent = () => {
        return (
            <>
                <ul className="notice-list">
                    {currentPosts.map((item) => (
                        <li key={item.id} className="notice-item">
                            <a href="#">
                                <span className={`category-tag ${item.category === '이벤트' ? 'event' : item.category === '보도자료' ? 'press' : 'notice'}`}>
                                    {item.category}
                                </span>
                                <span className="title">{item.title}</span>
                                <span className="date">{item.date}</span>
                            </a>
                        </li>
                    ))}
                </ul>
                {filteredData.length > 0 && (
                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={currentPage === i + 1 ? 'active' : ''}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            <Helmet>
                <title>FUNFUN - 공지사항</title>
            </Helmet>

            <div className="notice-board">
                <h1>FUNFUN 공지사항</h1>
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
        </>
    );
}

export default Notice;