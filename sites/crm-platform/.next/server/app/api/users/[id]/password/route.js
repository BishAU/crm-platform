"use strict";(()=>{var e={};e.id=505,e.ids=[505],e.modules={53524:e=>{e.exports=require("@prisma/client")},72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},27790:e=>{e.exports=require("assert")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},86624:e=>{e.exports=require("querystring")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},15911:(e,r,s)=>{s.r(r),s.d(r,{originalPathname:()=>g,patchFetch:()=>q,requestAsyncStorage:()=>c,routeModule:()=>d,serverHooks:()=>x,staticGenerationAsyncStorage:()=>m});var t={};s.r(t),s.d(t,{PUT:()=>l});var i=s(49303),a=s(88716),o=s(60670),n=s(87070),p=s(75571),u=s(937);async function l(e,{params:r}){return await (0,p.getServerSession)(u.L)?n.NextResponse.json({success:!0}):n.NextResponse.json({error:"Unauthorized"},{status:401})}let d=new i.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/users/[id]/password/route",pathname:"/api/users/[id]/password",filename:"route",bundlePath:"app/api/users/[id]/password/route"},resolvedPagePath:"/home/bish/Downloads/sites/crm-platform/app/api/users/[id]/password/route.ts",nextConfigOutput:"",userland:t}),{requestAsyncStorage:c,staticGenerationAsyncStorage:m,serverHooks:x}=d,g="/api/users/[id]/password/route";function q(){return(0,o.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:m})}},937:(e,r,s)=>{s.d(r,{L:()=>n});var t=s(53797),i=s(72331),a=s(42023),o=s.n(a);let n={callbacks:{async redirect({url:e,baseUrl:r}){let s=process.env.NEXTAUTH_URL||r;return e.startsWith("/")?`${s}${e}`:new URL(e).origin===s?e:s},jwt:async({token:e,user:r})=>(r&&(e.id=r.id),e),session:async({session:e,token:r})=>(r&&e.user&&(e.user.id=r.id),e)},providers:[(0,t.Z)({name:"Credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;let r=await i._.user.findUnique({where:{email:e.email}});return r&&o().compareSync(e.password,r.password)?{id:r.id,name:r.name,email:r.email}:null}})],session:{strategy:"jwt",maxAge:2592e3},pages:{signIn:"/login",error:"/login",signOut:"/login"},secret:process.env.NEXTAUTH_SECRET}},72331:(e,r,s)=>{s.d(r,{_:()=>a});var t=s(53524);let i=globalThis;i.prisma||(i.prisma=new t.PrismaClient({log:["error"]}));let a=i.prisma}};var r=require("../../../../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),t=r.X(0,[9380,7313,5972],()=>s(15911));module.exports=t})();