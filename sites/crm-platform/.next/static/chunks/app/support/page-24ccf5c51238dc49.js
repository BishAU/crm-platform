(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6174],{7722:(e,t,a)=>{Promise.resolve().then(a.bind(a,8872))},573:(e,t,a)=>{"use strict";a.d(t,{A:()=>g});var s=a(5155),i=a(2115),n=a(6046),r=a(3463),o=a(9795);function l(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,o.QP)((0,r.$)(t))}var c=a(8173),m=a.n(c);function d(e){let{isCollapsed:t,pathname:n,menuItems:r}=e,[o,c]=(0,i.useState)(null);return(0,s.jsx)("nav",{className:"flex flex-col h-full",children:(0,s.jsx)("div",{className:"flex-1 px-2 py-2 space-y-1",children:r.map(e=>{let{name:i,href:r,icon:d,subItems:h,isButton:f,onClick:u}=e,p=h&&h.length>0,x=o===i;return(0,s.jsxs)("div",{children:[f?(0,s.jsxs)("button",{className:l("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white transition-colors duration-200 w-full text-left",n===r?"bg-[#005f9e]":""),onClick:async e=>{if("signOut"===u){e.preventDefault();let{signOut:t}=await Promise.resolve().then(a.t.bind(a,2615,23));t({callbackUrl:"/login"})}},children:[(0,s.jsx)("span",{className:l("mr-3",n===r?"text-white":"text-white/80","hover:bg-[#005f9e] !important"),children:d}),!t&&(0,s.jsx)("div",{className:"flex-1 flex justify-between items-center",children:(0,s.jsx)("span",{children:i})})]}):(0,s.jsxs)(m(),{href:r,className:l("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white transition-colors duration-200",p?"cursor-pointer":"",n===r?"bg-[#005f9e]":""),onClick:async e=>{console.log("pathname:",n,"href:",r,"active:",n===r),p&&(e.preventDefault(),console.log("openMenu:",o,"name:",i),o===i?c(null):c(i))},"aria-expanded":p?x:void 0,"aria-haspopup":p?"true":void 0,children:[(0,s.jsx)("span",{className:l("mr-3",n===r?"text-white":"text-white/80","hover:bg-[#005f9e] !important"),children:d}),!t&&(0,s.jsxs)("div",{className:"flex-1 flex justify-between items-center",children:[(0,s.jsx)("span",{children:i}),p&&(0,s.jsx)("span",{className:"ml-2",children:x?"▴":"▾"})]})]}),p&&x&&!t&&(0,s.jsx)("div",{className:"pl-4",children:h.map(e=>(0,s.jsxs)(m(),{href:e.href,className:l("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white hover:bg-[#005f9e] transition-colors duration-200",n===e.href?"bg-[#005f9e]":""),children:[(0,s.jsx)("span",{className:l("mr-3",n===e.href?"text-white":"text-white/80"),children:e.icon}),e.name]},e.name))})]},i)})})})}let h={mainNav:[{name:"Dashboard",href:"/dashboard",icon:"\uD83D\uDCCA",subItems:[{name:"People",href:"/people",icon:"\uD83D\uDC65"},{name:"Outfalls",href:"/outfalls",icon:"\uD83C\uDF0A"},{name:"Water Authorities",href:"/water-authorities",icon:"\uD83C\uDFE2"},{name:"Indigenous Communities",href:"/indigenous-communities",icon:"\uD83C\uDFDB️"},{name:"Politicians",href:"/politicians",icon:"\uD83D\uDC54"},{name:"Observations",href:"/observations",icon:"\uD83D\uDC41️"},{name:"Customers",href:"/customers",icon:"\uD83C\uDFEA"},{name:"Facilities",href:"/facilities",icon:"\uD83C\uDFED"},{name:"Outfall Types",href:"/outfall-types",icon:"\uD83D\uDEB0"}]},{name:"Marketing",href:"/marketing",icon:"\uD83D\uDCC8",subItems:[{name:"Lists",href:"/marketing/lists",icon:"\uD83D\uDCCB"},{name:"Campaigns",href:"/marketing/campaigns",icon:"\uD83D\uDCE2"},{name:"Templates",href:"/marketing/templates",icon:"\uD83D\uDCC4"}]},{name:"Support",href:"/support",icon:"\uD83C\uDFAB",subItems:[{name:"Tickets",href:"/support/tickets",icon:"\uD83C\uDFAB"}]}],footerNav:[{name:"Clean Ocean Foundation",href:"https://www.cleanocean.org/",icon:"",isExternal:!0},{name:"Settings",href:"/settings",icon:"⚙️",subItems:[{name:"Users",href:"/users",icon:"\uD83D\uDC64"}]},{name:"Sign out",href:"#",icon:"\uD83D\uDEAA",onClick:"signOut",isButton:!0}]};var f=a(5565);let u=e=>{let{className:t}=e,a=(0,n.usePathname)(),[r,o]=(0,i.useState)(!1);return(0,s.jsxs)("aside",{className:l("flex flex-col h-full bg-[#0077be] border-r border-gray-200",r?"w-16":"w-64",t),children:[(0,s.jsx)("div",{className:"p-4 border-b border-gray-200",children:(0,s.jsx)(m(),{href:"/dashboard",children:(0,s.jsx)(f.default,{src:"/images/cof_logo.png",alt:"Clean Ocean Foundation Logo",width:r?40:200,height:r?40:80,className:"mx-auto",priority:!0})})}),(0,s.jsx)("div",{className:"flex-1 overflow-y-auto",children:(0,s.jsx)(d,{isCollapsed:r,pathname:a,menuItems:h.mainNav})}),(0,s.jsx)("div",{className:"border-t border-gray-200 p-4",children:h.footerNav.map(e=>e.isExternal?(0,s.jsx)("a",{href:e.href,target:"_blank",rel:"noopener noreferrer",className:"block px-4 py-2 text-white font-bold text-sm",children:e.name},e.name):(0,s.jsx)("div",{children:(0,s.jsx)(d,{isCollapsed:r,pathname:a,menuItems:[e]})},e.name))})]})};var p=a(2615);let x=[{name:"Dashboard",href:"/dashboard",icon:"\uD83C\uDFE0"},{name:"Outfalls",href:"/outfalls",icon:"\uD83C\uDF0A"},{name:"Facilities",href:"/facilities",icon:"\uD83C\uDFED"},{name:"People",href:"/people",icon:"\uD83D\uDC65"},{name:"Water Authorities",href:"/water-authorities",icon:"\uD83D\uDCA7"},{name:"Indigenous Communities",href:"/indigenous-communities",icon:"\uD83C\uDF3F"},{name:"Politicians",href:"/politicians",icon:"\uD83D\uDC54"},{name:"Support Tickets",href:"/support-tickets",icon:"\uD83C\uDFAB"},{name:"Observations",href:"/observations",icon:"\uD83D\uDD0D"},{name:"Customers",href:"/customers",icon:"\uD83D\uDC64"},{name:"Outfall Types",href:"/outfall-types",icon:"\uD83C\uDF0A"},{name:"Marketing",href:"/marketing",icon:"\uD83D\uDCC8"}];function g(e){let{children:t}=e,{data:a,status:r}=(0,p.useSession)(),o=(0,n.useRouter)(),l=(0,n.usePathname)();return((0,i.useEffect)(()=>{"unauthenticated"===r?o.push("/login"):"authenticated"===r&&"/"===l&&o.push("/dashboard")},[r,o,l]),"loading"===r)?(0,s.jsx)("div",{className:"flex min-h-screen items-center justify-center",children:(0,s.jsx)("div",{className:"text-lg",children:"Loading..."})}):a?(0,s.jsxs)("div",{className:"flex min-h-screen bg-gray-50",children:[(0,s.jsx)("div",{className:"fixed left-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto z-40",children:(0,s.jsx)(u,{menuItems:x})}),(0,s.jsx)("div",{className:"flex-1 ml-64",children:(0,s.jsx)("main",{className:"min-h-screen",children:t})})]}):null}},8872:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>o});var s=a(5155),i=a(3584),n=a(2115),r=a(573);function o(){let[e,t]=(0,n.useState)([]),[a,o]=(0,n.useState)(!0);(0,n.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/support-tickets"),a=await e.json();t(a.data||[])}catch(e){console.error("Error fetching support tickets:",e)}finally{o(!1)}})()},[]);let l=async e=>{try{if(!(await fetch("/api/support-tickets/".concat(e.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok)throw Error("Failed to update support ticket");let a=await fetch("/api/support-tickets"),s=await a.json();t(s.data||[])}catch(e){throw console.error("Error updating support ticket:",e),e}};return a?(0,s.jsx)("div",{className:"p-8",children:"Loading..."}):(0,s.jsx)(r.A,{children:(0,s.jsxs)("div",{className:"p-8",children:[(0,s.jsx)("h1",{className:"text-2xl font-bold text-ocean-900 mb-6",children:"Support Tickets"}),(0,s.jsx)(i.A,{rows:e,columns:[{field:"title",headerName:"Title",isPrimary:!0},{field:"description",headerName:"Description"},{field:"status",headerName:"Status"},{field:"priority",headerName:"Priority"},{field:"assignedTo",headerName:"Assigned To"},{field:"createdAt",headerName:"Created At"},{field:"updatedAt",headerName:"Updated At"}],entityType:"supportTicket",onSave:l,loading:a})]})})}}},e=>{var t=t=>e(e.s=t);e.O(0,[1309,2615,3738,193,9938,3584,8441,1517,7358],()=>t(7722)),_N_E=e.O()}]);