(()=>{var e={};e.id=5143,e.ids=[5143],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4441:(e,t,n)=>{"use strict";n.r(t),n.d(t,{GlobalError:()=>o.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>h,tree:()=>l}),n(12153),n(84752),n(96560);var s=n(23191),r=n(88716),i=n(37922),o=n.n(i),a=n(95231),d={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>a[e]);n.d(t,d);let l=["",{children:["indigenous-communities",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(n.bind(n,12153)),"/home/bish/Downloads/sites/crm-platform/app/indigenous-communities/[id]/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(n.bind(n,84752)),"/home/bish/Downloads/sites/crm-platform/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(n.bind(n,96560)),"/home/bish/Downloads/sites/crm-platform/app/not-found.tsx"]}],c=["/home/bish/Downloads/sites/crm-platform/app/indigenous-communities/[id]/page.tsx"],u="/indigenous-communities/[id]/page",m={require:n,loadChunk:()=>Promise.resolve()},h=new s.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/indigenous-communities/[id]/page",pathname:"/indigenous-communities/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},5634:(e,t,n)=>{Promise.resolve().then(n.bind(n,78143))},36526:(e,t,n)=>{Promise.resolve().then(n.bind(n,5696))},76194:(e,t,n)=>{Promise.resolve().then(n.bind(n,37))},90676:(e,t,n)=>{Promise.resolve().then(n.t.bind(n,12994,23)),Promise.resolve().then(n.t.bind(n,96114,23)),Promise.resolve().then(n.t.bind(n,9727,23)),Promise.resolve().then(n.t.bind(n,79671,23)),Promise.resolve().then(n.t.bind(n,41868,23)),Promise.resolve().then(n.t.bind(n,84759,23))},5696:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>d});var s=n(10326),r=n(17577),i=n(68535),o=n(35047),a=n(36570);function d(){let[e,t]=(0,r.useState)(null),[n,d]=(0,r.useState)(!0),l=(0,o.useParams)();if(n)return s.jsx("div",{className:"flex items-center justify-center h-full",children:s.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"})});if(!e)return s.jsx("div",{className:"flex items-center justify-center h-full",children:s.jsx("div",{className:"text-lg text-gray-500",children:"Indigenous community not found"})});let c=async e=>{try{let n=await fetch(`/api/indigenous-communities/${l.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!n.ok){let e=await n.text();throw Error(e||"Failed to update indigenous community")}let s=await n.json();t(s)}catch(e){throw console.error("Error updating indigenous community:",e),e}};return s.jsx(a.Z,{children:s.jsx("div",{className:"flex-1 p-8",children:s.jsx(i.Z,{entityType:"indigenousCommunity",record:e,onSave:c})})})}},76682:(e,t,n)=>{"use strict";function s(e,t){return t}function r(e,t){}function i(e){return{}}function o(e,t){}n.d(t,{C5:()=>o,LK:()=>i,bW:()=>r,rs:()=>s})},37:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>i});var s=n(10326),r=n(90434);function i(){return s.jsx("div",{className:"min-h-screen flex flex-col items-center justify-center bg-ocean-50",children:(0,s.jsxs)("div",{className:"text-center",children:[s.jsx("h1",{className:"text-9xl font-bold text-ocean-900",children:"404"}),s.jsx("p",{className:"mt-4 text-2xl text-ocean-700",children:"Page Not Found"}),s.jsx("p",{className:"mt-2 text-ocean-600",children:"The page you're looking for doesn't exist or has been moved."}),s.jsx("div",{className:"mt-6",children:s.jsx(r.default,{href:"/",className:"inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ocean-600 hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500",children:"Go back home"})})]})})}},78143:(e,t,n)=>{"use strict";n.d(t,{Providers:()=>i});var s=n(10326),r=n(77109);function i({children:e}){return s.jsx(r.SessionProvider,{children:e})}},12153:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>s});let s=(0,n(68570).createProxy)(String.raw`/home/bish/Downloads/sites/crm-platform/app/indigenous-communities/[id]/page.tsx#default`)},84752:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>o,metadata:()=>i});var s=n(19510);n(67272);let r=(0,n(68570).createProxy)(String.raw`/home/bish/Downloads/sites/crm-platform/app/providers.tsx#Providers`),i={title:"CRM Platform",description:"Customer Relationship Management Platform"};function o({children:e}){return s.jsx("html",{lang:"en",children:s.jsx("body",{className:"min-h-screen bg-gray-50",children:s.jsx(r,{children:e})})})}},96560:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>s});let s=(0,n(68570).createProxy)(String.raw`/home/bish/Downloads/sites/crm-platform/app/not-found.tsx#default`)},67272:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),s=t.X(0,[8948,77,4277,6226,325,9661],()=>n(4441));module.exports=s})();