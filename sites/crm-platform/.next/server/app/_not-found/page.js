(()=>{var e={};e.id=7409,e.ids=[7409],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},86624:e=>{"use strict";e.exports=require("querystring")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},6030:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>c,pages:()=>u,routeModule:()=>m,tree:()=>d}),t(35866),t(96560),t(84752);var s=t(23191),i=t(88716),n=t(37922),o=t.n(n),l=t(95231),a={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(a[e]=()=>l[e]);t.d(r,a);let d=["",{children:["/_not-found",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,96560)),"/home/bish/Downloads/sites/crm-platform/app/not-found.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,84752)),"/home/bish/Downloads/sites/crm-platform/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,96560)),"/home/bish/Downloads/sites/crm-platform/app/not-found.tsx"]}],u=[],c="/_not-found/page",p={require:t,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/_not-found/page",pathname:"/_not-found",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},76194:(e,r,t)=>{Promise.resolve().then(t.bind(t,37))},25530:(e,r,t)=>{Promise.resolve().then(t.bind(t,78143))},90676:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,12994,23)),Promise.resolve().then(t.t.bind(t,96114,23)),Promise.resolve().then(t.t.bind(t,9727,23)),Promise.resolve().then(t.t.bind(t,79671,23)),Promise.resolve().then(t.t.bind(t,41868,23)),Promise.resolve().then(t.t.bind(t,84759,23))},35303:()=>{},37:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>i});var s=t(10326);function i(){return s.jsx("div",{className:"min-h-screen flex flex-col items-center justify-center",style:{backgroundImage:"url('/images/oceanwater.png.png')",backgroundSize:"cover",backgroundPosition:"center"},children:(0,s.jsxs)("div",{className:"bg-white/90 p-8 rounded-lg shadow-lg text-center",children:[s.jsx("h1",{className:"text-6xl font-bold text-gray-800 mb-4",children:"404"}),s.jsx("p",{className:"text-xl text-gray-600 mb-8",children:"Page Not Found"}),s.jsx("a",{href:"/",className:"inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:"Return Home"})]})})}},78143:(e,r,t)=>{"use strict";t.d(r,{SessionProvider:()=>n});var s=t(10326),i=t(77109);function n({children:e,session:r}){return s.jsx(i.SessionProvider,{session:r,children:e})}},937:(e,r,t)=>{"use strict";t.d(r,{L:()=>l});var s=t(53797),i=t(72331),n=t(42023),o=t.n(n);let l={callbacks:{async redirect({url:e,baseUrl:r}){let t=process.env.NEXTAUTH_URL||r;return e.startsWith("/")?`${t}${e}`:new URL(e).origin===t?e:t},jwt:async({token:e,user:r})=>(r&&(e.id=r.id),e),session:async({session:e,token:r})=>(r&&e.user&&(e.user.id=r.id),e)},providers:[(0,s.Z)({name:"Credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;let r=await i._.user.findUnique({where:{email:e.email}});return r&&o().compareSync(e.password,r.password)?{id:r.id,name:r.name,email:r.email}:null}})],session:{strategy:"jwt",maxAge:2592e3},pages:{signIn:"/login",error:"/login",signOut:"/login"},secret:process.env.NEXTAUTH_SECRET}},84752:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>u,metadata:()=>d});var s=t(19510),i=t(85384),n=t.n(i);t(67272);var o=t(75571),l=t(937);let a=(0,t(68570).createProxy)(String.raw`/home/bish/Downloads/sites/crm-platform/app/providers.tsx#SessionProvider`),d={title:"Clean Ocean CRM",description:"Clean Ocean CRM Platform"};async function u({children:e}){let r=await (0,o.getServerSession)(l.L);return s.jsx("html",{lang:"en",className:"h-full",children:s.jsx("body",{className:`${n().className} h-full`,children:s.jsx(a,{session:r,children:e})})})}},96560:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});let s=(0,t(68570).createProxy)(String.raw`/home/bish/Downloads/sites/crm-platform/app/not-found.tsx#default`)},72331:(e,r,t)=>{"use strict";t.d(r,{_:()=>n});var s=t(53524);let i=globalThis;i.prisma||(i.prisma=new s.PrismaClient({log:["error"]}));let n=i.prisma},35866:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return n}}),t(53370);let s=t(19510);t(71159);let i={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{display:"inline-block"},h1:{display:"inline-block",margin:"0 20px 0 0",padding:"0 23px 0 0",fontSize:24,fontWeight:500,verticalAlign:"top",lineHeight:"49px"},h2:{fontSize:14,fontWeight:400,lineHeight:"49px",margin:0}};function n(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("title",{children:"404: This page could not be found."}),(0,s.jsx)("div",{style:i.error,children:(0,s.jsxs)("div",{children:[(0,s.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}),(0,s.jsx)("h1",{className:"next-error-h1",style:i.h1,children:"404"}),(0,s.jsx)("div",{style:i.desc,children:(0,s.jsx)("h2",{style:i.h2,children:"This page could not be found."})})]})})]})}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},67272:()=>{},53370:(e,r,t)=>{"use strict";function s(e){return e&&e.__esModule?e:{default:e}}t.r(r),t.d(r,{_:()=>s,_interop_require_default:()=>s})}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[9380,7313,8435],()=>t(6030));module.exports=s})();