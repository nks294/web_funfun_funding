import React from 'react';
import { Link } from 'react-router-dom';
import btn_naver from 'img/btn_naver.svg';
import btn_kakao from 'img/btn_kakao.svg';

const SnsLogin = (props) => {

    const doNaverLogin = () => {
        const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_OAUTH_ID}&redirect_url=${process.env.REACT_APP_NAVER_OAUTH_REDIRECT}&state=3920485732`
        window.open(url, "_blank")
    }

    const doKakaoLogin = () => {
        const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_OAUTH_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_OAUTH_REDIRECT}&response_type=code`
        window.open(url, "_blank")
    }

    if (props.type === 'login') {
    } else {
    }

    return (
        <div className="login-method">
            <div className="login-method-control">
                <button type="button" className="login-method-action" onClick={doNaverLogin}>
                    <img src={btn_naver} alt="네이버 로고" className="fa-naver"/>
                </button>
            </div>
            <div className="login-method-control">
                <button type="button" className="login-method-action" onClick={doKakaoLogin}>
                    <img src={btn_kakao} alt="카카오 로고" className="fa-kakao"/>
                </button>
            </div>
            <div className="login-method-control">
                <Link to="#" className="login-method-action ready">
                    <i className="fab fa-google" />
                </Link>
            </div>
            <div className="login-method-control">
                <Link to="#" className="login-method-action ready">
                    <i className="fa-brands fa-facebook" />
                </Link>
            </div>
            <div className="login-method-control">
                <Link to="#" className="login-method-action ready">
                    <i className="fa-brands fa-instagram" />
                </Link>
            </div>
        </div>
    )
}
export default SnsLogin;