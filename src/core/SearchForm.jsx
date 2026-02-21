import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()
    // const searchRef = useRef(null);
    // const searchFormRef = useRef(null);
    const [isActivate, setIsActivate] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();

        if (query.trim().length > 0) {
            let queryUri = `/search?q=${encodeURIComponent(query.trim())}`
            navigate(queryUri);
            setQuery('');

            // if (searchFormRef.current) {
            const searchEl = document.querySelector('.top-nav-menu-search .search-form-wrap');
            searchEl.classList.remove('search-activate');
            // }
        } else {
            alert("검색할 단어를 입력해주세요.");
            // searchRef.current.focus();
        }
    };

    // 검색 화면을 띄우고 없애는 메서드 정의
    const toggleActive = () => {
        setIsActivate(!isActivate);
    };

    // 창 닫을시 기존의 요소들 초기화하는 메서드
    const close = useCallback(() => {
        setIsActivate(false);
    }, []);

    // PC의 경우 로그인,검색 팝업을 ESC키로 닫을 수 있게 하기
    useEffect(() => {
        const escHandler = (e) => {
            if (e.code === 'Escape') {
                e.preventDefault();
                close();
            }
        };
        document.addEventListener('keydown', escHandler)
        return () => {
            document.removeEventListener('keydown', escHandler)
        };
    }, [close]);

    return (
        <>
            <div className="search-icon" onClick={toggleActive}>
                <i className="fa-solid fa-magnifying-glass" />
                <span></span>프로젝트 검색
            </div>
            <div className={`search-form-wrap ${isActivate ? 'search-activate' : ''}`}>
                <form className="search-form" onSubmit={handleSearch} /*ref={searchFormRef}*/>
                    <label htmlFor="searchItem" className="sr-only">프로젝트 검색</label>
                    <input
                        type="text"
                        id="searchItem"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="프로젝트 검색…"
                        className="search-field"
                    />
                    <button type="submit" className="search-submit">검색</button>
                </form>
                <div className="search-form-close" onClick={toggleActive}>
                    <i className="fa-solid fa-xmark" />
                </div>
            </div>
        </>
    );
};

export default SearchForm;