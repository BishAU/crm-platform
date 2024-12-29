"use strict";(()=>{var e={};e.id=1380,e.ids=[1380],e.modules={53524:e=>{e.exports=require("@prisma/client")},72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},27790:e=>{e.exports=require("assert")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},86624:e=>{e.exports=require("querystring")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},56111:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>h,patchFetch:()=>q,requestAsyncStorage:()=>m,routeModule:()=>x,serverHooks:()=>w,staticGenerationAsyncStorage:()=>g});var s={};t.r(s),t.d(s,{GET:()=>d,PUT:()=>c});var i=t(49303),n=t(88716),a=t(60670),o=t(87070),u=t(72331),p=t(75571),l=t(937);async function d(e,{params:r}){let t=await (0,p.getServerSession)(l.L);if(!t?.user?.id)return new o.NextResponse("Unauthorized",{status:401});try{let e=await u._.user.findUnique({where:{id:r.id}});if(!e)return new o.NextResponse("User not found",{status:404});return o.NextResponse.json(e)}catch(e){return console.error("Error fetching user:",e),new o.NextResponse("Internal Server Error",{status:500})}}async function c(e,{params:r}){let t=await (0,p.getServerSession)(l.L);if(!t?.user?.id)return new o.NextResponse("Unauthorized",{status:401});try{let t=await e.json(),s=await u._.user.update({where:{id:r.id},data:t});return o.NextResponse.json(s)}catch(e){return console.error("Error updating user:",e),new o.NextResponse("Internal Server Error",{status:500})}}let x=new i.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/users/[id]/route",pathname:"/api/users/[id]",filename:"route",bundlePath:"app/api/users/[id]/route"},resolvedPagePath:"/home/bish/Downloads/sites/crm-platform/app/api/users/[id]/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:m,staticGenerationAsyncStorage:g,serverHooks:w}=x,h="/api/users/[id]/route";function q(){return(0,a.patchFetch)({serverHooks:w,staticGenerationAsyncStorage:g})}},937:(e,r,t)=>{t.d(r,{L:()=>o});var s=t(53797),i=t(72331),n=t(42023),a=t.n(n);let o={callbacks:{async redirect({url:e,baseUrl:r}){let t=process.env.NEXTAUTH_URL||r;return e.startsWith("/")?`${t}${e}`:new URL(e).origin===t?e:t},jwt:async({token:e,user:r})=>(r&&(e.id=r.id),e),session:async({session:e,token:r})=>(r&&e.user&&(e.user.id=r.id),e)},providers:[(0,s.Z)({name:"Credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;let r=await i._.user.findUnique({where:{email:e.email}});return r&&a().compareSync(e.password,r.password)?{id:r.id,name:r.name,email:r.email}:null}})],session:{strategy:"jwt",maxAge:2592e3},pages:{signIn:"/login",error:"/login",signOut:"/login"},secret:process.env.NEXTAUTH_SECRET}},72331:(e,r,t)=>{t.d(r,{_:()=>n});var s=t(53524);let i=globalThis;i.prisma||(i.prisma=new s.PrismaClient({log:["error"]}));let n=i.prisma}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[9380,7313,5972],()=>t(56111));module.exports=s})();