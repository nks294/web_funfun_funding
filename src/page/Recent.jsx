import React from 'react'
import { Helmet } from 'react-helmet-async';

import { renderData } from 'util/useData';
import { getRecentList } from 'util/apiService';
import InfinityScroll from 'section/infinityScroll';

const Recent = () => {
    return (
        <>
            <Helmet>
                <title>FunFun - 최신 프로젝트</title>
            </Helmet>
            <section id="recent" className="section-area">
                <InfinityScroll
                    fetchData={getRecentList}
                    renderData={renderData}
                    initialSortBy='recent'
                    perPage={8}
                    title='최근에 올라온 프로젝트 목록'
                    sortOptions={[]}
                />
            </section>
        </>
    );
}

export default Recent;
