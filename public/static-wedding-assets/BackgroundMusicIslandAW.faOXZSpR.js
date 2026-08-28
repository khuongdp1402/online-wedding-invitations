import{j as e}from"./jsx-runtime.TBa3i5EZ.js";import{r as s}from"./index.CVf8TyFT.js";import{m as i}from"./proxy.DQ9PfEgi.js";import{A as m}from"./index.D4EAUbWP.js";import{c as o}from"./createLucideIcon.vNlubC7l.js";/**
 * @license lucide-react v1.33.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["circle",{cx:"8",cy:"18",r:"4",key:"1fc0mg"}],["path",{d:"M12 18V2l7 4",key:"g04rme"}]],f=o("music-2",u);/**
 * @license lucide-react v1.33.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]],x=o("music",p);function v({url:l}){const c=s.useRef(null),[r,a]=s.useState(!1),[n,d]=s.useState(!1);return s.useEffect(()=>{const t=c.current;t&&(r?t.play().catch(()=>{a(!1)}):t.pause())},[r]),s.useEffect(()=>{const t=()=>{n||(d(!0),a(!0))};return window.addEventListener("click",t),()=>window.removeEventListener("click",t)},[n]),e.jsxs(e.Fragment,{children:[e.jsx("audio",{ref:c,src:l,loop:!0}),e.jsx("div",{className:"fixed bottom-6 left-6 z-[60]",children:e.jsxs(i.button,{whileHover:{scale:1.1},whileTap:{scale:.9},onClick:t=>{t.stopPropagation(),a(!r)},className:`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${r?"bg-[var(--primary)] text-white":"bg-white text-[var(--primary)] border border-[color-mix(in_srgb,var(--primary)_10%,transparent)]"}`,children:[e.jsx(m,{mode:"wait",children:r?e.jsx(i.div,{initial:{rotate:0},animate:{rotate:360},transition:{duration:4,repeat:1/0,ease:"linear"},children:e.jsx(f,{className:"w-5 h-5"})},"playing"):e.jsx(i.div,{children:e.jsx(x,{className:"w-5 h-5 opacity-40"})},"paused")}),r&&e.jsx("span",{className:"absolute inset-0 rounded-full bg-[var(--primary)] animate-ping opacity-20"})]})})]})}export{v as default};
