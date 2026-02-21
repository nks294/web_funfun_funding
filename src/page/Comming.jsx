import React from 'react'
import { Helmet } from 'react-helmet-async';

import { renderData } from 'util/useData';
import { getReadyList } from 'util/apiService';
import InfinityScroll from 'section/infinityScroll';

const Comming = () => {
    return (
        <>
            <Helmet>
                <title>FunFun - 오픈 예정 프로젝트</title>
            </Helmet>
            <section id="recent" className="section-area">
                <InfinityScroll
                    fetchData={getReadyList}
                    renderData={renderData}
                    initialSortBy='ready'
                    perPage={8}
                    title='오픈 예정 프로젝트 목록'
                    sortOptions={[]}
                />
            </section>
        </>
    );
}

export default Comming;
