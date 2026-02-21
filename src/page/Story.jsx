import React from 'react';

function Post({ profilePic, sellerName, postTime, postImage, postDescription, taggedItemCount, taggedItems }) {
    return (
        <div className="post">
            <div className="post-header">
                <img src={profilePic} alt="프로필 사진" className="profile-pic" />
                <div>
                    <div className="seller-name">{sellerName}</div>
                    <div className="post-time">{postTime}</div>
                </div>
            </div>
            <img src={postImage} alt="게시 이미지" className="post-image" />
            <div className="post-description">
                {postDescription}
            </div>
            <button className="tagged-item-button">
                <div className="tagged-item">
                    태그된 작품 {taggedItemCount}개
                </div>
                <div className="tagged-item-details">
                    {taggedItems.map((item, index) => (
                        <div key={index} className="tagged-item-detail">
                            <img src={item.image} alt={`상품 ${index + 1}`} className="tagged-item-image" />
                            <div className="tagged-item-price">{item.price}</div>
                        </div>
                    ))}
                </div>
            </button>
            <div className="post-footer">
                <button>
                    <img src="https://img.icons8.com/ios/50/happy--v1.png" alt="공감하기" /> 공감하기
                </button>
                <button>
                    <img src="https://img.icons8.com/ios/50/comments--v1.png" alt="댓글쓰기" /> 댓글쓰기
                </button>
            </div>
        </div>
    );
}


function Story() {
    return (
        <section id="story" className="section-area">
            <div className="post-title-wrap">
                <div className="post-title">
                    <p>스토리 - 우리들의 이야기</p>
                </div>
            </div>
            <div className="posts-container">
                <Post
                    profilePic={'https://picsum.photos/400/400?random=1'}
                    sellerName="SojoNyang (소주냥)"
                    postTime="26분 전"
                    postImage={'https://picsum.photos/400/400?random=2'}
                    postDescription="소중한 분에게 소중한 나에게 소주를 💕"
                    taggedItemCount={1}
                    taggedItems={[
                        { image: 'https://picsum.photos/400/400?random=3', price: "₩15,000" },
                    ]}
                />
                <Post
                    profilePic={'https://picsum.photos/400/400?random=4'}
                    sellerName="미라공방"
                    postTime="26분 전"
                    postImage={'https://picsum.photos/400/400?random=5'}
                    postDescription="연탄봉사 갔다왔습니다 💕"
                    taggedItemCount={0}
                    taggedItems={[
                    ]}
                />
                <Post
                    profilePic={'https://picsum.photos/400/400?random=6'}
                    sellerName="하루아침"
                    postTime="26분 전"
                    postImage={'https://picsum.photos/400/400?random=7'}
                    postDescription="이번달 소식입니다 💕"
                    taggedItemCount={2}
                    taggedItems={[
                        { image: 'https://picsum.photos/400/400?random=8', price: "₩30,000" },
                        { image: 'https://picsum.photos/400/400?random=9', price: "₩25,000 " }
                    ]}
                />
                <Post
                    profilePic={'https://picsum.photos/400/400?random=10'}
                    sellerName="코코"
                    postTime="26분 전"
                    postImage={'https://picsum.photos/400/400?random=11'}
                    postDescription="테스트중이에요"
                    taggedItemCount={1}
                    taggedItems={[
                        { image: 'https://picsum.photos/400/400?random=12', price: "₩10,000" },
                    ]}
                />
                <Post
                    profilePic={'https://picsum.photos/400/400?random=55'}
                    sellerName="우리공방"
                    postTime="26분 전"
                    postImage={'https://picsum.photos/400/400?random=44'}
                    postDescription="공방의 하루~"
                    taggedItemCount={0}
                    taggedItems={[
                        { image: 'https://picsum.photos/400/400?random=66', price: "₩10,000" },
                    ]}
                />
                <Post
                    profilePic={'https://picsum.photos/400/400?random=34'}
                    sellerName="NAT"
                    postTime="26분 전"
                    postImage={'https://picsum.photos/400/400?random=653'}
                    postDescription="현재 열심히 준비중이에요!"
                    taggedItemCount={1}
                    taggedItems={[
                        { image: 'https://picsum.photos/400/400?random=1345', price: "₩10,000" },
                    ]}
                />
                <Post
                    profilePic={'https://picsum.photos/400/400?random=13'}
                    sellerName="인토"
                    postTime="26분 전"
                    postImage={'https://picsum.photos/400/400?random=3213'}
                    postDescription="오늘도 좋은 하루~"
                    taggedItemCount={1}
                    taggedItems={[
                        { image: 'https://picsum.photos/400/400?random=15', price: "₩10,000" },
                    ]}
                />
            </div>
        </section>
    );
}

export default Story;
