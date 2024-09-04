import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { discoverProjects } from "util/apiService";

import { renderData } from 'util/useData';
import { useLocation } from 'react-router-dom';
import InfinityScroll from 'section/infinityScroll';

const Category = () => {
  const location = useLocation();
  const [currentSub, setCurrentSub] = useState('');

  const params = new URLSearchParams(location.search);
  const main = decodeURIComponent(params.get('main'));
  const sub = decodeURIComponent(params.get('sub') || '');

  useEffect(() => {
    setCurrentSub(sub === 'all' ? '' : sub);
  }, [sub])

  return (
    <>
      <Helmet>
        <title>FUNFUN - {(sub === 'all') ? main : sub} 프로젝트</title>
      </Helmet>
      <section id="recent" className="section-area">
        <InfinityScroll
          fetchData={discoverProjects}
          renderData={renderData}
          initialSortBy='upload'
          cateMain={main}
          cateSub={currentSub}
          perPage={8}
          title={(sub === 'all') ? `${main} 관련 프로젝트` : `${main} - ${sub} 관련 프로젝트`}
          sortOptions={[
            { value: 'upload', label: '최신순' },
            { value: 'likes', label: '좋아요' },
            { value: 'fun', label: 'Fun 점수' },
          ]}
        />
      </section>
    </>
  );
}

export default Category;
