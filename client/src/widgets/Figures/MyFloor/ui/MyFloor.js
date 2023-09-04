import {toRadians} from "shared/lib/toRadians/toRadians";
import * as THREE from "three";
import {memo} from "react";

export const MyFloor = memo(({floor}) => {
    const {points} = floor
    const pointA = points.pointA.map(el=>el/3)
    const pointB = points.pointB.map(el=>el/3)
    const color = floor.color || "#d7e5dd"
    const xCenter = (pointA[0] + pointB[0])/2
    const zCenter = (pointA[2] + pointB[2])/2

    const xLength = Math.abs(pointA[0] - pointB[0])
    const zLength =  Math.abs(pointA[2] - pointB[2])

    return (
        /*WALLS*/
        <mesh
            position={[xCenter, -0.001, zCenter]}
            rotation={[toRadians(90), 0, 0]}
            receiveShadow={true}
        >
            <planeGeometry args={[xLength, zLength]}/>
            <meshStandardMaterial color={color} side={THREE.DoubleSide}/>
        </mesh>
    );
})
