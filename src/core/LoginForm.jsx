import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { call, join } from "util/apiService";
import { useLogin } from "util/loginProvider";
import SnsLogin from "section/snsLogin";

// 비밀번호: 8글자 이상, 영문, 숫자 사용
function strongPassword(pw) { return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pw); }
// 이메일 형식 유효성 검사
function isEmail(id) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id); }
// 주민등록번호 뒷자리 유효성 검사
function isRightSocialNum(socialnum) { return /^[1234]*$/.test(socialnum); }
// 생년월일 입력값 유효성 검사
function isRightBirth(birth) { return /^\d{8}$/.test(birth); }

const LoginForm = () => {

    // ───────────────────────────────────
    //              공통부분
    // ───────────────────────────────────

    // 로그인 커스텀 훅에서 필요한 변수들 가져오기
    const { setIsLoggedIn, setUserEmail,
        setUserNickName, isLoggedIn,
        usrNickName, setUserAuthLevel } = useLogin();

    // form 부분 초기 여백 설정을 위한 dom 접근객체 생성
    const formRef = useRef();
    // const domainRef = useRef();

    // 로그인폼 <-> 회원가입 화면전환 useState
    const [isLogin, setIsLogin] = useState(true);
    const [isActivate, setIsActivate] = useState(false);

    // 로그인, 회원가입 화면을 전환할 수 있는 메서드 정의
    const toggleForm = () => {
        setIsLogin(!isLogin);
        reset();
    };

    // 로그인 화면을 띄우고 없애는 메서드 정의
    const toggleActive = () => {
        setIsActivate(!isActivate);
    };

    // 로그인, 회원가입의 에러메시지에 포커스 되어있을 때 유효성 검사
    const handleFocus = (e) => {
        const { name } = e.target;
        if (isLogin) {
            const errors = loginFormChecker(name);
            setLoginErrors(errors);
        } else {
            const errors = registerFormChecker(name);
            setRegisterErrors(errors);
        }
    }

    // 로그인, 회원가입 제출 핸들러
    const handleNextStep = async (e) => {
        e.preventDefault();
        if (isLogin) {
            const errors = loginFormChecker();
            if (Object.keys(errors).length === 0) {
                e.preventDefault();
                const data = new FormData(e.target);
                const userEmail = data.get("email");
                const userPw = data.get("password");
                let userDTO = { userEmail: userEmail, userPw: userPw };
                return call("/User/login", "POST", userDTO).then((response) => {
                    if (response.result === "OK") {

                        //로그인 성공시
                        //로그인 관련 변수인 isLoggedIn 변수 값을 true로 변경해줌
                        setIsLoggedIn(true);
                        //로그인 후 응답내용 중에 uIdx, userId를 사용할 수 있도록
                        //컨텍스트 객체에 값을 할당함 -- 기존 서버의 로그인 처리 메소드에서
                        //uIdx, userId를 응답내용에 포함시키도록 변경해줌
                        setUserEmail(response.userEmail);
                        setUserNickName(response.userNickName);
                        setUserAuthLevel(Number(response.userAuthLevel));

                        //컨텍스트 객체는 사용자의 요청과 함께 지속되므로 
                        //새로고침이 이루어지면 삭제되고 새로운 컨텍스트 객체가 생성됨
                        //새로고침 없이 원하는 페이지로 이동함: useNavigate()훅
                        close();
                    } else {
                        setLoginErrors({ account: "아이디 혹은 비밀번호가 틀립니다." });
                    }
                });
            } else {
                setLoginErrors(errors)
            }
        } else {
            const errors = registerFormChecker();
            if (Object.keys(errors).length < 7 && step === 1) {
                setStep(prevStep => prevStep + 1);
                setRegisterErrors({});
            } else if (Object.keys(errors).length < 3 && step === 2) {
                setStep(prevStep => prevStep + 1);
                setRegisterErrors({});
            } else if (Object.keys(errors).length === 0 && step === 3) {
                try {
                    alert("감사합니다.\n테스트 계정을 드리겠습니다.\n\n[테스트용 계정]\nID: member1@works.294.ink\nPW: 1234");
                    close();
                    // 테스트 모드이므로, 실제 api 호출은 하지 않음
                    // const userDTO = {
                    //     userEmail: `${registerForm.email}@${registerForm.domain}`,
                    //     userPw: registerForm.password,
                    //     userName: registerForm.name,
                    //     userNickName: registerForm.nickname,
                    //     userBirthday: registerForm.birthdate,
                    //     userPhone: `${registerForm.phoneMiddle}-${registerForm.phoneEnd}`,
                    //     userGender: getGender(registerForm.socialnum),
                    //     userAuthLevel: 0
                    // };

                    // const response = await join(userDTO);

                    // if (response.result === "OK") {
                    //     alert("회원가입이 완료되었습니다! 환영합니다!")
                    //     close();
                    // } else {
                    //     alert("회원 가입에 실패하였습니다.");
                    // }
                } catch (error) {
                    console.error("회원가입중 오류 발생", error);
                }
            } else {
                setRegisterErrors(errors)
            }
        }
    };

    // 실시간 유효성 검사 핸들러
    const handleKeyUp = (e) => {
        const { name } = e.target;
        if (isLogin) {
            const errors = loginFormChecker(name);
            setLoginErrors(errors);
        } else {
            const errors = registerFormChecker(name);
            setRegisterErrors(errors);
        }
    }

    // 주민등록번호 뒷자리가 홀수면 남성, 짝수면 여성으로 지정
    const getGender = (num) => {
        return num % 2 === 0 ? 'F' : 'M';
    }

    // 폼 내용 변경 감지 핸들러
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (isLogin) {
            setLoginForm(prevData => ({
                ...prevData,
                [name]: value
            }));
        } else {
            if (name === 'email') {
                handleEmailChange(e);
            } else if (name === 'domain' && value === 'type') {
                handleDomainChange(e);
            } else {
                setRegisterForm(prevData => ({
                    ...prevData,
                    [name]: type === 'checkbox' ? checked : value
                }));
            }
        }
    };

    // 기존의 요소들 초기화하는 메서드
    const close = useCallback(() => {
        setIsLogin(true);
        setIsActivate(false);
        setStep(1);
        setLoginForm({ email: '', password: '' });
        setRegisterForm({
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            nickname: '',
            socialnum: '',
            birthdate: '',
            phone: '',
            termsAccepted: false,
            privacyAccepted: false
        });
        setLoginErrors({});
        setRegisterErrors({});
    }, []);

    const reset = useCallback(() => {
        setStep(1);
        setLoginForm({ email: '', password: '' });
        setRegisterForm({
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            nickname: '',
            socialnum: '',
            birthdate: '',
            phoneMiddle: '',
            phoneEnd: '',
            termsAccepted: false,
            privacyAccepted: false
        });
        setLoginErrors({});
        setRegisterErrors({});
    }, []);

    // 로그아웃시 세션 스토리지 클리어 후 새로고침
    const logOut = () => {
        sessionStorage.clear();
        window.location.href = '/funfun/';
    }


    // ───────────────────────────────────
    //              로그인 부분
    // ───────────────────────────────────

    // 로그인 폼의 아이디, 비밀번호 값을 저장하는 useState
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    // 로그인 에러메시지 useState
    const [loginErrors, setLoginErrors] = useState({ account: '' })

    // 로그인 유효성 검사 메소드
    const loginFormChecker = (field) => {
        let errors = {};
        if (field === 'email' || !field) {
            if (!loginForm.email) {
                errors.account = '아이디를 입력해주세요.';
            } else if (!isEmail(loginForm.email)) {
                errors.account = '이메일 형식이 올바르지 않습니다.';
            }
        } else if (field === 'password' || !field) {
            if (!loginForm.password) {
                errors.account = '비밀번호를 입력하세요.';
            }
        }
        return errors;
    }


    // ───────────────────────────────────
    //            회원가입 부분
    // ───────────────────────────────────

    // 이메일 도메인 입력란 활성화/비활성화
    const [domainDisabled, setDomainDisabled] = useState(false);

    // 회원가입 폼을 위한 useState 
    const [step, setStep] = useState(1);
    const [registerForm, setRegisterForm] = useState({
        email: '',
        domain: '',
        password: '',
        confirmPassword: '',
        name: '',
        nickname: '',
        birthdate: '',
        phoneMiddle: '',
        phoneEnd: '',
        socialnum: '',
        termsAccepted: false,
        privacyAccepted: false
    });

    // 회원가입 에러메시지 useState
    const [registerErrors, setRegisterErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        nickname: '',
        birthdate: '',
        phone: '',
        termsAccepted: '',
        privacyAccepted: ''
    })

    // 회원가입 유효성 검사 메소드
    const registerFormChecker = (field) => {
        let errors = {};

        if (field === 'email' || field === 'domain' || !field) {
            if (!registerForm.email || !registerForm.domain) {
                errors.email = '이메일을 입력하세요';
            }
        }
        if (field === 'password' || !field) {
            if (!registerForm.password) {
                errors.password = '비밀번호를 입력하세요.';
            } else if (!strongPassword(registerForm.password)) {
                errors.password = '비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다.'
            }
        }
        if (field === 'confirmPassword' || !field) {
            if (registerForm.password !== registerForm.confirmPassword) {
                errors.confirmPassword = '비밀번호 확인이 일치하지 않습니다.'
            }
        }
        if (field === 'name' || !field) {
            if (!registerForm.name) {
                errors.name = '이름을 입력하세요';
            }
        }
        if (field === 'nickname' || !field) {
            if (!registerForm.nickname) {
                errors.nickname = '별명을 입력하세요';
            }
        }
        if (field === 'birthdate' || !field) {
            if (!registerForm.birthdate) {
                errors.birthdate = '생년월일을 입력하세요';
            } else if (!isRightBirth(registerForm.birthdate)) {
                errors.birthdate = '생년월일은 8자리 숫자이어야 합니다.'
            }
        }
        if (field === 'socialnum' || !field) {
            if (!registerForm.socialnum) {
                errors.birthdate = '생년월일과 주민등록번호 뒤 1자리를 입력해주세요.'
            } else if (!isRightSocialNum(registerForm.socialnum)) {
                errors.birthdate = '유효하지 않은 번호입니다.'
            }
        }
        if (field === 'phoneMiddle' || field === 'phoneEnd' || !field) {
            if (!registerForm.phoneMiddle || !registerForm.phoneEnd) {
                errors.phone = '전화번호를 입력하세요';
            }
        }
        if (field === 'termsAccepted' || !field) {
            if (!registerForm.termsAccepted) {
                errors.termsAccepted = '약관에 동의해주세요.';
            }
        }
        if (field === 'privacyAccepted' || !field) {
            if (!registerForm.privacyAccepted) {
                errors.privacyAccepted = '약관에 동의해주세요.';
            }
        }
        return errors;
    }

    // 회원가입 폼 이전 버튼 핸들러
    const handleBackStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    // 이메일 변경 감지 핸들러
    const handleEmailChange = (e) => {
        const { value } = e.target;
        setRegisterForm(prevData => ({
            ...prevData,
            email: value
        }));
    };

    // 이메일 도메인 내용 변경 감지 핸들러
    const handleDomainChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue !== "type") {
            // 선택한 도메인이 있다면
            setRegisterForm(prevData => ({
                ...prevData,
                domain: selectedValue
            }));
            setDomainDisabled(true);
        } else {
            setDomainDisabled(false);
            setRegisterForm(prevData => ({
                ...prevData,
                domain: '',
            }));
        }
    };

    // 도메인 옵션들
    const getDomainOptions = () => {
        return [
            'gmail.com',
            'daum.net',
            'naver.com',
            'hanmail.net',
            'kakao.com'
        ].map((domain, index) => (
            <option key={index} value={domain}>{domain}</option>
        ));
    };

    // PC의 경우 로그인,검색 팝업을 ESC키로 닫을 수 있게 하기
    useEffect(() => {
        // checkLogin();
        const escHandler = (e) => {
            if (e.code === 'Escape') {
                e.preventDefault();
                close();
            }
        };
        document.addEventListener('keydown', escHandler)
        return () => {
            document.removeEventListener('keydown', escHandler)
        };
    }, [close]);

    // HTML
    return (
        <>
            {/* 로그인 상태 여부에 따라 버튼 달라지기 */}
            {(!isLoggedIn)
                ? <div className="login-button" onClick={toggleActive}> 로그인 / 회원가입</div>
                : <div className="logged-in"><Link to="/mypage" className="btn-my-page"><i className="fas fa-user-alt"></i> {usrNickName} 님</Link>
                    <div className="login-button" onClick={logOut}> 로그아웃</div></div>}

            <div className={`login-background ${isActivate ? 'login-activate' : ''}`}>
                <div className="login-form">
                    <div className={`login-form-wrapper ${!isLogin ? 'flip' : ''}`} style={{ height: `${isLogin ? '530px' : (step === 2) ? '750px' : '650px'}` }}>
                        {/* ─────────────────────
                         / Front - 로그인화면
                        ────────────────────────*/}
                        {isLogin && (
                            <div className="front-login">
                                <div className="login-form-title">
                                    <p>로그인</p>
                                    <div className="login-form-close" onClick={close}><i className="fa-solid fa-xmark" /></div>
                                </div>
                                <div className="login-form-middle">
                                    <form onSubmit={handleNextStep}>
                                        <label htmlFor="loginID" className="sr-only">아이디</label>
                                        <fieldset>
                                            <input
                                                className="login-input"
                                                type="text"
                                                name="email"
                                                placeholder="이메일"
                                                value={loginForm.email}
                                                onChange={handleChange}
                                                onKeyUp={handleKeyUp}
                                                onFocus={handleFocus}
                                                ref={formRef}
                                            />
                                        </fieldset>
                                        <label htmlFor="loginPW" className="sr-only">비밀번호</label>
                                        <fieldset>
                                            <input
                                                className="login-input"
                                                type="password"
                                                name="password"
                                                placeholder="비밀번호"
                                                value={loginForm.password}
                                                onChange={handleChange}
                                                onKeyUp={handleKeyUp}
                                                onFocus={handleFocus}
                                                autoComplete='off'
                                                ref={formRef}
                                            />
                                        </fieldset>
                                        {loginErrors.account && <div className="login-error-message">{loginErrors.account}</div>}
                                        <div className="login-btn-area">
                                            <p className="forgot">아이디 / 비밀번호 찾기</p>
                                            <button type="submit" className="login"> 로그인 </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="login-bottom-wrap">
                                    <div className="login-method-wrap">
                                        <div className="login-stripe">
                                            <span className="stripe-line"></span>
                                            <span className="stripe-text">간편 로그인</span>
                                            <span className="stripe-line"></span>
                                        </div>
                                        <SnsLogin type='login' />
                                    </div>
                                    <div className="login-form-bottom">
                                        <div className="login-btn-area">
                                            <p className="forgot">아직 회원이 아니신가요?</p>
                                            <button className="login" onClick={toggleForm}> 회원가입 </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* ─────────────────────
                         / Back - 회원가입 화면
                        ────────────────────────*/}
                        {!isLogin && (
                            <div className="back-register">
                                <div className="login-form-title">
                                    <p>회원가입</p>
                                    <div className="login-form-close" data-focus="top-login-icon" onClick={close}> <i className="fa-solid fa-xmark" /></div>
                                </div>
                                <div className="register-form-wrap">
                                    <div className="register-form-wrapper">
                                        <div className="register-form" style={{ transform: `translateX(-${(step - 1) * 33.33}%)` }}>
                                            {/* 스텝 1 */}
                                            <div className="register-page">
                                                <form className="register-wrap">
                                                    <div className="email-wrap">
                                                        <fieldset>
                                                            <input
                                                                className="login-input"
                                                                type="text"
                                                                name="email"
                                                                placeholder="이메일"
                                                                value={registerForm.email}
                                                                onChange={handleChange}
                                                                onKeyUp={handleKeyUp}
                                                                onFocus={handleFocus}
                                                                ref={formRef}
                                                            />
                                                        </fieldset>
                                                        <span>@</span>
                                                        <fieldset>
                                                            <input
                                                                className="login-input"
                                                                type="text"
                                                                name="domain"
                                                                value={registerForm.domain}
                                                                onChange={handleChange}
                                                                onFocus={handleFocus}
                                                                disabled={domainDisabled}
                                                                ref={formRef}
                                                            />
                                                        </fieldset>
                                                        <fieldset>
                                                            <select
                                                                className="login-input"
                                                                name="domain-list"
                                                                id="domain-list"
                                                                onChange={handleDomainChange}
                                                                value={registerForm.domain}
                                                            >
                                                                <option value="type">직접 입력</option>
                                                                {getDomainOptions()}
                                                            </select>
                                                        </fieldset>
                                                    </div>
                                                    {registerErrors.email && <div className="login-error-message">{registerErrors.email}</div>}
                                                    <fieldset>
                                                        <input
                                                            className="login-input"
                                                            type="password"
                                                            name="password"
                                                            placeholder="비밀번호"
                                                            value={registerForm.password}
                                                            onChange={handleChange}
                                                            onKeyUp={handleKeyUp}
                                                            onFocus={handleFocus}
                                                            autoComplete='off'
                                                            ref={formRef}
                                                        />
                                                    </fieldset>
                                                    {registerErrors.password && <div className="login-error-message">{registerErrors.password}</div>}
                                                    <fieldset>
                                                        <input
                                                            className="login-input"
                                                            type="password"
                                                            name="confirmPassword"
                                                            placeholder="비밀번호 확인"
                                                            value={registerForm.confirmPassword}
                                                            onChange={handleChange}
                                                            onKeyUp={handleKeyUp}
                                                            onFocus={handleFocus}
                                                            autoComplete='off'
                                                            ref={formRef}
                                                        />
                                                    </fieldset>
                                                    {registerErrors.confirmPassword && <div className="login-error-message">{registerErrors.confirmPassword}</div>}
                                                </form>
                                                <div className="register-button-wrap">
                                                    <button onClick={handleNextStep} className="login next-page">다음</button>
                                                </div>
                                            </div>
                                            {/* 스텝 2 */}
                                            <div className="register-page">
                                                <form className="register-wrap">
                                                    <fieldset>
                                                        <input
                                                            className="login-input"
                                                            type="text"
                                                            name="name"
                                                            placeholder="이름"
                                                            value={registerForm.name}
                                                            onChange={handleChange}
                                                            onKeyUp={handleKeyUp}
                                                            onFocus={handleFocus}
                                                            ref={formRef}
                                                        />
                                                    </fieldset>
                                                    {registerErrors.name && <div className="login-error-message">{registerErrors.name}</div>}
                                                    <fieldset>
                                                        <input
                                                            className="login-input"
                                                            type="text"
                                                            name="nickname"
                                                            placeholder="별명"
                                                            value={registerForm.nickname}
                                                            onChange={handleChange}
                                                            onKeyUp={handleKeyUp}
                                                            onFocus={handleFocus}
                                                            ref={formRef}
                                                        />
                                                    </fieldset>
                                                    {registerErrors.nickname && <div className="login-error-message">{registerErrors.nickname}</div>}
                                                    <div className="social-num-wrap">
                                                        <fieldset>
                                                            <input
                                                                className="login-input"
                                                                type="text"
                                                                name="birthdate"
                                                                placeholder="생년월일(주민번호 앞 8자리)"
                                                                value={registerForm.birthdate}
                                                                onChange={handleChange}
                                                                onKeyUp={handleKeyUp}
                                                                onFocus={handleFocus}
                                                                maxLength="8"
                                                                ref={formRef}
                                                            />
                                                        </fieldset>
                                                        <span>-</span>
                                                        <fieldset>
                                                            <input
                                                                className="login-input"
                                                                type="text"
                                                                name="socialnum"
                                                                placeholder="뒤 1자리"
                                                                value={registerForm.socialnum}
                                                                onChange={handleChange}
                                                                onKeyUp={handleKeyUp}
                                                                onFocus={handleFocus}
                                                                maxLength="1"
                                                                ref={formRef}
                                                            />
                                                        </fieldset>
                                                    </div>
                                                    {registerErrors.birthdate && <div className="login-error-message">{registerErrors.birthdate}</div>}
                                                    <div className="phone-num-wrap">
                                                        <fieldset>
                                                            <input
                                                                className="login-input"
                                                                type="tel"
                                                                name="phoneStart"
                                                                value="010"
                                                                maxLength="11"
                                                                disabled="true"
                                                            />
                                                        </fieldset>
                                                        <span>-</span>
                                                        <fieldset>
                                                            <input
                                                                className="login-input"
                                                                type="tel"
                                                                name="phoneMiddle"
                                                                placeholder="휴대전화"
                                                                value={registerForm.phoneMiddle}
                                                                onChange={handleChange}
                                                                onKeyUp={handleKeyUp}
                                                                onFocus={handleFocus}
                                                                maxLength="4"
                                                                ref={formRef}
                                                            />
                                                        </fieldset>
                                                        <span>-</span>
                                                        <fieldset>
                                                            <input
                                                                className="login-input"
                                                                type="tel"
                                                                name="phoneEnd"
                                                                placeholder="휴대전화"
                                                                value={registerForm.phoneEnd}
                                                                onChange={handleChange}
                                                                onKeyUp={handleKeyUp}
                                                                onFocus={handleFocus}
                                                                maxLength="4"
                                                                ref={formRef}
                                                            />
                                                        </fieldset>
                                                    </div>
                                                    {registerErrors.phone && <div className="login-error-message">{registerErrors.phone}</div>}
                                                </form>
                                                <div className="register-button-wrap">
                                                    <button onClick={handleBackStep} className="login prev-page">이전</button>
                                                    <button onClick={handleNextStep} className="login next-page">다음</button>
                                                </div>
                                            </div>
                                            {/* 스텝 3 */}
                                            <div className="register-page">
                                                <h1>{registerForm.name}님 가입을 환영합니다!</h1>
                                                <fieldset className="accept-box">
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name="termsAccepted"
                                                            checked={registerForm.termsAccepted}
                                                            onChange={handleChange}
                                                            ref={formRef}
                                                        />
                                                        서비스 이용 약관 동의
                                                    </label>
                                                </fieldset>
                                                {registerErrors.termsAccepted && <div className="login-error-message">{registerErrors.termsAccepted}</div>}
                                                <fieldset className="accept-box">
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name="privacyAccepted"
                                                            checked={registerForm.privacyAccepted}
                                                            onChange={handleChange}
                                                            ref={formRef}
                                                        />
                                                        개인정보 처리방침 동의
                                                    </label>
                                                </fieldset>
                                                {registerErrors.privacyAccepted && <div className="login-error-message">{registerErrors.privacyAccepted}</div>}
                                                <div className="register-button-wrap final-step">
                                                    <button onClick={handleBackStep} className="login prev-page">이전</button>
                                                    <button onClick={handleNextStep} className="login next-page">가입하기</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="login-bottom-wrap">
                                    <div className="login-method-wrap">
                                        <div className="login-stripe">
                                            <span className="stripe-line"></span>
                                            <span className="stripe-text">간편 회원가입</span>
                                            <span className="stripe-line"></span>
                                        </div>
                                        <SnsLogin type='register' />
                                    </div>
                                    <div className="login-form-bottom">
                                        <div className="login-btn-area">
                                            <p className="forgot">이미 회원이신가요?</p>
                                            <button className="login" onClick={toggleForm}> 로그인 </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;