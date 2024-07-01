import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, Stats, Text } from "@react-three/drei";
import { useRef, useState } from 'react'
import { ChromePicker, SketchPicker } from 'react-color';

function Box({ props, hoverColor, standardColor, size }: { props: any, hoverColor: string, standardColor: string, size: number }) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += delta))
    // Return the view, these are regular Threejs elements expressed in JSX

    console.log(hoverColor, standardColor)

    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? size : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => (event.stopPropagation(), hover(true))}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? hoverColor : standardColor} />
        </mesh>
    )
}

export default function Create() {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState('#fff');
    const [size, setSize] = useState(2);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleChange = (color: any) => {
        setColor(color.hex);
    };

    const handleSave = () => {
        console.log(color, size)
    }

    const styles = {
        swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
        },
        color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: color,
        },
        popover: {
            position: 'absolute',
            zIndex: 2,
        },
        cover: {
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen w-screen">
                <div className="flex size-96 shadow-lg rounded-2xl items-center justify-center">
                    <Canvas style={{ width: '100%', height: '100%' }}>
                        <ambientLight intensity={Math.PI / 2} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                        <Box position={[0, 0, 0]} hoverColor={color} standardColor='orange' size={size} />
                        <OrbitControls />
                    </Canvas>
                </div>
                <div className="size-72 shadow-lg rounded-2xl mt-4 flex flex-col items-center justify-center">
                    <p className="text-bold text-xl mb-4">Options</p>

                    <div className="flex flex-row">
                        <p className="mr-2 text-bold">Color: </p>
                        <div style={styles.swatch} onClick={handleClick}>
                            <div style={styles.color} />
                        </div>

                        {displayColorPicker ? (
                            <div >
                                <div onClick={handleClose} />
                                <SketchPicker color={color} onChange={handleChange} />
                            </div>
                        ) : null}
                    </div>
                    <div className="flex flex-row">
                        <div className="join my-2">

                            <input className="join-item btn w-auto" type="radio" name="options" aria-label="SM" defaultChecked onClick={() => { setSize(2) }} />
                            <input className="join-item btn w-auto" type="radio" name="options" aria-label="MD" onClick={() => { setSize(3) }} />
                            <input className="join-item btn w-auto" type="radio" name="options" aria-label="LG" onClick={() => { setSize(4) }} />

                        </div>
                    </div>

                </div>
                <button className="btn mt-4">Save</button>
            </div>
        </>
    );
}

function useAtom(postFeedArray: any): [any, any] {
    throw new Error("Function not implemented.");
}
