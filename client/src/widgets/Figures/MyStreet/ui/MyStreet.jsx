import React from 'react';
import img from "shared/assets/street1.jpg"
import {useLoader} from "@react-three/fiber";
import * as THREE from "three";
import {toRadians} from "shared/lib/toRadians/toRadians";

export const MyStreet = () => {
    const texture = useLoader(THREE.TextureLoader, img)
    const position = [100, 20].map(el=>el/3)
    const args = [480, 290].map(el=>el/3) // размер изображения / 10 (в пикселях)
    const center = [
        (position[0]*2 - args[1])/2,
        -0.01,
        (position[1]*2 - args[0])/2
    ]
    return (
        <mesh position={center} rotation={[toRadians(-90), 0, toRadians(-90)]}>
            <planeGeometry args={args}/>
            <meshBasicMaterial map={texture}/>
        </mesh>
    );
};
