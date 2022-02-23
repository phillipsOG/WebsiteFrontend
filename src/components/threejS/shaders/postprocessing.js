var postProcessing = {
    uniforms: {
        tDiffuse: { value: null },
        RGBSHIFT: { value: null },
        resolution: { value: null },
        pixelSize: { value: 1 },
        time: { value: 0 },
        noise: { value: 0 }
    },

    vertexShader: [
        "varying highp vec2 vUv;",

        "void main() {",

        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

        "}"
    ].join("\n"),

    fragmentShader: `
          uniform sampler2D tDiffuse;
          uniform float pixelSize;
      uniform vec2 resolution;
      uniform float time;
      uniform float noise;

          varying highp vec2 vUv;
      float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
    
          void main(){
        vec2 shift = vec2(0.002,0.002);
  
  
        //RGBSHIFT
  
  
  
  
        //changing to BW
        vec4 t = texture2D(tDiffuse, vUv);
        vec4 t1 = texture2D(tDiffuse, vUv + shift);
        vec4 t2 = texture2D(tDiffuse, vUv - shift);
  
        vec3 bwColor = vec3((t.r + t.b + t.g)/5.);
        vec3 bwColor1 = vec3((t1.r + t1.b + t1.g)/5.);
        vec3 bwColor2 = vec3((t2.r + t2.b + t2.g)/5.);
  
  
        bwColor = vec3(t.r/1., t1.g/1., t2.b/1.);
  
        //Noise
        float val = hash(vUv + time) * noise / 2.;
  
          vec2 dxy = pixelSize / resolution;
          vec2 coord = dxy * floor( vUv / dxy );
          gl_FragColor = texture2D(tDiffuse, vUv);
      // gl_FragColor = vec4(bwColor,1.);
      gl_FragColor = vec4(bwColor + vec3(val), 1.);
          }`
}

export { postProcessing }
