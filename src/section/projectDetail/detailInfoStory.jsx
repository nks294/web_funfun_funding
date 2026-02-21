import React, { useState, useEffect } from 'react';
import { getStoryListBySeller } from 'util/apiService';
import { RenderStory } from 'section/renderStory';

const DetailInfoStory = ({ projectDetail }) => {
    const [authorStories, setAuthorStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const data = await getStoryListBySeller(projectDetail.projectAuthor);
                setAuthorStories(data);
            } catch (error) {
                console.error("스토리를 불러오는데 실패했습니다.", error);
            } finally {
                setLoading(false);
            }
        };

        if (projectDetail?.projectAuthor) {
            fetchStories();
        } else if (projectDetail) {
            setLoading(false);
        }
    }, [projectDetail]);

    const formatTime = (dateString) => {
        const now = new Date();
        const postDate = new Date(dateString);
        const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));
        if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}시간 전`;
        return postDate.toLocaleDateString();
    };

    if (loading) return <div className="loading">소식을 불러오는 중입니다...</div>;

    return (
        <div className="detail-story-container">
            <div className="notice-list-header">
                <div className="header-left">
                    <h1>창작자 스토리</h1>
                </div>
            </div>

            <div className="posts-container list-view">
                {authorStories && authorStories.length > 0 ? (
                    authorStories.map((story) => (
                        <RenderStory
                            key={story.storyId}
                            {...story}
                            postTime={formatTime(story.postUpload)}
                            viewType="list"
                        />
                    ))
                ) : (
                    <div className="no-data">
                        <p>아직 등록된 스토리가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailInfoStory;