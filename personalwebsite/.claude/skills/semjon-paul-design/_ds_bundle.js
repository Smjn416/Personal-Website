/* @ds-bundle: {"format":4,"namespace":"SemjonPaulDesignSystem_d2b8a3","components":[{"name":"SceneBackdrop","sourcePath":"components/experience/SceneBackdrop.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Container","sourcePath":"components/layout/Container.jsx"},{"name":"Section","sourcePath":"components/layout/Section.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"Tag","sourcePath":"components/surfaces/Tag.jsx"},{"name":"Heading","sourcePath":"components/typography/Heading.jsx"},{"name":"TextReveal","sourcePath":"components/typography/TextReveal.jsx"},{"name":"AnimatedLink","sourcePath":"components/ui/AnimatedLink.jsx"},{"name":"Button","sourcePath":"components/ui/Button.jsx"},{"name":"Icon","sourcePath":"components/ui/Icon.jsx"},{"name":"LinkButton","sourcePath":"components/ui/LinkButton.jsx"},{"name":"MagneticButton","sourcePath":"components/ui/MagneticButton.jsx"}],"sourceHashes":{"components/experience/SceneBackdrop.jsx":"ed6eaab21def","components/forms/Field.jsx":"fbc61f2f523c","components/forms/Input.jsx":"b1e95e059a6e","components/forms/Textarea.jsx":"b9eb8794ad56","components/layout/Container.jsx":"3748324b6bfc","components/layout/Section.jsx":"3869b46399da","components/surfaces/Card.jsx":"79e279428b22","components/surfaces/Tag.jsx":"7599e6e30bcb","components/typography/Heading.jsx":"1fc28e51a5cb","components/typography/TextReveal.jsx":"e7b26fbff28d","components/ui/AnimatedLink.jsx":"12508279a4b1","components/ui/Button.jsx":"a7116716acf4","components/ui/Icon.jsx":"0f553aa40f3c","components/ui/LinkButton.jsx":"35d57d192543","components/ui/MagneticButton.jsx":"a4f3d31ef24b","ui_kits/portfolio/About.jsx":"2b2b4144713c","ui_kits/portfolio/App.jsx":"589557429fc5","ui_kits/portfolio/Contact.jsx":"04dbdf184069","ui_kits/portfolio/Footer.jsx":"4c007515d423","ui_kits/portfolio/Hero.jsx":"29ca038c7a2f","ui_kits/portfolio/ProjectDetail.jsx":"612b5f220717","ui_kits/portfolio/SideIndex.jsx":"e6f23c3b7134","ui_kits/portfolio/Work.jsx":"5925df38c1c7","ui_kits/portfolio/content.jsx":"138ee84e449b"},"inlinedExternals":[],"unexposedExports":[{"name":"buttonVariant","sourcePath":"components/ui/Button.jsx"},{"name":"fieldSurface","sourcePath":"components/forms/Input.jsx"}]} */

