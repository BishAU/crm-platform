(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4444],{3954:function(e,t,a){Promise.resolve().then(a.bind(a,5013))},1308:function(e,t,a){"use strict";a.d(t,{Z:function(){return p}});var n=a(7437),s=a(2265),i=a(9376),r=a(1994),l=a(3335);function o(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,l.m6)((0,r.W)(t))}var c=a(7648);function d(e){let{isCollapsed:t,pathname:i,menuItems:r}=e,[l,d]=(0,s.useState)(null);return(0,n.jsx)("nav",{className:"flex flex-col h-full",children:(0,n.jsx)("div",{className:"flex-1 px-2 py-2 space-y-1",children:r.map(e=>{let{name:s,href:r,icon:u,subItems:m,isButton:h,onClick:f}=e,x=m&&m.length>0,p=l===s;return(0,n.jsxs)("div",{children:[h?(0,n.jsxs)("button",{className:o("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white transition-colors duration-200 w-full text-left",i===r?"bg-[#005f9e]":""),onClick:async e=>{if("signOut"===f){e.preventDefault();let{signOut:t}=await Promise.resolve().then(a.t.bind(a,605,23));t({callbackUrl:"/login"})}},children:[(0,n.jsx)("span",{className:o("mr-3",i===r?"text-white":"text-white/80","hover:bg-[#005f9e] !important"),children:u}),!t&&(0,n.jsx)("div",{className:"flex-1 flex justify-between items-center",children:(0,n.jsx)("span",{children:s})})]}):(0,n.jsxs)(c.default,{href:r,className:o("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white transition-colors duration-200",x?"cursor-pointer":"",i===r?"bg-[#005f9e]":""),onClick:async e=>{console.log("pathname:",i,"href:",r,"active:",i===r),x&&(e.preventDefault(),console.log("openMenu:",l,"name:",s),l===s?d(null):d(s))},"aria-expanded":x?p:void 0,"aria-haspopup":x?"true":void 0,children:[(0,n.jsx)("span",{className:o("mr-3",i===r?"text-white":"text-white/80","hover:bg-[#005f9e] !important"),children:u}),!t&&(0,n.jsxs)("div",{className:"flex-1 flex justify-between items-center",children:[(0,n.jsx)("span",{children:s}),x&&(0,n.jsx)("span",{className:"ml-2",children:p?"▴":"▾"})]})]}),x&&p&&!t&&(0,n.jsx)("div",{className:"pl-4",children:m.map(e=>(0,n.jsxs)(c.default,{href:e.href,className:o("group flex items-center px-2 py-2 text-sm font-medium rounded-md","text-white hover:bg-[#005f9e] transition-colors duration-200",i===e.href?"bg-[#005f9e]":""),children:[(0,n.jsx)("span",{className:o("mr-3",i===e.href?"text-white":"text-white/80"),children:e.icon}),e.name]},e.name))})]},s)})})})}let u=[{name:"Dashboard",href:"/dashboard",icon:"\uD83D\uDCCA",subItems:[{name:"People",href:"/people",icon:"\uD83D\uDC65"},{name:"Outfalls",href:"/outfalls",icon:"\uD83C\uDF0A"},{name:"Water Authorities",href:"/water-authorities",icon:"\uD83C\uDFE2"},{name:"Indigenous Communities",href:"/indigenous-communities",icon:"\uD83C\uDFDB️"},{name:"Politicians",href:"/politicians",icon:"\uD83D\uDC54"},{name:"Observations",href:"/observations",icon:"\uD83D\uDC41️"},{name:"Customers",href:"/customers",icon:"\uD83C\uDFEA"},{name:"Facilities",href:"/facilities",icon:"\uD83C\uDFED"},{name:"Outfall Types",href:"/outfall-types",icon:"\uD83D\uDEB0"}]},{name:"Marketing",href:"/marketing",icon:"\uD83D\uDCC8",subItems:[{name:"Lists",href:"/marketing/lists",icon:"\uD83D\uDCCB"},{name:"Campaigns",href:"/marketing/campaigns",icon:"\uD83D\uDCE2"},{name:"Templates",href:"/marketing/templates",icon:"\uD83D\uDCC4"}]},{name:"Support",href:"/support",icon:"\uD83C\uDFAB",subItems:[{name:"Tickets",href:"/support/tickets",icon:"\uD83C\uDFAB"}]}],m=[{name:"Clean Ocean Foundation",href:"https://www.cleanocean.org/",icon:"",isExternal:!0},{name:"Settings",href:"/settings",icon:"⚙️",subItems:[{name:"Users",href:"/users",icon:"\uD83D\uDC64"}]},{name:"Sign out",href:"#",icon:"\uD83D\uDEAA",onClick:"signOut",isButton:!0}];var h=a(3145),f=e=>{let{className:t}=e,a=(0,i.usePathname)(),[r,l]=(0,s.useState)(!1);return(0,n.jsxs)("aside",{className:o("flex flex-col h-full bg-[#0077be] border-r border-gray-200",r?"w-16":"w-64",t),children:[(0,n.jsx)("div",{className:"p-4 border-b border-gray-200",children:(0,n.jsx)(c.default,{href:"/dashboard",children:(0,n.jsx)(h.default,{src:"/images/cof_logo.png",alt:"Clean Ocean Foundation Logo",width:r?40:200,height:r?40:80,className:"mx-auto",priority:!0})})}),(0,n.jsx)("div",{className:"flex-1 overflow-y-auto",children:(0,n.jsx)(d,{isCollapsed:r,pathname:a,menuItems:u})}),(0,n.jsx)("div",{className:"border-t border-gray-200 p-4",children:m.map(e=>e.isExternal?(0,n.jsx)("a",{href:e.href,target:"_blank",rel:"noopener noreferrer",className:"block px-4 py-2 text-white font-bold text-sm",children:e.name},e.name):(0,n.jsx)("div",{children:(0,n.jsx)(d,{isCollapsed:r,pathname:a,menuItems:[e]})},e.name))})]})},x=a(605);function p(e){let{children:t}=e,{data:a,status:r}=(0,x.useSession)(),l=(0,i.useRouter)(),o=(0,i.usePathname)();return((0,s.useEffect)(()=>{"unauthenticated"===r?l.push("/login"):"authenticated"===r&&"/"===o&&l.push("/dashboard")},[r,l,o]),"loading"===r)?(0,n.jsx)("div",{className:"flex min-h-screen items-center justify-center",children:(0,n.jsx)("div",{className:"text-lg",children:"Loading..."})}):a?(0,n.jsxs)("div",{className:"flex min-h-screen bg-gray-50",children:[(0,n.jsx)("div",{className:"fixed left-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto z-40",children:(0,n.jsx)(f,{})}),(0,n.jsx)("div",{className:"flex-1 ml-64",children:(0,n.jsx)("main",{className:"min-h-screen",children:t})})]}):null}},5013:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return l}});var n=a(7437),s=a(2265),i=a(3548),r=a(1308);function l(){let[e,t]=(0,s.useState)([]),[a,l]=(0,s.useState)(!0),[o,c]=(0,s.useState)(!1),[d,u]=(0,s.useState)({name:"",description:""});(0,s.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/marketing/lists");if(!e.ok)throw Error("Failed to fetch marketing lists");let a=await e.json();t(a)}catch(e){console.error("Error fetching marketing lists:",e)}finally{l(!1)}})()},[]);let m=async()=>{try{console.log("New list data:",d);let a=await fetch("/api/marketing/lists",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)});if(!a.ok)throw Error("Failed to create marketing list");let n=await a.json();t([...e,n]),c(!1),u({name:"",description:""})}catch(e){console.error("Error creating marketing list:",e)}};return(0,n.jsx)(r.Z,{children:(0,n.jsxs)("div",{className:"p-8",children:[(0,n.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,n.jsx)("h1",{className:"text-2xl font-bold text-ocean-900",children:"Marketing Lists"}),(0,n.jsx)("button",{className:"bg-ocean-500 hover:bg-ocean-700 text-white font-bold py-2 px-4 rounded",onClick:()=>c(!0),children:"Create New List"})]}),o&&(0,n.jsx)("div",{className:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center",children:(0,n.jsxs)("div",{className:"bg-white p-8 rounded-lg",children:[(0,n.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Create New List"}),(0,n.jsxs)("div",{className:"mb-4",children:[(0,n.jsx)("label",{className:"block text-gray-700 text-sm font-bold mb-2",children:"List Name"}),(0,n.jsx)("input",{type:"text",className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",value:d.name,onChange:e=>u({...d,name:e.target.value})})]}),(0,n.jsxs)("div",{className:"mb-4",children:[(0,n.jsx)("label",{className:"block text-gray-700 text-sm font-bold mb-2",children:"Description (optional)"}),(0,n.jsx)("textarea",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",value:d.description,onChange:e=>u({...d,description:e.target.value})})]}),(0,n.jsxs)("div",{className:"flex justify-end",children:[(0,n.jsx)("button",{className:"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2",onClick:()=>c(!1),children:"Cancel"}),(0,n.jsx)("button",{className:"bg-ocean-500 hover:bg-ocean-700 text-white font-bold py-2 px-4 rounded",onClick:m,children:"Create"})]})]})}),(0,n.jsx)(i.Z,{rows:e,columns:[{field:"id",headerName:"ID",isPrimary:!0},{field:"name",headerName:"List Name"},{field:"filter",headerName:"Filter"},{field:"type",headerName:"Type"},{field:"creator",headerName:"Creator"},{field:"createdAt",headerName:"Created At"},{field:"updatedAt",headerName:"Updated At"}],entityType:"marketingList",onSave:async e=>{console.log("Save marketing list:",e)},loading:a})]})})}}},function(e){e.O(0,[3338,605,785,964,1196,3548,2971,2117,1744],function(){return e(e.s=3954)}),_N_E=e.O()}]);