import React, {useEffect} from 'react';
import cls from './ElementsList.module.css'
import addButton from "redactor/shared/assets/add-button.png"
import {useDispatch, useSelector} from "react-redux";
import {setType} from "redactor/store/redactorSlice";
import {
    addFloor,
    addRoom,
    addSprite,
    addSpriteType,
    addWall,
    fetchSpriteTypes, updateFloor,
    updateSprite, updateSpriteType, updateWall
} from "redactor/store/asyncActions";

export const ElementsList = () => {
    const dispatch = useDispatch()
    const {elements, type, sprite, wall, floor, sprite_type} = useSelector(state => state.redactor)
    useEffect(() => {
        dispatch(fetchSpriteTypes())
    }, [dispatch])

    const clickHandler = () => {
        switch (type) {
            case "room":
                dispatch(addRoom())
                break;
            case "wall":
                if(wall.id === '')
                    dispatch(addWall())
                else
                    dispatch(updateWall())
                break;
            case "floor":
                if(floor.id === '')
                    dispatch(addFloor())
                else
                    dispatch(updateFloor())
                break;
            case "sprite":
                if(sprite.id === '')
                    dispatch(addSprite())
                else
                    dispatch(updateSprite())
                break;
            case "sprite_type":
                if(sprite_type.id === '')
                    dispatch(addSpriteType())
                else
                    dispatch(updateSpriteType())
                break;
            default:
                return
        }
    }
    return (
        <div className={cls.ElementsList}>
            <select defaultValue={type} className={cls.select} onChange={e => dispatch(setType(e.target.value))}>
                <option className={cls.option} value="default">Выберите элемент</option>
                {
                    elements.map(el =>
                        <option key={el.value} className={cls.option} value={el.value}>{el.name}</option>
                    )
                }
            </select>
            <div className={cls.btn} onClick={clickHandler}>
                <img className={cls.img} src={addButton} alt="Добавить"/>
            </div>
        </div>
    );
};
