(()=>{var e={};e.id=1931,e.ids=[1931],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},86624:e=>{"use strict";e.exports=require("querystring")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},36071:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>a.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d}),s(90908),s(84752),s(96560);var r=s(23191),i=s(88716),n=s(37922),a=s.n(n),o=s(95231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let d=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,90908)),"/home/bish/Downloads/sites/crm-platform/app/page.tsx"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,84752)),"/home/bish/Downloads/sites/crm-platform/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,96560)),"/home/bish/Downloads/sites/crm-platform/app/not-found.tsx"]}],c=["/home/bish/Downloads/sites/crm-platform/app/page.tsx"],u="/page",m={require:s,loadChunk:()=>Promise.resolve()},p=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},5634:(e,t,s)=>{Promise.resolve().then(s.bind(s,78143))},76194:(e,t,s)=>{Promise.resolve().then(s.bind(s,37))},90676:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,12994,23)),Promise.resolve().then(s.t.bind(s,96114,23)),Promise.resolve().then(s.t.bind(s,9727,23)),Promise.resolve().then(s.t.bind(s,79671,23)),Promise.resolve().then(s.t.bind(s,41868,23)),Promise.resolve().then(s.t.bind(s,84759,23))},35303:()=>{},37:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n});var r=s(10326),i=s(90434);function n(){return r.jsx("div",{className:"min-h-screen flex flex-col items-center justify-center bg-ocean-50",children:(0,r.jsxs)("div",{className:"text-center",children:[r.jsx("h1",{className:"text-9xl font-bold text-ocean-900",children:"404"}),r.jsx("p",{className:"mt-4 text-2xl text-ocean-700",children:"Page Not Found"}),r.jsx("p",{className:"mt-2 text-ocean-600",children:"The page you're looking for doesn't exist or has been moved."}),r.jsx("div",{className:"mt-6",children:r.jsx(i.default,{href:"/",className:"inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ocean-600 hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500",children:"Go back home"})})]})})}},78143:(e,t,s)=>{"use strict";s.d(t,{Providers:()=>n});var r=s(10326),i=s(77109);function n({children:e}){return r.jsx(i.SessionProvider,{children:e})}},937:(e,t,s)=>{"use strict";s.d(t,{L:()=>o});var r=s(53797),i=s(8261),n=s(42023),a=s.n(n);let o={callbacks:{async redirect({url:e,baseUrl:t}){let s="https://crm.myinvoices.today";return e.startsWith("/")?`${s}${e}`:new URL(e).origin===s?e:s},jwt:async({token:e,user:t})=>(t&&(e.id=t.id),e),async session({session:e,token:t}){if(!t||!t.id||!t.exp||Date.now()>=1e3*Number(t.exp))throw Error("Invalid session");return e.user&&(e.user.id=t.id),e}},providers:[(0,r.Z)({name:"Credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;let t=await i._.user.findUnique({where:{email:e.email}});return t&&t.password&&a().compareSync(e.password,t.password)?{id:t.id,name:t.name,email:t.email}:null}})],session:{strategy:"jwt",maxAge:86400,updateAge:3600},jwt:{maxAge:86400},events:{async signOut({token:e,session:t}){e&&await Promise.all([i._.session.deleteMany({where:{userId:e.id}}),i._.account.updateMany({where:{userId:e.id},data:{access_token:null,refresh_token:null,id_token:null}}),i._.session.updateMany({where:{userId:e.id},data:{expires:new Date(0)}})])},async session({session:e,token:t}){t.exp&&Date.now()>=1e3*Number(t.exp)&&await i._.session.deleteMany({where:{userId:t.id}})}},cookies:{sessionToken:{name:"__Secure-next-auth.session-token",options:{httpOnly:!0,sameSite:"strict",path:"/",secure:!0,domain:".myinvoices.today",maxAge:86400}},callbackUrl:{name:"__Secure-next-auth.callback-url",options:{sameSite:"strict",path:"/",secure:!0,httpOnly:!0,maxAge:3600,domain:".myinvoices.today"}},csrfToken:{name:"__Host-next-auth.csrf-token",options:{httpOnly:!0,sameSite:"lax",path:"/",secure:!0}}},pages:{signIn:"/login",error:"/login",signOut:"/login"},secret:process.env.NEXTAUTH_SECRET,debug:!1}},84752:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a,metadata:()=>n});var r=s(19510);s(67272);let i=(0,s(68570).createProxy)(String.raw`/home/bish/Downloads/sites/crm-platform/app/providers.tsx#Providers`),n={title:"CRM Platform",description:"Customer Relationship Management Platform"};function a({children:e}){return r.jsx("html",{lang:"en",children:r.jsx("body",{className:"min-h-screen bg-gray-50",children:r.jsx(i,{children:e})})})}},8261:(e,t,s)=>{"use strict";s.d(t,{_:()=>i});var r=s(53524);let i=globalThis.prisma??new r.PrismaClient},96560:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(68570).createProxy)(String.raw`/home/bish/Downloads/sites/crm-platform/app/not-found.tsx#default`)},90908:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>o,dynamic:()=>a});var r=s(58585),i=s(75571),n=s(937);let a="force-dynamic";async function o(){let e=await (0,i.getServerSession)(n.L);(0,r.redirect)(e?"/dashboard":"/login")}},67272:()=>{}};var t=require("../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[8948,77,1235,7313,4054],()=>s(36071));module.exports=r})();