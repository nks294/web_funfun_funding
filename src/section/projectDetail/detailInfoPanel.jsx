import React, {useEffect, useState, useRef} from "react";
import { FaShareAlt } from 'react-icons/fa';
import { articleLike, articleCancleLike, getLike } from "util/apiService";

const DetailInfoPanel = (props) => {

    const data = props.data;
    const articleId = data.articleId;
    
    // 좋아요 상태 변수 저장
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [likeError, setLikeError] = useState(null);
    const heartRef = useRef(null);

    // 프로젝트 보상 배열로 변환
    const rewardBalances = [ data.articleRewardBalance1, data.articleRewardBalance2, data.articleRewardBalance3, data.articleRewardBalance4, data.articleRewardBalance5, data.articleRewardBalance6 ].filter(item => item !== 0);
    const rewardItems = [ data.articleRewardItem1, data.articleRewardItem2, data.articleRewardItem3, data.articleRewardItem4, data.articleRewardItem5, data.articleRewardItem6 ].filter(item => item !== null);
    const rewards = rewardBalances.map((balance, index) => ({
      balance, item: rewardItems[index]
    }));

    // 하트 버튼 클릭 핸들러
    const handleLike = async (e) => {
      try {
        if (liked) {
            await articleCancleLike(articleId)
          } else {
            await articleLike(articleId);
          }
          setLiked(!liked);  // 클릭할 때마다 상태 변경

          const hearts = document.createElement('div');
          hearts.innerHTML = '<svg class="svg-heart heart-pop one" viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg><svg class="svg-heart heart-pop two" viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg><svg class="svg-heart heart-pop three" viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg><svg class="svg-heart heart-pop four" viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg><svg class="svg-heart heart-pop five" viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg><svg class="svg-heart heart-pop six" viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg><svg class="svg-heart heart-pop seven" viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg><svg class="svg-heart heart-pop eight" viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg><svg class="svg-heart heart-pop nine" viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg>';
            e.target.appendChild(hearts);
            setTimeout(() => {
              e.target.removeChild(hearts);
            }, 3000);

          const nowLike = await getLike(articleId);
          setLikes(nowLike);

      } catch (error) {
          setLikeError(error);
      }
    };

    const likeButton = () => {
      return (
        <button type='button' className={`heart-btn ${liked ? 'liked' : ''}`} onClick={handleLike} ref={heartRef}>
          <svg className="svg-heart heart-icon" viewBox="0 0 32 29.6">
            <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
          </svg>
        </button>
      );
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
              const response = await getLike(articleId);
              setLikes(response);
          } catch (err) {
              setLikeError(err);
          }
        };

        fetchData();
    }, [articleId]);

    return (
        <>
        <div className='detail-info-panel-bar'>
          <h1>{data.projectName}</h1>
          <p>{data.articleTitle}</p>
          <div className="detail-funding-info">
            <p><strong>{data.projectGoal === 0 ? 0 : Math.floor((data.projectCurrent / data.projectGoal) * 100)}%</strong> 달성</p>
            <p><strong>{parseInt(data.projectCurrent).toLocaleString()}</strong> 원 달성</p>
            <p>{data.projectPeople} 명 참여</p>
          </div>
          <div className="detail-bottom-section">
          <div className="detail-like-container">
            {likeButton()}
            <p className="like-count">{(!likeError) ? likes : 'fun'}</p>
          </div>
            <FaShareAlt className="detail-share-icon" />
            <button className="detail-funding-button">펀딩하기</button>
        </div>
        
        </div>
        <div className="detail-reward-selection">
            <h1>리워드 선택</h1>
            <p className="detail-duration">진행기간: 7.29 - 8.29</p>

            {rewards.map((reward, index) => (
              <div className="detail-reward-card" key={index}>
                  <div className="detail-reward-header">
                      <span className="detail-price">{parseInt(reward.balance).toLocaleString()}원</span>
                      <span className="detail-remaining">현재 100개 남음!</span>
                  </div>
                  <div className="detail-reward-content">
                      <h2>{reward.item}</h2>
                      <p>혜택: 20% 혜택 적용 + 5% 추가혜택 + 무료배송</p>
                      <p>구성: 다크 머스코바도 시럽 A</p>
                      <p>콜드브루 500ml</p>
                  </div>
                  <div className="detail-reward-footer">
                      <p>배송비: 무료배송</p>
                      <p>발송 시작일: 2024년 08월 말순 (25~29일) 예정</p>
                      <p>제한 수량: 100개</p>
                  </div>
              </div>
            ))}
            <div className="detail-bottom-section">
              <div className="like-container">
                {likeButton()}
                <p className="like-count">{(!likeError) ? likes : 'fun'}</p>
              </div>
              <span><FaShareAlt className="detail-share-icon" /></span>
              <button className="detail-funding-button">펀딩하기</button>
            </div>
        </div>
      </>
    )
}

export default DetailInfoPanel;