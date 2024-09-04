import React, { useState, useEffect } from 'react';
import 'css/style.css'; // CSS 스타일 파일
const MyPage = () => {
  // 사용자 정보를 상태로 관리
  const [user, setUser] = useState({
    name: '사용자',
    nickname: '닉네임',
    email: 'test@test.com',
    phone: '010-1234-5678',
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트되면 사용자 정보를 가져옵니다.
    fetch('/api/user') // 실제 API 경로를 사용하세요.
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('사용자 정보 가져오기 오류:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSave = () => {
    // 수정된 사용자 정보를 서버에 저장합니다.
    fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        setEditing(false);
        console.log('사용자 정보 업데이트:', data);
      })
      .catch(error => console.error('사용자 정보 업데이트 오류:', error));

    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    // 원래 상태로 복원하기 위해 사용자 정보를 다시 가져옵니다.
    fetch('/api/user') // 실제 API 경로를 사용하세요.
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('사용자 정보 가져오기 오류:', error));
  };

  return (

    <section id="mypage">
      <div className="mypage-container">
        <h1>내 회원정보</h1>
        <div className="mypage-info">
          <label>
            이름:
            {editing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            ) : (
              <span>{user.name}</span>
            )}
          </label>
          <label>
            닉네임:
            {editing ? (
              <input
                type="text"
                name="name"
                value={user.nickname}
                onChange={handleChange}
              />
            ) : (
              <span>{user.nickname}</span>
            )}
          </label>
          <label>
            이메일:
            {editing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            ) : (
              <span>{user.email}</span>
            )}
          </label>
          <label>
            전화번호:
            {editing ? (
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
            ) : (
              <span>{user.phone}</span>
            )}
          </label>
        </div>
        <div className="mypage-buttons">
          {editing ? (
            <>
              <button onClick={handleSave}>저장</button>
              <button onClick={handleCancel}>취소</button>
            </>
          ) : (
            <button onClick={() => setEditing(true)}>수정</button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyPage;