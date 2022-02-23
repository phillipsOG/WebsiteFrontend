import React, { useRef, useEffect } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";


import * as THREE from "three";
import { postProcessing } from "./postprocessing";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { PixelShader } from "three/examples/jsm/shaders/PixelShader.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";


extend({
    EffectComposer,
    ShaderPass,
    RenderPass,
    PixelShader,
    UnrealBloomPass,
});


export default function Effects() {
    const composer = useRef();
    const shaderRef = useRef();
    const { scene, gl, size, camera } = useThree();
    useEffect(() => void composer.current.setSize(size.width, size.height), [
        size
    ]);

    const timeRef = useRef(0);
    const noiseValue = useRef(0);


    useFrame(() => {
        timeRef.current += 0.001;


        if (noiseValue.current < 0.08) {
            noiseValue.current = timeRef.current;

        }

        if (shaderRef.current != null) {
            shaderRef.current.uniforms.time.value = timeRef.current;
            shaderRef.current.uniforms.noise.value = noiseValue.current;
            composer.current.render();
        }

    }, 1);

    return (
        <effectComposer ref={composer} args={[gl]}>
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <unrealBloomPass attachArray="passes" args={[undefined, 0.3, 0, 0.2]} />
            <unrealBloomPass attachArray="passes" args={[undefined, 0.3, 1, 0.5]} />

            <shaderPass
                ref={shaderRef}
                attachArray="passes"
                args={[postProcessing]}
                material-uniforms-resolution-value={[1 / size.width, 2 / size.height]}
                material-uniforms-time-value={[timeRef.current]}
            />
        </effectComposer>
    );
}