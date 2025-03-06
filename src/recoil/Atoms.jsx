import { atom } from 'recoil';

// 테마 상태 (Recoil Atom)
export const themeState = atom({
    key: "themeState",
    default: localStorage.getItem("theme") || "default",
});

// 다크 모드 상태 (Recoil Atom)
export const darkModeState = atom({
    key: "darkModeState",
    default: localStorage.getItem("darkMode") === "true",
});