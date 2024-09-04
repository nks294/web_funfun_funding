import { useState, useEffect } from 'react';
import { getArticle } from './apiService';

/** 
 * 세부 게시글 불러오는 커스텀훅
 * @param {number} id - 게시글의 아이디
*/

export const useArticle = (id) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        response = await getArticle(id);
        setData(response);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();

  }, [id]);

  return [data, error];
};