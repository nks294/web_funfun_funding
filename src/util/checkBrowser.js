export default function isIE() {
    const agent = navigator.userAgent.toLowerCase();
    const isie = ((navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) ||
        (agent.indexOf("msie") !== -1))
    return isie;
}