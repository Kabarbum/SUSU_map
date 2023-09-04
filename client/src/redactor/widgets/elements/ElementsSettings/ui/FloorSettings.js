import React from 'react';
import cls from './ElementsSettings.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setFloor, setFloorCoordinates} from "redactor/store/redactorSlice";
import {deleteFloor, fetchOneFloor} from "redactor/store/asyncActions";

export const FloorSettings = () => {
    const dispatch = useDispatch()
    const {floor} = useSelector(state => state.redactor)

    const wheelHandler = (e, point, direction) => {
        if (e.deltaY > 0)
            dispatch(setFloorCoordinates([point, direction, Number(e.target.value) - 1]))
        else
            dispatch(setFloorCoordinates([point, direction, Number(e.target.value) + 1]))
    }

    function searchHandler() {
        dispatch(fetchOneFloor())
    }

    function deleteHandler() {
        dispatch(deleteFloor())
    }

    return (
        <>
            <div>
                ID: {floor.id}
            </div>
            {Object.entries(floor.points).map(el =>
                <div key={el[0]} className={cls.inputDouble}>
                    <input
                        className={cls.inputCeil}
                        type="text"
                        value={el[1][0]}
                        onChange={e => dispatch(setFloorCoordinates([el[0], 0, e.target.value]))}
                        onWheel={e => wheelHandler(e, el[0], 0)}
                    />
                    <input
                        className={cls.inputCeil}
                        type="text"
                        value={el[1][2]}
                        onChange={e => dispatch(setFloorCoordinates([el[0], 2, e.target.value]))}
                        onWheel={e => wheelHandler(e, el[0], 2)}
                    />
                </div>)}

            {/* SET FLOOR */}
            <div className={cls.info}>
                <div>
                    <label htmlFor="floor">Этаж:</label>
                    <input id='floor' type="text" value={floor.floor}
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
