import React, { useState, useEffect, useRef, useCallback } from "react";

const Slider = ({ images, title, slideHeight, uiNeed = true }) => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [pagenation, setPagenation] = useState(`1 / ${images.length}`);
    const slideRef = useRef(null);
    const slideInterval = 6000;
    const intervalRef = useRef(null);
    const isDragging = useRef(false);
    
    // 슬라이드 이동
    const moveSlide = useCallback(() => {
        const slideContainer = slideRef.current;
        const slideWidth = slideContainer.clientWidth;
        const slideItems = slideContainer.querySelectorAll(".slide-item");
        slideItems.forEach((item) => {
            item.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
        });
        setPagenation(`${currentSlide + 1} / ${images.length}`);
    }, [currentSlide, images.length]);

    // 다음 슬라이드 핸들러
    const handleNext = useCallback (() => {
        setCurrentSlide(prevIndex => {
            const maxSlide = images.length;
            return (prevIndex + 1) % maxSlide;
        });
    }, [images.length]);

    // 이전 슬라이드 핸들러
    const handlePrev = useCallback (() => {
        setCurrentSlide(prevIndex => {
            const maxSlide = images.length;
            return (prevIndex - 1 + maxSlide) % maxSlide;;
        });
    }, [images.length]);

    useEffect(() => {
        moveSlide();

        // 슬라이드 루프 딜레이 시간 지정
        intervalRef.current = setInterval(handleNext, slideInterval);

        const slideContainer = slideRef.current;
        if (!slideContainer) return;

        // 버튼 클릭 이벤트 리스너 등록
        const nextBtn = document.querySelector(".next");
        const prevBtn = document.querySelector(".prev");

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener("click", handleNext);
            prevBtn.addEventListener("click", handlePrev);
        }

        // 슬라이드 드래그 이벤트
        let pointStart = 0, pointEnd = 0;

        const onMouseDown = (e) => {
            isDragging.current = true;
            pointStart = e.pageX;
        };

        const onMouseUp = (e) => {
            if (!isDragging.current) return;
            pointEnd = e.pageX;
            isDragging.current = false;
            if (pointStart < pointEnd) {
                handlePrev();
            } else if (pointStart > pointEnd) {
                handleNext();
             }
             clearInterval(intervalRef.current);
             intervalRef.current = setInterval(handleNext, slideInterval);
        };

        slideContainer.addEventListener("mousedown", onMouseDown);
        slideContainer.addEventListener("mouseup", onMouseUp);

        // 슬라이드 터치 이벤트
        const onTouchStart = (e) => {
            pointStart = e.touches[0].pageX;
        };

        const onTouchEnd = (e) => {
            pointEnd = e.changedTouches[0].pageX;
            if (pointStart < pointEnd) {
                handleNext();
            } else if (pointStart > pointEnd) {
                handlePrev();
            }
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(handleNext, slideInterval);
        };

        slideContainer.addEventListener("touchStart", onTouchStart, { passive: true });
        slideContainer.addEventListener("touchend", onTouchEnd);

        // const onMouseOver = () => {
        //     clearInterval(intervalRef.current);
        // }

        // const onMouseOut = () => {
        //     intervalRef.current = setInterval(handleNext, slideInterval);
        // }

        // 슬라이드에 마우스 올렸을때 정지
        // slideContainer.addEventListener("mouseover", onMouseOver);
        // slideContainer.addEventListener("mouseout", onMouseOut);

        return () => {
            clearInterval(intervalRef.current);
            if (nextBtn && prevBtn) {
                nextBtn.removeEventListener("click", handleNext);
                prevBtn.removeEventListener("click", handlePrev);
            }
            slideContainer.removeEventListener("mousedown", onMouseDown);
            slideContainer.removeEventListener("mouseup", onMouseUp);
            slideContainer.removeEventListener("touchstart", onTouchStart);
            slideContainer.removeEventListener("touchend", onTouchEnd);
            // slideContainer.removeEventListener("mouseover", onMouseOver);
            // slideContainer.removeEventListener("mouseout", onMouseOut);
        };

    }, [currentSlide, handleNext, handlePrev, moveSlide, images.length]);
    
    return (
        <div className="slider-area" style={{height: `${slideHeight}`}}>
            {title && <p className="slider-title">{title}</p>}
            <div className="slider-container" ref={slideRef}>
                <div className="slides">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`slide-item ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${image})` }}
                        />
                    ))}
                </div>
            </div>
            {uiNeed &&
            <div className="slider-ui">
                <div className="slide-btn prev"><i className="fa-solid fa-chevron-left" /></div>
                <span className="slide-pagenation">{pagenation}</span>
                <div className="slide-btn next"><i className="fa-solid fa-chevron-right" /></div>
            </div> }
        </div>
    );
}

export default Slider;