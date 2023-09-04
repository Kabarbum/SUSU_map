import {toRadians} from "shared/lib/toRadians/toRadians";
import {memo, useRef} from "react";
import {useSelector} from "react-redux";

function calcPillarBefore(x1, y1, x2, y2, w){
    const alpha = Math.atan(Math.abs((y2-y1)/(x2-x1)))
    const l = w * Math.cos(alpha)
    const h = w * Math.sin(alpha)
    let x = x2 > x1 ? x1 - l : x1 + l
    if(x1 === 0 && x2 === 0) x=0
    const y = y2 > y1 ? y1 - h : y1 + h
    return [x,y]
}
function calcPillarAfter(x1, y1, x2, y2, w){
    const alpha = Math.atan(Math.abs((y2-y1)/(x2-x1)))
    const l = w * Math.cos(alpha)
    const h = w * Math.sin(alpha)
    let x = x2 > x1 ? x2 + l : x2 - l
    if(x1 === 0 && x2 === 0) x = 0
    const y = y2 > y1 ? y2 + h : y2 - h
    return [x,y]
}

export const MyWall = memo((props) => {
    const {points} = props
    let {isPillarBefore, isPillarAfter} = props
    let {isPillarForRoom} = props
    let {pillarWallWidthForRoom} = props
    isPillarBefore = isPillarForRoom ? isPillarForRoom : isPillarBefore
    let from, to, isAdjasent
    from = props.wallColor ? props.redactor ? points.pointA.map(el=>el/3) :  points.pointA : points.pointA.map(el=>el/3)
    to = props.wallColor ? props.redactor ? points.pointB.map(el=>el/3) :  points.pointB : points.pointB.map(el=>el/3)

    isAdjasent = points.isAdjasent || false

    const wallHeight = useSelector(state => state.room.wallHeight)

    const wallWidthState = useSelector(state => state.room.wallWidth)

    let wallLength = Math.sqrt(Math.pow(to[0] - from[0], 2)
        + Math.pow(to[1] - from[1], 2)
        + Math.pow(to[2] - from[2], 2))
    let wallWidth = isAdjasent
        ? wallWidthState / 2
        : wallWidthState
    if(pillarWallWidthForRoom)
        wallWidth = pillarWallWidthForRoom
    const position = [(to[0] + from[0]) / 2, from[1], (to[2] + from[2]) / 2]

    const _angle = (to[2] - from[2]) / (to[0] - from[0])
    const angle = -Math.atan(_angle)

    let rotation
    if (from[0] > to[0] && from[2] === to[2]) {
        rotation = [0, toRadians(180), 0]
    } else
        rotation = [0, angle, 0]
    let pillarBeforePoints
    if(isPillarBefore) {
        const [fromBeforeX,fromBeforeZ] = calcPillarBefore(from[0], from[2], to[0], to[2], wallWidth)
        pillarBeforePoints = {
            pointA: [
                fromBeforeX,
                from[1],
                fromBeforeZ
            ],
            pointB: from,
            isAdjasent: false
        }
    }
    let pillarAfterPoints
    if(isPillarAfter){
        const [fromAfterX,fromAfterZ] = calcPillarAfter(from[0], from[2], to[0], to[2], wallWidth)

        pillarAfterPoints = {
            pointA: to,
            pointB: [
                fromAfterX,
                from[1],
                fromAfterZ
            ],
            isAdjasent: false
        }
    }

    const wallColor = props.wallColor || "#aaaaaa"
    const topColor = props.topColor || "#ffffff"
    const ref = useRef(null)
    return (
        <group>
            <group ref={ref} position={position} rotation={rotation} customDepthMaterial={0}>
                {/*Front*/}
                <mesh position={[0, wallHeight / 2, wallWidth]}
                      rotation={[0, 0, 0]} receiveShadow={true} castShadow={true}>
                    <planeGeometry args={[wallLength, wallHeight]}/>
                    <meshStandardMaterial color={wallColor}/>
                </mesh>
                {/*Back*/}
                {!isAdjasent &&
                    <mesh position={[0, wallHeight / 2, 0]}
                          rotation={[0, toRadians(180), 0]} receiveShadow={true} castShadow={true}>
                        <planeGeometry args={[wallLength, wallHeight]}/>
                        <meshStandardMaterial color={wallColor}/>
                    </mesh>
                }
                {/*Right*/}
                <mesh position={[wallLength / 2, wallHeight / 2, wallWidth / 2]}
                      rotation={[0, toRadians(90), 0]} receiveShadow={true} castShadow={true}>
                    <planeGeometry args={[wallWidth, wallHeight]}/>
                    <meshStandardMaterial color={wallColor}/>
                </mesh>
                {/*Left*/}
                <mesh position={[-wallLength / 2, wallHeight / 2, wallWidth / 2]} rotation={[0, toRadians(-90), 0]}
                      receiveShadow={true} castShadow={true}>
                    <planeGeometry args={[wallWidth, wallHeight]}/>
                    <meshStandardMaterial color={wallColor}/>
                </mesh>
                {/*Top*/}
                <mesh position={[0, wallHeight, wallWidth / 2]}
                      rotation={[toRadians(-90), 0, 0]} receiveShadow={true} castShadow={true}>
                    <planeGeometry args={[wallLength, wallWidth]}/>
                    <meshStandardMaterial color={topColor}/>
                </mesh>
            </group>
            {/*Pillar before*/}
            {isPillarBefore &&
                <MyWall
                    points={pillarBeforePoints}
                    wallColor={wallColor}
                    pillarWallWidthForRoom={wallWidth}
                />}
            {/*Pillar after*/}
            {isPillarAfter &&
                <MyWall
                    points={pillarAfterPoints}
                    wallColor={wallColor}
                />
            }
        </group>
    );
})
