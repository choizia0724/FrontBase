import { createBrowserRouter } from "react-router-dom";

// Vite의 `import.meta.glob()`을 사용하여 모듈 매핑
const modules = import.meta.glob("@/page/*.jsx");
const layoutModules = import.meta.glob("@/layout/*.jsx");

// DB에서 가져온 라우트 정보 (실제 코드에서는 fetch()로 API 요청)
const fetchRoutesFromDB = async () => {
    return [
        { path: "/login", element: "PageLogin", file: "PageLogin" },
        {
            path: "",
            element: "NavLayout",
            file: "NavLayout",
            errorElement: "Error",
            children: [
                { path: "/", element: "PageMain", file: "PageMain" },
                { path: "/:title/:content", element: "PageMain", file:"PageMain" }
            ]
        }
    ];
};

// 동적 import 함수 수정
const loadComponent = async (componentName, fileName) => {
    let modulePath = modules[`/src/page/${fileName}.jsx`] || layoutModules[`/src/layout/${fileName}.jsx`];

    if (!modulePath) {
        throw new Error(`File ${fileName} ,${componentName} not found`);
    }

    const module = await modulePath();
    return module.default;
};

// 동적으로 라우트 변환하는 함수
const parseRoutes = async (routes) => {
    return await Promise.all(routes.map(async (route) => {
        const Component = await loadComponent(route.element, route.file);
        const ErrorComponent = route.errorElement ? await loadComponent(route.errorElement, route.file) : null;

        return {
            ...route,
            element: <Component />,
            errorElement: ErrorComponent ? <ErrorComponent /> : undefined,
            children: route.children ? await parseRoutes(route.children) : undefined
        };
    }));
};

// 동적으로 라우트 생성
const createDynamicRouter = async () => {
    const dbRoutes = await fetchRoutesFromDB();
    const parsedRoutes = await parseRoutes(dbRoutes);
    return createBrowserRouter(parsedRoutes);
};

export default createDynamicRouter;
