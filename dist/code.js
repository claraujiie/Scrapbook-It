(()=>{"use strict";function e(e,n,t,r){var i=figma.createRectangle();return i.name=r||"image",i.x=n.a,i.y=n.b,i.resize(t.a,t.b),i.fills=[e],i}function n(e,n,t,r){void 0===t&&(t=!0);var i=figma.createFrame();return i.name=r,i.x=e.a,i.y=e.b,i.clipsContent=t,i.resize(n.a,n.b),i}function t(e,n){return{paint:e,node:n}}function r(e,n){return{a:e,b:n}}var i=function(e,n,t,r){return new(t||(t=Promise))((function(i,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function u(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(o,u)}c((r=r.apply(e,n||[])).next())}))},a=function(e,n){var t,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(t)throw new TypeError("Generator is already executing.");for(;o;)try{if(t=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!((i=(i=o.trys).length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=n.call(e,o)}catch(e){a=[6,e],r=0}finally{t=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}};function o(e){return i(this,void 0,void 0,(function(){var n,t;return a(this,(function(r){switch(r.label){case 0:return figma.showUI(__html__,{visible:!1}),[4,e.exportAsync()];case 1:return n=r.sent(),figma.ui.postMessage(n),[4,new Promise((function(e,n){figma.ui.onmessage=function(n){return e(n)}}))];case 2:return t=r.sent(),[2,{type:"IMAGE",scaleMode:"CROP",imageHash:figma.createImage(t).hash}]}}))}))}function u(e){return i(this,void 0,void 0,(function(){return a(this,(function(n){switch(n.label){case 0:return[4,o(e)];case 1:return[2,t(n.sent(),e)]}}))}))}function c(e){return i(this,void 0,void 0,(function(){var n,t,r,i,o,c;return a(this,(function(a){switch(a.label){case 0:n=[],t=0,r=e,a.label=1;case 1:return t<r.length?(i=r[t],c=(o=n).push,[4,u(i)]):[3,4];case 2:c.apply(o,[a.sent()]),a.label=3;case 3:return t++,[3,1];case 4:return[2,n]}}))}))}(function(){return t=this,i=void 0,o=function(){var t,i,a,o,u,l,s,f,h,p,d,g,b,y,v,w,m,x,A,E,P,S,k,C;return function(e,n){var t,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(t)throw new TypeError("Generator is already executing.");for(;o;)try{if(t=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!((i=(i=o.trys).length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=n.call(e,o)}catch(e){a=[6,e],r=0}finally{t=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}}(this,(function(I){switch(I.label){case 0:return[4,c(figma.currentPage.children.filter((function(e){return"FRAME"==e.type})).sort((function(e,n){return e.x-n.x})))];case 1:for(t=I.sent(),i=figma.createPage(),figma.currentPage=i,S=0;S<t.length;S++)a=t[S].node,o=a.x,u=a.y,l=a.width,s=a.height,f=t[S].paint,h=n(r(o,u),r(l,s),!1,"frame"+S),i.appendChild(h),S<t.length-1&&(d=t[p=S+1].node,g=d.width,b=d.height,y=t[p].paint,h.appendChild(e(y,r(0,0),r(g,b),"image"+p))),h.appendChild(e(f,r(0,0),r(l,s),"image"+S)),S>0&&(w=t[v=S-1].node,m=w.width,x=w.height,A=t[v].paint,E=m/12,h.appendChild(e(A,r(-(E+20),0),r(E,x),"image"+v)));for(P=i.children.filter((function(e){return"FRAME"==e.type})),S=0;S<P.length-1;S++)k=P[S],C=P[S+1],0==S&&(i.flowStartingPoints=[{nodeId:k.id,name:"Start Slideshow"}]),k.reactions=[{action:{type:"NODE",destinationId:C.id,navigation:"NAVIGATE",preserveScrollPosition:!1,transition:{type:"SMART_ANIMATE",easing:{type:"EASE_OUT"},duration:1}},trigger:{type:"ON_CLICK"}}];return[2]}}))},new((a=void 0)||(a=Promise))((function(e,n){function r(e){try{c(o.next(e))}catch(e){n(e)}}function u(e){try{c(o.throw(e))}catch(e){n(e)}}function c(n){var t;n.done?e(n.value):(t=n.value,t instanceof a?t:new a((function(e){e(t)}))).then(r,u)}c((o=o.apply(t,i||[])).next())}));var t,i,a,o})().then((function(){return figma.closePlugin()}))})();