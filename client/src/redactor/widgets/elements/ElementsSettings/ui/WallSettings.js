import React from 'react';
import cls from './ElementsSettings.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    movePointAToPointB,
    setFloor,
    setPillarAfter,
    setPillarBefore,
    setWallCoordinates
} from "redactor/store/redactorSlice";
import {deleteWall, fetchOneWall} from "redactor/store/asyncActions";

export const WallSettings = () => {
    const dispatch = useDispatch()
    const {wall} = useSelector(state => state.redactor)

    const wheelHandler = (e, point, direction) => {
        if (e.deltaY > 0)
            dispatch(setWallCoordinates([point, direction, Number(e.target.value) - 1]))
        else
            dispatch(setWallCoordinates([point, direction, Number(e.target.value) + 1]))
    }

    function searchHandler() {
        dispatch(fetchOneWall())
    }

    function deleteHandler() {
        dispatch(deleteWall())
    }

    return (
        <>
            <div>
                ID: {wall.id}
            </div>
            {Object.entries(wall.points).map(el =>
                    <div key={el[0]} className={cls.inputDouble}>
                        <input
                            className={cls.inputCeil}
                            type="text"
                            value={el[1][0]}
                            onChange={e => dispatch(setWallCoordinates([el[0], 0, e.target.value]))}
                            onWheel={e => wheelHandler(e, el[0], 0)}
                        />
                        <input
                            className={cls.inputCeil}
                            type="text"
                            value={el[1][2]}
                            onChange={e => dispatch(setWallCoordinates([el[0], 2, e.target.value]))}
                            onWheel={e => wheelHandler(e, el[0], 2)}
                        />
                    </div>)}
            {/*move pointA to pointB*/}
            <span onClick={() => dispatch(movePointAToPointB())}>moveAtoB</span>
            {/*Pillars*/}
            <div className={cls.pillarsCheckBoxes}>
                <div>
                    <div>Pillar before</div>
                    <input type="checkbox"
                           checked={wall.isPillarBefore}
                           onChange={e => dispatch(setPillarBefore(e.target.checked))}
                    />
                </div>
                <div>
                    <div>Pillar after</div>
                    <input type="checkbox"
                           checked={wall.isPillarAfter}
                           onChange={e => dispatch(setPillarAfter(e.target.checked))}
                    />
                </div>
            </div>

            {/* SET FLOOR */}
            <div className={cls.info}>
                <div>
                    <label htmlFor="floor">Этаж:</label>
                    <input id='floor' type="text" value={wall.floor}
                           onChange={e => dispatch(setFloor(e.target.value))}/>
                </div>
                <div className={cls.roomSearch}>
                    <div onClick={searchHandler}>Найти и заменить</div>
                </div>
                <div className={cls.roomDelete}>
                    <div onClick={deleteHandler}>Удалить</div>
                </div>
            </div>


        </>
    );
};
