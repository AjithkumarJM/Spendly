import React, { createContext, useContext, useEffect, useState } from "react";

const ScreenSizeContext = createContext({ isMobile: false });

export function ScreenSizeProvider({ children }) {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 768);
        }
        
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <ScreenSizeContext.Provider value={{ isMobile }}>
            {children}
        </ScreenSizeContext.Provider>
    );
}

export function useScreenSize() {
    return useContext(ScreenSizeContext);
}
