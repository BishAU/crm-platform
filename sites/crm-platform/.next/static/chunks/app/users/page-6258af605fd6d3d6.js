(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6240],{8792:function(e,a,t){Promise.resolve().then(t.bind(t,835))},2172:function(e,a,t){"use strict";t.d(a,{Z:function(){return p}});var s=t(7437),n=t(2265),r=t(9376);function i(){for(var e=arguments.length,a=Array(e),t=0;t<e;t++)a[t]=arguments[t];return a.filter(Boolean).join(" ")}var o=t(7648);function l(e){let{isCollapsed:a,pathname:t,menuItems:r}=e,[l,c]=(0,n.useState)(null);return(0,s.jsx)("nav",{className:"flex flex-col h-full",children:(0,s.jsx)("div",{className:"flex-1 px-2 py-2 space-y-1",children:r.map(e=>{let{name:n,href:r,icon:u,subItems:d}=e,m=d&&d.length>0,h=l===n;return(0,s.jsxs)("div",{children:[(0,s.jsxs)(o.default,{href:r,className:i("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white transition-colors duration-200",m?"cursor-pointer":"",t===r?"bg-[#005f9e]":""),onClick:e=>{m&&(e.preventDefault(),console.log("openMenu:",l,"name:",n),l===n?c(null):c(n))},"aria-expanded":m?h:void 0,"aria-haspopup":m?"true":void 0,children:[(0,s.jsx)("span",{className:i("mr-3",t===r?"text-white":"text-white/80","hover:bg-[#005f9e] !important"),children:u}),!a&&(0,s.jsxs)("div",{className:"flex-1 flex justify-between items-center",children:[(0,s.jsx)("span",{children:n}),m&&(0,s.jsx)("span",{className:"ml-2",children:h?"▴":"▾"})]})]}),m&&h&&!a&&(0,s.jsx)("div",{className:"pl-4",children:d.map(e=>(0,s.jsxs)(o.default,{href:e.href,className:i("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white hover:bg-[#005f9e] transition-colors duration-200",t===e.href?"bg-[#005f9e]":""),children:[(0,s.jsx)("span",{className:i("mr-3",t===e.href?"text-white":"text-white/80"),children:e.icon}),e.name]},e.name))})]},n)})})})}var c=t(605);function u(e){let{collapsed:a,setIsCollapsed:t}=e;return(0,s.jsxs)("div",{className:"p-4 border-t border-gray-200 space-y-2",children:[(0,s.jsx)("div",{className:"text-sm text-gray-400 text-center",children:"Clean Ocean Foundation Since 2001"}),(0,s.jsxs)(o.default,{href:"/settings",className:"flex items-center text-sm text-gray-400 hover:text-gray-900 ".concat(a?"justify-center":""),children:[(0,s.jsx)("span",{className:"mr-2",children:"⚙️"}),!a&&"Settings"]}),(0,s.jsxs)("button",{onClick:()=>(0,c.signOut)({callbackUrl:"/login"}),className:"flex items-center text-sm text-gray-400 hover:text-gray-900 w-full ".concat(a?"justify-center":""),role:"button","aria-label":"Sign out",children:[(0,s.jsx)("span",{className:"mr-2",children:"\uD83D\uDEAA"}),!a&&"Sign Out"]})]})}let d=[{name:"Dashboard",href:"/dashboard",icon:"\uD83D\uDCCA",subItems:[{name:"People",href:"/people",icon:"\uD83D\uDC65"},{name:"Outfalls",href:"/outfalls",icon:"\uD83C\uDF0A"},{name:"Water Authorities",href:"/water-authorities",icon:"\uD83C\uDFE2"},{name:"Indigenous Communities",href:"/indigenous-communities",icon:"\uD83C\uDFDB️"},{name:"Politicians",href:"/politicians",icon:"\uD83D\uDC54"},{name:"Observations",href:"/observations",icon:"\uD83D\uDC41️"},{name:"Customers",href:"/customers",icon:"\uD83C\uDFEA"},{name:"Facilities",href:"/facilities",icon:"\uD83C\uDFED"},{name:"Outfall Types",href:"/outfall-types",icon:"\uD83D\uDEB0"},{name:"Users",href:"/users",icon:"\uD83D\uDC64"}]},{name:"Marketing",href:"/marketing",icon:"\uD83D\uDCC8",subItems:[{name:"Lists",href:"/marketing/lists",icon:"\uD83D\uDCCB"},{name:"Campaigns",href:"/marketing/campaigns",icon:"\uD83D\uDCE2"},{name:"Templates",href:"/marketing/templates",icon:"\uD83D\uDCC4"}]},{name:"Support",href:"/support",icon:"\uD83C\uDFAB",subItems:[{name:"Tickets",href:"/support/tickets",icon:"\uD83C\uDFAB"}]}];var m=t(3145),h=e=>{let{className:a,menuItems:t}=e,o=(0,r.usePathname)(),[c,h]=(0,n.useState)(!1);return(0,s.jsxs)("aside",{className:i("flex flex-col h-full bg-[#0077be] border-r border-gray-200 overflow-y-auto overflow-x-hidden",c?"w-16":"w-64",a),children:[(0,s.jsx)("div",{className:"p-4 border-b border-gray-200",children:(0,s.jsx)(m.default,{src:"/images/cof_logo.png",alt:"Clean Ocean Foundation Logo",width:c?40:200,height:c?40:80,className:"mx-auto"})}),(0,s.jsx)("div",{className:"flex-1 overflow-y-auto",children:(0,s.jsx)(l,{isCollapsed:c,pathname:o,menuItems:d})}),(0,s.jsx)(u,{collapsed:c,setIsCollapsed:h})]})};let f=[{name:"Dashboard",href:"/dashboard",icon:"\uD83C\uDFE0"},{name:"Outfalls",href:"/outfalls",icon:"\uD83C\uDF0A"},{name:"Facilities",href:"/facilities",icon:"\uD83C\uDFED"},{name:"People",href:"/people",icon:"\uD83D\uDC65"},{name:"Water Authorities",href:"/water-authorities",icon:"\uD83D\uDCA7"},{name:"Indigenous Communities",href:"/indigenous-communities",icon:"\uD83C\uDF3F"},{name:"Politicians",href:"/politicians",icon:"\uD83D\uDC54"},{name:"Support Tickets",href:"/support-tickets",icon:"\uD83C\uDFAB"},{name:"Observations",href:"/observations",icon:"\uD83D\uDD0D"},{name:"Customers",href:"/customers",icon:"\uD83D\uDC64"},{name:"Outfall Types",href:"/outfall-types",icon:"\uD83C\uDF0A"},{name:"Marketing",href:"/marketing",icon:"\uD83D\uDCC8"}];function p(e){let{children:a}=e,{data:t,status:i}=(0,c.useSession)(),o=(0,r.useRouter)(),l=(0,r.usePathname)();return((0,n.useEffect)(()=>{"unauthenticated"===i?o.push("/login"):"authenticated"===i&&"/"===l&&o.push("/dashboard")},[i,o,l]),"loading"===i)?(0,s.jsx)("div",{className:"flex min-h-screen items-center justify-center",children:(0,s.jsx)("div",{className:"text-lg",children:"Loading..."})}):t?(0,s.jsxs)("div",{className:"flex min-h-screen bg-gray-50",children:[(0,s.jsx)("div",{className:"fixed left-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto z-40",children:(0,s.jsx)(h,{menuItems:f})}),(0,s.jsx)("div",{className:"flex-1 ml-64",children:(0,s.jsx)("main",{className:"min-h-screen",children:a})})]}):null}},835:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return o}});var s=t(7437),n=t(2265),r=t(9893),i=t(2172);function o(){let[e,a]=(0,n.useState)([]),[t,o]=(0,n.useState)(!0);(0,n.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/users"),t=await e.json();a(t.data||[])}catch(e){console.error("Error fetching users:",e)}finally{o(!1)}})()},[]);let l=async e=>{try{if(!(await fetch("/api/users/".concat(e.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok)throw Error("Failed to update user");let t=await fetch("/api/users"),s=await t.json();a(s.data||[])}catch(e){throw console.error("Error updating user:",e),e}},c=async(e,a)=>{try{if(!(await fetch("/api/users/".concat(e,"/password"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:a})})).ok)throw Error("Failed to change password")}catch(e){throw console.error("Error changing password:",e),e}};return(0,s.jsx)(i.Z,{children:(0,s.jsxs)("div",{className:"p-8",children:[(0,s.jsx)("h1",{className:"text-2xl font-bold text-ocean-900 mb-6",children:"User Management"}),(0,s.jsx)(r.Z,{rows:e,columns:[{field:"name",headerName:"Name",isPrimary:!0},{field:"email",headerName:"Email"},{field:"active",headerName:"Active",type:"boolean"},{field:"createdAt",headerName:"Created At",active:!1},{field:"updatedAt",headerName:"Updated At",active:!1},{field:"id",headerName:"ID",active:!1}],entityType:"user",onSave:l,loading:t,additionalActions:[{label:"Change Password",action:e=>{let a=prompt("Enter new password:");a&&c(e,a)}}]})]})})}}},function(e){e.O(0,[3338,605,785,4948,7648,9893,2971,2117,1744],function(){return e(e.s=8792)}),_N_E=e.O()}]);