(()=>{var e={};e.id=45,e.ids=[45],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},86624:e=>{"use strict";e.exports=require("querystring")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},19946:(e,r,s)=>{"use strict";s.r(r),s.d(r,{GlobalError:()=>n.a,__next_app__:()=>u,originalPathname:()=>m,pages:()=>c,routeModule:()=>p,tree:()=>d}),s(64878),s(15801),s(58810),s(8654),s(84752),s(96560);var t=s(23191),i=s(88716),a=s(37922),n=s.n(a),o=s(95231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(r,l);let d=["",{children:["marketing",{children:["campaigns",{children:["[id]",{children:["edm",{children:["[edmId]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,64878)),"/home/bish/Downloads/sites/crm-platform/app/marketing/campaigns/[id]/edm/[edmId]/page.tsx"]}]},{loading:[()=>Promise.resolve().then(s.bind(s,15801)),"/home/bish/Downloads/sites/crm-platform/app/marketing/campaigns/[id]/edm/[edmId]/loading.tsx"]}]},{}]},{}]},{loading:[()=>Promise.resolve().then(s.bind(s,58810)),"/home/bish/Downloads/sites/crm-platform/app/marketing/campaigns/loading.tsx"]}]},{loading:[()=>Promise.resolve().then(s.bind(s,8654)),"/home/bish/Downloads/sites/crm-platform/app/marketing/loading.tsx"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,84752)),"/home/bish/Downloads/sites/crm-platform/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,96560)),"/home/bish/Downloads/sites/crm-platform/app/not-found.tsx"]}],c=["/home/bish/Downloads/sites/crm-platform/app/marketing/campaigns/[id]/edm/[edmId]/page.tsx"],m="/marketing/campaigns/[id]/edm/[edmId]/page",u={require:s,loadChunk:()=>Promise.resolve()},p=new t.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/marketing/campaigns/[id]/edm/[edmId]/page",pathname:"/marketing/campaigns/[id]/edm/[edmId]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},76194:(e,r,s)=>{Promise.resolve().then(s.bind(s,37))},25530:(e,r,s)=>{Promise.resolve().then(s.bind(s,78143))},90676:(e,r,s)=>{Promise.resolve().then(s.t.bind(s,12994,23)),Promise.resolve().then(s.t.bind(s,96114,23)),Promise.resolve().then(s.t.bind(s,9727,23)),Promise.resolve().then(s.t.bind(s,79671,23)),Promise.resolve().then(s.t.bind(s,41868,23)),Promise.resolve().then(s.t.bind(s,84759,23))},35303:()=>{},37:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>i});var t=s(10326);function i(){return t.jsx("div",{className:"min-h-screen flex flex-col items-center justify-center",style:{backgroundImage:"url('/images/oceanwater.png.png')",backgroundSize:"cover",backgroundPosition:"center"},children:(0,t.jsxs)("div",{className:"bg-white/90 p-8 rounded-lg shadow-lg text-center",children:[t.jsx("h1",{className:"text-6xl font-bold text-gray-800 mb-4",children:"404"}),t.jsx("p",{className:"text-xl text-gray-600 mb-8",children:"Page Not Found"}),t.jsx("a",{href:"/",className:"inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:"Return Home"})]})})}},78143:(e,r,s)=>{"use strict";s.d(r,{SessionProvider:()=>a});var t=s(10326),i=s(77109);function a({children:e,session:r}){return t.jsx(i.SessionProvider,{session:r,children:e})}},937:(e,r,s)=>{"use strict";s.d(r,{L:()=>o});var t=s(53797),i=s(72331),a=s(42023),n=s.n(a);let o={callbacks:{async redirect({url:e,baseUrl:r}){let s=process.env.NEXTAUTH_URL||r;return e.startsWith("/")?`${s}${e}`:new URL(e).origin===s?e:s},jwt:async({token:e,user:r})=>(r&&(e.id=r.id),e),session:async({session:e,token:r})=>(r&&e.user&&(e.user.id=r.id),e)},providers:[(0,t.Z)({name:"Credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;let r=await i._.user.findUnique({where:{email:e.email}});return r&&n().compareSync(e.password,r.password)?{id:r.id,name:r.name,email:r.email}:null}})],session:{strategy:"jwt",maxAge:2592e3},pages:{signIn:"/login",error:"/login",signOut:"/login"},secret:process.env.NEXTAUTH_SECRET}},84752:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>c,metadata:()=>d});var t=s(19510),i=s(85384),a=s.n(i);s(67272);var n=s(75571),o=s(937);let l=(0,s(68570).createProxy)(String.raw`/home/bish/Downloads/sites/crm-platform/app/providers.tsx#SessionProvider`),d={title:"Clean Ocean CRM",description:"Clean Ocean CRM Platform"};async function c({children:e}){let r=await (0,n.getServerSession)(o.L);return t.jsx("html",{lang:"en",className:"h-full",children:t.jsx("body",{className:`${a().className} h-full`,children:t.jsx(l,{session:r,children:e})})})}},15801:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>i});var t=s(19510);function i(){return t.jsx("div",{className:"flex min-h-screen items-center justify-center",children:t.jsx("div",{className:"h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"})})}},64878:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>a,generateMetadata:()=>i});var t=s(19510);async function i({params:e}){let r=await e;return{title:`Campaign ${r.id} - EDM ${r.edmId}`}}async function a({params:e}){let r=await e;return(0,t.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[(0,t.jsxs)("h1",{className:"text-2xl font-bold mb-4",children:["Campaign ",r.id," - EDM ",r.edmId]}),t.jsx("div",{className:"bg-white shadow rounded-lg p-6",children:t.jsx("p",{className:"text-gray-600",children:"Email campaign content will be displayed here."})})]})}},58810:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>i});var t=s(19510);function i(){return t.jsx("div",{className:"flex min-h-screen items-center justify-center",children:t.jsx("div",{className:"h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"})})}},8654:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>i});var t=s(19510);function i(){return t.jsx("div",{className:"flex min-h-screen items-center justify-center",children:t.jsx("div",{className:"h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"})})}},96560:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>t});let t=(0,s(68570).createProxy)(String.raw`/home/bish/Downloads/sites/crm-platform/app/not-found.tsx#default`)},72331:(e,r,s)=>{"use strict";s.d(r,{_:()=>a});var t=s(53524);let i=globalThis;i.prisma||(i.prisma=new t.PrismaClient({log:["error"]}));let a=i.prisma},67272:()=>{}};var r=require("../../../../../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),t=r.X(0,[9380,7313,8435],()=>s(19946));module.exports=t})();