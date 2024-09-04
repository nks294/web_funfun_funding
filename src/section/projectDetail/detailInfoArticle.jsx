import React from "react";
import DOMPurify from 'dompurify';
import Slide from "section/slide";

const images = [
  "https://picsum.photos/1330/400?random=1",
  "https://picsum.photos/1330/400?random=2",
  "https://picsum.photos/1330/400?random=3",
  "https://picsum.photos/1330/400?random=4",
  "https://picsum.photos/1330/400?random=5"
]

const DetailInfoArticle = (props) => {

    const data = props.data;

    return (
      <>
        <div className="detail-slider">
          <Slide images={images} slideHeight={'400px'}/>
        </div>
        <div className='main' id="project-story" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data.articleBody)}}></div>
      </>
    )
}

export default DetailInfoArticle;