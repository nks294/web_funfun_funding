import React from "react";
import { Link } from "react-router-dom";
import TrendList from "section/trendlist";

const AdRecommand = () => {
    
    return (
        <section id="section2"  className="section-area">
            <div className="section-title">
                <div className="ad-section-title">
                    <p>FunFun's 추천 프로젝트</p>
                    <Link to="#"><div className="ad-icon">AD</div></Link>
                </div> 
                <span>당신에게 맞춤추천</span>
            </div>
            <TrendList item='' dataType="premium"/>  
            <Link to="#">
                <div className="banner">
                    <p>AD AREA</p>
                </div>
            </Link>
        </section>
    )
}
export default AdRecommand;