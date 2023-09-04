import {memo, useMemo, useRef} from 'react';
import {TextureLoader} from "three";

export const MySprite = memo(({sprite}) => {
	const texture = useMemo(() => {
		const loader = new TextureLoader();
		return loader.load(process.env.REACT_APP_SERVER_URL + sprite.sprite_type.img)
	}, [sprite.sprite_type.img])
	const scale = 0.7
	const position = [
		sprite.position[0] / 3,
		0.3,
		sprite.position[2] / 3
	]
	const ref = useRef(null)
	return (
		<sprite ref={ref} position={position} scale={scale}>
			<spriteMaterial attach="material" map={texture}/>
		</sprite>
	);
})

