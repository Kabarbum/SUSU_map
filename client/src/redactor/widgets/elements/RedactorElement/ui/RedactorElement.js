import React from 'react';
import {useSelector} from "react-redux";
import {MyWall} from "widgets/Figures/MyWall";
import {MyFloor} from "widgets/Figures/MyFloor";
import {MyRoom} from "widgets/Figures/MyRoom";
import {MySprite} from "widgets/Figures/MySprite";

export const RedactorElement = () => {
    const {type, wall, floor, room, sprite} = useSelector(state => state.redactor)

    return (
        <>
            {
                type === "wall" && <MyWall
                    points={wall.points}
                    wallColor={'#bb52c7'}
                    isPillarBefore={wall.isPillarBefore}
                    isPillarAfter={wall.isPillarAfter}
                    redactor={true}
                />
            }
            {
                type === "floor" && <MyFloor
                    floor={{...floor, color:'#bb52c7'}}
                    redactor={true}
                />
            }
            {
                type === "room" && <MyRoom
                    room={{...room, floorColor:'#c7529e', wallColor: '#ad6fc0'}}
                    redactor={true}
                />
            }
            {
                type === "sprite" && <MySprite
                    sprite={sprite}
                />
            }
        </>
    );
};
