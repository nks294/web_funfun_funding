import React, { useRef, useEffect } from "react";

import { useData, renderData } from "util/useData";

const NewProject = () => {

    const wrapRef = useRef(null);

    const [ itemsToRender, error ] = useData(8, 'recent', 0, 10);
    
    useEffect(() => {
        if (wrapRef.current && itemsToRender.length > 0) {
            renderData(wrapRef.current, itemsToRender, 'recent');
        }
    }, [itemsToRender]);

    if (error) {
        return <div>데이터 로딩에 문제가 발생했습니다.</div>
    }

    return (
        <section id="section5" className="section-area">
            <div className="section-title">
                <p>최근 오픈한 프로젝트</p>
                <span>따끈따끈! 방금 오픈한 프로젝트들</span>
            </div>
            <div className="list-page" data-section="recent" ref={wrapRef}></div>
        </section>
    )
}
export default NewProject;