(() => {

const __ds_ns = (window.SemjonPaulDesignSystem_d2b8a3 = window.SemjonPaulDesignSystem_d2b8a3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/experience/SceneBackdrop.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useEffect,
  useRef
} = React;
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
const VERT = `attribute vec2 aPos;varying vec2 vUv;void main(){vUv=aPos*0.5+0.5;gl_Position=vec4(aPos,0.0,1.0);}`;
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
}`;
function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}
function SceneBackdrop({
  fixed = true,
  interactive = true,
  style,
  ...rest
}) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false
    });
    if (!gl) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uAspect = gl.getUniformLocation(prog, 'uAspect');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const target = [0.5, 0.5];
    const onMove = e => {
      const r = canvas.getBoundingClientRect();
      target[0] = (e.clientX - r.left) / r.width;
      target[1] = 1 - (e.clientY - r.top) / r.height;
    };
    if (interactive) window.addEventListener('mousemove', onMove);

    // Capped at 1.5: the fog costs real fragment work and the noise hides the
    // difference at higher densities.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uAspect, w / h);
    };
    resize();
    window.addEventListener('resize', resize);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const t0 = performance.now();
    const frame = () => {
      const t = reduce ? 0 : (performance.now() - t0) / 1000;
      gl.uniform2f(uMouse, target[0], target[1]);
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    frame();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      if (interactive) window.removeEventListener('mousemove', onMove);
    };
  }, [interactive]);
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    style: {
      position: fixed ? 'fixed' : 'absolute',
      inset: 0,
      zIndex: 'var(--z-scene)',
      background: 'var(--gradient-scene)',
      pointerEvents: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      width: '100%',
      height: '100%',
      display: 'block'
    }
  }));
}
Object.assign(__ds_scope, { SceneBackdrop });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/experience/SceneBackdrop.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Label + hint + error wrapper for a single form control. Pairs with
 * React Hook Form: pass the field's error message straight through.
 */
function Field({
  label,
  htmlFor,
  hint,
  error,
  required = false,
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-dim)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-accent)',
      marginLeft: '0.3em'
    }
  }, "*")), children, (error || hint) && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-xs)',
      lineHeight: 'var(--leading-snug)',
      color: error ? 'var(--signal-danger)' : 'var(--text-faint)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  forwardRef
} = React;
const fieldSurface = (focus, invalid) => ({
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.75rem 1rem',
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-body)',
  lineHeight: 'var(--leading-snug)',
  color: 'var(--text-strong)',
  background: 'var(--surface-inset)',
  borderRadius: 'var(--radius-field)',
  border: `1px solid ${invalid ? 'var(--signal-danger)' : focus ? 'var(--border-accent)' : 'var(--border-soft)'}`,
  boxShadow: focus && !invalid ? 'var(--glow-accent-soft)' : 'none',
  outline: 'none',
  transition: 'border-color var(--dur-fast) var(--ease-glide), box-shadow var(--dur-fast) var(--ease-glide), background-color var(--dur-fast) var(--ease-glide)'
});

/** Single-line text field. Sunken, not raised — inputs read as cut into the page. */
const Input = forwardRef(function Input({
  invalid = false,
  style,
  onFocus,
  onBlur,
  ...rest
}, ref) {
  const [focus, setFocus] = useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    ref: ref,
    "aria-invalid": invalid || undefined,
    onFocus: e => {
      setFocus(true);
      onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      onBlur?.(e);
    },
    style: {
      ...fieldSurface(focus, invalid),
      ...style
    }
  }, rest));
});
Object.assign(__ds_scope, { fieldSurface, Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  forwardRef
} = React;
/** Multi-line field. Matches Input exactly, with a fixed row count. */
const Textarea = forwardRef(function Textarea({
  invalid = false,
  rows = 5,
  style,
  onFocus,
  onBlur,
  ...rest
}, ref) {
  const [focus, setFocus] = useState(false);
  return /*#__PURE__*/React.createElement("textarea", _extends({
    ref: ref,
    rows: rows,
    "aria-invalid": invalid || undefined,
    onFocus: e => {
      setFocus(true);
      onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      onBlur?.(e);
    },
    style: {
      ...__ds_scope.fieldSurface(focus, invalid),
      resize: 'vertical',
      minHeight: '6rem',
      ...style
    }
  }, rest));
});
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/layout/Container.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const WIDTHS = {
  wide: 'var(--container-max)',
  text: 'var(--container-text)',
  full: '100%'
};

/**
 * Horizontal page frame: max-width plus the fluid gutter.
 * Every DOM section sits inside one of these.
 */
function Container({
  width = 'wide',
  as = 'div',
  style,
  children,
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      width: '100%',
      maxWidth: WIDTHS[width] ?? WIDTHS.wide,
      marginInline: 'auto',
      paddingInline: 'var(--gutter)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Container });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Container.jsx", error: String((e && e.message) || e) }); }

// components/layout/Section.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Vertical rhythm unit. Owns --space-section padding and the optional
 * mono index label + hairline that opens each section of the portfolio.
 */
function Section({
  id,
  label,
  index,
  tight = false,
  bleed = false,
  hairline = true,
  width = 'wide',
  style,
  children,
  ...rest
}) {
  const pad = tight ? 'var(--space-section-tight)' : 'var(--space-section)';
  const header = label || index;
  return /*#__PURE__*/React.createElement("section", _extends({
    id: id,
    style: {
      position: 'relative',
      paddingBlock: pad,
      ...style
    }
  }, rest), hairline && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: '0 0 auto 0',
      height: 1,
      background: 'var(--gradient-hairline)'
    }
  }), bleed ? children : /*#__PURE__*/React.createElement(__ds_scope.Container, {
    width: width
  }, header && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--space-4)',
      marginBottom: 'var(--space-10)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-dim)'
    }
  }, index && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)'
    }
  }, index), label && /*#__PURE__*/React.createElement("span", null, label)), children));
}
Object.assign(__ds_scope, { Section });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Section.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * The portfolio's one card: translucent ink over the 3D scene, hairline edge,
 * 1px top highlight, --radius-card. Hover lifts and warms the border.
 * `href` turns the whole card into a link.
 */
function Card({
  href,
  external = false,
  variant = 'glass',
  index,
  label,
  title,
  meta,
  media,
  interactive,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const isLink = Boolean(href);
  const lift = (interactive ?? isLink) && hover;
  const Tag = isLink ? 'a' : 'div';
  const surface = variant === 'solid' ? {
    background: lift ? 'var(--ink-700)' : 'var(--ink-850)'
  } : variant === 'outline' ? {
    background: 'transparent'
  } : {
    background: lift ? 'var(--surface-card-hover)' : 'var(--surface-card)',
    backdropFilter: 'var(--glass-backdrop)',
    WebkitBackdropFilter: 'var(--glass-backdrop)'
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    target: external ? '_blank' : undefined,
    rel: external ? 'noreferrer noopener' : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      textDecoration: 'none',
      color: 'inherit',
      borderRadius: 'var(--radius-card)',
      border: `1px solid ${lift ? 'var(--border-accent)' : 'var(--border-hairline)'}`,
      boxShadow: lift ? 'var(--shadow-lg), var(--highlight-top)' : 'var(--shadow-md), var(--highlight-top)',
      transform: lift ? 'translateY(-4px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-glide), border-color var(--dur-base) var(--ease-glide), box-shadow var(--dur-base) var(--ease-glide), background-color var(--dur-base) var(--ease-glide)',
      ...surface,
      ...style
    }
  }, rest), media && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: lift ? 'scale(1.03)' : 'scale(1)',
      transition: 'transform var(--dur-slow) var(--ease-glide)'
    }
  }, media)), (index || label || title || meta || children) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      padding: 'var(--space-6)'
    }
  }, (index || label) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'baseline',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: lift ? 'var(--text-accent)' : 'var(--text-dim)',
      transition: 'color var(--dur-base) var(--ease-glide)'
    }
  }, index && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)'
    }
  }, index), label && /*#__PURE__*/React.createElement("span", null, label)), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h3)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-heading)',
      lineHeight: 'var(--leading-snug)',
      color: 'var(--text-strong)'
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-dim)',
      fontSize: 'var(--text-sm)',
      lineHeight: 'var(--leading-body)'
    }
  }, children), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-2)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-mono)',
      color: 'var(--text-faint)'
    }
  }, meta)));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small mono pill for stacks, years and disciplines. Non-interactive. */
function Tag({
  accent = false,
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.3rem 0.7rem',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-mono)',
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
      color: accent ? 'var(--text-accent)' : 'var(--text-dim)',
      background: accent ? 'var(--accent-wash)' : 'transparent',
      border: `1px solid ${accent ? 'var(--border-accent)' : 'var(--border-soft)'}`,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Tag.jsx", error: String((e && e.message) || e) }); }

// components/typography/Heading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  display1: {
    fontSize: 'var(--text-display-1)',
    lineHeight: 'var(--leading-display)',
    letterSpacing: 'var(--tracking-display)',
    fontWeight: 'var(--weight-light)'
  },
  display2: {
    fontSize: 'var(--text-display-2)',
    lineHeight: 'var(--leading-display)',
    letterSpacing: 'var(--tracking-display)',
    fontWeight: 'var(--weight-light)'
  },
  1: {
    fontSize: 'var(--text-h1)',
    lineHeight: 'var(--leading-tight)',
    letterSpacing: 'var(--tracking-heading)',
    fontWeight: 'var(--weight-medium)'
  },
  2: {
    fontSize: 'var(--text-h2)',
    lineHeight: 'var(--leading-tight)',
    letterSpacing: 'var(--tracking-heading)',
    fontWeight: 'var(--weight-medium)'
  },
  3: {
    fontSize: 'var(--text-h3)',
    lineHeight: 'var(--leading-snug)',
    letterSpacing: 'var(--tracking-heading)',
    fontWeight: 'var(--weight-medium)'
  }
};

/** Every heading in the system. `size` is visual, `level` is semantic. */
function Heading({
  level = 2,
  size,
  tone = 'strong',
  style,
  children,
  ...rest
}) {
  const Tag = 'h' + Math.min(Math.max(Number(level) || 2, 1), 6);
  const key = size ?? level;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      margin: 0,
      color: tone === 'accent' ? 'var(--text-accent)' : tone === 'dim' ? 'var(--text-dim)' : 'var(--text-strong)',
      textWrap: 'balance',
      ...(SIZES[key] ?? SIZES[2]),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Heading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typography/Heading.jsx", error: String((e && e.message) || e) }); }

// components/typography/TextReveal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useEffect,
  useRef,
  useState
} = React;
/**
 * The system's single entrance animation: words rise --reveal-distance and fade
 * in on --dur-reveal / --ease-out, staggered by --stagger-base. Masked by an
 * overflow-hidden line box so words slide up from behind the baseline.
 * Honours prefers-reduced-motion by rendering the final state immediately.
 */
function TextReveal({
  text,
  as = 'span',
  delay = 0,
  stagger = 0.07,
  once = true,
  style,
  children,
  ...rest
}) {
  const Tag = as;
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) setShown(false);
      }
    }, {
      threshold: 0.2
    });
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  const source = text ?? (typeof children === 'string' ? children : '');
  const words = source ? source.split(' ') : null;
  if (!words) {
    return /*#__PURE__*/React.createElement(Tag, _extends({
      ref: ref,
      style: {
        display: 'block',
        overflow: 'hidden',
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        transform: shown ? 'translateY(0)' : 'translateY(var(--reveal-distance))',
        opacity: shown ? 1 : 0,
        transition: `transform var(--dur-reveal) var(--ease-out) ${delay}s, opacity var(--dur-reveal) var(--ease-out) ${delay}s`
      }
    }, children));
  }
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    style: {
      display: 'block',
      ...style
    }
  }, rest), words.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-block',
      overflow: 'hidden',
      verticalAlign: 'bottom'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      transform: shown ? 'translateY(0)' : 'translateY(110%)',
      opacity: shown ? 1 : 0,
      transition: `transform var(--dur-reveal) var(--ease-out) ${delay + i * stagger}s, opacity var(--dur-reveal) var(--ease-out) ${delay + i * stagger}s`
    }
  }, w, i < words.length - 1 ? '\u00A0' : ''))));
}
Object.assign(__ds_scope, { TextReveal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typography/TextReveal.jsx", error: String((e && e.message) || e) }); }

// components/ui/AnimatedLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Inline text link. The underline wipes in from the left on hover; the label
 * itself never moves, so it stays usable inside running copy.
 */
function AnimatedLink({
  href,
  external = false,
  tone = 'accent',
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const color = tone === 'body' ? 'var(--text-body)' : tone === 'strong' ? 'var(--text-strong)' : 'var(--text-accent)';
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: external ? '_blank' : undefined,
    rel: external ? 'noreferrer noopener' : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      display: 'inline-block',
      color: hover && tone !== 'accent' ? 'var(--text-strong)' : color,
      textDecoration: 'none',
      transition: 'color var(--dur-fast) var(--ease-glide)',
      ...style
    }
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 0,
      bottom: '-0.12em',
      height: 1,
      width: '100%',
      background: 'currentColor',
      transformOrigin: 'left',
      transform: hover ? 'scaleX(1)' : 'scaleX(0)',
      transition: 'transform var(--dur-base) var(--ease-glide)'
    }
  }));
}
Object.assign(__ds_scope, { AnimatedLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/AnimatedLink.jsx", error: String((e && e.message) || e) }); }

// components/ui/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const SIZES = {
  sm: {
    fontSize: 'var(--text-sm)',
    padding: '0.5rem 1rem',
    gap: 'var(--space-2)'
  },
  md: {
    fontSize: 'var(--text-body)',
    padding: '0.75rem 1.5rem',
    gap: 'var(--space-2)'
  },
  lg: {
    fontSize: 'var(--text-body-lg)',
    padding: '1rem 2.25rem',
    gap: 'var(--space-3)'
  }
};
function buttonVariant(variant, hover, press) {
  if (variant === 'primary') {
    return {
      background: press ? 'var(--accent-press)' : hover ? 'var(--accent-hover)' : 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: '1px solid transparent',
      boxShadow: hover ? 'var(--glow-accent-soft)' : 'none'
    };
  }
  if (variant === 'ghost') {
    return {
      background: hover ? 'var(--accent-wash)' : 'transparent',
      color: hover ? 'var(--text-strong)' : 'var(--text-body)',
      border: '1px solid transparent',
      boxShadow: 'none'
    };
  }
  return {
    background: hover ? 'var(--glass-bg-strong)' : 'var(--glass-bg)',
    color: 'var(--text-strong)',
    border: `1px solid ${hover ? 'var(--border-strong)' : 'var(--border-soft)'}`,
    boxShadow: hover ? 'var(--shadow-md), var(--highlight-top)' : 'var(--highlight-top)',
    backdropFilter: 'var(--glass-backdrop)',
    WebkitBackdropFilter: 'var(--glass-backdrop)'
  };
}

/** Pill control. Hover lifts 2px and brightens; press shrinks 1.5%. */
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  iconRight,
  iconLeft,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const active = !disabled && hover;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-body)',
      lineHeight: 1,
      borderRadius: 'var(--radius-control)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.38 : 1,
      transform: !disabled && press ? 'scale(var(--press-scale))' : active ? 'translateY(var(--hover-lift))' : 'none',
      transition: 'transform var(--dur-fast) var(--ease-glide), background-color var(--dur-fast) var(--ease-glide), color var(--dur-fast) var(--ease-glide), border-color var(--dur-fast) var(--ease-glide), box-shadow var(--dur-fast) var(--ease-glide)',
      ...SIZES[size],
      ...buttonVariant(variant, active, !disabled && press),
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { buttonVariant, Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/Button.jsx", error: String((e && e.message) || e) }); }

// components/ui/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Lucide icon rendered as a CSS mask over currentColor, so icons inherit text
 * colour and need no bundler. `name` is any Lucide icon slug, kebab-case.
 *
 * NOTE: no icon set exists in the source repository — Lucide (1.5px stroke,
 * rounded caps) is a substitution chosen to match the system's hairline weight.
 */
const CDN = 'https://unpkg.com/lucide-static@latest/icons/';
function Icon({
  name,
  size = 20,
  style,
  ...rest
}) {
  const url = `url("${CDN}${name}.svg")`;
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    "data-icon": name,
    style: {
      display: 'inline-block',
      flexShrink: 0,
      width: size,
      height: size,
      background: 'currentColor',
      maskImage: url,
      WebkitMaskImage: url,
      maskSize: 'contain',
      WebkitMaskSize: 'contain',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskPosition: 'center',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/Icon.jsx", error: String((e && e.message) || e) }); }

// components/ui/LinkButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const SIZES = {
  sm: {
    fontSize: 'var(--text-sm)',
    padding: '0.5rem 1rem',
    gap: 'var(--space-2)'
  },
  md: {
    fontSize: 'var(--text-body)',
    padding: '0.75rem 1.5rem',
    gap: 'var(--space-2)'
  },
  lg: {
    fontSize: 'var(--text-body-lg)',
    padding: '1rem 2.25rem',
    gap: 'var(--space-3)'
  }
};

/** Anchor styled exactly like Button. Use for navigation, not actions. */
function LinkButton({
  href,
  variant = 'secondary',
  size = 'md',
  external = false,
  iconRight,
  iconLeft,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: external ? '_blank' : undefined,
    rel: external ? 'noreferrer noopener' : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 1,
      borderRadius: 'var(--radius-control)',
      transform: press ? 'scale(var(--press-scale))' : hover ? 'translateY(var(--hover-lift))' : 'none',
      transition: 'transform var(--dur-fast) var(--ease-glide), background-color var(--dur-fast) var(--ease-glide), color var(--dur-fast) var(--ease-glide), border-color var(--dur-fast) var(--ease-glide), box-shadow var(--dur-fast) var(--ease-glide)',
      ...SIZES[size],
      ...__ds_scope.buttonVariant(variant, hover, press),
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { LinkButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/LinkButton.jsx", error: String((e && e.message) || e) }); }

// components/ui/MagneticButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useRef,
  useState,
  useEffect
} = React;
/**
 * Wrapper that pulls its child toward the cursor by --magnet-strength of the
 * pointer offset while hovering, then glides back on leave. Used on hero CTAs
 * where the DOM needs to feel as physical as the 3D scene behind it.
 */
function MagneticButton({
  strength = 0.18,
  radius = 120,
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({
    x: 0,
    y: 0
  });
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  const onMove = e => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    const falloff = Math.max(0, 1 - dist / (radius + r.width / 2));
    setOffset({
      x: dx * strength * falloff,
      y: dy * strength * falloff
    });
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: ref,
    onMouseMove: onMove,
    onMouseLeave: () => setOffset({
      x: 0,
      y: 0
    }),
    style: {
      display: 'inline-block',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      transition: offset.x === 0 && offset.y === 0 ? 'transform var(--dur-slow) var(--ease-glide)' : 'transform var(--dur-instant) var(--ease-linear)',
      willChange: 'transform'
    }
  }, children));
}
Object.assign(__ds_scope, { MagneticButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/MagneticButton.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/About.jsx
try { (() => {
const {
  Section,
  Heading,
  TextReveal,
  Tag,
  AnimatedLink
} = window.SemjonPaulDesignSystem_d2b8a3;

/** Prose on the text measure, plus a mono capability list. */
function About() {
  return /*#__PURE__*/React.createElement(Section, {
    id: "about",
    index: "02",
    label: "About"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
      gap: 'var(--space-16)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "display2",
    style: {
      maxWidth: '16ch'
    }
  }, /*#__PURE__*/React.createElement(TextReveal, {
    text: "A shader is a material"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      maxWidth: 'var(--measure-body)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg)',
      color: 'var(--text-body)'
    }
  }, "I have spent six years moving between motion design and front-end engineering, and the work I care about sits exactly on that line: interfaces that behave like objects rather than documents."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body)',
      color: 'var(--text-dim)',
      marginTop: 'var(--space-5)'
    }
  }, "Most of what I make runs in a browser at sixty frames a second. That constraint decides almost everything \u2014 which is the part I enjoy. Currently taking on selected client work alongside my own pieces."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--gradient-hairline)',
      marginBlock: 'var(--space-10)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-5)'
    }
  }, [['Engineering', ['Next.js', 'TypeScript', 'React', 'Three.js', 'R3F', 'GLSL']], ['Motion', ['GSAP', 'ScrollTrigger', 'Motion']], ['Pipeline', ['Blender', 'gltf-transform', 'KTX2', 'Draco']]].map(([group, items]) => /*#__PURE__*/React.createElement("div", {
    key: group,
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      flexWrap: 'wrap',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 110,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, group), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      flexWrap: 'wrap'
    }
  }, items.map(i => /*#__PURE__*/React.createElement(Tag, {
    key: i
  }, i)))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body)',
      color: 'var(--text-dim)',
      marginTop: 'var(--space-10)'
    }
  }, "Occasional notes at ", /*#__PURE__*/React.createElement(AnimatedLink, {
    href: "#",
    onClick: e => e.preventDefault()
  }, "/notes"), "."))));
}
Object.assign(window, {
  About
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/App.jsx
try { (() => {
const {
  SceneBackdrop
} = window.SemjonPaulDesignSystem_d2b8a3;

/**
 * Click-through shell. Home is one scrolling page (Hero → Work → About →
 * Contact); selecting a project swaps to the case-study view. In the real
 * Next.js app these are App Router routes, not local state.
 */
function App() {
  const [view, setView] = React.useState({
    name: 'home',
    slug: null
  });
  const [active, setActive] = React.useState('');
  const scrollerRef = React.useRef(null);
  const scrollToId = id => {
    const scroller = scrollerRef.current;
    const el = document.getElementById(id);
    if (!scroller || !el) return;
    const top = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 24;
    scroller.scrollTo({
      top,
      behavior: 'smooth'
    });
  };
  const navigate = id => {
    if (id === 'home') {
      setView({
        name: 'home',
        slug: null
      });
      scrollerRef.current?.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    if (view.name !== 'home') {
      setView({
        name: 'home',
        slug: null
      });
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)));
      return;
    }
    scrollToId(id);
  };
  const open = slug => {
    setView({
      name: 'project',
      slug
    });
    scrollerRef.current?.scrollTo({
      top: 0
    });
  };
  React.useEffect(() => {
    if (view.name !== 'home') {
      setActive('');
      return;
    }
    const ids = window.NAV.map(n => n.id);
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
    }, {
      root: scrollerRef.current,
      threshold: 0.35
    });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [view.name]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SceneBackdrop, null), /*#__PURE__*/React.createElement(window.SideIndex, {
    onNavigate: navigate,
    active: active
  }), /*#__PURE__*/React.createElement("div", {
    ref: scrollerRef,
    style: {
      position: 'relative',
      zIndex: 'var(--z-content)',
      height: '100%',
      overflowY: 'auto'
    }
  }, view.name === 'home' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(window.Hero, {
    onNavigate: navigate
  }), /*#__PURE__*/React.createElement(window.Work, {
    onOpen: open
  }), /*#__PURE__*/React.createElement(window.About, null), /*#__PURE__*/React.createElement(window.Contact, null), /*#__PURE__*/React.createElement(window.Footer, null)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(window.ProjectDetail, {
    slug: view.slug,
    onBack: () => setView({
      name: 'home',
      slug: null
    }),
    onOpen: open
  }), /*#__PURE__*/React.createElement(window.Footer, null))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Contact.jsx
try { (() => {
const {
  Section,
  Heading,
  TextReveal,
  Field,
  Input,
  Textarea,
  Button,
  Icon,
  AnimatedLink
} = window.SemjonPaulDesignSystem_d2b8a3;

/**
 * Contact form. Validation here is a stand-in for the real React Hook Form +
 * Zod schema (see AGENTS.md §14) — same states, same messages.
 */
function Contact() {
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = React.useState({});
  const [state, setState] = React.useState('idle');
  const set = k => e => setValues(v => ({
    ...v,
    [k]: e.target.value
  }));
  const submit = e => {
    e.preventDefault();
    const next = {};
    if (values.name.trim().length < 2) next.name = 'At least two characters.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (values.message.trim().length < 10) next.message = 'At least ten characters — a few lines is plenty.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setState('sending');
    setTimeout(() => setState('sent'), 900);
  };
  return /*#__PURE__*/React.createElement(Section, {
    id: "contact",
    index: "03",
    label: "Contact"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
      gap: 'var(--space-16)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "display2",
    style: {
      maxWidth: '14ch'
    }
  }, /*#__PURE__*/React.createElement(TextReveal, {
    text: "Tell me what you are building"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 'var(--space-8)',
      fontSize: 'var(--text-body-lg)',
      color: 'var(--text-body)',
      maxWidth: 'var(--measure-narrow)'
    }
  }, "Selected client work, collaborations and commissions. I answer everything within a couple of days."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-8)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      color: 'var(--text-dim)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 16
  }), /*#__PURE__*/React.createElement(AnimatedLink, {
    href: "#",
    tone: "strong",
    onClick: e => e.preventDefault()
  }, "hello@semjonpaul.example")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      color: 'var(--text-dim)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "github",
    size: 16
  }), /*#__PURE__*/React.createElement(AnimatedLink, {
    href: "#",
    tone: "body",
    onClick: e => e.preventDefault()
  }, "github.com/semjonpaul")))), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      padding: 'var(--space-8)',
      borderRadius: 'var(--radius-card)',
      background: 'var(--surface-card)',
      backdropFilter: 'var(--glass-backdrop)',
      WebkitBackdropFilter: 'var(--glass-backdrop)',
      border: '1px solid var(--border-hairline)',
      boxShadow: 'var(--shadow-lg), var(--highlight-top)'
    }
  }, state === 'sent' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      paddingBlock: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 28,
    style: {
      color: 'var(--signal-positive)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-h3)',
      color: 'var(--text-strong)'
    }
  }, "Message sent"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-dim)',
      fontSize: 'var(--text-sm)'
    }
  }, "Thanks \u2014 you will hear back within two days."), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => {
      setState('idle');
      setValues({
        name: '',
        email: '',
        message: ''
      });
    }
  }, "Send another")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    noValidate: true,
    style: {
      display: 'grid',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Name",
    htmlFor: "c-name",
    error: errors.name,
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    id: "c-name",
    value: values.name,
    onChange: set('name'),
    invalid: !!errors.name,
    placeholder: "Your name",
    autoComplete: "name"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    htmlFor: "c-email",
    error: errors.email,
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    id: "c-email",
    type: "email",
    value: values.email,
    onChange: set('email'),
    invalid: !!errors.email,
    placeholder: "you@studio.com",
    autoComplete: "email"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Message",
    htmlFor: "c-message",
    error: errors.message,
    hint: "What are you building, and when do you need it?",
    required: true
  }, /*#__PURE__*/React.createElement(Textarea, {
    id: "c-message",
    rows: 5,
    value: values.message,
    onChange: set('message'),
    invalid: !!errors.message
  })), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "primary",
    fullWidth: true,
    disabled: state === 'sending',
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 17
    })
  }, state === 'sending' ? 'Sending…' : 'Send message')))));
}
Object.assign(window, {
  Contact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Footer.jsx
try { (() => {
const {
  Container,
  AnimatedLink,
  Icon
} = window.SemjonPaulDesignSystem_d2b8a3;
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      paddingBottom: 'var(--space-12)',
      paddingTop: 'var(--space-16)'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--gradient-hairline)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 'var(--space-8)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-6)',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-mono)',
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Semjon Paul \u2014 Interactive & 3D"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(AnimatedLink, {
    href: "#",
    tone: "body",
    onClick: e => e.preventDefault()
  }, "GitHub"), /*#__PURE__*/React.createElement(AnimatedLink, {
    href: "#",
    tone: "body",
    onClick: e => e.preventDefault()
  }, "Imprint")), /*#__PURE__*/React.createElement("span", null, "\xA9 2026"))));
}
Object.assign(window, {
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Hero.jsx
try { (() => {
const {
  Heading,
  TextReveal,
  Button,
  MagneticButton,
  Icon
} = window.SemjonPaulDesignSystem_d2b8a3;

/** Full-viewport opening. Display type over the shader, nothing else. */
function Hero({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      maxWidth: 'var(--container-max)',
      marginInline: 'auto',
      paddingInline: 'var(--gutter)',
      paddingBottom: 'var(--space-24)',
      paddingTop: 'var(--space-32)',
      paddingRight: 'calc(var(--gutter) + 9rem)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-dim)',
      marginBottom: 'var(--space-8)'
    }
  }, "Interactive & 3D \u2014 Berlin"), /*#__PURE__*/React.createElement(Heading, {
    level: 1,
    size: "display1",
    style: {
      maxWidth: '18ch'
    }
  }, /*#__PURE__*/React.createElement(TextReveal, {
    text: "Form before information"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 'var(--space-10)',
      maxWidth: 'var(--measure-narrow)',
      fontSize: 'var(--text-body-lg)',
      color: 'var(--text-body)'
    }
  }, "I build websites where the first thing you notice is the material, and the second is what it is for. Four pieces below, and one shader running behind all of them."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement(MagneticButton, null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right"
    }),
    onClick: () => onNavigate('work')
  }, "See the work")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    onClick: () => onNavigate('about')
  }, "About")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-20)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-down",
    size: 14
  }), " Scroll"));
}
Object.assign(window, {
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/ProjectDetail.jsx
try { (() => {
const {
  Container,
  Heading,
  Tag,
  Button,
  Icon,
  TextReveal,
  AnimatedLink
} = window.SemjonPaulDesignSystem_d2b8a3;

/** Case-study view: full-bleed media, then prose on the text measure. */
function ProjectDetail({
  slug,
  onBack,
  onOpen
}) {
  const p = window.PROJECTS.find(x => x.slug === slug) || window.PROJECTS[0];
  const next = window.PROJECTS[(window.PROJECTS.indexOf(p) + 1) % window.PROJECTS.length];
  return /*#__PURE__*/React.createElement("article", {
    style: {
      paddingTop: 'var(--space-24)',
      paddingBottom: 'var(--space-section)'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 15,
      style: {
        transform: 'rotate(180deg)'
      }
    }),
    onClick: onBack
  }, "All work"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-8)',
      display: 'flex',
      gap: 'var(--space-4)',
      alignItems: 'baseline',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-dim)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)'
    }
  }, p.index), /*#__PURE__*/React.createElement("span", null, p.label)), /*#__PURE__*/React.createElement(Heading, {
    level: 1,
    size: "display2",
    style: {
      marginTop: 'var(--space-5)',
      maxWidth: '22ch'
    }
  }, /*#__PURE__*/React.createElement(TextReveal, {
    text: p.title
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      marginTop: 'var(--space-8)',
      flexWrap: 'wrap'
    }
  }, p.stack.map(s => /*#__PURE__*/React.createElement(Tag, {
    key: s
  }, s)), /*#__PURE__*/React.createElement(Tag, {
    accent: true
  }, p.year))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-16)',
      paddingInline: 'var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      marginInline: 'auto',
      height: 'min(58vh, 520px)',
      borderRadius: 'var(--radius-media)',
      border: '1px solid var(--border-hairline)',
      boxShadow: 'var(--shadow-xl), var(--highlight-top)',
      background: 'radial-gradient(120% 110% at 32% 22%, ' + p.a + ', ' + p.b + ' 66%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      marginInline: 'auto',
      marginTop: 'var(--space-3)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-faint)'
    }
  }, "Placeholder \u2014 real capture goes here")), /*#__PURE__*/React.createElement(Container, {
    width: "text",
    style: {
      marginTop: 'var(--space-16)'
    }
  }, p.body.map((t, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontSize: 'var(--text-body-lg)',
      color: 'var(--text-body)',
      marginBottom: 'var(--space-6)'
    }
  }, t)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body)',
      color: 'var(--text-dim)'
    }
  }, "Source and build notes on ", /*#__PURE__*/React.createElement(AnimatedLink, {
    href: "#",
    onClick: e => e.preventDefault()
  }, "GitHub"), ".")), /*#__PURE__*/React.createElement(Container, {
    style: {
      marginTop: 'var(--space-24)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--gradient-hairline)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpen(next.slug),
    style: {
      width: '100%',
      background: 'none',
      border: 0,
      cursor: 'pointer',
      textAlign: 'left',
      paddingTop: 'var(--space-8)',
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, "Next"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 'var(--space-3)',
      fontSize: 'var(--text-h2)',
      fontWeight: 'var(--weight-light)',
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--text-strong)'
    }
  }, next.title)), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 28,
    style: {
      color: 'var(--text-accent)'
    }
  }))));
}
Object.assign(window, {
  ProjectDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/ProjectDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/SideIndex.jsx
try { (() => {
const {
  Icon
} = window.SemjonPaulDesignSystem_d2b8a3;

/**
 * The navigation, such as it is. There is no app bar: the wordmark sits
 * directly on the scene at the top left, and the section index runs down the
 * right edge as mono numerals with a short rule. Both are fixed, both are
 * transparent, neither draws a surface.
 */
function SideIndex({
  onNavigate,
  active
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('home'),
    style: {
      position: 'fixed',
      top: 'var(--space-8)',
      left: 'var(--gutter)',
      zIndex: 'var(--z-nav)',
      background: 'none',
      border: 0,
      padding: 0,
      cursor: 'pointer',
      fontSize: '1.0625rem',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      mixBlendMode: 'normal'
    }
  }, "Semjon\xA0Paul"), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Sections",
    style: {
      position: 'fixed',
      top: '50%',
      right: 'var(--gutter)',
      transform: 'translateY(-50%)',
      zIndex: 'var(--z-nav)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 'var(--space-5)'
    }
  }, window.NAV.map(n => {
    const on = active === n.id;
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      onClick: () => onNavigate(n.id),
      "aria-current": on ? 'true' : undefined,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        background: 'none',
        border: 0,
        padding: 0,
        cursor: 'pointer',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-label)',
        letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase',
        color: on ? 'var(--accent)' : 'var(--text-faint)',
        transition: 'color var(--dur-base) var(--ease-glide)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-block',
        width: on ? 28 : 12,
        height: 1,
        background: 'currentColor',
        transition: 'width var(--dur-base) var(--ease-glide)'
      }
    }), n.label);
  })), /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    onClick: e => {
      e.preventDefault();
      onNavigate('contact');
    },
    style: {
      position: 'fixed',
      bottom: 'var(--space-8)',
      left: 'var(--gutter)',
      zIndex: 'var(--z-nav)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      textDecoration: 'none',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-dim)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--verdigris-300)',
      flexShrink: 0
    }
  }), "Available for work"));
}
Object.assign(window, {
  SideIndex
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/SideIndex.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Work.jsx
try { (() => {
const {
  Section,
  Card,
  Tag,
  TextReveal
} = window.SemjonPaulDesignSystem_d2b8a3;

/** The work index: one glass card per piece, first card double-width. */
function Work({
  onOpen
}) {
  return /*#__PURE__*/React.createElement(Section, {
    id: "work",
    index: "01",
    label: "Selected work"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
      gap: 'var(--space-6)'
    }
  }, window.PROJECTS.map((p, i) => /*#__PURE__*/React.createElement(Card, {
    key: p.slug,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onOpen(p.slug);
    },
    index: p.index,
    label: p.label,
    title: p.title,
    meta: p.meta,
    style: i === 0 ? {
      gridColumn: 'span 2',
      minWidth: 0
    } : {
      minWidth: 0
    },
    media: /*#__PURE__*/React.createElement("div", {
      style: {
        height: i === 0 ? 300 : 180,
        background: 'radial-gradient(130% 110% at 28% 18%, ' + p.a + ', ' + p.b + ' 68%)'
      }
    })
  }, p.blurb, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      marginTop: 'var(--space-4)',
      flexWrap: 'wrap'
    }
  }, p.stack.map(s => /*#__PURE__*/React.createElement(Tag, {
    key: s
  }, s)), /*#__PURE__*/React.createElement(Tag, {
    accent: true
  }, p.year))))));
}
Object.assign(window, {
  Work
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Work.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/content.jsx
try { (() => {
/* Placeholder content. No copy, imagery or project data exists in the source
   repository — everything here is stand-in material shaped to the brand's tone
   so the layouts can be judged. Replace wholesale. */

const PROJECTS = [{
  slug: 'caustics',
  index: '01',
  label: 'Case study',
  title: 'Caustics on a still surface',
  blurb: 'Light through a surface that does not exist.',
  meta: 'Real-time GLSL · 2026',
  year: '2026',
  stack: ['Three.js', 'GLSL', 'R3F'],
  a: 'var(--flare-400)',
  b: 'var(--ink-900)',
  body: ['The brief was a single frame from a photograph: sunlight landing on the floor of a shallow pool. Recreating it in real time meant giving up on physical accuracy and finding the two or three cues the eye actually reads — the bright filaments where wavefronts converge, and the slow drift between them.', 'The final version runs a pair of animated value-noise fields through a refraction approximation in the fragment shader. No ray marching, no light probes, one draw call. On a 2019 laptop it holds sixty frames a second at full resolution.']
}, {
  slug: 'dust',
  index: '02',
  label: 'Experiment',
  title: 'Instanced dust',
  blurb: 'Forty thousand particles on one draw call.',
  meta: 'Three.js · 2025',
  year: '2025',
  stack: ['Three.js', 'Instancing'],
  a: 'var(--sand-300)',
  b: 'var(--ink-900)',
  body: ['A study in how little motion is needed before a volume of particles reads as air rather than as geometry. Position is computed entirely on the GPU from an index and a time uniform; the CPU never touches a particle.', 'The interesting constraint turned out to be colour. At forty thousand instances, anything more saturated than a two-percent warm tint collapses into a haze.']
}, {
  slug: 'easing',
  index: '03',
  label: 'Writing',
  title: 'On easing',
  blurb: 'Why one easing family beats five.',
  meta: 'Notes · 2025',
  year: '2025',
  stack: ['Essay'],
  a: 'var(--paper-400)',
  b: 'var(--ink-900)',
  body: ['Most sites that feel expensive are not using better animation than the ones that do not. They are using less of it, and the same curve every time.', 'This note works through the argument with a handful of side-by-side comparisons, and ends with the two-value easing set this portfolio runs on.']
}, {
  slug: 'volume',
  index: '04',
  label: 'Case study',
  title: 'A room with no walls',
  blurb: 'Volumetric fog as the only architecture.',
  meta: 'WebGL · 2024',
  year: '2024',
  stack: ['WebGL', 'Raymarching'],
  a: 'var(--verdigris-300)',
  b: 'var(--ink-800)',
  body: ['An installation piece where the entire sense of enclosure comes from scattering. There is no floor, no ceiling and no wall mesh in the scene — only a density function and a light.', 'Raymarching at a quarter resolution with a temporal blur turned out to be indistinguishable from the full-resolution version, and four times faster.']
}];
const NAV = [{
  id: 'work',
  label: 'Work'
}, {
  id: 'about',
  label: 'About'
}, {
  id: 'contact',
  label: 'Contact'
}];
Object.assign(window, {
  PROJECTS,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/content.jsx", error: String((e && e.message) || e) }); }

__ds_ns.SceneBackdrop = __ds_scope.SceneBackdrop;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Container = __ds_scope.Container;

__ds_ns.Section = __ds_scope.Section;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Heading = __ds_scope.Heading;

__ds_ns.TextReveal = __ds_scope.TextReveal;

__ds_ns.AnimatedLink = __ds_scope.AnimatedLink;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.LinkButton = __ds_scope.LinkButton;

__ds_ns.MagneticButton = __ds_scope.MagneticButton;

})();
