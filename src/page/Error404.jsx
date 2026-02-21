import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <>
            <Helmet>
                <title>FUNFUN - ERROR</title>
            </Helmet>
            <section id="error" className="error-page">
                <div className="error-logo-wrap">
                    <div className="error-logo-wrapper"><i className="fa-regular fa-face-smile-wink" /></div>
                    <h3>FUNFUN</h3>
                </div>
                <h1 className="error-heading">404 Not Found</h1>
                <h2 className="error-subheading">죄송합니다. 페이지를 찾을 수 없습니다.</h2>
                <p className="error-paragraph">
                    여기, 홈으로 돌아가는 버튼이 있습니다.
                </p>
                <Link to="/" className="error-button"><span>홈으로</span></Link>
            </section>
        </>
    )
}

export default Error404;