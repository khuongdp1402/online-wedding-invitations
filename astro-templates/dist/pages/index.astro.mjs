/* empty css                                 */
import { c as createComponent, m as maybeRenderHead, a as addAttribute, r as renderSlot, b as renderTemplate, d as createAstro, e as renderComponent, f as renderHead, u as unescapeHTML } from '../chunks/astro/server_CqGOCtUl.mjs';
import 'kleur/colors';
import { readFileSync } from 'node:fs';
import 'clsx';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Pause, Play, Quote, ChevronLeft, ChevronRight, Loader2, Music2, Music, Flower, Gift, ChevronUp, ChevronDown, CreditCard, Copy, Home, Phone } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$Astro$m = createAstro();
const $$Reveal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$Reveal;
  const { class: className = "", delay = 0, y = 14, x = 0 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`cb-reveal ${className}`, "class")}${addAttribute(`--cb-reveal-delay:${delay}s; --cb-reveal-y:${y}px; --cb-reveal-x:${x}px;`, "style")}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/Reveal.astro", void 0);

const $$Astro$l = createAstro();
const $$InvitationHeaderStatic = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$InvitationHeaderStatic;
  const { wedding, mode } = Astro2.props;
  const isBrideMode = mode === "bride";
  const firstName = isBrideMode ? wedding.brideName : wedding.groomName;
  const secondName = isBrideMode ? wedding.groomName : wedding.brideName;
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const heroImage = wedding.gallery[0] ?? "";
  return renderTemplate`${maybeRenderHead()}<section id="top" class="relative min-h-screen min-h-[100dvh] overflow-hidden p-0"> <!-- MOBILE --> <div class="lg:hidden relative w-full h-full min-h-screen min-h-[100dvh]"> <div class="absolute inset-0"> <img${addAttribute(heroImage, "src")} alt="Ảnh nền thiệp cưới" class="w-full h-full object-cover object-[60%_50%]" loading="eager"> <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" aria-hidden="true"></div> </div> <div class="absolute inset-0 z-10 flex flex-col justify-end pt-[max(env(safe-area-inset-top),0.75rem)] pb-[max(env(safe-area-inset-bottom),2rem)] pl-[max(env(safe-area-inset-left),1rem)] pr-[max(env(safe-area-inset-right),1rem)]"> <div class="max-w-xl mx-auto w-full"> ${renderComponent($$result, "Reveal", $$Reveal, { "y": 20 }, { "default": ($$result2) => renderTemplate` <div class="mb-2 sm:mb-3 text-center"> <svg class="w-6 h-6 sm:w-8 sm:h-8 cb-text-accent mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"></path></svg> </div> ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "delay": 0.1 }, { "default": ($$result2) => renderTemplate` <h2 class="cb-text-accent text-[10px] sm:text-xs tracking-[0.35em] uppercase font-bold mb-2 sm:mb-4 text-center"> ${isBrideMode ? "T\xE2n N\u01B0\u01A1ng & T\xE2n Lang" : "T\xE2n Lang & T\xE2n N\u01B0\u01A1ng"} </h2> ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "delay": 0.2, "class": "mb-4 sm:mb-6" }, { "default": ($$result2) => renderTemplate` <div class="flex items-center justify-between gap-4 w-full"> <h1 class="text-2xl sm:text-4xl lg:text-5xl font-script cb-text-accent font-bold leading-tight drop-shadow-sm shrink-0">${firstName}</h1> <h1 class="text-2xl sm:text-4xl lg:text-5xl font-script cb-text-accent font-bold leading-tight drop-shadow-sm shrink-0">${secondName}</h1> </div> ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "delay": 0.5 }, { "default": ($$result2) => renderTemplate` <div class="flex flex-col items-center gap-2 sm:gap-4 w-full"> <p class="cb-text-accent text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold">Save the date</p> <div class="h-px w-16 sm:w-24 mx-auto" style="background-color: var(--cb-accent)"></div> <div class="px-4 sm:px-6 py-2.5 sm:py-4 w-full max-w-sm text-center"> <p class="cb-text-accent text-base sm:text-xl lg:text-2xl font-heading font-bold tracking-wide">${ceremony.date}</p> ${ceremony.lunarDate && renderTemplate`<p class="cb-text-accent text-xs sm:text-sm font-heading mt-1">${ceremony.lunarDate}</p>`} </div> </div> ` })} </div> </div> </div> <!-- DESKTOP --> <div class="hidden lg:flex min-h-screen items-center justify-center px-8 py-14 cb-bg-primary"> <div class="w-full max-w-5xl overflow-hidden rounded-[40px] border cb-border-accent/25 shadow-2xl relative" style="border-color: color-mix(in srgb, var(--cb-accent) 25%, transparent)"> <div class="flex min-h-[68vh] relative"> <div class="w-[52%] min-w-0 relative shrink-0"> <img${addAttribute(heroImage, "src")} alt="Ảnh nền thiệp cưới" class="w-full h-full object-cover object-center" loading="eager"> </div> <div class="relative flex-1 min-w-[380px] flex flex-col justify-center px-10 xl:px-16 py-12 cb-bg-primary-dark cb-text-accent overflow-visible"> ${renderComponent($$result, "Reveal", $$Reveal, { "y": 20 }, { "default": ($$result2) => renderTemplate` <div class="mb-4 text-center"> <svg class="w-10 h-10 cb-text-accent mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"></path></svg> </div> ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "delay": 0.1 }, { "default": ($$result2) => renderTemplate` <h2 class="text-xs tracking-[0.4em] uppercase font-bold mb-6 text-center" style="color: color-mix(in srgb, var(--cb-accent) 90%, transparent)"> ${isBrideMode ? "T\xE2n N\u01B0\u01A1ng & T\xE2n Lang" : "T\xE2n Lang & T\xE2n N\u01B0\u01A1ng"} </h2> ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "delay": 0.2, "class": "mb-8" }, { "default": ($$result2) => renderTemplate` <div class="flex items-center justify-between gap-6 w-full min-w-0"> <h1 class="text-3xl xl:text-4xl font-script cb-text-accent font-bold leading-tight shrink-0 text-left">${firstName}</h1> <h1 class="text-3xl xl:text-4xl font-script cb-text-accent font-bold leading-tight shrink-0 text-right">${secondName}</h1> </div> ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "delay": 0.4 }, { "default": ($$result2) => renderTemplate` <div class="flex flex-col items-center gap-3 w-full"> <p class="text-xs tracking-[0.3em] uppercase font-semibold" style="color: color-mix(in srgb, var(--cb-accent) 90%, transparent)">Save the date</p> <div class="h-px w-20 mx-auto" style="background-color: color-mix(in srgb, var(--cb-accent) 60%, transparent)"></div> <div class="py-4 w-full max-w-sm text-center"> <p class="cb-text-accent text-xl xl:text-2xl font-heading font-bold tracking-wide">${ceremony.date}</p> ${ceremony.lunarDate && renderTemplate`<p class="cb-text-accent text-sm font-heading mt-1 opacity-80">${ceremony.lunarDate}</p>`} </div> </div> ` })} </div> </div> </div> </div> </section>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/InvitationHeaderStatic.astro", void 0);

const $$Astro$k = createAstro();
const $$WeddingInfoStatic = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$WeddingInfoStatic;
  const { wedding, mode } = Astro2.props;
  const isBrideMode = mode === "bride";
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const firstName = isBrideMode ? wedding.brideName : wedding.groomName;
  const secondName = isBrideMode ? wedding.groomName : wedding.brideName;
  const firstParents = isBrideMode ? wedding.brideParents : wedding.groomParents;
  const secondParents = isBrideMode ? wedding.groomParents : wedding.brideParents;
  const photo1 = wedding.gallery[2] || "";
  const photo2 = wedding.gallery[3] || "";
  return renderTemplate`${maybeRenderHead()}<section id="thong-tin" class="relative overflow-hidden bg-white"> <div class="mx-auto max-w-6xl px-4 relative z-10"> ${renderComponent($$result, "Reveal", $$Reveal, { "y": 16 }, { "default": ($$result2) => renderTemplate` <div class="text-center py-8 sm:py-10"> <p class="text-lg sm:text-xl font-heading cb-text-primary italic font-medium opacity-90">&ldquo;Trăm năm tình viên mãn&rdquo;</p> <p class="text-lg sm:text-xl font-heading cb-text-primary italic font-medium opacity-90 mt-2">&ldquo;Bạc đầu nghĩa phu thê&rdquo;</p> </div> ` })} <div class="grid grid-cols-[1fr_auto_1fr] gap-2 md:gap-12 mb-12 sm:mb-20 px-0 items-center"> ${renderComponent($$result, "Reveal", $$Reveal, { "x": -20 }, { "default": ($$result2) => renderTemplate` <div class="space-y-4 text-center border-t pt-6" style="border-color: color-mix(in srgb, var(--cb-accent) 20%, transparent)"> <div class="flex flex-col items-center gap-2 mb-2"> <p class="text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.2em] cb-text-primary font-bold whitespace-nowrap">${isBrideMode ? "Nh\xE0 g\xE1i" : "Nh\xE0 trai"}</p> <div class="w-1 h-1 rounded-full" style="background-color: color-mix(in srgb, var(--cb-accent) 40%, transparent)"></div> </div> <div class="space-y-0.5"> <p class="text-base sm:text-xl cb-text-body font-heading font-medium leading-relaxed whitespace-nowrap" style="color: var(--cb-text)">${firstParents.father}</p> <p class="text-base sm:text-xl cb-text-body font-heading font-medium leading-relaxed whitespace-nowrap" style="color: var(--cb-text)">${firstParents.mother}</p> </div> </div> ` })} <div class="h-24 w-px mx-auto" style="background-color: color-mix(in srgb, var(--cb-accent) 20%, transparent)"></div> ${renderComponent($$result, "Reveal", $$Reveal, { "x": 20 }, { "default": ($$result2) => renderTemplate` <div class="space-y-4 text-center border-t pt-6" style="border-color: color-mix(in srgb, var(--cb-accent) 20%, transparent)"> <div class="flex flex-col items-center gap-2 mb-2"> <p class="text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.2em] cb-text-primary font-bold whitespace-nowrap">${isBrideMode ? "Nh\xE0 trai" : "Nh\xE0 g\xE1i"}</p> <div class="w-1 h-1 rounded-full" style="background-color: color-mix(in srgb, var(--cb-accent) 40%, transparent)"></div> </div> <div class="space-y-0.5"> <p class="text-base sm:text-xl cb-text-body font-heading font-medium leading-relaxed whitespace-nowrap" style="color: var(--cb-text)">${secondParents.father}</p> <p class="text-base sm:text-xl cb-text-body font-heading font-medium leading-relaxed whitespace-nowrap" style="color: var(--cb-text)">${secondParents.mother}</p> </div> </div> ` })} </div> <div class="max-w-4xl mx-auto"> ${renderComponent($$result, "Reveal", $$Reveal, { "y": 30 }, { "default": ($$result2) => renderTemplate` <div class="text-center space-y-6 relative"> ${photo1 && photo2 && renderTemplate`<div class="relative h-64 sm:h-80 mb-8 mx-auto w-full max-w-md"> <div class="absolute top-0 left-0 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white -rotate-6 z-0 transition-transform hover:z-20 hover:scale-105 duration-500"> <img${addAttribute(photo1, "src")}${addAttribute(isBrideMode ? "C\xF4 d\xE2u" : "Ch\xFA r\u1EC3", "alt")} class="w-full h-full object-cover" loading="lazy"> </div> <div class="absolute top-10 right-0 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-6 z-10 transition-transform hover:z-20 hover:scale-105 duration-500"> <img${addAttribute(photo2, "src")}${addAttribute(isBrideMode ? "Ch\xFA r\u1EC3" : "C\xF4 d\xE2u", "alt")} class="w-full h-full object-cover" loading="lazy"> </div> </div>`} <div class="space-y-5"> <div class="flex flex-col gap-3 w-full max-w-4xl mx-auto"> <div class="text-left"> <span class="text-3xl sm:text-5xl lg:text-6xl font-script cb-text-primary font-bold leading-relaxed drop-shadow-sm">${firstName}</span> <span class="block text-base sm:text-lg font-heading cb-text-body font-bold tracking-[0.2em] uppercase mt-1" style="color: var(--cb-text)"> ${isBrideMode ? "\xC1i N\u1EEF" : "Tr\u01B0\u1EDFng Nam"} </span> </div> <div class="text-right"> <span class="text-3xl sm:text-5xl lg:text-6xl font-script cb-text-primary font-bold leading-relaxed drop-shadow-sm">${secondName}</span> <span class="block text-base sm:text-lg font-heading cb-text-body font-bold tracking-[0.2em] uppercase mt-1" style="color: var(--cb-text)"> ${isBrideMode ? "Tr\u01B0\u1EDFng Nam" : "\xC1i N\u1EEF"} </span> </div> </div> <div class="h-px w-32 bg-gradient-to-r from-transparent via-[var(--cb-accent)] to-transparent mx-auto opacity-60"></div> <div class="space-y-4 mt-4"> <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6"> <div class="text-center"> <p class="cb-text-body text-xs sm:text-sm uppercase tracking-wider font-semibold mb-0.5 opacity-70" style="color: var(--cb-text)">Giờ làm lễ</p> <p class="text-4xl sm:text-5xl font-heading cb-text-primary font-bold">${ceremony.ceremonyTime}</p> </div> <div class="w-px h-10 hidden sm:block" style="background-color: color-mix(in srgb, var(--cb-accent) 30%, transparent)"></div> <div class="text-center"> <p class="cb-text-body text-xs sm:text-sm uppercase tracking-wider font-semibold mb-0.5 opacity-70" style="color: var(--cb-text)">Giờ nhập tiệc</p> <p class="text-4xl sm:text-5xl font-heading cb-text-primary font-bold">${ceremony.receptionTime}</p> </div> </div> <div class="space-y-1"> <p class="text-3xl sm:text-4xl cb-text-body font-heading font-bold tracking-wide" style="color: var(--cb-text)">${ceremony.date}</p> ${ceremony.lunarDate && renderTemplate`<p class="text-xl cb-text-body font-semibold">${ceremony.lunarDate}</p>`} </div> </div> <div class="pt-6 border-t inline-block px-8 mt-2" style="border-color: color-mix(in srgb, var(--cb-accent) 20%, transparent)"> <p class="text-base uppercase tracking-[0.4em] cb-text-primary font-bold mb-3">Địa điểm</p> <p class="text-4xl cb-text-body font-heading font-black tracking-tight mb-2 leading-tight" style="color: var(--cb-text)">${ceremony.venue}</p> <p class="text-xl cb-text-body font-bold max-w-[500px] mx-auto leading-relaxed">${ceremony.address}</p> </div> </div> </div> ` })} </div> </div> <div class="absolute top-20 right-[-5%] pointer-events-none select-none font-heading rotate-12"> <span class="block text-[4rem] sm:text-[10rem] lg:text-[20rem] opacity-10 sm:opacity-[0.05] lg:opacity-[0.03] cb-text-primary">Love</span> </div> </section>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/WeddingInfoStatic.astro", void 0);

function getParts$1(targetMs) {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    days: Math.floor(diff / (1e3 * 60 * 60 * 24)),
    hours: Math.floor(diff / (1e3 * 60 * 60) % 24),
    minutes: Math.floor(diff / (1e3 * 60) % 60),
    seconds: Math.floor(diff / 1e3 % 60)
  };
}
function NumberFlip$1({ value }) {
  return /* @__PURE__ */ jsx("div", { className: "relative h-[3.5rem] sm:h-[4.5rem] overflow-hidden", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", initial: false, children: /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
      className: "absolute inset-0 flex items-center justify-center",
      children: /* @__PURE__ */ jsx("span", { className: "tabular-nums text-4xl sm:text-5xl lg:text-6xl font-heading cb-text-primary font-medium tracking-tight", children: value })
    },
    value
  ) }) });
}
function CountdownIsland({ targetISO }) {
  const targetMs = useMemo(() => {
    const d = new Date(targetISO);
    return isNaN(d.getTime()) ? Date.now() + 30 * 864e5 : d.getTime();
  }, [targetISO]);
  const [parts, setParts] = useState(() => getParts$1(targetMs));
  useEffect(() => {
    const id = setInterval(() => setParts(getParts$1(targetMs)), 1e3);
    return () => clearInterval(id);
  }, [targetMs]);
  const items = [
    { label: "Ngày", value: String(parts.days).padStart(2, "0") },
    { label: "Giờ", value: String(parts.hours).padStart(2, "0") },
    { label: "Phút", value: String(parts.minutes).padStart(2, "0") },
    { label: "Giây", value: String(parts.seconds).padStart(2, "0") }
  ];
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-6", children: items.map((item) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "bg-white/40 backdrop-blur-md border p-6 rounded-2xl shadow-sm text-center group hover:bg-white/60 transition-colors duration-500",
      style: { borderColor: "color-mix(in srgb, var(--cb-accent) 10%, transparent)" },
      children: [
        /* @__PURE__ */ jsx(NumberFlip$1, { value: item.value }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm sm:text-base tracking-[0.3em] uppercase cb-text-body font-bold", children: item.label })
      ]
    },
    item.label
  )) });
}

const $$Astro$j = createAstro();
const $$CountdownStatic = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$CountdownStatic;
  const { wedding, mode } = Astro2.props;
  const ceremony = mode === "bride" ? wedding.brideCeremony : wedding.groomCeremony;
  const countdownImage = wedding.gallery[1] || "";
  return renderTemplate`${maybeRenderHead()}<section id="countdown" class="relative py-16 sm:py-20 overflow-hidden"> <div class="container mx-auto max-w-7xl px-4 relative z-10"> <div class="grid gap-16 lg:grid-cols-12 items-center"> <div class="lg:col-span-6"> ${renderComponent($$result, "Reveal", $$Reveal, { "x": -30 }, { "default": ($$result2) => renderTemplate`${countdownImage && renderTemplate`<div class="relative aspect-[4/5] sm:aspect-square rounded-t-full overflow-hidden border-[8px] border-white shadow-2xl transition-transform hover:scale-[1.01] duration-700"> <img${addAttribute(countdownImage, "src")} alt="Together" class="w-full h-full object-cover scale-105" loading="lazy"> <div class="absolute inset-0 opacity-5" style="background-color: var(--cb-primary)"></div> </div>`}` })} </div> <div class="lg:col-span-6"> ${renderComponent($$result, "Reveal", $$Reveal, {}, { "default": ($$result2) => renderTemplate` <div class="text-center lg:text-left mb-12"> <h2 class="cb-text-primary uppercase tracking-[0.25em] text-lg sm:text-xl font-bold mb-6">Đếm ngược ngày trọng đại</h2> <div class="h-px w-24 bg-gradient-to-r from-transparent via-[var(--cb-accent)] to-transparent mx-auto lg:mx-0 my-8 opacity-60"></div> <p class="mt-8 text-4xl sm:text-5xl font-heading cb-text-primary font-bold tracking-tight">${ceremony.date}</p> </div> ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "delay": 0.1, "y": 20 }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CountdownIsland", CountdownIsland, { "client:visible": true, "targetISO": ceremony.date, "client:component-hydration": "visible", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/CountdownIsland", "client:component-export": "default" })} ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "delay": 0.3, "y": 20 }, { "default": ($$result2) => renderTemplate` <div class="mt-16 text-center lg:text-left italic cb-text-body text-lg font-heading opacity-70">
&ldquo;Dù đi đâu, làm gì, chỉ cần chúng ta bên nhau.&rdquo;
</div> ` })} </div> </div> </div> </section>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/CountdownStatic.astro", void 0);

