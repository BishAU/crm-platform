(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1931],{6922:function(e,n,s){Promise.resolve().then(s.bind(s,5753))},1308:function(e,n,s){"use strict";s.d(n,{Z:function(){return p}});var t=s(7437),a=s(2265),r=s(9376),i=s(1994),l=s(3335);function o(){for(var e=arguments.length,n=Array(e),s=0;s<e;s++)n[s]=arguments[s];return(0,l.m6)((0,i.W)(n))}var c=s(7648);function u(e){let{isCollapsed:n,pathname:r,menuItems:i}=e,[l,u]=(0,a.useState)(null);return(0,t.jsx)("nav",{className:"flex flex-col h-full",children:(0,t.jsx)("div",{className:"flex-1 px-2 py-2 space-y-1",children:i.map(e=>{let{name:a,href:i,icon:m,subItems:d,isButton:h,onClick:f}=e,x=d&&d.length>0,p=l===a;return(0,t.jsxs)("div",{children:[h?(0,t.jsxs)("button",{className:o("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white transition-colors duration-200 w-full text-left",r===i?"bg-[#005f9e]":""),onClick:async e=>{if("signOut"===f){e.preventDefault();let{signOut:n}=await Promise.resolve().then(s.t.bind(s,605,23));n({callbackUrl:"/login"})}},children:[(0,t.jsx)("span",{className:o("mr-3",r===i?"text-white":"text-white/80","hover:bg-[#005f9e] !important"),children:m}),!n&&(0,t.jsx)("div",{className:"flex-1 flex justify-between items-center",children:(0,t.jsx)("span",{children:a})})]}):(0,t.jsxs)(c.default,{href:i,className:o("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white transition-colors duration-200",x?"cursor-pointer":"",r===i?"bg-[#005f9e]":""),onClick:async e=>{console.log("pathname:",r,"href:",i,"active:",r===i),x&&(e.preventDefault(),console.log("openMenu:",l,"name:",a),l===a?u(null):u(a))},"aria-expanded":x?p:void 0,"aria-haspopup":x?"true":void 0,children:[(0,t.jsx)("span",{className:o("mr-3",r===i?"text-white":"text-white/80","hover:bg-[#005f9e] !important"),children:m}),!n&&(0,t.jsxs)("div",{className:"flex-1 flex justify-between items-center",children:[(0,t.jsx)("span",{children:a}),x&&(0,t.jsx)("span",{className:"ml-2",children:p?"▴":"▾"})]})]}),x&&p&&!n&&(0,t.jsx)("div",{className:"pl-4",children:d.map(e=>(0,t.jsxs)(c.default,{href:e.href,className:o("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white hover:bg-[#005f9e] transition-colors duration-200",r===e.href?"bg-[#005f9e]":""),children:[(0,t.jsx)("span",{className:o("mr-3",r===e.href?"text-white":"text-white/80"),children:e.icon}),e.name]},e.name))})]},a)})})})}let m=[{name:"Dashboard",href:"/dashboard",icon:"\uD83D\uDCCA",subItems:[{name:"People",href:"/people",icon:"\uD83D\uDC65"},{name:"Outfalls",href:"/outfalls",icon:"\uD83C\uDF0A"},{name:"Water Authorities",href:"/water-authorities",icon:"\uD83C\uDFE2"},{name:"Indigenous Communities",href:"/indigenous-communities",icon:"\uD83C\uDFDB️"},{name:"Politicians",href:"/politicians",icon:"\uD83D\uDC54"},{name:"Observations",href:"/observations",icon:"\uD83D\uDC41️"},{name:"Customers",href:"/customers",icon:"\uD83C\uDFEA"},{name:"Facilities",href:"/facilities",icon:"\uD83C\uDFED"},{name:"Outfall Types",href:"/outfall-types",icon:"\uD83D\uDEB0"}]},{name:"Marketing",href:"/marketing",icon:"\uD83D\uDCC8",subItems:[{name:"Lists",href:"/marketing/lists",icon:"\uD83D\uDCCB"},{name:"Campaigns",href:"/marketing/campaigns",icon:"\uD83D\uDCE2"},{name:"Templates",href:"/marketing/templates",icon:"\uD83D\uDCC4"}]},{name:"Support",href:"/support",icon:"\uD83C\uDFAB",subItems:[{name:"Tickets",href:"/support/tickets",icon:"\uD83C\uDFAB"}]}],d=[{name:"Clean Ocean Foundation",href:"https://www.cleanocean.org/",icon:"",isExternal:!0},{name:"Settings",href:"/settings",icon:"⚙️",subItems:[{name:"Users",href:"/users",icon:"\uD83D\uDC64"}]},{name:"Sign out",href:"#",icon:"\uD83D\uDEAA",onClick:"signOut",isButton:!0}];var h=s(3145),f=e=>{let{className:n}=e,s=(0,r.usePathname)(),[i,l]=(0,a.useState)(!1);return(0,t.jsxs)("aside",{className:o("flex flex-col h-full bg-[#0077be] border-r border-gray-200",i?"w-16":"w-64",n),children:[(0,t.jsx)("div",{className:"p-4 border-b border-gray-200",children:(0,t.jsx)(c.default,{href:"/dashboard",children:(0,t.jsx)(h.default,{src:"/images/cof_logo.png",alt:"Clean Ocean Foundation Logo",width:i?40:200,height:i?40:80,className:"mx-auto",priority:!0})})}),(0,t.jsx)("div",{className:"flex-1 overflow-y-auto",children:(0,t.jsx)(u,{isCollapsed:i,pathname:s,menuItems:m})}),(0,t.jsx)("div",{className:"border-t border-gray-200 p-4",children:d.map(e=>e.isExternal?(0,t.jsx)("a",{href:e.href,target:"_blank",rel:"noopener noreferrer",className:"block px-4 py-2 text-white font-bold text-sm",children:e.name},e.name):(0,t.jsx)("div",{children:(0,t.jsx)(u,{isCollapsed:i,pathname:s,menuItems:[e]})},e.name))})]})},x=s(605);function p(e){let{children:n}=e,{data:s,status:i}=(0,x.useSession)(),l=(0,r.useRouter)(),o=(0,r.usePathname)();return((0,a.useEffect)(()=>{"unauthenticated"===i?l.push("/login"):"authenticated"===i&&"/"===o&&l.push("/dashboard")},[i,l,o]),"loading"===i)?(0,t.jsx)("div",{className:"flex min-h-screen items-center justify-center",children:(0,t.jsx)("div",{className:"text-lg",children:"Loading..."})}):s?(0,t.jsxs)("div",{className:"flex min-h-screen bg-gray-50",children:[(0,t.jsx)("div",{className:"fixed left-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto z-40",children:(0,t.jsx)(f,{})}),(0,t.jsx)("div",{className:"flex-1 ml-64",children:(0,t.jsx)("main",{className:"min-h-screen",children:n})})]}):null}},5753:function(e,n,s){"use strict";s.r(n),s.d(n,{default:function(){return c}});var t=s(7437);s(2265);var a=s(1308);function r(e){let{title:n,description:s}=e;return(0,t.jsxs)("div",{className:"bg-white rounded-lg shadow-md p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-semibold text-gray-800",children:n}),(0,t.jsx)("p",{className:"mt-2 text-gray-600",children:s})]})}function i(){return(0,t.jsx)("div",{className:"flex items-center justify-center h-screen",children:(0,t.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"})})}var l=s(605),o=s(9376),c=()=>{let{data:e,status:n}=(0,l.useSession)(),s=(0,o.useRouter)();return"loading"===n?(0,t.jsx)(i,{}):"unauthenticated"===n?(s.push("/login"),null):(0,t.jsx)(a.Z,{children:(0,t.jsx)("div",{className:"flex flex-col gap-4",children:(0,t.jsx)(r,{title:"Dashboard",description:"Welcome to the CRM Platform"})})})}}},function(e){e.O(0,[605,785,964,2971,2117,1744],function(){return e(e.s=6922)}),_N_E=e.O()}]);