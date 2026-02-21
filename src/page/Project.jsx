import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useArticle } from 'util/useArticle';
import { Helmet } from 'react-helmet-async';
import stickyNav from 'util/stickyNav';
import { Article, Notice, Panel, Story, Review } from 'section/projectDetail';

const ProjectDetail = () => {

    // URL 파라미터를 읽어오기
    const location = useLocation();
    const articlePath = location.pathname.split('/').filter(Boolean);
    const articleId = articlePath[2];
    const isCurrentPage = (page) => location.pathname === page;

    // 게시글 데이터 저장
    const [data, error] = useArticle(articleId);

    useEffect(() => {
        stickyNav()
    }, []);

    if (error) return <div>데이터를 불러오는중 문제가 발생했습니다.</div>
    // 데이터가 아직 로딩 중일 때 빈 화면이나 로딩바를 보여주어 하위 컴포넌트의 오류 방지
    if (!data) return <div>로딩 중...</div>

    return (
        <>
            <Helmet>
                <title>{`FUNFUN - ${data.articleTitle}`}</title>
            </Helmet>
            <nav id="cate-nav">
                <div className='project-menu-wrap'>
                    <ul className="project-menu">
                        <li className={`cate-title-el ${isCurrentPage(`${process.env.PUBLIC_URL}/project/detail/${articleId}`) ? 'active' : ''}`}><Link to={`/project/detail/${data.articleId}`}>프로젝트 이야기</Link></li>
                        <li className={`cate-title-el ${isCurrentPage(`${process.env.PUBLIC_URL}/project/detailNotice/${articleId}`) ? 'active' : ''}`}><Link to={`/project/detailNotice/${data.articleId}`}>업데이트</Link></li>
                        <li className={`cate-title-el ${isCurrentPage(`${process.env.PUBLIC_URL}/project/storyAbout/${articleId}`) ? 'active' : ''}`}><Link to={`/project/storyAbout/${data.articleId}`}>스토리</Link></li>
                        <li className={`cate-title-el ${isCurrentPage(`${process.env.PUBLIC_URL}/project/review/${articleId}`) ? 'active' : ''}`}><Link to={`/project/review/${data.articleId}`}>후기</Link></li>
                    </ul>
                </div>
            </nav>
            <section className="detail-container">
                <div className='detail-left-area'>
                    {isCurrentPage(`/project/detail/${articleId}`) && <Article data={data} />}
                    {isCurrentPage(`/project/detailNotice/${articleId}`) && <Notice data={data} />}
                    {isCurrentPage(`/project/storyAbout/${articleId}`) && <Story projectDetail={data} />}
                    {isCurrentPage(`/project/review/${articleId}`) && <Review data={data} />}
                </div>
                <div className="detail-right-area">
                    <Panel data={data} />
                </div>
            </section>
        </>
    );
}

export default ProjectDetail;