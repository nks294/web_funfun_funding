import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import subCategory from "util/subCategory";
import { useLogin } from "util/loginProvider";
import { cateDatas } from "util/subCategory";
import stickyNav from "util/stickyNav";
import SearchForm from "./SearchForm";
import LoginForm from "./LoginForm";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isPage = (page) => location.pathname === page;
    const isCateNavNeed = !location.pathname.startsWith('/project');
    const [main, setMain] = useState('');
    const { isLoggedIn, usrAuthLevel } = useLogin();

    const handleMainCate = (mainCate) => {
        const query = new URLSearchParams({ main: mainCate, sub: 'all' }).toString();
        navigate(`/category?${query}`);
    }

    const handleSubCate = (subCategory) => {
        const query = new URLSearchParams({ main, sub: subCategory }).toString();
        navigate(`/category?${query}`);
    }

    const handleScroll = (direction) => {
        const element = document.querySelector('.cate-discover-scroll-container');
        if (direction === 'left') {
            element.scrollBy({ left: -300, behavior: 'smooth' });
        } else {
            element.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const mainParam = params.get('main');
        if (location.pathname === '/category' && mainParam) {
            setMain(decodeURIComponent(mainParam));
        } else {
            setMain('')
        }
    }, [location])

    useEffect(() => {
        if (isCateNavNeed) {
            subCategory(navigate);
            stickyNav();
        }
    }, [navigate, isCateNavNeed])

    return (
        <>
            <header>
                <div id="top-nav">
                    <div className="top-nav-site-wrap">
                        <Link to="/" className="top-nav-title">
                            <div className="top-nav-logo"><i className="fa-regular fa-face-smile-wink" /></div>
                            <h3>FUNFUN</h3>
                        </Link>
                        <div className="top-nav-site-menu">
                            <ul>
                                <Link to="/"><li className={isPage("/") ? 'active' : ''}>메인</li></Link>
                                <Link to="/popular"><li className={isPage("/popular") ? 'active' : ''}>인기</li></Link>
                                <Link to="/recent"><li className={isPage("/recent") ? 'active' : ''}>최신</li></Link>
                                <Link to="/comming_soon"><li className={isPage("/comming_soon") ? 'active' : ''}>오픈예정</li></Link>
                                <Link to="/story"><li className={isPage("/story") ? 'active' : ''}>스토리</li></Link>
                            </ul>
                        </div>
                    </div>
                    <div className="top-nav-btn-wrap">
                        <div className="top-nav-menu-login">
                            <LoginForm />
                        </div>
                        {(isLoggedIn && usrAuthLevel >= 1) ? <Link to="/project/upload" className="top-nav-btn-project">프로젝트 만들기</Link> : ''}
                    </div>
                </div>
                {isCateNavNeed && (
                    <div id="cate-nav">
                        <div className="cate-nav-wrap">
                            <div className="cate-title">
                                <div className="cate-title-block">
                                    <button type="button" onClick={() => handleMainCate('식품')} className="cate-title-el" data-text="식품"><span><i className="fas fa-meat"></i>식품</span></button>
                                    <button type="button" onClick={() => handleMainCate('커피')} className="cate-title-el" data-text="커피"><span><i className="fas fa-coffee-togo"></i>커피</span></button>
                                    <button type="button" onClick={() => handleMainCate('향초')} className="cate-title-el" data-text="향초"><span><i className="far fa-candle-holder"></i>향초</span></button>
                                    <button type="button" onClick={() => handleMainCate('반려동물')} className="cate-title-el" data-text="반려동물"><span><i className="far fa-paw"></i>반려 동물</span></button>
                                    <button type="button" onClick={() => handleMainCate('헬스케어')} className="cate-title-el" data-text="헬스케어"><span><i className="far fa-heartbeat"></i>헬스케어</span></button>
                                    <button type="button" onClick={() => handleMainCate('디지털미디어')} className="cate-title-el" data-text="디지털미디어"><span><i className="fas fa-gamepad-alt"></i>디지털 미디어</span></button>
                                    <button type="button" onClick={() => handleMainCate('홈리빙')} className="cate-title-el" data-text="홈리빙"><span><i className="fas fa-home-lg"></i>홈/리빙</span></button>
                                    <button type="button" onClick={() => handleMainCate('패션')} className="cate-title-el" data-text="패션"><span><i className="far fa-lips"></i>패션</span></button>
                                    <button type="button" onClick={() => handleMainCate('문구')} className="cate-title-el" data-text="문구"><span><i className="far fa-pen"></i>문구</span></button>
                                </div>
                            </div>
                            <div className="top-nav-menu-search">
                                <SearchForm />
                            </div>
                        </div>
                    </div>)}
            </header>
            {location.pathname === '/category' && main && (
                <nav id="discover-nav">
                    <div className="cate-discover-scroll-wrapper">
                        <button className="-discoverbtn-left" onClick={() => handleScroll('left')}>‹</button>
                        <div className="cate-discover-scroll-container">
                            <div className="cate-discover-scroll-content">
                                {cateDatas[main]?.map((item, index) => (
                                    <button key={index} onClick={() => handleSubCate(item)} className="cate-discover-item">
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button className="btn-discover-right" onClick={() => handleScroll('right')}>›</button>
                    </div>
                </nav>
            )}
        </>
    );
}

export default Header;