

import React, { useRef, useState, Fragment, Suspense, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree, extend, } from '@react-three/fiber';


import PostProcessing from './shaders/PostProcessingEffect'
import './mainpage.css'
import { useTexture } from "@react-three/drei"



import { CustomMaterial } from './shaders/imgPlaneMateria'
import { ImageMaterial } from './shaders/imgPlaneMateria'

import { Button } from 'react-bootstrap'


import VerticalCarousel from "./three_components/verticalCarousel";

import * as THREE from 'three'
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial"
import { WireframeGeometry2 } from "three/examples/jsm/lines/WireframeGeometry2"
import { Wireframe } from "three/examples/jsm/lines/Wireframe"
import { MdKeyboardArrowDown } from "react-icons/md";

extend({ LineMaterial, WireframeGeometry2, Wireframe, })


export const Text = () => {

    return (
        <>
            <div className="lumiDesc">
                <h1 >
                    A Quest led, <br /> interdisciplinary <br /> & virtual learning platform
                </h1>
            </div>

            <div className="bottomText">
                <h1>
                    unleash the innate creativity of children between the ages of 10 - 17 years
                </h1>
            </div>


            <div className="Scroll">
                <div className="circle-scroll">
                    <MdKeyboardArrowDown size={40} style={{ color: "brown" }} />
                </div>
            </div>


            {/* <div className="d-inline-flex" style={{ justifyContent: 'center' }}>
                <Button className='contactBtn' style={{ borderRadius: '20px', padding: '15px' }} size="lg" variant="outline-dark primary">Book a Quest</Button>
                <Button className='bookingBtn' style={{ borderRadius: '20px', padding: '15px' }} size="lg" variant="outline-dark">Contact us</Button>
            </div> */}

            <div className="btnContainer">
                <span className="bookQuestBtn">Book a Quest</span>
                <span className="contactBtn">Contact Us</span>
            </div>


            <div className="verticalLine" />



        </>



    )
}





export const ImagePlane = () => {
    const shaderRef = useRef();

    const map = useTexture("../test.png");

    // const uniforms = useMemo(
    //     () => ({
    //         uTime: { type: 'f', value: 0 },
    //         resolution: { type: 'v4', value: new THREE.Vector4() },
    //         mouse: { type: "v2", value: new THREE.Vector2(0, 0) },
    //         uvRate: {
    //             value: new THREE.Vector2(1, 1)
    //         },
    //     }),
    //     []
    // );


    useFrame(({ clock, gl, scene, camera, mouse }) => {
        const t = clock.getElapsedTime()
        shaderRef.current.time = t * 0.3
        // CustomMaterial.setTime(t);

    })


    return (
        // <mesh>
        <mesh position={[0.6, 0.33, 0]}>
            <planeGeometry attach="geometry" args={[4.4, 2.8, 1, 1]} />
            <imageMaterial
                map={map}
                attach="material"
                extensions="#extension GL_OES_standard_derivatives : enable"
                side={THREE.DoubleSide}
                ref={shaderRef}
            />
        </mesh>
        // </mesh>
    )
}








export function MainPage() {


    return (
        <>
            <Canvas camera={{ position: [0, 0, 3] }}>
                <Suspense fallback={null}>
                    <ImagePlane />
                    {/* <PostProcessing /> */}
                    {/* <VerticalCarousel /> */}

                </Suspense>

            </Canvas>
        </>

    )
}




























