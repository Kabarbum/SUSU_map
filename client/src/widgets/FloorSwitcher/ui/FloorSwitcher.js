import React from 'react';
import cls from './FloorSwitcher.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setCurrentFloor} from "features/room/roomSlice";

export const FloorSwitcher = () => {
    const dispatch = useDispatch()
    const {currentFloor, totalFloors} = useSelector(state => state.room)
    const arr = Array.from({length: totalFloors}, (_, i) => i + 1)

    const clickHandler = (el) => {
        dispatch(setCurrentFloor(el))
    }
    return (
        <div className={cls.FloorSwitcher}>
            {
                arr.map((el, idx) =>
                    <div
                        key={idx}
                        className={el === currentFloor ? `${cls.item} ${cls.active}` : cls.item}
                        onClick={() => clickHandler(el)}
                    >{el}</div>
                )
            }
        </div>
    );
};
