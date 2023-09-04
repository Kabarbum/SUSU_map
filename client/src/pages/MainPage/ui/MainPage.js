import React, {Suspense, useEffect, useState} from 'react';
import {MySearch} from "widgets/MySearch";
import {FloorSwitcher} from "widgets/FloorSwitcher";
import Redactor from "redactor";
import {Canvas} from "@react-three/fiber";
import {Scene} from "widgets/Scene";
import {useSelector} from "react-redux";

export const MainPage = () => {
    const isAdmin = useSelector(state => state.admin.isAdmin)

    const [width, setWidth] = useState(["100vw", "100vh"])
    useEffect(() => {
        setWidth([`${window.innerWidth}px`, `${window.innerHeight}px`])
    }, [])
    return (

        <div className="container">
            <MySearch/>
            <FloorSwitcher/>
            {isAdmin && <Redactor/>}
            <Canvas
                style={{ width: width[0], height: width[1] }}
                className="canvas"
                frameloop="demand"
            >
                <Suspense fallback={null}>
                    <Scene/>
                </Suspense>
            </Canvas>
        </div>
    );
};