import React, { useEffect, useRef } from 'react'

/**
 * The brand's signature ground: a full-bleed WebGL plane — warm-charcoal radial
 * fill, a wind-driven fog of domain-warped streaked noise, film grain, a
 * barely-visible cursor lift and an edge vignette. Written in raw WebGL so the
 * design system, specimen cards, templates and UI kits render it without React
 * Three Fiber.
 *
 * The fog is deliberately near the threshold of visibility: it should register
 * as the air in the room, not as a graphic. If you can name it as an effect on
 * first glance, turn it down.
 *
 * In the Next.js app, port this fragment shader into
 * src/experience/BackgroundScene.tsx (React Three Fiber) and keep the two in
 * sync — this copy exists for everything outside the app.
 */
const VERT = `attribute vec2 aPos;varying vec2 vUv;void main(){vUv=aPos*0.5+0.5;gl_Position=vec4(aPos,0.0,1.0);}`

const FRAG = `precision highp float;
uniform vec2 uMouse;uniform float uAspect;uniform float uTime;varying vec2 vUv;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.0-2.0*f);
 return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),f.x),f.y);}
float fbm(vec2 p){float v=0.0;float a=0.5;
 for(int i=0;i<3;i++){v+=a*noise(p);p*=2.03;a*=0.5;}
 return v;}
void main(){
 vec2 uv=vUv;
 vec2 uvA=vec2((uv.x-0.5)*uAspect,uv.y-0.5);
 vec2 mouseA=vec2((uMouse.x-0.5)*uAspect,uMouse.y-0.5);
 float mouseDist=length(uvA-mouseA);
 float centerDist=length(uvA);

 // ── Ground: warm charcoal, corners darker ──────────────────────────────
 vec3 edgeColor=vec3(0.020,0.016,0.020);  // ~#050405
 vec3 fillColor=vec3(0.118,0.094,0.106);  // ~#1e181b
 float centerFade=smoothstep(0.95,0.0,centerDist);
 vec3 color=mix(edgeColor,fillColor,centerFade);

 // ── Wind-driven fog ────────────────────────────────────────────────────
 // Coordinates are stretched on y so the noise reads as horizontal streaks
 // rather than clouds; a slow domain warp bends them so the drift never
 // looks like a flat scroll.
 vec2 wind=vec2(uTime*0.026,uTime*-0.005);
 vec2 fogUv=vec2(uv.x*1.5,uv.y*4.0);
 vec2 warp=vec2(
   noise(fogUv*0.55+wind*0.4),
   noise(fogUv*0.55+wind*0.4+vec2(5.2,1.3))
 );
 float fog=fbm(fogUv+wind+warp*0.7);
 fog=smoothstep(0.26,0.60,fog);
 // Sits in a broad mid band, absent at the very top and bottom edges
 float band=smoothstep(1.10,0.20,uv.y)*smoothstep(-0.05,0.40,uv.y);
 fog*=band;
 // Densest parts take a faint warm cast from the accent red. Calibrated by
 // measurement: at 0.28 the fog lifts local brightness by about 7 of 28 levels
 // — readable as structure, not as a graphic. Above ~0.45 it becomes an effect.
 vec3 fogTint=vec3(0.30,0.13,0.12);
 color+=fogTint*fog*0.28;

 // A finer, faster layer gives the fog its texture from close up
 float fine=noise(vec2(uv.x*3.2,uv.y*10.0)+wind*2.6);
 color+=vec3(0.11,0.09,0.10)*fine*fog*0.48;

 // ── Mouse: barely-visible brightness lift ──────────────────────────────
 float spot=smoothstep(0.09,0.0,mouseDist);
 color+=color*spot*0.12;

 // Film grain
 color+=hash(uv+fract(uTime*0.1))*0.012;

 // Edge vignette — corners fall off to near black
 float vignette=smoothstep(1.0,0.10,centerDist);
 color*=mix(0.38,1.0,vignette);

 gl_FragColor=vec4(color,1.0);
}`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

export function SceneBackdrop({ fixed = true, interactive = true, style, ...rest }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uMouse = gl.getUniformLocation(prog, 'uMouse')
    const uAspect = gl.getUniformLocation(prog, 'uAspect')
    const uTime = gl.getUniformLocation(prog, 'uTime')

    const target = [0.5, 0.5]
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      target[0] = (e.clientX - r.left) / r.width
      target[1] = 1 - (e.clientY - r.top) / r.height
    }
    if (interactive) window.addEventListener('mousemove', onMove)

    // Capped at 1.5: the fog costs real fragment work and the noise hides the
    // difference at higher densities.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      const w = canvas.clientWidth || 1
      const h = canvas.clientHeight || 1
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(uAspect, w / h)
    }
    resize()
    window.addEventListener('resize', resize)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const t0 = performance.now()
    const frame = () => {
      const t = reduce ? 0 : (performance.now() - t0) / 1000
      gl.uniform2f(uMouse, target[0], target[1])
      gl.uniform1f(uTime, t)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!reduce) raf = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      if (interactive) window.removeEventListener('mousemove', onMove)
    }
  }, [interactive])

  return (
    <div
      aria-hidden="true"
      style={{
        position: fixed ? 'fixed' : 'absolute',
        inset: 0,
        zIndex: 'var(--z-scene)',
        background: 'var(--gradient-scene)',
        pointerEvents: 'none',
        ...style,
      }}
      {...rest}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
