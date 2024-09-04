import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjectRank } from "util/apiService";
import { SyncLoader } from "react-spinners";

const Aside = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProjectRank();
                setData(response);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <aside className="loading-screen">
                <SyncLoader />
            </aside>
        );
    }

    if (error) {
        return (
            <aside className="error-screen">
                <p>랭킹을 불러오는 도중 문제가 발생했습니다.</p>
            </aside>
        );
    }

    return (
        <aside>
            <p className="aside-title"><i className="fa-solid fa-ranking-star"></i>실시간 프로젝트 랭킹</p>
            <ul className="rank-wrap">
                {data.map((item) => (
                    <li key={item.projectId}>
                        <Link to={`/project/detail/${item.projectId}`}>
                            <div className="rank-items">
                                <div className="rank-items__front">
                                    <p className="rank-number">{item.projectRank}</p>
                                    <div className="rank-title-wrap">
                                        <p className="rank-title">{item.articleTitle}</p>
                                        <div className="rank-thumb">
                                            <img src={`https://picsum.photos/400/400?random=${item.projectId}`} alt="섬네일 이미지" />
                                        </div>
                                    </div>
                                </div>
                                <div className="rank-items__back">
                                    <p className="rank-like">
                                        <i className="fa-solid fa-heart"></i>
                                        {item.projectLikes}
                                    </p>
                                    <p className="rank-title">{item.userNickname}</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="#">
                <div className="aside-banner">
                    <p>AD AREA</p>
                </div>
            </Link>
        </aside>
    )
}

export default Aside;