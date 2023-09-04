import React, {useState} from 'react';
import cls from './ElementsSettings.module.css'
import {useDispatch, useSelector} from "react-redux";
import deleteBtn from 'redactor/shared/assets/delete-button.png'
import {
    addRoomCeil,
    deleteRoomCeil,
    setFloor,
    setRoomCoordinates,
    setRoomCorpus,
    setRoomNumber,
    setRoomWallAdjasent
} from "redactor/store/redactorSlice";
import {deleteRoom, fetchSearchRoom} from "redactor/store/asyncActions";

export const RoomSettings = () => {
    const dispatch = useDispatch()
    const {room} = useSelector(state => state.redactor)

    const wheelHandler = (e, idx, point, direction) => {
        if (e.deltaY > 0)
            dispatch(setRoomCoordinates([idx, point, direction, Number(e.target.value) - 1]))
        else
            dispatch(setRoomCoordinates([idx, point, direction, Number(e.target.value) + 1]))
    }

    function addCeilHandler() {
        dispatch(addRoomCeil(value))
    }

    function deleteCeilHandler(index) {
        dispatch(deleteRoomCeil(index))
    }

    function searchHandler() {
        dispatch(fetchSearchRoom())
    }

    function deleteHandler() {
        dispatch(deleteRoom())
    }
    const [value, setValue] = useState('-1')

    return (
        <>
            {/*COORDINATES*/}
            {Object.entries(room.walls).map((el, idx) => {
                    const isAdjasent = room.walls[idx].isAdjasent

                    return <div key={el[0]} className={cls.inputRow}>

                        <div className={cls.inputDouble}>
                            <input
                                className={cls.inputCeil}
                                type="text"
                                value={el[1].pointA[0]}
                                onChange={e => dispatch(setRoomCoordinates([idx, 'pointA', 0, e.target.value]))}
                                onWheel={e => wheelHandler(e, idx, 'pointA', 0)}
                            />
                            <input
                                className={cls.inputCeil}
                                type="text"
                                value={el[1].pointA[2]}
                                onChange={e => dispatch(setRoomCoordinates([idx, 'pointA', 2, e.target.value]))}
                                onWheel={e => wheelHandler(e, idx, 'pointA', 2)}
                            />
                        </div>
                        <div className={cls.inputDouble}>
                            <input
                                className={cls.inputCeil}
                                type="text"
                                value={el[1].pointB[0]}
                                onChange={e => dispatch(setRoomCoordinates([idx, 'pointB', 0, e.target.value]))}
                                onWheel={e => wheelHandler(e, idx, 'pointB', 0)}
                            />
                            <input
                                className={cls.inputCeil}
                                type="text"
                                value={el[1].pointB[2]}
                                onChange={e => dispatch(setRoomCoordinates([idx, 'pointB', 2, e.target.value]))}
                                onWheel={e => wheelHandler(e, idx, 'pointB', 2)}
                            />
                        </div>
                        <input type="checkbox"
                               checked={isAdjasent}
                               onChange={e => dispatch(setRoomWallAdjasent([idx, e.target.checked]))}
                        />
                        <div className={cls.deleteBtn}>
                            <img src={deleteBtn} alt="delete" onClick={() => deleteCeilHandler(idx)}/>
                        </div>
                    </div>
                }
            )}
            <div className={cls.btnAddCeil}>
                <div onClick={addCeilHandler}>Добавить</div>
                idx: <input type="number" value={value} onChange={e => setValue(e.target.value)}/>
            </div>

            {/*NUMBER FLOOR CORPUS*/}

            <div className={cls.info}>
                <div>
                    <label htmlFor="room">Номер:</label>
                    <input id='room' type="text" value={room.number}
                           onChange={e => dispatch(setRoomNumber(e.target.value))}/>
                </div>
                <div>
                    <label htmlFor="floor">Этаж:</label>
                    <input id='floor' type="text" value={room.floor}
                           onChange={e => dispatch(setFloor(e.target.value))}/>
                </div>
                <div>
                    <label htmlFor="corpus">Корпус:</label>
                    <input id='corpus' type="text" value={room.corpus}
                           onChange={e => dispatch(setRoomCorpus(e.target.value))}/>
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
