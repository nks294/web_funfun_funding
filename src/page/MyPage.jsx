import React, { useState, useEffect } from 'react';
import { getUserList, update } from 'util/apiService';
import { useLogin } from 'util/loginProvider';

const MyPage = () => {
    const { usrEmail } = useLogin();

    const [user, setUser] = useState({
        userName: '사용자',
        userNickName: '닉네임',
        userEmail: 'test@test.com',
        userPhone: '1234-5678',
        userBirth: '19900101',
        userGender: 'M',
        userRegDate: null,
        userUpdateDate: null,
    });

    const [editing, setEditing] = useState(false);

    // 초기 데이터 로드
    const fetchUserData = () => {
        getUserList()
            .then(data => {
                if (data) {
                    const currentUser = data.find(u => u.userEmail === usrEmail);
                    if (currentUser) setUser(currentUser);
                }
            })
            .catch(error => console.error('사용자 정보 가져오기 오류:', error));
    };

    useEffect(() => {
        if (usrEmail) {
            fetchUserData();
        }
    }, [usrEmail]);

    // 폼 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    // 저장 핸들러
    const handleSave = () => {
        // 가입일과 수정일을 제외한 데이터만 추출하여 전송
        const { userRegDate, userUpdateDate, ...updateData } = user;

        update(updateData)
            .then(response => {
                if (response.result === "OK") {
                    alert("전화번호가 성공적으로 수정되었습니다.");
                    setEditing(false);
                } else {
                    alert("수정에 실패하였습니다.");
                }
            })
            .catch(error => {
                console.error('사용자 정보 업데이트 오류:', error);
                alert("서버와 통신 중 오류가 발생했습니다.");
            });
    };

    // 취소 핸들러
    const handleCancel = () => {
        setEditing(false);
        fetchUserData();
    };

    return (
        <section id="mypage">
            <div className="mypage-container">
                <h1>내 회원정보</h1>
                <div className="mypage-info">
                    <label>
                        이름:
                        <div className='mypage-info-item'>{user.userName}</div>
                    </label>
                    <label>
                        생년월일:
                        <div className="mypage-items-group">
                            <div className='mypage-info-item'>
                                {user.userBirth?.substring(0, 4)}
                            </div>
                            <span className='birth-span'>년</span>
                            <div className='mypage-info-item'>
                                {user.userBirth?.substring(4, 6)}
                            </div>
                            <span className='birth-span'>월</span>
                            <div className='mypage-info-item'>
                                {user.userBirth?.substring(6, 8)}
                            </div>
                            <span className='birth-span'>일</span>
                        </div>
                    </label>
                    <label>
                        성별:
                        <div className='mypage-info-item'>
                            {user.userGender === 'M' ? '남성' : '여성'}
                        </div>
                    </label>
                    <label>
                        닉네임:
                        <div className='mypage-info-item'>{user.userNickName}</div>
                    </label>
                    <label>
                        이메일:
                        <div className='mypage-info-item'>{user.userEmail}</div>
                    </label>
                    <label>
                        전화번호:
                        {editing ? (
                            <div className="mypage-items-group">
                                <div className='mypage-info-item'>010</div>
                                <span className='number-span'>-</span>
                                <input
                                    type="text"
                                    maxLength="4"
                                    value={(user.userPhone || '').split('-')[0] || ''}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                                        const parts = (user.userPhone || '').split('-');
                                        setUser({ ...user, userPhone: `${value}-${parts[1] || ''}` });
                                    }}
                                />
                                <span className='number-span'>-</span>
                                <input
                                    type="text"
                                    maxLength="4"
                                    value={(user.userPhone || '').split('-')[1] || ''}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                                        const parts = (user.userPhone || '').split('-');
                                        setUser({ ...user, userPhone: `${parts[0] || ''}-${value}` });
                                    }}
                                />
                            </div>
                        ) : (
                            <div className='mypage-info-item'>010-{user.userPhone}</div>
                        )}
                    </label>
                    <label>
                        가입일:
                        <div className='mypage-info-item'>
                            {user.userRegDate ? new Date(user.userRegDate).toLocaleDateString() : '-'}
                        </div>
                    </label>
                    <label>
                        최근 수정일:
                        <div className='mypage-info-item'>
                            {user.userUpdateDate ? new Date(user.userUpdateDate).toLocaleDateString() : '-'}
                        </div>
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