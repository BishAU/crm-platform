(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2238],{1736:function(e,t,r){Promise.resolve().then(r.bind(r,8434))},3391:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}});var n=r(7437),a=r(2265);let s=a.forwardRef(function(e,t){let{title:r,titleId:n,...s}=e;return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":n},s),r?a.createElement("title",{id:n},r):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"}),a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"}))}),o=a.forwardRef(function(e,t){let{title:r,titleId:n,...s}=e;return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":n},s),r?a.createElement("title",{id:n},r):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"}))});var c=r(2417);function i(e){let{entityType:t,record:r,onSave:i}=e,[l,u]=(0,a.useState)(r),[d,f]=(0,a.useState)(!1),[m,h]=(0,a.useState)(null),[x,b]=(0,a.useState)(()=>(0,c.LK)()[t]||{});(0,a.useEffect)(()=>{u(r)},[r]);let g=(e,t)=>{u(r=>({...r,[e]:t}))},y=async()=>{if(i){f(!0),h(null);try{await i(l)}catch(e){h(e instanceof Error?e.message:"Failed to save changes")}finally{f(!1)}}},p=e=>{let r=!x[e];(0,c.zk)(t,e,r),b(t=>({...t,[e]:r}))},w=Object.keys(r);return(0,n.jsx)("div",{className:"flex items-center justify-center z-50",children:(0,n.jsxs)("div",{className:"bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden",children:[(0,n.jsx)("div",{className:"px-6 py-4 border-b border-ocean-100 flex items-center justify-between bg-ocean-50",children:(0,n.jsx)("h2",{className:"text-xl font-semibold text-ocean-900",children:"Edit Record"})}),(0,n.jsxs)("div",{className:"p-6 overflow-y-auto",children:[(0,n.jsx)("div",{className:"space-y-4",children:w.map(e=>{let t=!1!==x[e];return(0,n.jsxs)("div",{className:"transition-opacity ".concat(t?"opacity-100":"opacity-50"),children:[(0,n.jsxs)("div",{className:"flex items-center justify-between mb-1",children:[(0,n.jsx)("label",{className:"block text-sm font-medium text-ocean-700",children:e}),(0,n.jsx)("button",{onClick:()=>p(e),className:"p-1 rounded-md transition-colors ".concat(t?"text-ocean-600 hover:bg-ocean-50":"text-gray-400 hover:bg-gray-50"),title:t?"Deactivate field":"Activate field",children:t?(0,n.jsx)(s,{className:"w-5 h-5"}):(0,n.jsx)(o,{className:"w-5 h-5"})})]}),"boolean"==typeof l[e]?(0,n.jsx)("button",{onClick:()=>g(e,!l[e]),className:"w-10 h-6 rounded-full p-1 transition-colors ".concat(l[e]?"bg-green-500":"bg-gray-300"),children:(0,n.jsx)("div",{className:"bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ".concat(l[e]?"translate-x-4":"translate-x-0")})}):(0,n.jsx)("input",{type:"text",value:l[e]||"",onChange:t=>g(e,t.target.value),className:"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ".concat(t?"border-ocean-200 focus:ring-ocean-500 focus:border-ocean-500":"border-gray-200 focus:ring-gray-500 focus:border-gray-500"),disabled:!t})]},e)})}),m&&(0,n.jsx)("div",{className:"mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm",children:m})]}),(0,n.jsx)("div",{className:"px-6 py-4 border-t border-ocean-100 bg-ocean-50 flex justify-end space-x-3",children:(0,n.jsx)("button",{onClick:y,disabled:d,className:"px-4 py-2 bg-ocean-600 text-white rounded-md transition-colors ".concat(d?"opacity-50 cursor-not-allowed":"hover:bg-ocean-700"),children:d?"Saving...":"Save Changes"})})]})})}},8434:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return c}});var n=r(7437),a=r(2265),s=r(3391),o=r(9376);function c(){let[e,t]=(0,a.useState)(null),[r,c]=(0,a.useState)(!0),i=(0,o.useParams)();if((0,a.useEffect)(()=>{let e=async()=>{try{let e=await fetch("/api/customers/".concat(i.id));if(!e.ok)throw Error("Failed to fetch customer");let r=await e.json();t(r)}catch(e){console.error("Error fetching customer:",e)}finally{c(!1)}};i.id&&e()},[i.id]),r)return(0,n.jsx)("div",{className:"flex items-center justify-center h-full",children:(0,n.jsx)("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"})});if(!e)return(0,n.jsx)("div",{className:"flex items-center justify-center h-full",children:(0,n.jsx)("div",{className:"text-lg text-gray-500",children:"Customer not found"})});let l=async e=>{try{let r=await fetch("/api/customers/".concat(i.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!r.ok){let e=await r.text();throw Error(e||"Failed to update customer")}let n=await r.json();t(n)}catch(e){throw console.error("Error updating customer:",e),e}};return(0,n.jsx)("div",{className:"p-6",children:(0,n.jsx)(s.Z,{entityType:"customers",record:e,onSave:l})})}},2417:function(e,t,r){"use strict";r.d(t,{LK:function(){return a},Ly:function(){return o},zk:function(){return s}});let n="field-visibility";function a(){let e=localStorage.getItem(n);if(!e)return{};try{return JSON.parse(e)}catch(e){return{}}}function s(e,t,r){let s=a();s[e]||(s[e]={}),s[e][t]=r,localStorage.setItem(n,JSON.stringify(s))}function o(e,t){let r=a()[e]||{};if(0===Object.keys(r).length){let r=t.reduce((e,t)=>(e[t]=!0,e),{});{let t=a();t[e]=r,localStorage.setItem(n,JSON.stringify(t))}return t}return t.filter(e=>!0===r[e])}},9376:function(e,t,r){"use strict";var n=r(5475);r.o(n,"useParams")&&r.d(t,{useParams:function(){return n.useParams}}),r.o(n,"usePathname")&&r.d(t,{usePathname:function(){return n.usePathname}}),r.o(n,"useRouter")&&r.d(t,{useRouter:function(){return n.useRouter}}),r.o(n,"useSearchParams")&&r.d(t,{useSearchParams:function(){return n.useSearchParams}})}},function(e){e.O(0,[2971,2117,1744],function(){return e(e.s=1736)}),_N_E=e.O()}]);