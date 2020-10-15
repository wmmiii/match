(this.webpackJsonpmatch=this.webpackJsonpmatch||[]).push([[0],[,,,,,function(e,t,r){e.exports=r(14)},,,,,function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),i=r(2),o=r.n(i),c=(r(10),{display:"none"}),l=function(){return n.a.createElement("svg",{width:"64",height:"64",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:c},n.a.createElement("defs",null,n.a.createElement("g",{id:"alpha",fill:"none"},n.a.createElement("circle",{cx:"32",cy:"32",r:"24",stroke:"currentColor",strokeWidth:"4"}),n.a.createElement("circle",{cx:"32",cy:"32",r:"16",stroke:"currentColor",strokeWidth:"4"})),n.a.createElement("path",{id:"beta",d:"M48 12L16 52h32L16 12h32z",fill:"none",stroke:"currentColor",strokeWidth:"4",strokeLinecap:"round",strokeLinejoin:"round"}),n.a.createElement("path",{id:"gamma",d:"M34 16a2 2 0 10-4 0h4zM8 38a2 2 0 100 4v-4zm48 4a2 2 0 100-4v4zm-5.59-17.59a2 2 0 10-2.82-2.82l2.82 2.82zm-34-2.82a2 2 0 10-2.82 2.82l2.82-2.82zM8 42h24v-4H8v4zm24 0h24v-4H32v4zm0-16c3.87 0 7.36 1.56 9.9 4.1l2.83-2.83A17.95 17.95 0 0032 22v4zm9.9 4.1A13.95 13.95 0 0146 40h4c0-4.97-2.02-9.47-5.27-12.73L41.9 30.1zm2.83 0l5.68-5.69-2.82-2.82-5.69 5.68 2.83 2.83zM18 40c0-3.87 1.56-7.36 4.1-9.9l-2.83-2.83A17.95 17.95 0 0014 40h4zm4.1-9.9A13.95 13.95 0 0132 26v-4c-4.97 0-9.47 2.02-12.73 5.27l2.83 2.83zm0-2.83l-5.69-5.68-2.82 2.82 5.68 5.69 2.83-2.83zM34 24v-8h-4v8h4z",fill:"currentColor"}),n.a.createElement("path",{id:"delta",d:"M32 12l1.41-1.41a2 2 0 00-2.82 0L32 12zM12 32l-1.41-1.41a2 2 0 000 2.82L12 32zm20 20l-1.41 1.41a2 2 0 002.82 0L32 52zm20-20l1.41 1.41a2 2 0 000-2.82L52 32zM30.59 10.59l-20 20 2.82 2.82 20-20-2.82-2.82zm-20 22.82l20 20 2.82-2.82-20-20-2.82 2.82zm22.82 20l20-20-2.82-2.82-20 20 2.82 2.82zm20-22.82l-20-20-2.82 2.82 20 20 2.82-2.82zM30 12v40h4V12h-4z",fill:"currentColor"})))};r(11);function s(e,t,r){var a=e[t];return null!=a?a[r]:void 0}function u(e,t,r,a){var n=e[t];null==n&&(e[t]={},n=e[t]),n[r]=a}function h(e,t){for(var r in e){var a=e[r];for(var n in a){var i=a[n];null!=i&&t(parseInt(r),parseInt(n),i)}}}r(12);var p=function(e){var t=e.color,r=e.icon,a=e.id,i=e.scale,o={color:t,height:i,left:e.x*i+"px",top:e.y*i+"px",width:i};return r="#"+r,n.a.createElement("div",{className:"Piece",style:o,key:a},n.a.createElement("svg",{width:"64",height:"64",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 64 64"},n.a.createElement("use",{xlinkHref:r})))},d={alpha:{type:"alpha",icon:"alpha",baseColor:"#0066FF"},beta:{type:"beta",icon:"beta",baseColor:"#FFB800"},gamma:{type:"gamma",icon:"gamma",baseColor:"#EB00FF"},delta:{type:"delta",icon:"delta",baseColor:"#00FFC2"}},v=(r(13),function(e){var t=e.state,r=-1/0,a=1/0,i=-1/0,o=1/0,c=[];h(t.board,(function(e,t){var l={left:64*e+"px",top:64*t+"px"},s="".concat(e,",").concat(t);c.push(n.a.createElement("div",{className:"Board-cell",style:l,key:s})),r=Math.max(e,r),i=Math.max(t,i),a=Math.min(e,a),o=Math.min(t,o)}));var l=[];h(t.pieces,(function(e,t,r){var a=d[r.type];l.push(p({color:a.baseColor,icon:a.icon,id:r.id,scale:64,x:e,y:t}))}));var s={width:64*(r-a)+"px",height:64*(i-o)+"px"};return n.a.createElement("div",{className:"Board",style:s},n.a.createElement("div",{className:"Board-grid"},c),n.a.createElement("div",{className:"Board-pieces"},l))}),m=r(3),f=r(4),y=function(){function e(t,r,a,n){Object(m.a)(this,e),this.currentState=void 0,this.generator=void 0,this.allowedMoves=void 0,this.rules=void 0,this.currentState=t,this.generator=r,this.allowedMoves=a,this.rules=n.sort((function(e,t){return e.priority-t.priority}))}return Object(f.a)(e,[{key:"initialize",value:function(){for(console.time();!this.currentState.settled;)this.tick();this.currentState.score=0,console.timeEnd()}},{key:"move",value:function(e,t){var r=this;if(!0===this.currentState.settled&&this.allowedMoves.some((function(a){return a(e,t,r.currentState)}))){var a=this.currentState.pieces[e.x][e.y];return this.currentState.pieces[e.x][e.y]=this.currentState.pieces[t.x][t.y],this.currentState.pieces[e.x][e.y]=a,this.currentState.settled=!1,!0}return!1}},{key:"tick",value:function(){var e=this,t=this.state,r=JSON.stringify(t),a=this.state,n=!0,i={};return h(a.board,(function(e,t){if(null==s(a.pieces,e,t))for(;null!=s(a.board,e,t);)u(i,e,t,!0),t-=1})),h(i,(function(r,i){null!=s(a.board,r,i-1)?u(a.pieces,r,i,s(t.pieces,r,i-1)):u(a.pieces,r,i,e.generator({x:r,y:i})),n=!1})),n&&this.rules.forEach((function(e){JSON.stringify(a);a=e.apply(a),JSON.stringify(a)})),a.settled=JSON.stringify(a)===r,this.currentState=a,Object.assign({},this.currentState)}},{key:"state",get:function(){return JSON.parse(JSON.stringify(this.currentState))}}]),e}(),g=r(16),x=Object.keys(d),z=function(){var e=Math.floor(Math.random()*x.length);return{id:Object(g.a)(),type:x[e]}},b=[function(e,t,r){return Math.abs(e.x-t.x)+Math.abs(e.y-t.y)===1&&(null!=s(r.pieces,e.x,e.y)&&null!=s(r.pieces,t.x,t.y))}],w=[{priority:0,apply:function(e){return h(e.board,(function(t,r){var a=s(e.pieces,t,r);if(null!=a){var n=s(e.pieces,t+1,r);if(null!=n){var i=s(e.pieces,t+2,r);null!=i&&a.type===n.type&&a.type===i.type&&(u(e.pieces,t,r,void 0),u(e.pieces,t+1,r,void 0),u(e.pieces,t+2,r,void 0),e.score+=100)}}})),e}},{priority:0,apply:function(e){return h(e.board,(function(t,r){var a=s(e.pieces,t,r);if(null!=a){var n=s(e.pieces,t,r+1);if(null!=n){var i=s(e.pieces,t,r+2);null!=i&&a.type===n.type&&a.type===i.type&&(u(e.pieces,t,r,void 0),u(e.pieces,t,r+1,void 0),u(e.pieces,t,r+2,void 0),e.score+=100)}}})),e}}];var E=function(){var e=new y({board:{0:{1:!0,2:!0,3:!0},1:{0:!0,1:!0,2:!0,3:!0,4:!0},2:{0:!0,1:!0,2:!0,3:!0,4:!0},3:{0:!0,1:!0,2:!0,3:!0,4:!0},4:{1:!0,2:!0,3:!0}},score:0,pieces:[],settled:!1},z,b,w);return e.initialize(),n.a.createElement("div",{className:"App"},n.a.createElement(l,null),n.a.createElement(v,{state:e.state}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[5,1,2]]]);
//# sourceMappingURL=main.46a7a403.chunk.js.map