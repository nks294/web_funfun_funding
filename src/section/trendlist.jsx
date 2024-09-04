import React, { useRef, useEffect, useState } from "react";
import parse from 'html-react-parser';

import { useData, renderData } from "util/useData";

const TrendList = (props) => {

    // userRef로 DOM 요소를 직접 참조할 수 있는 변수 생성
    const scrollRef = useRef(null);
    const wrapRef = useRef(null);

    const [ item ] = useState(props.item);
    const [ data, error ] = useData(10, props.dataType, 0, 10); 


    useEffect(() => {
        if (wrapRef.current && data.length > 0) {
            renderData(wrapRef.current, data)
        }
    }, [data]);

    useEffect(() => {
        if (scrollRef.current && wrapRef.current) {
            const container = scrollRef.current;
            const element = container.querySelector('.trend-project-block');
            const rightBtn = container.querySelector('.right');
            const leftBtn = container.querySelector('.left');
        
            const buttonVisibility = () => {
                const { scrollWidth, clientWidth, scrollLeft } = element;
                leftBtn.style.display = scrollLeft > 0 ? 'flex' : 'none';
                rightBtn.style.display = scrollWidth > clientWidth + scrollLeft ? 'flex' : 'none';
            };
            
            const handleScroll = (direction) => {
                const itemWidth = element.querySelector('.list-project-wrap')?.offsetWidth || 0;
                const scrollAmount = itemWidth * 2;
                if (direction === 'left') {
                    element.scrollBy({left: -scrollAmount, behavior: 'smooth'});
                } else {
                    element.scrollBy({left: scrollAmount, behavior: 'smooth'});
                }
                buttonVisibility();
            };

            const rightButtonHandler = () => handleScroll('right');
            const leftButtonHandler = () => handleScroll('left');

            rightBtn.addEventListener('click', rightButtonHandler);
            leftBtn.addEventListener('click', leftButtonHandler);
            element.addEventListener('scroll', buttonVisibility);
            
            buttonVisibility();
            
            return () => {
                rightBtn.removeEventListener('click', rightButtonHandler);
                leftBtn.removeEventListener('click', leftButtonHandler);
                element.removeEventListener('scroll', buttonVisibility);
            };   
        }
    }, [data]);

    if (error) {
        return <div>데이터를 불러오는데 문제가 발생했습니다.</div>
    }

    return (
        <div className="trend-project-wrap" ref={scrollRef}>
            <div className="trend-project-title">{parse(item)}</div>
            <span className="trend-project-btn right"><i className="fa-solid fa-angle-right"></i></span>
            <span className="trend-project-btn left"><i className="fa-solid fa-angle-left"></i></span>
            <div className="trend-project-block" data-section="trend-like">
                <div className="trend-project-list" ref={wrapRef}></div>
            </div>
        </div>
    )
}

export default TrendList;