import {DoubleSide, Shape} from "three";

export const MyRoomFloor = (props) => {
    const rotation = props.rotation || [0, 0, 0]
    const position = props.position || [0, 0, 0]
    const vertices = props.vertices || [[0, 0, 0], [1, 0, 0], [0, 0, 1]]
    const color = props.color || '#6992e5'
    let thickness = 0.01

    let shape = new Shape()

    shape.moveTo(vertices[0][0],vertices[0][2])
    vertices.forEach(el => shape.lineTo(el[0], el[2]))

    const extrudeSettings = {
        curveSegments: 1,
        steps: 1,
        depth: thickness,
        bevelEnabled: false
    }

    return (
        <mesh rotation={rotation} position={position}>
            <extrudeGeometry attach="geometry" args={[shape, extrudeSettings]}/>
            <meshStandardMaterial color={color} side={DoubleSide}/>
        </mesh>
    )
}

