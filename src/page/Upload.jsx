import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Upload = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // 각 입력 필드의 상태 정의
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [compensation, setCompensation] = useState('');
    const [images, setImages] = useState([]);
    const [introImages, setIntroImages] = useState([]);

    // 모달 열기
    const openModal = () => setIsModalOpen(true);

    // 대분류 및 소분류 상태 정의
    const [mainCategory, setMainCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');

    // 대분류에 따른 소분류 옵션
    const categoryOptions = {
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

    // 모달 닫기 및 폼 데이터 제출 처리
    const closeModal = () => {
        // console.log('Form submitted with data:', {
        //     projectName,
        //     description,
        //     compensation,
        //     images,
        //     introImages
        // });

        alert("성공적으로 등록 신청 되었습니다!\n(테스트라서 실제로 등록되진 않지만요!)")
        setIsModalOpen(false);
        // 상태 초기화
        setProjectName('');
        setDescription('');
        setCompensation('');
        setImages([]);
        setIntroImages([]);
        setErrorMessage('');
    };

    // 폼 제출 처리
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData === '내용을 이해했으며 등록하겠습니다') {
            closeModal(); // 모달 닫기 및 제출 처리
        } else {
            setErrorMessage('올바르게 입력해주세요');
        }
    };

    // 이미지 변경 핸들러
    const handleImageChange = (e, setImageArray) => {
        const files = Array.from(e.target.files); // 파일을 배열로 변환
        const fileReaders = files.map(file => {
            const reader = new FileReader();
            return new Promise((resolve) => {
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReaders).then(results => {
            setImageArray(results);
        });
    };

    // 대분류 선택 핸들러
    const handleMainCategoryChange = (e) => {
        setMainCategory(e.target.value);
        setSubCategory(''); // 대분류 변경 시 소분류 초기화
    };

    // 소분류 선택 핸들러
    const handleSubCategoryChange = (e) => setSubCategory(e.target.value);




    // 입력값 변경 핸들러
    const handleProjectNameChange = (e) => setProjectName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleCompensationChange = (e) => setCompensation(e.target.value);
    const handleFormDataChange = (e) => setFormData(e.target.value);

    // 버튼 활성화 여부 결정
    const isButtonDisabled = formData !== '내용을 이해했으며 등록하겠습니다';

    return (
        <>
            <Helmet>
                <title>FUNFUN - 새로운 프로젝트 등록 (미완성)</title>
            </Helmet>
            <section id="upload">
                <div id="box">
                    <h3 className="main-title">프로젝트 등록 신청</h3>
                    <h5 className="main-subtitle">최고의 프로젝트를 보여주세요!</h5>

                    <h3 className="sub-title">카테고리 선택</h3>
                    <div className="category-container">
                        <select className="category-select" value={mainCategory} onChange={handleMainCategoryChange}>
                            <option value="">대분류 선택</option>
                            {Object.keys(categoryOptions).map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <select className="category-select" value={subCategory} onChange={handleSubCategoryChange}
                            disabled={!mainCategory}>
                            <option value="">소분류 선택</option>
                            {mainCategory && categoryOptions[mainCategory].map(sub => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>

                    <h3 className="sub-title">프로젝트명 등록</h3>
                    <textarea
                        className="input-field name-input"
                        value={projectName}
                        onChange={handleProjectNameChange}
                        rows="1"
                        placeholder="프로젝트명을 등록하세요"
                    />

                    <h3 className="sub-title">대표 사진 등록</h3>
                    <div className="file-input-wrapper">
                        <input
                            type="file"
                            accept="image/*"
                            multiple // 다중 파일 선택 허용
                            onChange={(e) => handleImageChange(e, setImages)}
                        />
                        {images.length > 0 && (
                            <div className="preview-list">
                                {images.map((image, index) => (
                                    <img key={index} src={image} alt={`Preview ${index}`} className="preview-img" />
                                ))}
                            </div>
                        )}
                    </div>

                    <h3 className="sub-title">프로젝트 소개(2000자 이내)</h3>
                    <textarea
                        className="input-field"
                        value={description}
                        onChange={handleDescriptionChange}
                        rows="10"
                        placeholder="프로젝트를 소개할 내용을 입력하세요"
                    />

                    <h3 className="sub-title">소개 사진 등록</h3>
                    <div className="file-input-wrapper">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, setIntroImages)}
                        />
                        {introImages.length > 0 && (
                            <div className="preview-list">
                                {introImages.map((image, index) => (
                                    <img key={index} src={image} alt={`Preview ${index}`} className="preview-img" />
                                ))}
                            </div>
                        )}
                    </div>

                    <h3 className="sub-title">보상 설계</h3>
                    <textarea
                        className="input-field"
                        value={compensation}
                        onChange={handleCompensationChange}
                        rows="5"
                        placeholder="투자자들에 대한 보상 설계를 입력하세요"
                    />

                    <button onClick={openModal} className="open-modal-btn">
                        최종 등록하기
                    </button>

                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        contentLabel="Example Modal"
                        className="modal-content"
                        overlayClassName="modal-overlay"
                    >
                        <h2>정말 등록하시겠습니까?</h2>
                        <p>
                            등록 후 심사가 진행되며, 심사 완료 후에는 일부 내용 수정에 제한이 있을 수 있습니다.<br />
                            등록을 원하신다면 밑 입력란에 {' '}
                            <span style={{ color: 'var(--color-blue)', fontWeight: 'bold' }}>
                                내용을 이해했으며 등록하겠습니다
                            </span>{' '} 를 입력해주세요.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="confirm-input"
                                type="text"
                                value={formData}
                                onChange={handleFormDataChange}
                                placeholder="내용을 이해했으며 등록하겠습니다"
                            />
                            <div className="upload-btn-wrap">
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                <button type="submit" disabled={isButtonDisabled}>
                                    등록하기
                                </button>
                                <button type="button" onClick={() => setIsModalOpen(false)}>
                                    취소
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </section>
        </>
    );
};

export default Upload;