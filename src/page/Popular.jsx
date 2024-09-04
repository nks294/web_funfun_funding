import React from 'react'
import { Helmet } from 'react-helmet-async';

import { renderData } from 'util/useData';
import { getPopularList } from 'util/apiService';
import InfinityScroll from 'section/infinityScroll';

const Popular = () => {
  return (
    <>
      <Helmet>
        <title>FunFun - 인기 프로젝트</title>
      </Helmet>
      <section id="popular" className="section-area">
        <InfinityScroll
          fetchData={getPopularList}
          renderData={renderData}
          initialSortBy='likes'
          perPage={8}
          title='인기 프로젝트 목록'
          sortOptions={[
            { value: 'likes', label: '좋아요 순' },
            { value: 'fun', label: 'Fun 점수' }
          ]}
        />
      </section>
    </>
  );
}

export default Popular;
