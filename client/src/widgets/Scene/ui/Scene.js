import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MyRoom } from "widgets/Figures/MyRoom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, searchRoom } from "features/room/asyncActions";
import { MyFloor } from "widgets/Figures/MyFloor";
import { fetchFloors } from "features/floor/floorSlice";
import { fetchWalls } from "features/wall/wallSlice";
import { MyWall } from "widgets/Figures/MyWall";
import { fetchSprites } from "features/sprite/asyncActions";
import { MySprite } from "widgets/Figures/MySprite";
import { RedactorElement } from "redactor/widgets/elements/RedactorElement";
import { toRadians } from "shared/lib/toRadians/toRadians";
import { useSearchParams } from "react-router-dom";
import { MyStreet } from "widgets/Figures/MyStreet";
import { setColorNormal, setSearchedRoom } from "features/room/roomSlice";

function Scene() {
  const { scene, camera, gl } = useThree();
  const { rooms, target, roomsId, isSearchRoomIdChanged } = useSelector(
    (state) => state.room
  );
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  const { floors } = useSelector((state) => state.floor);
  const { walls } = useSelector((state) => state.wall);
  const { sprites } = useSelector((state) => state.sprite);
  const dispatch = useDispatch();
  const floor = useSelector((state) => state.room.currentFloor);

  // настройка отображаемой сцены
  useEffect(() => {
    scene.background = new THREE.Color(0x7db3f7);
    scene.fog = new THREE.Fog(0xffffff, 20, 200);
    gl.shadowMap.enabled = true;
    gl.toneMapping = 0;
    gl.setClearColor(0xffffff);
    camera.fog = 0;
  }, [dispatch, camera, scene, gl, gl.shadowMap]);

  // начальная позиция (напротив ГУКа)
  useEffect(() => {
    camera.position.setX(-60 / 3);
    camera.position.setZ(-335 / 3);
    orbitRef.current.target = new THREE.Vector3(
      target[0] / 3,
      0,
      target[2] / 3
    );
  }, []);

  // начальный запрос на сервер всех объектов
  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchFloors());
    dispatch(fetchWalls());
    dispatch(fetchSprites());
  }, [floor, dispatch]);

  const [searchParams] = useSearchParams();

  // поиск по url параметрам
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const number = queryParameters.get("number");
    const corpus = queryParameters.get("corpus");
    if (number && corpus) {
      dispatch(searchRoom({ number, corpus }));
    }
  }, [searchParams, dispatch]);

  const [azimuthAngle, setAzimuthAngle] = useState(Infinity);
  const [distance, setDistance] = useState([5, 70]);

  // перемещение к искомой аудитории
  useEffect(() => {
    if (target[0] !== -108 && target[2] !== -335) {
      orbitRef.current.target = new THREE.Vector3(
        target[0] / 3,
        0,
        target[2] / 3
      );
      setAzimuthAngle(orbitRef.current.getAzimuthalAngle());
      setDistance([24, 24]);

      setTimeout(() => {
        setAzimuthAngle(Infinity);
        setDistance([5, 70]);
      }, 10);
    }
  }, [target]);

  // выделение искомой аудитории
  useEffect(() => {
    if (isSearchRoomIdChanged) dispatch(setSearchedRoom());
  }, [isSearchRoomIdChanged, roomsId]);

  const orbitRef = useRef(null);
  return (
    <>
      <ambientLight args={["#fff", 1]} />
      <OrbitControls
        ref={orbitRef}
        camera={camera}
        minDistance={distance[0]}
        maxDistance={distance[1]}
        maxPolarAngle={toRadians(30)}
        minPolarAngle={toRadians(0)}
        maxAzimuthAngle={azimuthAngle}
        minAzimuthAngle={azimuthAngle}
        // maxAzimuthAngle={toRadians(90)}
        // minAzimuthAngle={toRadians(90)}
        screenSpacePanning={false}
        panSpeed={2.5}
        mouseButtons={{
          RIGHT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          LEFT: THREE.MOUSE.PAN,
        }}
        // touches={{
        // 	ONE: THREE.TOUCH.ROTATE,
        // 	TWO: THREE.TOUCH.DOLLY_PAN
        // }}
      />
      <group onClick={() => dispatch(setColorNormal())}>
        {/*REDACTOR ELEMENT*/}
        {isAdmin && <RedactorElement />}

        {/*street torch*/}
        <mesh position={[100, 2, 20]}>
          <boxGeometry args={[0.1, 5, 0.1]} />
          <meshPhongMaterial
            color={"#0033ff"}
            opacity={0.5}
            transparent={true}
          />
        </mesh>

        {/*STREET*/}
        <MyStreet />

        {/*WALLS*/}
        {walls?.map((wall) => {
          return (
            <MyWall
              key={wall.id}
              points={wall.points}
              isPillarAfter={wall.isPillarAfter}
              isPillarBefore={wall.isPillarBefore}
            />
          );
        })}

        {/*Floors*/}
        {floors?.map((floor) => (
          <MyFloor key={floor.id} floor={floor} />
        ))}

        {/*Rooms*/}
        {rooms?.map((room) => (
          <MyRoom key={room.id} room={room} />
        ))}

        {/*Sprites*/}

        {sprites?.map((sprite) => (
          <MySprite key={sprite.id} sprite={sprite} />
        ))}
      </group>
    </>
  );
}

export default Scene;
