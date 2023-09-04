import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import cls from './Controls.module.css'
import {changeCoordinates, doRotation} from "redactor/store/redactorSlice";
import rotateUrl from "redactor/shared/assets/rotate.png";
import arrowUrl from "redactor/shared/assets/arrow.png";

export const Controls = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState({x: '0', z: '0'})
    const changeHandler = (check) => {
        dispatch(changeCoordinates(check))
    }
    const rotateHandler = () => {
        dispatch(doRotation())
    }

    function increaseHandler() {
        const x = Number(value.x)
        const z = Number(value.z)
        if (x < 0)
            for (let i = 0; i > x; i--)
                dispatch(changeCoordinates('x-'))
        else if (x > 0)
            for (let i = 0; i < x; i++)
                dispatch(changeCoordinates('x+'))
        if (z < 0)
            for (let i = 0; i > z; i--)
                dispatch(changeCoordinates('z-'))
        else if (z > 0)
            for (let i = 0; i < z; i++)
                dispatch(changeCoordinates('z+'))
        setValue({x: '0', z: '0'})
    }

    return (
        <>
            <div className={cls.controls}>
                <div onClick={rotateHandler} className={cls.rotate}>
                    <img className={cls.img} src={rotateUrl} alt=""/></div>
                <div onClick={() => changeHandler('x-')} className={`${cls.arrow} ${cls.arrowTop}`}>
                    <img className={cls.img} src={arrowUrl} alt=""/></div>
                <div onClick={() => changeHandler('z-')} className={`${cls.arrow} ${cls.arrowRight}`}>
                    <img className={cls.img} src={arrowUrl} alt=""/></div>
                <div onClick={() => changeHandler('x+')} className={`${cls.arrow} ${cls.arrowBottom}`}>
                    <img className={cls.img} src={arrowUrl} alt=""/></div>
                <div onClick={() => changeHandler('z+')} className={`${cls.arrow} ${cls.arrowLeft}`}>
                    <img className={cls.img} src={arrowUrl} alt=""/></div>
            </div>
            <div className={cls.xz}>
                <span>X|: </span>
                <input type="number" value={value.x} onChange={e => setValue({...value, x: e.target.value})}/>
                <span>Z-: </span>
                <input type="number" value={value.z} onChange={e => setValue({...value, z: e.target.value})}/>

                <button onClick={increaseHandler}>Сместить</button>
            </div>
        </>
    );
};
