import React, { useEffect, useRef } from "react";

export default function LiquidShader() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const vsSource = `
      attribute vec2 position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = position * 0.5 + 0.5;
        v_texCoord.y = 1.0 - v_texCoord.y;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 a0 = x - floor(x + 0.5);
        vec3 g = a0.xyx * vec4(x12.xy, x12.zw).xxy + h.xyz * vec4(x12.xy, x12.zw).zzw;
        vec3 t = 0.8 * inversesqrt(a0*a0 + h*h);
        vec3 r = vec3(
          dot(g.xyz, vec3(x0.x, x0.y, 1.0)),
          dot(g.xyz, vec3(x12.x, x12.y, 1.0)),
          dot(g.xyz, vec3(x12.z, x12.z, 1.0))
        );
        return 130.0 * dot(m, g);
      }

      void main() {
          vec2 uv = v_texCoord;
          vec2 mouse = u_mouse / vec2(1280.0, 720.0); // Simulated resolution base
          vec3 color1 = vec3(0.058, 0.368, 0.301); 
          vec3 color2 = vec3(0.035, 0.224, 0.184); 
          vec3 color3 = vec3(0.12, 0.45, 0.38);   
          vec3 gold = vec3(0.83, 0.68, 0.21);    
          
          float n1 = snoise(uv * 2.0 + u_time * 0.1);
          float n2 = snoise(uv * 4.0 - u_time * 0.15 + mouse * 0.5);
          float n3 = snoise(uv * 1.5 + u_time * 0.05);
          
          float mixFactor = smoothstep(-0.5, 0.5, n1 + n2 * 0.5);
          vec3 baseColor = mix(color1, color2, mixFactor);
          baseColor = mix(baseColor, color3, smoothstep(0.0, 1.0, n3));
          
          float shimmer = smoothstep(0.7, 1.0, n2);
          baseColor = mix(baseColor, gold, shimmer * 0.08);
          
          float dist = distance(uv, vec2(0.5));
          baseColor *= smoothstep(1.3, 0.4, dist);
          
          gl_FragColor = vec4(baseColor, 1.0);
      }
    `;

    function compileShader(source, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
      }
      return shader;
    }

    const program = gl.createProgram();
    gl.attachShader(program, compileShader(vsSource, gl.VERTEX_SHADER));
    gl.attachShader(program, compileShader(fsSource, gl.FRAGMENT_SHADER));
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Shader linking error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTimeLocation = gl.getUniformLocation(program, "u_time");
    const uMouseLocation = gl.getUniformLocation(program, "u_mouse");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId;
    const render = (time) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.uniform1f(uTimeLocation, time * 0.001);
      gl.uniform2f(uMouseLocation, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
