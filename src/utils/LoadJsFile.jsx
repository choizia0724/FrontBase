import { useEffect } from "react";

const AddJavaScript = ({ src = '', onload = null, scriptContent }) => {
        useEffect(() => {
                const script = document.createElement('script'); // <script> 태그 생성

                if (src) {
                        script.src = src;
                        if (onload) {
                                script.onload = onload;
                        }
                } else if (scriptContent) {
                        script.innerHTML = scriptContent;
                }

                // <body>에 스크립트 추가
                document.body.appendChild(script);

                return () => {
                        // 컴포넌트가 언마운트될 때 스크립트 제거
                        document.body.removeChild(script);
                };
        }, [src, scriptContent, onload]);

        return null;
};

export default AddJavaScript;