const $$Astro$i = createAstro();
const $$QuoteStatic = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$QuoteStatic;
  const { wedding, mode } = Astro2.props;
  const isBrideMode = mode === "bride";
  const photo1 = wedding.gallery[4] || "";
  const photo2 = wedding.gallery[5] || "";
  return renderTemplate`${maybeRenderHead()}<section class="relative sm:py-40 overflow-hidden"> <div class="container mx-auto max-w-7xl px-4 relative z-10"> ${photo1 && photo2 && renderTemplate`<div class="lg:hidden grid grid-cols-2 gap-4 sm:gap-6 max-w-sm mx-auto mb-8 sm:mb-10"> ${renderComponent($$result, "Reveal", $$Reveal, { "x": -20 }, { "default": ($$result2) => renderTemplate` <div class="relative aspect-[3/4] rounded-2xl overflow-hidden border-[4px] border-white shadow-xl rotate-[-3deg]"> <img${addAttribute(photo1, "src")}${addAttribute(isBrideMode ? "C\xF4 d\xE2u" : "Ch\xFA r\u1EC3", "alt")} class="w-full h-full object-cover" loading="lazy"> </div> ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "x": 20 }, { "default": ($$result2) => renderTemplate` <div class="relative aspect-[3/4] rounded-2xl overflow-hidden border-[4px] border-white shadow-xl rotate-[3deg] mt-6"> <img${addAttribute(photo2, "src")}${addAttribute(isBrideMode ? "Ch\xFA r\u1EC3" : "C\xF4 d\xE2u", "alt")} class="w-full h-full object-cover" loading="lazy"> </div> ` })} </div>`} <div class="relative grid grid-cols-12 gap-8 items-center"> ${photo1 && renderTemplate`<div class="hidden lg:block lg:col-span-4"> ${renderComponent($$result, "Reveal", $$Reveal, { "x": -40 }, { "default": ($$result2) => renderTemplate` <div class="relative aspect-[3/4] rounded-full overflow-hidden border-[6px] border-white shadow-2xl rotate-[-2deg] grayscale-[0.2] hover:grayscale-0 transition-all duration-700"> <img${addAttribute(photo1, "src")} alt="Portrait" class="w-full h-full object-cover scale-110" loading="lazy"> </div> ` })} </div>`} <div class="col-span-12 lg:col-span-4 text-center px-4 space-y-6 sm:space-y-8"> ${renderComponent($$result, "Reveal", $$Reveal, {}, { "default": ($$result2) => renderTemplate` <div class="mb-6 flex justify-center opacity-30"> <svg class="w-10 h-10" viewBox="0 0 24 24" style="color: var(--cb-primary); fill: var(--cb-primary)"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"></path></svg> </div> <p class="cb-text-primary text-sm sm:text-base uppercase tracking-[0.35em] font-bold mb-4">Trân trọng kính mời</p> <p class="cb-text-body text-lg sm:text-xl font-heading font-medium mb-4" style="color: var(--cb-text)"> <span class="font-bold" data-guest-invitee-label>quý khách</span> tới dự buổi tiệc chung vui cùng gia đình chúng tôi.
</p> <p class="cb-text-body text-lg sm:text-xl font-heading font-medium mb-8" style="color: var(--cb-text)">
Sự hiện diện của <span class="font-bold" data-guest-salutation-label>quý khách</span> là niềm vinh hạnh lớn lao cho gia đình chúng tôi.
</p> ${wedding.quote && renderTemplate`<p class="cb-text-body text-base sm:text-lg italic font-medium mb-4" style="color: var(--cb-text)">&ldquo;${wedding.quote}&rdquo;</p>`}<div class="h-px w-24 bg-gradient-to-r from-transparent via-[var(--cb-accent)] to-transparent mx-auto my-8"></div> ` })} </div> ${photo2 && renderTemplate`<div class="hidden lg:block lg:col-span-4"> ${renderComponent($$result, "Reveal", $$Reveal, { "x": 40 }, { "default": ($$result2) => renderTemplate` <div class="relative aspect-[3/4] rounded-t-full overflow-hidden border-[6px] border-white shadow-2xl rotate-[2deg] grayscale-[0.2] hover:grayscale-0 transition-all duration-700 mt-12"> <img${addAttribute(photo2, "src")} alt="Portrait" class="w-full h-full object-cover scale-110" loading="lazy"> </div> ` })} </div>`} </div> </div> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none italic font-heading"> <span class="block text-[4rem] sm:text-[7rem] lg:text-[15rem] opacity-10 sm:opacity-[0.06] lg:opacity-[0.03] cb-text-primary">Forever</span> </div> </section>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/QuoteStatic.astro", void 0);

function GalleryItem$1({ src, alt, parallax }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["0 1", "1 0"] });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      style: { y },
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2 },
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
      className: "group relative bg-white p-3 sm:p-4 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500",
      children: [
        /* @__PURE__ */ jsx("div", { className: "relative aspect-[3/4] overflow-hidden cb-bg-page", children: /* @__PURE__ */ jsx(
          "img",
          {
            src,
            alt,
            loading: "lazy",
            className: "h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "h-1 w-8 rounded-full", style: { backgroundColor: "color-mix(in srgb, var(--cb-accent) 20%, transparent)" } }) })
      ]
    }
  );
}
function GalleryIsland({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(null);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16", children: gallery.map((src, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: `${index % 2 === 0 ? "lg:translate-y-12" : "lg:-translate-y-12"} transition-transform cursor-pointer`,
        onClick: () => setSelectedImage(src),
        children: /* @__PURE__ */ jsx(GalleryItem$1, { src, alt: `Ảnh cưới ${index + 1}`, parallax: index % 2 === 0 ? 20 : -20 })
      },
      `${src}-${index}`
    )) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: selectedImage && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm",
        onClick: () => setSelectedImage(null),
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.9, opacity: 0 },
            className: "relative max-w-5xl max-h-[85vh] overflow-hidden rounded-lg shadow-2xl",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setSelectedImage(null),
                  className: "absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-all z-20",
                  children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }),
                    /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx("img", { src: selectedImage, alt: "Gallery Fullscreen", className: "w-full h-full object-contain max-h-[85vh]" })
            ]
          }
        )
      }
    ) })
  ] });
}

