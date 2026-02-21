import React from 'react';

const FeeInformation = () => {
    return (
        <div className='container-style'>
            <h1 className='footer-h1'>펀펀 수수료 요금제</h1>
            <p className='footer-p'>
                창작자님의 프로젝트 목표 달성에 도움을 줄 기능 및 서비스를 확인하고 요금제를 선택하세요.
                수수료는 펀딩이 성공했을 때만 부과되니 걱정마세요.
            </p>
            <button className='button-style'>
                프로젝트 시작하기
            </button>

            <table className='footer-table'>
                <thead>
                    <tr>
                        <th className='footer-th'></th>
                        <th className='footer-th'>Basic</th>
                        <th className='footer-th'>Pro</th>
                        <th className='footer-th'>Premium</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='footer-td'>SNS 광고 대행 서비스</td>
                        <td className='footer-td'>✔</td>
                        <td className='footer-td'>✔</td>
                        <td className='footer-td'>✔</td>
                    </tr>
                    <tr>
                        <td className='footer-td'>펀펀 디스플레이 광고</td>
                        <td className='footer-td'>✔</td>
                        <td className='footer-td'>✔</td>
                        <td className='footer-td'>✔</td>
                    </tr>
                    <tr>
                        <td className='footer-td'>프로젝트 응원킷 발급</td>
                        <td className='footer-td'>✔</td>
                        <td className='footer-td'>✔</td>
                        <td className='footer-td'>✔</td>
                    </tr>
                    <tr>
                        <td className='footer-td'>후원자 1:1 메시지</td>
                        <td className='footer-td'>✔</td>
                        <td className='footer-td'>✔</td>
                        <td className='footer-td'>✔</td>
                    </tr>
                    <tr>
                        <td className='footer-td'>물류/제작 파트너 연결</td>
                        <td className='footer-td'>✔</td>
                        <td className='footer-td'>✔</td>
                        <td className='footer-td'>✔</td>
                    </tr>
                    <tr>
                        <td className='footer-td'>데이터 분석 대시보드 Basic</td>
                        <td className='footer-td'>✔</td>
                        <td className='footer-td'>✔</td>
                        <td className='footer-td'>✔</td>
                    </tr>
                    <tr>
                        <td className='footer-td'>공개예정 기능</td>
                        <td className='footer-td'>✖</td>
                        <td className='footer-td'>✔</td>
                        <td className='footer-td'>✔</td>
                    </tr>
                    <tr>
                        <td className='footer-td'>데이터 분석 대시보드 Pro</td>
                        <td className='footer-td'>✖</td>
                        <td className='footer-td'>✔</td>
                        <td className='footer-td'>✔</td>
                    </tr>
                    <tr>
                        <td className='footer-td'>펀펀 매니저의 프로젝트 컨설팅</td>
                        <td className='footer-td'>✖</td>
                        <td className='footer-td'>✖</td>
                        <td className='footer-td'>✔</td>
                    </tr>
                    <tr>
                        <td className='footer-td'>페이스북 맞춤 타겟 제공 가능</td>
                        <td className='footer-td'>✖</td>
                        <td className='footer-td'>✖</td>
                        <td className='footer-td'>✔</td>
                    </tr>
                </tbody>
            </table>

            <div className='fee-info-style'>
                <p>* 플랫폼 수수료와 결제 수수료는 모두 VAT 별도입니다.</p>
                <p>* 결제 수수료는 5%에서 3%로 낮아졌습니다.</p>
                <p>* 요금제를 변경할 수 없습니다.</p>
                <p>* 광고 진행비용이 별도로 부과될 수 있습니다.</p>
            </div>

            <button className='button-style'>
                수수료 정책보기
            </button>
        </div>
    );
};

export default FeeInformation;