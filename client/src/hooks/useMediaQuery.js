import { useEffect, useState } from "react";

const useMediaQuery = (minWidth) => {
    const [state, setState] = useState({
        windowWidth: window.innerWidth,
        isDesiredWidth: false,
    });

    useEffect(() => {
        window.scrollTo(0, 0)
        const resizeHandler = () => {
            const currentWindowWidth = window.innerWidth;
            const isDesiredWidth = currentWindowWidth < minWidth;
            setState({ windowWidth: currentWindowWidth, isDesiredWidth });
        };
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, [state.windowWidth]);
    useEffect(() => {
        const resizeHandler = () => {
            const currentWindowWidth = window.innerWidth;
            const isDesiredWidth = currentWindowWidth < minWidth;
            setState({ windowWidth: currentWindowWidth, isDesiredWidth });
        };
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    return state.isDesiredWidth;
};

export default useMediaQuery;
