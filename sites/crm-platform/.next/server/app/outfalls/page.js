(()=>{var e={};e.id=5517,e.ids=[5517],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},76208:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>d,pages:()=>u,routeModule:()=>h,tree:()=>c}),a(84955),a(84752),a(96560);var s=a(23191),r=a(88716),i=a(37922),n=a.n(i),o=a(95231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);a.d(t,l);let c=["",{children:["outfalls",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,84955)),"/home/bish/Downloads/sites/crm-platform/app/outfalls/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,84752)),"/home/bish/Downloads/sites/crm-platform/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.bind(a,96560)),"/home/bish/Downloads/sites/crm-platform/app/not-found.tsx"]}],u=["/home/bish/Downloads/sites/crm-platform/app/outfalls/page.tsx"],d="/outfalls/page",m={require:a,loadChunk:()=>Promise.resolve()},h=new s.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/outfalls/page",pathname:"/outfalls",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},21186:(e,t,a)=>{Promise.resolve().then(a.bind(a,96477))},36570:(e,t,a)=>{"use strict";a.d(t,{Z:()=>p});var s=a(10326),r=a(17577),i=a(35047),n=a(41135),o=a(31009);function l(...e){return(0,o.m6)((0,n.W)(e))}var c=a(90434);function u({isCollapsed:e,pathname:t,menuItems:i}){let[n,o]=(0,r.useState)(null);return s.jsx("nav",{className:"flex flex-col h-full",children:s.jsx("div",{className:"flex-1 px-2 py-2 space-y-1",children:i.map(({name:r,href:i,icon:u,subItems:d,isButton:m,onClick:h})=>{let f=d&&d.length>0,p=n===r;return(0,s.jsxs)("div",{children:[m?(0,s.jsxs)("button",{className:l("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white transition-colors duration-200 w-full text-left",t===i?"bg-[#005f9e]":""),onClick:async e=>{if("signOut"===h){e.preventDefault();let{signOut:t}=await Promise.resolve().then(a.t.bind(a,77109,23));t({callbackUrl:"/login"})}},children:[s.jsx("span",{className:l("mr-3",t===i?"text-white":"text-white/80","hover:bg-[#005f9e] !important"),children:u}),!e&&s.jsx("div",{className:"flex-1 flex justify-between items-center",children:s.jsx("span",{children:r})})]}):(0,s.jsxs)(c.default,{href:i,className:l("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white transition-colors duration-200",f?"cursor-pointer":"",t===i?"bg-[#005f9e]":""),onClick:async e=>{console.log("pathname:",t,"href:",i,"active:",t===i),f&&(e.preventDefault(),console.log("openMenu:",n,"name:",r),n===r?o(null):o(r))},"aria-expanded":f?p:void 0,"aria-haspopup":f?"true":void 0,children:[s.jsx("span",{className:l("mr-3",t===i?"text-white":"text-white/80","hover:bg-[#005f9e] !important"),children:u}),!e&&(0,s.jsxs)("div",{className:"flex-1 flex justify-between items-center",children:[s.jsx("span",{children:r}),f&&s.jsx("span",{className:"ml-2",children:p?"▴":"▾"})]})]}),f&&p&&!e&&s.jsx("div",{className:"pl-4",children:d.map(e=>(0,s.jsxs)(c.default,{href:e.href,className:l("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white hover:bg-[#005f9e] transition-colors duration-200",t===e.href?"bg-[#005f9e]":""),children:[s.jsx("span",{className:l("mr-3",t===e.href?"text-white":"text-white/80"),children:e.icon}),e.name]},e.name))})]},r)})})})}let d={mainNav:[{name:"Dashboard",href:"/dashboard",icon:"\uD83D\uDCCA",subItems:[{name:"People",href:"/people",icon:"\uD83D\uDC65"},{name:"Outfalls",href:"/outfalls",icon:"\uD83C\uDF0A"},{name:"Water Authorities",href:"/water-authorities",icon:"\uD83C\uDFE2"},{name:"Indigenous Communities",href:"/indigenous-communities",icon:"\uD83C\uDFDB️"},{name:"Politicians",href:"/politicians",icon:"\uD83D\uDC54"},{name:"Observations",href:"/observations",icon:"\uD83D\uDC41️"},{name:"Customers",href:"/customers",icon:"\uD83C\uDFEA"},{name:"Facilities",href:"/facilities",icon:"\uD83C\uDFED"},{name:"Outfall Types",href:"/outfall-types",icon:"\uD83D\uDEB0"}]},{name:"Marketing",href:"/marketing",icon:"\uD83D\uDCC8",subItems:[{name:"Lists",href:"/marketing/lists",icon:"\uD83D\uDCCB"},{name:"Campaigns",href:"/marketing/campaigns",icon:"\uD83D\uDCE2"},{name:"Templates",href:"/marketing/templates",icon:"\uD83D\uDCC4"}]},{name:"Support",href:"/support",icon:"\uD83C\uDFAB",subItems:[{name:"Tickets",href:"/support/tickets",icon:"\uD83C\uDFAB"}]}],footerNav:[{name:"Clean Ocean Foundation",href:"https://www.cleanocean.org/",icon:"",isExternal:!0},{name:"Settings",href:"/settings",icon:"⚙️",subItems:[{name:"Users",href:"/users",icon:"\uD83D\uDC64"}]},{name:"Sign out",href:"#",icon:"\uD83D\uDEAA",onClick:"signOut",isButton:!0}]};var m=a(46226);let h=({className:e})=>{let t=(0,i.usePathname)(),[a,n]=(0,r.useState)(!1);return(0,s.jsxs)("aside",{className:l("flex flex-col h-full bg-[#0077be] border-r border-gray-200",a?"w-16":"w-64",e),children:[s.jsx("div",{className:"p-4 border-b border-gray-200",children:s.jsx(c.default,{href:"/dashboard",children:s.jsx(m.default,{src:"/images/cof_logo.png",alt:"Clean Ocean Foundation Logo",width:a?40:200,height:a?40:80,className:"mx-auto",priority:!0})})}),s.jsx("div",{className:"flex-1 overflow-y-auto",children:s.jsx(u,{isCollapsed:a,pathname:t,menuItems:[...d.mainNav,...d.footerNav]})})]})};var f=a(77109);function p({children:e}){let{data:t,status:a}=(0,f.useSession)();return((0,i.useRouter)(),(0,i.usePathname)(),"loading"===a)?s.jsx("div",{className:"flex min-h-screen items-center justify-center",children:s.jsx("div",{className:"text-lg",children:"Loading..."})}):t?(0,s.jsxs)("div",{className:"flex min-h-screen bg-gray-50",children:[s.jsx("div",{className:"fixed left-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto z-40",children:s.jsx(h,{})}),s.jsx("div",{className:"flex-1 ml-64",children:s.jsx("main",{className:"min-h-screen",children:e})})]}):null}},96477:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>l});var s=a(10326),r=a(17577),i=a(16887),n=a(36570),o=a(76682);function l(){let[e,t]=(0,r.useState)([]),[a,l]=(0,r.useState)(!0),[c,u]=(0,r.useState)({page:1,limit:10,total:0,totalPages:0}),[d,m]=(0,r.useState)(""),[h,f]=(0,r.useState)("name"),[p,x]=(0,r.useState)("asc"),g=async e=>{try{l(!0);let a=new URLSearchParams({page:e.page.toString(),limit:e.limit.toString(),...e.search&&{search:e.search},...e.sortBy&&{sortBy:e.sortBy},...e.sortOrder&&{sortOrder:e.sortOrder}}),s=await fetch(`/api/outfalls?${a}`),r=await s.json();t(r.data||[]),u(e=>({...e,...r.pagination}))}catch(e){console.error("Error fetching outfalls:",e)}finally{l(!1)}},D=async e=>{try{if(!(await fetch(`/api/outfalls/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok)throw Error("Failed to update outfall");g({page:c.page,limit:c.limit,search:d,sortBy:h,sortOrder:p})}catch(e){throw console.error("Error updating outfall:",e),e}},v=[{field:"name",headerName:"Name",isPrimary:!0},{field:"type",headerName:"Type"},{field:"location",headerName:"Location"},{field:"createdAt",headerName:"Created At",active:!1},{field:"updatedAt",headerName:"Updated At",active:!1},{field:"id",headerName:"ID",active:!1}],b=(0,o.rs)("outfall",v.map(e=>e.field)).map(e=>v.find(t=>t.field===e)).filter(e=>void 0!==e);return a&&!e.length?s.jsx("div",{className:"flex items-center justify-center h-full",children:s.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"})}):s.jsx(n.Z,{children:(0,s.jsxs)("div",{className:"p-8",children:[s.jsx("h1",{className:"text-2xl font-bold text-ocean-900 mb-6",children:"Outfalls"}),s.jsx(i.Z,{rows:e,columns:b,entityType:"outfall",onSave:D,loading:a,pagination:{page:c.page,pageSize:c.limit,totalPages:c.totalPages,totalItems:c.total},onPageChange:e=>{u(t=>({...t,page:e}))},onSearch:e=>{m(e),u(e=>({...e,page:1}))},onSort:(e,t)=>{f(e),x(t)}})]})})}},84955:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>s});let s=(0,a(68570).createProxy)(String.raw`/home/bish/Downloads/sites/crm-platform/app/outfalls/page.tsx#default`)}};var t=require("../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[8948,77,4277,6226,325,9792],()=>a(76208));module.exports=s})();