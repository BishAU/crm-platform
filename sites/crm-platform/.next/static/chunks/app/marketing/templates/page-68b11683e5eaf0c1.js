(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2281],{5285:function(e,t,a){Promise.resolve().then(a.bind(a,5296))},5296:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return u}});var r=a(7437),n=a(2265),s=a(9893);function u(){let[e,t]=(0,n.useState)([]),[a,u]=(0,n.useState)(!0);return(0,n.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/marketing/templates");if(!e.ok)throw Error("Failed to fetch templates");let a=await e.json();t(a)}catch(e){console.error("Error fetching templates:",e)}finally{u(!1)}})()},[]),(0,r.jsxs)("div",{className:"p-8",children:[(0,r.jsx)("h1",{className:"text-2xl font-bold text-ocean-900 mb-6",children:"Email Templates"}),(0,r.jsx)(s.Z,{rows:e,columns:[{field:"id",headerName:"ID",isPrimary:!0},{field:"name",headerName:"Name"},{field:"subject",headerName:"Subject"},{field:"createdAt",headerName:"Created At"},{field:"updatedAt",headerName:"Updated At"}],entityType:"template",onSave:async e=>{console.log("Save template:",e)},loading:a})]})}},9376:function(e,t,a){"use strict";var r=a(5475);a.o(r,"useParams")&&a.d(t,{useParams:function(){return r.useParams}}),a.o(r,"usePathname")&&a.d(t,{usePathname:function(){return r.usePathname}}),a.o(r,"useRouter")&&a.d(t,{useRouter:function(){return r.useRouter}}),a.o(r,"useSearchParams")&&a.d(t,{useSearchParams:function(){return r.useSearchParams}})}},function(e){e.O(0,[3338,4948,9893,2971,2117,1744],function(){return e(e.s=5285)}),_N_E=e.O()}]);