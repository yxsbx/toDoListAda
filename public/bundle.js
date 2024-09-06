(()=>{"use strict";var e={159:(e,n,t)=>{t.d(n,{A:()=>l});var a=t(601),o=t.n(a),r=t(314),i=t.n(r)()(o());i.push([e.id,"@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');\n\n  html {\n    font-family: 'Inter', sans-serif;\n  }\n\n  .disabled-node {\n    pointer-events: none;\n  }\n}\n\n@layer utilities {\n  #sidebar-container {\n    transition: width 0.3s ease;\n    background-color: #ffffff;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n    overflow-x: hidden;\n    width: 5rem;\n  }\n\n  #sidebar-container:hover {\n    width: 16rem;\n  }\n\n  #sidebar-container .sidebar-item-label {\n    display: none;\n  }\n\n  #sidebar-container:hover .sidebar-item-label {\n    display: inline;\n  }\n\n  #main-container {\n    transition: margin-left 0.3s ease;\n  }\n\n  @media (max-width: 768px) {\n    #sidebar-container {\n      display: none;\n    }\n\n    #main-container {\n      margin-left: 0;\n    }\n  }\n\n  #mobile-navbar-container {\n    display: flex;\n    justify-content: space-around;\n    align-items: center;\n    background-color: #ffffff;\n    padding: 0.5rem;\n    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);\n  }\n\n  #mobile-navbar-container button {\n    flex-direction: column;\n    align-items: center;\n    color: #6b7280;\n    transition: color 0.2s ease-in-out;\n  }\n\n  #mobile-navbar-container button:hover {\n    color: #3b82f6;\n  }\n\n  #mobile-navbar-container svg {\n    width: 24px;\n    height: 24px;\n    margin-bottom: 0.25rem;\n  }\n\n  #mobile-navbar-container span {\n    font-size: 0.75rem;\n  }\n\n  @media (min-width: 768px) {\n    #mobile-navbar-container {\n      display: none;\n    }\n  }\n}",""]);const l=i},314:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",a=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),a&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),a&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,a,o,r){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(a)for(var l=0;l<this.length;l++){var c=this[l][0];null!=c&&(i[c]=!0)}for(var s=0;s<e.length;s++){var d=[].concat(e[s]);a&&i[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),n.push(d))}},n}},601:e=>{e.exports=function(e){return e[1]}},72:e=>{var n=[];function t(e){for(var t=-1,a=0;a<n.length;a++)if(n[a].identifier===e){t=a;break}return t}function a(e,a){for(var r={},i=[],l=0;l<e.length;l++){var c=e[l],s=a.base?c[0]+a.base:c[0],d=r[s]||0,u="".concat(s," ").concat(d);r[s]=d+1;var m=t(u),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==m)n[m].references++,n[m].updater(p);else{var f=o(p,a);a.byIndex=l,n.splice(l,0,{identifier:u,updater:f,references:1})}i.push(u)}return i}function o(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,o){var r=a(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<r.length;i++){var l=t(r[i]);n[l].references--}for(var c=a(e,o),s=0;s<r.length;s++){var d=t(r[s]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}r=c}}},659:e=>{var n={};e.exports=function(e,t){var a=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}},540:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},56:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var a="";t.supports&&(a+="@supports (".concat(t.supports,") {")),t.media&&(a+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(a+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),a+=t.css,o&&(a+="}"),t.media&&(a+="}"),t.supports&&(a+="}");var r=t.sourceMap;r&&"undefined"!=typeof btoa&&(a+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),n.styleTagTransform(a,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},113:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},n={};function t(a){var o=n[a];if(void 0!==o)return o.exports;var r=n[a]={id:a,exports:{}};return e[a](r,r.exports,t),r.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var a in n)t.o(n,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.nc=void 0;var a=t(72),o=t.n(a),r=t(825),i=t.n(r),l=t(659),c=t.n(l),s=t(56),d=t.n(s),u=t(540),m=t.n(u),p=t(113),f=t.n(p),b=t(159),g={};g.styleTagTransform=f(),g.setAttributes=d(),g.insert=c().bind(null,"head"),g.domAPI=i(),g.insertStyleElement=m(),o()(b.A,g),b.A&&b.A.locals&&b.A.locals;var v={logicProgramming:{TODO:[{title:"Introdução à Lógica",description:"Entender conceitos básicos de lógica como proposições, operadores lógicos e tabelas verdade.",label:"Teoria",labelColor:"bg-yellow-200",deadline:"Amanhã"},{title:"Estruturas Condicionais",description:"Aprender a utilizar if-else, switch-case para tomar decisões em algoritmos.",label:"Prática",labelColor:"bg-yellow-200",deadline:"Próxima semana"}],progress:[{title:"Estruturas de Repetição",description:"Entender e aplicar loops como for, while e do-while em problemas práticos.",label:"Prática",labelColor:"bg-yellow-200",deadline:"Hoje"},{title:"Vetores e Matrizes",description:"Aprender a manipular arrays e matrizes para armazenar e processar múltiplos dados.",label:"Teoria",labelColor:"bg-yellow-200",deadline:"Em andamento"}],completed:[{title:"Algoritmos de Ordenação",description:"Implementação de algoritmos de ordenação como bubble sort, merge sort e quick sort.",label:"Implementação",labelColor:"bg-green-300",deadline:"Ontem"}],active:[{title:"Recursão",description:"Compreensão e aplicação de recursão em problemas complexos.",label:"Teoria",labelColor:"bg-green-300",deadline:"Esta semana"}]},objectOrientedProgramming:{TODO:[{title:"Conceitos de OOP",description:"Aprender os princípios fundamentais de Programação Orientada a Objetos.",label:"Teoria",labelColor:"bg-yellow-200",deadline:"Em breve"},{title:"Classes e Objetos",description:"Compreender a definição e utilização de classes e objetos.",label:"Prática",labelColor:"bg-yellow-200",deadline:"Próxima semana"}],progress:[{title:"Herança",description:"Estudar e aplicar o conceito de herança entre classes.",label:"Teoria",labelColor:"bg-yellow-200",deadline:"Hoje"},{title:"Polimorfismo",description:"Implementar o polimorfismo em projetos práticos.",label:"Prática",labelColor:"bg-yellow-200",deadline:"Em andamento"}],completed:[{title:"Encapsulamento",description:"Entender e aplicar o encapsulamento para proteger os dados de uma classe.",label:"Teoria",labelColor:"bg-green-300",deadline:"Ontem"}],active:[{title:"Interfaces e Abstract Classes",description:"Compreender o uso de interfaces e classes abstratas para definir contratos e estruturas de código.",label:"Implementação",labelColor:"bg-green-300",deadline:"Esta semana"}]}};function h(e){var n=v[e];Object.keys(n).forEach((function(e){var t=document.getElementById(e);t?(t.querySelectorAll(".kanban-card").forEach((function(e){return e.remove()})),n[e].forEach((function(n,a){var o=document.createElement("div");o.className="kanban-card bg-slate-100 rounded-md p-4 mb-4",o.dataset.index=a,o.dataset.column=e,o.innerHTML='\n                    <h3 class="font-bold mb-2">'.concat(n.title,'</h3>\n                    <p class="text-black text-sm mb-4">').concat(n.description,'</p>\n                    <div class="flex justify-between items-center text-black text-sm mb-2">\n                        <span class="').concat(n.labelColor,' text-black font-bold rounded-lg p-4">').concat(n.label,"</span>\n                        <span>").concat(n.deadline,'</span>\n                    </div>\n                    <div class="flex justify-between">\n                        <button class="edit-task text-blue-500 underline">Editar</button>\n                        <button class="delete-task text-red-500 underline">Excluir</button>\n                    </div>\n                '),t.appendChild(o)}))):console.error("Elemento com ID ".concat(e," não encontrado no DOM."))}))}function y(e){var n=v[e];Object.keys(n).forEach((function(t){var a=document.getElementById(t);a&&(a.addEventListener("dragover",(function(e){e.preventDefault(),a.classList.add("drag-over")})),a.addEventListener("dragleave",(function(){a.classList.remove("drag-over")})),a.addEventListener("drop",(function(o){o.preventDefault(),a.classList.remove("drag-over");var r=JSON.parse(o.dataTransfer.getData("text/plain")),i=parseInt(r.index,10),l=r.column,c=n[l].splice(i,1)[0];c&&n[t].push(c),h(e),y(e),E(e)})),a.querySelectorAll(".kanban-card").forEach((function(e){e.draggable=!0,e.addEventListener("dragstart",(function(n){n.dataTransfer.setData("text/plain",JSON.stringify({index:n.target.dataset.index,column:n.target.dataset.column})),e.classList.add("dragging")})),e.addEventListener("dragend",(function(){e.classList.remove("dragging")}))})))}))}function E(e){var n=v[e];Object.keys(n).forEach((function(t){var a=document.getElementById(t);a&&a.querySelectorAll(".kanban-card").forEach((function(a,o){a.querySelector(".edit-task").addEventListener("click",(function(){var a=n[t][o],r=prompt("Editar título da tarefa:",a.title),i=prompt("Editar descrição da tarefa:",a.description),l=prompt("Editar label da tarefa:",a.label),c=prompt("Editar cor do label da tarefa (ex: bg-blue-200):",a.labelColor),s=prompt("Editar prazo da tarefa:",a.deadline);r&&(a.title=r),i&&(a.description=i),l&&(a.label=l),c&&(a.labelColor=c),s&&(a.deadline=s),h(e),y(e),E(e)})),a.querySelector(".delete-task").addEventListener("click",(function(){n[t].splice(o,1),h(e),y(e),E(e)}))}))}))}function x(){h("logicProgramming"),y("logicProgramming"),E("logicProgramming"),document.getElementById("logicProgrammingBtn").addEventListener("click",(function(){h("logicProgramming"),y("logicProgramming"),E("logicProgramming")})),document.getElementById("objectOrientedProgrammingBtn").addEventListener("click",(function(){h("objectOrientedProgramming"),y("objectOrientedProgramming"),E("objectOrientedProgramming")}))}var w=null;function C(){document.querySelectorAll("[data-link]").forEach((function(e){e.addEventListener("click",(function(e){e.preventDefault();var n=e.currentTarget.getAttribute("data-link");n?function(e){w&&clearTimeout(w),w=setTimeout((function(){history.pushState(null,null,e),setTimeout((function(){O()}),100)}),300)}(n):console.error("A data-link attribute is missing on the clicked element.")}))}))}function L(e){var n=document.getElementById("app");n?A("/components/".concat(e,".html"),(function(t){n.innerHTML=t,C(),"roadmap-details"===e&&x()}),(function(){n.innerHTML="<p>Error loading component. Please try again.</p>"}),(function(){})):console.error("Elemento com ID 'app' não encontrado.")}function O(){var e=[{path:"/",view:function(){return L("about-roadmap")}},{path:"/roadmaps",view:function(){return L("roadmaps")}},{path:"/roadmap-details",view:function(){return L("roadmap-details")}},{path:"/about-roadmap",view:function(){return L("about-roadmap")}}],n=e.map((function(e){return{route:e,isMatch:location.pathname===e.path}})).find((function(e){return e.isMatch}));n||(n={route:e[0],isMatch:!0}),n.route.view()}window.addEventListener("popstate",O),document.addEventListener("DOMContentLoaded",(function(){O()}));var k=null,P=null,T=null;function I(e){e&&(console.log("Aborting previous fetch"),e.abort())}function A(e,n,t,a){var o=new AbortController;a(o);var r=o.signal;fetch(e,{signal:r}).then((function(n){if(!n.ok)throw new Error("Failed to load ".concat(e));return n.text()})).then(n).catch((function(e){"AbortError"!==e.name&&(console.error("Fetch error:",e),t(e))}))}function j(e,n,t){var a,o=document.getElementById(n);o?(a="header"===e?function(e){I(k),k=e}:"sidebar"===e?function(e){I(P),P=e}:"mobile-navbar"===e?function(e){I(T),T=e}:function(){},A("/components/".concat(e,".html"),(function(e){o.innerHTML=e,t&&t()}),(function(){o.innerHTML="<p>Error loading ".concat(e,". Please try again.</p>")}),a)):console.error("Elemento com ID '".concat(n,"' não encontrado."))}function M(){var e=document.getElementById("sidebar-container"),n=document.getElementById("main-container");e&&n?C():console.error("Sidebar ou mainContainer não encontrado!")}document.addEventListener("DOMContentLoaded",(function(){j("header","header-container"),j("sidebar","sidebar-container",M),j("mobile-navbar","mobile-navbar-container",C),O(),window.location.pathname.includes("roadmap-details")&&x()}))})();