const $$Astro$h = createAstro();
const $$GalleryStatic = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$GalleryStatic;
  const { gallery } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section id="anh" class="relative py-24 lg:py-32 overflow-hidden"> <div class="mx-auto max-w-7xl px-4"> ${renderComponent($$result, "Reveal", $$Reveal, {}, { "default": ($$result2) => renderTemplate` <div class="text-center mb-20"> <h2 class="cb-text-primary uppercase tracking-[0.25em] text-lg sm:text-xl font-bold mb-6">Bộ ảnh kỷ niệm</h2> <div class="h-px w-24 bg-gradient-to-r from-transparent via-[var(--cb-accent)] to-transparent mx-auto my-8 opacity-60"></div> <p class="mt-8 text-3xl sm:text-4xl font-heading cb-text-body italic opacity-90 leading-tight">
&ldquo;Những khoảnh khắc chúng mình yêu nhất.&rdquo;
</p> </div> ` })} ${renderComponent($$result, "GalleryIsland", GalleryIsland, { "client:visible": true, "gallery": gallery, "client:component-hydration": "visible", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/GalleryIsland", "client:component-export": "default" })} ${renderComponent($$result, "Reveal", $$Reveal, { "delay": 0.1 }, { "default": ($$result2) => renderTemplate` <div class="mt-16 text-center text-base sm:text-lg cb-text-body italic font-medium opacity-60">
Tình yêu không chỉ là nhìn nhau, mà là cùng nhau nhìn về một hướng.
</div> ` })} </div> </section>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/GalleryStatic.astro", void 0);

const $$Astro$g = createAstro();
const $$LocationStatic = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$LocationStatic;
  const { wedding, mode } = Astro2.props;
  const isBrideMode = mode === "bride";
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  return renderTemplate`${maybeRenderHead()}<section id="dia-diem" class="relative lg:py-32" data-astro-cid-b3uqy5os> <div class="mx-auto max-w-6xl px-4" data-astro-cid-b3uqy5os> ${renderComponent($$result, "Reveal", $$Reveal, { "data-astro-cid-b3uqy5os": true }, { "default": ($$result2) => renderTemplate` <div class="grid gap-16 md:grid-cols-12 md:gap-20 items-center" data-astro-cid-b3uqy5os> <div class="md:col-span-5 text-center md:text-left" data-astro-cid-b3uqy5os> <h2 class="cb-text-primary uppercase tracking-[0.25em] text-base sm:text-lg mb-6 font-bold" data-astro-cid-b3uqy5os>Địa điểm tổ chức</h2> <h3 class="text-4xl sm:text-5xl lg:text-6xl font-heading cb-text-body font-bold leading-tight mb-6" style="color: var(--cb-text)" data-astro-cid-b3uqy5os>${ceremony.venue}</h3> <p class="text-xl sm:text-2xl cb-text-body leading-relaxed mb-10 max-w-md mx-auto md:mx-0 font-medium" data-astro-cid-b3uqy5os>${ceremony.address}</p> <div class="flex flex-col gap-4" data-astro-cid-b3uqy5os> ${ceremony.googleMapsUrl && renderTemplate`<a${addAttribute(ceremony.googleMapsUrl, "href")} target="_blank" rel="noreferrer" class="cb-scale-btn inline-flex items-center justify-center px-10 py-4 cb-bg-primary text-white text-base tracking-[0.3em] uppercase hover:opacity-90 transition-all shadow-lg font-bold" data-astro-cid-b3uqy5os>
Mở Google Maps
</a>`} <a href="#loi-chuc" class="cb-scale-btn inline-flex items-center justify-center px-10 py-4 border bg-transparent cb-text-primary text-sm tracking-[0.3em] uppercase transition-all font-bold" style="border-color: color-mix(in srgb, var(--cb-primary) 20%, transparent)" data-astro-cid-b3uqy5os>
Xác nhận tham dự
</a> </div> </div> <div class="md:col-span-7" data-astro-cid-b3uqy5os> ${ceremony.googleMapsUrl && renderTemplate`<div class="bg-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] border rounded-2xl p-0 overflow-hidden shadow-2xl scale-[1.02]" style="border-color: color-mix(in srgb, var(--cb-accent) 10%, transparent)" data-astro-cid-b3uqy5os> <iframe title="Google Maps"${addAttribute(`https://maps.google.com/maps?q=${encodeURIComponent(ceremony.address)}&output=embed`, "src")} class="h-[400px] w-full lg:h-[480px] grayscale-[0.2] contrast-[1.1]" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen data-astro-cid-b3uqy5os></iframe> </div>`} </div> </div> ` })} </div> </section> `;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/LocationStatic.astro", void 0);

function WishesIsland({ weddingId }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [wishes, setWishes] = useState([]);
  const [status, setStatus] = useState("idle");
  const fetchWishes = useCallback(async () => {
    try {
      const res = await fetch(`/api/wishes?weddingId=${weddingId}`);
      const data = await res.json();
      if (Array.isArray(data.wishes)) setWishes(data.wishes);
    } catch (error) {
      console.error("Error fetching wishes:", error);
    }
  }, [weddingId]);
  useEffect(() => {
    if (weddingId) fetchWishes();
  }, [weddingId, fetchWishes]);
  const canSubmit = useMemo(
    () => name.trim().length > 1 && message.trim().length > 3 && attendance !== null && status !== "submitting",
    [name, message, attendance, status]
  );
  async function onSubmit() {
    if (!canSubmit) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId,
          name: name.trim(),
          message: message.trim(),
          attendance: attendance === "yes" ? "Tham dự" : "Rất tiếc không thể"
        })
      });
      if (res.ok) {
        setName("");
        setMessage("");
        setAttendance(null);
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          fetchWishes();
        }, 3e3);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3e3);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3e3);
    }
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-[40px] border bg-white/60 backdrop-blur-xl p-8 sm:p-12 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] relative overflow-hidden cb-border-accent", style: { borderColor: "color-mix(in srgb, var(--cb-accent) 10%, transparent)" }, children: /* @__PURE__ */ jsxs("div", { className: "grid gap-8 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
        /* @__PURE__ */ jsxs("label", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm tracking-[0.32em] uppercase cb-text-body font-bold ml-2 opacity-60", children: "Bạn có thể tham dự chứ?" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setAttendance("yes"),
                className: `flex-1 py-4 rounded-2xl border transition-all text-base font-medium text-center ${attendance === "yes" ? "cb-bg-primary text-white cb-border-primary shadow-lg" : "bg-white/50 text-[var(--cb-text)] hover:border-[color-mix(in_srgb,var(--cb-primary)_30%,transparent)]"}`,
                style: attendance !== "yes" ? { borderColor: "color-mix(in srgb, var(--cb-accent) 10%, transparent)", color: "color-mix(in srgb, var(--cb-text) 60%, transparent)" } : void 0,
                children: "Chắc chắn rồi"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setAttendance("no"),
                className: `flex-1 py-4 rounded-2xl border transition-all text-base font-medium text-center ${attendance === "no" ? "cb-bg-primary text-white cb-border-primary shadow-lg" : "bg-white/50 hover:border-[color-mix(in_srgb,var(--cb-primary)_30%,transparent)]"}`,
                style: attendance !== "no" ? { borderColor: "color-mix(in srgb, var(--cb-accent) 10%, transparent)", color: "color-mix(in srgb, var(--cb-text) 60%, transparent)" } : void 0,
                children: "Rất tiếc, mình bận"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm tracking-[0.32em] uppercase cb-text-body font-bold ml-2 opacity-60", children: "Tên của bạn" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: name,
              onChange: (e) => setName(e.target.value),
              className: "h-16 rounded-2xl border bg-white/50 px-6 text-base outline-none focus:border-[color-mix(in_srgb,var(--cb-primary)_30%,transparent)] transition-all shadow-sm font-medium cb-text-body",
              style: { borderColor: "color-mix(in srgb, var(--cb-accent) 10%, transparent)" },
              placeholder: "Ví dụ: Anh xã, Chị đại..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm tracking-[0.32em] uppercase cb-text-body font-bold ml-2 opacity-60", children: "Lời chúc yêu thương" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: message,
              onChange: (e) => setMessage(e.target.value),
              className: "min-h-[160px] rounded-2xl border bg-white/50 px-6 py-4 text-base outline-none focus:border-[color-mix(in_srgb,var(--cb-primary)_30%,transparent)] transition-all shadow-sm resize-none font-medium cb-text-body",
              style: { borderColor: "color-mix(in srgb, var(--cb-accent) 10%, transparent)" },
              placeholder: "Gửi một lời chúc thật ấm áp..."
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-6 pt-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs cb-text-body tracking-wider font-medium italic opacity-50", children: "Lời chúc sẽ được lưu trữ mãi mãi." }),
        /* @__PURE__ */ jsx(
          motion.button,
          {
            type: "button",
            whileHover: canSubmit ? { scale: 1.05 } : {},
            whileTap: canSubmit ? { scale: 0.95 } : {},
            onClick: onSubmit,
            disabled: !canSubmit,
            className: `inline-flex items-center justify-center rounded-none px-12 py-5 text-sm tracking-[0.3em] uppercase transition-all duration-300 shadow-xl min-w-[240px] font-bold ${status === "submitting" ? "text-white cursor-wait opacity-50" : canSubmit ? "cb-bg-primary text-white hover:opacity-90" : "cursor-not-allowed opacity-20"}`,
            style: status === "submitting" || canSubmit ? { backgroundColor: "var(--cb-primary)" } : { backgroundColor: "color-mix(in srgb, var(--cb-primary) 5%, transparent)", color: "color-mix(in srgb, var(--cb-primary) 20%, transparent)" },
            children: status === "submitting" ? "Đang gửi..." : "Gửi lời chúc & Xác nhận"
          }
        )
      ] }),
      status === "success" && /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, className: "text-center text-sm font-medium text-emerald-600 mt-4", children: "Đã gửi thành công! Cảm ơn bạn thật nhiều." }),
      status === "error" && /* @__PURE__ */ jsx("p", { className: "text-center text-sm font-medium text-red-500 mt-4", children: "Có lỗi xảy ra, bạn vui lòng thử lại nhé!" })
    ] }) }),
    wishes.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-16 grid gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1", style: { backgroundColor: "color-mix(in srgb, var(--cb-accent) 20%, transparent)" } }),
        /* @__PURE__ */ jsxs("p", { className: "text-[10px] tracking-[0.5em] uppercase cb-text-primary font-bold", children: [
          "Lời chúc (",
          wishes.length,
          ")"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1", style: { backgroundColor: "color-mix(in srgb, var(--cb-accent) 20%, transparent)" } })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-h-[720px] overflow-y-auto pr-2 scroll-smooth", style: { scrollbarWidth: "thin", scrollbarColor: "var(--cb-primary) transparent" }, children: /* @__PURE__ */ jsx("div", { className: "grid gap-6", children: wishes.map((wish) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "rounded-3xl border bg-white/40 backdrop-blur-md px-10 py-8 shadow-sm border-l-4 relative overflow-hidden group hover:bg-white/60 transition-colors cb-border-accent",
          style: { borderColor: "color-mix(in srgb, var(--cb-accent) 10%, transparent)", borderLeftColor: "color-mix(in srgb, var(--cb-primary) 40%, transparent)" },
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.3em] uppercase cb-text-primary font-bold mb-4", children: wish.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-base sm:text-lg cb-text-body leading-relaxed font-heading italic relative z-10 opacity-80", children: [
              "“",
              wish.message,
              "”"
            ] })
          ]
        },
        wish.id
      )) }) })
    ] })
  ] });
}

const $$Astro$f = createAstro();
const $$WishesStatic = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$WishesStatic;
  const { weddingId } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section id="loi-chuc" class="relative py-16 sm:py-20 overflow-hidden"> <div class="container mx-auto max-w-6xl px-4 relative z-10"> ${renderComponent($$result, "Reveal", $$Reveal, {}, { "default": ($$result2) => renderTemplate` <div class="grid gap-16 lg:grid-cols-12 items-start"> <div class="lg:col-span-12 xl:col-span-5"> <div class="sticky top-24"> <p class="text-sm tracking-[0.42em] uppercase cb-text-primary font-bold">Gửi lời chúc &amp; Xác nhận</p> <h2 class="mt-4 text-4xl sm:text-5xl font-heading cb-text-body leading-tight" style="color: var(--cb-text)">
Lời chúc gửi trao,<br>Niềm vui trọn vẹn.
</h2> <p class="mt-6 text-base sm:text-lg cb-text-body leading-relaxed mb-10 font-medium">
Sự hiện diện và lời chúc của khách mời là món quà vô giá mà chúng mình trân quý nhất.
</p> </div> </div> <div class="lg:col-span-12 xl:col-span-7"> ${renderComponent($$result2, "WishesIsland", WishesIsland, { "client:visible": true, "weddingId": weddingId, "client:component-hydration": "visible", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/WishesIsland", "client:component-export": "default" })} </div> </div> ` })} </div> </section>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/WishesStatic.astro", void 0);

const $$Astro$e = createAstro();
const $$FooterStatic = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$FooterStatic;
  const { wedding, mode } = Astro2.props;
  const isBrideMode = mode === "bride";
  const names = isBrideMode ? `${wedding.brideName} & ${wedding.groomName}` : `${wedding.groomName} & ${wedding.brideName}`;
  return renderTemplate`${maybeRenderHead()}<section class="cb-bg-page pb-16"> ${renderComponent($$result, "Reveal", $$Reveal, {}, { "default": ($$result2) => renderTemplate` <div class="mx-auto max-w-4xl text-center"> <div class="mx-auto h-px w-full max-w-6xl" style="background: linear-gradient(90deg,transparent,rgba(58,13,26,0.18),transparent)"></div> <p class="mt-10 text-lg sm:text-xl cb-text-body font-medium" style="color: var(--cb-text)">
Cảm ơn bạn đã dành thời gian cho ngày trọng đại của
</p> <p class="mt-2 text-2xl sm:text-3xl lg:text-4xl font-script cb-text-primary font-bold whitespace-nowrap">${names}</p> <p class="mt-4 text-sm sm:text-base tracking-[0.32em] uppercase cb-text-body font-semibold opacity-70">Hẹn gặp bạn</p> ${wedding.status !== "PUBLISHED" && renderTemplate`<p class="text-xs tracking-wide opacity-60 mt-6">
✨ Tạo bởi <a href="/" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 hover:opacity-100">ThiepCuoiOnline.vn</a> </p>`} </div> ` })} </section>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/FooterStatic.astro", void 0);

const $$Astro$d = createAstro();
const $$ModeSwitcherStatic = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$ModeSwitcherStatic;
  const { mode } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="fixed top-4 right-4 z-50"> <div class="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border-2 rounded-full shadow-lg pointer-events-none cb-border-primary" style="border-color: color-mix(in srgb, var(--cb-primary) 20%, transparent)"> <svg class="w-4 h-4 cb-text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c1 3 3 4 6 5-3 1-5 3-6 6-1-3-3-5-6-6 3-1 5-2 6-5Z"></path></svg> <span class="text-sm font-heading font-semibold cb-text-primary">${mode === "bride" ? "Nh\xE0 G\xE1i" : "Nh\xE0 Trai"}</span> </div> </div>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/ModeSwitcherStatic.astro", void 0);

function WeddingCardOpeningIsland({
  groomName,
  brideName,
  isBrideMode
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState();
  const [guestSalutation, setGuestSalutation] = useState();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setGuestName(params.get("guest") || params.get("name") || void 0);
    setGuestSalutation(params.get("salutation") || params.get("xung_ho") || void 0);
  }, []);
  const displayName = guestSalutation && guestName ? `${guestSalutation} ${guestName}` : guestName || null;
  useEffect(() => {
    if (!isOpen) {
      const html = document.documentElement;
      const body = document.body;
      const prevHtml = html.style.overflow;
      const prevBody = body.style.overflow;
      const prevBodyHeight = body.style.height;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.height = "100%";
      return () => {
        html.style.overflow = prevHtml;
        body.style.overflow = prevBody;
        body.style.height = prevBodyHeight;
      };
    }
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.height = "";
  }, [isOpen]);
  const handleOpen = () => setIsOpen(true);
  const firstName = isBrideMode ? brideName : groomName;
  const secondName = isBrideMode ? groomName : brideName;
  return /* @__PURE__ */ jsx(AnimatePresence, { children: !isOpen && /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 1 },
      exit: { opacity: 0, transition: { duration: 1, ease: "easeInOut" } },
      className: "fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#70261B]",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden cb-bling-layer", "aria-hidden": true, children: [
          /* @__PURE__ */ jsx("div", { className: "cb-bling-shimmer" }),
          /* @__PURE__ */ jsx("div", { className: "cb-bling-sparkles", children: [...Array(9)].map((_, i) => /* @__PURE__ */ jsx("span", { className: "cb-sparkle", "aria-hidden": true }, i)) })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative w-[min(90vw,320px)] sm:w-[min(85vw,360px)] md:max-w-[380px] aspect-[3/4] max-h-[80vh] shrink-0 cursor-pointer mx-auto",
            onClick: handleOpen,
            role: "button",
            tabIndex: 0,
            onKeyDown: (e) => e.key === "Enter" && handleOpen(),
            "aria-label": "Chạm để mở thiệp",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-[-20px] h-10 bg-black/20 blur-xl rounded-full" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white shadow-sm rounded-lg border cb-border-accent", style: { borderColor: "color-mix(in srgb, var(--cb-accent) 5%, transparent)" } }),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "absolute inset-0 z-10 origin-left",
                  whileHover: { rotateY: -10 },
                  transition: { type: "spring", stiffness: 100, damping: 20 },
                  children: /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-white rounded-lg shadow-2xl flex flex-col items-center justify-center p-6 sm:p-8 text-center overflow-hidden cb-border-accent", style: { borderWidth: "1px", borderColor: "color-mix(in srgb, var(--cb-accent) 10%, transparent)" }, children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]", "aria-hidden": true }),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-4 pointer-events-none cb-border-accent", style: { borderWidth: "1px", borderColor: "color-mix(in srgb, var(--cb-accent) 20%, transparent)" }, "aria-hidden": true }),
                    /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-6 relative shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-full overflow-hidden flex items-center justify-center shadow-lg bg-white p-1.5 cb-border-primary", style: { borderWidth: "1px", borderColor: "color-mix(in srgb, var(--cb-primary) 20%, transparent)" }, children: /* @__PURE__ */ jsx(Heart, { className: "w-10 h-10 sm:w-12 sm:h-12 cb-text-primary", style: { color: "var(--cb-primary)", fill: "color-mix(in srgb, var(--cb-primary) 20%, transparent)" } }) }) }),
                    /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        initial: { y: 10, opacity: 0 },
                        animate: { y: 0, opacity: 1 },
                        transition: { delay: 0.3, duration: 0.4 },
                        className: "relative z-10 shrink-0",
                        children: [
                          displayName && /* @__PURE__ */ jsxs("p", { className: "text-sm sm:text-base font-heading mb-3 cb-text-primary opacity-90", children: [
                            "Kính gửi: ",
                            /* @__PURE__ */ jsx("span", { className: "font-black cb-text-primary", children: displayName })
                          ] }),
                          /* @__PURE__ */ jsx("p", { className: "cb-text-primary text-sm sm:text-base tracking-[0.4em] uppercase font-bold mb-4", children: "Trân trọng báo tin" }),
                          /* @__PURE__ */ jsx("div", { className: "h-px w-24 mx-auto mb-6", style: { backgroundColor: "color-mix(in srgb, var(--cb-accent) 40%, transparent)" } }),
                          /* @__PURE__ */ jsxs("div", { className: "mb-8 space-y-2", children: [
                            /* @__PURE__ */ jsx("p", { className: "text-3xl sm:text-4xl font-script cb-text-primary font-bold", children: firstName }),
                            /* @__PURE__ */ jsx("p", { className: "text-xl sm:text-2xl font-script cb-text-accent", children: "&" }),
                            /* @__PURE__ */ jsx("p", { className: "text-3xl sm:text-4xl font-script cb-text-primary font-bold", children: secondName })
                          ] }),
                          /* @__PURE__ */ jsx("h2", { className: "text-lg sm:text-xl font-heading italic mb-8 cb-text-body opacity-60", children: "(Chạm để mở thiệp)" }),
                          /* @__PURE__ */ jsx(
                            motion.div,
                            {
                              animate: { scale: [1, 1.1, 1] },
                              transition: { duration: 2, repeat: Infinity },
                              className: "cb-text-accent opacity-60",
                              children: /* @__PURE__ */ jsx(Heart, { className: "w-8 h-8 mx-auto", style: { fill: "color-mix(in srgb, var(--cb-accent) 10%, transparent)", color: "var(--cb-accent)" } })
                            }
                          )
                        ]
                      }
                    )
                  ] })
                }
              )
            ]
          }
        )
      ]
    }
  ) });
}

function BackgroundMusicIsland({ musicUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const hasStarted = useRef(false);
  useEffect(() => {
    if (!musicUrl) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    const startMusic = () => {
      if (hasStarted.current) return;
      audio.currentTime = 5;
      audio.play().then(() => {
        setIsPlaying(true);
        hasStarted.current = true;
      }).catch(() => {
      });
    };
    const timer = setTimeout(startMusic, 1e3);
    const handleInteraction = () => {
      startMusic();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [musicUrl]);
  if (!musicUrl) return null;
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("audio", { ref: audioRef, loop: true, autoPlay: true, src: musicUrl }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: togglePlay,
        className: "group relative backdrop-blur-md text-white p-2.5 sm:p-3 md:p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border cb-bg-primary cb-border-accent",
        style: { backgroundColor: "color-mix(in srgb, var(--cb-primary) 90%, transparent)", borderColor: "color-mix(in srgb, var(--cb-accent) 30%, transparent)" },
        "aria-label": isPlaying ? "Tạm dừng nhạc" : "Phát nhạc",
        children: [
          isPlaying ? /* @__PURE__ */ jsx(Pause, { className: "w-4 h-4 sm:w-5 sm:h-5" }) : /* @__PURE__ */ jsx(Play, { className: "w-4 h-4 sm:w-5 sm:h-5 ml-0.5" }),
          /* @__PURE__ */ jsx("span", { className: "absolute bottom-full right-0 mb-2 px-3 py-1.5 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap cb-bg-primary", style: { backgroundColor: "var(--cb-primary)" }, children: isPlaying ? "Tạm dừng nhạc" : "Phát nhạc" }),
          isPlaying && /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full border-2 animate-ping cb-border-accent opacity-50", style: { borderColor: "color-mix(in srgb, var(--cb-accent) 50%, transparent)" } })
        ]
      }
    ) })
  ] });
}

function GuestViewTrackerIsland({ weddingSlug }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guestName = params.get("guest") || params.get("name") || void 0;
    if (guestName && weddingSlug) {
      fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weddingSlug, guestName })
      }).catch(() => {
      });
    }
  }, [weddingSlug]);
  return null;
}

const CLASSIC_BURGUNDY_SAMPLE_GALLERY = [
  "/templates/classic-burgundy/samples/01.jpg",
  "/templates/classic-burgundy/samples/02.jpg",
  "/templates/classic-burgundy/samples/03.jpg",
  "/templates/classic-burgundy/samples/04.jpg"
];
const SAMPLES = CLASSIC_BURGUNDY_SAMPLE_GALLERY;
const STRUCTURE_LEN = 6;
function resolveClassicBurgundyStructureGallery(userGallery) {
  const cleaned = (userGallery || []).slice(0, STRUCTURE_LEN).map((u) => typeof u === "string" ? u.trim() : "");
  const out = [];
  for (let i = 0; i < STRUCTURE_LEN; i++) {
    out.push(cleaned[i] || SAMPLES[i % SAMPLES.length]);
  }
  return out;
}

const CLASSIC_BURGUNDY_ALBUM_START_INDEX = 6;

const SECTIONS = {
  // ---------- Khối cơ bản ----------
  header: {
    key: "header",
    label: "Đầu trang",
    description: "Ảnh bìa và tên cô dâu chú rể",
    icon: "Image",
    required: true
  },
  "card-opening": {
    key: "card-opening",
    label: "Mở thiệp",
    description: "Hiệu ứng mở thiệp khi khách vào trang",
    icon: "Sparkles"
  },
  "wedding-info": {
    key: "wedding-info",
    label: "Thông tin cặp đôi",
    description: "Họ tên, cha mẹ hai bên, ngày giờ tổ chức",
    icon: "Users",
    required: true
  },
  // Autumn Watercolor dùng key `info` thay cho `wedding-info`
  info: {
    key: "info",
    label: "Thông tin cặp đôi",
    description: "Họ tên, cha mẹ hai bên, ngày giờ tổ chức",
    icon: "Users",
    required: true
  },
  footer: {
    key: "footer",
    label: "Chân trang",
    description: "Lời cảm ơn và thông tin cuối thiệp",
    icon: "AlignEndHorizontal",
    required: true
  },
  wishes: {
    key: "wishes",
    label: "Lời chúc",
    description: "Khách để lại lời chúc mừng cho cặp đôi",
    icon: "MessageCircleHeart"
  },
  // ---------- Khối nâng cao ----------
  countdown: {
    key: "countdown",
    label: "Đếm ngược",
    description: "Đồng hồ đếm ngược tới ngày cưới",
    icon: "Timer"
  },
  quote: {
    key: "quote",
    label: "Lời mời",
    description: "Câu trích dẫn hoặc lời mời trân trọng",
    icon: "Quote"
  },
  location: {
    key: "location",
    label: "Địa điểm",
    description: "Địa chỉ tiệc cưới kèm bản đồ chỉ đường",
    icon: "MapPin"
  },
  rsvp: {
    key: "rsvp",
    label: "Xác nhận tham dự",
    description: "Khách xác nhận có tới dự hay không (RSVP)",
    icon: "ClipboardCheck"
  },
  // ---------- Khối cao cấp ----------
  gallery: {
    key: "gallery",
    label: "Bộ ảnh",
    description: "Album ảnh cưới dạng lưới hoặc trình chiếu",
    icon: "Images"
  },
  gifting: {
    key: "gifting",
    label: "Mừng cưới",
    description: "Thông tin tài khoản và mã QR nhận mừng cưới",
    icon: "Gift"
  },
  timeline: {
    key: "timeline",
    label: "Lịch trình ngày cưới",
    description: "Các mốc thời gian trong ngày trọng đại",
    icon: "CalendarClock"
  },
  // ---------- Khối riêng của Modern Cinematic ----------
  hero: {
    key: "hero",
    label: "Màn hình mở đầu",
    description: "Ảnh toàn màn hình mở đầu theo phong cách điện ảnh",
    icon: "Clapperboard",
    required: true
  },
  story: {
    key: "story",
    label: "Câu chuyện tình yêu",
    description: "Kể lại hành trình yêu nhau của hai bạn",
    icon: "BookHeart"
  },
  journey: {
    key: "journey",
    label: "Hành trình",
    description: "Các cột mốc đáng nhớ của cặp đôi",
    icon: "Route"
  },
  invitation: {
    key: "invitation",
    label: "Lời mời trân trọng",
    description: "Trang mời chính thức tới dự lễ cưới",
    icon: "Mail"
  },
  mousetrail: {
    key: "mousetrail",
    label: "Lễ Hằng Thuận",
    description: "Khối ảnh có hiệu ứng vệt chuột nghệ thuật",
    icon: "Wand2"
  },
  carousel: {
    key: "carousel",
    label: "Khoảnh khắc cưới",
    description: "Trình chiếu ảnh dạng băng chuyền",
    icon: "GalleryHorizontal"
  }
};
function getSectionDef(key) {
  return SECTIONS[key] ?? {
    key,
    label: key,
    description: "",
    icon: "Square"
  };
}
function isSectionRequired(key) {
  return getSectionDef(key).required === true;
}

function isSectionConfig(value) {
  return typeof value === "object" && value !== null && typeof value.key === "string";
}
function resolveSections(raw, templateSections) {
  const supported = new Set(templateSections);
  let parsed = [];
  if (Array.isArray(raw)) {
    parsed = raw.map((item) => {
      if (typeof item === "string") return { key: item, visible: true };
      if (isSectionConfig(item)) {
        return { key: item.key, visible: item.visible !== false };
      }
      return null;
    }).filter((item) => item !== null);
  }
  const seen = /* @__PURE__ */ new Set();
  const result = parsed.filter((item) => {
    if (!supported.has(item.key) || seen.has(item.key)) return false;
    seen.add(item.key);
    return true;
  });
  for (const key of templateSections) {
    if (!seen.has(key)) {
      result.push({ key, visible: true });
      seen.add(key);
    }
  }
  return result.map(
    (item) => isSectionRequired(item.key) ? { ...item, visible: true } : item
  );
}
function visibleSectionKeys(raw, templateSections) {
  return resolveSections(raw, templateSections).filter((item) => item.visible).map((item) => item.key);
}

const $$Astro$c = createAstro();
const $$ClassicBurgundyPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$ClassicBurgundyPage;
  const { input } = Astro2.props;
  const { wedding, mode, googleFontsUrl, headingFont, bodyFont, scriptFont } = input;
  const isBrideMode = mode === "bride";
  const rawGallery = wedding.gallery ?? [];
  const structure = resolveClassicBurgundyStructureGallery(rawGallery);
  const albumUrls = rawGallery.slice(CLASSIC_BURGUNDY_ALBUM_START_INDEX).map((u) => String(u || "").trim()).filter(Boolean);
  const weddingWithSamples = { ...wedding, gallery: [...structure, ...albumUrls] };
  const themeVars = [
    `--cb-primary:${wedding.primaryColor ?? "#800020"}`,
    `--cb-accent:${wedding.accentColor ?? "#d4a853"}`,
    `--cb-bg:${wedding.backgroundColor ?? "#FDFBF7"}`,
    `--cb-text:${wedding.textColor ?? "#4A4A4A"}`,
    `--font-heading:${headingFont}`,
    `--font-body:${bodyFont}`,
    `--font-script:${scriptFont}`
  ].join(";");
  const DEFAULT_SECTIONS = ["header", "wedding-info", "countdown", "quote", "gallery", "location", "wishes", "footer"];
  const order = visibleSectionKeys(wedding.sectionOrder, DEFAULT_SECTIONS);
  return renderTemplate`<html lang="vi" class="no-js"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Thiệp Cưới ${wedding.groomName} & ${wedding.brideName}</title>${googleFontsUrl && renderTemplate`<link${addAttribute(googleFontsUrl, "href")} rel="stylesheet">`}${renderHead()}</head> <body> <div class="cb-template min-h-screen antialiased overflow-x-hidden"${addAttribute(`${themeVars};background-color:var(--cb-bg);color:var(--cb-text);font-family:var(--font-body)`, "style")}> ${renderComponent($$result, "WeddingCardOpeningIsland", WeddingCardOpeningIsland, { "client:load": true, "groomName": wedding.groomName, "brideName": wedding.brideName, "isBrideMode": isBrideMode, "client:component-hydration": "load", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/WeddingCardOpeningIsland", "client:component-export": "default" })} ${renderComponent($$result, "ModeSwitcherStatic", $$ModeSwitcherStatic, { "mode": mode })} <main> ${order.map((id) => {
    switch (id) {
      case "header":
        return renderTemplate`<div${addAttribute(id, "data-section")}> ${renderComponent($$result, "InvitationHeaderStatic", $$InvitationHeaderStatic, { "wedding": weddingWithSamples, "mode": mode })} </div>`;
      case "wedding-info":
        return renderTemplate`<div${addAttribute(id, "data-section")}> ${renderComponent($$result, "WeddingInfoStatic", $$WeddingInfoStatic, { "wedding": weddingWithSamples, "mode": mode })} </div>`;
      case "countdown":
        return renderTemplate`<div${addAttribute(id, "data-section")}> ${renderComponent($$result, "CountdownStatic", $$CountdownStatic, { "wedding": weddingWithSamples, "mode": mode })} </div>`;
      case "quote":
        return renderTemplate`<div${addAttribute(id, "data-section")}> ${renderComponent($$result, "QuoteStatic", $$QuoteStatic, { "wedding": weddingWithSamples, "mode": mode })} </div>`;
      case "gallery":
        return albumUrls.length > 0 ? renderTemplate`<div${addAttribute(id, "data-section")}> ${renderComponent($$result, "GalleryStatic", $$GalleryStatic, { "gallery": albumUrls })} </div>` : null;
      case "location":
        return renderTemplate`<div${addAttribute(id, "data-section")}> ${renderComponent($$result, "LocationStatic", $$LocationStatic, { "wedding": weddingWithSamples, "mode": mode })} </div>`;
      case "wishes":
        return renderTemplate`<div${addAttribute(id, "data-section")}> ${renderComponent($$result, "WishesStatic", $$WishesStatic, { "weddingId": wedding.id })} </div>`;
      case "footer":
        return renderTemplate`<div${addAttribute(id, "data-section")}> ${renderComponent($$result, "FooterStatic", $$FooterStatic, { "wedding": weddingWithSamples, "mode": mode })} </div>`;
      default:
        return null;
    }
  })} </main> ${wedding.backgroundMusic && renderTemplate`${renderComponent($$result, "BackgroundMusicIsland", BackgroundMusicIsland, { "client:load": true, "musicUrl": wedding.backgroundMusic, "client:component-hydration": "load", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/BackgroundMusicIsland", "client:component-export": "default" })}`} ${renderComponent($$result, "GuestViewTrackerIsland", GuestViewTrackerIsland, { "client:load": true, "weddingSlug": wedding.slug, "client:component-hydration": "load", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/GuestViewTrackerIsland", "client:component-export": "default" })} </div>   </body> </html>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/components/ClassicBurgundyPage.astro", void 0);

const $$Astro$b = createAstro();
const $$InvitationHeaderStaticAW = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$InvitationHeaderStaticAW;
  const { wedding, mode } = Astro2.props;
  const isBrideMode = mode === "bride";
  const firstName = isBrideMode ? wedding.brideName : wedding.groomName;
  const secondName = isBrideMode ? wedding.groomName : wedding.brideName;
  const polaroid1 = wedding.gallery[0] || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600";
  const polaroid2 = wedding.gallery[1] || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600";
  return renderTemplate`${maybeRenderHead()}<div class="relative pt-24 pb-12 px-6 flex flex-col items-center">  <div class="text-center z-10 mb-16"> <p class="text-sm tracking-[0.3em] uppercase opacity-60 mb-8">Lễ thành hôn</p> <h1 class="font-script text-6xl text-[var(--primary)] leading-tight"> ${firstName} <span class="block text-2xl my-2">&amp;</span> ${secondName} </h1> </div>  <div class="relative w-full h-[400px] flex justify-center">  ${renderComponent($$result, "Reveal", $$Reveal, { "x": -40, "class": "absolute z-20 w-[200px]" }, { "default": ($$result2) => renderTemplate` <div class="polaroid-frame" style="transform: rotate(-8deg)"> <img${addAttribute(polaroid1, "src")}${addAttribute(firstName, "alt")} class="w-full aspect-square object-cover" width="200" height="200" loading="lazy"> <p class="font-script text-lg text-center mt-3 opacity-70">${firstName}</p> </div> ` })}  ${renderComponent($$result, "Reveal", $$Reveal, { "x": 50, "y": 80, "delay": 0.2, "class": "absolute z-10 w-[200px]" }, { "default": ($$result2) => renderTemplate` <div class="polaroid-frame" style="transform: rotate(6deg)"> <img${addAttribute(polaroid2, "src")}${addAttribute(secondName, "alt")} class="w-full aspect-square object-cover" width="200" height="200" loading="lazy"> <p class="font-script text-lg text-center mt-3 opacity-70">${secondName}</p> </div> ` })} </div>  <div class="absolute top-1/2 -right-10 opacity-20 transform rotate-45 pointer-events-none"> <svg width="150" height="150" viewBox="0 0 100 100" class="fill-[var(--secondary)]"> <path d="M50,10 C60,40 90,50 50,90 C10,50 40,40 50,10"></path> </svg> </div> </div>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/InvitationHeaderStaticAW.astro", void 0);

const $$Astro$a = createAstro();
const $$WeddingInfoStaticAW = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$WeddingInfoStaticAW;
  const { wedding, mode } = Astro2.props;
  const isBrideMode = mode === "bride";
  const groom = { name: wedding.groomName, parents: wedding.groomParents };
  const bride = { name: wedding.brideName, parents: wedding.brideParents };
  return renderTemplate`${renderComponent($$result, "Reveal", $$Reveal, { "y": 20 }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-16 text-center">  <div class="grid grid-cols-2 gap-8 relative"> <div class="space-y-2"> <p class="font-bold text-xs uppercase tracking-widest opacity-50">Nhà trai</p> <div class="text-sm space-y-1"> <p>Bố: ${groom.parents.father}</p> <p>Mẹ: ${groom.parents.mother}</p> </div> <p class="font-script text-2xl mt-4">${groom.name}</p> </div> <div class="h-24 w-px bg-gray-200 absolute left-1/2 top-4"></div> <div class="space-y-2"> <p class="font-bold text-xs uppercase tracking-widest opacity-50">Nhà gái</p> <div class="text-sm space-y-1"> <p>Bố: ${bride.parents.father}</p> <p>Mẹ: ${bride.parents.mother}</p> </div> <p class="font-script text-2xl mt-4">${bride.name}</p> </div> </div>  <div class="pt-8 space-y-8"> <div class="inline-block p-1 border border-[color-mix(in_srgb,var(--secondary)_30%,transparent)]"> <div class="border border-[color-mix(in_srgb,var(--secondary)_10%,transparent)] p-4"> <p class="font-script text-3xl mb-2">Save the Date</p> <p class="text-2xl font-bold">10 . 05 . 2026</p> <p class="text-xs uppercase tracking-widest opacity-60">(10 tháng 4 năm Bính Ngọ)</p> </div> </div> <div class="space-y-4"> <p class="font-script text-3xl text-[var(--secondary)]">Wedding Ceremony</p> <div class="space-y-2 text-sm italic opacity-80"> <p>${isBrideMode ? wedding.brideCeremony.ceremonyTime : wedding.groomCeremony.ceremonyTime}</p> <p class="font-bold uppercase not-italic tracking-tighter text-lg"> ${isBrideMode ? wedding.brideCeremony.venue : wedding.groomCeremony.venue} </p> <p>${isBrideMode ? wedding.brideCeremony.address : wedding.groomCeremony.address}</p> </div> </div> </div> </div> ` })}`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/WeddingInfoStaticAW.astro", void 0);

const $$Astro$9 = createAstro();
const $$TimelineStaticAW = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$TimelineStaticAW;
  const { wedding, mode } = Astro2.props;
  const isBrideMode = mode === "bride";
  const events = [
    {
      time: "08:00",
      title: "L\u1EC5 Th\xE0nh H\xF4n",
      description: "L\u1EC5 r\u01B0\u1EDBc d\xE2u v\xE0 l\xE0m l\u1EC5 t\u1EA1i gia \u0111\xECnh",
      icon: "Heart"
    },
    {
      time: "10:00",
      title: "\u0110\xF3n Kh\xE1ch",
      description: "Ch\xE0o \u0111\xF3n qu\xFD quan kh\xE1ch t\u1EA1i s\u1EA3nh ti\u1EC7c",
      icon: "Clock"
    },
    {
      time: "11:00",
      title: "Khai Ti\u1EC7c",
      description: "N\xE2ng ly ch\xFAc m\u1EEBng h\u1EA1nh ph\xFAc l\u1EE9a \u0111\xF4i",
      icon: "Clock"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Reveal", $$Reveal, { "y": 20 }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-12"> <div class="text-center"> <p class="text-sm uppercase tracking-[0.3em] opacity-40 mb-2">Schedule</p> <h2 class="font-script text-4xl text-[var(--primary)]">Chương trình tiệc</h2> </div> <div class="relative">  <div class="absolute left-[17px] top-4 bottom-4 w-px bg-[color-mix(in_srgb,var(--secondary)_30%,transparent)]"></div> <div class="space-y-10"> ${events.map((item) => renderTemplate`<div class="flex gap-6 items-start relative"> <div class="w-9 h-9 rounded-full bg-white border border-[color-mix(in_srgb,var(--secondary)_30%,transparent)] flex items-center justify-center z-10 text-[var(--secondary)] shrink-0 shadow-sm"> ${item.icon === "Heart" ? renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"></path></svg>` : renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`} </div> <div class="flex-1 pt-1"> <p class="text-sm font-bold text-[var(--secondary)] tracking-widest">${item.time}</p> <h3 class="text-lg font-bold text-[var(--primary)] mt-1">${item.title}</h3> <p class="text-sm opacity-60 italic mt-1">${item.description}</p> </div> </div>`)} </div> </div>  <div class="p-6 bg-[color-mix(in_srgb,var(--primary)_5%,transparent)] rounded-xl border border-[color-mix(in_srgb,var(--primary)_5%,transparent)] text-center space-y-3"> <div class="flex justify-center text-[var(--secondary)] mb-2"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg> </div> <p class="text-sm font-bold opacity-80 uppercase tracking-widest">Địa điểm tổ chức</p> <p class="text-sm font-bold">${isBrideMode ? wedding.brideCeremony.venue : wedding.groomCeremony.venue}</p> <p class="text-xs opacity-60 italic">${isBrideMode ? wedding.brideCeremony.address : wedding.groomCeremony.address}</p> </div> </div> ` })}`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/TimelineStaticAW.astro", void 0);

const BANK_BINS = [
  { bin: "970436", keywords: ["vietcombank", "vcb", "ngoai thuong", "ngoại thương"] },
  { bin: "970415", keywords: ["vietinbank", "viettinbank", "ctg", "cong thuong", "công thương"] },
  { bin: "970418", keywords: ["bidv", "dau tu", "đầu tư"] },
  { bin: "970405", keywords: ["agribank", "agri", "nong nghiep", "nông nghiệp"] },
  { bin: "970422", keywords: ["mbbank", "mb bank", "quan doi", "quân đội", "mb"] },
  { bin: "970407", keywords: ["techcombank", "tcb", "ky thuong", "kỹ thương"] },
  { bin: "970416", keywords: ["acb", "a chau", "á châu"] },
  { bin: "970432", keywords: ["vpbank", "vp bank", "vpb"] },
  { bin: "970423", keywords: ["tpbank", "tp bank", "tien phong", "tiên phong"] },
  { bin: "970403", keywords: ["sacombank", "stb"] },
  { bin: "970443", keywords: ["shb"] },
  { bin: "970441", keywords: ["vib"] },
  { bin: "970426", keywords: ["msb", "maritime", "hang hai", "hàng hải"] },
  { bin: "970437", keywords: ["hdbank", "hd bank"] },
  { bin: "970431", keywords: ["eximbank", "eib"] },
  { bin: "970414", keywords: ["oceanbank", "ocean"] },
  { bin: "970429", keywords: ["scb"] },
  { bin: "970448", keywords: ["ocb", "phuong dong", "phương đông"] },
  { bin: "970454", keywords: ["vietcapital", "bvbank", "ban viet", "bản việt"] },
  { bin: "970440", keywords: ["seabank", "sea bank"] },
  { bin: "970419", keywords: ["ncb", "quoc dan", "quốc dân"] },
  { bin: "970438", keywords: ["baovietbank", "bao viet", "bảo việt"] },
  { bin: "970400", keywords: ["saigonbank", "sgb"] },
  { bin: "970409", keywords: ["bacabank", "bac a", "bắc á"] },
  { bin: "970425", keywords: ["abbank", "an binh", "an bình"] },
  { bin: "970427", keywords: ["vietabank", "viet a", "việt á"] },
  { bin: "970430", keywords: ["pgbank", "pg bank"] },
  { bin: "970434", keywords: ["indovina", "ivb"] },
  { bin: "970452", keywords: ["kienlongbank", "kien long", "kiên long"] },
  { bin: "546034", keywords: ["cake"] },
  { bin: "963388", keywords: ["timo"] }
];
function resolveBankBin(bankName) {
  const normalized = bankName.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();
  if (!normalized) return null;
  const candidates = BANK_BINS.flatMap(
    (bank) => bank.keywords.map((keyword) => ({
      bin: bank.bin,
      keyword: keyword.normalize("NFD").replace(/[̀-ͯ]/g, "")
    }))
  ).sort((a, b) => b.keyword.length - a.keyword.length);
  for (const { bin, keyword } of candidates) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`).test(normalized)) {
      return bin;
    }
  }
  return null;
}
function buildVietQrUrl$1({
  bankName,
  accountNumber,
  accountHolder,
  message
}) {
  const account = accountNumber?.trim();
  if (!account || !bankName?.trim()) return null;
  const bin = resolveBankBin(bankName);
  if (!bin) return null;
  const url = new URL(`https://img.vietqr.io/image/${bin}-${account}-compact2.png`);
  if (message?.trim()) url.searchParams.set("addInfo", message.trim());
  if (accountHolder?.trim())
    url.searchParams.set("accountName", accountHolder.trim());
  return url.toString();
}

const $$Astro$8 = createAstro();
const $$GiftingStaticAW = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$GiftingStaticAW;
  const { wedding, mode } = Astro2.props;
  const groomGift = wedding.gifting?.groom;
  const brideGift = wedding.gifting?.bride;
  const sides = [
    { label: "G\u1EEDi \u0111\u1EBFn Ch\xFA r\u1EC3", gift: groomGift },
    { label: "G\u1EEDi \u0111\u1EBFn C\xF4 d\xE2u", gift: brideGift }
  ];
  const cards = sides.flatMap(({ label, gift }) => {
    if (!gift?.accountNumber?.trim()) return [];
    return [
      {
        label,
        gift,
        qrUrl: buildVietQrUrl$1({
          bankName: gift.bankName ?? "",
          accountNumber: gift.accountNumber,
          accountHolder: gift.accountHolder,
          message: "Mung cuoi"
        })
      }
    ];
  });
  return renderTemplate`${cards.length > 0 && renderTemplate`${renderComponent($$result, "Reveal", $$Reveal, { "y": 20 }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="space-y-12"><div class="text-center"><p class="text-sm uppercase tracking-[0.3em] opacity-40 mb-2">Gifting</p><h2 class="font-script text-4xl text-[var(--primary)]">Hộp mừng cưới</h2></div><div class="flex flex-col items-center space-y-8"><div class="relative"><div class="w-24 h-24 bg-[var(--primary)] rounded-2xl flex items-center justify-center shadow-xl transform -rotate-3"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail text-[var(--bg-cream)]"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg></div><div class="absolute -top-2 -right-2 w-8 h-8 bg-[var(--secondary)] rounded-full flex items-center justify-center shadow-md animate-bounce"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart text-white fill-white"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"></path></svg></div></div><p class="text-sm text-center italic opacity-60 px-4">
Sự hiện diện của quý vị là niềm hạnh phúc lớn nhất của chúng tôi. Nếu quý vị muốn gửi món quà chúc phúc, có thể sử dụng thông tin dưới đây:
</p><div class="w-full space-y-6">${cards.map(({ label, gift, qrUrl }) => renderTemplate`<div class="p-6 border border-[color-mix(in_srgb,var(--secondary)_20%,transparent)] rounded-xl bg-white space-y-4"><p class="font-bold text-[var(--secondary)] text-xs uppercase tracking-widest text-center">${label}</p><div class="flex items-center gap-4"><div class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card opacity-40"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg></div><div class="flex-1 space-y-0.5"><p class="text-xs opacity-50 uppercase font-bold">${gift.bankName}</p><p class="font-bold text-[var(--primary)] tracking-wider">${gift.accountNumber}</p>${gift.accountHolder && renderTemplate`<p class="text-sm italic opacity-60">Chủ TK: ${gift.accountHolder}</p>`}</div></div>${qrUrl && renderTemplate`<div class="flex justify-center pt-2"><img${addAttribute(qrUrl, "src")}${addAttribute(`M\xE3 QR ${label}`, "alt")} class="w-40 h-40 object-contain"></div>`}</div>`)}</div></div></div>` })}`}`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/GiftingStaticAW.astro", void 0);

const $$Astro$7 = createAstro();
const $$FooterStaticAW = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$FooterStaticAW;
  const { wedding, mode } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<footer class="py-20 px-6 text-center space-y-6 relative overflow-hidden"> <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-[color-mix(in_srgb,var(--secondary)_30%,transparent)]"></div> ${renderComponent($$result, "Reveal", $$Reveal, { "y": 20 }, { "default": ($$result2) => renderTemplate` <div class="space-y-2"> <p class="font-script text-4xl text-[var(--primary)]">Thank You</p> <p class="text-sm opacity-60 tracking-widest uppercase">Trân trọng cảm ơn</p> </div> <p class="text-xs opacity-40 max-w-[200px] mx-auto italic mt-6">
Sự diện hiện của quý vị là món quà ý nghĩa nhất đối với chúng tôi.
</p> <div class="pt-10 opacity-30"> <svg width="40" height="40" viewBox="0 0 100 100" class="mx-auto fill-[var(--secondary)]"> <path d="M50,10 C60,40 80,40 50,90 C20,40 40,40 50,10"></path> </svg> </div> <div class="pt-10"> <p class="text-[10px] opacity-30 uppercase tracking-[0.4em]">© 2026 ${wedding.groomName} & ${wedding.brideName}</p> </div> ${wedding.status !== "PUBLISHED" && renderTemplate`<div class="pt-2"> <div class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-black/5"> <span class="text-[10px] font-medium text-black/60 tracking-wider">Tạo bởi</span> <img src="/logo-icon.png" alt="Logo" class="w-3.5 h-3.5 opacity-80"> <span class="text-[10px] font-bold text-black/80 tracking-wide">ThiepCuoiOnline.vn</span> </div> </div>`}` })} </footer>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/FooterStaticAW.astro", void 0);

function WeddingCardOpeningIslandAW({
  groomName,
  brideName,
  isBrideMode
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState();
  const [guestSalutation, setGuestSalutation] = useState();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setGuestName(params.get("guest") || params.get("name") || void 0);
    setGuestSalutation(params.get("salutation") || params.get("xung_ho") || void 0);
  }, []);
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);
  const handleOpen = () => setIsOpen(true);
  const firstName = isBrideMode ? brideName : groomName;
  const secondName = isBrideMode ? groomName : brideName;
  const displayName = guestSalutation && guestName ? `${guestSalutation} ${guestName}` : guestName;
  return /* @__PURE__ */ jsx(AnimatePresence, { children: !isOpen && /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 1 },
      exit: { opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } },
      className: "fixed inset-0 z-[100] flex items-center justify-center bg-[var(--primary)] overflow-hidden",
      children: [
        /* @__PURE__ */ jsx("div", { className: "leaves-container", children: [...Array(12)].map((_, i) => /* @__PURE__ */ jsx("span", { className: "leaf" }, i)) }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { duration: 0.8, ease: "easeOut" },
            className: "relative w-[320px] aspect-[3/4] bg-white rounded-lg shadow-2xl p-8 flex flex-col items-center justify-center text-center border-8 border-white ring-1 ring-[color-mix(in_srgb,var(--secondary)_20%,transparent)] cursor-pointer",
            onClick: handleOpen,
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -top-4 -right-4 w-24 h-24 opacity-60", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 100", className: "fill-[var(--secondary)]", children: [
                /* @__PURE__ */ jsx("path", { d: "M10,90 Q50,50 90,10", stroke: "currentColor", fill: "none" }),
                /* @__PURE__ */ jsx("circle", { cx: "90", cy: "10", r: "5" })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full border border-[color-mix(in_srgb,var(--secondary)_30%,transparent)] flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(Heart, { className: "w-8 h-8 text-[var(--secondary)] fill-[color-mix(in_srgb,var(--secondary)_10%,transparent)]" }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("p", { className: "font-script text-4xl text-[var(--primary)]", children: [
                  firstName,
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-2xl block my-1", children: "&" }),
                  " ",
                  secondName
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-px w-16 bg-[color-mix(in_srgb,var(--secondary)_30%,transparent)] mx-auto my-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm tracking-[0.2em] uppercase text-gray-500 font-bold", children: "10 tháng 5, 2026" }),
                displayName && /* @__PURE__ */ jsxs("div", { className: "mt-8 p-3 bg-gray-50 rounded-md border border-gray-100 italic", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-1", children: "Kính mời" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-[var(--primary)]", children: displayName })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "mt-10 px-8 py-3 bg-[var(--primary)] text-white rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform",
                    children: "Mở thiệp"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "absolute bottom-6 text-[10px] text-gray-400 tracking-widest uppercase", children: "Chạm để xem thiệp" })
            ]
          }
        )
      ]
    }
  ) });
}

function GalleryIslandAW({ images }) {
  const galleryImages = images.slice(2, 8);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm uppercase tracking-[0.3em] opacity-40 mb-2", children: "Moments" }),
      /* @__PURE__ */ jsx("h2", { className: "font-script text-4xl text-[var(--primary)]", children: "Album ảnh cưới" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: galleryImages.map((img, i) => {
      return /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { scale: 0.9, opacity: 0 },
          whileInView: { scale: 1, opacity: 1 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 cursor-pointer border border-white shadow-sm",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: img || "https://images.unsplash.com/photo-1544594081-347898b4807c?q=80&w=400",
              alt: "",
              className: "w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700",
              width: 400,
              height: 533,
              loading: "lazy"
            }
          )
        },
        i
      );
    }) }),
    galleryImages.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-center italic opacity-40", children: "Chưa có ảnh trong bộ sưu tập" })
  ] });
}

function WishesSliderIslandAW({ weddingId }) {
  const [wishes, setWishes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const fetchWishes = useCallback(async () => {
    if (!weddingId) return;
    try {
      const res = await fetch(`/api/wishes?weddingId=${weddingId}`);
      const data = await res.json();
      if (Array.isArray(data.wishes)) {
        setWishes(data.wishes);
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error("Error fetching wishes:", error);
    }
  }, [weddingId]);
  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);
  const canSubmit = name.trim().length > 1 && message.trim().length > 3 && status !== "submitting";
  async function onSubmit() {
    if (!canSubmit) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weddingId, name: name.trim(), message: message.trim() })
      });
      if (!res.ok) throw new Error("failed");
      setName("");
      setMessage("");
      setStatus("success");
      await fetchWishes();
      setTimeout(() => {
        setStatus("idle");
        setFormOpen(false);
      }, 2500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3e3);
    }
  }
  const hasWishes = wishes.length > 0;
  const next = () => setCurrentIndex((prev2) => (prev2 + 1) % wishes.length);
  const prev = () => setCurrentIndex((prev2) => (prev2 - 1 + wishes.length) % wishes.length);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm uppercase tracking-[0.3em] opacity-40 mb-2", children: "Guestbook" }),
      /* @__PURE__ */ jsx("h2", { className: "font-script text-4xl text-[var(--primary)]", children: "Sổ lưu bút" })
    ] }),
    hasWishes && /* @__PURE__ */ jsxs("div", { className: "relative pt-10 pb-16 px-4", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 opacity-10", children: /* @__PURE__ */ jsx(Quote, { className: "w-20 h-20 text-[var(--primary)] rotate-180" }) }),
      /* @__PURE__ */ jsx("div", { className: "relative h-[180px]", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { x: 100, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -100, opacity: 0 },
          transition: { duration: 0.5, ease: "easeInOut" },
          className: "absolute inset-0 flex flex-col items-center justify-center text-center px-8",
          children: [
            /* @__PURE__ */ jsxs("p", { className: "text-base italic leading-relaxed opacity-80 mb-6", children: [
              "“",
              wishes[currentIndex].message,
              "”"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-px w-8 bg-[color-mix(in_srgb,var(--secondary)_30%,transparent)] mb-4" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-[var(--primary)] uppercase tracking-widest text-xs", children: wishes[currentIndex].name })
          ]
        },
        currentIndex
      ) }) }),
      wishes.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-6 mt-4", children: [
          /* @__PURE__ */ jsx("button", { onClick: prev, className: "w-10 h-10 rounded-full border border-[color-mix(in_srgb,var(--primary)_10%,transparent)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-colors", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsx("button", { onClick: next, className: "w-10 h-10 rounded-full border border-[color-mix(in_srgb,var(--primary)_10%,transparent)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-colors", children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2 mt-8", children: wishes.map((_, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: `w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? "bg-[var(--primary)] w-4" : "bg-gray-300"}`
          },
          i
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-sm border border-gray-50 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm opacity-60 mb-6 font-bold uppercase tracking-widest", children: "Gửi lời chúc đến chúng mình" }),
      !formOpen ? /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setFormOpen(true),
          className: "w-full py-4 bg-[var(--primary)] text-white rounded-xl font-bold hover:shadow-xl transition-shadow",
          children: "Viết lời chúc"
        }
      ) : /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-left", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "Tên của bạn",
            className: "w-full px-4 py-3 rounded-xl border border-[color-mix(in_srgb,var(--primary)_15%,transparent)] bg-[color-mix(in_srgb,var(--bg-cream)_40%,transparent)] outline-none focus:border-[color-mix(in_srgb,var(--primary)_40%,transparent)] transition-colors"
          }
        ),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: message,
            onChange: (e) => setMessage(e.target.value),
            placeholder: "Gửi một lời chúc thật ấm áp...",
            rows: 4,
            className: "w-full px-4 py-3 rounded-xl border border-[color-mix(in_srgb,var(--primary)_15%,transparent)] bg-[color-mix(in_srgb,var(--bg-cream)_40%,transparent)] outline-none focus:border-[color-mix(in_srgb,var(--primary)_40%,transparent)] transition-colors resize-none"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setFormOpen(false),
              className: "flex-1 py-3 rounded-xl border border-[color-mix(in_srgb,var(--primary)_15%,transparent)] font-bold hover:bg-[var(--bg-cream)] transition-colors",
              children: "Hủy"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: onSubmit,
              disabled: !canSubmit,
              className: "flex-1 py-3 bg-[var(--primary)] text-white rounded-xl font-bold hover:shadow-xl transition-shadow disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2",
              children: [
                status === "submitting" && /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }),
                status === "submitting" ? "Đang gửi..." : "Gửi"
              ]
            }
          )
        ] }),
        status === "success" && /* @__PURE__ */ jsx("p", { className: "text-sm text-emerald-600 text-center", children: "Cảm ơn lời chúc của bạn!" }),
        status === "error" && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500 text-center", children: "Có lỗi xảy ra, vui lòng thử lại." })
      ] })
    ] })
  ] });
}

function BackgroundMusicIslandAW({ url }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsPlaying(true);
      }
    };
    window.addEventListener("click", handleFirstInteraction);
    return () => window.removeEventListener("click", handleFirstInteraction);
  }, [hasInteracted]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("audio", { ref: audioRef, src: url, loop: true }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-6 left-6 z-[60]", children: /* @__PURE__ */ jsxs(
      motion.button,
      {
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.9 },
        onClick: (e) => {
          e.stopPropagation();
          setIsPlaying(!isPlaying);
        },
        className: `w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${isPlaying ? "bg-[var(--primary)] text-white" : "bg-white text-[var(--primary)] border border-[color-mix(in_srgb,var(--primary)_10%,transparent)]"}`,
        children: [
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: isPlaying ? /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { rotate: 0 },
              animate: { rotate: 360 },
              transition: { duration: 4, repeat: Infinity, ease: "linear" },
              children: /* @__PURE__ */ jsx(Music2, { className: "w-5 h-5" })
            },
            "playing"
          ) : /* @__PURE__ */ jsx(motion.div, { children: /* @__PURE__ */ jsx(Music, { className: "w-5 h-5 opacity-40" }) }, "paused") }),
          isPlaying && /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full bg-[var(--primary)] animate-ping opacity-20" })
        ]
      }
    ) })
  ] });
}

const $$Astro$6 = createAstro();
const $$AutumnWatercolorPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$AutumnWatercolorPage;
  const { input } = Astro2.props;
  const { wedding, mode, googleFontsUrl, headingFont, bodyFont, scriptFont } = input;
  const isBrideMode = mode === "bride";
  const DEFAULT_SECTIONS = [
    "header",
    "info",
    "gallery",
    "timeline",
    "wishes",
    "gifting",
    "footer"
  ];
  const order = visibleSectionKeys(wedding.sectionOrder, DEFAULT_SECTIONS);
  const themeVars = [
    `--primary:${wedding.accentColor ?? "#422114"}`,
    `--secondary:${wedding.primaryColor ?? "#b9856f"}`,
    `--bg-cream:${wedding.backgroundColor ?? "#f7f1eb"}`,
    `--font-heading:${headingFont}`,
    `--font-body:${bodyFont}`,
    `--font-script:${scriptFont}`
  ].join(";");
  const musicUrl = wedding.backgroundMusic || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3";
  return renderTemplate`<html lang="vi" class="no-js"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Thiệp Cưới ${wedding.groomName} & ${wedding.brideName}</title>${googleFontsUrl && renderTemplate`<link${addAttribute(googleFontsUrl, "href")} rel="stylesheet">`}${renderHead()}</head> <body> <div class="autumn-watercolor-root min-h-screen relative"${addAttribute(`${themeVars}; font-family: var(--font-body)`, "style")}> ${renderComponent($$result, "WeddingCardOpeningIslandAW", WeddingCardOpeningIslandAW, { "client:load": true, "groomName": wedding.groomName, "brideName": wedding.brideName, "isBrideMode": isBrideMode, "client:component-hydration": "load", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/WeddingCardOpeningIslandAW", "client:component-export": "default" })} ${renderComponent($$result, "BackgroundMusicIslandAW", BackgroundMusicIslandAW, { "client:load": true, "url": musicUrl, "client:component-hydration": "load", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/BackgroundMusicIslandAW", "client:component-export": "default" })} ${renderComponent($$result, "ModeSwitcherStatic", $$ModeSwitcherStatic, { "mode": mode })} <main class="max-w-[500px] mx-auto shadow-xl overflow-hidden relative" style="background-color: var(--bg-cream)">  <div class="absolute top-0 left-0 w-full h-[300px] pointer-events-none watercolor-decor opacity-40 overflow-hidden"> <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="absolute -top-10 -left-10 w-48 h-48" style="fill: var(--secondary)"> <path d="M44.7,-76.4C58.2,-69.2,69.5,-57.4,77.4,-44.1C85.3,-30.8,89.7,-15.8,90.3,0.3C90.9,16.4,87.6,33.3,79.5,47.9C71.4,62.5,58.6,74.7,43.9,81.4C29.2,88.1,12.6,89.2,-2.9,94.2C-18.4,99.2,-36.8,108.1,-52,104.2C-67.2,100.3,-79.1,83.5,-87,66.6C-94.9,49.7,-98.7,32.7,-98.8,16.2C-98.9,-0.3,-95.2,-16.2,-88,-31C-80.8,-45.8,-70.1,-59.5,-57,-66.9C-43.9,-74.3,-28.4,-75.4,-14.2,-79.3C0,-83.1,14.2,-89.6,29.9,-85C45.6,-80.4,62.8,-64.8,44.7,-76.4Z" transform="translate(100 100)"></path> </svg> </div> ${order.map((id) => {
    switch (id) {
      case "header":
        return renderTemplate`<div${addAttribute(id, "data-section")}> ${renderComponent($$result, "InvitationHeaderStaticAW", $$InvitationHeaderStaticAW, { "wedding": wedding, "mode": mode })} </div>`;
      case "info":
        return renderTemplate`<div${addAttribute(id, "data-section")} class="py-16 px-6 relative z-10"> ${renderComponent($$result, "WeddingInfoStaticAW", $$WeddingInfoStaticAW, { "wedding": wedding, "mode": mode })} </div>`;
      case "gallery":
        return renderTemplate`<div${addAttribute(id, "data-section")} class="py-16 px-6 relative z-10"> ${renderComponent($$result, "GalleryIslandAW", GalleryIslandAW, { "client:load": true, "images": wedding.gallery, "weddingId": wedding.id, "client:component-hydration": "load", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/GalleryIslandAW", "client:component-export": "default" })} </div>`;
      case "timeline":
        return renderTemplate`<div${addAttribute(id, "data-section")} class="py-16 px-6 relative z-10"> ${renderComponent($$result, "TimelineStaticAW", $$TimelineStaticAW, { "wedding": wedding, "mode": mode })} </div>`;
      case "wishes":
        return renderTemplate`<div${addAttribute(id, "data-section")} class="py-16 px-4 sm:px-6 relative z-10 bg-[color-mix(in_srgb,var(--primary)_5%,transparent)]"> ${renderComponent($$result, "WishesSliderIslandAW", WishesSliderIslandAW, { "client:load": true, "weddingId": wedding.id, "client:component-hydration": "load", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/WishesSliderIslandAW", "client:component-export": "default" })} </div>`;
      case "gifting":
        return renderTemplate`<div${addAttribute(id, "data-section")} class="py-16 px-6 relative z-10"> ${renderComponent($$result, "GiftingStaticAW", $$GiftingStaticAW, { "wedding": wedding, "mode": mode })} </div>`;
      case "footer":
        return renderTemplate`<div${addAttribute(id, "data-section")}> ${renderComponent($$result, "FooterStaticAW", $$FooterStaticAW, { "wedding": wedding, "mode": mode })} </div>`;
      default:
        return null;
    }
  })} </main> ${renderComponent($$result, "GuestViewTrackerIsland", GuestViewTrackerIsland, { "client:load": true, "weddingSlug": wedding.slug, "client:component-hydration": "load", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/GuestViewTrackerIsland", "client:component-export": "default" })} </div>   </body> </html>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/components/AutumnWatercolorPage.astro", void 0);

const $$Astro$5 = createAstro();
const $$InvitationHeaderStaticT1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$InvitationHeaderStaticT1;
  const { data, heroImage, isBrideMode } = Astro2.props;
  const firstName = isBrideMode ? data.bride.name : data.groom.name;
  const secondName = isBrideMode ? data.groom.name : data.bride.name;
  return renderTemplate`${maybeRenderHead()}<section id="top" class="relative min-h-[100dvh] overflow-hidden p-0 w-full">  <div class="lg:hidden relative w-full h-full min-h-[100dvh]"> <div class="absolute inset-0"> <img${addAttribute(heroImage || "", "src")} alt="Wedding Background" class="w-full h-full object-cover object-[60%_50%]" loading="lazy"> <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" aria-hidden="true"></div> </div> <div class="absolute inset-0 z-10 flex flex-col justify-end pt-[max(env(safe-area-inset-top),0.75rem)] pb-[max(env(safe-area-inset-bottom),2rem)] pl-[max(env(safe-area-inset-left),1rem)] pr-[max(env(safe-area-inset-right),1rem)]"> <div class="max-w-xl mx-auto w-full"> ${renderComponent($$result, "Reveal", $$Reveal, {}, { "default": ($$result2) => renderTemplate` <div class="mb-2 sm:mb-3 text-center"> <svg class="w-6 h-6 sm:w-8 sm:h-8 text-gold fill-gold/20 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg> </div> ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "delay": "0.1s" }, { "default": ($$result2) => renderTemplate` <h2 class="text-gold text-[10px] sm:text-xs tracking-[0.35em] uppercase font-bold mb-2 sm:mb-4 text-center">
Tân Lang & Tân Nương
</h2> ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "delay": "0.2s", "className": "mb-4 sm:mb-6" }, { "default": ($$result2) => renderTemplate` <div class="flex items-center justify-between gap-4 w-full"> <h1 class="text-2xl sm:text-4xl lg:text-5xl font-script text-gold font-bold leading-tight drop-shadow-sm shrink-0"> ${firstName} </h1> <h1 class="text-2xl sm:text-4xl lg:text-5xl font-script text-gold font-bold leading-tight drop-shadow-sm shrink-0"> ${secondName} </h1> </div> ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "delay": "0.5s" }, { "default": ($$result2) => renderTemplate` <div class="flex flex-col items-center gap-2 sm:gap-4 w-full"> <p class="text-gold text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold">
Save the date
</p> <div class="h-px w-16 sm:w-24 bg-gold mx-auto" aria-hidden="true"></div> <div class="px-4 sm:px-6 py-2.5 sm:py-4 w-full max-w-sm text-center"> <p class="text-gold text-base sm:text-xl lg:text-2xl font-heading font-bold tracking-wide"> ${data.ceremony.solarDateLabel} </p> <p class="text-gold text-xs sm:text-sm font-heading mt-1">${data.ceremony.lunarDateLabel}</p> </div> </div> ` })} <div class="absolute bottom-6 right-4 opacity-40"> <svg class="w-8 h-8 sm:w-10 sm:h-10 text-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg> </div> </div> </div> </div>  <div class="hidden lg:flex min-h-screen items-center justify-center px-8 py-14 bg-burgundy"> <div class="w-full max-w-5xl overflow-hidden rounded-[40px] border border-gold/25 shadow-2xl relative"> <div class="flex min-h-[68vh] relative">  <div class="w-[52%] min-w-0 relative shrink-0"> <img${addAttribute(heroImage || "", "src")} alt="Wedding Background" class="w-full h-full object-cover object-center" loading="lazy"> </div>  <div class="relative flex-1 min-w-[380px] flex flex-col justify-center px-10 xl:px-16 py-12 bg-burgundy-dark text-gold overflow-visible"> ${renderComponent($$result, "Reveal", $$Reveal, {}, { "default": ($$result2) => renderTemplate` <div class="mb-4 text-center"> <svg class="w-10 h-10 text-gold fill-gold/20 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg> </div> ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "delay": "0.1s" }, { "default": ($$result2) => renderTemplate` <h2 class="text-gold/90 text-xs tracking-[0.4em] uppercase font-bold mb-6 text-center">
Tân Lang & Tân Nương
</h2> ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "delay": "0.2s", "className": "mb-8" }, { "default": ($$result2) => renderTemplate` <div class="flex items-center justify-between gap-6 w-full min-w-0"> <h1 class="text-3xl xl:text-4xl font-script text-gold font-bold leading-tight shrink-0 text-left"> ${firstName} </h1> <h1 class="text-3xl xl:text-4xl font-script text-gold font-bold leading-tight shrink-0 text-right"> ${secondName} </h1> </div> ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "delay": "0.4s" }, { "default": ($$result2) => renderTemplate` <div class="flex flex-col items-center gap-3 w-full"> <p class="text-gold/90 text-xs tracking-[0.3em] uppercase font-semibold">
Save the date
</p> <div class="h-px w-20 bg-gold/60 mx-auto" aria-hidden="true"></div> <div class="py-4 w-full max-w-sm text-center"> <p class="text-gold text-xl xl:text-2xl font-heading font-bold tracking-wide"> ${data.ceremony.solarDateLabel} </p> <p class="text-gold/80 text-sm font-heading mt-1">${data.ceremony.lunarDateLabel}</p> </div> </div> ` })} <div class="absolute bottom-8 right-8 opacity-30"> <svg class="w-10 h-10 text-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg> </div> </div> </div> </div> </div> </section>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/InvitationHeaderStaticT1.astro", void 0);

const $$Astro$4 = createAstro();
const $$WeddingInfoStaticT1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$WeddingInfoStaticT1;
  const { data, photo1, photo2, isBrideMode } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section id="thong-tin" class="relative overflow-hidden bg-white"> <div class="mx-auto max-w-6xl px-4 relative z-10"> ${renderComponent($$result, "Reveal", $$Reveal, { "y": 16 }, { "default": ($$result2) => renderTemplate` <div class="text-center py-8 sm:py-10"> <p class="text-lg sm:text-xl font-heading text-burgundy italic font-medium opacity-90">
&ldquo;Trăm năm tình viên mãn&rdquo;
</p> <p class="text-lg sm:text-xl font-heading text-burgundy italic font-medium opacity-90 mt-2">
&ldquo;Bạc đầu nghĩa phu thê&rdquo;
</p> </div> ` })}  <div class="grid grid-cols-[1fr_auto_1fr] gap-2 md:gap-12 mb-12 sm:mb-20 px-0 items-center">  ${renderComponent($$result, "Reveal", $$Reveal, { "x": -20 }, { "default": ($$result2) => renderTemplate` <div class="space-y-4 text-center border-t border-gold/20 pt-6"> <div class="flex flex-col items-center gap-2 mb-2"> <p class="text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.2em] text-burgundy font-bold whitespace-nowrap">Nhà trai</p> <div class="w-1 h-1 bg-gold/40 rounded-full"></div> </div> <div class="space-y-0.5"> <p class="text-base sm:text-xl text-ink-dark font-heading font-medium leading-relaxed whitespace-nowrap"> ${data.groom.parents.father} </p> <p class="text-base sm:text-xl text-ink-dark font-heading font-medium leading-relaxed whitespace-nowrap"> ${data.groom.parents.mother} </p> </div> </div> ` })}  <div class="h-24 w-px bg-gold/20 mx-auto"></div>  ${renderComponent($$result, "Reveal", $$Reveal, { "x": 20 }, { "default": ($$result2) => renderTemplate` <div class="space-y-4 text-center border-t border-gold/20 pt-6"> <div class="flex flex-col items-center gap-2 mb-2"> <p class="text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.2em] text-burgundy font-bold whitespace-nowrap">Nhà gái</p> <div class="w-1 h-1 bg-gold/40 rounded-full"></div> </div> <div class="space-y-0.5"> <p class="text-base sm:text-xl text-ink-dark font-heading font-medium leading-relaxed whitespace-nowrap"> ${data.bride.parents.father} </p> <p class="text-base sm:text-xl text-ink-dark font-heading font-medium leading-relaxed whitespace-nowrap"> ${data.bride.parents.mother} </p> </div> </div> ` })} </div>  <div class="max-w-4xl mx-auto"> ${renderComponent($$result, "Reveal", $$Reveal, { "y": 30 }, { "default": ($$result2) => renderTemplate` <div class="text-center space-y-6 relative"> ${(photo1 || photo2) && renderTemplate`<div class="relative h-64 sm:h-80 mb-8 mx-auto w-full max-w-md"> <div class="absolute top-0 left-0 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white -rotate-6 z-0 transition-transform hover:z-20 hover:scale-105 duration-500"> <img${addAttribute(photo1 || "", "src")} alt="Wedding 1" class="w-full h-full object-cover" loading="lazy"> </div> <div class="absolute top-10 right-0 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-6 z-10 transition-transform hover:z-20 hover:scale-105 duration-500"> <img${addAttribute(photo2 || "", "src")} alt="Wedding 2" class="w-full h-full object-cover" loading="lazy"> </div> </div>`} <div class="space-y-5"> <div class="flex flex-col gap-3 w-full max-w-4xl mx-auto"> <div class="text-left"> <span class="text-3xl sm:text-5xl lg:text-6xl font-script text-burgundy font-bold leading-relaxed drop-shadow-sm"> ${data.groom.name} </span> <span class="block text-base sm:text-lg font-heading text-ink-dark font-bold tracking-[0.2em] uppercase mt-1">
Trưởng Nam
</span> </div> <div class="text-right"> <span class="text-3xl sm:text-5xl lg:text-6xl font-script text-burgundy font-bold leading-relaxed drop-shadow-sm"> ${data.bride.name} </span> <span class="block text-base sm:text-lg font-heading text-ink-dark font-bold tracking-[0.2em] uppercase mt-1">
Ái Nữ
</span> </div> </div> <div class="h-px w-32 bg-gold mx-auto opacity-60"></div> <div class="space-y-4 mt-4"> <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6"> <div class="text-center"> <p class="text-ink/70 text-xs sm:text-sm uppercase tracking-wider font-semibold mb-0.5">Giờ làm lễ</p> <p class="text-4xl sm:text-5xl font-heading text-burgundy font-bold">${data.ceremony.timeLabel}</p> </div> <div class="w-px h-10 bg-gold/30 hidden sm:block"></div> <div class="text-center"> <p class="text-ink/70 text-xs sm:text-sm uppercase tracking-wider font-semibold mb-0.5">Giờ nhập tiệc</p> <p class="text-4xl sm:text-5xl font-heading text-burgundy font-bold">${data.ceremony.receptionTimeLabel}</p> </div> </div> <div class="space-y-1"> <p class="text-3xl sm:text-4xl text-ink-dark font-heading font-bold tracking-wide"> ${data.ceremony.solarDateLabel} </p> <p class="text-xl text-ink font-semibold"> ${data.ceremony.lunarDateLabel} </p> </div> </div> <div class="pt-6 border-t border-gold/20 inline-block px-8 mt-2"> <p class="text-base uppercase tracking-[0.4em] text-burgundy font-bold mb-3">
Địa điểm
</p> <p class="text-4xl text-ink-dark font-heading font-black tracking-tight mb-2 leading-tight"> ${data.ceremony.venueName} </p> <p class="text-xl text-ink font-bold max-w-[500px] mx-auto leading-relaxed"> ${data.ceremony.address} </p> </div> </div> </div> ` })} </div> </div> <div class="absolute top-20 right-[-5%] pointer-events-none select-none font-heading rotate-12 bg-bling-text"> <span class="block text-[4rem] sm:text-[10rem] lg:text-[20rem] text-burgundy/10 sm:text-burgundy/[0.05] lg:text-burgundy/[0.03]">
Love
</span> </div> </section>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/WeddingInfoStaticT1.astro", void 0);

const $$Astro$3 = createAstro();
const $$LocationStaticT1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$LocationStaticT1;
  const { data } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section id="dia-diem" class="relative lg:py-32 py-16 bg-paper" data-astro-cid-jnb4pc5n> <div class="mx-auto max-w-6xl px-4" data-astro-cid-jnb4pc5n> ${renderComponent($$result, "Reveal", $$Reveal, { "data-astro-cid-jnb4pc5n": true }, { "default": ($$result2) => renderTemplate` <div class="grid gap-16 md:grid-cols-12 md:gap-20 items-center" data-astro-cid-jnb4pc5n> <div class="md:col-span-5 text-center md:text-left" data-astro-cid-jnb4pc5n> <h2 class="text-burgundy font-bold uppercase tracking-[0.3em] text-base sm:text-lg mb-6" data-astro-cid-jnb4pc5n>Địa điểm tổ chức</h2> <h3 class="text-4xl sm:text-5xl lg:text-6xl font-heading text-ink-dark font-bold leading-tight mb-6" data-astro-cid-jnb4pc5n> ${data.ceremony.venueName} </h3> <p class="text-xl sm:text-2xl text-ink leading-relaxed mb-10 max-w-md mx-auto md:mx-0 font-medium" data-astro-cid-jnb4pc5n> ${data.ceremony.address} </p> <div class="flex flex-col gap-4" data-astro-cid-jnb4pc5n> <a${addAttribute(data.ceremony.googleMapsUrl, "href")} target="_blank" rel="noreferrer" class="cb-scale-btn inline-flex items-center justify-center px-10 py-4 bg-burgundy text-white text-base tracking-[0.3em] uppercase rounded-none hover:bg-burgundy-dark transition-all shadow-lg font-bold" data-astro-cid-jnb4pc5n>
Mở Google Maps
</a> <a href="#loi-chuc" class="cb-scale-btn inline-flex items-center justify-center px-10 py-4 border border-burgundy/20 bg-transparent text-burgundy text-sm tracking-[0.3em] uppercase transition-all font-bold hover:bg-[rgba(128,0,32,0.05)]" data-astro-cid-jnb4pc5n>
Xác nhận tham dự
</a> </div> </div> <div class="md:col-span-7" data-astro-cid-jnb4pc5n> <div class="content-card !p-0 overflow-hidden border border-gold/20 shadow-2xl scale-[1.02]" data-astro-cid-jnb4pc5n> <iframe title="Google Maps"${addAttribute(data.ceremony.googleMapsEmbedUrl, "src")} class="h-[400px] w-full lg:h-[480px] grayscale-[0.2] contrast-[1.1]" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen data-astro-cid-jnb4pc5n></iframe> </div> </div> </div> ` })} </div> </section> `;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/LocationStaticT1.astro", void 0);

const $$Astro$2 = createAstro();
const $$FooterStaticT1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$FooterStaticT1;
  const { data, isFreePlan } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="bg-paper pb-16 pt-16"> ${renderComponent($$result, "Reveal", $$Reveal, {}, { "default": ($$result2) => renderTemplate` <div class="mx-auto max-w-4xl text-center"> <div class="mx-auto h-px w-full max-w-6xl bg-[linear-gradient(90deg,transparent,rgba(58,13,26,0.18),transparent)]"></div> <p class="mt-10 text-lg sm:text-xl text-ink-dark font-medium">
Cảm ơn bạn đã dành thời gian cho ngày trọng đại của
</p> <p class="mt-2 text-2xl sm:text-3xl lg:text-4xl font-script text-burgundy font-bold whitespace-nowrap"> ${data.groom.name} &amp; ${data.bride.name} </p> <p class="mt-4 text-sm sm:text-base tracking-[0.32em] uppercase text-ink/70 font-semibold">Hẹn gặp bạn</p> ${isFreePlan && renderTemplate`<a href="https://thiepcuoi.studio" target="_blank" rel="noopener noreferrer" class="mt-6 text-ink/70 inline-block text-xs font-medium tracking-wide uppercase opacity-70 hover:opacity-100 transition-opacity">
Thiết kế bởi <b>ThiepCuoi.Studio</b> </a>`} </div> ` })} </section>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/FooterStaticT1.astro", void 0);

const $$Astro$1 = createAstro();
const $$QuoteStaticT1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$QuoteStaticT1;
  const { data, photo1, photo2 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative sm:py-40 py-16 overflow-hidden bg-paper"> <div class="container mx-auto max-w-7xl px-4 relative z-10">  ${(photo1 || photo2) && renderTemplate`<div class="lg:hidden grid grid-cols-2 gap-4 sm:gap-6 max-w-sm mx-auto mb-8 sm:mb-10"> ${renderComponent($$result, "Reveal", $$Reveal, { "x": -20 }, { "default": ($$result2) => renderTemplate` <div class="relative aspect-[3/4] rounded-2xl overflow-hidden border-[4px] border-white shadow-xl rotate-[-3deg]"> <img${addAttribute(photo1 || "", "src")} alt="Ảnh cưới" class="w-full h-full object-cover" loading="lazy"> </div> ` })} ${renderComponent($$result, "Reveal", $$Reveal, { "x": 20 }, { "default": ($$result2) => renderTemplate` <div class="relative aspect-[3/4] rounded-2xl overflow-hidden border-[4px] border-white shadow-xl rotate-[3deg] mt-6"> <img${addAttribute(photo2 || "", "src")} alt="Cô dâu" class="w-full h-full object-cover" loading="lazy"> </div> ` })} </div>`} <div class="relative grid grid-cols-12 gap-8 items-center">  ${photo1 && renderTemplate`<div class="hidden lg:block lg:col-span-4"> ${renderComponent($$result, "Reveal", $$Reveal, { "x": -40 }, { "default": ($$result2) => renderTemplate` <div class="relative aspect-[3/4] rounded-full overflow-hidden border-[6px] border-white shadow-2xl rotate-[-2deg] grayscale-[0.2] hover:grayscale-0 transition-all duration-700"> <img${addAttribute(photo1, "src")} alt="Ảnh cưới" class="w-full h-full object-cover scale-110" loading="lazy"> </div> ` })} </div>`}  <div class="col-span-12 lg:col-span-4 text-center px-4 space-y-6 sm:space-y-8"> ${renderComponent($$result, "Reveal", $$Reveal, {}, { "default": ($$result2) => renderTemplate` <div class="mb-6 flex justify-center opacity-30"> <svg class="w-10 h-10 text-burgundy fill-burgundy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg> </div> <p class="text-burgundy text-sm sm:text-base uppercase tracking-[0.35em] font-bold mb-4">
Trân trọng kính mời
</p> <p class="text-ink-dark text-lg sm:text-xl font-heading font-medium mb-4"> <span class="font-bold guest-name-placeholder">Quý khách</span> tới dự buổi tiệc chung vui cùng gia đình chúng tôi.
</p> <p class="text-ink-dark text-lg sm:text-xl font-heading font-medium mb-8">
Sự hiện diện của <span class="font-bold salutation-only-placeholder">bạn</span> là niềm vinh hạnh lớn lao cho gia đình chúng tôi.
</p> ${data.quote && renderTemplate`<p class="text-ink-dark text-base sm:text-lg italic font-medium mb-4">
&ldquo;${data.quote}&rdquo;
</p>`}<div class="h-px w-24 bg-gold mx-auto"></div> ` })} </div>  ${photo2 && renderTemplate`<div class="hidden lg:block lg:col-span-4"> ${renderComponent($$result, "Reveal", $$Reveal, { "x": 40 }, { "default": ($$result2) => renderTemplate` <div class="relative aspect-[3/4] rounded-t-full overflow-hidden border-[6px] border-white shadow-2xl rotate-[2deg] grayscale-[0.2] hover:grayscale-0 transition-all duration-700 mt-12"> <img${addAttribute(photo2, "src")} alt="Cô dâu" class="w-full h-full object-cover scale-110" loading="lazy"> </div> ` })} </div>`} </div> </div> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none italic font-heading text-burgundy bg-bling-text"> <span class="block text-[4rem] sm:text-[7rem] lg:text-[15rem] text-burgundy/10 sm:text-burgundy/[0.06] lg:text-burgundy/[0.03]">
Forever
</span> </div> </section>`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/static/QuoteStaticT1.astro", void 0);

function WeddingCardOpeningIslandT1() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayName, setDisplayName] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get("guest");
    if (guest) {
      setDisplayName(guest);
    }
  }, []);
  useEffect(() => {
    if (!isOpen) {
      const html = document.documentElement;
      const body = document.body;
      const prevHtml = html.style.overflow;
      const prevBody = body.style.overflow;
      const prevBodyHeight = body.style.height;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.height = "100%";
      return () => {
        html.style.overflow = prevHtml;
        body.style.overflow = prevBody;
        body.style.height = prevBodyHeight;
      };
    }
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.height = "";
  }, [isOpen]);
  const handleOpen = () => {
    setIsOpen(true);
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: !isOpen && /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 1 },
      exit: { opacity: 0, transition: { duration: 1, ease: "easeInOut" } },
      className: "fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#70261B]",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden card-cover-bling-layer", "aria-hidden": true, children: [
          /* @__PURE__ */ jsx("div", { className: "card-cover-bling-shimmer" }),
          /* @__PURE__ */ jsx("div", { className: "card-cover-bling-sparkles", children: [...Array(9)].map((_, i) => /* @__PURE__ */ jsx("span", { className: "bling-sparkle", "aria-hidden": true }, i)) })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative w-[min(90vw,320px)] sm:w-[min(85vw,360px)] md:max-w-[380px] aspect-[3/4] max-h-[80vh] shrink-0 cursor-pointer mx-auto",
            onClick: handleOpen,
            role: "button",
            tabIndex: 0,
            onKeyDown: (e) => e.key === "Enter" && handleOpen(),
            "aria-label": "Chạm để mở thiệp",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-[-20px] h-10 bg-black/20 blur-xl rounded-full" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white shadow-sm rounded-lg border border-gold/5" }),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "absolute inset-0 z-10 origin-left",
                  whileHover: { rotateY: -10 },
                  transition: { type: "spring", stiffness: 100, damping: 20 },
                  children: /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-white border border-gold/10 rounded-lg shadow-2xl flex flex-col items-center justify-center p-6 sm:p-8 text-center overflow-hidden", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]", "aria-hidden": true }),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-4 border border-gold/20 pointer-events-none", "aria-hidden": true }),
                    /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-6 relative shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-full overflow-hidden flex items-center justify-center shadow-lg border border-burgundy/20 bg-white p-1.5", children: /* @__PURE__ */ jsx("img", { src: "/images/logo.png", alt: "Logo", width: 56, height: 56, className: "w-14 h-14 sm:w-[68px] sm:h-[68px] object-contain shrink-0" }) }) }),
                    /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        initial: { y: 10, opacity: 0 },
                        animate: { y: 0, opacity: 1 },
                        transition: { delay: 0.3, duration: 0.4 },
                        className: "relative z-10 shrink-0",
                        children: [
                          displayName && /* @__PURE__ */ jsxs("p", { className: "text-burgundy/90 text-sm sm:text-base font-heading font-bold mb-3", children: [
                            "Kính gửi: ",
                            /* @__PURE__ */ jsx("span", { className: "font-bold text-burgundy", children: displayName })
                          ] }),
                          /* @__PURE__ */ jsx("p", { className: "text-burgundy text-sm sm:text-base tracking-[0.4em] uppercase font-bold mb-4", children: "Trân trọng báo tin" }),
                          /* @__PURE__ */ jsx("div", { className: "h-px w-24 bg-gold/40 mx-auto mb-6" }),
                          /* @__PURE__ */ jsxs("div", { className: "mb-8 space-y-2", children: [
                            /* @__PURE__ */ jsx("p", { className: "text-3xl sm:text-4xl font-script text-burgundy font-bold", children: "Thanh Tùng" }),
                            /* @__PURE__ */ jsx("p", { className: "text-xl sm:text-2xl font-script text-gold", children: "&" }),
                            /* @__PURE__ */ jsx("p", { className: "text-3xl sm:text-4xl font-script text-burgundy font-bold", children: "Hương Giang" })
                          ] }),
                          /* @__PURE__ */ jsx("h2", { className: "text-lg sm:text-xl font-heading text-ink-dark/60 italic mb-8", children: "(Chạm để mở thiệp)" }),
                          /* @__PURE__ */ jsx(
                            motion.div,
                            {
                              animate: { scale: [1, 1.1, 1] },
                              transition: { duration: 2, repeat: Infinity },
                              className: "text-gold/60",
                              children: /* @__PURE__ */ jsx(Heart, { className: "w-8 h-8 fill-gold/10 mx-auto" })
                            }
                          )
                        ]
                      }
                    )
                  ] })
                }
              )
            ]
          }
        )
      ]
    }
  ) });
}

