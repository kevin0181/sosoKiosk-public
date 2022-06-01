function loadJs() {
    // 필요한 파일들을 동적으로 생성해줍니다.
    const script1 = document.createElement("script");
    script1.src = "./all/printer/bxlcommon.js";
    script1.async = true;

    const script2 = document.createElement("script");
    script2.src = "./all/printer/bxlpos.js";
    script2.async = true;

    // 생성된 script 요소들을 body에 붙여주세요
    document.body.appendChild(script1);
    document.body.appendChild(script2);
}

export default loadJs;