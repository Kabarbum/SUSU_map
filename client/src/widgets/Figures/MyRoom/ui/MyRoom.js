import {memo, useEffect, useMemo, useRef} from "react";
import {useThree} from "@react-three/fiber";
import {MyWall} from "widgets/Figures/MyWall";
import {MyRoomFloor} from "widgets/Figures/MyRoomFloor";
import SpriteText from "three-spritetext";
import {toRadians} from "shared/lib/toRadians/toRadians";

function Text2d(text, x, z) {
	const Text = new SpriteText(text, 0.5, '#000');
	Text.fontSize = 90
	Text.borderColor = '#000'
	Text.position.x = x
	Text.position.y = 0.5
	Text.position.z = z
	return Text
}

const RoomWallsConstructor = ({walls, topColor, wallColor}) => {
	const calculatePillar = (wall) => {
		if (prevWall.pointA[2] < prevWall.pointB[2])
			if (wall.pointA[0] < wall.pointB[0])
				return true
		if (prevWall.pointA[2] > prevWall.pointB[2])
			if (wall.pointA[0] > wall.pointB[0])
				return true
		if (prevWall.pointA[0] > prevWall.pointB[0])
			if (wall.pointA[2] < wall.pointB[2])
				return true
		if (prevWall.pointA[0] < prevWall.pointB[0])
			if (wall.pointA[2] > wall.pointB[2])
				return true
		return false
	}
	let prevWall = null
	return <>
		{
			walls.map((wall, idx) => {
				//{pointA:[0,0,0],pointB:[1,0,0],isAdjasent:false}
				let isPillarForRoom = false
				if (prevWall)
					isPillarForRoom = calculatePillar(wall)
				prevWall = wall
				return <MyWall
					key={idx}
					points={wall}
					wallColor={wallColor ? wallColor : "#fff"}
					topColor={topColor && topColor}
					isPillarForRoom={isPillarForRoom}
				/>
			})
		}
	</>
}

function getMinMax(walls) {
	const coords = {
		minX: Infinity,
		maxX: -Infinity,
		minZ: Infinity,
		maxZ: -Infinity,
	}
	walls.forEach(el => {
		// minX
		coords.minX = coords.minX > el.pointA[0] ? el.pointA[0] : coords.minX
		coords.minX = coords.minX > el.pointB[0] ? el.pointB[0] : coords.minX
		//minZ
		coords.minZ = coords.minZ > el.pointA[2] ? el.pointA[2] : coords.minZ
		coords.minZ = coords.minZ > el.pointB[2] ? el.pointB[2] : coords.minZ
		// maxX
		coords.maxX = coords.maxX < el.pointA[0] ? el.pointA[0] : coords.maxX
		coords.maxX = coords.maxX < el.pointB[0] ? el.pointB[0] : coords.maxX
		// maxZ
		coords.maxZ = coords.maxZ < el.pointA[2] ? el.pointA[2] : coords.maxZ
		coords.maxZ = coords.maxZ < el.pointB[2] ? el.pointB[2] : coords.maxZ
	})
	return coords
}

export const MyRoom = memo((props) => {
	let {walls, id, number, topColor, wallColor, floorColor} = props.room
	walls = walls.map(wall => {
		const pointA = wall.pointA.map(el => el / 3)
		const pointB = wall.pointB.map(el => el / 3)
		return {pointA, pointB, isAdjasent: wall.isAdjasent}
	})

	//---------------координаты пола
	const vertices = useMemo(() => {
		let arr = []
		walls.forEach(wall => {
			arr.push(wall.pointA)
		})
		arr.push(walls[walls.length - 1].pointB)
		return arr
	}, [walls])

	//-------------центрирование номер аудитории
	const {scene} = useThree();
	const coords = getMinMax(walls)
	useEffect(() => {
		const x = (coords.maxX + coords.minX) / 2
		let z = (coords.maxZ + coords.minZ) / 2
		if (number === '201'  && z > -50) z -= 2.5 // для 201 аудитории 3г
		const text = Text2d(number, x, z)
		scene.add(text)
		return () => {
			text.removeFromParent()
		}
	}, [])

	// const [clicked, setClicked] = useState(false)
	const ref = useRef(null)
	
	return (
		<group
			ref={ref}
			userData={{id: id, number: number}}
			// onPointerDown={e => {
			// 	e.stopPropagation();
			// 	setClicked(true)
			// }}
		>
			
			<RoomWallsConstructor walls={walls} topColor={topColor} wallColor={wallColor}/>
			
			<MyRoomFloor color={floorColor} rotation={[toRadians(90), 0, 0]} vertices={vertices}/>
		</group>
	);
});