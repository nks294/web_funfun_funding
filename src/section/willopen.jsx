import React, { useRef, useEffect } from "react";

import { useData, renderData } from "util/useData";

const WillOpen = () => {
    const wrapRef = useRef(null);

    const [ data, error ] = useData(8, 'ready');

    useEffect(() => {
        if (wrapRef.current && data.length > 0) {
            renderData(wrapRef.current, data, 'ready');
        }
    }, [data]);

    if (error) {
        return <div>데이터 로딩에 문제가 발생했습니다.</div>
    }

    return (
        <section id="section4" className="section-area">
            <div className="section-title">
                <p>모두 주목! 오픈 예정 프로젝트</p>
                <span>얼리버드 혜택 받아가세요</span>
            </div>
            <div className="list-page" data-section="scheduled" ref={wrapRef}></div>
        </section>
    )
}
export default WillOpen;