function clampNonNegative(n) {
  return Math.max(0, n);
}
function getParts(targetMs) {
  const now = Date.now();
  const diff = clampNonNegative(targetMs - now);
  const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1e3 * 60 * 60) % 24);
  const minutes = Math.floor(diff / (1e3 * 60) % 60);
  const seconds = Math.floor(diff / 1e3 % 60);
  return { days, hours, minutes, seconds };
}
function NumberFlip({ value }) {
  return /* @__PURE__ */ jsx("div", { className: "relative h-[3.5rem] sm:h-[4.5rem] overflow-hidden", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", initial: false, children: /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
      className: "absolute inset-0 flex items-center justify-center",
      children: /* @__PURE__ */ jsx("span", { className: "tabular-nums text-4xl sm:text-5xl lg:text-6xl font-heading text-burgundy font-medium tracking-tight", children: value })
    },
    value
  ) }) });
}
function CountdownIslandT1({ dateLabel, startsAtISO, image }) {
  const targetMs = useMemo(() => new Date(startsAtISO).getTime(), [startsAtISO]);
  const [parts, setParts] = useState(() => getParts(targetMs));
  useEffect(() => {
    const id = setInterval(() => setParts(getParts(targetMs)), 1e3);
    return () => clearInterval(id);
  }, [targetMs]);
  const items = [
    { label: "Ngày", value: String(parts.days).padStart(2, "0") },
    { label: "Giờ", value: String(parts.hours).padStart(2, "0") },
    { label: "Phút", value: String(parts.minutes).padStart(2, "0") },
    { label: "Giây", value: String(parts.seconds).padStart(2, "0") }
  ];
  return /* @__PURE__ */ jsx("section", { id: "countdown", className: "relative py-16 sm:py-20 overflow-hidden bg-paper", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl px-4 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-16 lg:grid-cols-12 items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-6", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -30 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        className: "relative aspect-[4/5] sm:aspect-square rounded-t-full overflow-hidden border-[8px] border-white shadow-2xl transition-transform hover:scale-[1.01] duration-700",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: image || "",
              alt: "Together",
              className: "w-full h-full object-cover scale-105",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-burgundy/5" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left mb-12", children: [
            /* @__PURE__ */ jsx("h2", { className: "title-primary text-lg sm:text-xl font-bold mb-6 tracking-[0.25em]", children: "Đếm ngược ngày trọng đại" }),
            /* @__PURE__ */ jsx("div", { className: "h-px w-24 bg-gold mx-auto lg:mx-0 opacity-60" }),
            /* @__PURE__ */ jsx("p", { className: "mt-8 text-4xl sm:text-5xl font-heading text-burgundy font-bold tracking-tight", children: dateLabel })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.1 },
          children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-6", children: items.map((item) => /* @__PURE__ */ jsxs("div", { className: "bg-white/40 backdrop-blur-md border border-gold/10 p-6 rounded-2xl shadow-sm text-center group hover:bg-white/60 transition-colors duration-500", children: [
            /* @__PURE__ */ jsx(NumberFlip, { value: item.value }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm sm:text-base tracking-[0.3em] uppercase text-ink font-bold", children: item.label })
          ] }, item.label)) })
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.3 },
          children: /* @__PURE__ */ jsx("div", { className: "mt-16 text-center lg:text-left italic text-ink/70 text-lg font-heading", children: "“Dù đi đâu, làm gì, chỉ cần chúng ta bên nhau.”" })
        }
      )
    ] })
  ] }) }) });
}

