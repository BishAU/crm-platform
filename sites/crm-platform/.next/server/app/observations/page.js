(()=>{var e={};e.id=5535,e.ids=[5535],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},86624:e=>{"use strict";e.exports=require("querystring")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},38724:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>m,originalPathname:()=>d,pages:()=>u,routeModule:()=>h,tree:()=>c}),s(67890),s(84752),s(96560);var r=s(23191),a=s(88716),n=s(37922),i=s.n(n),o=s(95231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let c=["",{children:["observations",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,67890)),"/home/bish/Downloads/sites/crm-platform/app/observations/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,84752)),"/home/bish/Downloads/sites/crm-platform/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,96560)),"/home/bish/Downloads/sites/crm-platform/app/not-found.tsx"]}],u=["/home/bish/Downloads/sites/crm-platform/app/observations/page.tsx"],d="/observations/page",m={require:s,loadChunk:()=>Promise.resolve()},h=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/observations/page",pathname:"/observations",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},45391:(e,t,s)=>{Promise.resolve().then(s.bind(s,41407))},62988:(e,t,s)=>{"use strict";s.d(t,{Z:()=>x});var r=s(10326),a=s(17577),n=s(35047);function i(...e){return e.filter(Boolean).join(" ")}var o=s(90434);function l({isCollapsed:e,pathname:t,menuItems:s}){let[n,l]=(0,a.useState)(null);return r.jsx("nav",{className:"flex flex-col h-full",children:r.jsx("div",{className:"flex-1 px-2 py-2 space-y-1",children:s.map(({name:s,href:a,icon:c,subItems:u})=>{let d=u&&u.length>0,m=n===s;return(0,r.jsxs)("div",{children:[(0,r.jsxs)(o.default,{href:a,className:i("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white transition-colors duration-200",d?"cursor-pointer":"",t===a?"bg-[#005f9e]":""),onClick:e=>{d&&(e.preventDefault(),console.log("openMenu:",n,"name:",s),n===s?l(null):l(s))},"aria-expanded":d?m:void 0,"aria-haspopup":d?"true":void 0,children:[r.jsx("span",{className:i("mr-3",t===a?"text-white":"text-white/80","hover:bg-[#005f9e] !important"),children:c}),!e&&(0,r.jsxs)("div",{className:"flex-1 flex justify-between items-center",children:[r.jsx("span",{children:s}),d&&r.jsx("span",{className:"ml-2",children:m?"▴":"▾"})]})]}),d&&m&&!e&&r.jsx("div",{className:"pl-4",children:u.map(e=>(0,r.jsxs)(o.default,{href:e.href,className:i("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white hover:bg-[#005f9e] transition-colors duration-200",t===e.href?"bg-[#005f9e]":""),children:[r.jsx("span",{className:i("mr-3",t===e.href?"text-white":"text-white/80"),children:e.icon}),e.name]},e.name))})]},s)})})})}var c=s(77109);function u({collapsed:e,setIsCollapsed:t}){return(0,r.jsxs)("div",{className:"p-4 border-t border-gray-200 space-y-2",children:[r.jsx("div",{className:"text-sm text-gray-400 text-center",children:"Clean Ocean Foundation Since 2001"}),(0,r.jsxs)(o.default,{href:"/settings",className:`flex items-center text-sm text-gray-400 hover:text-gray-900 ${e?"justify-center":""}`,children:[r.jsx("span",{className:"mr-2",children:"⚙️"}),!e&&"Settings"]}),(0,r.jsxs)("button",{onClick:()=>(0,c.signOut)({callbackUrl:"/login"}),className:`flex items-center text-sm text-gray-400 hover:text-gray-900 w-full ${e?"justify-center":""}`,role:"button","aria-label":"Sign out",children:[r.jsx("span",{className:"mr-2",children:"\uD83D\uDEAA"}),!e&&"Sign Out"]})]})}let d={mainNav:[{name:"Dashboard",href:"/dashboard",icon:"\uD83D\uDCCA",subItems:[{name:"People",href:"/people",icon:"\uD83D\uDC65"},{name:"Outfalls",href:"/outfalls",icon:"\uD83C\uDF0A"},{name:"Water Authorities",href:"/water-authorities",icon:"\uD83C\uDFE2"},{name:"Indigenous Communities",href:"/indigenous-communities",icon:"\uD83C\uDFDB️"},{name:"Politicians",href:"/politicians",icon:"\uD83D\uDC54"},{name:"Observations",href:"/observations",icon:"\uD83D\uDC41️"},{name:"Customers",href:"/customers",icon:"\uD83C\uDFEA"},{name:"Facilities",href:"/facilities",icon:"\uD83C\uDFED"},{name:"Outfall Types",href:"/outfall-types",icon:"\uD83D\uDEB0"},{name:"Users",href:"/users",icon:"\uD83D\uDC64"}]},{name:"Marketing",href:"/marketing",icon:"\uD83D\uDCC8",subItems:[{name:"Lists",href:"/marketing/lists",icon:"\uD83D\uDCCB"},{name:"Campaigns",href:"/marketing/campaigns",icon:"\uD83D\uDCE2"},{name:"Templates",href:"/marketing/templates",icon:"\uD83D\uDCC4"}]},{name:"Support",href:"/support",icon:"\uD83C\uDFAB",subItems:[{name:"Tickets",href:"/support/tickets",icon:"\uD83C\uDFAB"}]}]};var m=s(46226);let h=({className:e,menuItems:t})=>{let s=(0,n.usePathname)(),[o,c]=(0,a.useState)(!1);return(0,r.jsxs)("aside",{className:i("flex flex-col h-full bg-[#0077be] border-r border-gray-200 overflow-y-auto overflow-x-hidden",o?"w-16":"w-64",e),children:[r.jsx("div",{className:"p-4 border-b border-gray-200",children:r.jsx(m.default,{src:"/images/cof_logo.png",alt:"Clean Ocean Foundation Logo",width:o?40:200,height:o?40:80,className:"mx-auto"})}),r.jsx("div",{className:"flex-1 overflow-y-auto",children:r.jsx(l,{isCollapsed:o,pathname:s,menuItems:d.mainNav})}),r.jsx(u,{collapsed:o,setIsCollapsed:c})]})},p=[{name:"Dashboard",href:"/dashboard",icon:"\uD83C\uDFE0"},{name:"Outfalls",href:"/outfalls",icon:"\uD83C\uDF0A"},{name:"Facilities",href:"/facilities",icon:"\uD83C\uDFED"},{name:"People",href:"/people",icon:"\uD83D\uDC65"},{name:"Water Authorities",href:"/water-authorities",icon:"\uD83D\uDCA7"},{name:"Indigenous Communities",href:"/indigenous-communities",icon:"\uD83C\uDF3F"},{name:"Politicians",href:"/politicians",icon:"\uD83D\uDC54"},{name:"Support Tickets",href:"/support-tickets",icon:"\uD83C\uDFAB"},{name:"Observations",href:"/observations",icon:"\uD83D\uDD0D"},{name:"Customers",href:"/customers",icon:"\uD83D\uDC64"},{name:"Outfall Types",href:"/outfall-types",icon:"\uD83C\uDF0A"},{name:"Marketing",href:"/marketing",icon:"\uD83D\uDCC8"}];function x({children:e}){let{data:t,status:s}=(0,c.useSession)();return((0,n.useRouter)(),(0,n.usePathname)(),"loading"===s)?r.jsx("div",{className:"flex min-h-screen items-center justify-center",children:r.jsx("div",{className:"text-lg",children:"Loading..."})}):t?(0,r.jsxs)("div",{className:"flex min-h-screen bg-gray-50",children:[r.jsx("div",{className:"fixed left-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto z-40",children:r.jsx(h,{menuItems:p})}),r.jsx("div",{className:"flex-1 ml-64",children:r.jsx("main",{className:"min-h-screen",children:e})})]}):null}},78039:(e,t,s)=>{"use strict";s.d(t,{Z:()=>l});var r=s(10326),a=s(17577);let n=a.forwardRef(function({title:e,titleId:t,...s},r){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":t},s),e?a.createElement("title",{id:t},e):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"}),a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"}))}),i=a.forwardRef(function({title:e,titleId:t,...s},r){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":t},s),e?a.createElement("title",{id:t},e):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"}))});var o=s(76682);function l({entityType:e,record:t,onSave:s}){let[l,c]=(0,a.useState)(t),[u,d]=(0,a.useState)(!1),[m,h]=(0,a.useState)(null),[p,x]=(0,a.useState)(()=>(0,o.LK)()[e]||{}),f=(e,t)=>{c(s=>({...s,[e]:t}))},b=async()=>{if(s){d(!0),h(null);try{await s(l)}catch(e){h(e instanceof Error?e.message:"Failed to save changes")}finally{d(!1)}}},g=t=>{let s=!p[t];(0,o.zk)(e,t,s),x(e=>({...e,[t]:s}))},v=Object.keys(t);return r.jsx("div",{className:"flex items-center justify-center z-50",children:(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden",children:[r.jsx("div",{className:"px-6 py-4 border-b border-ocean-100 flex items-center justify-between bg-ocean-50",children:r.jsx("h2",{className:"text-xl font-semibold text-ocean-900",children:"Edit Record"})}),(0,r.jsxs)("div",{className:"p-6 overflow-y-auto",children:[r.jsx("div",{className:"space-y-4",children:v.map(e=>{let t=!1!==p[e];return(0,r.jsxs)("div",{className:`transition-opacity ${t?"opacity-100":"opacity-50"}`,children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-1",children:[r.jsx("label",{className:"block text-sm font-medium text-ocean-700",children:e}),r.jsx("button",{onClick:()=>g(e),className:`p-1 rounded-md transition-colors ${t?"text-ocean-600 hover:bg-ocean-50":"text-gray-400 hover:bg-gray-50"}`,title:t?"Deactivate field":"Activate field",children:t?r.jsx(n,{className:"w-5 h-5"}):r.jsx(i,{className:"w-5 h-5"})})]}),"boolean"==typeof l[e]?r.jsx("button",{onClick:()=>f(e,!l[e]),className:`w-10 h-6 rounded-full p-1 transition-colors ${l[e]?"bg-green-500":"bg-gray-300"}`,children:r.jsx("div",{className:`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${l[e]?"translate-x-4":"translate-x-0"}`})}):r.jsx("input",{type:"text",value:l[e]||"",onChange:t=>f(e,t.target.value),className:`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${t?"border-ocean-200 focus:ring-ocean-500 focus:border-ocean-500":"border-gray-200 focus:ring-gray-500 focus:border-gray-500"}`,disabled:!t})]},e)})}),m&&r.jsx("div",{className:"mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm",children:m})]}),r.jsx("div",{className:"px-6 py-4 border-t border-ocean-100 bg-ocean-50 flex justify-end space-x-3",children:r.jsx("button",{onClick:b,disabled:u,className:`px-4 py-2 bg-ocean-600 text-white rounded-md transition-colors ${u?"opacity-50 cursor-not-allowed":"hover:bg-ocean-700"}`,children:u?"Saving...":"Save Changes"})})]})})}},41407:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>l});var r=s(10326),a=s(17577),n=s(91975),i=s(78039),o=s(62988);function l(){let[e,t]=(0,a.useState)(!0),[s,l]=(0,a.useState)([]),[c,u]=(0,a.useState)(null),d=async e=>{console.log("Save observation:",e);try{let t=await fetch(`/api/observations/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw Error(`HTTP error! status: ${t.status}`);let r=await t.json();l(s.map(e=>e.id===r.id?r:e))}catch(e){console.error("Failed to save observation:",e)}u(null)};return r.jsx(o.Z,{children:(0,r.jsxs)("div",{className:"p-8",children:[r.jsx("h1",{className:"text-2xl font-bold text-ocean-900 mb-6",children:"Observations"}),r.jsx(n.Z,{rows:s,columns:[{field:"id",headerName:"ID",isPrimary:!0,active:!1,renderCell:e=>r.jsx("a",{href:`/observations/${e.id}`,className:"text-ocean-600 hover:text-ocean-800",children:e.id})},{field:"date",headerName:"Date",active:!0},{field:"type",headerName:"Type",active:!0},{field:"description",headerName:"Description",active:!1},{field:"location",headerName:"Location",active:!0}],entityType:"observation",onSave:d,loading:e}),c&&r.jsx(i.Z,{entityType:"observation",record:c,onSave:d})]})})}},67890:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(68570).createProxy)(String.raw`/home/bish/Downloads/sites/crm-platform/app/observations/page.tsx#default`)}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[9380,7313,8435,224,9117,434,7083],()=>s(38724));module.exports=r})();