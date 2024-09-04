import React from "react";
// import 'css/projectDetail.css';
import { useState, useEffect } from "react";
import { articleLike, articleCancleLike, getLike } from "./apiService";

const LikeButton = (props) => {
  // 상태 변수 설정
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState(null);

  // 하트 버튼 클릭 핸들러
  const handleLike = async () => {
    try {
      if (liked) {
        await articleCancleLike(props.id)
      } else {
        await articleLike(props.id);
      }
      setLiked(!liked);  // 클릭할 때마다 상태 변경

      const nowLike = await getLike(props.id);
      setLikes(nowLike);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLike(props.id);
        setLikes(response);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [props.id]);

  return (
    <div className="like-container">
      <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
        <span role="img" aria-label="heart">❤️</span>
        <p className="like-count">{(error) ? likes : 'FUN'}</p>
      </button>
    </div>
  );
}

export default LikeButton;