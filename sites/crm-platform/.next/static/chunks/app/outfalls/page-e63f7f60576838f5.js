(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5517],{572:function(e,t,a){Promise.resolve().then(a.bind(a,316))},1308:function(e,t,a){"use strict";a.d(t,{Z:function(){return x}});var n=a(7437),i=a(2265),s=a(9376),r=a(1994),l=a(3335);function o(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,l.m6)((0,r.W)(t))}var c=a(7648);function u(e){let{isCollapsed:t,pathname:s,menuItems:r}=e,[l,u]=(0,i.useState)(null);return(0,n.jsx)("nav",{className:"flex flex-col h-full",children:(0,n.jsx)("div",{className:"flex-1 px-2 py-2 space-y-1",children:r.map(e=>{let{name:i,href:r,icon:d,subItems:m,isButton:h,onClick:f}=e,p=m&&m.length>0,x=l===i;return(0,n.jsxs)("div",{children:[h?(0,n.jsxs)("button",{className:o("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white transition-colors duration-200 w-full text-left",s===r?"bg-[#005f9e]":""),onClick:async e=>{if("signOut"===f){e.preventDefault();let{signOut:t}=await Promise.resolve().then(a.t.bind(a,605,23));t({callbackUrl:"/login"})}},children:[(0,n.jsx)("span",{className:o("mr-3",s===r?"text-white":"text-white/80","hover:bg-[#005f9e] !important"),children:d}),!t&&(0,n.jsx)("div",{className:"flex-1 flex justify-between items-center",children:(0,n.jsx)("span",{children:i})})]}):(0,n.jsxs)(c.default,{href:r,className:o("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white transition-colors duration-200",p?"cursor-pointer":"",s===r?"bg-[#005f9e]":""),onClick:async e=>{console.log("pathname:",s,"href:",r,"active:",s===r),p&&(e.preventDefault(),console.log("openMenu:",l,"name:",i),l===i?u(null):u(i))},"aria-expanded":p?x:void 0,"aria-haspopup":p?"true":void 0,children:[(0,n.jsx)("span",{className:o("mr-3",s===r?"text-white":"text-white/80","hover:bg-[#005f9e] !important"),children:d}),!t&&(0,n.jsxs)("div",{className:"flex-1 flex justify-between items-center",children:[(0,n.jsx)("span",{children:i}),p&&(0,n.jsx)("span",{className:"ml-2",children:x?"▴":"▾"})]})]}),p&&x&&!t&&(0,n.jsx)("div",{className:"pl-4",children:m.map(e=>(0,n.jsxs)(c.default,{href:e.href,className:o("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white hover:bg-[#005f9e] transition-colors duration-200",s===e.href?"bg-[#005f9e]":""),children:[(0,n.jsx)("span",{className:o("mr-3",s===e.href?"text-white":"text-white/80"),children:e.icon}),e.name]},e.name))})]},i)})})})}let d=[{name:"Dashboard",href:"/dashboard",icon:"\uD83D\uDCCA",subItems:[{name:"People",href:"/people",icon:"\uD83D\uDC65"},{name:"Outfalls",href:"/outfalls",icon:"\uD83C\uDF0A"},{name:"Water Authorities",href:"/water-authorities",icon:"\uD83C\uDFE2"},{name:"Indigenous Communities",href:"/indigenous-communities",icon:"\uD83C\uDFDB️"},{name:"Politicians",href:"/politicians",icon:"\uD83D\uDC54"},{name:"Observations",href:"/observations",icon:"\uD83D\uDC41️"},{name:"Customers",href:"/customers",icon:"\uD83C\uDFEA"},{name:"Facilities",href:"/facilities",icon:"\uD83C\uDFED"},{name:"Outfall Types",href:"/outfall-types",icon:"\uD83D\uDEB0"}]},{name:"Marketing",href:"/marketing",icon:"\uD83D\uDCC8",subItems:[{name:"Lists",href:"/marketing/lists",icon:"\uD83D\uDCCB"},{name:"Campaigns",href:"/marketing/campaigns",icon:"\uD83D\uDCE2"},{name:"Templates",href:"/marketing/templates",icon:"\uD83D\uDCC4"}]},{name:"Support",href:"/support",icon:"\uD83C\uDFAB",subItems:[{name:"Tickets",href:"/support/tickets",icon:"\uD83C\uDFAB"}]}],m=[{name:"Clean Ocean Foundation",href:"https://www.cleanocean.org/",icon:"",isExternal:!0},{name:"Settings",href:"/settings",icon:"⚙️",subItems:[{name:"Users",href:"/users",icon:"\uD83D\uDC64"}]},{name:"Sign out",href:"#",icon:"\uD83D\uDEAA",onClick:"signOut",isButton:!0}];var h=a(3145),f=e=>{let{className:t}=e,a=(0,s.usePathname)(),[r,l]=(0,i.useState)(!1);return(0,n.jsxs)("aside",{className:o("flex flex-col h-full bg-[#0077be] border-r border-gray-200",r?"w-16":"w-64",t),children:[(0,n.jsx)("div",{className:"p-4 border-b border-gray-200",children:(0,n.jsx)(c.default,{href:"/dashboard",children:(0,n.jsx)(h.default,{src:"/images/cof_logo.png",alt:"Clean Ocean Foundation Logo",width:r?40:200,height:r?40:80,className:"mx-auto",priority:!0})})}),(0,n.jsx)("div",{className:"flex-1 overflow-y-auto",children:(0,n.jsx)(u,{isCollapsed:r,pathname:a,menuItems:d})}),(0,n.jsx)("div",{className:"border-t border-gray-200 p-4",children:m.map(e=>e.isExternal?(0,n.jsx)("a",{href:e.href,target:"_blank",rel:"noopener noreferrer",className:"block px-4 py-2 text-white font-bold text-sm",children:e.name},e.name):(0,n.jsx)("div",{children:(0,n.jsx)(u,{isCollapsed:r,pathname:a,menuItems:[e]})},e.name))})]})},p=a(605);function x(e){let{children:t}=e,{data:a,status:r}=(0,p.useSession)(),l=(0,s.useRouter)(),o=(0,s.usePathname)();return((0,i.useEffect)(()=>{"unauthenticated"===r?l.push("/login"):"authenticated"===r&&"/"===o&&l.push("/dashboard")},[r,l,o]),"loading"===r)?(0,n.jsx)("div",{className:"flex min-h-screen items-center justify-center",children:(0,n.jsx)("div",{className:"text-lg",children:"Loading..."})}):a?(0,n.jsxs)("div",{className:"flex min-h-screen bg-gray-50",children:[(0,n.jsx)("div",{className:"fixed left-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto z-40",children:(0,n.jsx)(f,{})}),(0,n.jsx)("div",{className:"flex-1 ml-64",children:(0,n.jsx)("main",{className:"min-h-screen",children:t})})]}):null}},316:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return o}});var n=a(7437),i=a(3548),s=a(2265),r=a(1308);let l=s.forwardRef(function(e,t){let{title:a,titleId:n,...i}=e;return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":n},i),a?s.createElement("title",{id:n},a):null,s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"}))});function o(){let[e,t]=(0,s.useState)([]),[a,o]=(0,s.useState)(!0),[c,u]=(0,s.useState)({page:1,limit:10,total:0,totalPages:0}),[d,m]=(0,s.useState)(""),[h,f]=(0,s.useState)("outfallName"),[p,x]=(0,s.useState)("asc"),g=async e=>{try{o(!0);let a=new URLSearchParams({page:e.page.toString(),limit:e.limit.toString(),...e.search&&{search:e.search},...e.sortBy&&{sortBy:e.sortBy},...e.sortOrder&&{sortOrder:e.sortOrder}}),n=await fetch("/api/outfalls?".concat(a)),i=await n.json();t(i.data||[]),u(e=>({...e,...i.pagination}))}catch(e){console.error("Error fetching outfalls:",e)}finally{o(!1)}};(0,s.useEffect)(()=>{g({page:c.page,limit:c.limit,search:d,sortBy:h,sortOrder:p})},[c.page,c.limit,d,h,p]);let D=async e=>{try{if(!(await fetch("/api/outfalls/".concat(e.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok)throw Error("Failed to update outfall");g({page:c.page,limit:c.limit,search:d,sortBy:h,sortOrder:p})}catch(e){throw console.error("Error updating outfall:",e),e}},j=[{field:"name",headerName:"Name",isPrimary:!0,renderCell:e=>(0,n.jsx)("div",{className:"group relative",children:(0,n.jsxs)("a",{href:"/outfalls/".concat(e.id),className:"text-ocean-600 hover:text-ocean-800 inline-flex items-center",children:[(0,n.jsx)("span",{children:e.name}),(0,n.jsxs)("div",{className:"ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center",children:[(0,n.jsx)(l,{className:"h-4 w-4 mr-1"}),(0,n.jsx)("span",{className:"text-sm",children:"Edit"})]})]})})},{field:"description",headerName:"Description"},{field:"type",headerName:"Type"},{field:"facilityId",headerName:"Facility ID"},{field:"latitude",headerName:"Latitude"},{field:"longitude",headerName:"Longitude"},{field:"createdAt",headerName:"Created At",active:!1},{field:"updatedAt",headerName:"Updated At",active:!1},{field:"id",headerName:"ID",active:!1}];return a&&!e.length?(0,n.jsx)("div",{className:"p-8",children:"Loading..."}):(0,n.jsx)(r.Z,{children:(0,n.jsxs)("div",{className:"p-8",children:[(0,n.jsx)("h1",{className:"text-2xl font-bold text-ocean-900 mb-6",children:"Outfalls"}),(0,n.jsx)(i.Z,{rows:e,columns:j,entityType:"outfall",onSave:D,loading:a,pagination:{page:c.page,pageSize:c.limit,totalPages:c.totalPages,totalItems:c.total},onPageChange:e=>{u(t=>({...t,page:e}))},onSearch:e=>{m(e),u(e=>({...e,page:1}))},onSort:(e,t)=>{f(e),x(t)}})]})})}}},function(e){e.O(0,[3338,605,785,964,1196,3548,2971,2117,1744],function(){return e(e.s=572)}),_N_E=e.O()}]);