function GalleryItem({ src, alt, className, parallax }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 0"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      style: { y },
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2 },
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
      className: `${className} group relative bg-white p-3 sm:p-4 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05),0_4px_10px_-5px_rgba(128,0,32,0.02)] hover:shadow-2xl transition-all duration-500`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "relative aspect-[3/4] overflow-hidden bg-[#FDFBF7]", children: /* @__PURE__ */ jsx(
          "img",
          {
            src,
            alt,
            loading: "lazy",
            className: "h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "h-1 w-8 bg-gold/20 rounded-full" }) })
      ]
    }
  );
}
function GalleryIslandT1({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (src) => {
    setSelectedImage(src);
  };
  const handleClose = () => {
    setSelectedImage(null);
  };
  return /* @__PURE__ */ jsxs("section", { id: "anh", className: "relative py-24 lg:py-32 overflow-hidden bg-paper", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-20", children: [
            /* @__PURE__ */ jsx("h2", { className: "title-primary text-lg sm:text-xl font-bold mb-6 tracking-[0.25em]", children: "Bộ ảnh kỷ niệm" }),
            /* @__PURE__ */ jsx("div", { className: "h-px w-24 bg-gold mx-auto opacity-60" }),
            /* @__PURE__ */ jsx("p", { className: "mt-8 text-3xl sm:text-4xl font-heading text-ink italic opacity-90 leading-tight", children: "“Những khoảnh khắc chúng mình yêu nhất.”" })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16", children: gallery.map((item, index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: `${index % 2 === 0 ? "lg:translate-y-12" : "lg:-translate-y-12"} transition-transform`,
          onClick: () => handleImageClick(item.src),
          children: /* @__PURE__ */ jsx(
            GalleryItem,
            {
              src: item.src,
              alt: item.alt,
              className: "w-full cursor-pointer",
              parallax: index % 2 === 0 ? 20 : -20
            }
          )
        },
        item.src
      )) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.1 },
          children: /* @__PURE__ */ jsx("div", { className: "mt-16 text-center text-base sm:text-lg text-ink/60 italic font-medium", children: "Tình yêu không chỉ là nhìn nhau, mà là cùng nhau nhìn về một hướng." })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: selectedImage && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm",
        onClick: handleClose,
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.9, opacity: 0 },
            className: "relative max-w-5xl max-h-[85vh] overflow-hidden rounded-lg shadow-2xl",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleClose,
                  className: "absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-all z-20",
                  children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "lucide lucide-x", children: [
                    /* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }),
                    /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: selectedImage,
                  alt: "Gallery Fullscreen",
                  className: "w-full h-full object-contain max-h-[85vh]"
                }
              )
            ]
          }
        )
      }
    ) })
  ] });
}

function RSVPIslandT1({ weddingId }) {
  const [choice, setChoice] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get("guest");
    if (guest) setName(guest);
  }, []);
  const message = useMemo(() => {
    if (choice === "yes") return "Rất hân hạnh được đón tiếp bạn trong ngày trọng đại của chúng mình!";
    if (choice === "no") return "Chúng mình rất tiếc nhưng hoàn toàn thông cảm. Cảm ơn bạn đã gửi lời chúc!";
    return "";
  }, [choice]);
  const canSubmit = name.trim().length > 1 && choice !== null && status !== "submitting";
  async function submit() {
    if (!canSubmit || !choice) return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId,
          guestName: name.trim(),
          attendance: choice === "yes" ? "accept" : "decline"
        })
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const err = await res.json().catch(() => ({}));
        setErrorMsg(err.error ?? "Không gửi được xác nhận, vui lòng thử lại.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Không gửi được xác nhận, vui lòng thử lại.");
      setStatus("error");
    }
  }
  return /* @__PURE__ */ jsx("section", { id: "rsvp", className: "relative py-24 lg:py-32 bg-paper", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl px-4", children: /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      children: /* @__PURE__ */ jsxs("div", { className: "content-card text-center relative overflow-hidden bg-white/60 backdrop-blur-md border border-gold/10 p-8 sm:p-12 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05),0_4px_10px_-5px_rgba(128,0,32,0.02)] rounded-[40px]", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 opacity-5 rotate-12", children: /* @__PURE__ */ jsx(Heart, { className: "w-24 h-24 text-burgundy fill-burgundy" }) }),
        /* @__PURE__ */ jsxs("h2", { className: "title-primary text-lg sm:text-xl font-bold mb-6 flex items-center justify-center gap-4 tracking-[0.25em]", children: [
          /* @__PURE__ */ jsx(Flower, { className: "w-5 h-5 text-gold/60" }),
          "Xác nhận tham dự",
          /* @__PURE__ */ jsx(Flower, { className: "w-5 h-5 text-gold/60" })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl sm:text-5xl font-heading text-ink-dark font-black mb-12 leading-relaxed max-w-3xl mx-auto", children: "Quý khách có thể tham dự lễ cưới cùng chúng tôi không?" }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-6 sm:grid-cols-2 mt-12", children: [
          /* @__PURE__ */ jsx(
            motion.button,
            {
              type: "button",
              whileHover: { scale: 1.02 },
              whileTap: { scale: 0.98 },
              onClick: () => setChoice("yes"),
              disabled: status === "success",
              className: `p-10 text-center transition-all duration-500 border-2 rounded-none disabled:opacity-70 ${choice === "yes" ? "border-burgundy bg-burgundy text-white shadow-2xl" : "border-gold/20 bg-cream-light/30 text-burgundy hover:bg-[#FDFBF7] hover:border-gold/50"}`,
              children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-5", children: [
                /* @__PURE__ */ jsx("div", { className: `p-4 rounded-full ${choice === "yes" ? "bg-white/20" : "bg-gold/10"}`, children: /* @__PURE__ */ jsx(Heart, { className: `w-8 h-8 ${choice === "yes" ? "text-white fill-white" : "text-burgundy fill-burgundy/20"}` }) }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-base tracking-[0.2em] font-black uppercase", children: "Sẽ tham dự" }),
                  /* @__PURE__ */ jsx("p", { className: `text-sm sm:text-base font-heading italic ${choice === "yes" ? "text-white/80" : "text-ink/60"}`, children: "Hân hạnh được chung vui cùng hai bạn" })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.button,
            {
              type: "button",
              whileHover: { scale: 1.02 },
              whileTap: { scale: 0.98 },
              onClick: () => setChoice("no"),
              disabled: status === "success",
              className: `p-10 text-center transition-all duration-500 border-2 rounded-none disabled:opacity-70 ${choice === "no" ? "border-burgundy bg-burgundy text-white shadow-2xl" : "border-gold/20 bg-cream-light/30 text-burgundy hover:bg-[#FDFBF7] hover:border-gold/50"}`,
              children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-5", children: [
                /* @__PURE__ */ jsx("div", { className: `p-4 rounded-full ${choice === "no" ? "bg-white/20" : "bg-gold/10"}`, children: /* @__PURE__ */ jsx(Flower, { className: `w-8 h-8 ${choice === "no" ? "text-white" : "text-burgundy"}` }) }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-base tracking-[0.2em] font-black uppercase", children: "Vắng mặt" }),
                  /* @__PURE__ */ jsx("p", { className: `text-sm sm:text-base font-heading italic ${choice === "no" ? "text-white/80" : "text-ink/60"}`, children: "Rất tiếc vì không thể tham dự" })
                ] })
              ] })
            }
          )
        ] }),
        choice && status !== "success" && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
            className: "mt-12 max-w-md mx-auto space-y-4",
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  placeholder: "Tên của bạn",
                  className: "w-full px-5 py-4 text-center bg-[#FDFBF7]/50 border-2 border-gold/20 text-ink-dark placeholder:text-ink/40 focus:outline-none focus:border-burgundy transition-colors"
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: submit,
                  disabled: !canSubmit,
                  className: "w-full px-8 py-4 bg-burgundy text-white text-sm tracking-[0.2em] font-black uppercase transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                  children: [
                    status === "submitting" && /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }),
                    status === "submitting" ? "Đang gửi..." : "Gửi xác nhận"
                  ]
                }
              ),
              status === "error" && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: errorMsg })
            ]
          }
        ),
        status === "success" && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
            className: "mt-12 p-6 bg-[#FDFBF7] rounded-none border border-gold/10",
            children: [
              /* @__PURE__ */ jsx("p", { className: "text-lg font-heading text-ink-dark italic", children: message }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsx("img", { src: "/images/logo.png", alt: "Logo", width: 80, height: 40, className: "h-10 w-20 object-contain" }) })
            ]
          }
        )
      ] })
    }
  ) }) });
}

