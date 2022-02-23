

import *as THREE from "three"

var shaderMaterial = {
    vertexShader:
        `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform vec2 pixels;
    float PI=3.141592653589793238;
    void main(){
        vUv=uv;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
    }
    
    `,
    fragmentShader:
        `
    uniform float time;
    uniform float progress;
    uniform sampler2D texture1;
    uniform vec4 resolution;
    varying vec2 vUv;
    varying vec3 vPosition;
    float PI=3.141592653589793238;
    void main(){
    // vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    gl_FragColor=vec4(vUv,0.,1.);
}
    
    `

    ,
    uniforms: {
        time: { type: 'f', value: 0 },
        resolution: { type: 'v4', value: new THREE.Vector4() },
        uvRate: {
            value: new THREE.Vector2(1, 1)
        }

    }

}

export { shaderMaterial };
