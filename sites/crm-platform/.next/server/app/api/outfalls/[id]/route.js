(()=>{var e={};e.id=5458,e.ids=[5458],e.modules={96330:e=>{"use strict";e.exports=require("@prisma/client")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},79428:e=>{"use strict";e.exports=require("buffer")},55511:e=>{"use strict";e.exports=require("crypto")},94735:e=>{"use strict";e.exports=require("events")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},11723:e=>{"use strict";e.exports=require("querystring")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},96331:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>w,routeModule:()=>d,serverHooks:()=>f,workAsyncStorage:()=>m,workUnitAsyncStorage:()=>x});var s={};t.r(s),t.d(s,{DELETE:()=>c,GET:()=>l,PUT:()=>p});var a=t(42706),i=t(28203),n=t(45994),o=t(33019),u=t(31779);async function l(e,{params:r}){return(0,u.ru)(e,async(e,t)=>{let s=await o.z.outfall.findUnique({where:{id:r.id},include:{postcodes:!0,observations:!0}});return s?(0,u.Yf)(s):(0,u.yj)(u.UU.NOT_FOUND("Outfall"),404)})}async function p(e,{params:r}){return(0,u.ru)(e,async(e,t)=>{let{name:s,...a}=await e.json(),i=await o.z.outfall.update({where:{id:r.id},data:{outfallName:s,...a},include:{postcodes:!0,observations:!0}});return(0,u.Yf)({...i,name:i.outfallName})})}async function c(e,{params:r}){return(0,u.ru)(e,async(e,t)=>(await o.z.outfall.delete({where:{id:r.id}}),new Response(null,{status:204})))}let d=new a.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/outfalls/[id]/route",pathname:"/api/outfalls/[id]",filename:"route",bundlePath:"app/api/outfalls/[id]/route"},resolvedPagePath:"/home/bish/Downloads/sites/crm-platform/app/api/outfalls/[id]/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:m,workUnitAsyncStorage:x,serverHooks:f}=d;function w(){return(0,n.patchFetch)({workAsyncStorage:m,workUnitAsyncStorage:x})}},96487:()=>{},78335:()=>{},23043:(e,r,t)=>{"use strict";t.d(r,{N:()=>o});var s=t(91642),a=t(33019),i=t(58964),n=t.n(i);let o={callbacks:{async redirect({url:e,baseUrl:r}){let t=process.env.NEXTAUTH_URL||r;return e.startsWith("/")?`${t}${e}`:new URL(e).origin===t?e:t},jwt:async({token:e,user:r})=>(r&&(e.id=r.id),e),session:async({session:e,token:r})=>(r&&e.user&&(e.user.id=r.id),e)},providers:[(0,s.A)({name:"Credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;let r=await a.z.user.findUnique({where:{email:e.email}});return r&&r.password&&n().compareSync(e.password,r.password)?{id:r.id,name:r.name,email:r.email}:null}})],session:{strategy:"jwt",maxAge:2592e3},cookies:{sessionToken:{name:"__Secure-next-auth.session-token",options:{httpOnly:!0,sameSite:"lax",path:"/",secure:!0,domain:".myinvoices.today"}},callbackUrl:{name:"__Secure-next-auth.callback-url",options:{sameSite:"lax",path:"/",secure:!0,domain:".myinvoices.today"}},csrfToken:{name:"__Host-next-auth.csrf-token",options:{httpOnly:!0,sameSite:"lax",path:"/",secure:!0}}},pages:{signIn:"/login",error:"/login",signOut:"/login"},secret:process.env.NEXTAUTH_SECRET,debug:!1}},31779:(e,r,t)=>{"use strict";t.d(r,{UU:()=>l,Yf:()=>o,ru:()=>n,yj:()=>u});var s=t(39187),a=t(51825),i=t(23043);async function n(e,r){try{let t=await (0,a.getServerSession)(i.N);if(!t)return new s.NextResponse("Unauthorized",{status:401});return r(e,t)}catch(e){return console.error("API Error:",e),new s.NextResponse("Internal Server Error",{status:500})}}let o=(e,r=200)=>s.NextResponse.json(e,{status:r}),u=(e,r=500)=>new s.NextResponse(e,{status:r}),l={NOT_FOUND:e=>`${e} not found`,UNAUTHORIZED:"Unauthorized",FORBIDDEN:"Forbidden",BAD_REQUEST:"Bad request",INTERNAL_ERROR:"Internal server error",EMAIL_IN_USE:"Email already in use",INVALID_CREDENTIALS:"Invalid credentials"}},33019:(e,r,t)=>{"use strict";t.d(r,{z:()=>a});var s=t(96330);let a=globalThis.prisma??new s.PrismaClient}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[5994,8775,5452],()=>t(96331));module.exports=s})();