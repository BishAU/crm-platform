"use strict";(()=>{var e={};e.id=1063,e.ids=[1063],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},35259:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>x,patchFetch:()=>N,requestAsyncStorage:()=>h,routeModule:()=>m,serverHooks:()=>f,staticGenerationAsyncStorage:()=>g});var a={};t.r(a),t.d(a,{DELETE:()=>d,GET:()=>l,POST:()=>u,PUT:()=>c});var s=t(49303),o=t(88716),n=t(60670),i=t(87070),p=t(72331);async function l(e){try{let r=e.nextUrl.searchParams,t=r.get("search")||"",a=parseInt(r.get("page")||"1"),s=parseInt(r.get("limit")||"10"),o=r.get("sortBy")||"fullName",n=r.get("sortOrder")||"asc",l=(a-1)*s,u=t?{OR:[{fullName:{contains:t,mode:"insensitive"}},{email:{contains:t,mode:"insensitive"}},{organisation:{contains:t,mode:"insensitive"}}]}:{},[c,d]=await Promise.all([p._.person.count({where:u}),p._.person.findMany({where:u,skip:l,take:s,orderBy:{[o]:n},select:{id:!0,fullName:!0,email:!0,phoneNumber:!0,organisation:!0,address1:!0,city:!0,state:!0,postcode:!0,country:!0,createdAt:!0,updatedAt:!0}})]),m=Math.ceil(c/s),h=d.map(e=>({...e,name:e.fullName}));return i.NextResponse.json({data:h,pagination:{total:c,totalPages:m,page:a,limit:s}})}catch(e){return console.error("Error fetching people:",e),i.NextResponse.json({error:"Failed to fetch people"},{status:500})}}async function u(e){try{let{name:r,...t}=await e.json(),a=await p._.person.create({data:{fullName:r,...t}});return i.NextResponse.json({data:{...a,name:a.fullName}},{status:201})}catch(e){return console.error("Error creating person:",e),i.NextResponse.json({error:"Failed to create person"},{status:500})}}async function c(e){try{let{id:r,name:t,...a}=await e.json(),s=await p._.person.update({where:{id:r},data:{fullName:t,...a}});return i.NextResponse.json({data:{...s,name:s.fullName}})}catch(e){return console.error("Error updating person:",e),i.NextResponse.json({error:"Failed to update person"},{status:500})}}async function d(e){try{let r=e.nextUrl.searchParams.get("id");if(!r)return i.NextResponse.json({error:"ID is required"},{status:400});return await p._.person.delete({where:{id:r}}),i.NextResponse.json({success:!0})}catch(e){return console.error("Error deleting person:",e),i.NextResponse.json({error:"Failed to delete person"},{status:500})}}let m=new s.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/people/route",pathname:"/api/people",filename:"route",bundlePath:"app/api/people/route"},resolvedPagePath:"/home/bish/Downloads/sites/crm-platform/app/api/people/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:h,staticGenerationAsyncStorage:g,serverHooks:f}=m,x="/api/people/route";function N(){return(0,n.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:g})}},72331:(e,r,t)=>{t.d(r,{_:()=>o});var a=t(53524);let s=globalThis;s.prisma||(s.prisma=new a.PrismaClient({log:["error"]}));let o=s.prisma}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),a=r.X(0,[9380,5972],()=>t(35259));module.exports=a})();