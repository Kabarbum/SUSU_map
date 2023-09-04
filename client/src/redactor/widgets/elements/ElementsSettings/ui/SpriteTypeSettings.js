import React from "react";
import cls from "./ElementsSettings.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setSpriteType,
  setSpriteTypeImg,
  setSpriteTypeName,
} from "redactor/store/redactorSlice";
import deleteBtn from "redactor/shared/assets/delete-button.png";
import { deleteSpriteType } from "redactor/store/asyncActions";

export const SpriteTypeSettings = () => {
  const dispatch = useDispatch();
  const { sprite_type, spriteTypes } = useSelector((state) => state.redactor);

  function setImg(file) {
    if (file !== undefined) {
      dispatch(setSpriteTypeImg(file));
    }
  }

  function updateTypeHandler(type) {
    dispatch(setSpriteType(type));
  }

  function deleteTypeHandler(id) {
    dispatch(deleteSpriteType(id));
  }

  function cancelChanges() {
    dispatch(setSpriteType({ id: "", name: "" }));
  }

  return (
    <>
      <div className={cls.object_id}>
        <div>ID: {sprite_type.id}</div>
        <button onClick={cancelChanges}> Очистить</button>
      </div>
      {/* SET NAME IMG */}
      <div className={cls.info_type}>
        {spriteTypes.map((type) => (
          <div key={type.id} className={cls.spriteTypeList}>
            <span>{type.name}</span>
            <div className={cls.btns}>
              <div className={cls.btnAddCeil}>
                <div onClick={() => updateTypeHandler(type)}>Изменить</div>
              </div>
              <div className={cls.deleteBtn}>
                <img
                  src={deleteBtn}
                  alt="delete"
                  onClick={() => deleteTypeHandler(type.id)}
                />
              </div>
            </div>
          </div>
        ))}
        <div>
          <label htmlFor="name">Название:</label>
          <input
            id="name"
            type="text"
            value={sprite_type.name}
            onChange={(e) => dispatch(setSpriteTypeName(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="img">Изображение:</label>
          <input
            id="img"
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
      </div>
    </>
  );
};
