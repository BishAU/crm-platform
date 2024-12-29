(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5329],{5421:function(e,a,t){Promise.resolve().then(t.bind(t,2528))},2172:function(e,a,t){"use strict";t.d(a,{Z:function(){return p}});var s=t(7437),n=t(2265),i=t(9376);function r(){for(var e=arguments.length,a=Array(e),t=0;t<e;t++)a[t]=arguments[t];return a.filter(Boolean).join(" ")}var o=t(7648);function l(e){let{isCollapsed:a,pathname:t,menuItems:i}=e,[l,c]=(0,n.useState)(null);return(0,s.jsx)("nav",{className:"flex flex-col h-full",children:(0,s.jsx)("div",{className:"flex-1 px-2 py-2 space-y-1",children:i.map(e=>{let{name:n,href:i,icon:u,subItems:m}=e,d=m&&m.length>0,h=l===n;return(0,s.jsxs)("div",{children:[(0,s.jsxs)(o.default,{href:i,className:r("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white transition-colors duration-200",d?"cursor-pointer":"",t===i?"bg-[#005f9e]":""),onClick:e=>{d&&(e.preventDefault(),console.log("openMenu:",l,"name:",n),l===n?c(null):c(n))},"aria-expanded":d?h:void 0,"aria-haspopup":d?"true":void 0,children:[(0,s.jsx)("span",{className:r("mr-3",t===i?"text-white":"text-white/80","hover:bg-[#005f9e] !important"),children:u}),!a&&(0,s.jsxs)("div",{className:"flex-1 flex justify-between items-center",children:[(0,s.jsx)("span",{children:n}),d&&(0,s.jsx)("span",{className:"ml-2",children:h?"▴":"▾"})]})]}),d&&h&&!a&&(0,s.jsx)("div",{className:"pl-4",children:m.map(e=>(0,s.jsxs)(o.default,{href:e.href,className:r("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white hover:bg-[#005f9e] transition-colors duration-200",t===e.href?"bg-[#005f9e]":""),children:[(0,s.jsx)("span",{className:r("mr-3",t===e.href?"text-white":"text-white/80"),children:e.icon}),e.name]},e.name))})]},n)})})})}var c=t(605);function u(e){let{collapsed:a,setIsCollapsed:t}=e;return(0,s.jsxs)("div",{className:"p-4 border-t border-gray-200 space-y-2",children:[(0,s.jsx)("div",{className:"text-sm text-gray-400 text-center",children:"Clean Ocean Foundation Since 2001"}),(0,s.jsxs)(o.default,{href:"/settings",className:"flex items-center text-sm text-gray-400 hover:text-gray-900 ".concat(a?"justify-center":""),children:[(0,s.jsx)("span",{className:"mr-2",children:"⚙️"}),!a&&"Settings"]}),(0,s.jsxs)("button",{onClick:()=>(0,c.signOut)({callbackUrl:"/login"}),className:"flex items-center text-sm text-gray-400 hover:text-gray-900 w-full ".concat(a?"justify-center":""),role:"button","aria-label":"Sign out",children:[(0,s.jsx)("span",{className:"mr-2",children:"\uD83D\uDEAA"}),!a&&"Sign Out"]})]})}let m=[{name:"Dashboard",href:"/dashboard",icon:"\uD83D\uDCCA",subItems:[{name:"People",href:"/people",icon:"\uD83D\uDC65"},{name:"Outfalls",href:"/outfalls",icon:"\uD83C\uDF0A"},{name:"Water Authorities",href:"/water-authorities",icon:"\uD83C\uDFE2"},{name:"Indigenous Communities",href:"/indigenous-communities",icon:"\uD83C\uDFDB️"},{name:"Politicians",href:"/politicians",icon:"\uD83D\uDC54"},{name:"Observations",href:"/observations",icon:"\uD83D\uDC41️"},{name:"Customers",href:"/customers",icon:"\uD83C\uDFEA"},{name:"Facilities",href:"/facilities",icon:"\uD83C\uDFED"},{name:"Outfall Types",href:"/outfall-types",icon:"\uD83D\uDEB0"},{name:"Users",href:"/users",icon:"\uD83D\uDC64"}]},{name:"Marketing",href:"/marketing",icon:"\uD83D\uDCC8",subItems:[{name:"Lists",href:"/marketing/lists",icon:"\uD83D\uDCCB"},{name:"Campaigns",href:"/marketing/campaigns",icon:"\uD83D\uDCE2"},{name:"Templates",href:"/marketing/templates",icon:"\uD83D\uDCC4"}]},{name:"Support",href:"/support",icon:"\uD83C\uDFAB",subItems:[{name:"Tickets",href:"/support/tickets",icon:"\uD83C\uDFAB"}]}];var d=t(3145),h=e=>{let{className:a,menuItems:t}=e,o=(0,i.usePathname)(),[c,h]=(0,n.useState)(!1);return(0,s.jsxs)("aside",{className:r("flex flex-col h-full bg-[#0077be] border-r border-gray-200 overflow-y-auto overflow-x-hidden",c?"w-16":"w-64",a),children:[(0,s.jsx)("div",{className:"p-4 border-b border-gray-200",children:(0,s.jsx)(d.default,{src:"/images/cof_logo.png",alt:"Clean Ocean Foundation Logo",width:c?40:200,height:c?40:80,className:"mx-auto"})}),(0,s.jsx)("div",{className:"flex-1 overflow-y-auto",children:(0,s.jsx)(l,{isCollapsed:c,pathname:o,menuItems:m})}),(0,s.jsx)(u,{collapsed:c,setIsCollapsed:h})]})};let f=[{name:"Dashboard",href:"/dashboard",icon:"\uD83C\uDFE0"},{name:"Outfalls",href:"/outfalls",icon:"\uD83C\uDF0A"},{name:"Facilities",href:"/facilities",icon:"\uD83C\uDFED"},{name:"People",href:"/people",icon:"\uD83D\uDC65"},{name:"Water Authorities",href:"/water-authorities",icon:"\uD83D\uDCA7"},{name:"Indigenous Communities",href:"/indigenous-communities",icon:"\uD83C\uDF3F"},{name:"Politicians",href:"/politicians",icon:"\uD83D\uDC54"},{name:"Support Tickets",href:"/support-tickets",icon:"\uD83C\uDFAB"},{name:"Observations",href:"/observations",icon:"\uD83D\uDD0D"},{name:"Customers",href:"/customers",icon:"\uD83D\uDC64"},{name:"Outfall Types",href:"/outfall-types",icon:"\uD83C\uDF0A"},{name:"Marketing",href:"/marketing",icon:"\uD83D\uDCC8"}];function p(e){let{children:a}=e,{data:t,status:r}=(0,c.useSession)(),o=(0,i.useRouter)(),l=(0,i.usePathname)();return((0,n.useEffect)(()=>{"unauthenticated"===r?o.push("/login"):"authenticated"===r&&"/"===l&&o.push("/dashboard")},[r,o,l]),"loading"===r)?(0,s.jsx)("div",{className:"flex min-h-screen items-center justify-center",children:(0,s.jsx)("div",{className:"text-lg",children:"Loading..."})}):t?(0,s.jsxs)("div",{className:"flex min-h-screen bg-gray-50",children:[(0,s.jsx)("div",{className:"fixed left-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto z-40",children:(0,s.jsx)(h,{menuItems:f})}),(0,s.jsx)("div",{className:"flex-1 ml-64",children:(0,s.jsx)("main",{className:"min-h-screen",children:a})})]}):null}},2528:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return o}});var s=t(7437),n=t(9893),i=t(2265),r=t(2172);function o(){let[e,a]=(0,i.useState)([]),[t,o]=(0,i.useState)(!0),[l,c]=(0,i.useState)({page:1,limit:10,total:0,totalPages:0}),[u,m]=(0,i.useState)(""),[d,h]=(0,i.useState)("fullName"),[f,p]=(0,i.useState)("asc"),D=async e=>{try{o(!0);let t=new URLSearchParams({page:e.page.toString(),limit:e.limit.toString(),...e.search&&{search:e.search},...e.sortBy&&{sortBy:e.sortBy},...e.sortOrder&&{sortOrder:e.sortOrder}}),s=await fetch("/api/people?".concat(t)),n=await s.json();a(n.data||[]),c(e=>({...e,...n.pagination}))}catch(e){console.error("Error fetching people:",e)}finally{o(!1)}};(0,i.useEffect)(()=>{D({page:l.page,limit:l.limit,search:u,sortBy:d,sortOrder:f})},[l.page,l.limit,u,d,f]);let g=async e=>{try{if(!(await fetch("/api/people/".concat(e.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok)throw Error("Failed to update person");D({page:l.page,limit:l.limit,search:u,sortBy:d,sortOrder:f})}catch(e){throw console.error("Error updating person:",e),e}};return t&&!e.length?(0,s.jsx)("div",{className:"p-8",children:"Loading..."}):(0,s.jsx)(r.Z,{children:(0,s.jsxs)("div",{className:"p-8",children:[(0,s.jsx)("h1",{className:"text-2xl font-bold text-ocean-900 mb-6",children:"People"}),(0,s.jsx)(n.Z,{rows:e,columns:[{field:"name",headerName:"Name",isPrimary:!0},{field:"email",headerName:"Email"},{field:"phoneNumber",headerName:"Phone"},{field:"organisation",headerName:"Organisation"},{field:"address1",headerName:"Address"},{field:"city",headerName:"City"},{field:"state",headerName:"State"},{field:"postcode",headerName:"Postcode"},{field:"country",headerName:"Country"},{field:"createdAt",headerName:"Created At"},{field:"updatedAt",headerName:"Updated At"}],entityType:"person",onSave:g,loading:t,pagination:{page:l.page,pageSize:l.limit,totalPages:l.totalPages,totalItems:l.total},onPageChange:e=>{c(a=>({...a,page:e}))},onSearch:e=>{m(e),c(e=>({...e,page:1}))},onSort:(e,a)=>{h(e),p(a)}})]})})}}},function(e){e.O(0,[3338,605,785,4948,7648,9893,2971,2117,1744],function(){return e(e.s=5421)}),_N_E=e.O()}]);