"use strict";(()=>{var e={};e.id=9636,e.ids=[9636],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},78855:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>x,patchFetch:()=>N,requestAsyncStorage:()=>g,routeModule:()=>d,serverHooks:()=>f,staticGenerationAsyncStorage:()=>h});var s={};r.r(s),r.d(s,{DELETE:()=>m,GET:()=>c,POST:()=>l,PUT:()=>p});var o=r(49303),a=r(88716),n=r(60670),i=r(87070),u=r(72331);async function c(e){try{let{searchParams:t}=new URL(e.url),r=parseInt(t.get("page")||"1"),s=parseInt(t.get("limit")||"10"),o=t.get("search")||"",a=t.get("sortBy")||"fullName",n=t.get("sortOrder")||"asc",c=(r-1)*s,l=o?{OR:[{fullName:{contains:o,mode:"insensitive"}},{email:{contains:o,mode:"insensitive"}},{organisation:{contains:o,mode:"insensitive"}},{city:{contains:o,mode:"insensitive"}}]}:{},p=await u._.person.count({where:l}),m=(await u._.person.findMany({where:l,skip:c,take:s,orderBy:{[a]:n},select:{id:!0,fullName:!0,email:!0,phoneNumber:!0,organisation:!0,address1:!0,city:!0,state:!0,postcode:!0,country:!0,createdAt:!0,updatedAt:!0}})).map(e=>({...e,name:e.fullName}));return i.NextResponse.json({data:m,pagination:{total:p,page:r,limit:s,totalPages:Math.ceil(p/s)}})}catch(e){return console.error("Error fetching customers:",e),i.NextResponse.json({error:"Failed to fetch customers"},{status:500})}}async function l(e){try{let{name:t,...r}=await e.json(),s=await u._.person.create({data:{fullName:t,...r}});return i.NextResponse.json({...s,name:s.fullName},{status:201})}catch(e){return console.error("Error creating customer:",e),i.NextResponse.json({error:"Failed to create customer"},{status:500})}}async function p(e){try{let{id:t,name:r,...s}=await e.json(),o=await u._.person.update({where:{id:t},data:{fullName:r,...s}});return i.NextResponse.json({...o,name:o.fullName})}catch(e){return console.error("Error updating customer:",e),i.NextResponse.json({error:"Failed to update customer"},{status:500})}}async function m(e){try{let{searchParams:t}=new URL(e.url),r=t.get("id");if(!r)return i.NextResponse.json({error:"ID is required"},{status:400});return await u._.person.delete({where:{id:r}}),i.NextResponse.json({success:!0})}catch(e){return console.error("Error deleting customer:",e),i.NextResponse.json({error:"Failed to delete customer"},{status:500})}}let d=new o.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/customers/route",pathname:"/api/customers",filename:"route",bundlePath:"app/api/customers/route"},resolvedPagePath:"/home/bish/Downloads/sites/crm-platform/app/api/customers/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:g,staticGenerationAsyncStorage:h,serverHooks:f}=d,x="/api/customers/route";function N(){return(0,n.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:h})}},72331:(e,t,r)=>{r.d(t,{_:()=>a});var s=r(53524);let o=globalThis;o.prisma||(o.prisma=new s.PrismaClient({log:["error"]}));let a=o.prisma}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[9380,5972],()=>r(78855));module.exports=s})();