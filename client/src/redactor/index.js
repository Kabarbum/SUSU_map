import React from 'react';
import cls from './redactor.module.css'
import {ElementsList} from "redactor/widgets/elements/ElementsList";
import {ElementsSettings} from "./widgets/elements/ElementsSettings";
import {useSelector} from "react-redux";

const Redactor = () => {
    const type = useSelector(state => state.redactor.type)
    return (
        <div className={cls.Redactor}>
            <div className={cls.topMenu}>
                <ElementsList/>
                {type !== 'default' && <ElementsSettings/>}

            </div>
        </div>
    );
};

export default Redactor;