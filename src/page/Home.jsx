import Main from "page/Main";
import React from "react";
import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>펀딩을 재밌게, FUNFUN!</title>
            </Helmet>
            <Main />
        </>
    );
}

export default Home;