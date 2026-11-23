import{B as s}from"./brand-DICvTjSV.js";
const r=["/images/template-previews/","/images/template-showcase/"],i="/music/";
function a(t){return`${s.MusicCdn}/${encodeURIComponent(t)}`}
function o(t){
  if(typeof t!=="string"||!t)return"";
  if(t.startsWith(s.Site))t=t.slice(s.Site.length);
  if(/^https?:\/\//.test(t))return t;
  return`${s.Cdn}${t.startsWith("/")?"":"/"}${t}`;
}
function u(t){
  if(typeof t!=="string"||!t)return"";
  const e=t.startsWith(s.Site)?t.slice(s.Site.length):t;
  return e.startsWith(i)&&!e.slice(i.length).includes("/")?a(e.slice(i.length)):r.some(n=>e.startsWith(n))?o(e):e.startsWith("/images/")?`${s.Site}${e}`:t;
}
function c(t){if(typeof t!=="string"||!t)return"";return/^https?:\/\//.test(t)?t:`${s.Site}${t}`}
export{c as a,o as s,u as t};
