import { ShaderMaterial, Color } from "three"
import { extend } from "@react-three/fiber"

class CustomMaterial extends ShaderMaterial {
    constructor() {
        super({
            vertexShader: `uniform float scale;
      uniform float shift;
      varying vec2 vUv;
      uniform float time;
      float PI =  3.141592653589793238;
      void main() {

        vec3 pos = position;

        // pos.x = pos.x + ((sin(uv.y * 3.1415926535897932384626433832795) * shift * 2.0) * 0.125);

        pos.y += sin(PI*uv.x)*0.04;
        pos.z += sin(PI*uv.x)*0.04;


        pos.y += sin(time)*0.02;
        pos.y += sin(time)*0.02;




        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
      }`,
            fragmentShader: `
            
        uniform sampler2D tex;
        uniform float hasTexture;
        uniform float shift;
        uniform float scale;
        uniform vec3 color;
        uniform float opacity;
        uniform float time;
        varying vec2 vUv;

      void main() {
        float angle = 0.0;
        vec2 p = (vUv - vec2(0.5, 0.5)) * (1.0 - scale) + vec2(0.5, 0.5);
        vec2 offset = 0.0 * vec2(cos(angle), sin(angle));
        vec4 cr = texture2D(tex, p + offset);
        vec4 cga = texture2D(tex, p);
        vec4 cb = texture2D(tex, p - offset);
        if (hasTexture == 1.0) gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
        else gl_FragColor = vec4(color, opacity);



      }`,
            uniforms: {
                tex: { value: null },
                hasTexture: { value: 0 },
                scale: { value: 0 },
                time: { type: 'f', value: 0 },
                shift: { value: 0 },
                opacity: { value: 1 },
                color: { value: new Color("black") }
            }
        })
    }

    set scale(value) {
        this.uniforms.scale.value = value
    }

    get scale() {
        return this.uniforms.scale.value
    }

    set shift(value) {
        this.uniforms.shift.value = value
    }

    get shift() {
        return this.uniforms.shift.value
    }

    set map(value) {
        this.uniforms.hasTexture.value = !!value
        this.uniforms.tex.value = value
    }

    get map() {
        return this.uniforms.tex.value
    }

    get color() {
        return this.uniforms.color.value
    }

    get opacity() {
        return this.uniforms.opacity.value
    }

    set opacity(value) {
        if (this.uniforms) this.uniforms.opacity.value = value
    }

    get time() {
        return this.uniforms.time.value
    }

    set time(value) {
        this.uniforms.time.value = value
    }
}

extend({ CustomMaterial })
