export const cateDatas = {
    식품: ['냉동식품', '안주류', '고기류/육류', '빵/간식', '비건', '음료', '해산물', '와인', '전통주', '요리책', '푸드 페스티벌'],
    커피: ['원두', '콜드브루', '커피용품', '머신', '캡슐', '드립커피', '디카페인'],
    향초: ['캔들', '캔들워머', '방향제', '향수/공병', '인센스', '차량용 방향제', '디퓨저', '오일'],
    반려동물: ['사료', '간식', '놀이기구', '관리용품', '고양이 모래', '의류', '파충류', '어류', '기타'],
    헬스케어: ['건강식품', '헬스 기구', '보충제', '영양제', '건강식품', '스포츠 웨어'],
    디지털미디어: ['도서', '음악', '게임', '웹툰', '클래스', '아트'],
    홈리빙: ['침실', '욕실', '주방', '화훼/원예', '청소/세탁', '인테리어', 'DIY'],
    패션: ['주얼리', '의류', '가방', '신발', '언더웨어', '패션소품', '한복', '홈웨어', '키즈'],
    문구: ['캘린더', '다이어리', '스티커', '파우치']
};

export default function subCategory(navigate) {
    const cateEl = document.querySelectorAll('.cate-title-el');
    const cateNav = document.querySelector("#cate-nav");

    cateEl.forEach((el) => {
        el.addEventListener('mouseenter', (e) => {
            const dataSet = e.target.dataset.text;
            updateNav(cateNav, dataSet, cateDatas, navigate);

            cateNav.addEventListener('mouseleave', () => {
                removeItem(cateNav);
            })
        });
    });
}

const updateNav = (cateNav, dataSet, cateData, navigate) => {
    removeItem(cateNav);
    createList(cateNav);
    appendItem(dataSet, cateData, navigate);
}

const createList = (cateNav) => {
    const cateItem = document.createElement("div");
    cateItem.classList.add('cate-item');
    cateItem.innerHTML = `
        <div class="cate-item-wrap">
            <ul class="cate-items">
            </ul>
        </div>
    `;
    cateNav.append(cateItem);
}

const appendItem = (dataSet, itemData, navigate) => {
    const cateItems = document.querySelector(".cate-items");
    const items = itemData[dataSet] || [];
    items.forEach((item) => {
        const cateItem = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = item;
        link.href = "#";
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(`/category?main=${encodeURIComponent(dataSet)}&sub=${encodeURIComponent(item)}`);
        })
        cateItem.append(link);
        cateItems.append(cateItem);
    });
}

// 리스트를 초기화하는 메서드
const removeItem = (cateNav) => {
    const existEl = cateNav.querySelector('.cate-item');
    if (existEl) existEl.remove();
}