(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1931],{6922:function(e,s,n){Promise.resolve().then(n.bind(n,5753))},2172:function(e,s,n){"use strict";n.d(s,{Z:function(){return x}});var t=n(7437),a=n(2265),i=n(9376);function r(){for(var e=arguments.length,s=Array(e),n=0;n<e;n++)s[n]=arguments[n];return s.filter(Boolean).join(" ")}var l=n(7648);function u(e){let{isCollapsed:s,pathname:n,menuItems:i}=e,[u,o]=(0,a.useState)(null);return(0,t.jsx)("nav",{className:"flex flex-col h-full",children:(0,t.jsx)("div",{className:"flex-1 px-2 py-2 space-y-1",children:i.map(e=>{let{name:a,href:i,icon:c,subItems:m}=e,d=m&&m.length>0,h=u===a;return(0,t.jsxs)("div",{children:[(0,t.jsxs)(l.default,{href:i,className:r("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white transition-colors duration-200",d?"cursor-pointer":"",n===i?"bg-[#005f9e]":""),onClick:e=>{d&&(e.preventDefault(),console.log("openMenu:",u,"name:",a),u===a?o(null):o(a))},"aria-expanded":d?h:void 0,"aria-haspopup":d?"true":void 0,children:[(0,t.jsx)("span",{className:r("mr-3",n===i?"text-white":"text-white/80","hover:bg-[#005f9e] !important"),children:c}),!s&&(0,t.jsxs)("div",{className:"flex-1 flex justify-between items-center",children:[(0,t.jsx)("span",{children:a}),d&&(0,t.jsx)("span",{className:"ml-2",children:h?"▴":"▾"})]})]}),d&&h&&!s&&(0,t.jsx)("div",{className:"pl-4",children:m.map(e=>(0,t.jsxs)(l.default,{href:e.href,className:r("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white hover:bg-[#005f9e] transition-colors duration-200",n===e.href?"bg-[#005f9e]":""),children:[(0,t.jsx)("span",{className:r("mr-3",n===e.href?"text-white":"text-white/80"),children:e.icon}),e.name]},e.name))})]},a)})})})}var o=n(605);function c(e){let{collapsed:s,setIsCollapsed:n}=e;return(0,t.jsxs)("div",{className:"p-4 border-t border-gray-200 space-y-2",children:[(0,t.jsx)("div",{className:"text-sm text-gray-400 text-center",children:"Clean Ocean Foundation Since 2001"}),(0,t.jsxs)(l.default,{href:"/settings",className:"flex items-center text-sm text-gray-400 hover:text-gray-900 ".concat(s?"justify-center":""),children:[(0,t.jsx)("span",{className:"mr-2",children:"⚙️"}),!s&&"Settings"]}),(0,t.jsxs)("button",{onClick:()=>(0,o.signOut)({callbackUrl:"/login"}),className:"flex items-center text-sm text-gray-400 hover:text-gray-900 w-full ".concat(s?"justify-center":""),role:"button","aria-label":"Sign out",children:[(0,t.jsx)("span",{className:"mr-2",children:"\uD83D\uDEAA"}),!s&&"Sign Out"]})]})}let m=[{name:"Dashboard",href:"/dashboard",icon:"\uD83D\uDCCA",subItems:[{name:"People",href:"/people",icon:"\uD83D\uDC65"},{name:"Outfalls",href:"/outfalls",icon:"\uD83C\uDF0A"},{name:"Water Authorities",href:"/water-authorities",icon:"\uD83C\uDFE2"},{name:"Indigenous Communities",href:"/indigenous-communities",icon:"\uD83C\uDFDB️"},{name:"Politicians",href:"/politicians",icon:"\uD83D\uDC54"},{name:"Observations",href:"/observations",icon:"\uD83D\uDC41️"},{name:"Customers",href:"/customers",icon:"\uD83C\uDFEA"},{name:"Facilities",href:"/facilities",icon:"\uD83C\uDFED"},{name:"Outfall Types",href:"/outfall-types",icon:"\uD83D\uDEB0"},{name:"Users",href:"/users",icon:"\uD83D\uDC64"}]},{name:"Marketing",href:"/marketing",icon:"\uD83D\uDCC8",subItems:[{name:"Lists",href:"/marketing/lists",icon:"\uD83D\uDCCB"},{name:"Campaigns",href:"/marketing/campaigns",icon:"\uD83D\uDCE2"},{name:"Templates",href:"/marketing/templates",icon:"\uD83D\uDCC4"}]},{name:"Support",href:"/support",icon:"\uD83C\uDFAB",subItems:[{name:"Tickets",href:"/support/tickets",icon:"\uD83C\uDFAB"}]}];var d=n(3145),h=e=>{let{className:s,menuItems:n}=e,l=(0,i.usePathname)(),[o,h]=(0,a.useState)(!1);return(0,t.jsxs)("aside",{className:r("flex flex-col h-full bg-[#0077be] border-r border-gray-200 overflow-y-auto overflow-x-hidden",o?"w-16":"w-64",s),children:[(0,t.jsx)("div",{className:"p-4 border-b border-gray-200",children:(0,t.jsx)(d.default,{src:"/images/cof_logo.png",alt:"Clean Ocean Foundation Logo",width:o?40:200,height:o?40:80,className:"mx-auto"})}),(0,t.jsx)("div",{className:"flex-1 overflow-y-auto",children:(0,t.jsx)(u,{isCollapsed:o,pathname:l,menuItems:m})}),(0,t.jsx)(c,{collapsed:o,setIsCollapsed:h})]})};let f=[{name:"Dashboard",href:"/dashboard",icon:"\uD83C\uDFE0"},{name:"Outfalls",href:"/outfalls",icon:"\uD83C\uDF0A"},{name:"Facilities",href:"/facilities",icon:"\uD83C\uDFED"},{name:"People",href:"/people",icon:"\uD83D\uDC65"},{name:"Water Authorities",href:"/water-authorities",icon:"\uD83D\uDCA7"},{name:"Indigenous Communities",href:"/indigenous-communities",icon:"\uD83C\uDF3F"},{name:"Politicians",href:"/politicians",icon:"\uD83D\uDC54"},{name:"Support Tickets",href:"/support-tickets",icon:"\uD83C\uDFAB"},{name:"Observations",href:"/observations",icon:"\uD83D\uDD0D"},{name:"Customers",href:"/customers",icon:"\uD83D\uDC64"},{name:"Outfall Types",href:"/outfall-types",icon:"\uD83C\uDF0A"},{name:"Marketing",href:"/marketing",icon:"\uD83D\uDCC8"}];function x(e){let{children:s}=e,{data:n,status:r}=(0,o.useSession)(),l=(0,i.useRouter)(),u=(0,i.usePathname)();return((0,a.useEffect)(()=>{"unauthenticated"===r?l.push("/login"):"authenticated"===r&&"/"===u&&l.push("/dashboard")},[r,l,u]),"loading"===r)?(0,t.jsx)("div",{className:"flex min-h-screen items-center justify-center",children:(0,t.jsx)("div",{className:"text-lg",children:"Loading..."})}):n?(0,t.jsxs)("div",{className:"flex min-h-screen bg-gray-50",children:[(0,t.jsx)("div",{className:"fixed left-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto z-40",children:(0,t.jsx)(h,{menuItems:f})}),(0,t.jsx)("div",{className:"flex-1 ml-64",children:(0,t.jsx)("main",{className:"min-h-screen",children:s})})]}):null}},5753:function(e,s,n){"use strict";n.r(s),n.d(s,{default:function(){return o}});var t=n(7437);n(2265);var a=n(2172);function i(e){let{title:s,description:n}=e;return(0,t.jsxs)("div",{className:"bg-white rounded-lg shadow-md p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-semibold text-gray-800",children:s}),(0,t.jsx)("p",{className:"mt-2 text-gray-600",children:n})]})}function r(){return(0,t.jsx)("div",{className:"flex items-center justify-center h-screen",children:(0,t.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"})})}var l=n(605),u=n(9376),o=()=>{let{data:e,status:s}=(0,l.useSession)(),n=(0,u.useRouter)();return"loading"===s?(0,t.jsx)(r,{}):"unauthenticated"===s?(n.push("/login"),null):(0,t.jsx)(a.Z,{children:(0,t.jsx)("div",{className:"flex flex-col gap-4",children:(0,t.jsx)(i,{title:"Dashboard",description:"Welcome to the CRM Platform"})})})}}},function(e){e.O(0,[605,785,7648,2971,2117,1744],function(){return e(e.s=6922)}),_N_E=e.O()}]);