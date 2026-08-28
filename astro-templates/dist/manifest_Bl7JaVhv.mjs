import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_HEADER, g as decodeKey } from './chunks/astro/server_CqGOCtUl.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///E:/Project/online%20wedding%20invitations/online-wedding-invitations/astro-templates/","adapterName":"","routes":[{"file":"file:///E:/Project/online%20wedding%20invitations/online-wedding-invitations/astro-templates/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-manifest":"manifest_Bl7JaVhv.mjs","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/BackgroundMusicIsland":"static-wedding-assets/BackgroundMusicIsland.CqUNZMd1.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/BackgroundMusicIslandAW":"static-wedding-assets/BackgroundMusicIslandAW.faOXZSpR.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/BackgroundMusicIslandT1":"static-wedding-assets/BackgroundMusicIslandT1.Cp7klNr-.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/CountdownIsland":"static-wedding-assets/CountdownIsland.Db_hI8Wl.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/CountdownIslandT1":"static-wedding-assets/CountdownIslandT1.D22VmM51.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/GalleryIsland":"static-wedding-assets/GalleryIsland.CyZ7bZ7X.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/GalleryIslandAW":"static-wedding-assets/GalleryIslandAW.AVS_J8R_.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/GalleryIslandT1":"static-wedding-assets/GalleryIslandT1.Ds_Wqt2c.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/GiftingIslandT1":"static-wedding-assets/GiftingIslandT1.DZt9JD3z.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/GuestViewTrackerIsland":"static-wedding-assets/GuestViewTrackerIsland.B7I6ZsNp.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/RSVPIslandT1":"static-wedding-assets/RSVPIslandT1.McOGmsOS.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/WeddingCardOpeningIsland":"static-wedding-assets/WeddingCardOpeningIsland.Dmd0XKy6.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/WeddingCardOpeningIslandAW":"static-wedding-assets/WeddingCardOpeningIslandAW.-lrxOC4e.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/WeddingCardOpeningIslandT1":"static-wedding-assets/WeddingCardOpeningIslandT1.CDnrrxj1.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/WishesIsland":"static-wedding-assets/WishesIsland.vNMK0jqr.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/WishesIslandT1":"static-wedding-assets/WishesIslandT1.BeQQSqn8.js","E:/Project/online wedding invitations/online-wedding-invitations/astro-templates/src/islands/WishesSliderIslandAW":"static-wedding-assets/WishesSliderIslandAW.C-K5dgYp.js","/astro/hoisted.js?q=0":"static-wedding-assets/hoisted.Bkps35rQ.js","@astrojs/react/client.js":"static-wedding-assets/client.DrE9CFQR.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/file:///E:/Project/online%20wedding%20invitations/online-wedding-invitations/astro-templates/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"m+wttRJLT4yLTszotYtjtJQIpdrCHN2sjviig1JpFmo=","experimentalEnvGetSecretEnabled":false});

export { manifest };
