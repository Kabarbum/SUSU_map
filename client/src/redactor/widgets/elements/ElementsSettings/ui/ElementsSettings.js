import React from 'react';
import cls from './ElementsSettings.module.css'
import {WallSettings} from "./WallSettings";
import {FloorSettings} from "./FloorSettings";
import {RoomSettings} from "./RoomSettings";
import {useSelector} from "react-redux";
import {Controls} from "../../Controls";
import {SpriteSettings} from "./SpriteSettings";
import {SpriteTypeSettings} from "./SpriteTypeSettings";

export const ElementsSettings = () => {
    const type = useSelector(state => state.redactor.type)

    return (
        <div className={cls.ElementsSettings}>
            <div className={cls.inputWrapper}>
                {type === 'room' && <RoomSettings/>}
                {type === 'wall' && <WallSettings/>}
                {type === 'floor' && <FloorSettings/>}
                {type === 'sprite' && <SpriteSettings/>}
                {type === 'sprite_type' && <SpriteTypeSettings/>}
            </div>
            {['room','wall','floor','sprite'].indexOf(type) > -1  && <Controls/>}
        </div>
    );
};
