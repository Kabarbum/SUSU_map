import React, {useEffect} from 'react';
import cls from './ElementsSettings.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setFloor, setSpriteCoordinates, setSpriteTypeId} from "redactor/store/redactorSlice";
import {deleteSprite, fetchOneSprite} from "redactor/store/asyncActions";

export const SpriteSettings = () => {
    const dispatch = useDispatch()
    const {sprite, spriteTypes} = useSelector(state => state.redactor)

    const wheelHandler = (e, direction) => {
        if (e.deltaY > 0)
            dispatch(setSpriteCoordinates([direction, Number(e.target.value) - 1]))
        else
            dispatch(setSpriteCoordinates([direction, Number(e.target.value) + 1]))
    }

    function changeHandler(e) {
        dispatch(setSpriteTypeId(e.target.value))
    }
    useEffect(() => {
        dispatch(setSpriteTypeId(spriteTypes[0].id))
    }, [dispatch, spriteTypes])

    function searchHandler() {
        dispatch(fetchOneSprite())
    }

    function deleteHandler() {
        dispatch(deleteSprite())
    }

    return (
        <>
            <div>
                ID: {sprite.id}
            </div>
            <div className={cls.inputDouble}>
                <input
                    className={cls.inputCeil}
                    type="text"
                    value={sprite.position[0]}
                    onChange={e => dispatch(setSpriteCoordinates([0, e.target.value]))}
                    onWheel={e => wheelHandler(e, 0)}
                />
                <input
                    className={cls.inputCeil}
                    type="text"
                    value={sprite.position[2]}
                    onChange={e => dispatch(setSpriteCoordinates([2, e.target.value]))}
                    onWheel={e => wheelHandler(e, 2)}
                />
            </div>

            {/* SET FLOOR */}
            <div className={cls.info}>
                <div>
                    <label htmlFor="floor">Этаж:</label>
                    <input id='floor' type="text" value={sprite.floor}
                           onChange={e => dispatch(setFloor(e.target.value))}/>
                </div>
                <select
                    value={sprite.spriteTypeId}
                    onChange={e => changeHandler(e)}
                >
                    {
                        spriteTypes.map(el =>
                            <option
                                key={el.id}
                                value={el.id}
                            >{el.name}</option>
                        )
                    }
                </select>
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
