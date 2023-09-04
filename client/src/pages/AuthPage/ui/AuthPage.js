import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import cls from "./AuthPage.module.css";
import {useDispatch} from "react-redux";
import {validateAdmin} from "features/admin/adminSlice";

export const AuthPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		if (login.length > 0 && password.length > 0) {
			dispatch(validateAdmin({login, password}));
			navigate("/");
		}
	};

	return (
		<div className={cls.container}>
			<form action="#">
				<label className={cls.label} htmlFor="fLogin">
					Логин
				</label>
				<input
					className={cls.input}
					type="text"
					id="fLogin"
					placeholder="Введите логин..."
					value={login}
					onChange={(e) => setLogin(e.target.value)}
				/>

				<label className={cls.label} htmlFor="lPassword">
					Пароль
				</label>
				<input
					className={cls.input}
					type="password"
					id="lPassword"
					placeholder="Введите пароль"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<input type="submit" value="Войти" onClick={(e) => onSubmit(e)}/>
			</form>
		</div>
	);
};
