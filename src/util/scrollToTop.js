import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) setIsVisible(true);
            else setIsVisible(false);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        isVisible && (
            <button
                type="button"
                onClick={goToTop}
                className={`btn-scroll-top ${isVisible ? 'show' : ''}`}
            >
                <i className="fas fa-chevron-double-up"></i>
            </button>
        )
    );
};

export default ScrollToTop;