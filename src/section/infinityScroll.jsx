import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { SyncLoader } from 'react-spinners';

const InfinityScroll = ({
  fetchData,
  renderData,
  initialSortBy = 'likes',
  perPage = 8,
  title,
  cateMain,
  cateSub,
  searchTerm,
  sortOptions = []
}) => {
  const wrapRef = useRef(null);
  const observerRef = useRef(null);

  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(0);

  const loadData = useCallback(async () => {
      setIsLoading(true);
      try {
        let response;

        if ((cateMain || cateSub)) {
          response = await fetchData(cateMain, cateSub, sortBy);
        } else if (searchTerm) {
          response = await fetchData(searchTerm, sortBy);
        } else {
          response = await fetchData(sortBy);
        }

        setLimit(response.length);
        setFullData(prevData => [...prevData, ...response]);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
  }, [sortBy, fetchData, cateMain, cateSub, searchTerm]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    // 옵저버가 탐지할 엘리먼트를 useRef를 사용하여 지정
    const observerEl = observerRef.current;

    // 무한 스크롤 구현을 위한 옵저버 생성
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          setPage(prevPage => prevPage + 1);
          if (data.length >= limit) {
            setHasMore(false);
          }
        }
      },
      { threshold: 0 }
    );
    observer.observe(observerEl);

    // 언마운트되면 클린업 함수로 옵저버 삭제
    return () => {
      if (observerEl) {
        observer.unobserve(observerEl);
      }
    };
  }, [hasMore, isLoading, page, data.length, limit]);

  useEffect(() => {
    setData(fullData.slice(0, page * perPage));
  }, [fullData, limit, page, perPage]);

  // 정렬 기준 변경시, 기존에 렌더링된 데이터 초기화
  const handleSortChange = (sort) => {
      if (sort !== sortBy) {
        setSortBy(sort);
      }
  };

  useEffect(() => {
    setFullData([]);
    setPage(1);
    setHasMore(true);
  }, [cateMain, cateSub, sortBy, searchTerm])

  return (
    <>
      {/* 정렬 옵션이 활성화 되어있으면, 거기에 맞는 타이틀과 버튼 출력 */}
      {sortOptions.length > 0 ? (
        <>
        <div className="section-title">
        {/* - {(sortBy === option.value) && option.label} */}
          <p>{title} - {sortBy ? `${sortOptions.find(option => option.value === sortBy)?.label || '기본'}` : ''}</p>
        </div>
        <div className="search-sort">
          {sortOptions.map(option => (
              <button 
                key={option.value}
                type="button"
                className={sortBy === option.value ? 'active' : ''} 
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </button>
          ))}
          </div>
        </>
      ) : (
      <div className="section-title">
        <p>{title}</p>
      </div>
      )}
      {/* 오류가 발생했을 경우, 오류 문구 출력 */}
      {error ? (
        <div className="search-no-result-wrap">
          <p className="search-no-result">데이터를 불러오지 못했습니다.<br />데이터가 없거나, 오류가 발생했습니다.</p>
      </div>
      ) : ( 
        <>
          {/* 정상적으로 로딩되면, 데이터 렌더링 메서드 호출 */}
          <div className="list-page" ref={wrapRef}></div>
          {renderData(wrapRef.current, data, sortBy)}
          {isLoading && <div className='loading-screen'><SyncLoader /></div>}
        </>
      )}
      {/* 추가 로딩중이면 불러오는 안내문구 출력 */}
      {isLoading && 
        <div className="search-no-result-wrap">
        <p className="search-no-result">불러오는 중...</p>
        </div>}
      {/* 검색 결과가 없으면 출력하지 않음 */}
      {(limit < 0) && 
        <div className="search-no-result-wrap">
        <p className="search-no-result">프로젝트를 찾지 못했습니다.</p>
        </div>}
      <div id="observer" style={{ height: "10px" }} ref={observerRef}></div>
    </>
  );
}

InfinityScroll.prototypes = {
  fetchData: PropTypes.func.isRequired,
  renderData: PropTypes.func.isRequired,
  initialSortBy: PropTypes.string,
  perPage: PropTypes.number,
  title: PropTypes.string.isRequired,
  cateMain: PropTypes.string,
  cateSub: PropTypes.string,
  searchTerm: PropTypes.string,
  sortOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }))
};

export default InfinityScroll;
