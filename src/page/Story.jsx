import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getStoryList } from 'util/apiService';
import InfinityScroll from 'section/infinityScroll';
import { RenderStory } from 'section/renderStory';

function Story() {
    const formatTime = (dateString) => {
        const now = new Date();
        const postDate = new Date(dateString);
        const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));

        if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}시간 전`;
        return postDate.toLocaleDateString();
    };

    const renderStories = (ref, data) => (
        <div className="posts-container card-view">
            {data.map((story) => (
                <RenderStory
                    key={story.storyId}
                    {...story}
                    postTime={formatTime(story.postUpload)}
                    viewType="card"
                />
            ))}
            <div ref={ref} />
        </div>
    );

    return (
        <>
            <Helmet>
                <title>FunFun - 스토리, 우리들의 이야기</title>
            </Helmet>

            <section id="story" className="section-area">

                <div className="post-title-wrap">
                    <div className="post-title">
                        <h2>스토리</h2>
                        <p>창작자들의 일상과 제작기를 만나보세요</p>
                    </div>
                </div>

                <InfinityScroll
                    title="스토리"
                    fetchData={getStoryList}
                    renderData={renderStories}
                    perPage={6}
                    initialSortBy="latest"
                    mode="story"
                />
            </section>
        </>
    );
}

export default Story;