function WishesIslandT1({ weddingId }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [wishes, setWishes] = useState([]);
  const [status, setStatus] = useState("idle");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get("guest");
    if (guest) setName(guest);
  }, []);
  const fetchWishes = useCallback(async () => {
    if (!weddingId) return;
    try {
      const res = await fetch(`/api/wishes?weddingId=${weddingId}`);
      const data = await res.json();
      if (Array.isArray(data.wishes)) setWishes(data.wishes);
    } catch (error) {
      console.error("Error fetching wishes:", error);
    }
  }, [weddingId]);
  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);
  const canSubmit = useMemo(
    () => name.trim().length > 1 && message.trim().length > 3 && attendance !== null && status !== "submitting",
    [name, message, attendance, status]
  );
  async function onSubmit() {
    if (!canSubmit) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId,
          name: name.trim(),
          message: message.trim(),
          attendance: attendance === "yes" ? "Tham dự" : "Rất tiếc không thể"
        })
      });
      if (!res.ok) throw new Error("Gửi lời chúc thất bại");
      setName("");
      setMessage("");
      setAttendance(null);
      setStatus("success");
      await fetchWishes();
      setTimeout(() => setStatus("idle"), 3e3);
    } catch (error) {
      console.error("Error saving wish:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3e3);
    }
  }
  return /* @__PURE__ */ jsx("section", { id: "loi-chuc", className: "relative py-16 sm:py-20 overflow-hidden bg-paper", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-6xl px-4 relative z-10", children: /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      children: /* @__PURE__ */ jsxs("div", { className: "grid gap-16 lg:grid-cols-12 items-start", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-12 xl:col-span-5", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-24", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm tracking-[0.42em] uppercase text-burgundy font-bold transition-all", children: "Gửi lời chúc & Xác nhận" }),
          /* @__PURE__ */ jsxs("h2", { className: "mt-4 text-4xl sm:text-5xl font-heading text-ink-dark leading-tight", children: [
            "Lời chúc gửi trao,",
            /* @__PURE__ */ jsx("br", {}),
            "Niềm vui trọn vẹn."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 text-base sm:text-lg text-ink-dark leading-relaxed mb-10 font-medium", children: "Sự hiện diện và lời chúc của khách mời là món quà vô giá mà chúng mình trân quý nhất. Hãy cho tụi mình biết bạn có thể tham gia được không nhé!" }),
          /* @__PURE__ */ jsx("div", { className: "relative aspect-[3/2] sm:aspect-[4/5] rounded-[40px] overflow-hidden border-[6px] border-white shadow-2xl rotate-[-1deg] hover:rotate-0 transition-all duration-700", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=1200",
              alt: "Love",
              className: "w-full h-full object-cover scale-105"
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-12 xl:col-span-7", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-[40px] border border-gold/10 bg-white/60 backdrop-blur-xl p-8 sm:p-12 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05),0_4px_10px_-5px_rgba(128,0,32,0.02)] relative overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-burgundy/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-8 relative z-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
                /* @__PURE__ */ jsxs("label", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm tracking-[0.32em] uppercase text-ink/60 font-bold ml-2", children: "Bạn có thể tham dự chứ?" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-2", children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => setAttendance("yes"),
                        className: `flex-1 py-4 rounded-2xl border transition-all text-base font-medium text-center flex flex-col items-center gap-0.5 ${attendance === "yes" ? "bg-burgundy text-white border-burgundy shadow-lg" : "bg-white/50 border-gold/10 text-ink/60 hover:border-burgundy/30"}`,
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "block", children: "Chắc chắn" }),
                          /* @__PURE__ */ jsxs("span", { className: "block", children: [
                            /* @__PURE__ */ jsx("span", { className: "align-middle", children: "rồi" }),
                            " ",
                            /* @__PURE__ */ jsx("span", { className: "text-lg align-middle", "aria-hidden": true, children: "🥂" })
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => setAttendance("no"),
                        className: `flex-1 py-4 rounded-2xl border transition-all text-base font-medium text-center flex flex-col items-center gap-0.5 ${attendance === "no" ? "bg-burgundy text-white border-burgundy shadow-lg" : "bg-white/50 border-gold/10 text-ink/60 hover:border-burgundy/30"}`,
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "block", children: "Rất tiếc, mình" }),
                          /* @__PURE__ */ jsxs("span", { className: "block", children: [
                            /* @__PURE__ */ jsx("span", { className: "align-middle", children: "bận" }),
                            " ",
                            /* @__PURE__ */ jsx("span", { className: "text-lg align-middle", "aria-hidden": true, children: "💐" })
                          ] })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm tracking-[0.32em] uppercase text-ink/60 font-bold ml-2", children: "Tên của bạn" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      value: name,
                      onChange: (e) => setName(e.target.value),
                      className: "h-16 rounded-2xl border border-gold/10 bg-white/50 px-6 text-base outline-none focus:border-burgundy/30 transition-all shadow-sm font-medium",
                      placeholder: "Ví dụ: Anh xã, Chị đại..."
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm tracking-[0.32em] uppercase text-ink/60 font-bold ml-2", children: "Lời chúc yêu thương" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      value: message,
                      onChange: (e) => setMessage(e.target.value),
                      className: "min-h-[160px] rounded-2xl border border-gold/10 bg-white/50 px-6 py-4 text-base outline-none focus:border-burgundy/30 transition-all shadow-sm resize-none font-medium",
                      placeholder: "Gửi một lời chúc thật ấm áp..."
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-6 pt-4", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-ink/50 tracking-wider font-medium italic", children: "Lời chúc của bạn sẽ được gửi tới cô dâu chú rể." }),
                /* @__PURE__ */ jsx(
                  motion.button,
                  {
                    type: "button",
                    whileHover: canSubmit ? { scale: 1.05 } : {},
                    whileTap: canSubmit ? { scale: 0.95 } : {},
                    onClick: onSubmit,
                    disabled: !canSubmit,
                    className: `inline-flex items-center justify-center rounded-none px-12 py-5 text-sm tracking-[0.3em] uppercase transition-all duration-300 shadow-xl min-w-[240px] font-bold ${status === "submitting" ? "bg-burgundy/50 text-white cursor-wait" : canSubmit ? "bg-burgundy text-white hover:bg-burgundy-dark" : "bg-burgundy/5 text-burgundy/20 cursor-not-allowed"}`,
                    children: status === "submitting" ? "Đang gửi..." : "Gửi lời chúc & Xác nhận"
                  }
                )
              ] }),
              status === "success" && /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  className: "text-center text-sm font-medium text-emerald-600 mt-4",
                  children: "Đã gửi thành công! Cảm ơn bạn thật nhiều. ✨"
                }
              ),
              status === "error" && /* @__PURE__ */ jsx("p", { className: "text-center text-sm font-medium text-red-500 mt-4", children: "Có lỗi xảy ra, bạn vui lòng thử lại nhé!" })
            ] })
          ] }),
          wishes.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-16 grid gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gold/20" }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.5em] uppercase text-burgundy font-bold", children: "Lời chúc gần đây" }),
              /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gold/20" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid gap-6", children: wishes.slice(0, 8).map((wish) => /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                className: "rounded-3xl border border-gold/10 bg-white/40 backdrop-blur-md px-10 py-8 shadow-sm border-l-4 border-l-burgundy/40 relative overflow-hidden group hover:bg-white/60 transition-colors",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-gold/[0.03] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.3em] uppercase text-burgundy font-bold mb-4", children: wish.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-base sm:text-lg text-ink-dark/80 leading-relaxed font-heading italic relative z-10", children: [
                    "“",
                    wish.message,
                    "”"
                  ] })
                ]
              },
              wish.id
            )) })
          ] })
        ] })
      ] })
    }
  ) }) });
}

