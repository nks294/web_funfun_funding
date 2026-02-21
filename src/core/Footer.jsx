import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();

    if (location.pathname.startsWith('/search/')) return null;

    return (
        <footer>
            <div className="footer-menu-wrap">
                <div className="footer-top-area">
                    <div className="footer-top-menu">
                        <p><i className="fa-regular fa-face-smile-wink"></i>FUNFUN</p>
                        <ul>
                            <li><a href="#">FUNFUN</a></li>
                            <li><a href="/notice">공지사항</a></li>
                            <li><a href="#">서비스 소개</a></li>
                            <li><a href="#">광고센터</a></li>
                        </ul>
                        <ul>
                            <li><a href="#">이용안내</a></li>
                            <li><a href="#">가이드</a></li>
                            <li><a href="#">창작자 가이드</a></li>
                            <li><a href="/premium">요금제 안내</a></li>
                        </ul>
                        <ul>
                            <li><a href="#">정책</a></li>
                            <li><a href="#">개인정보처리방침</a></li>
                            <li><a href="/guideline">심사 기준</a></li>
                            <li><a href="/policy">이용 정책</a></li>
                        </ul>
                    </div>
                    <div className="help-center ">
                        <div className="help-title-wrap">
                            <p className="help-title">고객 지원센터</p>
                            <p>상담시간: 평일 00:00 ~ 00:00<br />
                                (주말, 공휴일 휴무)</p>
                            <div className="support-button-area">
                                <a href="#">
                                    <div className="btn-support">문의하기</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sns-stripe">
                    <span className="stripe-line"></span>
                    <div className="social-icons ">
                        <ul className="social-icon-list">
                            <li><a href="#"><i className="fa-brands fa-square-facebook"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
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