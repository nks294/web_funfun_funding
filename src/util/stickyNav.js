const stickyNav = () => {
    const cateNav = document.getElementById('cate-nav');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 140) {
            cateNav.classList.add('active');
        } else {
            cateNav.classList.remove('active');
        }
    });
}

export default stickyNav;