"use strict";(()=>{var e={};e.id=6679,e.ids=[6679],e.modules={53524:e=>{e.exports=require("@prisma/client")},72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},27790:e=>{e.exports=require("assert")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},86624:e=>{e.exports=require("querystring")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},53722:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>w,patchFetch:()=>h,requestAsyncStorage:()=>m,routeModule:()=>c,serverHooks:()=>y,staticGenerationAsyncStorage:()=>x});var s={};t.r(s),t.d(s,{GET:()=>d,PUT:()=>p});var n=t(49303),a=t(88716),i=t(60670),o=t(3474),u=t(82895);function l(e){if(e)return Array.isArray(e)?e[0]:e}async function d(e,{params:r}){return(0,u.QO)(e,async(e,t)=>{let s=l(r.id);if(!s)return(0,u.VR)(u.RZ.BAD_REQUEST,400);let n=await o.q("Observation",s);return n?(0,u.wE)(n):(0,u.VR)(u.RZ.NOT_FOUND("Observation"),404)})}async function p(e,{params:r}){return(0,u.QO)(e,async(t,s)=>{let n=l(r.id);if(!n)return(0,u.VR)(u.RZ.BAD_REQUEST,400);let a=await e.json(),i=await o.X("Observation",n,a);return i?(0,u.wE)(i):(0,u.VR)(u.RZ.INTERNAL_ERROR,500)})}let c=new n.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/observations/[id]/route",pathname:"/api/observations/[id]",filename:"route",bundlePath:"app/api/observations/[id]/route"},resolvedPagePath:"/home/bish/Downloads/sites/crm-platform/app/api/observations/[id]/route.ts",nextConfigOutput:"standalone",userland:s}),{requestAsyncStorage:m,staticGenerationAsyncStorage:x,serverHooks:y}=c,w="/api/observations/[id]/route";function h(){return(0,i.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:x})}},937:(e,r,t)=>{t.d(r,{L:()=>o});var s=t(53797),n=t(8261),a=t(42023),i=t.n(a);let o={callbacks:{async redirect({url:e,baseUrl:r}){let t="https://crm.myinvoices.today";return e.startsWith("/")?`${t}${e}`:new URL(e).origin===t?e:t},jwt:async({token:e,user:r})=>(r&&(e.id=r.id),e),async session({session:e,token:r}){if(!r||!r.id||!r.exp||Date.now()>=1e3*Number(r.exp))throw Error("Invalid session");return e.user&&(e.user.id=r.id),e}},providers:[(0,s.Z)({name:"Credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;let r=await n._.user.findUnique({where:{email:e.email}});return r&&r.password&&i().compareSync(e.password,r.password)?{id:r.id,name:r.name,email:r.email}:null}})],session:{strategy:"jwt",maxAge:86400,updateAge:3600},jwt:{maxAge:86400},events:{async signOut({token:e,session:r}){e&&await Promise.all([n._.session.deleteMany({where:{userId:e.id}}),n._.account.updateMany({where:{userId:e.id},data:{access_token:null,refresh_token:null,id_token:null}}),n._.session.updateMany({where:{userId:e.id},data:{expires:new Date(0)}})])},async session({session:e,token:r}){r.exp&&Date.now()>=1e3*Number(r.exp)&&await n._.session.deleteMany({where:{userId:r.id}})}},cookies:{sessionToken:{name:"__Secure-next-auth.session-token",options:{httpOnly:!0,sameSite:"strict",path:"/",secure:!0,domain:".myinvoices.today",maxAge:86400}},callbackUrl:{name:"__Secure-next-auth.callback-url",options:{sameSite:"strict",path:"/",secure:!0,httpOnly:!0,maxAge:3600,domain:".myinvoices.today"}},csrfToken:{name:"__Host-next-auth.csrf-token",options:{httpOnly:!0,sameSite:"lax",path:"/",secure:!0}}},pages:{signIn:"/login",error:"/login",signOut:"/login"},secret:process.env.NEXTAUTH_SECRET,debug:!1}},82895:(e,r,t)=>{t.d(r,{QO:()=>i,RZ:()=>l,VR:()=>u,wE:()=>o});var s=t(87070),n=t(75571),a=t(937);async function i(e,r){try{let t=await (0,n.getServerSession)(a.L);if(!t)return new s.NextResponse("Unauthorized",{status:401});return r(e,t)}catch(e){return console.error("API Error:",e),new s.NextResponse("Internal Server Error",{status:500})}}let o=(e,r=200)=>s.NextResponse.json(e,{status:r}),u=(e,r=500)=>new s.NextResponse(e,{status:r}),l={NOT_FOUND:e=>`${e} not found`,UNAUTHORIZED:"Unauthorized",FORBIDDEN:"Forbidden",BAD_REQUEST:"Bad request",INTERNAL_ERROR:"Internal server error",EMAIL_IN_USE:"Email already in use",INVALID_CREDENTIALS:"Invalid credentials"}},3474:(e,r,t)=>{t.d(r,{X:()=>a,q:()=>n});var s=t(8261);async function n(e,r){try{return await s._[e].findUnique({where:{id:r}})}catch(r){return console.error(`Error finding ${e} by ID:`,r),null}}async function a(e,r,t){try{return await s._[e].update({where:{id:r},data:t})}catch(r){return console.error(`Error updating ${e} by ID:`,r),null}}},8261:(e,r,t)=>{t.d(r,{_:()=>n});var s=t(53524);let n=globalThis.prisma??new s.PrismaClient}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[8948,5972,1235,7313],()=>t(53722));module.exports=s})();