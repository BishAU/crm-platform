"use strict";(()=>{var e={};e.id=5085,e.ids=[5085],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},75560:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>f,patchFetch:()=>R,requestAsyncStorage:()=>v,routeModule:()=>y,serverHooks:()=>w,staticGenerationAsyncStorage:()=>m});var s={};t.r(s),t.d(s,{GET:()=>c,POST:()=>l});var n=t(49303),i=t(88716),o=t(60670),a=t(87070);let u=new(t(53524)).PrismaClient;async function p(e){let r=await u.$queryRaw`
    INSERT INTO saved_views (
      name,
      entity_type,
      user_id,
      filters,
      sort_column,
      sort_direction
    ) VALUES (
      ${e.name},
      ${e.entityType},
      ${e.userId},
      ${JSON.stringify(e.filters)}::jsonb,
      ${e.sortColumn},
      ${e.sortDirection}
    )
    RETURNING *;
  `,t=Array.isArray(r)?r[0]:r;return{...t,filters:JSON.parse(t.filters),entityType:t.entity_type,userId:t.user_id,sortColumn:t.sort_column,sortDirection:t.sort_direction}}async function d(e,r){return(await u.$queryRaw`
    SELECT * FROM saved_views
    WHERE entity_type = ${e}
    AND user_id = ${r}
    ORDER BY name ASC;
  `).map(e=>({...e,filters:JSON.parse(e.filters),entityType:e.entity_type,userId:e.user_id,sortColumn:e.sort_column,sortDirection:e.sort_direction}))}async function c(e){try{let r=e.nextUrl.searchParams.get("entityType");if(!r)return a.NextResponse.json({error:"Entity type is required"},{status:400});let t=await d(r,"1");return a.NextResponse.json(t)}catch(e){return console.error("Error fetching saved views:",e),a.NextResponse.json({error:"Internal Server Error"},{status:500})}}async function l(e){try{let r=await e.json(),t=await p({...r,userId:"1"});return a.NextResponse.json(t)}catch(e){return console.error("Error saving view:",e),a.NextResponse.json({error:"Internal Server Error"},{status:500})}}let y=new n.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/saved-views/route",pathname:"/api/saved-views",filename:"route",bundlePath:"app/api/saved-views/route"},resolvedPagePath:"/home/bish/Downloads/sites/crm-platform/app/api/saved-views/route.ts",nextConfigOutput:"standalone",userland:s}),{requestAsyncStorage:v,staticGenerationAsyncStorage:m,serverHooks:w}=y,f="/api/saved-views/route";function R(){return(0,o.patchFetch)({serverHooks:w,staticGenerationAsyncStorage:m})}}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[8948,5972],()=>t(75560));module.exports=s})();