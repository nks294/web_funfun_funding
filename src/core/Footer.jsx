import React from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();

    if (location.pathname === '/search/*') return null;

    return (
        <footer>
            <div className="footer-menu-wrap">
                <div className="footer-top-area">
                    <div className="footer-top-menu">
                        <p><i className="fa-regular fa-face-smile-wink"></i>FUNFUN</p>
                        <ul>
                            <li><Link to="#">FUNFUN</Link></li>
                            <li><Link to="/notice-board">공지사항</Link></li>
                            <li><Link to="#">서비스 소개</Link></li>
                            <li><Link to="#">광고센터</Link></li>
                        </ul>
                        <ul>
                            <li><Link to="#">이용안내</Link></li>
                            <li><Link to="#">가이드</Link></li>
                            <li><Link to="#">창작자 가이드</Link></li>
                            <li><Link to="/premium">요금제 안내</Link></li>
                        </ul>
                        <ul>
                            <li><Link to="#">정책</Link></li>
                            <li><Link to="#">개인정보처리방침</Link></li>
                            <li><Link to="/guideline">심사 기준</Link></li>
                            <li><Link to="/policy">이용 정책</Link></li>
                        </ul>
                    </div>
                    <div className="help-center ">
                        <div className="help-title-wrap">
                            <p className="help-title">고객 지원센터</p>
                            <p>상담시간: 평일 00:00 ~ 00:00<br />
                                (주말, 공휴일 휴무)</p>
                            <div className="support-button-area">
                                <Link to="#">
                                    <div className="btn-support">문의하기</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sns-stripe">
                    <span className="stripe-line"></span>
                    <div className="social-icons ">
                        <ul className="social-icon-list">
                            <li><Link to="#"><i className="fa-brands fa-square-facebook"></i></Link></li>
                            <li><Link to="#"><i className="fa-brands fa-instagram"></i></Link></li>
                            <li><Link to="#"><i className="fa-brands fa-twitter"></i></Link></li>
                        </ul>
                    </div>
                    <span className="stripe-line"></span>
                </div>
                <div className="footer-bottom-area">
                    <div className="footer-copyright">
                        <span>Copyright 2024. Team 1st</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta itaque, officiis labore amet nulla saepe mollitia iure aliquid vitae sequi aut nisi earum nobis illo. Fugit provident ratione earum aliquid? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius odio neque aut vitae voluptate voluptatibus nam iure ipsum quasi nobis! Consectetur neque explicabo qui dolorem odio dolore magnam perspiciatis repudiandae!</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;