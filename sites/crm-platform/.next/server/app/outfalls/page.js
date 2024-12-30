(()=>{var e={};e.id=5653,e.ids=[5653],e.modules={96330:e=>{"use strict";e.exports=require("@prisma/client")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},79428:e=>{"use strict";e.exports=require("buffer")},55511:e=>{"use strict";e.exports=require("crypto")},94735:e=>{"use strict";e.exports=require("events")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},33873:e=>{"use strict";e.exports=require("path")},11723:e=>{"use strict";e.exports=require("querystring")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},83165:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,pages:()=>p,routeModule:()=>c,tree:()=>d});var s=r(70260),a=r(28203),o=r(25155),i=r.n(o),n=r(67292),l={};for(let e in n)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let d=["",{children:["outfalls",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,46821)),"/home/bish/Downloads/sites/crm-platform/app/outfalls/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,19611)),"/home/bish/Downloads/sites/crm-platform/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,61129)),"/home/bish/Downloads/sites/crm-platform/app/not-found.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,41485,23)),"next/dist/client/components/unauthorized-error"]}],p=["/home/bish/Downloads/sites/crm-platform/app/outfalls/page.tsx"],u={require:r,loadChunk:()=>Promise.resolve()},c=new s.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/outfalls/page",pathname:"/outfalls",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},52185:(e,t,r)=>{Promise.resolve().then(r.bind(r,46821))},65337:(e,t,r)=>{Promise.resolve().then(r.bind(r,47792))},47792:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var s=r(45512),a=r(16163),o=r(58009),i=r(1568);let n=o.forwardRef(function({title:e,titleId:t,...r},s){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":t},r),e?o.createElement("title",{id:t},e):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"}))});function l(){let[e,t]=(0,o.useState)([]),[r,l]=(0,o.useState)(!0),[d,p]=(0,o.useState)({page:1,limit:10,total:0,totalPages:0}),[u,c]=(0,o.useState)(""),[m,h]=(0,o.useState)("outfallName"),[f,x]=(0,o.useState)("asc"),g=async e=>{try{l(!0);let r=new URLSearchParams({page:e.page.toString(),limit:e.limit.toString(),...e.search&&{search:e.search},...e.sortBy&&{sortBy:e.sortBy},...e.sortOrder&&{sortOrder:e.sortOrder}}),s=await fetch(`/api/outfalls?${r}`),a=await s.json();t(a.data||[]),p(e=>({...e,...a.pagination}))}catch(e){console.error("Error fetching outfalls:",e)}finally{l(!1)}},v=async e=>{try{if(!(await fetch(`/api/outfalls/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok)throw Error("Failed to update outfall");g({page:d.page,limit:d.limit,search:u,sortBy:m,sortOrder:f})}catch(e){throw console.error("Error updating outfall:",e),e}},y=[{field:"name",headerName:"Name",isPrimary:!0,renderCell:e=>(0,s.jsx)("div",{className:"group relative",children:(0,s.jsxs)("a",{href:`/outfalls/${e.id}`,className:"text-ocean-600 hover:text-ocean-800 inline-flex items-center",children:[(0,s.jsx)("span",{children:e.name}),(0,s.jsxs)("div",{className:"ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center",children:[(0,s.jsx)(n,{className:"h-4 w-4 mr-1"}),(0,s.jsx)("span",{className:"text-sm",children:"Edit"})]})]})})},{field:"description",headerName:"Description"},{field:"type",headerName:"Type"},{field:"facilityId",headerName:"Facility ID"},{field:"latitude",headerName:"Latitude"},{field:"longitude",headerName:"Longitude"},{field:"createdAt",headerName:"Created At",active:!1},{field:"updatedAt",headerName:"Updated At",active:!1},{field:"id",headerName:"ID",active:!1}];return r&&!e.length?(0,s.jsx)("div",{className:"p-8",children:"Loading..."}):(0,s.jsx)(i.A,{children:(0,s.jsxs)("div",{className:"p-8",children:[(0,s.jsx)("h1",{className:"text-2xl font-bold text-ocean-900 mb-6",children:"Outfalls"}),(0,s.jsx)(a.A,{rows:e,columns:y,entityType:"outfall",onSave:v,loading:r,pagination:{page:d.page,pageSize:d.limit,totalPages:d.totalPages,totalItems:d.total},onPageChange:e=>{p(t=>({...t,page:e}))},onSearch:e=>{c(e),p(e=>({...e,page:1}))},onSort:(e,t)=>{h(e),x(t)}})]})})}},46821:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/bish/Downloads/sites/crm-platform/app/outfalls/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/bish/Downloads/sites/crm-platform/app/outfalls/page.tsx","default")}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[5994,8775,2054,5684,6639,3438,8926,6163],()=>r(83165));module.exports=s})();