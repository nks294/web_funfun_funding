import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLogin } from "util/loginProvider";

const PremiumInformation = () => {
    const { isLoggedIn } = useLogin();

    const handleSubscribe = () => {
        if (!isLoggedIn) {
            alert("로그인이 필요한 기능입니다. 먼저 로그인해 주세요.");
            return;
        }
        alert("요금제 가입을 선택하셨군요!\n하지만 테스트 사이트라 그런건 없어요!");
    };

    return (
        <>
            <Helmet>
                <title>FUNFUN - 요금제 안내</title>
            </Helmet>

            <div className='container-style'>
                <h1 className='footer-h1'>펀펀 프리미엄 요금제 안내</h1>
                <p className='footer-p'>
                    창작자님의 프로젝트 목표 달성에 도움을 줄 기능 및 서비스를 확인하고 요금제를 선택하세요.<br></br>
                    수수료는 펀딩이 성공했을 때만 부과되니 걱정마세요.
                </p>

                <table className='footer-table'>
                    <thead>
                        <tr>
                            <th className='footer-th'>제공 서비스</th>
                            <th className='footer-th'>Basic</th>
                            <th className='footer-th'>Pro</th>
                            <th className='footer-th premium-col'>Premium</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='footer-td'>SNS 광고 대행 서비스</td>
                            <td className='footer-td'>✔</td>
                            <td className='footer-td'>✔</td>
                            <td className='footer-td premium-data'>✔</td>
                        </tr>
                        <tr>
                            <td className='footer-td'>프로젝트 응원킷 발급</td>
                            <td className='footer-td'>✔</td>
                            <td className='footer-td'>✔</td>
                            <td className='footer-td premium-data'>✔</td>
                        </tr>
                        <tr>
                            <td className='footer-td'>후원자 1:1 메시지</td>
                            <td className='footer-td'>✔</td>
                            <td className='footer-td'>✔</td>
                            <td className='footer-td premium-data'>✔</td>
                        </tr>
                        <tr>
                            <td className='footer-td'>펀딩 분석 대시보드</td>
                            <td className='footer-td'>✔</td>
                            <td className='footer-td'>✔</td>
                            <td className='footer-td premium-data'>Premium 전용 대시보드 제공</td>
                        </tr>
                        <tr>
                            <td className='footer-td'>고객 지원</td>
                            <td className='footer-td'>✔</td>
                            <td className='footer-td'>✔</td>
                            <td className='footer-td premium-data'>Premium 전용 상담사 배치</td>
                        </tr>
                        <tr>
                            <td className='footer-td'>펀펀 디스플레이 광고</td>
                            <td className='footer-td'>✖</td>
                            <td className='footer-td'>✔</td>
                            <td className='footer-td premium-data'>무제한</td>
                        </tr>
                        <tr>
                            <td className='footer-td'>물류/제작 파트너 연결</td>
                            <td className='footer-td'>✖</td>
                            <td className='footer-td'>✔</td>
                            <td className='footer-td premium-data'>✔</td>
                        </tr>
                        <tr>
                            <td className='footer-td'>공개예정 안내 기능</td>
                            <td className='footer-td'>✖</td>
                            <td className='footer-td'>✔</td>
                            <td className='footer-td premium-data'>✔</td>
                        </tr>
                        <tr>
                            <td className='footer-td'>펀펀 매니저의 프로젝트 컨설팅</td>
                            <td className='footer-td'>✖</td>
                            <td className='footer-td'>✖</td>
                            <td className='footer-td premium-data'>✔</td>
                        </tr>
                        <tr>
                            <td className='footer-td'>SNS 맞춤 타겟 제공</td>
                            <td className='footer-td'>✖</td>
                            <td className='footer-td'>✖</td>
                            <td className='footer-td premium-data'>✔</td>
                        </tr>
                    </tbody>
                </table>

                <div className='fee-info-style'>
                    <p>요금제 결제 수수료는 모두 VAT 별도입니다.</p>
                    <p>요금제 변경 시, 즉시 해당 요금제 혜택이 적용됩니다.</p>
                    <p>광고의 경우 노출 빈도와 개수에 따라 별도로 진행비용이 부과될 수 있습니다.</p>
                </div>

                <div className='action-section'>
                    <button className='button-style' onClick={handleSubscribe}>
                        요금제 가입하기
                    </button>
                </div>
            </div>
        </>
    );
};

export default PremiumInformation;