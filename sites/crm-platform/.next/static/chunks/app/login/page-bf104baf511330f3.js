(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2626],{8647:function(e,s,a){Promise.resolve().then(a.bind(a,6374))},6374:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return c}});var n=a(7437),i=a(605),t=a(2265),r=a(9376),l=a(3145);function c(){let[e,s]=(0,t.useState)(""),[a,c]=(0,t.useState)(""),[o,d]=(0,t.useState)(""),[u,m]=(0,t.useState)(!1),h=(0,r.useRouter)(),x=(0,r.useSearchParams)(),v=(null==x?void 0:x.get("callbackUrl"))||"/dashboard",g=async s=>{s.preventDefault(),d(""),m(!0);try{let s=await (0,i.signIn)("credentials",{email:e,password:a,redirect:!1,callbackUrl:v});(null==s?void 0:s.error)?d("Invalid credentials"):(null==s?void 0:s.ok)&&(h.push(v),h.refresh())}catch(e){console.error("Login error:",e),d("An error occurred during sign in")}finally{m(!1)}};return(0,n.jsxs)("main",{className:"login-container",children:[(0,n.jsxs)("div",{className:"login-form-container",children:[(0,n.jsx)("div",{className:"w-48 h-24 relative mx-auto mb-8",children:(0,n.jsx)(l.default,{src:"/images/cof_logo.png",alt:"Clean Ocean Foundation Logo",fill:!0,style:{objectFit:"contain"},priority:!0})}),(0,n.jsx)("h2",{className:"login-title",children:"Sign in to your account"}),(0,n.jsxs)("form",{className:"space-y-6",onSubmit:g,children:[o&&(0,n.jsx)("div",{className:"rounded-md bg-red-50 p-4",children:(0,n.jsx)("div",{className:"text-sm text-red-700",children:o})}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{htmlFor:"username",className:"block text-sm font-medium text-gray-700",children:"Username"}),(0,n.jsx)("input",{id:"username",name:"username",type:"text",required:!0,className:"form-input",value:e,onChange:e=>s(e.target.value),disabled:u})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700",children:"Password"}),(0,n.jsx)("input",{id:"password",name:"password",type:"password",required:!0,className:"form-input",value:a,onChange:e=>c(e.target.value),disabled:u})]}),(0,n.jsx)("button",{type:"submit",className:"submit-button",disabled:u,children:u?"Signing in...":"Sign in"})]})]}),(0,n.jsxs)("div",{className:"ocean",children:[(0,n.jsx)("div",{className:"wave"}),(0,n.jsx)("div",{className:"wave"}),(0,n.jsx)("div",{className:"wave"})]})]})}a(292)},292:function(){}},function(e){e.O(0,[7420,605,785,2971,2117,1744],function(){return e(e.s=8647)}),_N_E=e.O()}]);