import cls from './MySearch.module.css'
import {useDispatch} from "react-redux";
import searchButton from 'shared/assets/searchButton.png'
import {searchRoom} from "features/room/asyncActions";
import {useState} from "react";

const corpuses = ['1', '2', '3а', '3б', '3г']

export const MySearch = () => {
	const dispatch = useDispatch()
	const [number, setNumber] = useState('240')
	const [corpus, setCorpus] = useState('3б')
	
	const clickHandler = () => {
		dispatch(searchRoom({number, corpus}))
	}
	return (
		<div className={cls.MySearch}>
			<div className={cls.topContent}>
				<input
					placeholder='Поиск по аудиториям'
					className={cls.MySearchInput}
					type="text"
					value={number}
					onChange={e => setNumber(e.target.value)}
				/>
				<div className={cls.MySearchButton} onClick={clickHandler}>
					<img className={cls.MySearchButtonImg} src={searchButton} alt='search'/>
				</div>
			</div>
			<div className={cls.bottomContent}>
				{
					corpuses.map(el =>
						<label key={el}>
							<input
								type="radio"
								name="contact"
								value={el}
								checked={el === corpus}
								onChange={e=>setCorpus(e.target.value)}
							/>
							{el}
						</label>
					)
				}
			</div>
		</div>
	);
};