function buildVietQrUrl({
  bankName,
  accountNumber,
  accountHolder,
  message
}) {
  if (!bankName || !accountNumber) return "";
  const cleanBankName = bankName.trim();
  const cleanAccountNumber = accountNumber.trim().replace(/\s+/g, "");
  let qrUrl = `https://img.vietqr.io/image/${cleanBankName}-${cleanAccountNumber}-compact.png`;
  const queryParams = new URLSearchParams();
  if (accountHolder) {
    queryParams.append("accountName", accountHolder);
  }
  {
    queryParams.append("addInfo", message);
  }
  const queryString = queryParams.toString();
  if (queryString) {
    qrUrl += `?${queryString}`;
  }
  return qrUrl;
}
function GiftingIslandT1({ data }) {
  const [showDetails, setShowDetails] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const gifting = data.gifting;
  const groomQrUrl = buildVietQrUrl({
    bankName: gifting?.groom?.bankName ?? "",
    accountNumber: gifting?.groom?.accountNumber ?? "",
    accountHolder: gifting?.groom?.accountName,
    message: "Mung cuoi"
  });
  const brideQrUrl = buildVietQrUrl({
    bankName: gifting?.bride?.bankName ?? "",
    accountNumber: gifting?.bride?.accountNumber ?? "",
    accountHolder: gifting?.bride?.accountName,
    message: "Mung cuoi"
  });
  const hasGroom = Boolean(gifting?.groom?.accountNumber?.trim());
  const hasBride = Boolean(gifting?.bride?.accountNumber?.trim());
  if (!gifting || !hasGroom && !hasBride) return null;
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2e3);
  };
  return /* @__PURE__ */ jsx("section", { id: "qua-tang", className: "bg-[#FDFBF7] overflow-hidden py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-5xl px-4 relative z-10", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsx(Gift, { className: "w-10 h-10 text-burgundy opacity-40" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-heading text-ink-dark leading-tight mb-4", children: "Gửi Quà Yêu Thương" }),
          /* @__PURE__ */ jsx("div", { className: "h-px w-16 bg-gold mx-auto mb-6" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm sm:text-base text-ink/60 leading-relaxed max-w-lg mx-auto italic font-medium", children: [
            "Sự hiện diện của bạn là món quà lớn nhất. ",
            /* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
            "Nếu bạn muốn dành tặng một món quà ý nghĩa, tụi mình xin trân trọng cảm ơn."
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: 0.2 },
        children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs(
          motion.button,
          {
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            onClick: () => setShowDetails(!showDetails),
            className: "group flex items-center gap-3 px-10 py-4 bg-burgundy text-white text-[10px] tracking-[0.4em] uppercase font-bold transition-all shadow-xl hover:bg-burgundy-dark",
            children: [
              showDetails ? "Thu gọn thông tin" : "Xem thông tin gửi quà",
              showDetails ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4" })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: showDetails && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.5, ease: "easeInOut" },
        className: "overflow-hidden mt-12",
        children: /* @__PURE__ */ jsxs("div", { className: `grid gap-8 lg:gap-12 ${hasGroom && hasBride ? "md:grid-cols-2" : "max-w-md mx-auto"}`, children: [
          hasGroom && /* @__PURE__ */ jsxs("div", { className: "bg-white/60 backdrop-blur-md rounded-[32px] border border-gold/10 p-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05),0_4px_10px_-5px_rgba(128,0,32,0.02)] flex flex-col items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-6 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.3em] uppercase text-burgundy font-bold mb-2", children: "Chú rể" }),
              /* @__PURE__ */ jsx("p", { className: "text-xl font-heading text-ink-dark font-bold", children: data.groom.name })
            ] }),
            groomQrUrl && /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-2xl shadow-inner border border-gold/5 mb-6 relative group overflow-hidden", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: groomQrUrl,
                  alt: "QR Mã Chú Rể",
                  className: "w-40 h-40 sm:w-48 sm:h-48 object-contain opacity-90 transition-opacity group-hover:opacity-100"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-full space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-burgundy/[0.03] border border-burgundy/5 flex items-center justify-between group hover:bg-burgundy/[0.05] transition-colors", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(CreditCard, { className: "w-5 h-5 text-burgundy/60" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-widest text-ink/60 font-bold", children: gifting.groom.bankName }),
                    /* @__PURE__ */ jsx("p", { className: "text-base font-bold text-ink-dark", children: gifting.groom.accountNumber })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => copyToClipboard(gifting.groom.accountNumber, "groom-bank"),
                    className: "hover:text-burgundy text-ink/50 transition-colors",
                    children: /* @__PURE__ */ jsx(Copy, { className: `w-4 h-4 ${copiedId === "groom-bank" ? "text-burgundy scale-125" : ""} transition-transform` })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-gold/[0.03] border border-gold/10 space-y-3", children: [
                gifting.groom.address && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsx(Home, { className: "w-5 h-5 text-gold/60 mt-0.5" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-ink leading-relaxed font-medium", children: gifting.groom.address })
                ] }),
                gifting.groom.phone && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-gold/60" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-ink-dark font-bold", children: gifting.groom.phone })
                ] })
              ] })
            ] })
          ] }),
          hasBride && /* @__PURE__ */ jsxs("div", { className: "bg-white/60 backdrop-blur-md rounded-[32px] border border-gold/10 p-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05),0_4px_10px_-5px_rgba(128,0,32,0.02)] flex flex-col items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-6 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.3em] uppercase text-burgundy font-bold mb-2", children: "Cô dâu" }),
              /* @__PURE__ */ jsx("p", { className: "text-xl font-heading text-ink-dark font-bold", children: data.bride.name })
            ] }),
            brideQrUrl && /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-2xl shadow-inner border border-gold/5 mb-6 relative group overflow-hidden", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: brideQrUrl,
                  alt: "QR Mã Cô Dâu",
                  className: "w-40 h-40 sm:w-48 sm:h-48 object-contain opacity-90 transition-opacity group-hover:opacity-100"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-full space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-burgundy/[0.03] border border-burgundy/5 flex items-center justify-between group hover:bg-burgundy/[0.05] transition-colors", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(CreditCard, { className: "w-5 h-5 text-burgundy/60" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-widest text-ink/60 font-bold", children: gifting.bride.bankName }),
                    /* @__PURE__ */ jsx("p", { className: "text-base font-bold text-ink-dark", children: gifting.bride.accountNumber })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => copyToClipboard(gifting.bride.accountNumber, "bride-bank"),
                    className: "hover:text-burgundy text-ink/50 transition-colors",
                    children: /* @__PURE__ */ jsx(Copy, { className: `w-4 h-4 ${copiedId === "bride-bank" ? "text-burgundy scale-125" : ""} transition-transform` })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-gold/[0.03] border border-gold/10 space-y-3", children: [
                gifting.bride.address && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsx(Home, { className: "w-5 h-5 text-gold/60 mt-0.5" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-ink leading-relaxed font-medium", children: gifting.bride.address })
                ] }),
                gifting.bride.phone && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-gold/60" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-ink-dark font-bold", children: gifting.bride.phone })
                ] })
              ] })
            ] })
          ] })
        ] })
      }
    ) })
  ] }) });
}

