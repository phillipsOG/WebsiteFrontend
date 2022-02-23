

import React, { useRef, useState, Fragment, Suspense, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree, extend, render, events } from '@react-three/fiber';


import VerticalCarousel from "./three_components/verticalCarousel";

import * as THREE from 'three'
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial"
import { WireframeGeometry2 } from "three/examples/jsm/lines/WireframeGeometry2"
import { Wireframe } from "three/examples/jsm/lines/Wireframe"
import { ImagePlane } from './MainPage'
import PostProcessing from './shaders/PostProcessingEffect'


extend({ LineMaterial, WireframeGeometry2, Wireframe, })





export function AboutPage() {
    return (
        <Canvas2 />)
}


export function Canvas2() {

    const canvasRef = React.useRef();

    React.useLayoutEffect(() => {
        render(<Suspense fallback={false}>
            <VerticalCarousel />
        </Suspense>
            , canvasRef.current, { size: { height: 1000, width: 1000 } })
    }, [])


    return (
        <canvas ref={canvasRef} />
    )
}



function Box() {
    return (
        <mesh>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial attach="material" transparent opacity={0.5} />
        </mesh>
    )
}


// export function AboutPage() {




//     return (
//         <Canvas2 />)
// }