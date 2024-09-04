import React from 'react'
import { Helmet } from 'react-helmet-async';
import { searchProjects } from "util/apiService";

import { renderData } from 'util/useData';
import { useLocation } from 'react-router-dom';
import InfinityScroll from 'section/infinityScroll';

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('q') || '';

  return (
    <>
      <Helmet>
        <title>FUNFUN - {searchTerm} 검색 결과</title>
      </Helmet>
      <section id="recent" className="section-area">
        <InfinityScroll
          fetchData={searchProjects}
          renderData={renderData}
          initialSortBy='upload'
          searchTerm={searchTerm}
          perPage={8}
          title={`"${searchTerm}" 검색 결과`}
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

export default Search;