function BackgroundMusicIslandT1({ url }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const hasStarted = useRef(false);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    audio.playbackRate = 1.2;
    const startMusic = () => {
      if (hasStarted.current) return;
      audio.currentTime = 5;
      audio.play().then(() => {
        setIsPlaying(true);
        hasStarted.current = true;
        console.log("Music started at 5s");
      }).catch((err) => {
        console.log("Autoplay blocked, waiting for interaction.", err);
      });
    };
    const timer = setTimeout(startMusic, 1e3);
    const handleInteraction = () => {
      startMusic();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "audio",
      {
        ref: audioRef,
        loop: true,
        autoPlay: true,
        src: url || "/background-music.mp3"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: togglePlay,
        className: "group relative bg-burgundy/90 backdrop-blur-md text-white p-2.5 sm:p-3 md:p-3.5 rounded-full shadow-2xl hover:bg-burgundy transition-all duration-300 hover:scale-110 border border-gold/30",
        "aria-label": isPlaying ? "Tạm dừng nhạc" : "Phát nhạc",
        children: [
          isPlaying ? /* @__PURE__ */ jsx(Pause, { className: "w-4 h-4 sm:w-5 sm:h-5" }) : /* @__PURE__ */ jsx(Play, { className: "w-4 h-4 sm:w-5 sm:h-5 ml-0.5" }),
          /* @__PURE__ */ jsx("span", { className: "absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-burgundy text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none", children: isPlaying ? "Tạm dừng nhạc" : "Phát nhạc" }),
          isPlaying && /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full border-2 border-gold/50 animate-ping pointer-events-none" })
        ]
      }
    ) })
  ] });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$ClassicElegancePage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ClassicElegancePage;
  const { input } = Astro2.props;
  const { wedding, mode } = input;
  const ceremony = mode === "bride" ? wedding.brideCeremony : wedding.groomCeremony;
  const isBrideMode = mode === "bride";
  const ceremonyDate = new Date(ceremony?.date || /* @__PURE__ */ new Date());
  const formattedDate = !isNaN(ceremonyDate.getTime()) ? ceremonyDate.toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" }) : ceremony?.date || "";
  const mappedData = {
    groom: {
      name: wedding.groomName || "T\xEAn Ch\xFA R\u1EC3",
      parents: {
        father: wedding.groomParents?.father || "",
        mother: wedding.groomParents?.mother || ""
      }
    },
    bride: {
      name: wedding.brideName || "T\xEAn C\xF4 D\xE2u",
      parents: {
        father: wedding.brideParents?.father || "",
        mother: wedding.brideParents?.mother || ""
      }
    },
    ceremony: {
      title: mode === "bride" ? "L\u1EC5 Vu Quy" : "L\u1EC5 T\xE2n H\xF4n",
      solarDateLabel: formattedDate,
      lunarDateLabel: ceremony?.lunarDate || "",
      timeLabel: ceremony?.ceremonyTime || "09:00",
      receptionTimeLabel: ceremony?.receptionTime || "11:00",
      venueName: ceremony?.venue || "T\u01B0 Gia",
      address: ceremony?.address || "",
      googleMapsUrl: ceremony?.googleMapsUrl || "",
      googleMapsEmbedUrl: ceremony?.googleMapsUrl || "",
      startsAtISO: ceremony?.date || (/* @__PURE__ */ new Date()).toISOString()
    },
    quote: wedding.quote || "H\u1EA1nh ph\xFAc l\xE0 c\xF3 b\u1EA1n b\xEAn c\u1EA1nh trong ng\xE0y tr\u1ECDng \u0111\u1EA1i.",
    gallery: wedding.gallery?.map((src, idx) => {
      return {
        src,
        alt: `Gallery image ${idx + 1}`
      };
    }) || [],
    gifting: {
      groom: {
        accountName: wedding.gifting?.groom?.accountHolder || "",
        accountNumber: wedding.gifting?.groom?.accountNumber || "",
        bankName: wedding.gifting?.groom?.bankName || "",
        address: wedding.groomCeremony?.address || "",
        phone: ""
      },
      bride: {
        accountName: wedding.gifting?.bride?.accountHolder || "",
        accountNumber: wedding.gifting?.bride?.accountNumber || "",
        bankName: wedding.gifting?.bride?.bankName || "",
        address: wedding.brideCeremony?.address || "",
        phone: ""
      }
    }
  };
  const structureImages = {
    hero: wedding.gallery?.[0] || "",
    countdown: wedding.gallery?.[1] || "",
    weddingA: wedding.gallery?.[2] || "",
    weddingB: wedding.gallery?.[3] || "",
    quoteA: wedding.gallery?.[4] || "",
    quoteB: wedding.gallery?.[5] || ""
  };
  const defaultOrder = ["header", "wedding-info", "countdown", "quote", "gallery", "location", "rsvp", "wishes", "gifting", "footer"];
  const order = Array.isArray(wedding.sectionOrder) && wedding.sectionOrder.length > 0 ? wedding.sectionOrder.filter((s) => s.visible).map((s) => s.id) : defaultOrder;
  return renderTemplate(_a || (_a = __template(['<html lang="vi"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><title>', " & ", ' - Save the date</title><!-- Load custom fonts based on user choice, or fallback to default tailwind fonts --><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Great+Vibes&display=swap" rel="stylesheet"><style>', "</style>", '</head> <body class="font-body text-foreground antialiased min-h-screen"> ', ' <main class="bg-paper min-h-screen relative z-0"> ', " ", " </main> <script>\n      // Thay th\u1EBF t\xEAn kh\xE1ch m\u1EDDi t\u1EEB URL tr\xEAn client\n      document.addEventListener('DOMContentLoaded', () => {\n        const urlParams = new URLSearchParams(window.location.search);\n        const guestName = urlParams.get('guest');\n        if (guestName) {\n          document.querySelectorAll('.guest-name-placeholder').forEach(el => {\n            el.textContent = guestName;\n          });\n          document.querySelectorAll('.salutation-only-placeholder').forEach(el => {\n            // Thay th\u1EBF b\u1EB1ng danh x\u01B0ng. \u0110\u01A1n gi\u1EA3n h\xF3a: l\u1EA5y t\u1EEB \u0111\u1EA7u \u0111\u1EBFn kho\u1EA3ng tr\u1EAFng \u0111\u1EA7u ti\xEAn\n            const salutation = guestName.split(' ')[0] || 'b\u1EA1n';\n            el.textContent = salutation;\n          });\n        }\n      });\n    <\/script> </body> </html>"])), wedding.groomName, wedding.brideName, unescapeHTML(`
      :root {
        --font-heading: '${wedding.design?.fontHeading || "Playfair Display"}', serif;
        --font-body: '${wedding.design?.fontBody || "Montserrat"}', sans-serif;
        --font-script: '${wedding.design?.fontScript || "Great Vibes"}', cursive;
        --radius: 0.5rem;
      }
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        overflow-x: hidden;
        background-color: #FDFBF7; /* paper color */
      }
      .card-cover-bling-layer {
          mix-blend-mode: color-dodge;
      }
      .card-cover-bling-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
              45deg,
              transparent 0%,
              rgba(212, 175, 55, 0.05) 45%,
              rgba(212, 175, 55, 0.15) 50%,
              rgba(212, 175, 55, 0.05) 55%,
              transparent 100%
          );
          background-size: 200% 200%;
          animation: cardCoverShimmer 6s infinite linear;
      }
      @keyframes cardCoverShimmer {
          0% { background-position: -200% -200%; }
          100% { background-position: 200% 200%; }
      }
      .card-cover-bling-sparkles {
          position: absolute;
          inset: 0;
      }
      .bling-sparkle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 10px 2px rgba(212, 175, 55, 0.8);
          animation: cardCoverSparkle 3s infinite;
      }
      .bling-sparkle:nth-child(1) { top: 20%; left: 15%; animation-delay: 0s; }
      .bling-sparkle:nth-child(2) { top: 15%; left: 80%; animation-delay: 0.4s; }
      .bling-sparkle:nth-child(3) { top: 75%; left: 85%; animation-delay: 0.8s; }
      .bling-sparkle:nth-child(4) { top: 85%; left: 20%; animation-delay: 1.2s; }
      .bling-sparkle:nth-child(5) { top: 50%; left: 10%; animation-delay: 1.6s; }
      .bling-sparkle:nth-child(6) { top: 40%; left: 90%; animation-delay: 2.0s; }
      .bling-sparkle:nth-child(7) { top: 10%; left: 50%; animation-delay: 2.4s; }
      .bling-sparkle:nth-child(8) { top: 90%; left: 50%; animation-delay: 2.8s; }
      @keyframes cardCoverSparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
      }
      .bg-bling-text {
        background: radial-gradient(circle, rgba(128,0,32,0.1) 0%, transparent 70%);
      }
    `), renderHead(), renderComponent($$result, "WeddingCardOpeningIslandT1", WeddingCardOpeningIslandT1, { "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/WeddingCardOpeningIslandT1", "client:component-export": "WeddingCardOpeningIslandT1" }), order.map((sectionKey) => {
    if (sectionKey === "header" || sectionKey === "card-opening") {
      return renderTemplate`<div data-section="header"> ${renderComponent($$result, "InvitationHeaderStaticT1", $$InvitationHeaderStaticT1, { "data": mappedData, "heroImage": structureImages.hero, "isBrideMode": isBrideMode })} </div>`;
    }
    if (sectionKey === "wedding-info") {
      return renderTemplate`<div data-section="wedding-info"> ${renderComponent($$result, "WeddingInfoStaticT1", $$WeddingInfoStaticT1, { "data": mappedData, "photo1": structureImages.weddingA, "photo2": structureImages.weddingB, "isBrideMode": isBrideMode })} </div>`;
    }
    if (sectionKey === "countdown") {
      return renderTemplate`<div data-section="countdown"> ${renderComponent($$result, "CountdownIslandT1", CountdownIslandT1, { "client:visible": true, "dateLabel": mappedData.ceremony.solarDateLabel, "startsAtISO": mappedData.ceremony.startsAtISO, "image": structureImages.countdown, "client:component-hydration": "visible", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/CountdownIslandT1", "client:component-export": "CountdownIslandT1" })} </div>`;
    }
    if (sectionKey === "quote") {
      return renderTemplate`<div data-section="quote"> ${renderComponent($$result, "QuoteStaticT1", $$QuoteStaticT1, { "data": mappedData, "photo1": structureImages.quoteA, "photo2": structureImages.quoteB })} </div>`;
    }
    if (sectionKey === "gallery" && mappedData.gallery.length > 0) {
      return renderTemplate`<div data-section="gallery"> ${renderComponent($$result, "GalleryIslandT1", GalleryIslandT1, { "client:visible": true, "gallery": mappedData.gallery, "client:component-hydration": "visible", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/GalleryIslandT1", "client:component-export": "GalleryIslandT1" })} </div>`;
    }
    if (sectionKey === "location") {
      return renderTemplate`<div data-section="location"> ${renderComponent($$result, "LocationStaticT1", $$LocationStaticT1, { "data": mappedData, "isBrideMode": isBrideMode })} </div>`;
    }
    if (sectionKey === "rsvp") {
      return renderTemplate`<div data-section="rsvp"> ${renderComponent($$result, "RSVPIslandT1", RSVPIslandT1, { "client:visible": true, "weddingId": wedding.id, "client:component-hydration": "visible", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/RSVPIslandT1", "client:component-export": "RSVPIslandT1" })} </div>`;
    }
    if (sectionKey === "wishes") {
      return renderTemplate`<div data-section="wishes"> ${renderComponent($$result, "WishesIslandT1", WishesIslandT1, { "client:visible": true, "weddingId": wedding.id, "client:component-hydration": "visible", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/WishesIslandT1", "client:component-export": "WishesIslandT1" })} </div>`;
    }
    if (sectionKey === "gifting") {
      return renderTemplate`<div data-section="gifting"> ${renderComponent($$result, "GiftingIslandT1", GiftingIslandT1, { "client:visible": true, "data": mappedData, "client:component-hydration": "visible", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/GiftingIslandT1", "client:component-export": "GiftingIslandT1" })} </div>`;
    }
    if (sectionKey === "footer") {
      return renderTemplate`<div data-section="footer"> ${renderComponent($$result, "FooterStaticT1", $$FooterStaticT1, { "data": mappedData, "isFreePlan": wedding.status !== "PUBLISHED" })} </div>`;
    }
    return null;
  }), wedding.backgroundMusic && renderTemplate`${renderComponent($$result, "BackgroundMusicIslandT1", BackgroundMusicIslandT1, { "client:idle": true, "url": wedding.backgroundMusic, "client:component-hydration": "idle", "client:component-path": "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/BackgroundMusicIslandT1", "client:component-export": "BackgroundMusicIslandT1" })}`);
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/components/ClassicElegancePage.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const inputPath = process.env.ASTRO_STATIC_INPUT_PATH;
  if (!inputPath) {
    throw new Error("ASTRO_STATIC_INPUT_PATH env var is required to build this page");
  }
  const input = JSON.parse(readFileSync(inputPath, "utf-8"));
  return renderTemplate`${input.templateSlug === "autumn-watercolor" ? renderTemplate`${renderComponent($$result, "AutumnWatercolorPage", $$AutumnWatercolorPage, { "input": input })}` : input.templateSlug === "classic-elegance" ? renderTemplate`${renderComponent($$result, "ClassicElegancePage", $$ClassicElegancePage, { "input": input })}` : renderTemplate`${renderComponent($$result, "ClassicBurgundyPage", $$ClassicBurgundyPage, { "input": input })}`}`;
}, "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/pages/index.astro", void 0);

const $$file = "E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
