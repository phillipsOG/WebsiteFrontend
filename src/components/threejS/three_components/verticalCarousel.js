import React, { useRef, useEffect, createRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { useTexture } from "@react-three/drei"

import imageData from "./imageData.json"
import { shaderMaterial } from '../shaders/fragmentvertex'
import { CustomMaterial } from '../shaders/CustomMaterial'



// import { } from 'react-spring'

export default function VerticalCarousel() {
    const planeRef = createRef();

    // useEffect(() => {
    //     console.log(planeRef)
    // })


    return (
        <>

            {imageData.map((element, i) => {
                return (
                    <mesh ref={planeRef} key={i} position={[1.0, -1.2, 1]}>
                        <Plane img={'../test.png'} opacity="1" args={[1.5, 1.2, 10, 90]} i={i} />
                    </mesh>
                )
            })
            }

        </>
    )
}



const Plane = ({ img, opacity, videoSrc, args, i }) => {
    const map = useTexture(img)


    const meshRef = useRef();
    const shaderRef = useRef();

    // const [video] = useState(() => {
    //     videoSrc ? Object.assign(document.createElement("video"), { src: "/video.mp4", crossOrigin: "Anonymous", loop: true, muted: true }) : null
    // });
    // useEffect(() => {
    //    ( void hovered ? video?.play() : video?.play())
    // }, [hovered])


    useEffect(() => {
        meshRef.current.position.y = i * 1.3
        meshRef.current.position.x = i * 0.2

        meshRef.current.rotation.y = -0.3;
        meshRef.current.rotation.x = -0.1;
        meshRef.current.rotation.z = -0.1;


    }, [])


    let position = 3;


    useFrame(({ clock, gl, scene, camera, mouse }) => {
        const t = clock.getElapsedTime()
        shaderRef.current.time = t
        // CustomMaterial.setTime(t);

    })


    useEffect(function () {

    }, [])

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={args} />
            <customMaterial color={"white"} map={map} map-minFilter={THREE.LinearFilter} transparent opacity={opacity} ref={shaderRef} />
        </mesh>
    )
}






// function Slider(props) {
//     return imageData.map((slide, index) => (
//         <Block key={index} factor={1} offset={index} {...props}>
//             <Image key={index} slide={slide} />
//         </Block>
//     ))
// }








// function Image({ slide: { imgSrc, videoSrc, name, url } }) {
//     const ref = useRef()
//     const { contentMaxWidth: w, viewportWidth, offsetFactor } = useBlock()
//     useFrame(() => {
//       const scrollOffset = state.top.current / (viewportWidth * state.pages - viewportWidth) + 1 / state.pages / 2
//       const scale = 1 - (offsetFactor - scrollOffset) * (offsetFactor > scrollOffset ? 1 : -1)
//       ref.current.scale.setScalar(scale)
//     })

//     const [hovered, set] = useState(false)
//     useEffect(() => void (document.body.style.cursor = hovered ? `pointer` : `auto`), [hovered])

//     return (
//       <group ref={ref} onClick={() => window.open(url, "_blank").focus()} onPointerOver={(e) => set(true)} onPointerOut={() => set(false)}>
//         <Plane imgSrc={imgSrc} videoSrc={videoSrc} hovered={hovered} args={[1, 1, 32, 32]} aspect={1.7} scale={[w, w / 1.7, 1]} frustumCulled={false} />
//         <Text anchorX="left" position={[-w / 2, w / 1.3 / 2 - 0.25, 0]} scale={3} color="white">
//           {name}
//         </Text>
//         <Shadow scale={[w * 1.2, 1, 1]} rotation={[0.75, 0, 0]} position={[0, -w / 2, 0]} />
//       </group>
//     )
//   }


