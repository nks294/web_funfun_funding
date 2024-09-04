import React, { createContext, useContext, useState, useEffect } from "react";

//회원관리와 관련된 값들을 하위 컴포넌트와 공유할 수 있는 
//컨텍스트 객체 생성 
const LoginContext = createContext();

//chlidren에 해당되는 컴포넌트: AppContent 컴포넌트와 하위 컴포넌트
export const LoginProvider = ({ children }) => {

  // 로그인 관련 상태와 상태 변경 함수
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedValue = sessionStorage.getItem('context');
    return savedValue ? JSON.parse(savedValue).isLoggedIn : false;
  });
  const [usrNickName, setUserNickName] = useState(() => {
    const savedValue = sessionStorage.getItem('context');
    return savedValue ? JSON.parse(savedValue).usrNickName : '';
  });
  const [usrEmail, setUserEmail] = useState(() => {
    const savedValue = sessionStorage.getItem('context');
    return savedValue ? JSON.parse(savedValue).usrEmail : '';
  });
  const [isMainPage, setIsMainPage] = useState(() => {
    const savedValue = sessionStorage.getItem('context');
    return savedValue ? JSON.parse(savedValue).isMainPage : true;
  });

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    usrNickName,
    setUserNickName,
    usrEmail,
    setUserEmail,
    isMainPage,
    setIsMainPage
  }

  // 상태 변경 시 sessionStorage에 저장
  useEffect(() => {
    sessionStorage.setItem('context', JSON.stringify({
      isLoggedIn,
      usrNickName,
      usrEmail,
      isMainPage
    }));
  }, [isLoggedIn, usrNickName, usrEmail, isMainPage]);


  // sessionStorage에서 상태 복원
  useEffect(() => {
    const savedValue = sessionStorage.getItem('context');
    if (savedValue) {
      const parsedValue = JSON.parse(savedValue);
      setIsLoggedIn(parsedValue.isLoggedIn);
      setUserNickName(parsedValue.usrNickName);
      setUserEmail(parsedValue.usrEmail);
      setIsMainPage(parsedValue.isMainPage);
    }
  }, []);

  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  );

};

//하위 컴포넌트에서 컨텍스트 객체를 쉽게 접근할 수 있도록 커스텀 훅 정의
export const useLogin = () => useContext(LoginContext);