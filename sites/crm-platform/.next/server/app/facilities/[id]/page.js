(()=>{var e={};e.id=1423,e.ids=[1423],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},86624:e=>{"use strict";e.exports=require("querystring")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},14880:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>d,routeModule:()=>p,tree:()=>c}),r(35950),r(84752),r(96560);var s=r(23191),a=r(88716),i=r(37922),n=r.n(i),o=r(95231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let c=["",{children:["facilities",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,35950)),"/home/bish/Downloads/sites/crm-platform/app/facilities/[id]/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,84752)),"/home/bish/Downloads/sites/crm-platform/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,96560)),"/home/bish/Downloads/sites/crm-platform/app/not-found.tsx"]}],d=["/home/bish/Downloads/sites/crm-platform/app/facilities/[id]/page.tsx"],u="/facilities/[id]/page",m={require:r,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/facilities/[id]/page",pathname:"/facilities/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},96780:(e,t,r)=>{Promise.resolve().then(r.bind(r,30040))},76194:(e,t,r)=>{Promise.resolve().then(r.bind(r,37))},25530:(e,t,r)=>{Promise.resolve().then(r.bind(r,78143))},90676:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,12994,23)),Promise.resolve().then(r.t.bind(r,96114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,79671,23)),Promise.resolve().then(r.t.bind(r,41868,23)),Promise.resolve().then(r.t.bind(r,84759,23))},78039:(e,t,r)=>{"use strict";r.d(t,{Z:()=>l});var s=r(10326),a=r(17577);let i=a.forwardRef(function({title:e,titleId:t,...r},s){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":t},r),e?a.createElement("title",{id:t},e):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"}),a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"}))}),n=a.forwardRef(function({title:e,titleId:t,...r},s){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":t},r),e?a.createElement("title",{id:t},e):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"}))});var o=r(76682);function l({entityType:e,record:t,onSave:r}){let[l,c]=(0,a.useState)(t),[d,u]=(0,a.useState)(!1),[m,p]=(0,a.useState)(null),[h,x]=(0,a.useState)(()=>(0,o.LK)()[e]||{}),f=(e,t)=>{c(r=>({...r,[e]:t}))},g=async()=>{if(r){u(!0),p(null);try{await r(l)}catch(e){p(e instanceof Error?e.message:"Failed to save changes")}finally{u(!1)}}},b=t=>{let r=!h[t];(0,o.zk)(e,t,r),x(e=>({...e,[t]:r}))},v=Object.keys(t);return s.jsx("div",{className:"flex items-center justify-center z-50",children:(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden",children:[s.jsx("div",{className:"px-6 py-4 border-b border-ocean-100 flex items-center justify-between bg-ocean-50",children:s.jsx("h2",{className:"text-xl font-semibold text-ocean-900",children:"Edit Record"})}),(0,s.jsxs)("div",{className:"p-6 overflow-y-auto",children:[s.jsx("div",{className:"space-y-4",children:v.map(e=>{let t=!1!==h[e];return(0,s.jsxs)("div",{className:`transition-opacity ${t?"opacity-100":"opacity-50"}`,children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-1",children:[s.jsx("label",{className:"block text-sm font-medium text-ocean-700",children:e}),s.jsx("button",{onClick:()=>b(e),className:`p-1 rounded-md transition-colors ${t?"text-ocean-600 hover:bg-ocean-50":"text-gray-400 hover:bg-gray-50"}`,title:t?"Deactivate field":"Activate field",children:t?s.jsx(i,{className:"w-5 h-5"}):s.jsx(n,{className:"w-5 h-5"})})]}),"boolean"==typeof l[e]?s.jsx("button",{onClick:()=>f(e,!l[e]),className:`w-10 h-6 rounded-full p-1 transition-colors ${l[e]?"bg-green-500":"bg-gray-300"}`,children:s.jsx("div",{className:`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${l[e]?"translate-x-4":"translate-x-0"}`})}):s.jsx("input",{type:"text",value:l[e]||"",onChange:t=>f(e,t.target.value),className:`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${t?"border-ocean-200 focus:ring-ocean-500 focus:border-ocean-500":"border-gray-200 focus:ring-gray-500 focus:border-gray-500"}`,disabled:!t})]},e)})}),m&&s.jsx("div",{className:"mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm",children:m})]}),s.jsx("div",{className:"px-6 py-4 border-t border-ocean-100 bg-ocean-50 flex justify-end space-x-3",children:s.jsx("button",{onClick:g,disabled:d,className:`px-4 py-2 bg-ocean-600 text-white rounded-md transition-colors ${d?"opacity-50 cursor-not-allowed":"hover:bg-ocean-700"}`,children:d?"Saving...":"Save Changes"})})]})})}},30040:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var s=r(10326),a=r(17577),i=r(78039),n=r(35047);function o(){let[e,t]=(0,a.useState)(null),[r,o]=(0,a.useState)(!0),l=(0,n.useParams)();if(r)return s.jsx("div",{className:"flex items-center justify-center h-full",children:s.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"})});if(!e)return s.jsx("div",{className:"flex items-center justify-center h-full",children:s.jsx("div",{className:"text-lg text-gray-500",children:"Facility not found"})});let c=async e=>{try{let r=await fetch(`/api/facilities/${l.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!r.ok){let e=await r.text();throw Error(e||"Failed to update facility")}let s=await r.json();t(s)}catch(e){throw console.error("Error updating facility:",e),e}};return s.jsx("div",{className:"p-6",children:s.jsx(i.Z,{entityType:"facilities",record:e,onSave:c})})}},76682:(e,t,r)=>{"use strict";function s(){return{}}function a(e,t,r){let s={};s[e]||(s[e]={}),s[e][t]=r}function i(e,t){let r={}[e]||{};return 0===Object.keys(r).length?(t.reduce((e,t)=>(e[t]=!0,e),{}),t):t.filter(e=>!0===r[e])}r.d(t,{LK:()=>s,Ly:()=>i,zk:()=>a})},37:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var s=r(10326);function a(){return s.jsx("div",{className:"min-h-screen flex flex-col items-center justify-center",style:{backgroundImage:"url('/images/oceanwater.png.png')",backgroundSize:"cover",backgroundPosition:"center"},children:(0,s.jsxs)("div",{className:"bg-white/90 p-8 rounded-lg shadow-lg text-center",children:[s.jsx("h1",{className:"text-6xl font-bold text-gray-800 mb-4",children:"404"}),s.jsx("p",{className:"text-xl text-gray-600 mb-8",children:"Page Not Found"}),s.jsx("a",{href:"/",className:"inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:"Return Home"})]})})}},78143:(e,t,r)=>{"use strict";r.d(t,{SessionProvider:()=>i});var s=r(10326),a=r(77109);function i({children:e,session:t}){return s.jsx(a.SessionProvider,{session:t,children:e})}},35047:(e,t,r)=>{"use strict";var s=r(77389);r.o(s,"useParams")&&r.d(t,{useParams:function(){return s.useParams}}),r.o(s,"usePathname")&&r.d(t,{usePathname:function(){return s.usePathname}}),r.o(s,"useRouter")&&r.d(t,{useRouter:function(){return s.useRouter}}),r.o(s,"useSearchParams")&&r.d(t,{useSearchParams:function(){return s.useSearchParams}})},937:(e,t,r)=>{"use strict";r.d(t,{L:()=>o});var s=r(53797),a=r(72331),i=r(42023),n=r.n(i);let o={callbacks:{async redirect({url:e,baseUrl:t}){let r=process.env.NEXTAUTH_URL||t;return e.startsWith("/")?`${r}${e}`:new URL(e).origin===r?e:r},jwt:async({token:e,user:t})=>(t&&(e.id=t.id),e),session:async({session:e,token:t})=>(t&&e.user&&(e.user.id=t.id),e)},providers:[(0,s.Z)({name:"Credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;let t=await a._.user.findUnique({where:{email:e.email}});return t&&n().compareSync(e.password,t.password)?{id:t.id,name:t.name,email:t.email}:null}})],session:{strategy:"jwt",maxAge:2592e3},pages:{signIn:"/login",error:"/login",signOut:"/login"},secret:process.env.NEXTAUTH_SECRET}},35950:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(68570).createProxy)(String.raw`/home/bish/Downloads/sites/crm-platform/app/facilities/[id]/page.tsx#default`)},84752:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d,metadata:()=>c});var s=r(19510),a=r(85384),i=r.n(a);r(67272);var n=r(75571),o=r(937);let l=(0,r(68570).createProxy)(String.raw`/home/bish/Downloads/sites/crm-platform/app/providers.tsx#SessionProvider`),c={title:"Clean Ocean CRM",description:"Clean Ocean CRM Platform"};async function d({children:e}){let t=await (0,n.getServerSession)(o.L);return s.jsx("html",{lang:"en",className:"h-full",children:s.jsx("body",{className:`${i().className} h-full`,children:s.jsx(l,{session:t,children:e})})})}},96560:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(68570).createProxy)(String.raw`/home/bish/Downloads/sites/crm-platform/app/not-found.tsx#default`)},72331:(e,t,r)=>{"use strict";r.d(t,{_:()=>i});var s=r(53524);let a=globalThis;a.prisma||(a.prisma=new s.PrismaClient({log:["error"]}));let i=a.prisma},67272:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[9380,7313,8435],()=>r(14880));module.exports=s})();