let navigate = null;

/** navigate() 를 쓸 수없는 위치에서 페이지 이동이 필요할 때 */
export const setNavigate = (nav) => {
    navigate = nav;
};

export const getNavigate = () => navigate;