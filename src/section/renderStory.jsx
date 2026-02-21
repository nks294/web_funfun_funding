import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function RenderStory({
    profilePic,
    sellerName,
    postTime,
    postImage,
    postDescription,
    taggedItemCount,
    taggedProjects,
    viewType = 'list'
}) {
    const [isLiked, setIsLiked] = useState(false);

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    const items = taggedProjects?.map(p => ({
        projectId: p.projectId,
        projectName: p.projectName || '등록된 프로젝트',
        image: p.projectImage || `https://picsum.photos/400/400?random=${p.projectId}`
    })) || [];

    const TaggedArea = () => (
        taggedItemCount > 0 && (
            <div className="tagged-item-area">
                <div className="tagged-header">
                    창작자의 프로젝트 <span>{taggedItemCount}</span>
                </div>
                <div className="tagged-item-details">
                    {items.map((item, index) => (
                        <Link
                            to={`/project/detail/${item.projectId}`}
                            key={index}
                            className="tagged-item-detail"
                            title={item.projectName}
                        >
                            <div className="image-tooltip-wrap">
                                <img src={item.image} alt={item.projectName} className="tagged-item-image" />
                                <div className="project-name-tooltip">{item.projectName}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    );

    const PostFooter = () => (
        <div className="post-footer">
            <button className={`footer-btn ${isLiked ? 'liked' : ''}`} onClick={toggleLike}>
                <img
                    src={isLiked ? "https://img.icons8.com/ios-filled/50/376fc2/happy.png" : "https://img.icons8.com/ios/50/888888/happy.png"}
                    alt="공감하기"
                />
                공감하기
            </button>
            <button className="footer-btn">
                <img src="https://img.icons8.com/ios/50/888888/comments--v1.png" alt="댓글쓰기" />
                댓글쓰기
            </button>
        </div>
    );

    const ListLayout = () => (
        <div className="post list">
            <div className="post-image-wrap">
                <img src={postImage} alt="게시 이미지" className="post-image" />
            </div>
            <div className="post-content-area">
                <div className="post-meta">
                    <div className="post-time">{postTime}</div>
                </div>
                <div className="post-description">{postDescription}</div>
                <TaggedArea />
                <PostFooter />
            </div>
        </div>
    );

    const CardLayout = () => (
        <div className="post card">
            <div className="post-image-wrap">
                <img src={postImage} alt="게시 이미지" className="post-image" />
                <div className="card-overlay-header">
                    <img src={profilePic} alt="프로필" className="mini-profile-pic" />
                    <div className="post-info-meta">
                        <span className="mini-seller-name">{sellerName}</span>
                        <span className="mini-post-time">{postTime}</span>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="post-description card-truncate">{postDescription}</div>
                <TaggedArea />
            </div>
            <PostFooter />
        </div>
    );

    return viewType === 'list' ? <ListLayout /> : <CardLayout />;
}