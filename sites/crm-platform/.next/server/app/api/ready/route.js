"use strict";(()=>{var e={};e.id=6819,e.ids=[6819],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},65835:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>x,patchFetch:()=>h,requestAsyncStorage:()=>c,routeModule:()=>u,serverHooks:()=>l,staticGenerationAsyncStorage:()=>m});var a={};r.r(a),r.d(a,{GET:()=>d});var n=r(49303),s=r(88716),o=r(60670),i=r(87070),p=r(53524);async function d(){try{let e=new p.PrismaClient;return await e.$connect(),await e.$disconnect(),i.NextResponse.json({status:"ready",database:"connected",timestamp:new Date().toISOString()})}catch(e){return i.NextResponse.json({status:"not ready",database:"disconnected",error:e instanceof Error?e.message:"Unknown error",timestamp:new Date().toISOString()},{status:503})}}let u=new n.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/ready/route",pathname:"/api/ready",filename:"route",bundlePath:"app/api/ready/route"},resolvedPagePath:"/home/bish/Downloads/sites/crm-platform/app/api/ready/route.ts",nextConfigOutput:"standalone",userland:a}),{requestAsyncStorage:c,staticGenerationAsyncStorage:m,serverHooks:l}=u,x="/api/ready/route";function h(){return(0,o.patchFetch)({serverHooks:l,staticGenerationAsyncStorage:m})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[8948,5972],()=>r(65835));module.exports=a})();