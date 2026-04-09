import{_ as tM}from"./index-COt8_I5w.js";function ax(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Fd={exports:{}},hl={};var S0;function eM(){if(S0)return hl;S0=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var p in l)p!=="key"&&(c[p]=l[p])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return hl.Fragment=t,hl.jsx=i,hl.jsxs=i,hl}var M0;function nM(){return M0||(M0=1,Fd.exports=eM()),Fd.exports}var y=nM(),Bd={exports:{}},Se={};var b0;function iM(){if(b0)return Se;b0=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),g=Symbol.iterator;function M(B){return B===null||typeof B!="object"?null:(B=g&&B[g]||B["@@iterator"],typeof B=="function"?B:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,x={};function b(B,W,dt){this.props=B,this.context=W,this.refs=x,this.updater=dt||E}b.prototype.isReactComponent={},b.prototype.setState=function(B,W){if(typeof B!="object"&&typeof B!="function"&&B!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,B,W,"setState")},b.prototype.forceUpdate=function(B){this.updater.enqueueForceUpdate(this,B,"forceUpdate")};function L(){}L.prototype=b.prototype;function F(B,W,dt){this.props=B,this.context=W,this.refs=x,this.updater=dt||E}var N=F.prototype=new L;N.constructor=F,R(N,b.prototype),N.isPureReactComponent=!0;var H=Array.isArray;function z(){}var I={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function O(B,W,dt){var Dt=dt.ref;return{$$typeof:r,type:B,key:W,ref:Dt!==void 0?Dt:null,props:dt}}function mt(B,W){return O(B.type,W,B.props)}function V(B){return typeof B=="object"&&B!==null&&B.$$typeof===r}function J(B){var W={"=":"=0",":":"=2"};return"$"+B.replace(/[=:]/g,function(dt){return W[dt]})}var at=/\/+/g;function st(B,W){return typeof B=="object"&&B!==null&&B.key!=null?J(""+B.key):W.toString(36)}function et(B){switch(B.status){case"fulfilled":return B.value;case"rejected":throw B.reason;default:switch(typeof B.status=="string"?B.then(z,z):(B.status="pending",B.then(function(W){B.status==="pending"&&(B.status="fulfilled",B.value=W)},function(W){B.status==="pending"&&(B.status="rejected",B.reason=W)})),B.status){case"fulfilled":return B.value;case"rejected":throw B.reason}}throw B}function P(B,W,dt,Dt,zt){var Q=typeof B;(Q==="undefined"||Q==="boolean")&&(B=null);var Et=!1;if(B===null)Et=!0;else switch(Q){case"bigint":case"string":case"number":Et=!0;break;case"object":switch(B.$$typeof){case r:case t:Et=!0;break;case _:return Et=B._init,P(Et(B._payload),W,dt,Dt,zt)}}if(Et)return zt=zt(B),Et=Dt===""?"."+st(B,0):Dt,H(zt)?(dt="",Et!=null&&(dt=Et.replace(at,"$&/")+"/"),P(zt,W,dt,"",function(Ut){return Ut})):zt!=null&&(V(zt)&&(zt=mt(zt,dt+(zt.key==null||B&&B.key===zt.key?"":(""+zt.key).replace(at,"$&/")+"/")+Et)),W.push(zt)),1;Et=0;var Mt=Dt===""?".":Dt+":";if(H(B))for(var Wt=0;Wt<B.length;Wt++)Dt=B[Wt],Q=Mt+st(Dt,Wt),Et+=P(Dt,W,dt,Q,zt);else if(Wt=M(B),typeof Wt=="function")for(B=Wt.call(B),Wt=0;!(Dt=B.next()).done;)Dt=Dt.value,Q=Mt+st(Dt,Wt++),Et+=P(Dt,W,dt,Q,zt);else if(Q==="object"){if(typeof B.then=="function")return P(et(B),W,dt,Dt,zt);throw W=String(B),Error("Objects are not valid as a React child (found: "+(W==="[object Object]"?"object with keys {"+Object.keys(B).join(", ")+"}":W)+"). If you meant to render a collection of children, use an array instead.")}return Et}function G(B,W,dt){if(B==null)return B;var Dt=[],zt=0;return P(B,Dt,"","",function(Q){return W.call(dt,Q,zt++)}),Dt}function Y(B){if(B._status===-1){var W=B._result;W=W(),W.then(function(dt){(B._status===0||B._status===-1)&&(B._status=1,B._result=dt)},function(dt){(B._status===0||B._status===-1)&&(B._status=2,B._result=dt)}),B._status===-1&&(B._status=0,B._result=W)}if(B._status===1)return B._result.default;throw B._result}var ot=typeof reportError=="function"?reportError:function(B){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var W=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof B=="object"&&B!==null&&typeof B.message=="string"?String(B.message):String(B),error:B});if(!window.dispatchEvent(W))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",B);return}console.error(B)},yt={map:G,forEach:function(B,W,dt){G(B,function(){W.apply(this,arguments)},dt)},count:function(B){var W=0;return G(B,function(){W++}),W},toArray:function(B){return G(B,function(W){return W})||[]},only:function(B){if(!V(B))throw Error("React.Children.only expected to receive a single React element child.");return B}};return Se.Activity=v,Se.Children=yt,Se.Component=b,Se.Fragment=i,Se.Profiler=l,Se.PureComponent=F,Se.StrictMode=s,Se.Suspense=m,Se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=I,Se.__COMPILER_RUNTIME={__proto__:null,c:function(B){return I.H.useMemoCache(B)}},Se.cache=function(B){return function(){return B.apply(null,arguments)}},Se.cacheSignal=function(){return null},Se.cloneElement=function(B,W,dt){if(B==null)throw Error("The argument must be a React element, but you passed "+B+".");var Dt=R({},B.props),zt=B.key;if(W!=null)for(Q in W.key!==void 0&&(zt=""+W.key),W)!T.call(W,Q)||Q==="key"||Q==="__self"||Q==="__source"||Q==="ref"&&W.ref===void 0||(Dt[Q]=W[Q]);var Q=arguments.length-2;if(Q===1)Dt.children=dt;else if(1<Q){for(var Et=Array(Q),Mt=0;Mt<Q;Mt++)Et[Mt]=arguments[Mt+2];Dt.children=Et}return O(B.type,zt,Dt)},Se.createContext=function(B){return B={$$typeof:f,_currentValue:B,_currentValue2:B,_threadCount:0,Provider:null,Consumer:null},B.Provider=B,B.Consumer={$$typeof:c,_context:B},B},Se.createElement=function(B,W,dt){var Dt,zt={},Q=null;if(W!=null)for(Dt in W.key!==void 0&&(Q=""+W.key),W)T.call(W,Dt)&&Dt!=="key"&&Dt!=="__self"&&Dt!=="__source"&&(zt[Dt]=W[Dt]);var Et=arguments.length-2;if(Et===1)zt.children=dt;else if(1<Et){for(var Mt=Array(Et),Wt=0;Wt<Et;Wt++)Mt[Wt]=arguments[Wt+2];zt.children=Mt}if(B&&B.defaultProps)for(Dt in Et=B.defaultProps,Et)zt[Dt]===void 0&&(zt[Dt]=Et[Dt]);return O(B,Q,zt)},Se.createRef=function(){return{current:null}},Se.forwardRef=function(B){return{$$typeof:p,render:B}},Se.isValidElement=V,Se.lazy=function(B){return{$$typeof:_,_payload:{_status:-1,_result:B},_init:Y}},Se.memo=function(B,W){return{$$typeof:h,type:B,compare:W===void 0?null:W}},Se.startTransition=function(B){var W=I.T,dt={};I.T=dt;try{var Dt=B(),zt=I.S;zt!==null&&zt(dt,Dt),typeof Dt=="object"&&Dt!==null&&typeof Dt.then=="function"&&Dt.then(z,ot)}catch(Q){ot(Q)}finally{W!==null&&dt.types!==null&&(W.types=dt.types),I.T=W}},Se.unstable_useCacheRefresh=function(){return I.H.useCacheRefresh()},Se.use=function(B){return I.H.use(B)},Se.useActionState=function(B,W,dt){return I.H.useActionState(B,W,dt)},Se.useCallback=function(B,W){return I.H.useCallback(B,W)},Se.useContext=function(B){return I.H.useContext(B)},Se.useDebugValue=function(){},Se.useDeferredValue=function(B,W){return I.H.useDeferredValue(B,W)},Se.useEffect=function(B,W){return I.H.useEffect(B,W)},Se.useEffectEvent=function(B){return I.H.useEffectEvent(B)},Se.useId=function(){return I.H.useId()},Se.useImperativeHandle=function(B,W,dt){return I.H.useImperativeHandle(B,W,dt)},Se.useInsertionEffect=function(B,W){return I.H.useInsertionEffect(B,W)},Se.useLayoutEffect=function(B,W){return I.H.useLayoutEffect(B,W)},Se.useMemo=function(B,W){return I.H.useMemo(B,W)},Se.useOptimistic=function(B,W){return I.H.useOptimistic(B,W)},Se.useReducer=function(B,W,dt){return I.H.useReducer(B,W,dt)},Se.useRef=function(B){return I.H.useRef(B)},Se.useState=function(B){return I.H.useState(B)},Se.useSyncExternalStore=function(B,W,dt){return I.H.useSyncExternalStore(B,W,dt)},Se.useTransition=function(){return I.H.useTransition()},Se.version="19.2.4",Se}var E0;function wp(){return E0||(E0=1,Bd.exports=iM()),Bd.exports}var nt=wp();const aM=ax(nt);var Hd={exports:{}},pl={},Gd={exports:{}},Vd={};var T0;function sM(){return T0||(T0=1,(function(r){function t(P,G){var Y=P.length;P.push(G);t:for(;0<Y;){var ot=Y-1>>>1,yt=P[ot];if(0<l(yt,G))P[ot]=G,P[Y]=yt,Y=ot;else break t}}function i(P){return P.length===0?null:P[0]}function s(P){if(P.length===0)return null;var G=P[0],Y=P.pop();if(Y!==G){P[0]=Y;t:for(var ot=0,yt=P.length,B=yt>>>1;ot<B;){var W=2*(ot+1)-1,dt=P[W],Dt=W+1,zt=P[Dt];if(0>l(dt,Y))Dt<yt&&0>l(zt,dt)?(P[ot]=zt,P[Dt]=Y,ot=Dt):(P[ot]=dt,P[W]=Y,ot=W);else if(Dt<yt&&0>l(zt,Y))P[ot]=zt,P[Dt]=Y,ot=Dt;else break t}}return G}function l(P,G){var Y=P.sortIndex-G.sortIndex;return Y!==0?Y:P.id-G.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,p=f.now();r.unstable_now=function(){return f.now()-p}}var m=[],h=[],_=1,v=null,g=3,M=!1,E=!1,R=!1,x=!1,b=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,F=typeof setImmediate<"u"?setImmediate:null;function N(P){for(var G=i(h);G!==null;){if(G.callback===null)s(h);else if(G.startTime<=P)s(h),G.sortIndex=G.expirationTime,t(m,G);else break;G=i(h)}}function H(P){if(R=!1,N(P),!E)if(i(m)!==null)E=!0,z||(z=!0,J());else{var G=i(h);G!==null&&et(H,G.startTime-P)}}var z=!1,I=-1,T=5,O=-1;function mt(){return x?!0:!(r.unstable_now()-O<T)}function V(){if(x=!1,z){var P=r.unstable_now();O=P;var G=!0;try{t:{E=!1,R&&(R=!1,L(I),I=-1),M=!0;var Y=g;try{e:{for(N(P),v=i(m);v!==null&&!(v.expirationTime>P&&mt());){var ot=v.callback;if(typeof ot=="function"){v.callback=null,g=v.priorityLevel;var yt=ot(v.expirationTime<=P);if(P=r.unstable_now(),typeof yt=="function"){v.callback=yt,N(P),G=!0;break e}v===i(m)&&s(m),N(P)}else s(m);v=i(m)}if(v!==null)G=!0;else{var B=i(h);B!==null&&et(H,B.startTime-P),G=!1}}break t}finally{v=null,g=Y,M=!1}G=void 0}}finally{G?J():z=!1}}}var J;if(typeof F=="function")J=function(){F(V)};else if(typeof MessageChannel<"u"){var at=new MessageChannel,st=at.port2;at.port1.onmessage=V,J=function(){st.postMessage(null)}}else J=function(){b(V,0)};function et(P,G){I=b(function(){P(r.unstable_now())},G)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(P){P.callback=null},r.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<P?Math.floor(1e3/P):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(P){switch(g){case 1:case 2:case 3:var G=3;break;default:G=g}var Y=g;g=G;try{return P()}finally{g=Y}},r.unstable_requestPaint=function(){x=!0},r.unstable_runWithPriority=function(P,G){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var Y=g;g=P;try{return G()}finally{g=Y}},r.unstable_scheduleCallback=function(P,G,Y){var ot=r.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?ot+Y:ot):Y=ot,P){case 1:var yt=-1;break;case 2:yt=250;break;case 5:yt=1073741823;break;case 4:yt=1e4;break;default:yt=5e3}return yt=Y+yt,P={id:_++,callback:G,priorityLevel:P,startTime:Y,expirationTime:yt,sortIndex:-1},Y>ot?(P.sortIndex=Y,t(h,P),i(m)===null&&P===i(h)&&(R?(L(I),I=-1):R=!0,et(H,Y-ot))):(P.sortIndex=yt,t(m,P),E||M||(E=!0,z||(z=!0,J()))),P},r.unstable_shouldYield=mt,r.unstable_wrapCallback=function(P){var G=g;return function(){var Y=g;g=G;try{return P.apply(this,arguments)}finally{g=Y}}}})(Vd)),Vd}var A0;function rM(){return A0||(A0=1,Gd.exports=sM()),Gd.exports}var kd={exports:{}},Zn={};var C0;function oM(){if(C0)return Zn;C0=1;var r=wp();function t(m){var h="https://react.dev/errors/"+m;if(1<arguments.length){h+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)h+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+m+"; visit "+h+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,h,_){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:v==null?null:""+v,children:m,containerInfo:h,implementation:_}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(m,h){if(m==="font")return"";if(typeof h=="string")return h==="use-credentials"?h:""}return Zn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Zn.createPortal=function(m,h){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!h||h.nodeType!==1&&h.nodeType!==9&&h.nodeType!==11)throw Error(t(299));return c(m,h,null,_)},Zn.flushSync=function(m){var h=f.T,_=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=h,s.p=_,s.d.f()}},Zn.preconnect=function(m,h){typeof m=="string"&&(h?(h=h.crossOrigin,h=typeof h=="string"?h==="use-credentials"?h:"":void 0):h=null,s.d.C(m,h))},Zn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Zn.preinit=function(m,h){if(typeof m=="string"&&h&&typeof h.as=="string"){var _=h.as,v=p(_,h.crossOrigin),g=typeof h.integrity=="string"?h.integrity:void 0,M=typeof h.fetchPriority=="string"?h.fetchPriority:void 0;_==="style"?s.d.S(m,typeof h.precedence=="string"?h.precedence:void 0,{crossOrigin:v,integrity:g,fetchPriority:M}):_==="script"&&s.d.X(m,{crossOrigin:v,integrity:g,fetchPriority:M,nonce:typeof h.nonce=="string"?h.nonce:void 0})}},Zn.preinitModule=function(m,h){if(typeof m=="string")if(typeof h=="object"&&h!==null){if(h.as==null||h.as==="script"){var _=p(h.as,h.crossOrigin);s.d.M(m,{crossOrigin:_,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0})}}else h==null&&s.d.M(m)},Zn.preload=function(m,h){if(typeof m=="string"&&typeof h=="object"&&h!==null&&typeof h.as=="string"){var _=h.as,v=p(_,h.crossOrigin);s.d.L(m,_,{crossOrigin:v,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0,type:typeof h.type=="string"?h.type:void 0,fetchPriority:typeof h.fetchPriority=="string"?h.fetchPriority:void 0,referrerPolicy:typeof h.referrerPolicy=="string"?h.referrerPolicy:void 0,imageSrcSet:typeof h.imageSrcSet=="string"?h.imageSrcSet:void 0,imageSizes:typeof h.imageSizes=="string"?h.imageSizes:void 0,media:typeof h.media=="string"?h.media:void 0})}},Zn.preloadModule=function(m,h){if(typeof m=="string")if(h){var _=p(h.as,h.crossOrigin);s.d.m(m,{as:typeof h.as=="string"&&h.as!=="script"?h.as:void 0,crossOrigin:_,integrity:typeof h.integrity=="string"?h.integrity:void 0})}else s.d.m(m)},Zn.requestFormReset=function(m){s.d.r(m)},Zn.unstable_batchedUpdates=function(m,h){return m(h)},Zn.useFormState=function(m,h,_){return f.H.useFormState(m,h,_)},Zn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Zn.version="19.2.4",Zn}var R0;function lM(){if(R0)return kd.exports;R0=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),kd.exports=oM(),kd.exports}var w0;function cM(){if(w0)return pl;w0=1;var r=rM(),t=wp(),i=lM();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function p(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(s(188))}function h(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,o=n;;){var u=a.return;if(u===null)break;var d=u.alternate;if(d===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===d.child){for(d=u.child;d;){if(d===a)return m(u),e;if(d===o)return m(u),n;d=d.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=d;else{for(var S=!1,D=u.child;D;){if(D===a){S=!0,a=u,o=d;break}if(D===o){S=!0,o=u,a=d;break}D=D.sibling}if(!S){for(D=d.child;D;){if(D===a){S=!0,a=d,o=u;break}if(D===o){S=!0,o=d,a=u;break}D=D.sibling}if(!S)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function _(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=_(e),n!==null)return n;e=e.sibling}return null}var v=Object.assign,g=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),b=Symbol.for("react.profiler"),L=Symbol.for("react.consumer"),F=Symbol.for("react.context"),N=Symbol.for("react.forward_ref"),H=Symbol.for("react.suspense"),z=Symbol.for("react.suspense_list"),I=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),O=Symbol.for("react.activity"),mt=Symbol.for("react.memo_cache_sentinel"),V=Symbol.iterator;function J(e){return e===null||typeof e!="object"?null:(e=V&&e[V]||e["@@iterator"],typeof e=="function"?e:null)}var at=Symbol.for("react.client.reference");function st(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===at?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case R:return"Fragment";case b:return"Profiler";case x:return"StrictMode";case H:return"Suspense";case z:return"SuspenseList";case O:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case F:return e.displayName||"Context";case L:return(e._context.displayName||"Context")+".Consumer";case N:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case I:return n=e.displayName||null,n!==null?n:st(e.type)||"Memo";case T:n=e._payload,e=e._init;try{return st(e(n))}catch{}}return null}var et=Array.isArray,P=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,G=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Y={pending:!1,data:null,method:null,action:null},ot=[],yt=-1;function B(e){return{current:e}}function W(e){0>yt||(e.current=ot[yt],ot[yt]=null,yt--)}function dt(e,n){yt++,ot[yt]=e.current,e.current=n}var Dt=B(null),zt=B(null),Q=B(null),Et=B(null);function Mt(e,n){switch(dt(Q,n),dt(zt,e),dt(Dt,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?j_(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=j_(n),e=X_(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}W(Dt),dt(Dt,e)}function Wt(){W(Dt),W(zt),W(Q)}function Ut(e){e.memoizedState!==null&&dt(Et,e);var n=Dt.current,a=X_(n,e.type);n!==a&&(dt(zt,e),dt(Dt,a))}function re(e){zt.current===e&&(W(Dt),W(zt)),Et.current===e&&(W(Et),cl._currentValue=Y)}var ye,Rt;function Lt(e){if(ye===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);ye=n&&n[1]||"",Rt=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ye+e+Rt}var ae=!1;function qt(e,n){if(!e||ae)return"";ae=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var At=function(){throw Error()};if(Object.defineProperty(At.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(At,[])}catch(_t){var pt=_t}Reflect.construct(e,[],At)}else{try{At.call()}catch(_t){pt=_t}e.call(At.prototype)}}else{try{throw Error()}catch(_t){pt=_t}(At=e())&&typeof At.catch=="function"&&At.catch(function(){})}}catch(_t){if(_t&&pt&&typeof _t.stack=="string")return[_t.stack,pt.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=o.DetermineComponentFrameRoot(),S=d[0],D=d[1];if(S&&D){var j=S.split(`
`),ut=D.split(`
`);for(u=o=0;o<j.length&&!j[o].includes("DetermineComponentFrameRoot");)o++;for(;u<ut.length&&!ut[u].includes("DetermineComponentFrameRoot");)u++;if(o===j.length||u===ut.length)for(o=j.length-1,u=ut.length-1;1<=o&&0<=u&&j[o]!==ut[u];)u--;for(;1<=o&&0<=u;o--,u--)if(j[o]!==ut[u]){if(o!==1||u!==1)do if(o--,u--,0>u||j[o]!==ut[u]){var St=`
`+j[o].replace(" at new "," at ");return e.displayName&&St.includes("<anonymous>")&&(St=St.replace("<anonymous>",e.displayName)),St}while(1<=o&&0<=u);break}}}finally{ae=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?Lt(a):""}function he(e,n){switch(e.tag){case 26:case 27:case 5:return Lt(e.type);case 16:return Lt("Lazy");case 13:return e.child!==n&&n!==null?Lt("Suspense Fallback"):Lt("Suspense");case 19:return Lt("SuspenseList");case 0:case 15:return qt(e.type,!1);case 11:return qt(e.type.render,!1);case 1:return qt(e.type,!0);case 31:return Lt("Activity");default:return""}}function k(e){try{var n="",a=null;do n+=he(e,a),a=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Ae=Object.prototype.hasOwnProperty,oe=r.unstable_scheduleCallback,le=r.unstable_cancelCallback,Gt=r.unstable_shouldYield,U=r.unstable_requestPaint,A=r.unstable_now,q=r.unstable_getCurrentPriorityLevel,lt=r.unstable_ImmediatePriority,vt=r.unstable_UserBlockingPriority,ht=r.unstable_NormalPriority,kt=r.unstable_LowPriority,Pt=r.unstable_IdlePriority,te=r.log,ie=r.unstable_setDisableYieldValue,Tt=null,wt=null;function jt(e){if(typeof te=="function"&&ie(e),wt&&typeof wt.setStrictMode=="function")try{wt.setStrictMode(Tt,e)}catch{}}var Ft=Math.clz32?Math.clz32:Z,Xt=Math.log,_e=Math.LN2;function Z(e){return e>>>=0,e===0?32:31-(Xt(e)/_e|0)|0}var Ot=256,It=262144,Kt=4194304;function Nt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function xt(e,n,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,d=e.suspendedLanes,S=e.pingedLanes;e=e.warmLanes;var D=o&134217727;return D!==0?(o=D&~d,o!==0?u=Nt(o):(S&=D,S!==0?u=Nt(S):a||(a=D&~e,a!==0&&(u=Nt(a))))):(D=o&~d,D!==0?u=Nt(D):S!==0?u=Nt(S):a||(a=o&~e,a!==0&&(u=Nt(a)))),u===0?0:n!==0&&n!==u&&(n&d)===0&&(d=u&-u,a=n&-n,d>=a||d===32&&(a&4194048)!==0)?n:u}function Qt(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function fe(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function He(){var e=Kt;return Kt<<=1,(Kt&62914560)===0&&(Kt=4194304),e}function we(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function Fn(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function li(e,n,a,o,u,d){var S=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var D=e.entanglements,j=e.expirationTimes,ut=e.hiddenUpdates;for(a=S&~a;0<a;){var St=31-Ft(a),At=1<<St;D[St]=0,j[St]=-1;var pt=ut[St];if(pt!==null)for(ut[St]=null,St=0;St<pt.length;St++){var _t=pt[St];_t!==null&&(_t.lane&=-536870913)}a&=~At}o!==0&&ts(e,o,0),d!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=d&~(S&~n))}function ts(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-Ft(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function Ma(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var o=31-Ft(a),u=1<<o;u&n|e[o]&n&&(e[o]|=n),a&=~u}}function pr(e,n){var a=n&-n;return a=(a&42)!==0?1:Ge(a),(a&(e.suspendedLanes|n))!==0?0:a}function Ge(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ba(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function fn(){var e=G.p;return e!==0?e:(e=window.event,e===void 0?32:p0(e.type))}function Ea(e,n){var a=G.p;try{return G.p=e,n()}finally{G.p=a}}var Xn=Math.random().toString(36).slice(2),$e="__reactFiber$"+Xn,Fe="__reactProps$"+Xn,xn="__reactContainer$"+Xn,Yn="__reactEvents$"+Xn,dn="__reactListeners$"+Xn,mr="__reactHandles$"+Xn,qe="__reactResources$"+Xn,En="__reactMarker$"+Xn;function es(e){delete e[$e],delete e[Fe],delete e[Yn],delete e[dn],delete e[mr]}function xi(e){var n=e[$e];if(n)return n;for(var a=e.parentNode;a;){if(n=a[xn]||a[$e]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=J_(e);e!==null;){if(a=e[$e])return a;e=J_(e)}return n}e=a,a=e.parentNode}return null}function Yi(e){if(e=e[$e]||e[xn]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function Ta(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function C(e){var n=e[qe];return n||(n=e[qe]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function X(e){e[En]=!0}var gt=new Set,ft={};function rt(e,n){Vt(e,n),Vt(e+"Capture",n)}function Vt(e,n){for(ft[e]=n,e=0;e<n.length;e++)gt.add(n[e])}var Jt=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ht={},$t={};function Yt(e){return Ae.call($t,e)?!0:Ae.call(Ht,e)?!1:Jt.test(e)?$t[e]=!0:(Ht[e]=!0,!1)}function pe(e,n,a){if(Yt(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function xe(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function ee(e,n,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+o)}}function Me(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function tn(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function en(e,n,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,d=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(S){a=""+S,d.call(this,S)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(S){a=""+S},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Be(e){if(!e._valueTracker){var n=tn(e)?"checked":"value";e._valueTracker=en(e,n,""+e[n])}}function hn(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return e&&(o=tn(e)?e.checked?"true":"false":e.value),e=o,e!==a?(n.setValue(e),!0):!1}function ne(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var yn=/[\n"\\]/g;function me(e){return e.replace(yn,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function On(e,n,a,o,u,d,S,D){e.name="",S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"?e.type=S:e.removeAttribute("type"),n!=null?S==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Me(n)):e.value!==""+Me(n)&&(e.value=""+Me(n)):S!=="submit"&&S!=="reset"||e.removeAttribute("value"),n!=null?yi(e,S,Me(n)):a!=null?yi(e,S,Me(a)):o!=null&&e.removeAttribute("value"),u==null&&d!=null&&(e.defaultChecked=!!d),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),D!=null&&typeof D!="function"&&typeof D!="symbol"&&typeof D!="boolean"?e.name=""+Me(D):e.removeAttribute("name")}function Wn(e,n,a,o,u,d,S,D){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),n!=null||a!=null){if(!(d!=="submit"&&d!=="reset"||n!=null)){Be(e);return}a=a!=null?""+Me(a):"",n=n!=null?""+Me(n):a,D||n===e.value||(e.value=n),e.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=D?e.checked:!!o,e.defaultChecked=!!o,S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"&&(e.name=S),Be(e)}function yi(e,n,a){n==="number"&&ne(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function qn(e,n,a,o){if(e=e.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=n.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+Me(a),n=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function je(e,n,a){if(n!=null&&(n=""+Me(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+Me(a):""}function mn(e,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(et(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=Me(n),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),Be(e)}function Bn(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var gn=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Si(e,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,a):typeof a!="number"||a===0||gn.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function Wi(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&Si(e,u,o)}else for(var d in n)n.hasOwnProperty(d)&&Si(e,d,n[d])}function ns(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Bu=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Hu=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Fs(e){return Hu.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function qi(){}var gr=null;function _r(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Aa=null,is=null;function Co(e){var n=Yi(e);if(n&&(e=n.stateNode)){var a=e[Fe]||null;t:switch(e=n.stateNode,n.type){case"input":if(On(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+me(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==e&&o.form===e.form){var u=o[Fe]||null;if(!u)throw Error(s(90));On(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===e.form&&hn(o)}break t;case"textarea":je(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&qn(e,!!a.multiple,n,!1)}}}var Ro=!1;function Ll(e,n,a){if(Ro)return e(n,a);Ro=!0;try{var o=e(n);return o}finally{if(Ro=!1,(Aa!==null||is!==null)&&(mc(),Aa&&(n=Aa,e=is,is=Aa=null,Co(n),e)))for(n=0;n<e.length;n++)Co(e[n])}}function ra(e,n){var a=e.stateNode;if(a===null)return null;var o=a[Fe]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var Zi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),wo=!1;if(Zi)try{var as={};Object.defineProperty(as,"passive",{get:function(){wo=!0}}),window.addEventListener("test",as,as),window.removeEventListener("test",as,as)}catch{wo=!1}var Ni=null,ss=null,ci=null;function Ul(){if(ci)return ci;var e,n=ss,a=n.length,o,u="value"in Ni?Ni.value:Ni.textContent,d=u.length;for(e=0;e<a&&n[e]===u[e];e++);var S=a-e;for(o=1;o<=S&&n[a-o]===u[d-o];o++);return ci=u.slice(e,1<o?1-o:void 0)}function vr(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function xr(){return!0}function w(){return!1}function tt(e){function n(a,o,u,d,S){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=d,this.target=S,this.currentTarget=null;for(var D in e)e.hasOwnProperty(D)&&(a=e[D],this[D]=a?a(d):d[D]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?xr:w,this.isPropagationStopped=w,this}return v(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=xr)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=xr)},persist:function(){},isPersistent:xr}),n}var Ct={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bt=tt(Ct),ve=v({},Ct,{view:0,detail:0}),Ze=tt(ve),Ue,Ki,Pn,ui=v({},ve,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Vu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Pn&&(Pn&&e.type==="mousemove"?(Ue=e.screenX-Pn.screenX,Ki=e.screenY-Pn.screenY):Ki=Ue=0,Pn=e),Ue)},movementY:function(e){return"movementY"in e?e.movementY:Ki}}),Wp=tt(ui),$x=v({},ui,{dataTransfer:0}),ty=tt($x),ey=v({},ve,{relatedTarget:0}),Gu=tt(ey),ny=v({},Ct,{animationName:0,elapsedTime:0,pseudoElement:0}),iy=tt(ny),ay=v({},Ct,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),sy=tt(ay),ry=v({},Ct,{data:0}),qp=tt(ry),oy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ly={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},cy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function uy(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=cy[e])?!!n[e]:!1}function Vu(){return uy}var fy=v({},ve,{key:function(e){if(e.key){var n=oy[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=vr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ly[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Vu,charCode:function(e){return e.type==="keypress"?vr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?vr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),dy=tt(fy),hy=v({},ui,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Zp=tt(hy),py=v({},ve,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Vu}),my=tt(py),gy=v({},Ct,{propertyName:0,elapsedTime:0,pseudoElement:0}),_y=tt(gy),vy=v({},ui,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),xy=tt(vy),yy=v({},Ct,{newState:0,oldState:0}),Sy=tt(yy),My=[9,13,27,32],ku=Zi&&"CompositionEvent"in window,Do=null;Zi&&"documentMode"in document&&(Do=document.documentMode);var by=Zi&&"TextEvent"in window&&!Do,Kp=Zi&&(!ku||Do&&8<Do&&11>=Do),Qp=" ",Jp=!1;function $p(e,n){switch(e){case"keyup":return My.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function tm(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var yr=!1;function Ey(e,n){switch(e){case"compositionend":return tm(n);case"keypress":return n.which!==32?null:(Jp=!0,Qp);case"textInput":return e=n.data,e===Qp&&Jp?null:e;default:return null}}function Ty(e,n){if(yr)return e==="compositionend"||!ku&&$p(e,n)?(e=Ul(),ci=ss=Ni=null,yr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Kp&&n.locale!=="ko"?null:n.data;default:return null}}var Ay={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function em(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Ay[e.type]:n==="textarea"}function nm(e,n,a,o){Aa?is?is.push(o):is=[o]:Aa=o,n=Mc(n,"onChange"),0<n.length&&(a=new Bt("onChange","change",null,a,o),e.push({event:a,listeners:n}))}var No=null,Lo=null;function Cy(e){F_(e,0)}function Ol(e){var n=Ta(e);if(hn(n))return e}function im(e,n){if(e==="change")return n}var am=!1;if(Zi){var ju;if(Zi){var Xu="oninput"in document;if(!Xu){var sm=document.createElement("div");sm.setAttribute("oninput","return;"),Xu=typeof sm.oninput=="function"}ju=Xu}else ju=!1;am=ju&&(!document.documentMode||9<document.documentMode)}function rm(){No&&(No.detachEvent("onpropertychange",om),Lo=No=null)}function om(e){if(e.propertyName==="value"&&Ol(Lo)){var n=[];nm(n,Lo,e,_r(e)),Ll(Cy,n)}}function Ry(e,n,a){e==="focusin"?(rm(),No=n,Lo=a,No.attachEvent("onpropertychange",om)):e==="focusout"&&rm()}function wy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ol(Lo)}function Dy(e,n){if(e==="click")return Ol(n)}function Ny(e,n){if(e==="input"||e==="change")return Ol(n)}function Ly(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Mi=typeof Object.is=="function"?Object.is:Ly;function Uo(e,n){if(Mi(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!Ae.call(n,u)||!Mi(e[u],n[u]))return!1}return!0}function lm(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function cm(e,n){var a=lm(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=n&&o>=n)return{node:a,offset:n-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=lm(a)}}function um(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?um(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function fm(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=ne(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=ne(e.document)}return n}function Yu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var Uy=Zi&&"documentMode"in document&&11>=document.documentMode,Sr=null,Wu=null,Oo=null,qu=!1;function dm(e,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;qu||Sr==null||Sr!==ne(o)||(o=Sr,"selectionStart"in o&&Yu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Oo&&Uo(Oo,o)||(Oo=o,o=Mc(Wu,"onSelect"),0<o.length&&(n=new Bt("onSelect","select",null,n,a),e.push({event:n,listeners:o}),n.target=Sr)))}function Bs(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var Mr={animationend:Bs("Animation","AnimationEnd"),animationiteration:Bs("Animation","AnimationIteration"),animationstart:Bs("Animation","AnimationStart"),transitionrun:Bs("Transition","TransitionRun"),transitionstart:Bs("Transition","TransitionStart"),transitioncancel:Bs("Transition","TransitionCancel"),transitionend:Bs("Transition","TransitionEnd")},Zu={},hm={};Zi&&(hm=document.createElement("div").style,"AnimationEvent"in window||(delete Mr.animationend.animation,delete Mr.animationiteration.animation,delete Mr.animationstart.animation),"TransitionEvent"in window||delete Mr.transitionend.transition);function Hs(e){if(Zu[e])return Zu[e];if(!Mr[e])return e;var n=Mr[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in hm)return Zu[e]=n[a];return e}var pm=Hs("animationend"),mm=Hs("animationiteration"),gm=Hs("animationstart"),Oy=Hs("transitionrun"),Py=Hs("transitionstart"),Iy=Hs("transitioncancel"),_m=Hs("transitionend"),vm=new Map,Ku="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Ku.push("scrollEnd");function Qi(e,n){vm.set(e,n),rt(n,[e])}var Pl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Li=[],br=0,Qu=0;function Il(){for(var e=br,n=Qu=br=0;n<e;){var a=Li[n];Li[n++]=null;var o=Li[n];Li[n++]=null;var u=Li[n];Li[n++]=null;var d=Li[n];if(Li[n++]=null,o!==null&&u!==null){var S=o.pending;S===null?u.next=u:(u.next=S.next,S.next=u),o.pending=u}d!==0&&xm(a,u,d)}}function zl(e,n,a,o){Li[br++]=e,Li[br++]=n,Li[br++]=a,Li[br++]=o,Qu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Ju(e,n,a,o){return zl(e,n,a,o),Fl(e)}function Gs(e,n){return zl(e,null,null,n),Fl(e)}function xm(e,n,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,d=e.return;d!==null;)d.childLanes|=a,o=d.alternate,o!==null&&(o.childLanes|=a),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(u=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,u&&n!==null&&(u=31-Ft(a),e=d.hiddenUpdates,o=e[u],o===null?e[u]=[n]:o.push(n),n.lane=a|536870912),d):null}function Fl(e){if(50<nl)throw nl=0,ld=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Er={};function zy(e,n,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function bi(e,n,a,o){return new zy(e,n,a,o)}function $u(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ca(e,n){var a=e.alternate;return a===null?(a=bi(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function ym(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Bl(e,n,a,o,u,d){var S=0;if(o=e,typeof e=="function")$u(e)&&(S=1);else if(typeof e=="string")S=VS(e,a,Dt.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case O:return e=bi(31,a,n,u),e.elementType=O,e.lanes=d,e;case R:return Vs(a.children,u,d,n);case x:S=8,u|=24;break;case b:return e=bi(12,a,n,u|2),e.elementType=b,e.lanes=d,e;case H:return e=bi(13,a,n,u),e.elementType=H,e.lanes=d,e;case z:return e=bi(19,a,n,u),e.elementType=z,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case F:S=10;break t;case L:S=9;break t;case N:S=11;break t;case I:S=14;break t;case T:S=16,o=null;break t}S=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return n=bi(S,a,n,u),n.elementType=e,n.type=o,n.lanes=d,n}function Vs(e,n,a,o){return e=bi(7,e,o,n),e.lanes=a,e}function tf(e,n,a){return e=bi(6,e,null,n),e.lanes=a,e}function Sm(e){var n=bi(18,null,null,0);return n.stateNode=e,n}function ef(e,n,a){return n=bi(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Mm=new WeakMap;function Ui(e,n){if(typeof e=="object"&&e!==null){var a=Mm.get(e);return a!==void 0?a:(n={value:e,source:n,stack:k(n)},Mm.set(e,n),n)}return{value:e,source:n,stack:k(n)}}var Tr=[],Ar=0,Hl=null,Po=0,Oi=[],Pi=0,rs=null,oa=1,la="";function Ra(e,n){Tr[Ar++]=Po,Tr[Ar++]=Hl,Hl=e,Po=n}function bm(e,n,a){Oi[Pi++]=oa,Oi[Pi++]=la,Oi[Pi++]=rs,rs=e;var o=oa;e=la;var u=32-Ft(o)-1;o&=~(1<<u),a+=1;var d=32-Ft(n)+u;if(30<d){var S=u-u%5;d=(o&(1<<S)-1).toString(32),o>>=S,u-=S,oa=1<<32-Ft(n)+u|a<<u|o,la=d+e}else oa=1<<d|a<<u|o,la=e}function nf(e){e.return!==null&&(Ra(e,1),bm(e,1,0))}function af(e){for(;e===Hl;)Hl=Tr[--Ar],Tr[Ar]=null,Po=Tr[--Ar],Tr[Ar]=null;for(;e===rs;)rs=Oi[--Pi],Oi[Pi]=null,la=Oi[--Pi],Oi[Pi]=null,oa=Oi[--Pi],Oi[Pi]=null}function Em(e,n){Oi[Pi++]=oa,Oi[Pi++]=la,Oi[Pi++]=rs,oa=n.id,la=n.overflow,rs=e}var Hn=null,ln=null,Ie=!1,os=null,Ii=!1,sf=Error(s(519));function ls(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Io(Ui(n,e)),sf}function Tm(e){var n=e.stateNode,a=e.type,o=e.memoizedProps;switch(n[$e]=e,n[Fe]=o,a){case"dialog":Le("cancel",n),Le("close",n);break;case"iframe":case"object":case"embed":Le("load",n);break;case"video":case"audio":for(a=0;a<al.length;a++)Le(al[a],n);break;case"source":Le("error",n);break;case"img":case"image":case"link":Le("error",n),Le("load",n);break;case"details":Le("toggle",n);break;case"input":Le("invalid",n),Wn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":Le("invalid",n);break;case"textarea":Le("invalid",n),mn(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||V_(n.textContent,a)?(o.popover!=null&&(Le("beforetoggle",n),Le("toggle",n)),o.onScroll!=null&&Le("scroll",n),o.onScrollEnd!=null&&Le("scrollend",n),o.onClick!=null&&(n.onclick=qi),n=!0):n=!1,n||ls(e,!0)}function Am(e){for(Hn=e.return;Hn;)switch(Hn.tag){case 5:case 31:case 13:Ii=!1;return;case 27:case 3:Ii=!0;return;default:Hn=Hn.return}}function Cr(e){if(e!==Hn)return!1;if(!Ie)return Am(e),Ie=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||bd(e.type,e.memoizedProps)),a=!a),a&&ln&&ls(e),Am(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));ln=Q_(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));ln=Q_(e)}else n===27?(n=ln,Ms(e.type)?(e=Rd,Rd=null,ln=e):ln=n):ln=Hn?Fi(e.stateNode.nextSibling):null;return!0}function ks(){ln=Hn=null,Ie=!1}function rf(){var e=os;return e!==null&&(pi===null?pi=e:pi.push.apply(pi,e),os=null),e}function Io(e){os===null?os=[e]:os.push(e)}var of=B(null),js=null,wa=null;function cs(e,n,a){dt(of,n._currentValue),n._currentValue=a}function Da(e){e._currentValue=of.current,W(of)}function lf(e,n,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===a)break;e=e.return}}function cf(e,n,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var d=u.dependencies;if(d!==null){var S=u.child;d=d.firstContext;t:for(;d!==null;){var D=d;d=u;for(var j=0;j<n.length;j++)if(D.context===n[j]){d.lanes|=a,D=d.alternate,D!==null&&(D.lanes|=a),lf(d.return,a,e),o||(S=null);break t}d=D.next}}else if(u.tag===18){if(S=u.return,S===null)throw Error(s(341));S.lanes|=a,d=S.alternate,d!==null&&(d.lanes|=a),lf(S,a,e),S=null}else S=u.child;if(S!==null)S.return=u;else for(S=u;S!==null;){if(S===e){S=null;break}if(u=S.sibling,u!==null){u.return=S.return,S=u;break}S=S.return}u=S}}function Rr(e,n,a,o){e=null;for(var u=n,d=!1;u!==null;){if(!d){if((u.flags&524288)!==0)d=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var S=u.alternate;if(S===null)throw Error(s(387));if(S=S.memoizedProps,S!==null){var D=u.type;Mi(u.pendingProps.value,S.value)||(e!==null?e.push(D):e=[D])}}else if(u===Et.current){if(S=u.alternate,S===null)throw Error(s(387));S.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(cl):e=[cl])}u=u.return}e!==null&&cf(n,e,a,o),n.flags|=262144}function Gl(e){for(e=e.firstContext;e!==null;){if(!Mi(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Xs(e){js=e,wa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Gn(e){return Cm(js,e)}function Vl(e,n){return js===null&&Xs(e),Cm(e,n)}function Cm(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},wa===null){if(e===null)throw Error(s(308));wa=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else wa=wa.next=n;return a}var Fy=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},By=r.unstable_scheduleCallback,Hy=r.unstable_NormalPriority,Tn={$$typeof:F,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function uf(){return{controller:new Fy,data:new Map,refCount:0}}function zo(e){e.refCount--,e.refCount===0&&By(Hy,function(){e.controller.abort()})}var Fo=null,ff=0,wr=0,Dr=null;function Gy(e,n){if(Fo===null){var a=Fo=[];ff=0,wr=pd(),Dr={status:"pending",value:void 0,then:function(o){a.push(o)}}}return ff++,n.then(Rm,Rm),n}function Rm(){if(--ff===0&&Fo!==null){Dr!==null&&(Dr.status="fulfilled");var e=Fo;Fo=null,wr=0,Dr=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function Vy(e,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var wm=P.S;P.S=function(e,n){d_=A(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Gy(e,n),wm!==null&&wm(e,n)};var Ys=B(null);function df(){var e=Ys.current;return e!==null?e:on.pooledCache}function kl(e,n){n===null?dt(Ys,Ys.current):dt(Ys,n.pool)}function Dm(){var e=df();return e===null?null:{parent:Tn._currentValue,pool:e}}var Nr=Error(s(460)),hf=Error(s(474)),jl=Error(s(542)),Xl={then:function(){}};function Nm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Lm(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(qi,qi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Om(e),e;default:if(typeof n.status=="string")n.then(qi,qi);else{if(e=on,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Om(e),e}throw qs=n,Nr}}function Ws(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(qs=a,Nr):a}}var qs=null;function Um(){if(qs===null)throw Error(s(459));var e=qs;return qs=null,e}function Om(e){if(e===Nr||e===jl)throw Error(s(483))}var Lr=null,Bo=0;function Yl(e){var n=Bo;return Bo+=1,Lr===null&&(Lr=[]),Lm(Lr,e,n)}function Ho(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Wl(e,n){throw n.$$typeof===g?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Pm(e){function n($,K){if(e){var ct=$.deletions;ct===null?($.deletions=[K],$.flags|=16):ct.push(K)}}function a($,K){if(!e)return null;for(;K!==null;)n($,K),K=K.sibling;return null}function o($){for(var K=new Map;$!==null;)$.key!==null?K.set($.key,$):K.set($.index,$),$=$.sibling;return K}function u($,K){return $=Ca($,K),$.index=0,$.sibling=null,$}function d($,K,ct){return $.index=ct,e?(ct=$.alternate,ct!==null?(ct=ct.index,ct<K?($.flags|=67108866,K):ct):($.flags|=67108866,K)):($.flags|=1048576,K)}function S($){return e&&$.alternate===null&&($.flags|=67108866),$}function D($,K,ct,bt){return K===null||K.tag!==6?(K=tf(ct,$.mode,bt),K.return=$,K):(K=u(K,ct),K.return=$,K)}function j($,K,ct,bt){var ue=ct.type;return ue===R?St($,K,ct.props.children,bt,ct.key):K!==null&&(K.elementType===ue||typeof ue=="object"&&ue!==null&&ue.$$typeof===T&&Ws(ue)===K.type)?(K=u(K,ct.props),Ho(K,ct),K.return=$,K):(K=Bl(ct.type,ct.key,ct.props,null,$.mode,bt),Ho(K,ct),K.return=$,K)}function ut($,K,ct,bt){return K===null||K.tag!==4||K.stateNode.containerInfo!==ct.containerInfo||K.stateNode.implementation!==ct.implementation?(K=ef(ct,$.mode,bt),K.return=$,K):(K=u(K,ct.children||[]),K.return=$,K)}function St($,K,ct,bt,ue){return K===null||K.tag!==7?(K=Vs(ct,$.mode,bt,ue),K.return=$,K):(K=u(K,ct),K.return=$,K)}function At($,K,ct){if(typeof K=="string"&&K!==""||typeof K=="number"||typeof K=="bigint")return K=tf(""+K,$.mode,ct),K.return=$,K;if(typeof K=="object"&&K!==null){switch(K.$$typeof){case M:return ct=Bl(K.type,K.key,K.props,null,$.mode,ct),Ho(ct,K),ct.return=$,ct;case E:return K=ef(K,$.mode,ct),K.return=$,K;case T:return K=Ws(K),At($,K,ct)}if(et(K)||J(K))return K=Vs(K,$.mode,ct,null),K.return=$,K;if(typeof K.then=="function")return At($,Yl(K),ct);if(K.$$typeof===F)return At($,Vl($,K),ct);Wl($,K)}return null}function pt($,K,ct,bt){var ue=K!==null?K.key:null;if(typeof ct=="string"&&ct!==""||typeof ct=="number"||typeof ct=="bigint")return ue!==null?null:D($,K,""+ct,bt);if(typeof ct=="object"&&ct!==null){switch(ct.$$typeof){case M:return ct.key===ue?j($,K,ct,bt):null;case E:return ct.key===ue?ut($,K,ct,bt):null;case T:return ct=Ws(ct),pt($,K,ct,bt)}if(et(ct)||J(ct))return ue!==null?null:St($,K,ct,bt,null);if(typeof ct.then=="function")return pt($,K,Yl(ct),bt);if(ct.$$typeof===F)return pt($,K,Vl($,ct),bt);Wl($,ct)}return null}function _t($,K,ct,bt,ue){if(typeof bt=="string"&&bt!==""||typeof bt=="number"||typeof bt=="bigint")return $=$.get(ct)||null,D(K,$,""+bt,ue);if(typeof bt=="object"&&bt!==null){switch(bt.$$typeof){case M:return $=$.get(bt.key===null?ct:bt.key)||null,j(K,$,bt,ue);case E:return $=$.get(bt.key===null?ct:bt.key)||null,ut(K,$,bt,ue);case T:return bt=Ws(bt),_t($,K,ct,bt,ue)}if(et(bt)||J(bt))return $=$.get(ct)||null,St(K,$,bt,ue,null);if(typeof bt.then=="function")return _t($,K,ct,Yl(bt),ue);if(bt.$$typeof===F)return _t($,K,ct,Vl(K,bt),ue);Wl(K,bt)}return null}function se($,K,ct,bt){for(var ue=null,Xe=null,ce=K,Ee=K=0,Pe=null;ce!==null&&Ee<ct.length;Ee++){ce.index>Ee?(Pe=ce,ce=null):Pe=ce.sibling;var Ye=pt($,ce,ct[Ee],bt);if(Ye===null){ce===null&&(ce=Pe);break}e&&ce&&Ye.alternate===null&&n($,ce),K=d(Ye,K,Ee),Xe===null?ue=Ye:Xe.sibling=Ye,Xe=Ye,ce=Pe}if(Ee===ct.length)return a($,ce),Ie&&Ra($,Ee),ue;if(ce===null){for(;Ee<ct.length;Ee++)ce=At($,ct[Ee],bt),ce!==null&&(K=d(ce,K,Ee),Xe===null?ue=ce:Xe.sibling=ce,Xe=ce);return Ie&&Ra($,Ee),ue}for(ce=o(ce);Ee<ct.length;Ee++)Pe=_t(ce,$,Ee,ct[Ee],bt),Pe!==null&&(e&&Pe.alternate!==null&&ce.delete(Pe.key===null?Ee:Pe.key),K=d(Pe,K,Ee),Xe===null?ue=Pe:Xe.sibling=Pe,Xe=Pe);return e&&ce.forEach(function(Cs){return n($,Cs)}),Ie&&Ra($,Ee),ue}function de($,K,ct,bt){if(ct==null)throw Error(s(151));for(var ue=null,Xe=null,ce=K,Ee=K=0,Pe=null,Ye=ct.next();ce!==null&&!Ye.done;Ee++,Ye=ct.next()){ce.index>Ee?(Pe=ce,ce=null):Pe=ce.sibling;var Cs=pt($,ce,Ye.value,bt);if(Cs===null){ce===null&&(ce=Pe);break}e&&ce&&Cs.alternate===null&&n($,ce),K=d(Cs,K,Ee),Xe===null?ue=Cs:Xe.sibling=Cs,Xe=Cs,ce=Pe}if(Ye.done)return a($,ce),Ie&&Ra($,Ee),ue;if(ce===null){for(;!Ye.done;Ee++,Ye=ct.next())Ye=At($,Ye.value,bt),Ye!==null&&(K=d(Ye,K,Ee),Xe===null?ue=Ye:Xe.sibling=Ye,Xe=Ye);return Ie&&Ra($,Ee),ue}for(ce=o(ce);!Ye.done;Ee++,Ye=ct.next())Ye=_t(ce,$,Ee,Ye.value,bt),Ye!==null&&(e&&Ye.alternate!==null&&ce.delete(Ye.key===null?Ee:Ye.key),K=d(Ye,K,Ee),Xe===null?ue=Ye:Xe.sibling=Ye,Xe=Ye);return e&&ce.forEach(function($S){return n($,$S)}),Ie&&Ra($,Ee),ue}function sn($,K,ct,bt){if(typeof ct=="object"&&ct!==null&&ct.type===R&&ct.key===null&&(ct=ct.props.children),typeof ct=="object"&&ct!==null){switch(ct.$$typeof){case M:t:{for(var ue=ct.key;K!==null;){if(K.key===ue){if(ue=ct.type,ue===R){if(K.tag===7){a($,K.sibling),bt=u(K,ct.props.children),bt.return=$,$=bt;break t}}else if(K.elementType===ue||typeof ue=="object"&&ue!==null&&ue.$$typeof===T&&Ws(ue)===K.type){a($,K.sibling),bt=u(K,ct.props),Ho(bt,ct),bt.return=$,$=bt;break t}a($,K);break}else n($,K);K=K.sibling}ct.type===R?(bt=Vs(ct.props.children,$.mode,bt,ct.key),bt.return=$,$=bt):(bt=Bl(ct.type,ct.key,ct.props,null,$.mode,bt),Ho(bt,ct),bt.return=$,$=bt)}return S($);case E:t:{for(ue=ct.key;K!==null;){if(K.key===ue)if(K.tag===4&&K.stateNode.containerInfo===ct.containerInfo&&K.stateNode.implementation===ct.implementation){a($,K.sibling),bt=u(K,ct.children||[]),bt.return=$,$=bt;break t}else{a($,K);break}else n($,K);K=K.sibling}bt=ef(ct,$.mode,bt),bt.return=$,$=bt}return S($);case T:return ct=Ws(ct),sn($,K,ct,bt)}if(et(ct))return se($,K,ct,bt);if(J(ct)){if(ue=J(ct),typeof ue!="function")throw Error(s(150));return ct=ue.call(ct),de($,K,ct,bt)}if(typeof ct.then=="function")return sn($,K,Yl(ct),bt);if(ct.$$typeof===F)return sn($,K,Vl($,ct),bt);Wl($,ct)}return typeof ct=="string"&&ct!==""||typeof ct=="number"||typeof ct=="bigint"?(ct=""+ct,K!==null&&K.tag===6?(a($,K.sibling),bt=u(K,ct),bt.return=$,$=bt):(a($,K),bt=tf(ct,$.mode,bt),bt.return=$,$=bt),S($)):a($,K)}return function($,K,ct,bt){try{Bo=0;var ue=sn($,K,ct,bt);return Lr=null,ue}catch(ce){if(ce===Nr||ce===jl)throw ce;var Xe=bi(29,ce,null,$.mode);return Xe.lanes=bt,Xe.return=$,Xe}}}var Zs=Pm(!0),Im=Pm(!1),us=!1;function pf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function mf(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function fs(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ds(e,n,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(We&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=Fl(e),xm(e,null,a),n}return zl(e,o,n,a),Fl(e)}function Go(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Ma(e,a)}}function gf(e,n){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,d=null;if(a=a.firstBaseUpdate,a!==null){do{var S={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};d===null?u=d=S:d=d.next=S,a=a.next}while(a!==null);d===null?u=d=n:d=d.next=n}else u=d=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:d,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var _f=!1;function Vo(){if(_f){var e=Dr;if(e!==null)throw e}}function ko(e,n,a,o){_f=!1;var u=e.updateQueue;us=!1;var d=u.firstBaseUpdate,S=u.lastBaseUpdate,D=u.shared.pending;if(D!==null){u.shared.pending=null;var j=D,ut=j.next;j.next=null,S===null?d=ut:S.next=ut,S=j;var St=e.alternate;St!==null&&(St=St.updateQueue,D=St.lastBaseUpdate,D!==S&&(D===null?St.firstBaseUpdate=ut:D.next=ut,St.lastBaseUpdate=j))}if(d!==null){var At=u.baseState;S=0,St=ut=j=null,D=d;do{var pt=D.lane&-536870913,_t=pt!==D.lane;if(_t?(Oe&pt)===pt:(o&pt)===pt){pt!==0&&pt===wr&&(_f=!0),St!==null&&(St=St.next={lane:0,tag:D.tag,payload:D.payload,callback:null,next:null});t:{var se=e,de=D;pt=n;var sn=a;switch(de.tag){case 1:if(se=de.payload,typeof se=="function"){At=se.call(sn,At,pt);break t}At=se;break t;case 3:se.flags=se.flags&-65537|128;case 0:if(se=de.payload,pt=typeof se=="function"?se.call(sn,At,pt):se,pt==null)break t;At=v({},At,pt);break t;case 2:us=!0}}pt=D.callback,pt!==null&&(e.flags|=64,_t&&(e.flags|=8192),_t=u.callbacks,_t===null?u.callbacks=[pt]:_t.push(pt))}else _t={lane:pt,tag:D.tag,payload:D.payload,callback:D.callback,next:null},St===null?(ut=St=_t,j=At):St=St.next=_t,S|=pt;if(D=D.next,D===null){if(D=u.shared.pending,D===null)break;_t=D,D=_t.next,_t.next=null,u.lastBaseUpdate=_t,u.shared.pending=null}}while(!0);St===null&&(j=At),u.baseState=j,u.firstBaseUpdate=ut,u.lastBaseUpdate=St,d===null&&(u.shared.lanes=0),_s|=S,e.lanes=S,e.memoizedState=At}}function zm(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function Fm(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)zm(a[e],n)}var Ur=B(null),ql=B(0);function Bm(e,n){e=Ba,dt(ql,e),dt(Ur,n),Ba=e|n.baseLanes}function vf(){dt(ql,Ba),dt(Ur,Ur.current)}function xf(){Ba=ql.current,W(Ur),W(ql)}var Ei=B(null),zi=null;function hs(e){var n=e.alternate;dt(Sn,Sn.current&1),dt(Ei,e),zi===null&&(n===null||Ur.current!==null||n.memoizedState!==null)&&(zi=e)}function yf(e){dt(Sn,Sn.current),dt(Ei,e),zi===null&&(zi=e)}function Hm(e){e.tag===22?(dt(Sn,Sn.current),dt(Ei,e),zi===null&&(zi=e)):ps()}function ps(){dt(Sn,Sn.current),dt(Ei,Ei.current)}function Ti(e){W(Ei),zi===e&&(zi=null),W(Sn)}var Sn=B(0);function Zl(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Ad(a)||Cd(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Na=0,be=null,nn=null,An=null,Kl=!1,Or=!1,Ks=!1,Ql=0,jo=0,Pr=null,ky=0;function _n(){throw Error(s(321))}function Sf(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!Mi(e[a],n[a]))return!1;return!0}function Mf(e,n,a,o,u,d){return Na=d,be=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,P.H=e===null||e.memoizedState===null?bg:zf,Ks=!1,d=a(o,u),Ks=!1,Or&&(d=Vm(n,a,o,u)),Gm(e),d}function Gm(e){P.H=Wo;var n=nn!==null&&nn.next!==null;if(Na=0,An=nn=be=null,Kl=!1,jo=0,Pr=null,n)throw Error(s(300));e===null||Cn||(e=e.dependencies,e!==null&&Gl(e)&&(Cn=!0))}function Vm(e,n,a,o){be=e;var u=0;do{if(Or&&(Pr=null),jo=0,Or=!1,25<=u)throw Error(s(301));if(u+=1,An=nn=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}P.H=Eg,d=n(a,o)}while(Or);return d}function jy(){var e=P.H,n=e.useState()[0];return n=typeof n.then=="function"?Xo(n):n,e=e.useState()[0],(nn!==null?nn.memoizedState:null)!==e&&(be.flags|=1024),n}function bf(){var e=Ql!==0;return Ql=0,e}function Ef(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function Tf(e){if(Kl){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Kl=!1}Na=0,An=nn=be=null,Or=!1,jo=Ql=0,Pr=null}function ni(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return An===null?be.memoizedState=An=e:An=An.next=e,An}function Mn(){if(nn===null){var e=be.alternate;e=e!==null?e.memoizedState:null}else e=nn.next;var n=An===null?be.memoizedState:An.next;if(n!==null)An=n,nn=e;else{if(e===null)throw be.alternate===null?Error(s(467)):Error(s(310));nn=e,e={memoizedState:nn.memoizedState,baseState:nn.baseState,baseQueue:nn.baseQueue,queue:nn.queue,next:null},An===null?be.memoizedState=An=e:An=An.next=e}return An}function Jl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Xo(e){var n=jo;return jo+=1,Pr===null&&(Pr=[]),e=Lm(Pr,e,n),n=be,(An===null?n.memoizedState:An.next)===null&&(n=n.alternate,P.H=n===null||n.memoizedState===null?bg:zf),e}function $l(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Xo(e);if(e.$$typeof===F)return Gn(e)}throw Error(s(438,String(e)))}function Af(e){var n=null,a=be.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=be.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Jl(),be.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),o=0;o<e;o++)a[o]=mt;return n.index++,a}function La(e,n){return typeof n=="function"?n(e):n}function tc(e){var n=Mn();return Cf(n,nn,e)}function Cf(e,n,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=e.baseQueue,d=o.pending;if(d!==null){if(u!==null){var S=u.next;u.next=d.next,d.next=S}n.baseQueue=u=d,o.pending=null}if(d=e.baseState,u===null)e.memoizedState=d;else{n=u.next;var D=S=null,j=null,ut=n,St=!1;do{var At=ut.lane&-536870913;if(At!==ut.lane?(Oe&At)===At:(Na&At)===At){var pt=ut.revertLane;if(pt===0)j!==null&&(j=j.next={lane:0,revertLane:0,gesture:null,action:ut.action,hasEagerState:ut.hasEagerState,eagerState:ut.eagerState,next:null}),At===wr&&(St=!0);else if((Na&pt)===pt){ut=ut.next,pt===wr&&(St=!0);continue}else At={lane:0,revertLane:ut.revertLane,gesture:null,action:ut.action,hasEagerState:ut.hasEagerState,eagerState:ut.eagerState,next:null},j===null?(D=j=At,S=d):j=j.next=At,be.lanes|=pt,_s|=pt;At=ut.action,Ks&&a(d,At),d=ut.hasEagerState?ut.eagerState:a(d,At)}else pt={lane:At,revertLane:ut.revertLane,gesture:ut.gesture,action:ut.action,hasEagerState:ut.hasEagerState,eagerState:ut.eagerState,next:null},j===null?(D=j=pt,S=d):j=j.next=pt,be.lanes|=At,_s|=At;ut=ut.next}while(ut!==null&&ut!==n);if(j===null?S=d:j.next=D,!Mi(d,e.memoizedState)&&(Cn=!0,St&&(a=Dr,a!==null)))throw a;e.memoizedState=d,e.baseState=S,e.baseQueue=j,o.lastRenderedState=d}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Rf(e){var n=Mn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,d=n.memoizedState;if(u!==null){a.pending=null;var S=u=u.next;do d=e(d,S.action),S=S.next;while(S!==u);Mi(d,n.memoizedState)||(Cn=!0),n.memoizedState=d,n.baseQueue===null&&(n.baseState=d),a.lastRenderedState=d}return[d,o]}function km(e,n,a){var o=be,u=Mn(),d=Ie;if(d){if(a===void 0)throw Error(s(407));a=a()}else a=n();var S=!Mi((nn||u).memoizedState,a);if(S&&(u.memoizedState=a,Cn=!0),u=u.queue,Nf(Ym.bind(null,o,u,e),[e]),u.getSnapshot!==n||S||An!==null&&An.memoizedState.tag&1){if(o.flags|=2048,Ir(9,{destroy:void 0},Xm.bind(null,o,u,a,n),null),on===null)throw Error(s(349));d||(Na&127)!==0||jm(o,n,a)}return a}function jm(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=be.updateQueue,n===null?(n=Jl(),be.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function Xm(e,n,a,o){n.value=a,n.getSnapshot=o,Wm(n)&&qm(e)}function Ym(e,n,a){return a(function(){Wm(n)&&qm(e)})}function Wm(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!Mi(e,a)}catch{return!0}}function qm(e){var n=Gs(e,2);n!==null&&mi(n,e,2)}function wf(e){var n=ni();if(typeof e=="function"){var a=e;if(e=a(),Ks){jt(!0);try{a()}finally{jt(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:La,lastRenderedState:e},n}function Zm(e,n,a,o){return e.baseState=a,Cf(e,nn,typeof o=="function"?o:La)}function Xy(e,n,a,o,u){if(ic(e))throw Error(s(485));if(e=n.action,e!==null){var d={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(S){d.listeners.push(S)}};P.T!==null?a(!0):d.isTransition=!1,o(d),a=n.pending,a===null?(d.next=n.pending=d,Km(n,d)):(d.next=a.next,n.pending=a.next=d)}}function Km(e,n){var a=n.action,o=n.payload,u=e.state;if(n.isTransition){var d=P.T,S={};P.T=S;try{var D=a(u,o),j=P.S;j!==null&&j(S,D),Qm(e,n,D)}catch(ut){Df(e,n,ut)}finally{d!==null&&S.types!==null&&(d.types=S.types),P.T=d}}else try{d=a(u,o),Qm(e,n,d)}catch(ut){Df(e,n,ut)}}function Qm(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Jm(e,n,o)},function(o){return Df(e,n,o)}):Jm(e,n,a)}function Jm(e,n,a){n.status="fulfilled",n.value=a,$m(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,Km(e,a)))}function Df(e,n,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,$m(n),n=n.next;while(n!==o)}e.action=null}function $m(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function tg(e,n){return n}function eg(e,n){if(Ie){var a=on.formState;if(a!==null){t:{var o=be;if(Ie){if(ln){e:{for(var u=ln,d=Ii;u.nodeType!==8;){if(!d){u=null;break e}if(u=Fi(u.nextSibling),u===null){u=null;break e}}d=u.data,u=d==="F!"||d==="F"?u:null}if(u){ln=Fi(u.nextSibling),o=u.data==="F!";break t}}ls(o)}o=!1}o&&(n=a[0])}}return a=ni(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:tg,lastRenderedState:n},a.queue=o,a=yg.bind(null,be,o),o.dispatch=a,o=wf(!1),d=If.bind(null,be,!1,o.queue),o=ni(),u={state:n,dispatch:null,action:e,pending:null},o.queue=u,a=Xy.bind(null,be,u,d,a),u.dispatch=a,o.memoizedState=e,[n,a,!1]}function ng(e){var n=Mn();return ig(n,nn,e)}function ig(e,n,a){if(n=Cf(e,n,tg)[0],e=tc(La)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=Xo(n)}catch(S){throw S===Nr?jl:S}else o=n;n=Mn();var u=n.queue,d=u.dispatch;return a!==n.memoizedState&&(be.flags|=2048,Ir(9,{destroy:void 0},Yy.bind(null,u,a),null)),[o,d,e]}function Yy(e,n){e.action=n}function ag(e){var n=Mn(),a=nn;if(a!==null)return ig(n,a,e);Mn(),n=n.memoizedState,a=Mn();var o=a.queue.dispatch;return a.memoizedState=e,[n,o,!1]}function Ir(e,n,a,o){return e={tag:e,create:a,deps:o,inst:n,next:null},n=be.updateQueue,n===null&&(n=Jl(),be.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,n.lastEffect=e),e}function sg(){return Mn().memoizedState}function ec(e,n,a,o){var u=ni();be.flags|=e,u.memoizedState=Ir(1|n,{destroy:void 0},a,o===void 0?null:o)}function nc(e,n,a,o){var u=Mn();o=o===void 0?null:o;var d=u.memoizedState.inst;nn!==null&&o!==null&&Sf(o,nn.memoizedState.deps)?u.memoizedState=Ir(n,d,a,o):(be.flags|=e,u.memoizedState=Ir(1|n,d,a,o))}function rg(e,n){ec(8390656,8,e,n)}function Nf(e,n){nc(2048,8,e,n)}function Wy(e){be.flags|=4;var n=be.updateQueue;if(n===null)n=Jl(),be.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function og(e){var n=Mn().memoizedState;return Wy({ref:n,nextImpl:e}),function(){if((We&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function lg(e,n){return nc(4,2,e,n)}function cg(e,n){return nc(4,4,e,n)}function ug(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function fg(e,n,a){a=a!=null?a.concat([e]):null,nc(4,4,ug.bind(null,n,e),a)}function Lf(){}function dg(e,n){var a=Mn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&Sf(n,o[1])?o[0]:(a.memoizedState=[e,n],e)}function hg(e,n){var a=Mn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&Sf(n,o[1]))return o[0];if(o=e(),Ks){jt(!0);try{e()}finally{jt(!1)}}return a.memoizedState=[o,n],o}function Uf(e,n,a){return a===void 0||(Na&1073741824)!==0&&(Oe&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=p_(),be.lanes|=e,_s|=e,a)}function pg(e,n,a,o){return Mi(a,n)?a:Ur.current!==null?(e=Uf(e,a,o),Mi(e,n)||(Cn=!0),e):(Na&42)===0||(Na&1073741824)!==0&&(Oe&261930)===0?(Cn=!0,e.memoizedState=a):(e=p_(),be.lanes|=e,_s|=e,n)}function mg(e,n,a,o,u){var d=G.p;G.p=d!==0&&8>d?d:8;var S=P.T,D={};P.T=D,If(e,!1,n,a);try{var j=u(),ut=P.S;if(ut!==null&&ut(D,j),j!==null&&typeof j=="object"&&typeof j.then=="function"){var St=Vy(j,o);Yo(e,n,St,Ri(e))}else Yo(e,n,o,Ri(e))}catch(At){Yo(e,n,{then:function(){},status:"rejected",reason:At},Ri())}finally{G.p=d,S!==null&&D.types!==null&&(S.types=D.types),P.T=S}}function qy(){}function Of(e,n,a,o){if(e.tag!==5)throw Error(s(476));var u=gg(e).queue;mg(e,u,n,Y,a===null?qy:function(){return _g(e),a(o)})}function gg(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:Y,baseState:Y,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:La,lastRenderedState:Y},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:La,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function _g(e){var n=gg(e);n.next===null&&(n=e.alternate.memoizedState),Yo(e,n.next.queue,{},Ri())}function Pf(){return Gn(cl)}function vg(){return Mn().memoizedState}function xg(){return Mn().memoizedState}function Zy(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=Ri();e=fs(a);var o=ds(n,e,a);o!==null&&(mi(o,n,a),Go(o,n,a)),n={cache:uf()},e.payload=n;return}n=n.return}}function Ky(e,n,a){var o=Ri();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},ic(e)?Sg(n,a):(a=Ju(e,n,a,o),a!==null&&(mi(a,e,o),Mg(a,n,o)))}function yg(e,n,a){var o=Ri();Yo(e,n,a,o)}function Yo(e,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(ic(e))Sg(n,u);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=n.lastRenderedReducer,d!==null))try{var S=n.lastRenderedState,D=d(S,a);if(u.hasEagerState=!0,u.eagerState=D,Mi(D,S))return zl(e,n,u,0),on===null&&Il(),!1}catch{}if(a=Ju(e,n,u,o),a!==null)return mi(a,e,o),Mg(a,n,o),!0}return!1}function If(e,n,a,o){if(o={lane:2,revertLane:pd(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},ic(e)){if(n)throw Error(s(479))}else n=Ju(e,a,o,2),n!==null&&mi(n,e,2)}function ic(e){var n=e.alternate;return e===be||n!==null&&n===be}function Sg(e,n){Or=Kl=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Mg(e,n,a){if((a&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Ma(e,a)}}var Wo={readContext:Gn,use:$l,useCallback:_n,useContext:_n,useEffect:_n,useImperativeHandle:_n,useLayoutEffect:_n,useInsertionEffect:_n,useMemo:_n,useReducer:_n,useRef:_n,useState:_n,useDebugValue:_n,useDeferredValue:_n,useTransition:_n,useSyncExternalStore:_n,useId:_n,useHostTransitionStatus:_n,useFormState:_n,useActionState:_n,useOptimistic:_n,useMemoCache:_n,useCacheRefresh:_n};Wo.useEffectEvent=_n;var bg={readContext:Gn,use:$l,useCallback:function(e,n){return ni().memoizedState=[e,n===void 0?null:n],e},useContext:Gn,useEffect:rg,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,ec(4194308,4,ug.bind(null,n,e),a)},useLayoutEffect:function(e,n){return ec(4194308,4,e,n)},useInsertionEffect:function(e,n){ec(4,2,e,n)},useMemo:function(e,n){var a=ni();n=n===void 0?null:n;var o=e();if(Ks){jt(!0);try{e()}finally{jt(!1)}}return a.memoizedState=[o,n],o},useReducer:function(e,n,a){var o=ni();if(a!==void 0){var u=a(n);if(Ks){jt(!0);try{a(n)}finally{jt(!1)}}}else u=n;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=Ky.bind(null,be,e),[o.memoizedState,e]},useRef:function(e){var n=ni();return e={current:e},n.memoizedState=e},useState:function(e){e=wf(e);var n=e.queue,a=yg.bind(null,be,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:Lf,useDeferredValue:function(e,n){var a=ni();return Uf(a,e,n)},useTransition:function(){var e=wf(!1);return e=mg.bind(null,be,e.queue,!0,!1),ni().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var o=be,u=ni();if(Ie){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),on===null)throw Error(s(349));(Oe&127)!==0||jm(o,n,a)}u.memoizedState=a;var d={value:a,getSnapshot:n};return u.queue=d,rg(Ym.bind(null,o,d,e),[e]),o.flags|=2048,Ir(9,{destroy:void 0},Xm.bind(null,o,d,a,n),null),a},useId:function(){var e=ni(),n=on.identifierPrefix;if(Ie){var a=la,o=oa;a=(o&~(1<<32-Ft(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Ql++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=ky++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:Pf,useFormState:eg,useActionState:eg,useOptimistic:function(e){var n=ni();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=If.bind(null,be,!0,a),a.dispatch=n,[e,n]},useMemoCache:Af,useCacheRefresh:function(){return ni().memoizedState=Zy.bind(null,be)},useEffectEvent:function(e){var n=ni(),a={impl:e};return n.memoizedState=a,function(){if((We&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},zf={readContext:Gn,use:$l,useCallback:dg,useContext:Gn,useEffect:Nf,useImperativeHandle:fg,useInsertionEffect:lg,useLayoutEffect:cg,useMemo:hg,useReducer:tc,useRef:sg,useState:function(){return tc(La)},useDebugValue:Lf,useDeferredValue:function(e,n){var a=Mn();return pg(a,nn.memoizedState,e,n)},useTransition:function(){var e=tc(La)[0],n=Mn().memoizedState;return[typeof e=="boolean"?e:Xo(e),n]},useSyncExternalStore:km,useId:vg,useHostTransitionStatus:Pf,useFormState:ng,useActionState:ng,useOptimistic:function(e,n){var a=Mn();return Zm(a,nn,e,n)},useMemoCache:Af,useCacheRefresh:xg};zf.useEffectEvent=og;var Eg={readContext:Gn,use:$l,useCallback:dg,useContext:Gn,useEffect:Nf,useImperativeHandle:fg,useInsertionEffect:lg,useLayoutEffect:cg,useMemo:hg,useReducer:Rf,useRef:sg,useState:function(){return Rf(La)},useDebugValue:Lf,useDeferredValue:function(e,n){var a=Mn();return nn===null?Uf(a,e,n):pg(a,nn.memoizedState,e,n)},useTransition:function(){var e=Rf(La)[0],n=Mn().memoizedState;return[typeof e=="boolean"?e:Xo(e),n]},useSyncExternalStore:km,useId:vg,useHostTransitionStatus:Pf,useFormState:ag,useActionState:ag,useOptimistic:function(e,n){var a=Mn();return nn!==null?Zm(a,nn,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Af,useCacheRefresh:xg};Eg.useEffectEvent=og;function Ff(e,n,a,o){n=e.memoizedState,a=a(o,n),a=a==null?n:v({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Bf={enqueueSetState:function(e,n,a){e=e._reactInternals;var o=Ri(),u=fs(o);u.payload=n,a!=null&&(u.callback=a),n=ds(e,u,o),n!==null&&(mi(n,e,o),Go(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var o=Ri(),u=fs(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=ds(e,u,o),n!==null&&(mi(n,e,o),Go(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=Ri(),o=fs(a);o.tag=2,n!=null&&(o.callback=n),n=ds(e,o,a),n!==null&&(mi(n,e,a),Go(n,e,a))}};function Tg(e,n,a,o,u,d,S){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,d,S):n.prototype&&n.prototype.isPureReactComponent?!Uo(a,o)||!Uo(u,d):!0}function Ag(e,n,a,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==e&&Bf.enqueueReplaceState(n,n.state,null)}function Qs(e,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(e=e.defaultProps){a===n&&(a=v({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function Cg(e){Pl(e)}function Rg(e){console.error(e)}function wg(e){Pl(e)}function ac(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Dg(e,n,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Hf(e,n,a){return a=fs(a),a.tag=3,a.payload={element:null},a.callback=function(){ac(e,n)},a}function Ng(e){return e=fs(e),e.tag=3,e}function Lg(e,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var d=o.value;e.payload=function(){return u(d)},e.callback=function(){Dg(n,a,o)}}var S=a.stateNode;S!==null&&typeof S.componentDidCatch=="function"&&(e.callback=function(){Dg(n,a,o),typeof u!="function"&&(vs===null?vs=new Set([this]):vs.add(this));var D=o.stack;this.componentDidCatch(o.value,{componentStack:D!==null?D:""})})}function Qy(e,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&Rr(n,a,u,!0),a=Ei.current,a!==null){switch(a.tag){case 31:case 13:return zi===null?gc():a.alternate===null&&vn===0&&(vn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Xl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),fd(e,o,u)),!1;case 22:return a.flags|=65536,o===Xl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),fd(e,o,u)),!1}throw Error(s(435,a.tag))}return fd(e,o,u),gc(),!1}if(Ie)return n=Ei.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==sf&&(e=Error(s(422),{cause:o}),Io(Ui(e,a)))):(o!==sf&&(n=Error(s(423),{cause:o}),Io(Ui(n,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=Ui(o,a),u=Hf(e.stateNode,o,u),gf(e,u),vn!==4&&(vn=2)),!1;var d=Error(s(520),{cause:o});if(d=Ui(d,a),el===null?el=[d]:el.push(d),vn!==4&&(vn=2),n===null)return!0;o=Ui(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=Hf(a.stateNode,o,e),gf(a,e),!1;case 1:if(n=a.type,d=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(vs===null||!vs.has(d))))return a.flags|=65536,u&=-u,a.lanes|=u,u=Ng(u),Lg(u,e,a,o),gf(a,u),!1}a=a.return}while(a!==null);return!1}var Gf=Error(s(461)),Cn=!1;function Vn(e,n,a,o){n.child=e===null?Im(n,null,a,o):Zs(n,e.child,a,o)}function Ug(e,n,a,o,u){a=a.render;var d=n.ref;if("ref"in o){var S={};for(var D in o)D!=="ref"&&(S[D]=o[D])}else S=o;return Xs(n),o=Mf(e,n,a,S,d,u),D=bf(),e!==null&&!Cn?(Ef(e,n,u),Ua(e,n,u)):(Ie&&D&&nf(n),n.flags|=1,Vn(e,n,o,u),n.child)}function Og(e,n,a,o,u){if(e===null){var d=a.type;return typeof d=="function"&&!$u(d)&&d.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=d,Pg(e,n,d,o,u)):(e=Bl(a.type,null,o,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(d=e.child,!Zf(e,u)){var S=d.memoizedProps;if(a=a.compare,a=a!==null?a:Uo,a(S,o)&&e.ref===n.ref)return Ua(e,n,u)}return n.flags|=1,e=Ca(d,o),e.ref=n.ref,e.return=n,n.child=e}function Pg(e,n,a,o,u){if(e!==null){var d=e.memoizedProps;if(Uo(d,o)&&e.ref===n.ref)if(Cn=!1,n.pendingProps=o=d,Zf(e,u))(e.flags&131072)!==0&&(Cn=!0);else return n.lanes=e.lanes,Ua(e,n,u)}return Vf(e,n,a,o,u)}function Ig(e,n,a,o){var u=o.children,d=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(d=d!==null?d.baseLanes|a:a,e!==null){for(o=n.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~d}else o=0,n.child=null;return zg(e,n,d,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&kl(n,d!==null?d.cachePool:null),d!==null?Bm(n,d):vf(),Hm(n);else return o=n.lanes=536870912,zg(e,n,d!==null?d.baseLanes|a:a,a,o)}else d!==null?(kl(n,d.cachePool),Bm(n,d),ps(),n.memoizedState=null):(e!==null&&kl(n,null),vf(),ps());return Vn(e,n,u,a),n.child}function qo(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function zg(e,n,a,o,u){var d=df();return d=d===null?null:{parent:Tn._currentValue,pool:d},n.memoizedState={baseLanes:a,cachePool:d},e!==null&&kl(n,null),vf(),Hm(n),e!==null&&Rr(e,n,o,!0),n.childLanes=u,null}function sc(e,n){return n=oc({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Fg(e,n,a){return Zs(n,e.child,null,a),e=sc(n,n.pendingProps),e.flags|=2,Ti(n),n.memoizedState=null,e}function Jy(e,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Ie){if(o.mode==="hidden")return e=sc(n,o),n.lanes=536870912,qo(null,e);if(yf(n),(e=ln)?(e=K_(e,Ii),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:rs!==null?{id:oa,overflow:la}:null,retryLane:536870912,hydrationErrors:null},a=Sm(e),a.return=n,n.child=a,Hn=n,ln=null)):e=null,e===null)throw ls(n);return n.lanes=536870912,null}return sc(n,o)}var d=e.memoizedState;if(d!==null){var S=d.dehydrated;if(yf(n),u)if(n.flags&256)n.flags&=-257,n=Fg(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(Cn||Rr(e,n,a,!1),u=(a&e.childLanes)!==0,Cn||u){if(o=on,o!==null&&(S=pr(o,a),S!==0&&S!==d.retryLane))throw d.retryLane=S,Gs(e,S),mi(o,e,S),Gf;gc(),n=Fg(e,n,a)}else e=d.treeContext,ln=Fi(S.nextSibling),Hn=n,Ie=!0,os=null,Ii=!1,e!==null&&Em(n,e),n=sc(n,o),n.flags|=4096;return n}return e=Ca(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function rc(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function Vf(e,n,a,o,u){return Xs(n),a=Mf(e,n,a,o,void 0,u),o=bf(),e!==null&&!Cn?(Ef(e,n,u),Ua(e,n,u)):(Ie&&o&&nf(n),n.flags|=1,Vn(e,n,a,u),n.child)}function Bg(e,n,a,o,u,d){return Xs(n),n.updateQueue=null,a=Vm(n,o,a,u),Gm(e),o=bf(),e!==null&&!Cn?(Ef(e,n,d),Ua(e,n,d)):(Ie&&o&&nf(n),n.flags|=1,Vn(e,n,a,d),n.child)}function Hg(e,n,a,o,u){if(Xs(n),n.stateNode===null){var d=Er,S=a.contextType;typeof S=="object"&&S!==null&&(d=Gn(S)),d=new a(o,d),n.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Bf,n.stateNode=d,d._reactInternals=n,d=n.stateNode,d.props=o,d.state=n.memoizedState,d.refs={},pf(n),S=a.contextType,d.context=typeof S=="object"&&S!==null?Gn(S):Er,d.state=n.memoizedState,S=a.getDerivedStateFromProps,typeof S=="function"&&(Ff(n,a,S,o),d.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(S=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),S!==d.state&&Bf.enqueueReplaceState(d,d.state,null),ko(n,o,d,u),Vo(),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){d=n.stateNode;var D=n.memoizedProps,j=Qs(a,D);d.props=j;var ut=d.context,St=a.contextType;S=Er,typeof St=="object"&&St!==null&&(S=Gn(St));var At=a.getDerivedStateFromProps;St=typeof At=="function"||typeof d.getSnapshotBeforeUpdate=="function",D=n.pendingProps!==D,St||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(D||ut!==S)&&Ag(n,d,o,S),us=!1;var pt=n.memoizedState;d.state=pt,ko(n,o,d,u),Vo(),ut=n.memoizedState,D||pt!==ut||us?(typeof At=="function"&&(Ff(n,a,At,o),ut=n.memoizedState),(j=us||Tg(n,a,j,o,pt,ut,S))?(St||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(n.flags|=4194308)):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=ut),d.props=o,d.state=ut,d.context=S,o=j):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{d=n.stateNode,mf(e,n),S=n.memoizedProps,St=Qs(a,S),d.props=St,At=n.pendingProps,pt=d.context,ut=a.contextType,j=Er,typeof ut=="object"&&ut!==null&&(j=Gn(ut)),D=a.getDerivedStateFromProps,(ut=typeof D=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(S!==At||pt!==j)&&Ag(n,d,o,j),us=!1,pt=n.memoizedState,d.state=pt,ko(n,o,d,u),Vo();var _t=n.memoizedState;S!==At||pt!==_t||us||e!==null&&e.dependencies!==null&&Gl(e.dependencies)?(typeof D=="function"&&(Ff(n,a,D,o),_t=n.memoizedState),(St=us||Tg(n,a,St,o,pt,_t,j)||e!==null&&e.dependencies!==null&&Gl(e.dependencies))?(ut||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,_t,j),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,_t,j)),typeof d.componentDidUpdate=="function"&&(n.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof d.componentDidUpdate!="function"||S===e.memoizedProps&&pt===e.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&pt===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=_t),d.props=o,d.state=_t,d.context=j,o=St):(typeof d.componentDidUpdate!="function"||S===e.memoizedProps&&pt===e.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&pt===e.memoizedState||(n.flags|=1024),o=!1)}return d=o,rc(e,n),o=(n.flags&128)!==0,d||o?(d=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:d.render(),n.flags|=1,e!==null&&o?(n.child=Zs(n,e.child,null,u),n.child=Zs(n,null,a,u)):Vn(e,n,a,u),n.memoizedState=d.state,e=n.child):e=Ua(e,n,u),e}function Gg(e,n,a,o){return ks(),n.flags|=256,Vn(e,n,a,o),n.child}var kf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function jf(e){return{baseLanes:e,cachePool:Dm()}}function Xf(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=Ci),e}function Vg(e,n,a){var o=n.pendingProps,u=!1,d=(n.flags&128)!==0,S;if((S=d)||(S=e!==null&&e.memoizedState===null?!1:(Sn.current&2)!==0),S&&(u=!0,n.flags&=-129),S=(n.flags&32)!==0,n.flags&=-33,e===null){if(Ie){if(u?hs(n):ps(),(e=ln)?(e=K_(e,Ii),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:rs!==null?{id:oa,overflow:la}:null,retryLane:536870912,hydrationErrors:null},a=Sm(e),a.return=n,n.child=a,Hn=n,ln=null)):e=null,e===null)throw ls(n);return Cd(e)?n.lanes=32:n.lanes=536870912,null}var D=o.children;return o=o.fallback,u?(ps(),u=n.mode,D=oc({mode:"hidden",children:D},u),o=Vs(o,u,a,null),D.return=n,o.return=n,D.sibling=o,n.child=D,o=n.child,o.memoizedState=jf(a),o.childLanes=Xf(e,S,a),n.memoizedState=kf,qo(null,o)):(hs(n),Yf(n,D))}var j=e.memoizedState;if(j!==null&&(D=j.dehydrated,D!==null)){if(d)n.flags&256?(hs(n),n.flags&=-257,n=Wf(e,n,a)):n.memoizedState!==null?(ps(),n.child=e.child,n.flags|=128,n=null):(ps(),D=o.fallback,u=n.mode,o=oc({mode:"visible",children:o.children},u),D=Vs(D,u,a,null),D.flags|=2,o.return=n,D.return=n,o.sibling=D,n.child=o,Zs(n,e.child,null,a),o=n.child,o.memoizedState=jf(a),o.childLanes=Xf(e,S,a),n.memoizedState=kf,n=qo(null,o));else if(hs(n),Cd(D)){if(S=D.nextSibling&&D.nextSibling.dataset,S)var ut=S.dgst;S=ut,o=Error(s(419)),o.stack="",o.digest=S,Io({value:o,source:null,stack:null}),n=Wf(e,n,a)}else if(Cn||Rr(e,n,a,!1),S=(a&e.childLanes)!==0,Cn||S){if(S=on,S!==null&&(o=pr(S,a),o!==0&&o!==j.retryLane))throw j.retryLane=o,Gs(e,o),mi(S,e,o),Gf;Ad(D)||gc(),n=Wf(e,n,a)}else Ad(D)?(n.flags|=192,n.child=e.child,n=null):(e=j.treeContext,ln=Fi(D.nextSibling),Hn=n,Ie=!0,os=null,Ii=!1,e!==null&&Em(n,e),n=Yf(n,o.children),n.flags|=4096);return n}return u?(ps(),D=o.fallback,u=n.mode,j=e.child,ut=j.sibling,o=Ca(j,{mode:"hidden",children:o.children}),o.subtreeFlags=j.subtreeFlags&65011712,ut!==null?D=Ca(ut,D):(D=Vs(D,u,a,null),D.flags|=2),D.return=n,o.return=n,o.sibling=D,n.child=o,qo(null,o),o=n.child,D=e.child.memoizedState,D===null?D=jf(a):(u=D.cachePool,u!==null?(j=Tn._currentValue,u=u.parent!==j?{parent:j,pool:j}:u):u=Dm(),D={baseLanes:D.baseLanes|a,cachePool:u}),o.memoizedState=D,o.childLanes=Xf(e,S,a),n.memoizedState=kf,qo(e.child,o)):(hs(n),a=e.child,e=a.sibling,a=Ca(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,e!==null&&(S=n.deletions,S===null?(n.deletions=[e],n.flags|=16):S.push(e)),n.child=a,n.memoizedState=null,a)}function Yf(e,n){return n=oc({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function oc(e,n){return e=bi(22,e,null,n),e.lanes=0,e}function Wf(e,n,a){return Zs(n,e.child,null,a),e=Yf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function kg(e,n,a){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),lf(e.return,n,a)}function qf(e,n,a,o,u,d){var S=e.memoizedState;S===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:d}:(S.isBackwards=n,S.rendering=null,S.renderingStartTime=0,S.last=o,S.tail=a,S.tailMode=u,S.treeForkCount=d)}function jg(e,n,a){var o=n.pendingProps,u=o.revealOrder,d=o.tail;o=o.children;var S=Sn.current,D=(S&2)!==0;if(D?(S=S&1|2,n.flags|=128):S&=1,dt(Sn,S),Vn(e,n,o,a),o=Ie?Po:0,!D&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&kg(e,a,n);else if(e.tag===19)kg(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)e=a.alternate,e!==null&&Zl(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),qf(n,!1,u,a,d,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&Zl(e)===null){n.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}qf(n,!0,a,null,d,o);break;case"together":qf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function Ua(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),_s|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(Rr(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=Ca(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=Ca(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function Zf(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&Gl(e)))}function $y(e,n,a){switch(n.tag){case 3:Mt(n,n.stateNode.containerInfo),cs(n,Tn,e.memoizedState.cache),ks();break;case 27:case 5:Ut(n);break;case 4:Mt(n,n.stateNode.containerInfo);break;case 10:cs(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,yf(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(hs(n),n.flags|=128,null):(a&n.child.childLanes)!==0?Vg(e,n,a):(hs(n),e=Ua(e,n,a),e!==null?e.sibling:null);hs(n);break;case 19:var u=(e.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(Rr(e,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return jg(e,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),dt(Sn,Sn.current),o)break;return null;case 22:return n.lanes=0,Ig(e,n,a,n.pendingProps);case 24:cs(n,Tn,e.memoizedState.cache)}return Ua(e,n,a)}function Xg(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)Cn=!0;else{if(!Zf(e,a)&&(n.flags&128)===0)return Cn=!1,$y(e,n,a);Cn=(e.flags&131072)!==0}else Cn=!1,Ie&&(n.flags&1048576)!==0&&bm(n,Po,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=Ws(n.elementType),n.type=e,typeof e=="function")$u(e)?(o=Qs(e,o),n.tag=1,n=Hg(null,n,e,o,a)):(n.tag=0,n=Vf(null,n,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===N){n.tag=11,n=Ug(null,n,e,o,a);break t}else if(u===I){n.tag=14,n=Og(null,n,e,o,a);break t}}throw n=st(e)||e,Error(s(306,n,""))}}return n;case 0:return Vf(e,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=Qs(o,n.pendingProps),Hg(e,n,o,u,a);case 3:t:{if(Mt(n,n.stateNode.containerInfo),e===null)throw Error(s(387));o=n.pendingProps;var d=n.memoizedState;u=d.element,mf(e,n),ko(n,o,null,a);var S=n.memoizedState;if(o=S.cache,cs(n,Tn,o),o!==d.cache&&cf(n,[Tn],a,!0),Vo(),o=S.element,d.isDehydrated)if(d={element:o,isDehydrated:!1,cache:S.cache},n.updateQueue.baseState=d,n.memoizedState=d,n.flags&256){n=Gg(e,n,o,a);break t}else if(o!==u){u=Ui(Error(s(424)),n),Io(u),n=Gg(e,n,o,a);break t}else for(e=n.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,ln=Fi(e.firstChild),Hn=n,Ie=!0,os=null,Ii=!0,a=Im(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(ks(),o===u){n=Ua(e,n,a);break t}Vn(e,n,o,a)}n=n.child}return n;case 26:return rc(e,n),e===null?(a=n0(n.type,null,n.pendingProps,null))?n.memoizedState=a:Ie||(a=n.type,e=n.pendingProps,o=bc(Q.current).createElement(a),o[$e]=n,o[Fe]=e,kn(o,a,e),X(o),n.stateNode=o):n.memoizedState=n0(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return Ut(n),e===null&&Ie&&(o=n.stateNode=$_(n.type,n.pendingProps,Q.current),Hn=n,Ii=!0,u=ln,Ms(n.type)?(Rd=u,ln=Fi(o.firstChild)):ln=u),Vn(e,n,n.pendingProps.children,a),rc(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Ie&&((u=o=ln)&&(o=wS(o,n.type,n.pendingProps,Ii),o!==null?(n.stateNode=o,Hn=n,ln=Fi(o.firstChild),Ii=!1,u=!0):u=!1),u||ls(n)),Ut(n),u=n.type,d=n.pendingProps,S=e!==null?e.memoizedProps:null,o=d.children,bd(u,d)?o=null:S!==null&&bd(u,S)&&(n.flags|=32),n.memoizedState!==null&&(u=Mf(e,n,jy,null,null,a),cl._currentValue=u),rc(e,n),Vn(e,n,o,a),n.child;case 6:return e===null&&Ie&&((e=a=ln)&&(a=DS(a,n.pendingProps,Ii),a!==null?(n.stateNode=a,Hn=n,ln=null,e=!0):e=!1),e||ls(n)),null;case 13:return Vg(e,n,a);case 4:return Mt(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=Zs(n,null,o,a):Vn(e,n,o,a),n.child;case 11:return Ug(e,n,n.type,n.pendingProps,a);case 7:return Vn(e,n,n.pendingProps,a),n.child;case 8:return Vn(e,n,n.pendingProps.children,a),n.child;case 12:return Vn(e,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,cs(n,n.type,o.value),Vn(e,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,Xs(n),u=Gn(u),o=o(u),n.flags|=1,Vn(e,n,o,a),n.child;case 14:return Og(e,n,n.type,n.pendingProps,a);case 15:return Pg(e,n,n.type,n.pendingProps,a);case 19:return jg(e,n,a);case 31:return Jy(e,n,a);case 22:return Ig(e,n,a,n.pendingProps);case 24:return Xs(n),o=Gn(Tn),e===null?(u=df(),u===null&&(u=on,d=uf(),u.pooledCache=d,d.refCount++,d!==null&&(u.pooledCacheLanes|=a),u=d),n.memoizedState={parent:o,cache:u},pf(n),cs(n,Tn,u)):((e.lanes&a)!==0&&(mf(e,n),ko(n,null,null,a),Vo()),u=e.memoizedState,d=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),cs(n,Tn,o)):(o=d.cache,cs(n,Tn,o),o!==u.cache&&cf(n,[Tn],a,!0))),Vn(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Oa(e){e.flags|=4}function Kf(e,n,a,o,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(v_())e.flags|=8192;else throw qs=Xl,hf}else e.flags&=-16777217}function Yg(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!o0(n))if(v_())e.flags|=8192;else throw qs=Xl,hf}function lc(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?He():536870912,e.lanes|=n,Hr|=n)}function Zo(e,n){if(!Ie)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function cn(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(n)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,n}function tS(e,n,a){var o=n.pendingProps;switch(af(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return cn(n),null;case 1:return cn(n),null;case 3:return a=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),Da(Tn),Wt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Cr(n)?Oa(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,rf())),cn(n),null;case 26:var u=n.type,d=n.memoizedState;return e===null?(Oa(n),d!==null?(cn(n),Yg(n,d)):(cn(n),Kf(n,u,null,o,a))):d?d!==e.memoizedState?(Oa(n),cn(n),Yg(n,d)):(cn(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&Oa(n),cn(n),Kf(n,u,e,o,a)),null;case 27:if(re(n),a=Q.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&Oa(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return cn(n),null}e=Dt.current,Cr(n)?Tm(n):(e=$_(u,o,a),n.stateNode=e,Oa(n))}return cn(n),null;case 5:if(re(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&Oa(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return cn(n),null}if(d=Dt.current,Cr(n))Tm(n);else{var S=bc(Q.current);switch(d){case 1:d=S.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:d=S.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":d=S.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":d=S.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":d=S.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof o.is=="string"?S.createElement("select",{is:o.is}):S.createElement("select"),o.multiple?d.multiple=!0:o.size&&(d.size=o.size);break;default:d=typeof o.is=="string"?S.createElement(u,{is:o.is}):S.createElement(u)}}d[$e]=n,d[Fe]=o;t:for(S=n.child;S!==null;){if(S.tag===5||S.tag===6)d.appendChild(S.stateNode);else if(S.tag!==4&&S.tag!==27&&S.child!==null){S.child.return=S,S=S.child;continue}if(S===n)break t;for(;S.sibling===null;){if(S.return===null||S.return===n)break t;S=S.return}S.sibling.return=S.return,S=S.sibling}n.stateNode=d;t:switch(kn(d,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&Oa(n)}}return cn(n),Kf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&Oa(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(e=Q.current,Cr(n)){if(e=n.stateNode,a=n.memoizedProps,o=null,u=Hn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[$e]=n,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||V_(e.nodeValue,a)),e||ls(n,!0)}else e=bc(e).createTextNode(o),e[$e]=n,n.stateNode=e}return cn(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(o=Cr(n),a!==null){if(e===null){if(!o)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[$e]=n}else ks(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;cn(n),e=!1}else a=rf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(Ti(n),n):(Ti(n),null);if((n.flags&128)!==0)throw Error(s(558))}return cn(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=Cr(n),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[$e]=n}else ks(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;cn(n),u=!1}else u=rf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(Ti(n),n):(Ti(n),null)}return Ti(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),d=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(d=o.memoizedState.cachePool.pool),d!==u&&(o.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),lc(n,n.updateQueue),cn(n),null);case 4:return Wt(),e===null&&vd(n.stateNode.containerInfo),cn(n),null;case 10:return Da(n.type),cn(n),null;case 19:if(W(Sn),o=n.memoizedState,o===null)return cn(n),null;if(u=(n.flags&128)!==0,d=o.rendering,d===null)if(u)Zo(o,!1);else{if(vn!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(d=Zl(e),d!==null){for(n.flags|=128,Zo(o,!1),e=d.updateQueue,n.updateQueue=e,lc(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)ym(a,e),a=a.sibling;return dt(Sn,Sn.current&1|2),Ie&&Ra(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&A()>hc&&(n.flags|=128,u=!0,Zo(o,!1),n.lanes=4194304)}else{if(!u)if(e=Zl(d),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,lc(n,e),Zo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!d.alternate&&!Ie)return cn(n),null}else 2*A()-o.renderingStartTime>hc&&a!==536870912&&(n.flags|=128,u=!0,Zo(o,!1),n.lanes=4194304);o.isBackwards?(d.sibling=n.child,n.child=d):(e=o.last,e!==null?e.sibling=d:n.child=d,o.last=d)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=A(),e.sibling=null,a=Sn.current,dt(Sn,u?a&1|2:a&1),Ie&&Ra(n,o.treeForkCount),e):(cn(n),null);case 22:case 23:return Ti(n),xf(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(cn(n),n.subtreeFlags&6&&(n.flags|=8192)):cn(n),a=n.updateQueue,a!==null&&lc(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),e!==null&&W(Ys),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Da(Tn),cn(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function eS(e,n){switch(af(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return Da(Tn),Wt(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return re(n),null;case 31:if(n.memoizedState!==null){if(Ti(n),n.alternate===null)throw Error(s(340));ks()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(Ti(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));ks()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return W(Sn),null;case 4:return Wt(),null;case 10:return Da(n.type),null;case 22:case 23:return Ti(n),xf(),e!==null&&W(Ys),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return Da(Tn),null;case 25:return null;default:return null}}function Wg(e,n){switch(af(n),n.tag){case 3:Da(Tn),Wt();break;case 26:case 27:case 5:re(n);break;case 4:Wt();break;case 31:n.memoizedState!==null&&Ti(n);break;case 13:Ti(n);break;case 19:W(Sn);break;case 10:Da(n.type);break;case 22:case 23:Ti(n),xf(),e!==null&&W(Ys);break;case 24:Da(Tn)}}function Ko(e,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var d=a.create,S=a.inst;o=d(),S.destroy=o}a=a.next}while(a!==u)}}catch(D){Qe(n,n.return,D)}}function ms(e,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var d=u.next;o=d;do{if((o.tag&e)===e){var S=o.inst,D=S.destroy;if(D!==void 0){S.destroy=void 0,u=n;var j=a,ut=D;try{ut()}catch(St){Qe(u,j,St)}}}o=o.next}while(o!==d)}}catch(St){Qe(n,n.return,St)}}function qg(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{Fm(n,a)}catch(o){Qe(e,e.return,o)}}}function Zg(e,n,a){a.props=Qs(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){Qe(e,n,o)}}function Qo(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){Qe(e,n,u)}}function ca(e,n){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Qe(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Qe(e,n,u)}else a.current=null}function Kg(e){var n=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Qe(e,e.return,u)}}function Qf(e,n,a){try{var o=e.stateNode;bS(o,e.type,a,n),o[Fe]=n}catch(u){Qe(e,e.return,u)}}function Qg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ms(e.type)||e.tag===4}function Jf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Qg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ms(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function $f(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=qi));else if(o!==4&&(o===27&&Ms(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for($f(e,n,a),e=e.sibling;e!==null;)$f(e,n,a),e=e.sibling}function cc(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(o!==4&&(o===27&&Ms(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(cc(e,n,a),e=e.sibling;e!==null;)cc(e,n,a),e=e.sibling}function Jg(e){var n=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);kn(n,o,a),n[$e]=e,n[Fe]=a}catch(d){Qe(e,e.return,d)}}var Pa=!1,Rn=!1,td=!1,$g=typeof WeakSet=="function"?WeakSet:Set,In=null;function nS(e,n){if(e=e.containerInfo,Sd=Dc,e=fm(e),Yu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,d=o.focusNode;o=o.focusOffset;try{a.nodeType,d.nodeType}catch{a=null;break t}var S=0,D=-1,j=-1,ut=0,St=0,At=e,pt=null;e:for(;;){for(var _t;At!==a||u!==0&&At.nodeType!==3||(D=S+u),At!==d||o!==0&&At.nodeType!==3||(j=S+o),At.nodeType===3&&(S+=At.nodeValue.length),(_t=At.firstChild)!==null;)pt=At,At=_t;for(;;){if(At===e)break e;if(pt===a&&++ut===u&&(D=S),pt===d&&++St===o&&(j=S),(_t=At.nextSibling)!==null)break;At=pt,pt=At.parentNode}At=_t}a=D===-1||j===-1?null:{start:D,end:j}}else a=null}a=a||{start:0,end:0}}else a=null;for(Md={focusedElem:e,selectionRange:a},Dc=!1,In=n;In!==null;)if(n=In,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,In=e;else for(;In!==null;){switch(n=In,d=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,a=n,u=d.memoizedProps,d=d.memoizedState,o=a.stateNode;try{var se=Qs(a.type,u);e=o.getSnapshotBeforeUpdate(se,d),o.__reactInternalSnapshotBeforeUpdate=e}catch(de){Qe(a,a.return,de)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)Td(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Td(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,In=e;break}In=n.return}}function t_(e,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:za(e,a),o&4&&Ko(5,a);break;case 1:if(za(e,a),o&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(S){Qe(a,a.return,S)}else{var u=Qs(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(S){Qe(a,a.return,S)}}o&64&&qg(a),o&512&&Qo(a,a.return);break;case 3:if(za(e,a),o&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Fm(e,n)}catch(S){Qe(a,a.return,S)}}break;case 27:n===null&&o&4&&Jg(a);case 26:case 5:za(e,a),n===null&&o&4&&Kg(a),o&512&&Qo(a,a.return);break;case 12:za(e,a);break;case 31:za(e,a),o&4&&i_(e,a);break;case 13:za(e,a),o&4&&a_(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=fS.bind(null,a),NS(e,a))));break;case 22:if(o=a.memoizedState!==null||Pa,!o){n=n!==null&&n.memoizedState!==null||Rn,u=Pa;var d=Rn;Pa=o,(Rn=n)&&!d?Fa(e,a,(a.subtreeFlags&8772)!==0):za(e,a),Pa=u,Rn=d}break;case 30:break;default:za(e,a)}}function e_(e){var n=e.alternate;n!==null&&(e.alternate=null,e_(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&es(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var un=null,fi=!1;function Ia(e,n,a){for(a=a.child;a!==null;)n_(e,n,a),a=a.sibling}function n_(e,n,a){if(wt&&typeof wt.onCommitFiberUnmount=="function")try{wt.onCommitFiberUnmount(Tt,a)}catch{}switch(a.tag){case 26:Rn||ca(a,n),Ia(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Rn||ca(a,n);var o=un,u=fi;Ms(a.type)&&(un=a.stateNode,fi=!1),Ia(e,n,a),rl(a.stateNode),un=o,fi=u;break;case 5:Rn||ca(a,n);case 6:if(o=un,u=fi,un=null,Ia(e,n,a),un=o,fi=u,un!==null)if(fi)try{(un.nodeType===9?un.body:un.nodeName==="HTML"?un.ownerDocument.body:un).removeChild(a.stateNode)}catch(d){Qe(a,n,d)}else try{un.removeChild(a.stateNode)}catch(d){Qe(a,n,d)}break;case 18:un!==null&&(fi?(e=un,q_(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),qr(e)):q_(un,a.stateNode));break;case 4:o=un,u=fi,un=a.stateNode.containerInfo,fi=!0,Ia(e,n,a),un=o,fi=u;break;case 0:case 11:case 14:case 15:ms(2,a,n),Rn||ms(4,a,n),Ia(e,n,a);break;case 1:Rn||(ca(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&Zg(a,n,o)),Ia(e,n,a);break;case 21:Ia(e,n,a);break;case 22:Rn=(o=Rn)||a.memoizedState!==null,Ia(e,n,a),Rn=o;break;default:Ia(e,n,a)}}function i_(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{qr(e)}catch(a){Qe(n,n.return,a)}}}function a_(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{qr(e)}catch(a){Qe(n,n.return,a)}}function iS(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new $g),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new $g),n;default:throw Error(s(435,e.tag))}}function uc(e,n){var a=iS(e);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=dS.bind(null,e,o);o.then(u,u)}})}function di(e,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],d=e,S=n,D=S;t:for(;D!==null;){switch(D.tag){case 27:if(Ms(D.type)){un=D.stateNode,fi=!1;break t}break;case 5:un=D.stateNode,fi=!1;break t;case 3:case 4:un=D.stateNode.containerInfo,fi=!0;break t}D=D.return}if(un===null)throw Error(s(160));n_(d,S,u),un=null,fi=!1,d=u.alternate,d!==null&&(d.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)s_(n,e),n=n.sibling}var Ji=null;function s_(e,n){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:di(n,e),hi(e),o&4&&(ms(3,e,e.return),Ko(3,e),ms(5,e,e.return));break;case 1:di(n,e),hi(e),o&512&&(Rn||a===null||ca(a,a.return)),o&64&&Pa&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Ji;if(di(n,e),hi(e),o&512&&(Rn||a===null||ca(a,a.return)),o&4){var d=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":d=u.getElementsByTagName("title")[0],(!d||d[En]||d[$e]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=u.createElement(o),u.head.insertBefore(d,u.querySelector("head > title"))),kn(d,o,a),d[$e]=e,X(d),o=d;break t;case"link":var S=s0("link","href",u).get(o+(a.href||""));if(S){for(var D=0;D<S.length;D++)if(d=S[D],d.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&d.getAttribute("rel")===(a.rel==null?null:a.rel)&&d.getAttribute("title")===(a.title==null?null:a.title)&&d.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){S.splice(D,1);break e}}d=u.createElement(o),kn(d,o,a),u.head.appendChild(d);break;case"meta":if(S=s0("meta","content",u).get(o+(a.content||""))){for(D=0;D<S.length;D++)if(d=S[D],d.getAttribute("content")===(a.content==null?null:""+a.content)&&d.getAttribute("name")===(a.name==null?null:a.name)&&d.getAttribute("property")===(a.property==null?null:a.property)&&d.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&d.getAttribute("charset")===(a.charSet==null?null:a.charSet)){S.splice(D,1);break e}}d=u.createElement(o),kn(d,o,a),u.head.appendChild(d);break;default:throw Error(s(468,o))}d[$e]=e,X(d),o=d}e.stateNode=o}else r0(u,e.type,e.stateNode);else e.stateNode=a0(u,o,e.memoizedProps);else d!==o?(d===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):d.count--,o===null?r0(u,e.type,e.stateNode):a0(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Qf(e,e.memoizedProps,a.memoizedProps)}break;case 27:di(n,e),hi(e),o&512&&(Rn||a===null||ca(a,a.return)),a!==null&&o&4&&Qf(e,e.memoizedProps,a.memoizedProps);break;case 5:if(di(n,e),hi(e),o&512&&(Rn||a===null||ca(a,a.return)),e.flags&32){u=e.stateNode;try{Bn(u,"")}catch(se){Qe(e,e.return,se)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,Qf(e,u,a!==null?a.memoizedProps:u)),o&1024&&(td=!0);break;case 6:if(di(n,e),hi(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(se){Qe(e,e.return,se)}}break;case 3:if(Ac=null,u=Ji,Ji=Ec(n.containerInfo),di(n,e),Ji=u,hi(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{qr(n.containerInfo)}catch(se){Qe(e,e.return,se)}td&&(td=!1,r_(e));break;case 4:o=Ji,Ji=Ec(e.stateNode.containerInfo),di(n,e),hi(e),Ji=o;break;case 12:di(n,e),hi(e);break;case 31:di(n,e),hi(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,uc(e,o)));break;case 13:di(n,e),hi(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(dc=A()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,uc(e,o)));break;case 22:u=e.memoizedState!==null;var j=a!==null&&a.memoizedState!==null,ut=Pa,St=Rn;if(Pa=ut||u,Rn=St||j,di(n,e),Rn=St,Pa=ut,hi(e),o&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||j||Pa||Rn||Js(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){j=a=n;try{if(d=j.stateNode,u)S=d.style,typeof S.setProperty=="function"?S.setProperty("display","none","important"):S.display="none";else{D=j.stateNode;var At=j.memoizedProps.style,pt=At!=null&&At.hasOwnProperty("display")?At.display:null;D.style.display=pt==null||typeof pt=="boolean"?"":(""+pt).trim()}}catch(se){Qe(j,j.return,se)}}}else if(n.tag===6){if(a===null){j=n;try{j.stateNode.nodeValue=u?"":j.memoizedProps}catch(se){Qe(j,j.return,se)}}}else if(n.tag===18){if(a===null){j=n;try{var _t=j.stateNode;u?Z_(_t,!0):Z_(j.stateNode,!1)}catch(se){Qe(j,j.return,se)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,uc(e,a))));break;case 19:di(n,e),hi(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,uc(e,o)));break;case 30:break;case 21:break;default:di(n,e),hi(e)}}function hi(e){var n=e.flags;if(n&2){try{for(var a,o=e.return;o!==null;){if(Qg(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,d=Jf(e);cc(e,d,u);break;case 5:var S=a.stateNode;a.flags&32&&(Bn(S,""),a.flags&=-33);var D=Jf(e);cc(e,D,S);break;case 3:case 4:var j=a.stateNode.containerInfo,ut=Jf(e);$f(e,ut,j);break;default:throw Error(s(161))}}catch(St){Qe(e,e.return,St)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function r_(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;r_(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function za(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)t_(e,n.alternate,n),n=n.sibling}function Js(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:ms(4,n,n.return),Js(n);break;case 1:ca(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&Zg(n,n.return,a),Js(n);break;case 27:rl(n.stateNode);case 26:case 5:ca(n,n.return),Js(n);break;case 22:n.memoizedState===null&&Js(n);break;case 30:Js(n);break;default:Js(n)}e=e.sibling}}function Fa(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=e,d=n,S=d.flags;switch(d.tag){case 0:case 11:case 15:Fa(u,d,a),Ko(4,d);break;case 1:if(Fa(u,d,a),o=d,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(ut){Qe(o,o.return,ut)}if(o=d,u=o.updateQueue,u!==null){var D=o.stateNode;try{var j=u.shared.hiddenCallbacks;if(j!==null)for(u.shared.hiddenCallbacks=null,u=0;u<j.length;u++)zm(j[u],D)}catch(ut){Qe(o,o.return,ut)}}a&&S&64&&qg(d),Qo(d,d.return);break;case 27:Jg(d);case 26:case 5:Fa(u,d,a),a&&o===null&&S&4&&Kg(d),Qo(d,d.return);break;case 12:Fa(u,d,a);break;case 31:Fa(u,d,a),a&&S&4&&i_(u,d);break;case 13:Fa(u,d,a),a&&S&4&&a_(u,d);break;case 22:d.memoizedState===null&&Fa(u,d,a),Qo(d,d.return);break;case 30:break;default:Fa(u,d,a)}n=n.sibling}}function ed(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&zo(a))}function nd(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&zo(e))}function $i(e,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)o_(e,n,a,o),n=n.sibling}function o_(e,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:$i(e,n,a,o),u&2048&&Ko(9,n);break;case 1:$i(e,n,a,o);break;case 3:$i(e,n,a,o),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&zo(e)));break;case 12:if(u&2048){$i(e,n,a,o),e=n.stateNode;try{var d=n.memoizedProps,S=d.id,D=d.onPostCommit;typeof D=="function"&&D(S,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(j){Qe(n,n.return,j)}}else $i(e,n,a,o);break;case 31:$i(e,n,a,o);break;case 13:$i(e,n,a,o);break;case 23:break;case 22:d=n.stateNode,S=n.alternate,n.memoizedState!==null?d._visibility&2?$i(e,n,a,o):Jo(e,n):d._visibility&2?$i(e,n,a,o):(d._visibility|=2,zr(e,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&ed(S,n);break;case 24:$i(e,n,a,o),u&2048&&nd(n.alternate,n);break;default:$i(e,n,a,o)}}function zr(e,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var d=e,S=n,D=a,j=o,ut=S.flags;switch(S.tag){case 0:case 11:case 15:zr(d,S,D,j,u),Ko(8,S);break;case 23:break;case 22:var St=S.stateNode;S.memoizedState!==null?St._visibility&2?zr(d,S,D,j,u):Jo(d,S):(St._visibility|=2,zr(d,S,D,j,u)),u&&ut&2048&&ed(S.alternate,S);break;case 24:zr(d,S,D,j,u),u&&ut&2048&&nd(S.alternate,S);break;default:zr(d,S,D,j,u)}n=n.sibling}}function Jo(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,o=n,u=o.flags;switch(o.tag){case 22:Jo(a,o),u&2048&&ed(o.alternate,o);break;case 24:Jo(a,o),u&2048&&nd(o.alternate,o);break;default:Jo(a,o)}n=n.sibling}}var $o=8192;function Fr(e,n,a){if(e.subtreeFlags&$o)for(e=e.child;e!==null;)l_(e,n,a),e=e.sibling}function l_(e,n,a){switch(e.tag){case 26:Fr(e,n,a),e.flags&$o&&e.memoizedState!==null&&kS(a,Ji,e.memoizedState,e.memoizedProps);break;case 5:Fr(e,n,a);break;case 3:case 4:var o=Ji;Ji=Ec(e.stateNode.containerInfo),Fr(e,n,a),Ji=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=$o,$o=16777216,Fr(e,n,a),$o=o):Fr(e,n,a));break;default:Fr(e,n,a)}}function c_(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function tl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];In=o,f_(o,e)}c_(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)u_(e),e=e.sibling}function u_(e){switch(e.tag){case 0:case 11:case 15:tl(e),e.flags&2048&&ms(9,e,e.return);break;case 3:tl(e);break;case 12:tl(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,fc(e)):tl(e);break;default:tl(e)}}function fc(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];In=o,f_(o,e)}c_(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:ms(8,n,n.return),fc(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,fc(n));break;default:fc(n)}e=e.sibling}}function f_(e,n){for(;In!==null;){var a=In;switch(a.tag){case 0:case 11:case 15:ms(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:zo(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,In=o;else t:for(a=e;In!==null;){o=In;var u=o.sibling,d=o.return;if(e_(o),o===a){In=null;break t}if(u!==null){u.return=d,In=u;break t}In=d}}}var aS={getCacheForType:function(e){var n=Gn(Tn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return Gn(Tn).controller.signal}},sS=typeof WeakMap=="function"?WeakMap:Map,We=0,on=null,Ne=null,Oe=0,Ke=0,Ai=null,gs=!1,Br=!1,id=!1,Ba=0,vn=0,_s=0,$s=0,ad=0,Ci=0,Hr=0,el=null,pi=null,sd=!1,dc=0,d_=0,hc=1/0,pc=null,vs=null,Dn=0,xs=null,Gr=null,Ha=0,rd=0,od=null,h_=null,nl=0,ld=null;function Ri(){return(We&2)!==0&&Oe!==0?Oe&-Oe:P.T!==null?pd():fn()}function p_(){if(Ci===0)if((Oe&536870912)===0||Ie){var e=It;It<<=1,(It&3932160)===0&&(It=262144),Ci=e}else Ci=536870912;return e=Ei.current,e!==null&&(e.flags|=32),Ci}function mi(e,n,a){(e===on&&(Ke===2||Ke===9)||e.cancelPendingCommit!==null)&&(Vr(e,0),ys(e,Oe,Ci,!1)),Fn(e,a),((We&2)===0||e!==on)&&(e===on&&((We&2)===0&&($s|=a),vn===4&&ys(e,Oe,Ci,!1)),ua(e))}function m_(e,n,a){if((We&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&e.expiredLanes)===0||Qt(e,n),u=o?lS(e,n):ud(e,n,!0),d=o;do{if(u===0){Br&&!o&&ys(e,n,0,!1);break}else{if(a=e.current.alternate,d&&!rS(a)){u=ud(e,n,!1),d=!1;continue}if(u===2){if(d=n,e.errorRecoveryDisabledLanes&d)var S=0;else S=e.pendingLanes&-536870913,S=S!==0?S:S&536870912?536870912:0;if(S!==0){n=S;t:{var D=e;u=el;var j=D.current.memoizedState.isDehydrated;if(j&&(Vr(D,S).flags|=256),S=ud(D,S,!1),S!==2){if(id&&!j){D.errorRecoveryDisabledLanes|=d,$s|=d,u=4;break t}d=pi,pi=u,d!==null&&(pi===null?pi=d:pi.push.apply(pi,d))}u=S}if(d=!1,u!==2)continue}}if(u===1){Vr(e,0),ys(e,n,0,!0);break}t:{switch(o=e,d=u,d){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:ys(o,n,Ci,!gs);break t;case 2:pi=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=dc+300-A(),10<u)){if(ys(o,n,Ci,!gs),xt(o,0,!0)!==0)break t;Ha=n,o.timeoutHandle=Y_(g_.bind(null,o,a,pi,pc,sd,n,Ci,$s,Hr,gs,d,"Throttled",-0,0),u);break t}g_(o,a,pi,pc,sd,n,Ci,$s,Hr,gs,d,null,-0,0)}}break}while(!0);ua(e)}function g_(e,n,a,o,u,d,S,D,j,ut,St,At,pt,_t){if(e.timeoutHandle=-1,At=n.subtreeFlags,At&8192||(At&16785408)===16785408){At={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:qi},l_(n,d,At);var se=(d&62914560)===d?dc-A():(d&4194048)===d?d_-A():0;if(se=jS(At,se),se!==null){Ha=d,e.cancelPendingCommit=se(E_.bind(null,e,n,d,a,o,u,S,D,j,St,At,null,pt,_t)),ys(e,d,S,!ut);return}}E_(e,n,d,a,o,u,S,D,j)}function rS(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],d=u.getSnapshot;u=u.value;try{if(!Mi(d(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function ys(e,n,a,o){n&=~ad,n&=~$s,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var u=n;0<u;){var d=31-Ft(u),S=1<<d;o[d]=-1,u&=~S}a!==0&&ts(e,a,n)}function mc(){return(We&6)===0?(il(0),!1):!0}function cd(){if(Ne!==null){if(Ke===0)var e=Ne.return;else e=Ne,wa=js=null,Tf(e),Lr=null,Bo=0,e=Ne;for(;e!==null;)Wg(e.alternate,e),e=e.return;Ne=null}}function Vr(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,AS(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Ha=0,cd(),on=e,Ne=a=Ca(e.current,null),Oe=n,Ke=0,Ai=null,gs=!1,Br=Qt(e,n),id=!1,Hr=Ci=ad=$s=_s=vn=0,pi=el=null,sd=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var u=31-Ft(o),d=1<<u;n|=e[u],o&=~d}return Ba=n,Il(),a}function __(e,n){be=null,P.H=Wo,n===Nr||n===jl?(n=Um(),Ke=3):n===hf?(n=Um(),Ke=4):Ke=n===Gf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,Ai=n,Ne===null&&(vn=1,ac(e,Ui(n,e.current)))}function v_(){var e=Ei.current;return e===null?!0:(Oe&4194048)===Oe?zi===null:(Oe&62914560)===Oe||(Oe&536870912)!==0?e===zi:!1}function x_(){var e=P.H;return P.H=Wo,e===null?Wo:e}function y_(){var e=P.A;return P.A=aS,e}function gc(){vn=4,gs||(Oe&4194048)!==Oe&&Ei.current!==null||(Br=!0),(_s&134217727)===0&&($s&134217727)===0||on===null||ys(on,Oe,Ci,!1)}function ud(e,n,a){var o=We;We|=2;var u=x_(),d=y_();(on!==e||Oe!==n)&&(pc=null,Vr(e,n)),n=!1;var S=vn;t:do try{if(Ke!==0&&Ne!==null){var D=Ne,j=Ai;switch(Ke){case 8:cd(),S=6;break t;case 3:case 2:case 9:case 6:Ei.current===null&&(n=!0);var ut=Ke;if(Ke=0,Ai=null,kr(e,D,j,ut),a&&Br){S=0;break t}break;default:ut=Ke,Ke=0,Ai=null,kr(e,D,j,ut)}}oS(),S=vn;break}catch(St){__(e,St)}while(!0);return n&&e.shellSuspendCounter++,wa=js=null,We=o,P.H=u,P.A=d,Ne===null&&(on=null,Oe=0,Il()),S}function oS(){for(;Ne!==null;)S_(Ne)}function lS(e,n){var a=We;We|=2;var o=x_(),u=y_();on!==e||Oe!==n?(pc=null,hc=A()+500,Vr(e,n)):Br=Qt(e,n);t:do try{if(Ke!==0&&Ne!==null){n=Ne;var d=Ai;e:switch(Ke){case 1:Ke=0,Ai=null,kr(e,n,d,1);break;case 2:case 9:if(Nm(d)){Ke=0,Ai=null,M_(n);break}n=function(){Ke!==2&&Ke!==9||on!==e||(Ke=7),ua(e)},d.then(n,n);break t;case 3:Ke=7;break t;case 4:Ke=5;break t;case 7:Nm(d)?(Ke=0,Ai=null,M_(n)):(Ke=0,Ai=null,kr(e,n,d,7));break;case 5:var S=null;switch(Ne.tag){case 26:S=Ne.memoizedState;case 5:case 27:var D=Ne;if(S?o0(S):D.stateNode.complete){Ke=0,Ai=null;var j=D.sibling;if(j!==null)Ne=j;else{var ut=D.return;ut!==null?(Ne=ut,_c(ut)):Ne=null}break e}}Ke=0,Ai=null,kr(e,n,d,5);break;case 6:Ke=0,Ai=null,kr(e,n,d,6);break;case 8:cd(),vn=6;break t;default:throw Error(s(462))}}cS();break}catch(St){__(e,St)}while(!0);return wa=js=null,P.H=o,P.A=u,We=a,Ne!==null?0:(on=null,Oe=0,Il(),vn)}function cS(){for(;Ne!==null&&!Gt();)S_(Ne)}function S_(e){var n=Xg(e.alternate,e,Ba);e.memoizedProps=e.pendingProps,n===null?_c(e):Ne=n}function M_(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=Bg(a,n,n.pendingProps,n.type,void 0,Oe);break;case 11:n=Bg(a,n,n.pendingProps,n.type.render,n.ref,Oe);break;case 5:Tf(n);default:Wg(a,n),n=Ne=ym(n,Ba),n=Xg(a,n,Ba)}e.memoizedProps=e.pendingProps,n===null?_c(e):Ne=n}function kr(e,n,a,o){wa=js=null,Tf(n),Lr=null,Bo=0;var u=n.return;try{if(Qy(e,u,n,a,Oe)){vn=1,ac(e,Ui(a,e.current)),Ne=null;return}}catch(d){if(u!==null)throw Ne=u,d;vn=1,ac(e,Ui(a,e.current)),Ne=null;return}n.flags&32768?(Ie||o===1?e=!0:Br||(Oe&536870912)!==0?e=!1:(gs=e=!0,(o===2||o===9||o===3||o===6)&&(o=Ei.current,o!==null&&o.tag===13&&(o.flags|=16384))),b_(n,e)):_c(n)}function _c(e){var n=e;do{if((n.flags&32768)!==0){b_(n,gs);return}e=n.return;var a=tS(n.alternate,n,Ba);if(a!==null){Ne=a;return}if(n=n.sibling,n!==null){Ne=n;return}Ne=n=e}while(n!==null);vn===0&&(vn=5)}function b_(e,n){do{var a=eS(e.alternate,e);if(a!==null){a.flags&=32767,Ne=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){Ne=e;return}Ne=e=a}while(e!==null);vn=6,Ne=null}function E_(e,n,a,o,u,d,S,D,j){e.cancelPendingCommit=null;do vc();while(Dn!==0);if((We&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(d=n.lanes|n.childLanes,d|=Qu,li(e,a,d,S,D,j),e===on&&(Ne=on=null,Oe=0),Gr=n,xs=e,Ha=a,rd=d,od=u,h_=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,hS(ht,function(){return w_(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=P.T,P.T=null,u=G.p,G.p=2,S=We,We|=4;try{nS(e,n,a)}finally{We=S,G.p=u,P.T=o}}Dn=1,T_(),A_(),C_()}}function T_(){if(Dn===1){Dn=0;var e=xs,n=Gr,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=P.T,P.T=null;var o=G.p;G.p=2;var u=We;We|=4;try{s_(n,e);var d=Md,S=fm(e.containerInfo),D=d.focusedElem,j=d.selectionRange;if(S!==D&&D&&D.ownerDocument&&um(D.ownerDocument.documentElement,D)){if(j!==null&&Yu(D)){var ut=j.start,St=j.end;if(St===void 0&&(St=ut),"selectionStart"in D)D.selectionStart=ut,D.selectionEnd=Math.min(St,D.value.length);else{var At=D.ownerDocument||document,pt=At&&At.defaultView||window;if(pt.getSelection){var _t=pt.getSelection(),se=D.textContent.length,de=Math.min(j.start,se),sn=j.end===void 0?de:Math.min(j.end,se);!_t.extend&&de>sn&&(S=sn,sn=de,de=S);var $=cm(D,de),K=cm(D,sn);if($&&K&&(_t.rangeCount!==1||_t.anchorNode!==$.node||_t.anchorOffset!==$.offset||_t.focusNode!==K.node||_t.focusOffset!==K.offset)){var ct=At.createRange();ct.setStart($.node,$.offset),_t.removeAllRanges(),de>sn?(_t.addRange(ct),_t.extend(K.node,K.offset)):(ct.setEnd(K.node,K.offset),_t.addRange(ct))}}}}for(At=[],_t=D;_t=_t.parentNode;)_t.nodeType===1&&At.push({element:_t,left:_t.scrollLeft,top:_t.scrollTop});for(typeof D.focus=="function"&&D.focus(),D=0;D<At.length;D++){var bt=At[D];bt.element.scrollLeft=bt.left,bt.element.scrollTop=bt.top}}Dc=!!Sd,Md=Sd=null}finally{We=u,G.p=o,P.T=a}}e.current=n,Dn=2}}function A_(){if(Dn===2){Dn=0;var e=xs,n=Gr,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=P.T,P.T=null;var o=G.p;G.p=2;var u=We;We|=4;try{t_(e,n.alternate,n)}finally{We=u,G.p=o,P.T=a}}Dn=3}}function C_(){if(Dn===4||Dn===3){Dn=0,U();var e=xs,n=Gr,a=Ha,o=h_;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Dn=5:(Dn=0,Gr=xs=null,R_(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(vs=null),ba(a),n=n.stateNode,wt&&typeof wt.onCommitFiberRoot=="function")try{wt.onCommitFiberRoot(Tt,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=P.T,u=G.p,G.p=2,P.T=null;try{for(var d=e.onRecoverableError,S=0;S<o.length;S++){var D=o[S];d(D.value,{componentStack:D.stack})}}finally{P.T=n,G.p=u}}(Ha&3)!==0&&vc(),ua(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===ld?nl++:(nl=0,ld=e):nl=0,il(0)}}function R_(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,zo(n)))}function vc(){return T_(),A_(),C_(),w_()}function w_(){if(Dn!==5)return!1;var e=xs,n=rd;rd=0;var a=ba(Ha),o=P.T,u=G.p;try{G.p=32>a?32:a,P.T=null,a=od,od=null;var d=xs,S=Ha;if(Dn=0,Gr=xs=null,Ha=0,(We&6)!==0)throw Error(s(331));var D=We;if(We|=4,u_(d.current),o_(d,d.current,S,a),We=D,il(0,!1),wt&&typeof wt.onPostCommitFiberRoot=="function")try{wt.onPostCommitFiberRoot(Tt,d)}catch{}return!0}finally{G.p=u,P.T=o,R_(e,n)}}function D_(e,n,a){n=Ui(a,n),n=Hf(e.stateNode,n,2),e=ds(e,n,2),e!==null&&(Fn(e,2),ua(e))}function Qe(e,n,a){if(e.tag===3)D_(e,e,a);else for(;n!==null;){if(n.tag===3){D_(n,e,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(vs===null||!vs.has(o))){e=Ui(a,e),a=Ng(2),o=ds(n,a,2),o!==null&&(Lg(a,o,n,e),Fn(o,2),ua(o));break}}n=n.return}}function fd(e,n,a){var o=e.pingCache;if(o===null){o=e.pingCache=new sS;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(id=!0,u.add(a),e=uS.bind(null,e,n,a),n.then(e,e))}function uS(e,n,a){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,on===e&&(Oe&a)===a&&(vn===4||vn===3&&(Oe&62914560)===Oe&&300>A()-dc?(We&2)===0&&Vr(e,0):ad|=a,Hr===Oe&&(Hr=0)),ua(e)}function N_(e,n){n===0&&(n=He()),e=Gs(e,n),e!==null&&(Fn(e,n),ua(e))}function fS(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),N_(e,a)}function dS(e,n){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),N_(e,a)}function hS(e,n){return oe(e,n)}var xc=null,jr=null,dd=!1,yc=!1,hd=!1,Ss=0;function ua(e){e!==jr&&e.next===null&&(jr===null?xc=jr=e:jr=jr.next=e),yc=!0,dd||(dd=!0,mS())}function il(e,n){if(!hd&&yc){hd=!0;do for(var a=!1,o=xc;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var d=0;else{var S=o.suspendedLanes,D=o.pingedLanes;d=(1<<31-Ft(42|e)+1)-1,d&=u&~(S&~D),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(a=!0,P_(o,d))}else d=Oe,d=xt(o,o===on?d:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(d&3)===0||Qt(o,d)||(a=!0,P_(o,d));o=o.next}while(a);hd=!1}}function pS(){L_()}function L_(){yc=dd=!1;var e=0;Ss!==0&&TS()&&(e=Ss);for(var n=A(),a=null,o=xc;o!==null;){var u=o.next,d=U_(o,n);d===0?(o.next=null,a===null?xc=u:a.next=u,u===null&&(jr=a)):(a=o,(e!==0||(d&3)!==0)&&(yc=!0)),o=u}Dn!==0&&Dn!==5||il(e),Ss!==0&&(Ss=0)}function U_(e,n){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var S=31-Ft(d),D=1<<S,j=u[S];j===-1?((D&a)===0||(D&o)!==0)&&(u[S]=fe(D,n)):j<=n&&(e.expiredLanes|=D),d&=~D}if(n=on,a=Oe,a=xt(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===n&&(Ke===2||Ke===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&le(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Qt(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(o!==null&&le(o),ba(a)){case 2:case 8:a=vt;break;case 32:a=ht;break;case 268435456:a=Pt;break;default:a=ht}return o=O_.bind(null,e),a=oe(a,o),e.callbackPriority=n,e.callbackNode=a,n}return o!==null&&o!==null&&le(o),e.callbackPriority=2,e.callbackNode=null,2}function O_(e,n){if(Dn!==0&&Dn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(vc()&&e.callbackNode!==a)return null;var o=Oe;return o=xt(e,e===on?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(m_(e,o,n),U_(e,A()),e.callbackNode!=null&&e.callbackNode===a?O_.bind(null,e):null)}function P_(e,n){if(vc())return null;m_(e,n,!0)}function mS(){CS(function(){(We&6)!==0?oe(lt,pS):L_()})}function pd(){if(Ss===0){var e=wr;e===0&&(e=Ot,Ot<<=1,(Ot&261888)===0&&(Ot=256)),Ss=e}return Ss}function I_(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Fs(""+e)}function z_(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function gS(e,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var d=I_((u[Fe]||null).action),S=o.submitter;S&&(n=(n=S[Fe]||null)?I_(n.formAction):S.getAttribute("formAction"),n!==null&&(d=n,S=null));var D=new Bt("action","action",null,o,u);e.push({event:D,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Ss!==0){var j=S?z_(u,S):new FormData(u);Of(a,{pending:!0,data:j,method:u.method,action:d},null,j)}}else typeof d=="function"&&(D.preventDefault(),j=S?z_(u,S):new FormData(u),Of(a,{pending:!0,data:j,method:u.method,action:d},d,j))},currentTarget:u}]})}}for(var md=0;md<Ku.length;md++){var gd=Ku[md],_S=gd.toLowerCase(),vS=gd[0].toUpperCase()+gd.slice(1);Qi(_S,"on"+vS)}Qi(pm,"onAnimationEnd"),Qi(mm,"onAnimationIteration"),Qi(gm,"onAnimationStart"),Qi("dblclick","onDoubleClick"),Qi("focusin","onFocus"),Qi("focusout","onBlur"),Qi(Oy,"onTransitionRun"),Qi(Py,"onTransitionStart"),Qi(Iy,"onTransitionCancel"),Qi(_m,"onTransitionEnd"),Vt("onMouseEnter",["mouseout","mouseover"]),Vt("onMouseLeave",["mouseout","mouseover"]),Vt("onPointerEnter",["pointerout","pointerover"]),Vt("onPointerLeave",["pointerout","pointerover"]),rt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),rt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),rt("onBeforeInput",["compositionend","keypress","textInput","paste"]),rt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),rt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),rt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var al="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),xS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(al));function F_(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var d=void 0;if(n)for(var S=o.length-1;0<=S;S--){var D=o[S],j=D.instance,ut=D.currentTarget;if(D=D.listener,j!==d&&u.isPropagationStopped())break t;d=D,u.currentTarget=ut;try{d(u)}catch(St){Pl(St)}u.currentTarget=null,d=j}else for(S=0;S<o.length;S++){if(D=o[S],j=D.instance,ut=D.currentTarget,D=D.listener,j!==d&&u.isPropagationStopped())break t;d=D,u.currentTarget=ut;try{d(u)}catch(St){Pl(St)}u.currentTarget=null,d=j}}}}function Le(e,n){var a=n[Yn];a===void 0&&(a=n[Yn]=new Set);var o=e+"__bubble";a.has(o)||(B_(n,e,2,!1),a.add(o))}function _d(e,n,a){var o=0;n&&(o|=4),B_(a,e,o,n)}var Sc="_reactListening"+Math.random().toString(36).slice(2);function vd(e){if(!e[Sc]){e[Sc]=!0,gt.forEach(function(a){a!=="selectionchange"&&(xS.has(a)||_d(a,!1,e),_d(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Sc]||(n[Sc]=!0,_d("selectionchange",!1,n))}}function B_(e,n,a,o){switch(p0(n)){case 2:var u=WS;break;case 8:u=qS;break;default:u=Ud}a=u.bind(null,n,a,e),u=void 0,!wo||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(n,a,{capture:!0,passive:u}):e.addEventListener(n,a,!0):u!==void 0?e.addEventListener(n,a,{passive:u}):e.addEventListener(n,a,!1)}function xd(e,n,a,o,u){var d=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var S=o.tag;if(S===3||S===4){var D=o.stateNode.containerInfo;if(D===u)break;if(S===4)for(S=o.return;S!==null;){var j=S.tag;if((j===3||j===4)&&S.stateNode.containerInfo===u)return;S=S.return}for(;D!==null;){if(S=xi(D),S===null)return;if(j=S.tag,j===5||j===6||j===26||j===27){o=d=S;continue t}D=D.parentNode}}o=o.return}Ll(function(){var ut=d,St=_r(a),At=[];t:{var pt=vm.get(e);if(pt!==void 0){var _t=Bt,se=e;switch(e){case"keypress":if(vr(a)===0)break t;case"keydown":case"keyup":_t=dy;break;case"focusin":se="focus",_t=Gu;break;case"focusout":se="blur",_t=Gu;break;case"beforeblur":case"afterblur":_t=Gu;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":_t=Wp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":_t=ty;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":_t=my;break;case pm:case mm:case gm:_t=iy;break;case _m:_t=_y;break;case"scroll":case"scrollend":_t=Ze;break;case"wheel":_t=xy;break;case"copy":case"cut":case"paste":_t=sy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":_t=Zp;break;case"toggle":case"beforetoggle":_t=Sy}var de=(n&4)!==0,sn=!de&&(e==="scroll"||e==="scrollend"),$=de?pt!==null?pt+"Capture":null:pt;de=[];for(var K=ut,ct;K!==null;){var bt=K;if(ct=bt.stateNode,bt=bt.tag,bt!==5&&bt!==26&&bt!==27||ct===null||$===null||(bt=ra(K,$),bt!=null&&de.push(sl(K,bt,ct))),sn)break;K=K.return}0<de.length&&(pt=new _t(pt,se,null,a,St),At.push({event:pt,listeners:de}))}}if((n&7)===0){t:{if(pt=e==="mouseover"||e==="pointerover",_t=e==="mouseout"||e==="pointerout",pt&&a!==gr&&(se=a.relatedTarget||a.fromElement)&&(xi(se)||se[xn]))break t;if((_t||pt)&&(pt=St.window===St?St:(pt=St.ownerDocument)?pt.defaultView||pt.parentWindow:window,_t?(se=a.relatedTarget||a.toElement,_t=ut,se=se?xi(se):null,se!==null&&(sn=c(se),de=se.tag,se!==sn||de!==5&&de!==27&&de!==6)&&(se=null)):(_t=null,se=ut),_t!==se)){if(de=Wp,bt="onMouseLeave",$="onMouseEnter",K="mouse",(e==="pointerout"||e==="pointerover")&&(de=Zp,bt="onPointerLeave",$="onPointerEnter",K="pointer"),sn=_t==null?pt:Ta(_t),ct=se==null?pt:Ta(se),pt=new de(bt,K+"leave",_t,a,St),pt.target=sn,pt.relatedTarget=ct,bt=null,xi(St)===ut&&(de=new de($,K+"enter",se,a,St),de.target=ct,de.relatedTarget=sn,bt=de),sn=bt,_t&&se)e:{for(de=yS,$=_t,K=se,ct=0,bt=$;bt;bt=de(bt))ct++;bt=0;for(var ue=K;ue;ue=de(ue))bt++;for(;0<ct-bt;)$=de($),ct--;for(;0<bt-ct;)K=de(K),bt--;for(;ct--;){if($===K||K!==null&&$===K.alternate){de=$;break e}$=de($),K=de(K)}de=null}else de=null;_t!==null&&H_(At,pt,_t,de,!1),se!==null&&sn!==null&&H_(At,sn,se,de,!0)}}t:{if(pt=ut?Ta(ut):window,_t=pt.nodeName&&pt.nodeName.toLowerCase(),_t==="select"||_t==="input"&&pt.type==="file")var Xe=im;else if(em(pt))if(am)Xe=Ny;else{Xe=wy;var ce=Ry}else _t=pt.nodeName,!_t||_t.toLowerCase()!=="input"||pt.type!=="checkbox"&&pt.type!=="radio"?ut&&ns(ut.elementType)&&(Xe=im):Xe=Dy;if(Xe&&(Xe=Xe(e,ut))){nm(At,Xe,a,St);break t}ce&&ce(e,pt,ut),e==="focusout"&&ut&&pt.type==="number"&&ut.memoizedProps.value!=null&&yi(pt,"number",pt.value)}switch(ce=ut?Ta(ut):window,e){case"focusin":(em(ce)||ce.contentEditable==="true")&&(Sr=ce,Wu=ut,Oo=null);break;case"focusout":Oo=Wu=Sr=null;break;case"mousedown":qu=!0;break;case"contextmenu":case"mouseup":case"dragend":qu=!1,dm(At,a,St);break;case"selectionchange":if(Uy)break;case"keydown":case"keyup":dm(At,a,St)}var Ee;if(ku)t:{switch(e){case"compositionstart":var Pe="onCompositionStart";break t;case"compositionend":Pe="onCompositionEnd";break t;case"compositionupdate":Pe="onCompositionUpdate";break t}Pe=void 0}else yr?$p(e,a)&&(Pe="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(Pe="onCompositionStart");Pe&&(Kp&&a.locale!=="ko"&&(yr||Pe!=="onCompositionStart"?Pe==="onCompositionEnd"&&yr&&(Ee=Ul()):(Ni=St,ss="value"in Ni?Ni.value:Ni.textContent,yr=!0)),ce=Mc(ut,Pe),0<ce.length&&(Pe=new qp(Pe,e,null,a,St),At.push({event:Pe,listeners:ce}),Ee?Pe.data=Ee:(Ee=tm(a),Ee!==null&&(Pe.data=Ee)))),(Ee=by?Ey(e,a):Ty(e,a))&&(Pe=Mc(ut,"onBeforeInput"),0<Pe.length&&(ce=new qp("onBeforeInput","beforeinput",null,a,St),At.push({event:ce,listeners:Pe}),ce.data=Ee)),gS(At,e,ut,a,St)}F_(At,n)})}function sl(e,n,a){return{instance:e,listener:n,currentTarget:a}}function Mc(e,n){for(var a=n+"Capture",o=[];e!==null;){var u=e,d=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||d===null||(u=ra(e,a),u!=null&&o.unshift(sl(e,u,d)),u=ra(e,n),u!=null&&o.push(sl(e,u,d))),e.tag===3)return o;e=e.return}return[]}function yS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function H_(e,n,a,o,u){for(var d=n._reactName,S=[];a!==null&&a!==o;){var D=a,j=D.alternate,ut=D.stateNode;if(D=D.tag,j!==null&&j===o)break;D!==5&&D!==26&&D!==27||ut===null||(j=ut,u?(ut=ra(a,d),ut!=null&&S.unshift(sl(a,ut,j))):u||(ut=ra(a,d),ut!=null&&S.push(sl(a,ut,j)))),a=a.return}S.length!==0&&e.push({event:n,listeners:S})}var SS=/\r\n?/g,MS=/\u0000|\uFFFD/g;function G_(e){return(typeof e=="string"?e:""+e).replace(SS,`
`).replace(MS,"")}function V_(e,n){return n=G_(n),G_(e)===n}function an(e,n,a,o,u,d){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Bn(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Bn(e,""+o);break;case"className":xe(e,"class",o);break;case"tabIndex":xe(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":xe(e,a,o);break;case"style":Wi(e,o,d);break;case"data":if(n!=="object"){xe(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Fs(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(a==="formAction"?(n!=="input"&&an(e,n,"name",u.name,u,null),an(e,n,"formEncType",u.formEncType,u,null),an(e,n,"formMethod",u.formMethod,u,null),an(e,n,"formTarget",u.formTarget,u,null)):(an(e,n,"encType",u.encType,u,null),an(e,n,"method",u.method,u,null),an(e,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Fs(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=qi);break;case"onScroll":o!=null&&Le("scroll",e);break;case"onScrollEnd":o!=null&&Le("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=Fs(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":Le("beforetoggle",e),Le("toggle",e),pe(e,"popover",o);break;case"xlinkActuate":ee(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":ee(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":ee(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":ee(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":ee(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":ee(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":ee(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":ee(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":ee(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":pe(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Bu.get(a)||a,pe(e,a,o))}}function yd(e,n,a,o,u,d){switch(a){case"style":Wi(e,o,d);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?Bn(e,o):(typeof o=="number"||typeof o=="bigint")&&Bn(e,""+o);break;case"onScroll":o!=null&&Le("scroll",e);break;case"onScrollEnd":o!=null&&Le("scrollend",e);break;case"onClick":o!=null&&(e.onclick=qi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ft.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),d=e[Fe]||null,d=d!=null?d[a]:null,typeof d=="function"&&e.removeEventListener(n,d,u),typeof o=="function")){typeof d!="function"&&d!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):pe(e,a,o)}}}function kn(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Le("error",e),Le("load",e);var o=!1,u=!1,d;for(d in a)if(a.hasOwnProperty(d)){var S=a[d];if(S!=null)switch(d){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:an(e,n,d,S,a,null)}}u&&an(e,n,"srcSet",a.srcSet,a,null),o&&an(e,n,"src",a.src,a,null);return;case"input":Le("invalid",e);var D=d=S=u=null,j=null,ut=null;for(o in a)if(a.hasOwnProperty(o)){var St=a[o];if(St!=null)switch(o){case"name":u=St;break;case"type":S=St;break;case"checked":j=St;break;case"defaultChecked":ut=St;break;case"value":d=St;break;case"defaultValue":D=St;break;case"children":case"dangerouslySetInnerHTML":if(St!=null)throw Error(s(137,n));break;default:an(e,n,o,St,a,null)}}Wn(e,d,D,j,ut,S,u,!1);return;case"select":Le("invalid",e),o=S=d=null;for(u in a)if(a.hasOwnProperty(u)&&(D=a[u],D!=null))switch(u){case"value":d=D;break;case"defaultValue":S=D;break;case"multiple":o=D;default:an(e,n,u,D,a,null)}n=d,a=S,e.multiple=!!o,n!=null?qn(e,!!o,n,!1):a!=null&&qn(e,!!o,a,!0);return;case"textarea":Le("invalid",e),d=u=o=null;for(S in a)if(a.hasOwnProperty(S)&&(D=a[S],D!=null))switch(S){case"value":o=D;break;case"defaultValue":u=D;break;case"children":d=D;break;case"dangerouslySetInnerHTML":if(D!=null)throw Error(s(91));break;default:an(e,n,S,D,a,null)}mn(e,o,u,d);return;case"option":for(j in a)a.hasOwnProperty(j)&&(o=a[j],o!=null)&&(j==="selected"?e.selected=o&&typeof o!="function"&&typeof o!="symbol":an(e,n,j,o,a,null));return;case"dialog":Le("beforetoggle",e),Le("toggle",e),Le("cancel",e),Le("close",e);break;case"iframe":case"object":Le("load",e);break;case"video":case"audio":for(o=0;o<al.length;o++)Le(al[o],e);break;case"image":Le("error",e),Le("load",e);break;case"details":Le("toggle",e);break;case"embed":case"source":case"link":Le("error",e),Le("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ut in a)if(a.hasOwnProperty(ut)&&(o=a[ut],o!=null))switch(ut){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:an(e,n,ut,o,a,null)}return;default:if(ns(n)){for(St in a)a.hasOwnProperty(St)&&(o=a[St],o!==void 0&&yd(e,n,St,o,a,void 0));return}}for(D in a)a.hasOwnProperty(D)&&(o=a[D],o!=null&&an(e,n,D,o,a,null))}function bS(e,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,d=null,S=null,D=null,j=null,ut=null,St=null;for(_t in a){var At=a[_t];if(a.hasOwnProperty(_t)&&At!=null)switch(_t){case"checked":break;case"value":break;case"defaultValue":j=At;default:o.hasOwnProperty(_t)||an(e,n,_t,null,o,At)}}for(var pt in o){var _t=o[pt];if(At=a[pt],o.hasOwnProperty(pt)&&(_t!=null||At!=null))switch(pt){case"type":d=_t;break;case"name":u=_t;break;case"checked":ut=_t;break;case"defaultChecked":St=_t;break;case"value":S=_t;break;case"defaultValue":D=_t;break;case"children":case"dangerouslySetInnerHTML":if(_t!=null)throw Error(s(137,n));break;default:_t!==At&&an(e,n,pt,_t,o,At)}}On(e,S,D,j,ut,St,d,u);return;case"select":_t=S=D=pt=null;for(d in a)if(j=a[d],a.hasOwnProperty(d)&&j!=null)switch(d){case"value":break;case"multiple":_t=j;default:o.hasOwnProperty(d)||an(e,n,d,null,o,j)}for(u in o)if(d=o[u],j=a[u],o.hasOwnProperty(u)&&(d!=null||j!=null))switch(u){case"value":pt=d;break;case"defaultValue":D=d;break;case"multiple":S=d;default:d!==j&&an(e,n,u,d,o,j)}n=D,a=S,o=_t,pt!=null?qn(e,!!a,pt,!1):!!o!=!!a&&(n!=null?qn(e,!!a,n,!0):qn(e,!!a,a?[]:"",!1));return;case"textarea":_t=pt=null;for(D in a)if(u=a[D],a.hasOwnProperty(D)&&u!=null&&!o.hasOwnProperty(D))switch(D){case"value":break;case"children":break;default:an(e,n,D,null,o,u)}for(S in o)if(u=o[S],d=a[S],o.hasOwnProperty(S)&&(u!=null||d!=null))switch(S){case"value":pt=u;break;case"defaultValue":_t=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==d&&an(e,n,S,u,o,d)}je(e,pt,_t);return;case"option":for(var se in a)pt=a[se],a.hasOwnProperty(se)&&pt!=null&&!o.hasOwnProperty(se)&&(se==="selected"?e.selected=!1:an(e,n,se,null,o,pt));for(j in o)pt=o[j],_t=a[j],o.hasOwnProperty(j)&&pt!==_t&&(pt!=null||_t!=null)&&(j==="selected"?e.selected=pt&&typeof pt!="function"&&typeof pt!="symbol":an(e,n,j,pt,o,_t));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var de in a)pt=a[de],a.hasOwnProperty(de)&&pt!=null&&!o.hasOwnProperty(de)&&an(e,n,de,null,o,pt);for(ut in o)if(pt=o[ut],_t=a[ut],o.hasOwnProperty(ut)&&pt!==_t&&(pt!=null||_t!=null))switch(ut){case"children":case"dangerouslySetInnerHTML":if(pt!=null)throw Error(s(137,n));break;default:an(e,n,ut,pt,o,_t)}return;default:if(ns(n)){for(var sn in a)pt=a[sn],a.hasOwnProperty(sn)&&pt!==void 0&&!o.hasOwnProperty(sn)&&yd(e,n,sn,void 0,o,pt);for(St in o)pt=o[St],_t=a[St],!o.hasOwnProperty(St)||pt===_t||pt===void 0&&_t===void 0||yd(e,n,St,pt,o,_t);return}}for(var $ in a)pt=a[$],a.hasOwnProperty($)&&pt!=null&&!o.hasOwnProperty($)&&an(e,n,$,null,o,pt);for(At in o)pt=o[At],_t=a[At],!o.hasOwnProperty(At)||pt===_t||pt==null&&_t==null||an(e,n,At,pt,o,_t)}function k_(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function ES(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],d=u.transferSize,S=u.initiatorType,D=u.duration;if(d&&D&&k_(S)){for(S=0,D=u.responseEnd,o+=1;o<a.length;o++){var j=a[o],ut=j.startTime;if(ut>D)break;var St=j.transferSize,At=j.initiatorType;St&&k_(At)&&(j=j.responseEnd,S+=St*(j<D?1:(D-ut)/(j-ut)))}if(--o,n+=8*(d+S)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Sd=null,Md=null;function bc(e){return e.nodeType===9?e:e.ownerDocument}function j_(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function X_(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function bd(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Ed=null;function TS(){var e=window.event;return e&&e.type==="popstate"?e===Ed?!1:(Ed=e,!0):(Ed=null,!1)}var Y_=typeof setTimeout=="function"?setTimeout:void 0,AS=typeof clearTimeout=="function"?clearTimeout:void 0,W_=typeof Promise=="function"?Promise:void 0,CS=typeof queueMicrotask=="function"?queueMicrotask:typeof W_<"u"?function(e){return W_.resolve(null).then(e).catch(RS)}:Y_;function RS(e){setTimeout(function(){throw e})}function Ms(e){return e==="head"}function q_(e,n){var a=n,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),qr(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")rl(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,rl(a);for(var d=a.firstChild;d;){var S=d.nextSibling,D=d.nodeName;d[En]||D==="SCRIPT"||D==="STYLE"||D==="LINK"&&d.rel.toLowerCase()==="stylesheet"||a.removeChild(d),d=S}}else a==="body"&&rl(e.ownerDocument.body);a=u}while(a);qr(n)}function Z_(e,n){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function Td(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Td(a),es(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function wS(e,n,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[En])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var d=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=Fi(e.nextSibling),e===null)break}return null}function DS(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Fi(e.nextSibling),e===null))return null;return e}function K_(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Fi(e.nextSibling),e===null))return null;return e}function Ad(e){return e.data==="$?"||e.data==="$~"}function Cd(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function NS(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Fi(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var Rd=null;function Q_(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return Fi(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function J_(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function $_(e,n,a){switch(n=bc(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function rl(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);es(e)}var Bi=new Map,t0=new Set;function Ec(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Ga=G.d;G.d={f:LS,r:US,D:OS,C:PS,L:IS,m:zS,X:BS,S:FS,M:HS};function LS(){var e=Ga.f(),n=mc();return e||n}function US(e){var n=Yi(e);n!==null&&n.tag===5&&n.type==="form"?_g(n):Ga.r(e)}var Xr=typeof document>"u"?null:document;function e0(e,n,a){var o=Xr;if(o&&typeof n=="string"&&n){var u=me(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),t0.has(u)||(t0.add(u),e={rel:e,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),kn(n,"link",e),X(n),o.head.appendChild(n)))}}function OS(e){Ga.D(e),e0("dns-prefetch",e,null)}function PS(e,n){Ga.C(e,n),e0("preconnect",e,n)}function IS(e,n,a){Ga.L(e,n,a);var o=Xr;if(o&&e&&n){var u='link[rel="preload"][as="'+me(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+me(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+me(a.imageSizes)+'"]')):u+='[href="'+me(e)+'"]';var d=u;switch(n){case"style":d=Yr(e);break;case"script":d=Wr(e)}Bi.has(d)||(e=v({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),Bi.set(d,e),o.querySelector(u)!==null||n==="style"&&o.querySelector(ol(d))||n==="script"&&o.querySelector(ll(d))||(n=o.createElement("link"),kn(n,"link",e),X(n),o.head.appendChild(n)))}}function zS(e,n){Ga.m(e,n);var a=Xr;if(a&&e){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+me(o)+'"][href="'+me(e)+'"]',d=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Wr(e)}if(!Bi.has(d)&&(e=v({rel:"modulepreload",href:e},n),Bi.set(d,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(ll(d)))return}o=a.createElement("link"),kn(o,"link",e),X(o),a.head.appendChild(o)}}}function FS(e,n,a){Ga.S(e,n,a);var o=Xr;if(o&&e){var u=C(o).hoistableStyles,d=Yr(e);n=n||"default";var S=u.get(d);if(!S){var D={loading:0,preload:null};if(S=o.querySelector(ol(d)))D.loading=5;else{e=v({rel:"stylesheet",href:e,"data-precedence":n},a),(a=Bi.get(d))&&wd(e,a);var j=S=o.createElement("link");X(j),kn(j,"link",e),j._p=new Promise(function(ut,St){j.onload=ut,j.onerror=St}),j.addEventListener("load",function(){D.loading|=1}),j.addEventListener("error",function(){D.loading|=2}),D.loading|=4,Tc(S,n,o)}S={type:"stylesheet",instance:S,count:1,state:D},u.set(d,S)}}}function BS(e,n){Ga.X(e,n);var a=Xr;if(a&&e){var o=C(a).hoistableScripts,u=Wr(e),d=o.get(u);d||(d=a.querySelector(ll(u)),d||(e=v({src:e,async:!0},n),(n=Bi.get(u))&&Dd(e,n),d=a.createElement("script"),X(d),kn(d,"link",e),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function HS(e,n){Ga.M(e,n);var a=Xr;if(a&&e){var o=C(a).hoistableScripts,u=Wr(e),d=o.get(u);d||(d=a.querySelector(ll(u)),d||(e=v({src:e,async:!0,type:"module"},n),(n=Bi.get(u))&&Dd(e,n),d=a.createElement("script"),X(d),kn(d,"link",e),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function n0(e,n,a,o){var u=(u=Q.current)?Ec(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=Yr(a.href),a=C(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Yr(a.href);var d=C(u).hoistableStyles,S=d.get(e);if(S||(u=u.ownerDocument||u,S={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,S),(d=u.querySelector(ol(e)))&&!d._p&&(S.instance=d,S.state.loading=5),Bi.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Bi.set(e,a),d||GS(u,e,a,S.state))),n&&o===null)throw Error(s(528,""));return S}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=Wr(a),a=C(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function Yr(e){return'href="'+me(e)+'"'}function ol(e){return'link[rel="stylesheet"]['+e+"]"}function i0(e){return v({},e,{"data-precedence":e.precedence,precedence:null})}function GS(e,n,a,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),kn(n,"link",a),X(n),e.head.appendChild(n))}function Wr(e){return'[src="'+me(e)+'"]'}function ll(e){return"script[async]"+e}function a0(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+me(a.href)+'"]');if(o)return n.instance=o,X(o),o;var u=v({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),X(o),kn(o,"style",u),Tc(o,a.precedence,e),n.instance=o;case"stylesheet":u=Yr(a.href);var d=e.querySelector(ol(u));if(d)return n.state.loading|=4,n.instance=d,X(d),d;o=i0(a),(u=Bi.get(u))&&wd(o,u),d=(e.ownerDocument||e).createElement("link"),X(d);var S=d;return S._p=new Promise(function(D,j){S.onload=D,S.onerror=j}),kn(d,"link",o),n.state.loading|=4,Tc(d,a.precedence,e),n.instance=d;case"script":return d=Wr(a.src),(u=e.querySelector(ll(d)))?(n.instance=u,X(u),u):(o=a,(u=Bi.get(d))&&(o=v({},a),Dd(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),X(u),kn(u,"link",o),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,Tc(o,a.precedence,e));return n.instance}function Tc(e,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,d=u,S=0;S<o.length;S++){var D=o[S];if(D.dataset.precedence===n)d=D;else if(d!==u)break}d?d.parentNode.insertBefore(e,d.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function wd(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function Dd(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var Ac=null;function s0(e,n,a){if(Ac===null){var o=new Map,u=Ac=new Map;u.set(a,o)}else u=Ac,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var d=a[u];if(!(d[En]||d[$e]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var S=d.getAttribute(n)||"";S=e+S;var D=o.get(S);D?D.push(d):o.set(S,[d])}}return o}function r0(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function VS(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(e=n.disabled,typeof n.precedence=="string"&&e==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function o0(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function kS(e,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=Yr(o.href),d=n.querySelector(ol(u));if(d){n=d._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=Cc.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=d,X(d);return}d=n.ownerDocument||n,o=i0(o),(u=Bi.get(u))&&wd(o,u),d=d.createElement("link"),X(d);var S=d;S._p=new Promise(function(D,j){S.onload=D,S.onerror=j}),kn(d,"link",o),a.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=Cc.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var Nd=0;function jS(e,n){return e.stylesheets&&e.count===0&&wc(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&wc(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+n);0<e.imgBytes&&Nd===0&&(Nd=62500*ES());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&wc(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>Nd?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function Cc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)wc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Rc=null;function wc(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Rc=new Map,n.forEach(XS,e),Rc=null,Cc.call(e))}function XS(e,n){if(!(n.state.loading&4)){var a=Rc.get(e);if(a)var o=a.get(null);else{a=new Map,Rc.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<u.length;d++){var S=u[d];(S.nodeName==="LINK"||S.getAttribute("media")!=="not all")&&(a.set(S.dataset.precedence,S),o=S)}o&&a.set(null,o)}u=n.instance,S=u.getAttribute("data-precedence"),d=a.get(S)||o,d===o&&a.set(null,u),a.set(S,u),this.count++,o=Cc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),d?d.parentNode.insertBefore(u,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var cl={$$typeof:F,Provider:null,Consumer:null,_currentValue:Y,_currentValue2:Y,_threadCount:0};function YS(e,n,a,o,u,d,S,D,j){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=we(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=we(0),this.hiddenUpdates=we(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=d,this.onRecoverableError=S,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=j,this.incompleteTransitions=new Map}function l0(e,n,a,o,u,d,S,D,j,ut,St,At){return e=new YS(e,n,a,S,j,ut,St,At,D),n=1,d===!0&&(n|=24),d=bi(3,null,null,n),e.current=d,d.stateNode=e,n=uf(),n.refCount++,e.pooledCache=n,n.refCount++,d.memoizedState={element:o,isDehydrated:a,cache:n},pf(d),e}function c0(e){return e?(e=Er,e):Er}function u0(e,n,a,o,u,d){u=c0(u),o.context===null?o.context=u:o.pendingContext=u,o=fs(n),o.payload={element:a},d=d===void 0?null:d,d!==null&&(o.callback=d),a=ds(e,o,n),a!==null&&(mi(a,e,n),Go(a,e,n))}function f0(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function Ld(e,n){f0(e,n),(e=e.alternate)&&f0(e,n)}function d0(e){if(e.tag===13||e.tag===31){var n=Gs(e,67108864);n!==null&&mi(n,e,67108864),Ld(e,67108864)}}function h0(e){if(e.tag===13||e.tag===31){var n=Ri();n=Ge(n);var a=Gs(e,n);a!==null&&mi(a,e,n),Ld(e,n)}}var Dc=!0;function WS(e,n,a,o){var u=P.T;P.T=null;var d=G.p;try{G.p=2,Ud(e,n,a,o)}finally{G.p=d,P.T=u}}function qS(e,n,a,o){var u=P.T;P.T=null;var d=G.p;try{G.p=8,Ud(e,n,a,o)}finally{G.p=d,P.T=u}}function Ud(e,n,a,o){if(Dc){var u=Od(o);if(u===null)xd(e,n,o,Nc,a),m0(e,o);else if(KS(u,e,n,a,o))o.stopPropagation();else if(m0(e,o),n&4&&-1<ZS.indexOf(e)){for(;u!==null;){var d=Yi(u);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var S=Nt(d.pendingLanes);if(S!==0){var D=d;for(D.pendingLanes|=2,D.entangledLanes|=2;S;){var j=1<<31-Ft(S);D.entanglements[1]|=j,S&=~j}ua(d),(We&6)===0&&(hc=A()+500,il(0))}}break;case 31:case 13:D=Gs(d,2),D!==null&&mi(D,d,2),mc(),Ld(d,2)}if(d=Od(o),d===null&&xd(e,n,o,Nc,a),d===u)break;u=d}u!==null&&o.stopPropagation()}else xd(e,n,o,null,a)}}function Od(e){return e=_r(e),Pd(e)}var Nc=null;function Pd(e){if(Nc=null,e=xi(e),e!==null){var n=c(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=f(n),e!==null)return e;e=null}else if(a===31){if(e=p(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Nc=e,null}function p0(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(q()){case lt:return 2;case vt:return 8;case ht:case kt:return 32;case Pt:return 268435456;default:return 32}default:return 32}}var Id=!1,bs=null,Es=null,Ts=null,ul=new Map,fl=new Map,As=[],ZS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function m0(e,n){switch(e){case"focusin":case"focusout":bs=null;break;case"dragenter":case"dragleave":Es=null;break;case"mouseover":case"mouseout":Ts=null;break;case"pointerover":case"pointerout":ul.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":fl.delete(n.pointerId)}}function dl(e,n,a,o,u,d){return e===null||e.nativeEvent!==d?(e={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:d,targetContainers:[u]},n!==null&&(n=Yi(n),n!==null&&d0(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function KS(e,n,a,o,u){switch(n){case"focusin":return bs=dl(bs,e,n,a,o,u),!0;case"dragenter":return Es=dl(Es,e,n,a,o,u),!0;case"mouseover":return Ts=dl(Ts,e,n,a,o,u),!0;case"pointerover":var d=u.pointerId;return ul.set(d,dl(ul.get(d)||null,e,n,a,o,u)),!0;case"gotpointercapture":return d=u.pointerId,fl.set(d,dl(fl.get(d)||null,e,n,a,o,u)),!0}return!1}function g0(e){var n=xi(e.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){e.blockedOn=n,Ea(e.priority,function(){h0(a)});return}}else if(n===31){if(n=p(a),n!==null){e.blockedOn=n,Ea(e.priority,function(){h0(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Lc(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=Od(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);gr=o,a.target.dispatchEvent(o),gr=null}else return n=Yi(a),n!==null&&d0(n),e.blockedOn=a,!1;n.shift()}return!0}function _0(e,n,a){Lc(e)&&a.delete(n)}function QS(){Id=!1,bs!==null&&Lc(bs)&&(bs=null),Es!==null&&Lc(Es)&&(Es=null),Ts!==null&&Lc(Ts)&&(Ts=null),ul.forEach(_0),fl.forEach(_0)}function Uc(e,n){e.blockedOn===n&&(e.blockedOn=null,Id||(Id=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,QS)))}var Oc=null;function v0(e){Oc!==e&&(Oc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Oc===e&&(Oc=null);for(var n=0;n<e.length;n+=3){var a=e[n],o=e[n+1],u=e[n+2];if(typeof o!="function"){if(Pd(o||a)===null)continue;break}var d=Yi(a);d!==null&&(e.splice(n,3),n-=3,Of(d,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function qr(e){function n(j){return Uc(j,e)}bs!==null&&Uc(bs,e),Es!==null&&Uc(Es,e),Ts!==null&&Uc(Ts,e),ul.forEach(n),fl.forEach(n);for(var a=0;a<As.length;a++){var o=As[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<As.length&&(a=As[0],a.blockedOn===null);)g0(a),a.blockedOn===null&&As.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],d=a[o+1],S=u[Fe]||null;if(typeof d=="function")S||v0(a);else if(S){var D=null;if(d&&d.hasAttribute("formAction")){if(u=d,S=d[Fe]||null)D=S.formAction;else if(Pd(u)!==null)continue}else D=S.action;typeof D=="function"?a[o+1]=D:(a.splice(o,3),o-=3),v0(a)}}}function x0(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(S){return u=S})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function zd(e){this._internalRoot=e}Pc.prototype.render=zd.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=Ri();u0(a,o,e,n,null,null)},Pc.prototype.unmount=zd.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;u0(e.current,2,null,e,null,null),mc(),n[xn]=null}};function Pc(e){this._internalRoot=e}Pc.prototype.unstable_scheduleHydration=function(e){if(e){var n=fn();e={blockedOn:null,target:e,priority:n};for(var a=0;a<As.length&&n!==0&&n<As[a].priority;a++);As.splice(a,0,e),a===0&&g0(e)}};var y0=t.version;if(y0!=="19.2.4")throw Error(s(527,y0,"19.2.4"));G.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=h(n),e=e!==null?_(e):null,e=e===null?null:e.stateNode,e};var JS={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:P,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ic=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ic.isDisabled&&Ic.supportsFiber)try{Tt=Ic.inject(JS),wt=Ic}catch{}}return pl.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,o="",u=Cg,d=Rg,S=wg;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(d=n.onCaughtError),n.onRecoverableError!==void 0&&(S=n.onRecoverableError)),n=l0(e,1,!1,null,null,a,o,null,u,d,S,x0),e[xn]=n.current,vd(e),new zd(n)},pl.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var o=!1,u="",d=Cg,S=Rg,D=wg,j=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(d=a.onUncaughtError),a.onCaughtError!==void 0&&(S=a.onCaughtError),a.onRecoverableError!==void 0&&(D=a.onRecoverableError),a.formState!==void 0&&(j=a.formState)),n=l0(e,1,!0,n,a??null,o,u,j,d,S,D,x0),n.context=c0(null),a=n.current,o=Ri(),o=Ge(o),u=fs(o),u.callback=null,ds(a,u,o),a=o,n.current.lanes=a,Fn(n,a),ua(n),e[xn]=n.current,vd(e),new Pc(n)},pl.version="19.2.4",pl}var D0;function uM(){if(D0)return Hd.exports;D0=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Hd.exports=cM(),Hd.exports}var fM=uM();const dM=ax(fM);function hM(r,t,i){if(!r.length)return null;const[s,l,c]=i.map(yt=>Math.max(.2,yt)),f=_i(Math.max(s,l)*3,2,10),p=_i(c*2.5+1,2,8),m=_i(Math.max(s,l)*3.2,.55,1.25),h=yM(r,t[0],t[1],m,t[2]),_=pM(r,t,h,s,l,c,f,p);if(!_)return null;const v=mM(r,_,f,p);if(!v.length)return null;const g=gM(v,_,h,s,l,c),M=g.length>=3?g:v,E=N0(M,_,i,M===g?.92:1)??N0(M,_,i,M===g?1.12:1.35);if(!E||E.length<3)return null;const R=_M(E,_,h,s,l,c),x=R.length>=3?R:E,b=vM(x),L=xM(x,b),F=x.map(yt=>yt.z).sort((yt,B)=>yt-B),N=uo(F,.96),H=_i((x.length-4)/18,.24,1),z=h;let I=L.maxLongitudinal-L.minLongitudinal+.18,T=L.maxLateral-L.minLateral+.14;T>I&&([I,T]=[T,I]);const O=[jd(I,s,H,.72,1.55,.14),jd(T,l,H,.72,1.55,.14),jd(N-z+.08,c,H,.78,1.7,.18)],mt=(L.minLongitudinal+L.maxLongitudinal)*.5,V=(L.minLateral+L.maxLateral)*.5,J=Math.cos(L.yaw),at=Math.sin(L.yaw),st=L.meanX+mt*J-V*at,et=L.meanY+mt*at+V*J,P=z+O[2]*.5,G=Math.max(1e-4,L.maxLongitudinal-L.minLongitudinal),Y=Math.max(1e-4,L.maxLateral-L.minLateral),ot=Math.max(G,Y)/Math.max(1e-4,Math.min(G,Y));return{center_xyz:[st,et,P],size_lwh:O,yaw:ot<=1.28?0:rx(L.yaw),point_count:x.length,seed_point:_}}function pM(r,t,i,s,l,c,f,p){const m=[],h=Number.isFinite(t[2]),_=_i(Math.max(s,l)*2.8,.45,.95),v=_*_;for(const N of r){const H=N.x-t[0],z=N.y-t[1];if(Math.abs(H)>f||Math.abs(z)>f)continue;const I=N.z-t[2];h&&Math.abs(I)>p||m.push(N)}let g=null,M=Number.POSITIVE_INFINITY;for(const N of m){const H=N.x-t[0],z=N.y-t[1],I=H*H+z*z,T=N.z-t[2],O=I+(h?T*T*.3:0);O<M&&(M=O,g=N)}const E=m.filter(N=>{const H=N.x-t[0],z=N.y-t[1];return H*H+z*z<=v});if(!E.length)return g;const R=_i(Math.max(s,l)*1.35,.18,.4),x=R*R,b=Math.max(c*.12,.04);let L=null,F=Number.NEGATIVE_INFINITY;for(const N of E){let H=Number.POSITIVE_INFINITY,z=Number.NEGATIVE_INFINITY,I=0,T=0;for(const P of E){const G=P.x-N.x,Y=P.y-N.y;G*G+Y*Y>x||(I+=1,H=Math.min(H,P.z),z=Math.max(z,P.z),P.z>=i+b&&(T+=1))}const O=N.x-t[0],mt=N.y-t[1],V=O*O+mt*mt,J=N.z-i,at=N.z-H,st=z-H,et=Math.min(J,c*1.9)*2.1+Math.min(at,c*1.5)*1.4+Math.min(st,c*1.8)*1.1+Math.min(T,6)*.12+Math.min(I,8)*.03-V*9.5;et>F&&(F=et,L=N)}return L&&F>-.2?L:g}function mM(r,t,i,s){const l=[];for(let c=0;c<r.length;c+=1){const f=r[c];Math.abs(f.x-t.x)>i||Math.abs(f.y-t.y)>i||Math.abs(f.z-t.z)>s||l.push({index:c,point:f})}return l}function N0(r,t,i,s){const l=_i(Math.min(i[0],i[1])*.7,.3,.8),c=_i(i[2]*.5,.25,.9),f=l*s,p=c*s,m=f*f,h=new Map,_=L0(t,f,p);let v=-1;if(r.forEach((R,x)=>{const b=L0(R.point,f,p),L=h.get(b);L?L.push(x):h.set(b,[x]),v===-1&&R.point===t&&(v=x)}),v<0&&(v=(h.get(_)??[])[0]??-1),v<0)return null;const g=new Uint8Array(r.length),M=[v];g[v]=1;const E=[];for(;M.length>0;){const R=M.pop(),x=r[R].point;E.push(x);const[b,L,F]=sx(x,f,p);for(let N=-1;N<=1;N+=1)for(let H=-1;H<=1;H+=1)for(let z=-1;z<=1;z+=1){const I=h.get(`${b+N}:${L+H}:${F+z}`);if(I)for(const T of I){if(g[T])continue;const O=r[T].point,mt=O.x-x.x,V=O.y-x.y;mt*mt+V*V>m||Math.abs(O.z-x.z)>p||(g[T]=1,M.push(T))}}}return E}function gM(r,t,i,s,l,c){const f=_i(Math.max(s,l)*1.6,.2,.42),p=f*f,m=_i(Math.max(s,l)*2.1,.28,.58),h=m*m,_=_i(Math.max(s,l)*1.25,.16,.3),v=_*_,g=Math.max(c*.08,.035),M=[];for(const E of r){const R=E.point.x-t.x,x=E.point.y-t.y,b=R*R+x*x;if(b>h)continue;const L=E.point.z-i,F=b<=v?-.02:g;if(L<F)continue;let N=Number.POSITIVE_INFINITY,H=Number.NEGATIVE_INFINITY,z=0;for(const T of r){const O=T.point.x-E.point.x,mt=T.point.y-E.point.y;O*O+mt*mt>p||(z+=1,N=Math.min(N,T.point.z),H=Math.max(H,T.point.z))}const I=H-N;z<2&&L<g||I<Math.max(c*.18,.06)&&L<Math.max(c*.22,.06)||M.push(E)}return M}function _M(r,t,i,s,l,c){const f=_i(Math.max(s,l)*1.9,.24,.55),p=f*f,m=Math.max(c*.04,.015),h=r.filter(_=>{const v=_.x-t.x,g=_.y-t.y;return v*v+g*g<=p&&_.z>=i-m});return h.length>=3?h:r}function vM(r){if(r.length<2)return 0;let t=0,i=0;for(const m of r)t+=m.x,i+=m.y;t/=r.length,i/=r.length;let s=0,l=0,c=0;for(const m of r){const h=m.x-t,_=m.y-i;s+=h*h,l+=h*_,c+=_*_}const f=s+c;return f<1e-6||Math.hypot(s-c,2*l)/Math.max(f,1e-6)<.08?0:.5*Math.atan2(2*l,s-c)}function xM(r,t){const i=Math.cos(t),s=Math.sin(t);let l=0,c=0;for(const M of r)l+=M.x,c+=M.y;l/=r.length,c/=r.length;const f=[],p=[];for(const M of r){const E=M.x-l,R=M.y-c;f.push(E*i+R*s),p.push(-E*s+R*i)}f.sort((M,E)=>M-E),p.sort((M,E)=>M-E);let m=t,h=uo(f,.04),_=uo(f,.96),v=uo(p,.05),g=uo(p,.95);if(g-v>_-h){const M=h,E=_,R=v,x=g;m=rx(t+Math.PI*.5),h=R,_=x,v=-E,g=-M}return{yaw:m,meanX:l,meanY:c,minLongitudinal:h,maxLongitudinal:_,minLateral:v,maxLateral:g}}function jd(r,t,i,s,l,c){const f=t*(1-i)+r*i,p=Math.max(c,t*s),m=Math.max(p+.02,t*l);return _i(f,p,m)}function uo(r,t){if(!r.length)return 0;const i=_i(t,0,1),s=(r.length-1)*i,l=Math.floor(s),c=Math.ceil(s);if(l===c)return r[l];const f=s-l;return r[l]*(1-f)+r[c]*f}function yM(r,t,i,s,l){const c=s*s,f=[];for(const p of r){const m=p.x-t,h=p.y-i;m*m+h*h<=c&&f.push(p.z)}return f.length?(f.sort((p,m)=>p-m),uo(f,.16)):Number.isFinite(l)?l:0}function L0(r,t,i){const[s,l,c]=sx(r,t,i);return`${s}:${l}:${c}`}function sx(r,t,i){return[Math.floor(r.x/t),Math.floor(r.y/t),Math.floor(r.z/i)]}function rx(r){let t=r;for(;t>Math.PI;)t-=Math.PI*2;for(;t<=-Math.PI;)t+=Math.PI*2;return t}function _i(r,t,i){return Math.min(i,Math.max(t,r))}const Uu=typeof window<"u"&&"__TAURI_INTERNALS__"in window;let Uh=null;Uu&&tM(()=>import("./core-B5-l5hNl.js"),[]).then(r=>{Uh=r.invoke});const SM="/api";async function ei(r,t={}){if(Uu&&Uh)return Uh(`${r}_cmd`,t);const i=await fetch(`${SM}/${r}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!i.ok){const s=await i.text();throw new Error(`API error ${i.status}: ${s}`)}return i.json()}function MM(r){return ei("open_workspace",{workspace_path:r})}function Xd(r){return ei("inspect_workspace_target",{path:r})}function bM(r){return ei("inspect_training_target",{path:r})}function EM(r){return ei("open_training_root",{root_path:r})}function U0(r,t,i=18e4,s){return ei("load_frame",{workspace_path:r,frame_id:t,max_points:i,view_range:s??null})}function TM(r,t){return ei("save_annotation",{workspace_path:r,annotation:t})}function AM(r,t){return ei("save_classes",{workspace_path:r,classes:t})}function CM(r,t){return ei("save_settings",{workspace_path:r,settings:t})}function RM(r,t){return ei("save_training_settings",{root_path:r,settings:t})}function zc(r){return Uu?ei("pick_directory",{initialPath:r??null}):Promise.resolve(null)}function wM(r){return Uu?ei("pick_rosbag_directory",{initialPath:r??null}):Promise.resolve(null)}function O0(r){return ei("list_tasks",{workspace_path:r})}function DM(r,t={}){const i={workspace_path:r,reviewed_only:t.reviewedOnly??!1,annotated_only:t.annotatedOnly??!1,output_path:t.outputPath??null,frame_ids:t.frameIds??null,points_only:t.pointsOnly??!1};return ei("export_openpcdet",{...i})}function NM(r,t,i={}){return ei("package_groups",{bag_path:r,output_root:t,topic:i.topic??null,frame_step:i.frameStep??5,group_size:i.groupSize??20,replace_existing:i.replaceExisting??!0})}function LM(r){return ei("train_openpcdet",{root_path:r})}function UM(r,t){return ei("infer_range",{workspace_path:r,frame_ids:t})}const Dp="183",pa={ROTATE:0,DOLLY:1,PAN:2},fo={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},OM=0,P0=1,PM=2,xu=1,IM=2,Ml=3,Is=0,vi=1,Wa=2,Za=0,mo=1,I0=2,z0=3,F0=4,zM=5,rr=100,FM=101,BM=102,HM=103,GM=104,VM=200,kM=201,jM=202,XM=203,Oh=204,Ph=205,YM=206,WM=207,qM=208,ZM=209,KM=210,QM=211,JM=212,$M=213,tb=214,Ih=0,zh=1,Fh=2,vo=3,Bh=4,Hh=5,Gh=6,Vh=7,ox=0,eb=1,nb=2,_a=0,lx=1,cx=2,ux=3,fx=4,dx=5,hx=6,px=7,mx=300,fr=301,xo=302,Yd=303,Wd=304,Ou=306,kh=1e3,qa=1001,jh=1002,jn=1003,ib=1004,Fc=1005,Jn=1006,qd=1007,lr=1008,ki=1009,gx=1010,_x=1011,Al=1012,Np=1013,xa=1014,ma=1015,Qa=1016,Lp=1017,Up=1018,Cl=1020,vx=35902,xx=35899,yx=1021,Sx=1022,sa=1023,Ja=1026,cr=1027,Mx=1028,Op=1029,yo=1030,Pp=1031,Ip=1033,yu=33776,Su=33777,Mu=33778,bu=33779,Xh=35840,Yh=35841,Wh=35842,qh=35843,Zh=36196,Kh=37492,Qh=37496,Jh=37488,$h=37489,tp=37490,ep=37491,np=37808,ip=37809,ap=37810,sp=37811,rp=37812,op=37813,lp=37814,cp=37815,up=37816,fp=37817,dp=37818,hp=37819,pp=37820,mp=37821,gp=36492,_p=36494,vp=36495,xp=36283,yp=36284,Sp=36285,Mp=36286,ab=3200,sb=0,rb=1,Os="",Gi="srgb",So="srgb-linear",Au="linear",Je="srgb",Zr=7680,B0=519,ob=512,lb=513,cb=514,zp=515,ub=516,fb=517,Fp=518,db=519,H0=35044,G0="300 es",ga=2e3,Cu=2001;function hb(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Ru(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function pb(){const r=Ru("canvas");return r.style.display="block",r}const V0={};function k0(...r){const t="THREE."+r.shift();console.log(t,...r)}function bx(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function ge(...r){r=bx(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...r)}}function Ve(...r){r=bx(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...r)}}function wu(...r){const t=r.join(" ");t in V0||(V0[t]=!0,ge(...r))}function mb(r,t,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}const gb={[Ih]:zh,[Fh]:Gh,[Bh]:Vh,[vo]:Hh,[zh]:Ih,[Gh]:Fh,[Vh]:Bh,[Hh]:vo};class hr{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){const s=this._listeners;return s===void 0?!1:s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){const s=this._listeners;if(s===void 0)return;const l=s[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){const i=this._listeners;if(i===void 0)return;const s=i[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const Kn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let j0=1234567;const go=Math.PI/180,Rl=180/Math.PI;function bo(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Kn[r&255]+Kn[r>>8&255]+Kn[r>>16&255]+Kn[r>>24&255]+"-"+Kn[t&255]+Kn[t>>8&255]+"-"+Kn[t>>16&15|64]+Kn[t>>24&255]+"-"+Kn[i&63|128]+Kn[i>>8&255]+"-"+Kn[i>>16&255]+Kn[i>>24&255]+Kn[s&255]+Kn[s>>8&255]+Kn[s>>16&255]+Kn[s>>24&255]).toLowerCase()}function De(r,t,i){return Math.max(t,Math.min(i,r))}function Bp(r,t){return(r%t+t)%t}function _b(r,t,i,s,l){return s+(r-t)*(l-s)/(i-t)}function vb(r,t,i){return r!==t?(i-r)/(t-r):0}function El(r,t,i){return(1-i)*r+i*t}function xb(r,t,i,s){return El(r,t,1-Math.exp(-i*s))}function yb(r,t=1){return t-Math.abs(Bp(r,t*2)-t)}function Sb(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*(3-2*r))}function Mb(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*r*(r*(r*6-15)+10))}function bb(r,t){return r+Math.floor(Math.random()*(t-r+1))}function Eb(r,t){return r+Math.random()*(t-r)}function Tb(r){return r*(.5-Math.random())}function Ab(r){r!==void 0&&(j0=r);let t=j0+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Cb(r){return r*go}function Rb(r){return r*Rl}function wb(r){return(r&r-1)===0&&r!==0}function Db(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Nb(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Lb(r,t,i,s,l){const c=Math.cos,f=Math.sin,p=c(i/2),m=f(i/2),h=c((t+s)/2),_=f((t+s)/2),v=c((t-s)/2),g=f((t-s)/2),M=c((s-t)/2),E=f((s-t)/2);switch(l){case"XYX":r.set(p*_,m*v,m*g,p*h);break;case"YZY":r.set(m*g,p*_,m*v,p*h);break;case"ZXZ":r.set(m*v,m*g,p*_,p*h);break;case"XZX":r.set(p*_,m*E,m*M,p*h);break;case"YXY":r.set(m*M,p*_,m*E,p*h);break;case"ZYZ":r.set(m*E,m*M,p*_,p*h);break;default:ge("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function co(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ii(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Ex={DEG2RAD:go,RAD2DEG:Rl,generateUUID:bo,clamp:De,euclideanModulo:Bp,mapLinear:_b,inverseLerp:vb,lerp:El,damp:xb,pingpong:yb,smoothstep:Sb,smootherstep:Mb,randInt:bb,randFloat:Eb,randFloatSpread:Tb,seededRandom:Ab,degToRad:Cb,radToDeg:Rb,isPowerOfTwo:wb,ceilPowerOfTwo:Db,floorPowerOfTwo:Nb,setQuaternionFromProperEuler:Lb,normalize:ii,denormalize:co};class Re{constructor(t=0,i=0){Re.prototype.isVector2=!0,this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=De(this.x,t.x,i.x),this.y=De(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=De(this.x,t,i),this.y=De(this.y,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(De(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(De(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-t.x,f=this.y-t.y;return this.x=c*s-f*l+t.x,this.y=c*l+f*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class zs{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,c,f,p){let m=s[l+0],h=s[l+1],_=s[l+2],v=s[l+3],g=c[f+0],M=c[f+1],E=c[f+2],R=c[f+3];if(v!==R||m!==g||h!==M||_!==E){let x=m*g+h*M+_*E+v*R;x<0&&(g=-g,M=-M,E=-E,R=-R,x=-x);let b=1-p;if(x<.9995){const L=Math.acos(x),F=Math.sin(L);b=Math.sin(b*L)/F,p=Math.sin(p*L)/F,m=m*b+g*p,h=h*b+M*p,_=_*b+E*p,v=v*b+R*p}else{m=m*b+g*p,h=h*b+M*p,_=_*b+E*p,v=v*b+R*p;const L=1/Math.sqrt(m*m+h*h+_*_+v*v);m*=L,h*=L,_*=L,v*=L}}t[i]=m,t[i+1]=h,t[i+2]=_,t[i+3]=v}static multiplyQuaternionsFlat(t,i,s,l,c,f){const p=s[l],m=s[l+1],h=s[l+2],_=s[l+3],v=c[f],g=c[f+1],M=c[f+2],E=c[f+3];return t[i]=p*E+_*v+m*M-h*g,t[i+1]=m*E+_*g+h*v-p*M,t[i+2]=h*E+_*M+p*g-m*v,t[i+3]=_*E-p*v-m*g-h*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,c=t._z,f=t._order,p=Math.cos,m=Math.sin,h=p(s/2),_=p(l/2),v=p(c/2),g=m(s/2),M=m(l/2),E=m(c/2);switch(f){case"XYZ":this._x=g*_*v+h*M*E,this._y=h*M*v-g*_*E,this._z=h*_*E+g*M*v,this._w=h*_*v-g*M*E;break;case"YXZ":this._x=g*_*v+h*M*E,this._y=h*M*v-g*_*E,this._z=h*_*E-g*M*v,this._w=h*_*v+g*M*E;break;case"ZXY":this._x=g*_*v-h*M*E,this._y=h*M*v+g*_*E,this._z=h*_*E+g*M*v,this._w=h*_*v-g*M*E;break;case"ZYX":this._x=g*_*v-h*M*E,this._y=h*M*v+g*_*E,this._z=h*_*E-g*M*v,this._w=h*_*v+g*M*E;break;case"YZX":this._x=g*_*v+h*M*E,this._y=h*M*v+g*_*E,this._z=h*_*E-g*M*v,this._w=h*_*v-g*M*E;break;case"XZY":this._x=g*_*v-h*M*E,this._y=h*M*v-g*_*E,this._z=h*_*E+g*M*v,this._w=h*_*v+g*M*E;break;default:ge("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],c=i[8],f=i[1],p=i[5],m=i[9],h=i[2],_=i[6],v=i[10],g=s+p+v;if(g>0){const M=.5/Math.sqrt(g+1);this._w=.25/M,this._x=(_-m)*M,this._y=(c-h)*M,this._z=(f-l)*M}else if(s>p&&s>v){const M=2*Math.sqrt(1+s-p-v);this._w=(_-m)/M,this._x=.25*M,this._y=(l+f)/M,this._z=(c+h)/M}else if(p>v){const M=2*Math.sqrt(1+p-s-v);this._w=(c-h)/M,this._x=(l+f)/M,this._y=.25*M,this._z=(m+_)/M}else{const M=2*Math.sqrt(1+v-s-p);this._w=(f-l)/M,this._x=(c+h)/M,this._y=(m+_)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<1e-8?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(De(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,c=t._z,f=t._w,p=i._x,m=i._y,h=i._z,_=i._w;return this._x=s*_+f*p+l*h-c*m,this._y=l*_+f*m+c*p-s*h,this._z=c*_+f*h+s*m-l*p,this._w=f*_-s*p-l*m-c*h,this._onChangeCallback(),this}slerp(t,i){let s=t._x,l=t._y,c=t._z,f=t._w,p=this.dot(t);p<0&&(s=-s,l=-l,c=-c,f=-f,p=-p);let m=1-i;if(p<.9995){const h=Math.acos(p),_=Math.sin(h);m=Math.sin(m*h)/_,i=Math.sin(i*h)/_,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this.normalize();return this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class it{constructor(t=0,i=0,s=0){it.prototype.isVector3=!0,this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(X0.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(X0.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=t.elements,f=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,c=t.x,f=t.y,p=t.z,m=t.w,h=2*(f*l-p*s),_=2*(p*i-c*l),v=2*(c*s-f*i);return this.x=i+m*h+f*v-p*_,this.y=s+m*_+p*h-c*v,this.z=l+m*v+c*_-f*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=De(this.x,t.x,i.x),this.y=De(this.y,t.y,i.y),this.z=De(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=De(this.x,t,i),this.y=De(this.y,t,i),this.z=De(this.z,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(De(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,c=t.z,f=i.x,p=i.y,m=i.z;return this.x=l*m-c*p,this.y=c*f-s*m,this.z=s*p-l*f,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return Zd.copy(this).projectOnVector(t),this.sub(Zd)}reflect(t){return this.sub(Zd.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(De(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zd=new it,X0=new zs;class Te{constructor(t,i,s,l,c,f,p,m,h){Te.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,f,p,m,h)}set(t,i,s,l,c,f,p,m,h){const _=this.elements;return _[0]=t,_[1]=l,_[2]=p,_[3]=i,_[4]=c,_[5]=m,_[6]=s,_[7]=f,_[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,f=s[0],p=s[3],m=s[6],h=s[1],_=s[4],v=s[7],g=s[2],M=s[5],E=s[8],R=l[0],x=l[3],b=l[6],L=l[1],F=l[4],N=l[7],H=l[2],z=l[5],I=l[8];return c[0]=f*R+p*L+m*H,c[3]=f*x+p*F+m*z,c[6]=f*b+p*N+m*I,c[1]=h*R+_*L+v*H,c[4]=h*x+_*F+v*z,c[7]=h*b+_*N+v*I,c[2]=g*R+M*L+E*H,c[5]=g*x+M*F+E*z,c[8]=g*b+M*N+E*I,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],f=t[4],p=t[5],m=t[6],h=t[7],_=t[8];return i*f*_-i*p*h-s*c*_+s*p*m+l*c*h-l*f*m}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],f=t[4],p=t[5],m=t[6],h=t[7],_=t[8],v=_*f-p*h,g=p*m-_*c,M=h*c-f*m,E=i*v+s*g+l*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const R=1/E;return t[0]=v*R,t[1]=(l*h-_*s)*R,t[2]=(p*s-l*f)*R,t[3]=g*R,t[4]=(_*i-l*m)*R,t[5]=(l*c-p*i)*R,t[6]=M*R,t[7]=(s*m-h*i)*R,t[8]=(f*i-s*c)*R,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,c,f,p){const m=Math.cos(c),h=Math.sin(c);return this.set(s*m,s*h,-s*(m*f+h*p)+f+t,-l*h,l*m,-l*(-h*f+m*p)+p+i,0,0,1),this}scale(t,i){return this.premultiply(Kd.makeScale(t,i)),this}rotate(t){return this.premultiply(Kd.makeRotation(-t)),this}translate(t,i){return this.premultiply(Kd.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Kd=new Te,Y0=new Te().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),W0=new Te().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ub(){const r={enabled:!0,workingColorSpace:So,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===Je&&(l.r=Ka(l.r),l.g=Ka(l.g),l.b=Ka(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===Je&&(l.r=_o(l.r),l.g=_o(l.g),l.b=_o(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Os?Au:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return wu("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return wu("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[So]:{primaries:t,whitePoint:s,transfer:Au,toXYZ:Y0,fromXYZ:W0,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Gi},outputColorSpaceConfig:{drawingBufferColorSpace:Gi}},[Gi]:{primaries:t,whitePoint:s,transfer:Je,toXYZ:Y0,fromXYZ:W0,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Gi}}}),r}const ke=Ub();function Ka(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function _o(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Kr;class Ob{static getDataURL(t,i="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let s;if(t instanceof HTMLCanvasElement)s=t;else{Kr===void 0&&(Kr=Ru("canvas")),Kr.width=t.width,Kr.height=t.height;const l=Kr.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),s=Kr}return s.toDataURL(i)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=Ru("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Ka(c[f]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Ka(i[s]/255)*255):i[s]=Ka(i[s]);return{data:i,width:t.width,height:t.height}}else return ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Pb=0;class Hp{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Pb++}),this.uuid=bo(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?t.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?t.set(i.displayHeight,i.displayWidth,0):i!==null?t.set(i.width,i.height,i.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,p=l.length;f<p;f++)l[f].isDataTexture?c.push(Qd(l[f].image)):c.push(Qd(l[f]))}else c=Qd(l);s.url=c}return i||(t.images[this.uuid]=s),s}}function Qd(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ob.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(ge("Texture: Unable to serialize Texture."),{})}let Ib=0;const Jd=new it;class ri extends hr{constructor(t=ri.DEFAULT_IMAGE,i=ri.DEFAULT_MAPPING,s=qa,l=qa,c=Jn,f=lr,p=sa,m=ki,h=ri.DEFAULT_ANISOTROPY,_=Os){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ib++}),this.uuid=bo(),this.name="",this.source=new Hp(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=h,this.format=p,this.internalFormat=null,this.type=m,this.offset=new Re(0,0),this.repeat=new Re(1,1),this.center=new Re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Te,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Jd).x}get height(){return this.source.getSize(Jd).y}get depth(){return this.source.getSize(Jd).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const i in t){const s=t[i];if(s===void 0){ge(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ge(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==mx)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case kh:t.x=t.x-Math.floor(t.x);break;case qa:t.x=t.x<0?0:1;break;case jh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case kh:t.y=t.y-Math.floor(t.y);break;case qa:t.y=t.y<0?0:1;break;case jh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ri.DEFAULT_IMAGE=null;ri.DEFAULT_MAPPING=mx;ri.DEFAULT_ANISOTROPY=1;class bn{constructor(t=0,i=0,s=0,l=1){bn.prototype.isVector4=!0,this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*i+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*s+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,c;const m=t.elements,h=m[0],_=m[4],v=m[8],g=m[1],M=m[5],E=m[9],R=m[2],x=m[6],b=m[10];if(Math.abs(_-g)<.01&&Math.abs(v-R)<.01&&Math.abs(E-x)<.01){if(Math.abs(_+g)<.1&&Math.abs(v+R)<.1&&Math.abs(E+x)<.1&&Math.abs(h+M+b-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const F=(h+1)/2,N=(M+1)/2,H=(b+1)/2,z=(_+g)/4,I=(v+R)/4,T=(E+x)/4;return F>N&&F>H?F<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(F),l=z/s,c=I/s):N>H?N<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(N),s=z/l,c=T/l):H<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(H),s=I/c,l=T/c),this.set(s,l,c,i),this}let L=Math.sqrt((x-E)*(x-E)+(v-R)*(v-R)+(g-_)*(g-_));return Math.abs(L)<.001&&(L=1),this.x=(x-E)/L,this.y=(v-R)/L,this.z=(g-_)/L,this.w=Math.acos((h+M+b-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=De(this.x,t.x,i.x),this.y=De(this.y,t.y,i.y),this.z=De(this.z,t.z,i.z),this.w=De(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=De(this.x,t,i),this.y=De(this.y,t,i),this.z=De(this.z,t,i),this.w=De(this.w,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(De(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zb extends hr{constructor(t=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=s.depth,this.scissor=new bn(0,0,t,i),this.scissorTest=!1,this.viewport=new bn(0,0,t,i),this.textures=[];const l={width:t,height:i,depth:s.depth},c=new ri(l),f=s.count;for(let p=0;p<f;p++)this.textures[p]=c.clone(),this.textures[p].isRenderTargetTexture=!0,this.textures[p].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(t={}){const i={minFilter:Jn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(i.mapping=t.mapping),t.wrapS!==void 0&&(i.wrapS=t.wrapS),t.wrapT!==void 0&&(i.wrapT=t.wrapT),t.wrapR!==void 0&&(i.wrapR=t.wrapR),t.magFilter!==void 0&&(i.magFilter=t.magFilter),t.minFilter!==void 0&&(i.minFilter=t.minFilter),t.format!==void 0&&(i.format=t.format),t.type!==void 0&&(i.type=t.type),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(i.colorSpace=t.colorSpace),t.flipY!==void 0&&(i.flipY=t.flipY),t.generateMipmaps!==void 0&&(i.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(i.internalFormat=t.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++){this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},t.textures[i].image);this.textures[i].source=new Hp(l)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class va extends zb{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class Tx extends ri{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=jn,this.minFilter=jn,this.wrapR=qa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fb extends ri{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=jn,this.minFilter=jn,this.wrapR=qa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pn{constructor(t,i,s,l,c,f,p,m,h,_,v,g,M,E,R,x){pn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,f,p,m,h,_,v,g,M,E,R,x)}set(t,i,s,l,c,f,p,m,h,_,v,g,M,E,R,x){const b=this.elements;return b[0]=t,b[4]=i,b[8]=s,b[12]=l,b[1]=c,b[5]=f,b[9]=p,b[13]=m,b[2]=h,b[6]=_,b[10]=v,b[14]=g,b[3]=M,b[7]=E,b[11]=R,b[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pn().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return this.determinant()===0?(t.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const i=this.elements,s=t.elements,l=1/Qr.setFromMatrixColumn(t,0).length(),c=1/Qr.setFromMatrixColumn(t,1).length(),f=1/Qr.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*f,i[9]=s[9]*f,i[10]=s[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,c=t.z,f=Math.cos(s),p=Math.sin(s),m=Math.cos(l),h=Math.sin(l),_=Math.cos(c),v=Math.sin(c);if(t.order==="XYZ"){const g=f*_,M=f*v,E=p*_,R=p*v;i[0]=m*_,i[4]=-m*v,i[8]=h,i[1]=M+E*h,i[5]=g-R*h,i[9]=-p*m,i[2]=R-g*h,i[6]=E+M*h,i[10]=f*m}else if(t.order==="YXZ"){const g=m*_,M=m*v,E=h*_,R=h*v;i[0]=g+R*p,i[4]=E*p-M,i[8]=f*h,i[1]=f*v,i[5]=f*_,i[9]=-p,i[2]=M*p-E,i[6]=R+g*p,i[10]=f*m}else if(t.order==="ZXY"){const g=m*_,M=m*v,E=h*_,R=h*v;i[0]=g-R*p,i[4]=-f*v,i[8]=E+M*p,i[1]=M+E*p,i[5]=f*_,i[9]=R-g*p,i[2]=-f*h,i[6]=p,i[10]=f*m}else if(t.order==="ZYX"){const g=f*_,M=f*v,E=p*_,R=p*v;i[0]=m*_,i[4]=E*h-M,i[8]=g*h+R,i[1]=m*v,i[5]=R*h+g,i[9]=M*h-E,i[2]=-h,i[6]=p*m,i[10]=f*m}else if(t.order==="YZX"){const g=f*m,M=f*h,E=p*m,R=p*h;i[0]=m*_,i[4]=R-g*v,i[8]=E*v+M,i[1]=v,i[5]=f*_,i[9]=-p*_,i[2]=-h*_,i[6]=M*v+E,i[10]=g-R*v}else if(t.order==="XZY"){const g=f*m,M=f*h,E=p*m,R=p*h;i[0]=m*_,i[4]=-v,i[8]=h*_,i[1]=g*v+R,i[5]=f*_,i[9]=M*v-E,i[2]=E*v-M,i[6]=p*_,i[10]=R*v+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Bb,t,Hb)}lookAt(t,i,s){const l=this.elements;return wi.subVectors(t,i),wi.lengthSq()===0&&(wi.z=1),wi.normalize(),Rs.crossVectors(s,wi),Rs.lengthSq()===0&&(Math.abs(s.z)===1?wi.x+=1e-4:wi.z+=1e-4,wi.normalize(),Rs.crossVectors(s,wi)),Rs.normalize(),Bc.crossVectors(wi,Rs),l[0]=Rs.x,l[4]=Bc.x,l[8]=wi.x,l[1]=Rs.y,l[5]=Bc.y,l[9]=wi.y,l[2]=Rs.z,l[6]=Bc.z,l[10]=wi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,f=s[0],p=s[4],m=s[8],h=s[12],_=s[1],v=s[5],g=s[9],M=s[13],E=s[2],R=s[6],x=s[10],b=s[14],L=s[3],F=s[7],N=s[11],H=s[15],z=l[0],I=l[4],T=l[8],O=l[12],mt=l[1],V=l[5],J=l[9],at=l[13],st=l[2],et=l[6],P=l[10],G=l[14],Y=l[3],ot=l[7],yt=l[11],B=l[15];return c[0]=f*z+p*mt+m*st+h*Y,c[4]=f*I+p*V+m*et+h*ot,c[8]=f*T+p*J+m*P+h*yt,c[12]=f*O+p*at+m*G+h*B,c[1]=_*z+v*mt+g*st+M*Y,c[5]=_*I+v*V+g*et+M*ot,c[9]=_*T+v*J+g*P+M*yt,c[13]=_*O+v*at+g*G+M*B,c[2]=E*z+R*mt+x*st+b*Y,c[6]=E*I+R*V+x*et+b*ot,c[10]=E*T+R*J+x*P+b*yt,c[14]=E*O+R*at+x*G+b*B,c[3]=L*z+F*mt+N*st+H*Y,c[7]=L*I+F*V+N*et+H*ot,c[11]=L*T+F*J+N*P+H*yt,c[15]=L*O+F*at+N*G+H*B,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[12],f=t[1],p=t[5],m=t[9],h=t[13],_=t[2],v=t[6],g=t[10],M=t[14],E=t[3],R=t[7],x=t[11],b=t[15],L=m*M-h*g,F=p*M-h*v,N=p*g-m*v,H=f*M-h*_,z=f*g-m*_,I=f*v-p*_;return i*(R*L-x*F+b*N)-s*(E*L-x*H+b*z)+l*(E*F-R*H+b*I)-c*(E*N-R*z+x*I)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],f=t[4],p=t[5],m=t[6],h=t[7],_=t[8],v=t[9],g=t[10],M=t[11],E=t[12],R=t[13],x=t[14],b=t[15],L=i*p-s*f,F=i*m-l*f,N=i*h-c*f,H=s*m-l*p,z=s*h-c*p,I=l*h-c*m,T=_*R-v*E,O=_*x-g*E,mt=_*b-M*E,V=v*x-g*R,J=v*b-M*R,at=g*b-M*x,st=L*at-F*J+N*V+H*mt-z*O+I*T;if(st===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const et=1/st;return t[0]=(p*at-m*J+h*V)*et,t[1]=(l*J-s*at-c*V)*et,t[2]=(R*I-x*z+b*H)*et,t[3]=(g*z-v*I-M*H)*et,t[4]=(m*mt-f*at-h*O)*et,t[5]=(i*at-l*mt+c*O)*et,t[6]=(x*N-E*I-b*F)*et,t[7]=(_*I-g*N+M*F)*et,t[8]=(f*J-p*mt+h*T)*et,t[9]=(s*mt-i*J-c*T)*et,t[10]=(E*z-R*N+b*L)*et,t[11]=(v*N-_*z-M*L)*et,t[12]=(p*O-f*V-m*T)*et,t[13]=(i*V-s*O+l*T)*et,t[14]=(R*F-E*H-x*L)*et,t[15]=(_*H-v*F+g*L)*et,this}scale(t){const i=this.elements,s=t.x,l=t.y,c=t.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,f=t.x,p=t.y,m=t.z,h=c*f,_=c*p;return this.set(h*f+s,h*p-l*m,h*m+l*p,0,h*p+l*m,_*p+s,_*m-l*f,0,h*m-l*p,_*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,c,f){return this.set(1,s,c,0,t,1,f,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,c=i._x,f=i._y,p=i._z,m=i._w,h=c+c,_=f+f,v=p+p,g=c*h,M=c*_,E=c*v,R=f*_,x=f*v,b=p*v,L=m*h,F=m*_,N=m*v,H=s.x,z=s.y,I=s.z;return l[0]=(1-(R+b))*H,l[1]=(M+N)*H,l[2]=(E-F)*H,l[3]=0,l[4]=(M-N)*z,l[5]=(1-(g+b))*z,l[6]=(x+L)*z,l[7]=0,l[8]=(E+F)*I,l[9]=(x-L)*I,l[10]=(1-(g+R))*I,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;t.x=l[12],t.y=l[13],t.z=l[14];const c=this.determinant();if(c===0)return s.set(1,1,1),i.identity(),this;let f=Qr.set(l[0],l[1],l[2]).length();const p=Qr.set(l[4],l[5],l[6]).length(),m=Qr.set(l[8],l[9],l[10]).length();c<0&&(f=-f),ta.copy(this);const h=1/f,_=1/p,v=1/m;return ta.elements[0]*=h,ta.elements[1]*=h,ta.elements[2]*=h,ta.elements[4]*=_,ta.elements[5]*=_,ta.elements[6]*=_,ta.elements[8]*=v,ta.elements[9]*=v,ta.elements[10]*=v,i.setFromRotationMatrix(ta),s.x=f,s.y=p,s.z=m,this}makePerspective(t,i,s,l,c,f,p=ga,m=!1){const h=this.elements,_=2*c/(i-t),v=2*c/(s-l),g=(i+t)/(i-t),M=(s+l)/(s-l);let E,R;if(m)E=c/(f-c),R=f*c/(f-c);else if(p===ga)E=-(f+c)/(f-c),R=-2*f*c/(f-c);else if(p===Cu)E=-f/(f-c),R=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+p);return h[0]=_,h[4]=0,h[8]=g,h[12]=0,h[1]=0,h[5]=v,h[9]=M,h[13]=0,h[2]=0,h[6]=0,h[10]=E,h[14]=R,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,i,s,l,c,f,p=ga,m=!1){const h=this.elements,_=2/(i-t),v=2/(s-l),g=-(i+t)/(i-t),M=-(s+l)/(s-l);let E,R;if(m)E=1/(f-c),R=f/(f-c);else if(p===ga)E=-2/(f-c),R=-(f+c)/(f-c);else if(p===Cu)E=-1/(f-c),R=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+p);return h[0]=_,h[4]=0,h[8]=0,h[12]=g,h[1]=0,h[5]=v,h[9]=0,h[13]=M,h[2]=0,h[6]=0,h[10]=E,h[14]=R,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}}const Qr=new it,ta=new pn,Bb=new it(0,0,0),Hb=new it(1,1,1),Rs=new it,Bc=new it,wi=new it,q0=new pn,Z0=new zs;class $a{constructor(t=0,i=0,s=0,l=$a.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,c=l[0],f=l[4],p=l[8],m=l[1],h=l[5],_=l[9],v=l[2],g=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(De(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-_,M),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(g,h),this._z=0);break;case"YXZ":this._x=Math.asin(-De(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(p,M),this._z=Math.atan2(m,h)):(this._y=Math.atan2(-v,c),this._z=0);break;case"ZXY":this._x=Math.asin(De(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-v,M),this._z=Math.atan2(-f,h)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-De(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(g,M),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,h));break;case"YZX":this._z=Math.asin(De(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-_,h),this._y=Math.atan2(-v,c)):(this._x=0,this._y=Math.atan2(p,M));break;case"XZY":this._z=Math.asin(-De(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(g,h),this._y=Math.atan2(p,c)):(this._x=Math.atan2(-_,M),this._y=0);break;default:ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return q0.makeRotationFromQuaternion(t),this.setFromRotationMatrix(q0,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return Z0.setFromEuler(this),this.setFromQuaternion(Z0,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$a.DEFAULT_ORDER="XYZ";class Gp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Gb=0;const K0=new it,Jr=new zs,Va=new pn,Hc=new it,ml=new it,Vb=new it,kb=new zs,Q0=new it(1,0,0),J0=new it(0,1,0),$0=new it(0,0,1),tv={type:"added"},jb={type:"removed"},$r={type:"childadded",child:null},$d={type:"childremoved",child:null};class $n extends hr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gb++}),this.uuid=bo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$n.DEFAULT_UP.clone();const t=new it,i=new $a,s=new zs,l=new it(1,1,1);function c(){s.setFromEuler(i,!1)}function f(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new pn},normalMatrix:{value:new Te}}),this.matrix=new pn,this.matrixWorld=new pn,this.matrixAutoUpdate=$n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Jr.setFromAxisAngle(t,i),this.quaternion.multiply(Jr),this}rotateOnWorldAxis(t,i){return Jr.setFromAxisAngle(t,i),this.quaternion.premultiply(Jr),this}rotateX(t){return this.rotateOnAxis(Q0,t)}rotateY(t){return this.rotateOnAxis(J0,t)}rotateZ(t){return this.rotateOnAxis($0,t)}translateOnAxis(t,i){return K0.copy(t).applyQuaternion(this.quaternion),this.position.add(K0.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(Q0,t)}translateY(t){return this.translateOnAxis(J0,t)}translateZ(t){return this.translateOnAxis($0,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Va.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?Hc.copy(t):Hc.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),ml.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Va.lookAt(ml,Hc,this.up):Va.lookAt(Hc,ml,this.up),this.quaternion.setFromRotationMatrix(Va),l&&(Va.extractRotation(l.matrixWorld),Jr.setFromRotationMatrix(Va),this.quaternion.premultiply(Jr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Ve("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(tv),$r.child=t,this.dispatchEvent($r),$r.child=null):Ve("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(jb),$d.child=t,this.dispatchEvent($d),$d.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Va.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Va.multiply(t.parent.matrixWorld)),t.applyMatrix4(Va),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(tv),$r.child=t,this.dispatchEvent($r),$r.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(t,i);if(f!==void 0)return f}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ml,t,Vb),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ml,kb,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const i=t.x,s=t.y,l=t.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*s-c[8]*l,c[13]+=s-c[1]*i-c[5]*s-c[9]*l,c[14]+=l-c[2]*i-c[6]*s-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(p=>({...p,boundingBox:p.boundingBox?p.boundingBox.toJSON():void 0,boundingSphere:p.boundingSphere?p.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(p=>({...p})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(p,m){return p[m.uuid]===void 0&&(p[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const p=this.geometry.parameters;if(p!==void 0&&p.shapes!==void 0){const m=p.shapes;if(Array.isArray(m))for(let h=0,_=m.length;h<_;h++){const v=m[h];c(t.shapes,v)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const p=[];for(let m=0,h=this.material.length;m<h;m++)p.push(c(t.materials,this.material[m]));l.material=p}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let p=0;p<this.children.length;p++)l.children.push(this.children[p].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let p=0;p<this.animations.length;p++){const m=this.animations[p];l.animations.push(c(t.animations,m))}}if(i){const p=f(t.geometries),m=f(t.materials),h=f(t.textures),_=f(t.images),v=f(t.shapes),g=f(t.skeletons),M=f(t.animations),E=f(t.nodes);p.length>0&&(s.geometries=p),m.length>0&&(s.materials=m),h.length>0&&(s.textures=h),_.length>0&&(s.images=_),v.length>0&&(s.shapes=v),g.length>0&&(s.skeletons=g),M.length>0&&(s.animations=M),E.length>0&&(s.nodes=E)}return s.object=l,s;function f(p){const m=[];for(const h in p){const _=p[h];delete _.metadata,m.push(_)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}$n.DEFAULT_UP=new it(0,1,0);$n.DEFAULT_MATRIX_AUTO_UPDATE=!0;$n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ho extends $n{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Xb={type:"move"};class th{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ho,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ho,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new it,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new it),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ho,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new it,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new it),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,c=null,f=null;const p=this._targetRay,m=this._grip,h=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(h&&t.hand){f=!0;for(const R of t.hand.values()){const x=i.getJointPose(R,s),b=this._getHandJoint(h,R);x!==null&&(b.matrix.fromArray(x.transform.matrix),b.matrix.decompose(b.position,b.rotation,b.scale),b.matrixWorldNeedsUpdate=!0,b.jointRadius=x.radius),b.visible=x!==null}const _=h.joints["index-finger-tip"],v=h.joints["thumb-tip"],g=_.position.distanceTo(v.position),M=.02,E=.005;h.inputState.pinching&&g>M+E?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&g<=M-E&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));p!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(Xb)))}return p!==null&&(p.visible=l!==null),m!==null&&(m.visible=c!==null),h!==null&&(h.visible=f!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new ho;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}const Ax={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ws={h:0,s:0,l:0},Gc={h:0,s:0,l:0};function eh(r,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(t-r)*6*i:i<1/2?t:i<2/3?r+(t-r)*6*(2/3-i):r}class ze{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=Gi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ke.colorSpaceToWorking(this,i),this}setRGB(t,i,s,l=ke.workingColorSpace){return this.r=t,this.g=i,this.b=s,ke.colorSpaceToWorking(this,l),this}setHSL(t,i,s,l=ke.workingColorSpace){if(t=Bp(t,1),i=De(i,0,1),s=De(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,f=2*s-c;this.r=eh(f,c,t+1/3),this.g=eh(f,c,t),this.b=eh(f,c,t-1/3)}return ke.colorSpaceToWorking(this,l),this}setStyle(t,i=Gi){function s(c){c!==void 0&&parseFloat(c)<1&&ge("Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],p=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:ge("Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);ge("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=Gi){const s=Ax[t.toLowerCase()];return s!==void 0?this.setHex(s,i):ge("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ka(t.r),this.g=Ka(t.g),this.b=Ka(t.b),this}copyLinearToSRGB(t){return this.r=_o(t.r),this.g=_o(t.g),this.b=_o(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Gi){return ke.workingToColorSpace(Qn.copy(this),t),Math.round(De(Qn.r*255,0,255))*65536+Math.round(De(Qn.g*255,0,255))*256+Math.round(De(Qn.b*255,0,255))}getHexString(t=Gi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=ke.workingColorSpace){ke.workingToColorSpace(Qn.copy(this),i);const s=Qn.r,l=Qn.g,c=Qn.b,f=Math.max(s,l,c),p=Math.min(s,l,c);let m,h;const _=(p+f)/2;if(p===f)m=0,h=0;else{const v=f-p;switch(h=_<=.5?v/(f+p):v/(2-f-p),f){case s:m=(l-c)/v+(l<c?6:0);break;case l:m=(c-s)/v+2;break;case c:m=(s-l)/v+4;break}m/=6}return t.h=m,t.s=h,t.l=_,t}getRGB(t,i=ke.workingColorSpace){return ke.workingToColorSpace(Qn.copy(this),i),t.r=Qn.r,t.g=Qn.g,t.b=Qn.b,t}getStyle(t=Gi){ke.workingToColorSpace(Qn.copy(this),t);const i=Qn.r,s=Qn.g,l=Qn.b;return t!==Gi?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL(ws),this.setHSL(ws.h+t,ws.s+i,ws.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL(ws),t.getHSL(Gc);const s=El(ws.h,Gc.h,i),l=El(ws.s,Gc.s,i),c=El(ws.l,Gc.l,i);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qn=new ze;ze.NAMES=Ax;class Yb extends $n{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $a,this.environmentIntensity=1,this.environmentRotation=new $a,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const ea=new it,ka=new it,nh=new it,ja=new it,to=new it,eo=new it,ev=new it,ih=new it,ah=new it,sh=new it,rh=new bn,oh=new bn,lh=new bn;class ji{constructor(t=new it,i=new it,s=new it){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),ea.subVectors(t,i),l.cross(ea);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,s,l,c){ea.subVectors(l,i),ka.subVectors(s,i),nh.subVectors(t,i);const f=ea.dot(ea),p=ea.dot(ka),m=ea.dot(nh),h=ka.dot(ka),_=ka.dot(nh),v=f*h-p*p;if(v===0)return c.set(0,0,0),null;const g=1/v,M=(h*m-p*_)*g,E=(f*_-p*m)*g;return c.set(1-M-E,E,M)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,ja)===null?!1:ja.x>=0&&ja.y>=0&&ja.x+ja.y<=1}static getInterpolation(t,i,s,l,c,f,p,m){return this.getBarycoord(t,i,s,l,ja)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,ja.x),m.addScaledVector(f,ja.y),m.addScaledVector(p,ja.z),m)}static getInterpolatedAttribute(t,i,s,l,c,f){return rh.setScalar(0),oh.setScalar(0),lh.setScalar(0),rh.fromBufferAttribute(t,i),oh.fromBufferAttribute(t,s),lh.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(rh,c.x),f.addScaledVector(oh,c.y),f.addScaledVector(lh,c.z),f}static isFrontFacing(t,i,s,l){return ea.subVectors(s,i),ka.subVectors(t,i),ea.cross(ka).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ea.subVectors(this.c,this.b),ka.subVectors(this.a,this.b),ea.cross(ka).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ji.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return ji.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,c){return ji.getInterpolation(t,this.a,this.b,this.c,i,s,l,c)}containsPoint(t){return ji.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ji.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,c=this.c;let f,p;to.subVectors(l,s),eo.subVectors(c,s),ih.subVectors(t,s);const m=to.dot(ih),h=eo.dot(ih);if(m<=0&&h<=0)return i.copy(s);ah.subVectors(t,l);const _=to.dot(ah),v=eo.dot(ah);if(_>=0&&v<=_)return i.copy(l);const g=m*v-_*h;if(g<=0&&m>=0&&_<=0)return f=m/(m-_),i.copy(s).addScaledVector(to,f);sh.subVectors(t,c);const M=to.dot(sh),E=eo.dot(sh);if(E>=0&&M<=E)return i.copy(c);const R=M*h-m*E;if(R<=0&&h>=0&&E<=0)return p=h/(h-E),i.copy(s).addScaledVector(eo,p);const x=_*E-M*v;if(x<=0&&v-_>=0&&M-E>=0)return ev.subVectors(c,l),p=(v-_)/(v-_+(M-E)),i.copy(l).addScaledVector(ev,p);const b=1/(x+R+g);return f=R*b,p=g*b,i.copy(s).addScaledVector(to,f).addScaledVector(eo,p)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class dr{constructor(t=new it(1/0,1/0,1/0),i=new it(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(na.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(na.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=na.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,p=c.count;f<p;f++)t.isMesh===!0?t.getVertexPosition(f,na):na.fromBufferAttribute(c,f),na.applyMatrix4(t.matrixWorld),this.expandByPoint(na);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Vc.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Vc.copy(s.boundingBox)),Vc.applyMatrix4(t.matrixWorld),this.union(Vc)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,na),na.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(gl),kc.subVectors(this.max,gl),no.subVectors(t.a,gl),io.subVectors(t.b,gl),ao.subVectors(t.c,gl),Ds.subVectors(io,no),Ns.subVectors(ao,io),tr.subVectors(no,ao);let i=[0,-Ds.z,Ds.y,0,-Ns.z,Ns.y,0,-tr.z,tr.y,Ds.z,0,-Ds.x,Ns.z,0,-Ns.x,tr.z,0,-tr.x,-Ds.y,Ds.x,0,-Ns.y,Ns.x,0,-tr.y,tr.x,0];return!ch(i,no,io,ao,kc)||(i=[1,0,0,0,1,0,0,0,1],!ch(i,no,io,ao,kc))?!1:(jc.crossVectors(Ds,Ns),i=[jc.x,jc.y,jc.z],ch(i,no,io,ao,kc))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,na).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(na).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Xa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Xa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Xa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Xa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Xa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Xa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Xa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Xa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Xa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Xa=[new it,new it,new it,new it,new it,new it,new it,new it],na=new it,Vc=new dr,no=new it,io=new it,ao=new it,Ds=new it,Ns=new it,tr=new it,gl=new it,kc=new it,jc=new it,er=new it;function ch(r,t,i,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){er.fromArray(r,c);const p=l.x*Math.abs(er.x)+l.y*Math.abs(er.y)+l.z*Math.abs(er.z),m=t.dot(er),h=i.dot(er),_=s.dot(er);if(Math.max(-Math.max(m,h,_),Math.min(m,h,_))>p)return!1}return!0}const wn=new it,Xc=new Re;let Wb=0;class Xi{constructor(t,i,s=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wb++}),this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=H0,this.updateRanges=[],this.gpuType=ma,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Xc.fromBufferAttribute(this,i),Xc.applyMatrix3(t),this.setXY(i,Xc.x,Xc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)wn.fromBufferAttribute(this,i),wn.applyMatrix3(t),this.setXYZ(i,wn.x,wn.y,wn.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)wn.fromBufferAttribute(this,i),wn.applyMatrix4(t),this.setXYZ(i,wn.x,wn.y,wn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)wn.fromBufferAttribute(this,i),wn.applyNormalMatrix(t),this.setXYZ(i,wn.x,wn.y,wn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)wn.fromBufferAttribute(this,i),wn.transformDirection(t),this.setXYZ(i,wn.x,wn.y,wn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=co(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=ii(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=co(i,this.array)),i}setX(t,i){return this.normalized&&(i=ii(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=co(i,this.array)),i}setY(t,i){return this.normalized&&(i=ii(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=co(i,this.array)),i}setZ(t,i){return this.normalized&&(i=ii(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=co(i,this.array)),i}setW(t,i){return this.normalized&&(i=ii(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=ii(i,this.array),s=ii(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=ii(i,this.array),s=ii(s,this.array),l=ii(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,c){return t*=this.itemSize,this.normalized&&(i=ii(i,this.array),s=ii(s,this.array),l=ii(l,this.array),c=ii(c,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==H0&&(t.usage=this.usage),t}}class Cx extends Xi{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class Rx extends Xi{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class ti extends Xi{constructor(t,i,s){super(new Float32Array(t),i,s)}}const qb=new dr,_l=new it,uh=new it;class Dl{constructor(t=new it,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):qb.setFromPoints(t).getCenter(s);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;_l.subVectors(t,this.center);const i=_l.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(_l,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(uh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(_l.copy(t.center).add(uh)),this.expandByPoint(_l.copy(t.center).sub(uh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Zb=0;const Hi=new pn,fh=new $n,so=new it,Di=new dr,vl=new dr,zn=new it;class oi extends hr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zb++}),this.uuid=bo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(hb(t)?Rx:Cx)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new Te().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Hi.makeRotationFromQuaternion(t),this.applyMatrix4(Hi),this}rotateX(t){return Hi.makeRotationX(t),this.applyMatrix4(Hi),this}rotateY(t){return Hi.makeRotationY(t),this.applyMatrix4(Hi),this}rotateZ(t){return Hi.makeRotationZ(t),this.applyMatrix4(Hi),this}translate(t,i,s){return Hi.makeTranslation(t,i,s),this.applyMatrix4(Hi),this}scale(t,i,s){return Hi.makeScale(t,i,s),this.applyMatrix4(Hi),this}lookAt(t){return fh.lookAt(t),fh.updateMatrix(),this.applyMatrix4(fh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(so).negate(),this.translate(so.x,so.y,so.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new ti(s,3))}else{const s=Math.min(t.length,i.count);for(let l=0;l<s;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new dr);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new it(-1/0,-1/0,-1/0),new it(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];Di.setFromBufferAttribute(c),this.morphTargetsRelative?(zn.addVectors(this.boundingBox.min,Di.min),this.boundingBox.expandByPoint(zn),zn.addVectors(this.boundingBox.max,Di.max),this.boundingBox.expandByPoint(zn)):(this.boundingBox.expandByPoint(Di.min),this.boundingBox.expandByPoint(Di.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ve('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Dl);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new it,1/0);return}if(t){const s=this.boundingSphere.center;if(Di.setFromBufferAttribute(t),i)for(let c=0,f=i.length;c<f;c++){const p=i[c];vl.setFromBufferAttribute(p),this.morphTargetsRelative?(zn.addVectors(Di.min,vl.min),Di.expandByPoint(zn),zn.addVectors(Di.max,vl.max),Di.expandByPoint(zn)):(Di.expandByPoint(vl.min),Di.expandByPoint(vl.max))}Di.getCenter(s);let l=0;for(let c=0,f=t.count;c<f;c++)zn.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(zn));if(i)for(let c=0,f=i.length;c<f;c++){const p=i[c],m=this.morphTargetsRelative;for(let h=0,_=p.count;h<_;h++)zn.fromBufferAttribute(p,h),m&&(so.fromBufferAttribute(t,h),zn.add(so)),l=Math.max(l,s.distanceToSquared(zn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&Ve('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Ve("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xi(new Float32Array(4*s.count),4));const f=this.getAttribute("tangent"),p=[],m=[];for(let T=0;T<s.count;T++)p[T]=new it,m[T]=new it;const h=new it,_=new it,v=new it,g=new Re,M=new Re,E=new Re,R=new it,x=new it;function b(T,O,mt){h.fromBufferAttribute(s,T),_.fromBufferAttribute(s,O),v.fromBufferAttribute(s,mt),g.fromBufferAttribute(c,T),M.fromBufferAttribute(c,O),E.fromBufferAttribute(c,mt),_.sub(h),v.sub(h),M.sub(g),E.sub(g);const V=1/(M.x*E.y-E.x*M.y);isFinite(V)&&(R.copy(_).multiplyScalar(E.y).addScaledVector(v,-M.y).multiplyScalar(V),x.copy(v).multiplyScalar(M.x).addScaledVector(_,-E.x).multiplyScalar(V),p[T].add(R),p[O].add(R),p[mt].add(R),m[T].add(x),m[O].add(x),m[mt].add(x))}let L=this.groups;L.length===0&&(L=[{start:0,count:t.count}]);for(let T=0,O=L.length;T<O;++T){const mt=L[T],V=mt.start,J=mt.count;for(let at=V,st=V+J;at<st;at+=3)b(t.getX(at+0),t.getX(at+1),t.getX(at+2))}const F=new it,N=new it,H=new it,z=new it;function I(T){H.fromBufferAttribute(l,T),z.copy(H);const O=p[T];F.copy(O),F.sub(H.multiplyScalar(H.dot(O))).normalize(),N.crossVectors(z,O);const V=N.dot(m[T])<0?-1:1;f.setXYZW(T,F.x,F.y,F.z,V)}for(let T=0,O=L.length;T<O;++T){const mt=L[T],V=mt.start,J=mt.count;for(let at=V,st=V+J;at<st;at+=3)I(t.getX(at+0)),I(t.getX(at+1)),I(t.getX(at+2))}}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Xi(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let g=0,M=s.count;g<M;g++)s.setXYZ(g,0,0,0);const l=new it,c=new it,f=new it,p=new it,m=new it,h=new it,_=new it,v=new it;if(t)for(let g=0,M=t.count;g<M;g+=3){const E=t.getX(g+0),R=t.getX(g+1),x=t.getX(g+2);l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,R),f.fromBufferAttribute(i,x),_.subVectors(f,c),v.subVectors(l,c),_.cross(v),p.fromBufferAttribute(s,E),m.fromBufferAttribute(s,R),h.fromBufferAttribute(s,x),p.add(_),m.add(_),h.add(_),s.setXYZ(E,p.x,p.y,p.z),s.setXYZ(R,m.x,m.y,m.z),s.setXYZ(x,h.x,h.y,h.z)}else for(let g=0,M=i.count;g<M;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),f.fromBufferAttribute(i,g+2),_.subVectors(f,c),v.subVectors(l,c),_.cross(v),s.setXYZ(g+0,_.x,_.y,_.z),s.setXYZ(g+1,_.x,_.y,_.z),s.setXYZ(g+2,_.x,_.y,_.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)zn.fromBufferAttribute(t,i),zn.normalize(),t.setXYZ(i,zn.x,zn.y,zn.z)}toNonIndexed(){function t(p,m){const h=p.array,_=p.itemSize,v=p.normalized,g=new h.constructor(m.length*_);let M=0,E=0;for(let R=0,x=m.length;R<x;R++){p.isInterleavedBufferAttribute?M=m[R]*p.data.stride+p.offset:M=m[R]*_;for(let b=0;b<_;b++)g[E++]=h[M++]}return new Xi(g,_,v)}if(this.index===null)return ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new oi,s=this.index.array,l=this.attributes;for(const p in l){const m=l[p],h=t(m,s);i.setAttribute(p,h)}const c=this.morphAttributes;for(const p in c){const m=[],h=c[p];for(let _=0,v=h.length;_<v;_++){const g=h[_],M=t(g,s);m.push(M)}i.morphAttributes[p]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let p=0,m=f.length;p<m;p++){const h=f[p];i.addGroup(h.start,h.count,h.materialIndex)}return i}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const h in m)m[h]!==void 0&&(t[h]=m[h]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const h=s[m];t.data.attributes[m]=h.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const h=this.morphAttributes[m],_=[];for(let v=0,g=h.length;v<g;v++){const M=h[v];_.push(M.toJSON(t.data))}_.length>0&&(l[m]=_,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const p=this.boundingSphere;return p!==null&&(t.data.boundingSphere=p.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone());const l=t.attributes;for(const h in l){const _=l[h];this.setAttribute(h,_.clone(i))}const c=t.morphAttributes;for(const h in c){const _=[],v=c[h];for(let g=0,M=v.length;g<M;g++)_.push(v[g].clone(i));this.morphAttributes[h]=_}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let h=0,_=f.length;h<_;h++){const v=f[h];this.addGroup(v.start,v.count,v.materialIndex)}const p=t.boundingBox;p!==null&&(this.boundingBox=p.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Kb=0;class Eo extends hr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kb++}),this.uuid=bo(),this.name="",this.type="Material",this.blending=mo,this.side=Is,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oh,this.blendDst=Ph,this.blendEquation=rr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=vo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=B0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zr,this.stencilZFail=Zr,this.stencilZPass=Zr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){ge(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ge(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==mo&&(s.blending=this.blending),this.side!==Is&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Oh&&(s.blendSrc=this.blendSrc),this.blendDst!==Ph&&(s.blendDst=this.blendDst),this.blendEquation!==rr&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==vo&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==B0&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zr&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Zr&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Zr&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.allowOverride===!1&&(s.allowOverride=!1),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const p in c){const m=c[p];delete m.metadata,f.push(m)}return f}if(i){const c=l(t.textures),f=l(t.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Ya=new it,dh=new it,Yc=new it,Ls=new it,hh=new it,Wc=new it,ph=new it;class Nl{constructor(t=new it,i=new it(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ya)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=Ya.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(Ya.copy(this.origin).addScaledVector(this.direction,i),Ya.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){dh.copy(t).add(i).multiplyScalar(.5),Yc.copy(i).sub(t).normalize(),Ls.copy(this.origin).sub(dh);const c=t.distanceTo(i)*.5,f=-this.direction.dot(Yc),p=Ls.dot(this.direction),m=-Ls.dot(Yc),h=Ls.lengthSq(),_=Math.abs(1-f*f);let v,g,M,E;if(_>0)if(v=f*m-p,g=f*p-m,E=c*_,v>=0)if(g>=-E)if(g<=E){const R=1/_;v*=R,g*=R,M=v*(v+f*g+2*p)+g*(f*v+g+2*m)+h}else g=c,v=Math.max(0,-(f*g+p)),M=-v*v+g*(g+2*m)+h;else g=-c,v=Math.max(0,-(f*g+p)),M=-v*v+g*(g+2*m)+h;else g<=-E?(v=Math.max(0,-(-f*c+p)),g=v>0?-c:Math.min(Math.max(-c,-m),c),M=-v*v+g*(g+2*m)+h):g<=E?(v=0,g=Math.min(Math.max(-c,-m),c),M=g*(g+2*m)+h):(v=Math.max(0,-(f*c+p)),g=v>0?c:Math.min(Math.max(-c,-m),c),M=-v*v+g*(g+2*m)+h);else g=f>0?-c:c,v=Math.max(0,-(f*g+p)),M=-v*v+g*(g+2*m)+h;return s&&s.copy(this.origin).addScaledVector(this.direction,v),l&&l.copy(dh).addScaledVector(Yc,g),M}intersectSphere(t,i){Ya.subVectors(t.center,this.origin);const s=Ya.dot(this.direction),l=Ya.dot(Ya)-s*s,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),p=s-f,m=s+f;return m<0?null:p<0?this.at(m,i):this.at(p,i)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,c,f,p,m;const h=1/this.direction.x,_=1/this.direction.y,v=1/this.direction.z,g=this.origin;return h>=0?(s=(t.min.x-g.x)*h,l=(t.max.x-g.x)*h):(s=(t.max.x-g.x)*h,l=(t.min.x-g.x)*h),_>=0?(c=(t.min.y-g.y)*_,f=(t.max.y-g.y)*_):(c=(t.max.y-g.y)*_,f=(t.min.y-g.y)*_),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),v>=0?(p=(t.min.z-g.z)*v,m=(t.max.z-g.z)*v):(p=(t.max.z-g.z)*v,m=(t.min.z-g.z)*v),s>m||p>l)||((p>s||s!==s)&&(s=p),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,Ya)!==null}intersectTriangle(t,i,s,l,c){hh.subVectors(i,t),Wc.subVectors(s,t),ph.crossVectors(hh,Wc);let f=this.direction.dot(ph),p;if(f>0){if(l)return null;p=1}else if(f<0)p=-1,f=-f;else return null;Ls.subVectors(this.origin,t);const m=p*this.direction.dot(Wc.crossVectors(Ls,Wc));if(m<0)return null;const h=p*this.direction.dot(hh.cross(Ls));if(h<0||m+h>f)return null;const _=-p*Ls.dot(ph);return _<0?null:this.at(_/f,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Vp extends Eo{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $a,this.combine=ox,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const nv=new pn,nr=new Nl,qc=new Dl,iv=new it,Zc=new it,Kc=new it,Qc=new it,mh=new it,Jc=new it,av=new it,$c=new it;class ya extends $n{constructor(t=new oi,i=new Vp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const p=this.morphTargetInfluences;if(c&&p){Jc.set(0,0,0);for(let m=0,h=c.length;m<h;m++){const _=p[m],v=c[m];_!==0&&(mh.fromBufferAttribute(v,t),f?Jc.addScaledVector(mh,_):Jc.addScaledVector(mh.sub(i),_))}i.add(Jc)}return i}raycast(t,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),qc.copy(s.boundingSphere),qc.applyMatrix4(c),nr.copy(t.ray).recast(t.near),!(qc.containsPoint(nr.origin)===!1&&(nr.intersectSphere(qc,iv)===null||nr.origin.distanceToSquared(iv)>(t.far-t.near)**2))&&(nv.copy(c).invert(),nr.copy(t.ray).applyMatrix4(nv),!(s.boundingBox!==null&&nr.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,nr)))}_computeIntersections(t,i,s){let l;const c=this.geometry,f=this.material,p=c.index,m=c.attributes.position,h=c.attributes.uv,_=c.attributes.uv1,v=c.attributes.normal,g=c.groups,M=c.drawRange;if(p!==null)if(Array.isArray(f))for(let E=0,R=g.length;E<R;E++){const x=g[E],b=f[x.materialIndex],L=Math.max(x.start,M.start),F=Math.min(p.count,Math.min(x.start+x.count,M.start+M.count));for(let N=L,H=F;N<H;N+=3){const z=p.getX(N),I=p.getX(N+1),T=p.getX(N+2);l=tu(this,b,t,s,h,_,v,z,I,T),l&&(l.faceIndex=Math.floor(N/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const E=Math.max(0,M.start),R=Math.min(p.count,M.start+M.count);for(let x=E,b=R;x<b;x+=3){const L=p.getX(x),F=p.getX(x+1),N=p.getX(x+2);l=tu(this,f,t,s,h,_,v,L,F,N),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let E=0,R=g.length;E<R;E++){const x=g[E],b=f[x.materialIndex],L=Math.max(x.start,M.start),F=Math.min(m.count,Math.min(x.start+x.count,M.start+M.count));for(let N=L,H=F;N<H;N+=3){const z=N,I=N+1,T=N+2;l=tu(this,b,t,s,h,_,v,z,I,T),l&&(l.faceIndex=Math.floor(N/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const E=Math.max(0,M.start),R=Math.min(m.count,M.start+M.count);for(let x=E,b=R;x<b;x+=3){const L=x,F=x+1,N=x+2;l=tu(this,f,t,s,h,_,v,L,F,N),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}}}function Qb(r,t,i,s,l,c,f,p){let m;if(t.side===vi?m=s.intersectTriangle(f,c,l,!0,p):m=s.intersectTriangle(l,c,f,t.side===Is,p),m===null)return null;$c.copy(p),$c.applyMatrix4(r.matrixWorld);const h=i.ray.origin.distanceTo($c);return h<i.near||h>i.far?null:{distance:h,point:$c.clone(),object:r}}function tu(r,t,i,s,l,c,f,p,m,h){r.getVertexPosition(p,Zc),r.getVertexPosition(m,Kc),r.getVertexPosition(h,Qc);const _=Qb(r,t,i,s,Zc,Kc,Qc,av);if(_){const v=new it;ji.getBarycoord(av,Zc,Kc,Qc,v),l&&(_.uv=ji.getInterpolatedAttribute(l,p,m,h,v,new Re)),c&&(_.uv1=ji.getInterpolatedAttribute(c,p,m,h,v,new Re)),f&&(_.normal=ji.getInterpolatedAttribute(f,p,m,h,v,new it),_.normal.dot(s.direction)>0&&_.normal.multiplyScalar(-1));const g={a:p,b:m,c:h,normal:new it,materialIndex:0};ji.getNormal(Zc,Kc,Qc,g.normal),_.face=g,_.barycoord=v}return _}class Jb extends ri{constructor(t=null,i=1,s=1,l,c,f,p,m,h=jn,_=jn,v,g){super(null,f,p,m,h,_,l,c,v,g),this.isDataTexture=!0,this.image={data:t,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const gh=new it,$b=new it,tE=new Te;class ia{constructor(t=new it(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=gh.subVectors(s,i).cross($b.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i){const s=t.delta(gh),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(t.start).addScaledVector(s,c)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||tE.getNormalMatrix(t),l=this.coplanarPoint(gh).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ir=new Dl,eE=new Re(.5,.5),eu=new it;class wx{constructor(t=new ia,i=new ia,s=new ia,l=new ia,c=new ia,f=new ia){this.planes=[t,i,s,l,c,f]}set(t,i,s,l,c,f){const p=this.planes;return p[0].copy(t),p[1].copy(i),p[2].copy(s),p[3].copy(l),p[4].copy(c),p[5].copy(f),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=ga,s=!1){const l=this.planes,c=t.elements,f=c[0],p=c[1],m=c[2],h=c[3],_=c[4],v=c[5],g=c[6],M=c[7],E=c[8],R=c[9],x=c[10],b=c[11],L=c[12],F=c[13],N=c[14],H=c[15];if(l[0].setComponents(h-f,M-_,b-E,H-L).normalize(),l[1].setComponents(h+f,M+_,b+E,H+L).normalize(),l[2].setComponents(h+p,M+v,b+R,H+F).normalize(),l[3].setComponents(h-p,M-v,b-R,H-F).normalize(),s)l[4].setComponents(m,g,x,N).normalize(),l[5].setComponents(h-m,M-g,b-x,H-N).normalize();else if(l[4].setComponents(h-m,M-g,b-x,H-N).normalize(),i===ga)l[5].setComponents(h+m,M+g,b+x,H+N).normalize();else if(i===Cu)l[5].setComponents(m,g,x,N).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ir.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),ir.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ir)}intersectsSprite(t){ir.center.set(0,0,0);const i=eE.distanceTo(t.center);return ir.radius=.7071067811865476+i,ir.applyMatrix4(t.matrixWorld),this.intersectsSphere(ir)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(eu.x=l.normal.x>0?t.max.x:t.min.x,eu.y=l.normal.y>0?t.max.y:t.min.y,eu.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(eu)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Pu extends Eo{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Du=new it,Nu=new it,sv=new pn,xl=new Nl,nu=new Dl,_h=new it,rv=new it;class nE extends $n{constructor(t=new oi,i=new Pu){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[0];for(let l=1,c=i.count;l<c;l++)Du.fromBufferAttribute(i,l-1),Nu.fromBufferAttribute(i,l),s[l]=s[l-1],s[l]+=Du.distanceTo(Nu);t.setAttribute("lineDistance",new ti(s,1))}else ge("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,i){const s=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),nu.copy(s.boundingSphere),nu.applyMatrix4(l),nu.radius+=c,t.ray.intersectsSphere(nu)===!1)return;sv.copy(l).invert(),xl.copy(t.ray).applyMatrix4(sv);const p=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,h=this.isLineSegments?2:1,_=s.index,g=s.attributes.position;if(_!==null){const M=Math.max(0,f.start),E=Math.min(_.count,f.start+f.count);for(let R=M,x=E-1;R<x;R+=h){const b=_.getX(R),L=_.getX(R+1),F=iu(this,t,xl,m,b,L,R);F&&i.push(F)}if(this.isLineLoop){const R=_.getX(E-1),x=_.getX(M),b=iu(this,t,xl,m,R,x,E-1);b&&i.push(b)}}else{const M=Math.max(0,f.start),E=Math.min(g.count,f.start+f.count);for(let R=M,x=E-1;R<x;R+=h){const b=iu(this,t,xl,m,R,R+1,R);b&&i.push(b)}if(this.isLineLoop){const R=iu(this,t,xl,m,E-1,M,E-1);R&&i.push(R)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}}function iu(r,t,i,s,l,c,f){const p=r.geometry.attributes.position;if(Du.fromBufferAttribute(p,l),Nu.fromBufferAttribute(p,c),i.distanceSqToSegment(Du,Nu,_h,rv)>s)return;_h.applyMatrix4(r.matrixWorld);const h=t.ray.origin.distanceTo(_h);if(!(h<t.near||h>t.far))return{distance:h,point:rv.clone().applyMatrix4(r.matrixWorld),index:f,face:null,faceIndex:null,barycoord:null,object:r}}const ov=new it,lv=new it;class kp extends nE{constructor(t,i){super(t,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[];for(let l=0,c=i.count;l<c;l+=2)ov.fromBufferAttribute(i,l),lv.fromBufferAttribute(i,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+ov.distanceTo(lv);t.setAttribute("lineDistance",new ti(s,1))}else ge("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Dx extends Eo{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const cv=new pn,bp=new Nl,au=new Dl,su=new it;class iE extends $n{constructor(t=new oi,i=new Dx){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,i){const s=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),au.copy(s.boundingSphere),au.applyMatrix4(l),au.radius+=c,t.ray.intersectsSphere(au)===!1)return;cv.copy(l).invert(),bp.copy(t.ray).applyMatrix4(cv);const p=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,h=s.index,v=s.attributes.position;if(h!==null){const g=Math.max(0,f.start),M=Math.min(h.count,f.start+f.count);for(let E=g,R=M;E<R;E++){const x=h.getX(E);su.fromBufferAttribute(v,x),uv(su,x,m,l,t,i,this)}}else{const g=Math.max(0,f.start),M=Math.min(v.count,f.start+f.count);for(let E=g,R=M;E<R;E++)su.fromBufferAttribute(v,E),uv(su,E,m,l,t,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}}function uv(r,t,i,s,l,c,f){const p=bp.distanceSqToPoint(r);if(p<i){const m=new it;bp.closestPointToPoint(r,m),m.applyMatrix4(s);const h=l.ray.origin.distanceTo(m);if(h<l.near||h>l.far)return;c.push({distance:h,distanceToRay:Math.sqrt(p),point:m,index:t,face:null,faceIndex:null,barycoord:null,object:f})}}class Nx extends ri{constructor(t=[],i=fr,s,l,c,f,p,m,h,_){super(t,i,s,l,c,f,p,m,h,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class wl extends ri{constructor(t,i,s=xa,l,c,f,p=jn,m=jn,h,_=Ja,v=1){if(_!==Ja&&_!==cr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:t,height:i,depth:v};super(g,l,c,f,p,m,_,s,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Hp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class aE extends wl{constructor(t,i=xa,s=fr,l,c,f=jn,p=jn,m,h=Ja){const _={width:t,height:t,depth:1},v=[_,_,_,_,_,_];super(t,t,i,s,l,c,f,p,m,h),this.image=v,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Lx extends ri{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class To extends oi{constructor(t=1,i=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const p=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],h=[],_=[],v=[];let g=0,M=0;E("z","y","x",-1,-1,s,i,t,f,c,0),E("z","y","x",1,-1,s,i,-t,f,c,1),E("x","z","y",1,1,t,s,i,l,f,2),E("x","z","y",1,-1,t,s,-i,l,f,3),E("x","y","z",1,-1,t,i,s,l,c,4),E("x","y","z",-1,-1,t,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new ti(h,3)),this.setAttribute("normal",new ti(_,3)),this.setAttribute("uv",new ti(v,2));function E(R,x,b,L,F,N,H,z,I,T,O){const mt=N/I,V=H/T,J=N/2,at=H/2,st=z/2,et=I+1,P=T+1;let G=0,Y=0;const ot=new it;for(let yt=0;yt<P;yt++){const B=yt*V-at;for(let W=0;W<et;W++){const dt=W*mt-J;ot[R]=dt*L,ot[x]=B*F,ot[b]=st,h.push(ot.x,ot.y,ot.z),ot[R]=0,ot[x]=0,ot[b]=z>0?1:-1,_.push(ot.x,ot.y,ot.z),v.push(W/I),v.push(1-yt/T),G+=1}}for(let yt=0;yt<T;yt++)for(let B=0;B<I;B++){const W=g+B+et*yt,dt=g+B+et*(yt+1),Dt=g+(B+1)+et*(yt+1),zt=g+(B+1)+et*yt;m.push(W,dt,zt),m.push(dt,Dt,zt),Y+=6}p.addGroup(M,Y,O),M+=Y,g+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new To(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}const ru=new it,ou=new it,vh=new it,lu=new ji;class sE extends oi{constructor(t=null,i=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:i},t!==null){const l=Math.pow(10,4),c=Math.cos(go*i),f=t.getIndex(),p=t.getAttribute("position"),m=f?f.count:p.count,h=[0,0,0],_=["a","b","c"],v=new Array(3),g={},M=[];for(let E=0;E<m;E+=3){f?(h[0]=f.getX(E),h[1]=f.getX(E+1),h[2]=f.getX(E+2)):(h[0]=E,h[1]=E+1,h[2]=E+2);const{a:R,b:x,c:b}=lu;if(R.fromBufferAttribute(p,h[0]),x.fromBufferAttribute(p,h[1]),b.fromBufferAttribute(p,h[2]),lu.getNormal(vh),v[0]=`${Math.round(R.x*l)},${Math.round(R.y*l)},${Math.round(R.z*l)}`,v[1]=`${Math.round(x.x*l)},${Math.round(x.y*l)},${Math.round(x.z*l)}`,v[2]=`${Math.round(b.x*l)},${Math.round(b.y*l)},${Math.round(b.z*l)}`,!(v[0]===v[1]||v[1]===v[2]||v[2]===v[0]))for(let L=0;L<3;L++){const F=(L+1)%3,N=v[L],H=v[F],z=lu[_[L]],I=lu[_[F]],T=`${N}_${H}`,O=`${H}_${N}`;O in g&&g[O]?(vh.dot(g[O].normal)<=c&&(M.push(z.x,z.y,z.z),M.push(I.x,I.y,I.z)),g[O]=null):T in g||(g[T]={index0:h[L],index1:h[F],normal:vh.clone()})}}for(const E in g)if(g[E]){const{index0:R,index1:x}=g[E];ru.fromBufferAttribute(p,R),ou.fromBufferAttribute(p,x),M.push(ru.x,ru.y,ru.z),M.push(ou.x,ou.y,ou.z)}this.setAttribute("position",new ti(M,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Iu extends oi{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const c=t/2,f=i/2,p=Math.floor(s),m=Math.floor(l),h=p+1,_=m+1,v=t/p,g=i/m,M=[],E=[],R=[],x=[];for(let b=0;b<_;b++){const L=b*g-f;for(let F=0;F<h;F++){const N=F*v-c;E.push(N,-L,0),R.push(0,0,1),x.push(F/p),x.push(1-b/m)}}for(let b=0;b<m;b++)for(let L=0;L<p;L++){const F=L+h*b,N=L+h*(b+1),H=L+1+h*(b+1),z=L+1+h*b;M.push(F,N,z),M.push(N,H,z)}this.setIndex(M),this.setAttribute("position",new ti(E,3)),this.setAttribute("normal",new ti(R,3)),this.setAttribute("uv",new ti(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Iu(t.width,t.height,t.widthSegments,t.heightSegments)}}function Mo(r){const t={};for(const i in r){t[i]={};for(const s in r[i]){const l=r[i][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone():Array.isArray(l)?t[i][s]=l.slice():t[i][s]=l}}return t}function ai(r){const t={};for(let i=0;i<r.length;i++){const s=Mo(r[i]);for(const l in s)t[l]=s[l]}return t}function rE(r){const t=[];for(let i=0;i<r.length;i++)t.push(r[i].clone());return t}function Ux(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ke.workingColorSpace}const oE={clone:Mo,merge:ai};var lE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Sa extends Eo{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lE,this.fragmentShader=cE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Mo(t.uniforms),this.uniformsGroups=rE(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class uE extends Sa{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class fE extends Eo{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ab,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class dE extends Eo{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class hE extends $n{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(t),this.intensity=i}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}const cu=new it,uu=new zs,fa=new it;class Ox extends $n{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pn,this.projectionMatrix=new pn,this.projectionMatrixInverse=new pn,this.coordinateSystem=ga,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(cu,uu,fa),fa.x===1&&fa.y===1&&fa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(cu,uu,fa.set(1,1,1)).invert()}updateWorldMatrix(t,i){super.updateWorldMatrix(t,i),this.matrixWorld.decompose(cu,uu,fa),fa.x===1&&fa.y===1&&fa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(cu,uu,fa.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Us=new it,fv=new Re,dv=new Re;class Vi extends Ox{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=Rl*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(go*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Rl*2*Math.atan(Math.tan(go*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){Us.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Us.x,Us.y).multiplyScalar(-t/Us.z),Us.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Us.x,Us.y).multiplyScalar(-t/Us.z)}getViewSize(t,i){return this.getViewBounds(t,fv,dv),i.subVectors(dv,fv)}setViewOffset(t,i,s,l,c,f){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(go*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,h=f.fullHeight;c+=f.offsetX*l/m,i-=f.offsetY*s/h,l*=f.width/m,s*=f.height/h}const p=this.filmOffset;p!==0&&(c+=t*p/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class Lu extends Ox{constructor(t=-1,i=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,f=s+t,p=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=h*this.view.offsetX,f=c+h*this.view.width,p-=_*this.view.offsetY,m=p-_*this.view.height}this.projectionMatrix.makeOrthographic(c,f,p,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class pE extends hE{constructor(t,i){super(t,i),this.isAmbientLight=!0,this.type="AmbientLight"}}const ro=-90,oo=1;class mE extends $n{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Vi(ro,oo,t,i);l.layers=this.layers,this.add(l);const c=new Vi(ro,oo,t,i);c.layers=this.layers,this.add(c);const f=new Vi(ro,oo,t,i);f.layers=this.layers,this.add(f);const p=new Vi(ro,oo,t,i);p.layers=this.layers,this.add(p);const m=new Vi(ro,oo,t,i);m.layers=this.layers,this.add(m);const h=new Vi(ro,oo,t,i);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,c,f,p,m]=i;for(const h of i)this.remove(h);if(t===ga)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===Cu)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of i)this.add(h),h.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,p,m,h,_]=this.children,v=t.getRenderTarget(),g=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const R=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let x=!1;t.isWebGLRenderer===!0?x=t.state.buffers.depth.getReversed():x=t.reversedDepthBuffer,t.setRenderTarget(s,0,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,c),t.setRenderTarget(s,1,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,f),t.setRenderTarget(s,2,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,p),t.setRenderTarget(s,3,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,m),t.setRenderTarget(s,4,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,h),s.texture.generateMipmaps=R,t.setRenderTarget(s,5,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,_),t.setRenderTarget(v,g,M),t.xr.enabled=E,s.texture.needsPMREMUpdate=!0}}class gE extends Vi{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const hv=new pn;class _E{constructor(t,i,s=0,l=1/0){this.ray=new Nl(t,i),this.near=s,this.far=l,this.camera=null,this.layers=new Gp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,i){this.ray.set(t,i)}setFromCamera(t,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(i.near+i.far)/(i.near-i.far)).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):Ve("Raycaster: Unsupported camera type: "+i.type)}setFromXRController(t){return hv.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(hv),this}intersectObject(t,i=!0,s=[]){return Ep(t,this,s,i),s.sort(pv),s}intersectObjects(t,i=!0,s=[]){for(let l=0,c=t.length;l<c;l++)Ep(t[l],this,s,i);return s.sort(pv),s}}function pv(r,t){return r.distance-t.distance}function Ep(r,t,i,s){let l=!0;if(r.layers.test(t.layers)&&r.raycast(t,i)===!1&&(l=!1),l===!0&&s===!0){const c=r.children;for(let f=0,p=c.length;f<p;f++)Ep(c[f],t,i,!0)}}class mv{constructor(t=1,i=0,s=0){this.radius=t,this.phi=i,this.theta=s}set(t,i,s){return this.radius=t,this.phi=i,this.theta=s,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=De(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,s){return this.radius=Math.sqrt(t*t+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,s),this.phi=Math.acos(De(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class vE extends kp{constructor(t=10,i=10,s=4473924,l=8947848){s=new ze(s),l=new ze(l);const c=i/2,f=t/i,p=t/2,m=[],h=[];for(let g=0,M=0,E=-p;g<=i;g++,E+=f){m.push(-p,0,E,p,0,E),m.push(E,0,-p,E,0,p);const R=g===c?s:l;R.toArray(h,M),M+=3,R.toArray(h,M),M+=3,R.toArray(h,M),M+=3,R.toArray(h,M),M+=3}const _=new oi;_.setAttribute("position",new ti(m,3)),_.setAttribute("color",new ti(h,3));const v=new Pu({vertexColors:!0,toneMapped:!1});super(_,v),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class xE extends kp{constructor(t=1){const i=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],s=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],l=new oi;l.setAttribute("position",new ti(i,3)),l.setAttribute("color",new ti(s,3));const c=new Pu({vertexColors:!0,toneMapped:!1});super(l,c),this.type="AxesHelper"}setColors(t,i,s){const l=new ze,c=this.geometry.attributes.color.array;return l.set(t),l.toArray(c,0),l.toArray(c,3),l.set(i),l.toArray(c,6),l.toArray(c,9),l.set(s),l.toArray(c,12),l.toArray(c,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class yE extends hr{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){ge("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function gv(r,t,i,s){const l=SE(s);switch(i){case yx:return r*t;case Mx:return r*t/l.components*l.byteLength;case Op:return r*t/l.components*l.byteLength;case yo:return r*t*2/l.components*l.byteLength;case Pp:return r*t*2/l.components*l.byteLength;case Sx:return r*t*3/l.components*l.byteLength;case sa:return r*t*4/l.components*l.byteLength;case Ip:return r*t*4/l.components*l.byteLength;case yu:case Su:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Mu:case bu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Yh:case qh:return Math.max(r,16)*Math.max(t,8)/4;case Xh:case Wh:return Math.max(r,8)*Math.max(t,8)/2;case Zh:case Kh:case Jh:case $h:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Qh:case tp:case ep:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case np:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ip:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case ap:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case sp:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case rp:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case op:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case lp:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case cp:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case up:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case fp:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case dp:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case hp:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case pp:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case mp:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case gp:case _p:case vp:return Math.ceil(r/4)*Math.ceil(t/4)*16;case xp:case yp:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Sp:case Mp:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function SE(r){switch(r){case ki:case gx:return{byteLength:1,components:1};case Al:case _x:case Qa:return{byteLength:2,components:1};case Lp:case Up:return{byteLength:2,components:4};case xa:case Np:case ma:return{byteLength:4,components:1};case vx:case xx:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Dp}}));typeof window<"u"&&(window.__THREE__?ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Dp);function Px(){let r=null,t=!1,i=null,s=null;function l(c,f){i(c,f),s=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function ME(r){const t=new WeakMap;function i(p,m){const h=p.array,_=p.usage,v=h.byteLength,g=r.createBuffer();r.bindBuffer(m,g),r.bufferData(m,h,_),p.onUploadCallback();let M;if(h instanceof Float32Array)M=r.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)M=r.HALF_FLOAT;else if(h instanceof Uint16Array)p.isFloat16BufferAttribute?M=r.HALF_FLOAT:M=r.UNSIGNED_SHORT;else if(h instanceof Int16Array)M=r.SHORT;else if(h instanceof Uint32Array)M=r.UNSIGNED_INT;else if(h instanceof Int32Array)M=r.INT;else if(h instanceof Int8Array)M=r.BYTE;else if(h instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:M,bytesPerElement:h.BYTES_PER_ELEMENT,version:p.version,size:v}}function s(p,m,h){const _=m.array,v=m.updateRanges;if(r.bindBuffer(h,p),v.length===0)r.bufferSubData(h,0,_);else{v.sort((M,E)=>M.start-E.start);let g=0;for(let M=1;M<v.length;M++){const E=v[g],R=v[M];R.start<=E.start+E.count+1?E.count=Math.max(E.count,R.start+R.count-E.start):(++g,v[g]=R)}v.length=g+1;for(let M=0,E=v.length;M<E;M++){const R=v[M];r.bufferSubData(h,R.start*_.BYTES_PER_ELEMENT,_,R.start,R.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(p){return p.isInterleavedBufferAttribute&&(p=p.data),t.get(p)}function c(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=t.get(p);m&&(r.deleteBuffer(m.buffer),t.delete(p))}function f(p,m){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const _=t.get(p);(!_||_.version<p.version)&&t.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const h=t.get(p);if(h===void 0)t.set(p,i(p,m));else if(h.version<p.version){if(h.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,p,m),h.version=p.version}}return{get:l,remove:c,update:f}}var bE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,EE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,TE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,AE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,CE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,RE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,DE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,NE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,LE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,UE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,OE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,PE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,IE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,FE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,BE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,HE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,GE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,VE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,kE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,jE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,XE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,YE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,WE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,qE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ZE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,KE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,QE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,JE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$E="gl_FragColor = linearToOutputTexel( gl_FragColor );",tT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,eT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,nT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,iT=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,aT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,oT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,uT=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hT=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pT=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,mT=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,gT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_T=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xT=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yT=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ST=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,MT=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bT=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ET=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,TT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,AT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,CT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,RT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wT=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,DT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,NT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,LT=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,UT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,OT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,PT=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,IT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,FT=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,BT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,HT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,GT=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,VT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,XT=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,YT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,WT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ZT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,KT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,QT=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,JT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$T=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,t1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,e1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,n1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,i1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,a1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,s1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,r1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,o1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,l1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,c1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,u1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,f1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,d1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,h1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,p1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,m1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,g1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,v1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,x1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,y1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,S1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const M1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,b1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,E1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,T1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,A1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,C1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,w1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,D1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,N1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,L1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,U1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,P1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,I1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,z1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,F1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,B1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,H1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,G1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,V1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,k1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,j1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,X1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Y1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,W1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Z1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,K1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Q1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,J1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tA=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,eA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ce={alphahash_fragment:bE,alphahash_pars_fragment:EE,alphamap_fragment:TE,alphamap_pars_fragment:AE,alphatest_fragment:CE,alphatest_pars_fragment:RE,aomap_fragment:wE,aomap_pars_fragment:DE,batching_pars_vertex:NE,batching_vertex:LE,begin_vertex:UE,beginnormal_vertex:OE,bsdfs:PE,iridescence_fragment:IE,bumpmap_pars_fragment:zE,clipping_planes_fragment:FE,clipping_planes_pars_fragment:BE,clipping_planes_pars_vertex:HE,clipping_planes_vertex:GE,color_fragment:VE,color_pars_fragment:kE,color_pars_vertex:jE,color_vertex:XE,common:YE,cube_uv_reflection_fragment:WE,defaultnormal_vertex:qE,displacementmap_pars_vertex:ZE,displacementmap_vertex:KE,emissivemap_fragment:QE,emissivemap_pars_fragment:JE,colorspace_fragment:$E,colorspace_pars_fragment:tT,envmap_fragment:eT,envmap_common_pars_fragment:nT,envmap_pars_fragment:iT,envmap_pars_vertex:aT,envmap_physical_pars_fragment:mT,envmap_vertex:sT,fog_vertex:rT,fog_pars_vertex:oT,fog_fragment:lT,fog_pars_fragment:cT,gradientmap_pars_fragment:uT,lightmap_pars_fragment:fT,lights_lambert_fragment:dT,lights_lambert_pars_fragment:hT,lights_pars_begin:pT,lights_toon_fragment:gT,lights_toon_pars_fragment:_T,lights_phong_fragment:vT,lights_phong_pars_fragment:xT,lights_physical_fragment:yT,lights_physical_pars_fragment:ST,lights_fragment_begin:MT,lights_fragment_maps:bT,lights_fragment_end:ET,logdepthbuf_fragment:TT,logdepthbuf_pars_fragment:AT,logdepthbuf_pars_vertex:CT,logdepthbuf_vertex:RT,map_fragment:wT,map_pars_fragment:DT,map_particle_fragment:NT,map_particle_pars_fragment:LT,metalnessmap_fragment:UT,metalnessmap_pars_fragment:OT,morphinstance_vertex:PT,morphcolor_vertex:IT,morphnormal_vertex:zT,morphtarget_pars_vertex:FT,morphtarget_vertex:BT,normal_fragment_begin:HT,normal_fragment_maps:GT,normal_pars_fragment:VT,normal_pars_vertex:kT,normal_vertex:jT,normalmap_pars_fragment:XT,clearcoat_normal_fragment_begin:YT,clearcoat_normal_fragment_maps:WT,clearcoat_pars_fragment:qT,iridescence_pars_fragment:ZT,opaque_fragment:KT,packing:QT,premultiplied_alpha_fragment:JT,project_vertex:$T,dithering_fragment:t1,dithering_pars_fragment:e1,roughnessmap_fragment:n1,roughnessmap_pars_fragment:i1,shadowmap_pars_fragment:a1,shadowmap_pars_vertex:s1,shadowmap_vertex:r1,shadowmask_pars_fragment:o1,skinbase_vertex:l1,skinning_pars_vertex:c1,skinning_vertex:u1,skinnormal_vertex:f1,specularmap_fragment:d1,specularmap_pars_fragment:h1,tonemapping_fragment:p1,tonemapping_pars_fragment:m1,transmission_fragment:g1,transmission_pars_fragment:_1,uv_pars_fragment:v1,uv_pars_vertex:x1,uv_vertex:y1,worldpos_vertex:S1,background_vert:M1,background_frag:b1,backgroundCube_vert:E1,backgroundCube_frag:T1,cube_vert:A1,cube_frag:C1,depth_vert:R1,depth_frag:w1,distance_vert:D1,distance_frag:N1,equirect_vert:L1,equirect_frag:U1,linedashed_vert:O1,linedashed_frag:P1,meshbasic_vert:I1,meshbasic_frag:z1,meshlambert_vert:F1,meshlambert_frag:B1,meshmatcap_vert:H1,meshmatcap_frag:G1,meshnormal_vert:V1,meshnormal_frag:k1,meshphong_vert:j1,meshphong_frag:X1,meshphysical_vert:Y1,meshphysical_frag:W1,meshtoon_vert:q1,meshtoon_frag:Z1,points_vert:K1,points_frag:Q1,shadow_vert:J1,shadow_frag:$1,sprite_vert:tA,sprite_frag:eA},Zt={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Te},alphaMap:{value:null},alphaMapTransform:{value:new Te},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Te}},envmap:{envMap:{value:null},envMapRotation:{value:new Te},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Te}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Te}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Te},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Te},normalScale:{value:new Re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Te},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Te}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Te}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Te}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Te},alphaTest:{value:0},uvTransform:{value:new Te}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Te},alphaMap:{value:null},alphaMapTransform:{value:new Te},alphaTest:{value:0}}},ha={basic:{uniforms:ai([Zt.common,Zt.specularmap,Zt.envmap,Zt.aomap,Zt.lightmap,Zt.fog]),vertexShader:Ce.meshbasic_vert,fragmentShader:Ce.meshbasic_frag},lambert:{uniforms:ai([Zt.common,Zt.specularmap,Zt.envmap,Zt.aomap,Zt.lightmap,Zt.emissivemap,Zt.bumpmap,Zt.normalmap,Zt.displacementmap,Zt.fog,Zt.lights,{emissive:{value:new ze(0)},envMapIntensity:{value:1}}]),vertexShader:Ce.meshlambert_vert,fragmentShader:Ce.meshlambert_frag},phong:{uniforms:ai([Zt.common,Zt.specularmap,Zt.envmap,Zt.aomap,Zt.lightmap,Zt.emissivemap,Zt.bumpmap,Zt.normalmap,Zt.displacementmap,Zt.fog,Zt.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ce.meshphong_vert,fragmentShader:Ce.meshphong_frag},standard:{uniforms:ai([Zt.common,Zt.envmap,Zt.aomap,Zt.lightmap,Zt.emissivemap,Zt.bumpmap,Zt.normalmap,Zt.displacementmap,Zt.roughnessmap,Zt.metalnessmap,Zt.fog,Zt.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ce.meshphysical_vert,fragmentShader:Ce.meshphysical_frag},toon:{uniforms:ai([Zt.common,Zt.aomap,Zt.lightmap,Zt.emissivemap,Zt.bumpmap,Zt.normalmap,Zt.displacementmap,Zt.gradientmap,Zt.fog,Zt.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ce.meshtoon_vert,fragmentShader:Ce.meshtoon_frag},matcap:{uniforms:ai([Zt.common,Zt.bumpmap,Zt.normalmap,Zt.displacementmap,Zt.fog,{matcap:{value:null}}]),vertexShader:Ce.meshmatcap_vert,fragmentShader:Ce.meshmatcap_frag},points:{uniforms:ai([Zt.points,Zt.fog]),vertexShader:Ce.points_vert,fragmentShader:Ce.points_frag},dashed:{uniforms:ai([Zt.common,Zt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ce.linedashed_vert,fragmentShader:Ce.linedashed_frag},depth:{uniforms:ai([Zt.common,Zt.displacementmap]),vertexShader:Ce.depth_vert,fragmentShader:Ce.depth_frag},normal:{uniforms:ai([Zt.common,Zt.bumpmap,Zt.normalmap,Zt.displacementmap,{opacity:{value:1}}]),vertexShader:Ce.meshnormal_vert,fragmentShader:Ce.meshnormal_frag},sprite:{uniforms:ai([Zt.sprite,Zt.fog]),vertexShader:Ce.sprite_vert,fragmentShader:Ce.sprite_frag},background:{uniforms:{uvTransform:{value:new Te},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ce.background_vert,fragmentShader:Ce.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Te}},vertexShader:Ce.backgroundCube_vert,fragmentShader:Ce.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ce.cube_vert,fragmentShader:Ce.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ce.equirect_vert,fragmentShader:Ce.equirect_frag},distance:{uniforms:ai([Zt.common,Zt.displacementmap,{referencePosition:{value:new it},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ce.distance_vert,fragmentShader:Ce.distance_frag},shadow:{uniforms:ai([Zt.lights,Zt.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Ce.shadow_vert,fragmentShader:Ce.shadow_frag}};ha.physical={uniforms:ai([ha.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Te},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Te},clearcoatNormalScale:{value:new Re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Te},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Te},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Te},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Te},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Te},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Te},transmissionSamplerSize:{value:new Re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Te},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Te},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Te},anisotropyVector:{value:new Re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Te}}]),vertexShader:Ce.meshphysical_vert,fragmentShader:Ce.meshphysical_frag};const fu={r:0,b:0,g:0},ar=new $a,nA=new pn;function iA(r,t,i,s,l,c){const f=new ze(0);let p=l===!0?0:1,m,h,_=null,v=0,g=null;function M(L){let F=L.isScene===!0?L.background:null;if(F&&F.isTexture){const N=L.backgroundBlurriness>0;F=t.get(F,N)}return F}function E(L){let F=!1;const N=M(L);N===null?x(f,p):N&&N.isColor&&(x(N,1),F=!0);const H=r.xr.getEnvironmentBlendMode();H==="additive"?i.buffers.color.setClear(0,0,0,1,c):H==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||F)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function R(L,F){const N=M(F);N&&(N.isCubeTexture||N.mapping===Ou)?(h===void 0&&(h=new ya(new To(1,1,1),new Sa({name:"BackgroundCubeMaterial",uniforms:Mo(ha.backgroundCube.uniforms),vertexShader:ha.backgroundCube.vertexShader,fragmentShader:ha.backgroundCube.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(H,z,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ar.copy(F.backgroundRotation),ar.x*=-1,ar.y*=-1,ar.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(ar.y*=-1,ar.z*=-1),h.material.uniforms.envMap.value=N,h.material.uniforms.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=F.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=F.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(nA.makeRotationFromEuler(ar)),h.material.toneMapped=ke.getTransfer(N.colorSpace)!==Je,(_!==N||v!==N.version||g!==r.toneMapping)&&(h.material.needsUpdate=!0,_=N,v=N.version,g=r.toneMapping),h.layers.enableAll(),L.unshift(h,h.geometry,h.material,0,0,null)):N&&N.isTexture&&(m===void 0&&(m=new ya(new Iu(2,2),new Sa({name:"BackgroundMaterial",uniforms:Mo(ha.background.uniforms),vertexShader:ha.background.vertexShader,fragmentShader:ha.background.fragmentShader,side:Is,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=N,m.material.uniforms.backgroundIntensity.value=F.backgroundIntensity,m.material.toneMapped=ke.getTransfer(N.colorSpace)!==Je,N.matrixAutoUpdate===!0&&N.updateMatrix(),m.material.uniforms.uvTransform.value.copy(N.matrix),(_!==N||v!==N.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,_=N,v=N.version,g=r.toneMapping),m.layers.enableAll(),L.unshift(m,m.geometry,m.material,0,0,null))}function x(L,F){L.getRGB(fu,Ux(r)),i.buffers.color.setClear(fu.r,fu.g,fu.b,F,c)}function b(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(L,F=1){f.set(L),p=F,x(f,p)},getClearAlpha:function(){return p},setClearAlpha:function(L){p=L,x(f,p)},render:E,addToRenderList:R,dispose:b}}function aA(r,t){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=g(null);let c=l,f=!1;function p(V,J,at,st,et){let P=!1;const G=v(V,st,at,J);c!==G&&(c=G,h(c.object)),P=M(V,st,at,et),P&&E(V,st,at,et),et!==null&&t.update(et,r.ELEMENT_ARRAY_BUFFER),(P||f)&&(f=!1,N(V,J,at,st),et!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(et).buffer))}function m(){return r.createVertexArray()}function h(V){return r.bindVertexArray(V)}function _(V){return r.deleteVertexArray(V)}function v(V,J,at,st){const et=st.wireframe===!0;let P=s[J.id];P===void 0&&(P={},s[J.id]=P);const G=V.isInstancedMesh===!0?V.id:0;let Y=P[G];Y===void 0&&(Y={},P[G]=Y);let ot=Y[at.id];ot===void 0&&(ot={},Y[at.id]=ot);let yt=ot[et];return yt===void 0&&(yt=g(m()),ot[et]=yt),yt}function g(V){const J=[],at=[],st=[];for(let et=0;et<i;et++)J[et]=0,at[et]=0,st[et]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:J,enabledAttributes:at,attributeDivisors:st,object:V,attributes:{},index:null}}function M(V,J,at,st){const et=c.attributes,P=J.attributes;let G=0;const Y=at.getAttributes();for(const ot in Y)if(Y[ot].location>=0){const B=et[ot];let W=P[ot];if(W===void 0&&(ot==="instanceMatrix"&&V.instanceMatrix&&(W=V.instanceMatrix),ot==="instanceColor"&&V.instanceColor&&(W=V.instanceColor)),B===void 0||B.attribute!==W||W&&B.data!==W.data)return!0;G++}return c.attributesNum!==G||c.index!==st}function E(V,J,at,st){const et={},P=J.attributes;let G=0;const Y=at.getAttributes();for(const ot in Y)if(Y[ot].location>=0){let B=P[ot];B===void 0&&(ot==="instanceMatrix"&&V.instanceMatrix&&(B=V.instanceMatrix),ot==="instanceColor"&&V.instanceColor&&(B=V.instanceColor));const W={};W.attribute=B,B&&B.data&&(W.data=B.data),et[ot]=W,G++}c.attributes=et,c.attributesNum=G,c.index=st}function R(){const V=c.newAttributes;for(let J=0,at=V.length;J<at;J++)V[J]=0}function x(V){b(V,0)}function b(V,J){const at=c.newAttributes,st=c.enabledAttributes,et=c.attributeDivisors;at[V]=1,st[V]===0&&(r.enableVertexAttribArray(V),st[V]=1),et[V]!==J&&(r.vertexAttribDivisor(V,J),et[V]=J)}function L(){const V=c.newAttributes,J=c.enabledAttributes;for(let at=0,st=J.length;at<st;at++)J[at]!==V[at]&&(r.disableVertexAttribArray(at),J[at]=0)}function F(V,J,at,st,et,P,G){G===!0?r.vertexAttribIPointer(V,J,at,et,P):r.vertexAttribPointer(V,J,at,st,et,P)}function N(V,J,at,st){R();const et=st.attributes,P=at.getAttributes(),G=J.defaultAttributeValues;for(const Y in P){const ot=P[Y];if(ot.location>=0){let yt=et[Y];if(yt===void 0&&(Y==="instanceMatrix"&&V.instanceMatrix&&(yt=V.instanceMatrix),Y==="instanceColor"&&V.instanceColor&&(yt=V.instanceColor)),yt!==void 0){const B=yt.normalized,W=yt.itemSize,dt=t.get(yt);if(dt===void 0)continue;const Dt=dt.buffer,zt=dt.type,Q=dt.bytesPerElement,Et=zt===r.INT||zt===r.UNSIGNED_INT||yt.gpuType===Np;if(yt.isInterleavedBufferAttribute){const Mt=yt.data,Wt=Mt.stride,Ut=yt.offset;if(Mt.isInstancedInterleavedBuffer){for(let re=0;re<ot.locationSize;re++)b(ot.location+re,Mt.meshPerAttribute);V.isInstancedMesh!==!0&&st._maxInstanceCount===void 0&&(st._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let re=0;re<ot.locationSize;re++)x(ot.location+re);r.bindBuffer(r.ARRAY_BUFFER,Dt);for(let re=0;re<ot.locationSize;re++)F(ot.location+re,W/ot.locationSize,zt,B,Wt*Q,(Ut+W/ot.locationSize*re)*Q,Et)}else{if(yt.isInstancedBufferAttribute){for(let Mt=0;Mt<ot.locationSize;Mt++)b(ot.location+Mt,yt.meshPerAttribute);V.isInstancedMesh!==!0&&st._maxInstanceCount===void 0&&(st._maxInstanceCount=yt.meshPerAttribute*yt.count)}else for(let Mt=0;Mt<ot.locationSize;Mt++)x(ot.location+Mt);r.bindBuffer(r.ARRAY_BUFFER,Dt);for(let Mt=0;Mt<ot.locationSize;Mt++)F(ot.location+Mt,W/ot.locationSize,zt,B,W*Q,W/ot.locationSize*Mt*Q,Et)}}else if(G!==void 0){const B=G[Y];if(B!==void 0)switch(B.length){case 2:r.vertexAttrib2fv(ot.location,B);break;case 3:r.vertexAttrib3fv(ot.location,B);break;case 4:r.vertexAttrib4fv(ot.location,B);break;default:r.vertexAttrib1fv(ot.location,B)}}}}L()}function H(){O();for(const V in s){const J=s[V];for(const at in J){const st=J[at];for(const et in st){const P=st[et];for(const G in P)_(P[G].object),delete P[G];delete st[et]}}delete s[V]}}function z(V){if(s[V.id]===void 0)return;const J=s[V.id];for(const at in J){const st=J[at];for(const et in st){const P=st[et];for(const G in P)_(P[G].object),delete P[G];delete st[et]}}delete s[V.id]}function I(V){for(const J in s){const at=s[J];for(const st in at){const et=at[st];if(et[V.id]===void 0)continue;const P=et[V.id];for(const G in P)_(P[G].object),delete P[G];delete et[V.id]}}}function T(V){for(const J in s){const at=s[J],st=V.isInstancedMesh===!0?V.id:0,et=at[st];if(et!==void 0){for(const P in et){const G=et[P];for(const Y in G)_(G[Y].object),delete G[Y];delete et[P]}delete at[st],Object.keys(at).length===0&&delete s[J]}}}function O(){mt(),f=!0,c!==l&&(c=l,h(c.object))}function mt(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:O,resetDefaultState:mt,dispose:H,releaseStatesOfGeometry:z,releaseStatesOfObject:T,releaseStatesOfProgram:I,initAttributes:R,enableAttribute:x,disableUnusedAttributes:L}}function sA(r,t,i){let s;function l(h){s=h}function c(h,_){r.drawArrays(s,h,_),i.update(_,s,1)}function f(h,_,v){v!==0&&(r.drawArraysInstanced(s,h,_,v),i.update(_,s,v))}function p(h,_,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,h,0,_,0,v);let M=0;for(let E=0;E<v;E++)M+=_[E];i.update(M,s,1)}function m(h,_,v,g){if(v===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let E=0;E<h.length;E++)f(h[E],_[E],g[E]);else{M.multiDrawArraysInstancedWEBGL(s,h,0,_,0,g,0,v);let E=0;for(let R=0;R<v;R++)E+=_[R]*g[R];i.update(E,s,1)}}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=p,this.renderMultiDrawInstances=m}function rA(r,t,i,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const I=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(I){return!(I!==sa&&s.convert(I)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(I){const T=I===Qa&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==ki&&s.convert(I)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==ma&&!T)}function m(I){if(I==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=i.precision!==void 0?i.precision:"highp";const _=m(h);_!==h&&(ge("WebGLRenderer:",h,"not supported, using",_,"instead."),h=_);const v=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),M=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),R=r.getParameter(r.MAX_TEXTURE_SIZE),x=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),b=r.getParameter(r.MAX_VERTEX_ATTRIBS),L=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),F=r.getParameter(r.MAX_VARYING_VECTORS),N=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),H=r.getParameter(r.MAX_SAMPLES),z=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:p,precision:h,logarithmicDepthBuffer:v,reversedDepthBuffer:g,maxTextures:M,maxVertexTextures:E,maxTextureSize:R,maxCubemapSize:x,maxAttributes:b,maxVertexUniforms:L,maxVaryings:F,maxFragmentUniforms:N,maxSamples:H,samples:z}}function oA(r){const t=this;let i=null,s=0,l=!1,c=!1;const f=new ia,p=new Te,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(v,g){const M=v.length!==0||g||s!==0||l;return l=g,s=v.length,M},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(v,g){i=_(v,g,0)},this.setState=function(v,g,M){const E=v.clippingPlanes,R=v.clipIntersection,x=v.clipShadows,b=r.get(v);if(!l||E===null||E.length===0||c&&!x)c?_(null):h();else{const L=c?0:s,F=L*4;let N=b.clippingState||null;m.value=N,N=_(E,g,F,M);for(let H=0;H!==F;++H)N[H]=i[H];b.clippingState=N,this.numIntersection=R?this.numPlanes:0,this.numPlanes+=L}};function h(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function _(v,g,M,E){const R=v!==null?v.length:0;let x=null;if(R!==0){if(x=m.value,E!==!0||x===null){const b=M+R*4,L=g.matrixWorldInverse;p.getNormalMatrix(L),(x===null||x.length<b)&&(x=new Float32Array(b));for(let F=0,N=M;F!==R;++F,N+=4)f.copy(v[F]).applyMatrix4(L,p),f.normal.toArray(x,N),x[N+3]=f.constant}m.value=x,m.needsUpdate=!0}return t.numPlanes=R,t.numIntersection=0,x}}const Ps=4,_v=[.125,.215,.35,.446,.526,.582],or=20,lA=256,yl=new Lu,vv=new ze;let xh=null,yh=0,Sh=0,Mh=!1;const cA=new it;class xv{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,i=0,s=.1,l=100,c={}){const{size:f=256,position:p=cA}=c;xh=this._renderer.getRenderTarget(),yh=this._renderer.getActiveCubeFace(),Sh=this._renderer.getActiveMipmapLevel(),Mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,s,l,m,p),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(xh,yh,Sh),this._renderer.xr.enabled=Mh,t.scissorTest=!1,lo(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===fr||t.mapping===xo?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),xh=this._renderer.getRenderTarget(),yh=this._renderer.getActiveCubeFace(),Sh=this._renderer.getActiveMipmapLevel(),Mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Jn,minFilter:Jn,generateMipmaps:!1,type:Qa,format:sa,colorSpace:So,depthBuffer:!1},l=yv(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yv(t,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=uA(c)),this._blurMaterial=dA(c,t,i),this._ggxMaterial=fA(c,t,i)}return l}_compileMaterial(t){const i=new ya(new oi,t);this._renderer.compile(i,yl)}_sceneToCubeUV(t,i,s,l,c){const m=new Vi(90,1,i,s),h=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],v=this._renderer,g=v.autoClear,M=v.toneMapping;v.getClearColor(vv),v.toneMapping=_a,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(l),v.clearDepth(),v.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ya(new To,new Vp({name:"PMREM.Background",side:vi,depthWrite:!1,depthTest:!1})));const R=this._backgroundBox,x=R.material;let b=!1;const L=t.background;L?L.isColor&&(x.color.copy(L),t.background=null,b=!0):(x.color.copy(vv),b=!0);for(let F=0;F<6;F++){const N=F%3;N===0?(m.up.set(0,h[F],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+_[F],c.y,c.z)):N===1?(m.up.set(0,0,h[F]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+_[F],c.z)):(m.up.set(0,h[F],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+_[F]));const H=this._cubeSize;lo(l,N*H,F>2?H:0,H,H),v.setRenderTarget(l),b&&v.render(R,m),v.render(t,m)}v.toneMapping=M,v.autoClear=g,t.background=L}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===fr||t.mapping===xo;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mv()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sv());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const p=c.uniforms;p.envMap.value=t;const m=this._cubeSize;lo(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(f,yl)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(t,c-1,c);i.autoClear=s}_applyGGXFilter(t,i,s){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,p=this._lodMeshes[s];p.material=f;const m=f.uniforms,h=s/(this._lodMeshes.length-1),_=i/(this._lodMeshes.length-1),v=Math.sqrt(h*h-_*_),g=0+h*1.25,M=v*g,{_lodMax:E}=this,R=this._sizeLods[s],x=3*R*(s>E-Ps?s-E+Ps:0),b=4*(this._cubeSize-R);m.envMap.value=t.texture,m.roughness.value=M,m.mipInt.value=E-i,lo(c,x,b,3*R,2*R),l.setRenderTarget(c),l.render(p,yl),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=E-s,lo(t,x,b,3*R,2*R),l.setRenderTarget(t),l.render(p,yl)}_blur(t,i,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(t,f,i,s,l,"latitudinal",c),this._halfBlur(f,t,s,s,l,"longitudinal",c)}_halfBlur(t,i,s,l,c,f,p){const m=this._renderer,h=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&Ve("blur direction must be either latitudinal or longitudinal!");const _=3,v=this._lodMeshes[l];v.material=h;const g=h.uniforms,M=this._sizeLods[s]-1,E=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*or-1),R=c/E,x=isFinite(c)?1+Math.floor(_*R):or;x>or&&ge(`sigmaRadians, ${c}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${or}`);const b=[];let L=0;for(let I=0;I<or;++I){const T=I/R,O=Math.exp(-T*T/2);b.push(O),I===0?L+=O:I<x&&(L+=2*O)}for(let I=0;I<b.length;I++)b[I]=b[I]/L;g.envMap.value=t.texture,g.samples.value=x,g.weights.value=b,g.latitudinal.value=f==="latitudinal",p&&(g.poleAxis.value=p);const{_lodMax:F}=this;g.dTheta.value=E,g.mipInt.value=F-s;const N=this._sizeLods[l],H=3*N*(l>F-Ps?l-F+Ps:0),z=4*(this._cubeSize-N);lo(i,H,z,3*N,2*N),m.setRenderTarget(i),m.render(v,yl)}}function uA(r){const t=[],i=[],s=[];let l=r;const c=r-Ps+1+_v.length;for(let f=0;f<c;f++){const p=Math.pow(2,l);t.push(p);let m=1/p;f>r-Ps?m=_v[f-r+Ps-1]:f===0&&(m=0),i.push(m);const h=1/(p-2),_=-h,v=1+h,g=[_,_,v,_,v,v,_,_,v,v,_,v],M=6,E=6,R=3,x=2,b=1,L=new Float32Array(R*E*M),F=new Float32Array(x*E*M),N=new Float32Array(b*E*M);for(let z=0;z<M;z++){const I=z%3*2/3-1,T=z>2?0:-1,O=[I,T,0,I+2/3,T,0,I+2/3,T+1,0,I,T,0,I+2/3,T+1,0,I,T+1,0];L.set(O,R*E*z),F.set(g,x*E*z);const mt=[z,z,z,z,z,z];N.set(mt,b*E*z)}const H=new oi;H.setAttribute("position",new Xi(L,R)),H.setAttribute("uv",new Xi(F,x)),H.setAttribute("faceIndex",new Xi(N,b)),s.push(new ya(H,null)),l>Ps&&l--}return{lodMeshes:s,sizeLods:t,sigmas:i}}function yv(r,t,i){const s=new va(r,t,i);return s.texture.mapping=Ou,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function lo(r,t,i,s,l){r.viewport.set(t,i,s,l),r.scissor.set(t,i,s,l)}function fA(r,t,i){return new Sa({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:lA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:zu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Za,depthTest:!1,depthWrite:!1})}function dA(r,t,i){const s=new Float32Array(or),l=new it(0,1,0);return new Sa({name:"SphericalGaussianBlur",defines:{n:or,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:zu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Za,depthTest:!1,depthWrite:!1})}function Sv(){return new Sa({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Za,depthTest:!1,depthWrite:!1})}function Mv(){return new Sa({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Za,depthTest:!1,depthWrite:!1})}function zu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Ix extends va{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new Nx(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new To(5,5,5),c=new Sa({name:"CubemapFromEquirect",uniforms:Mo(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:vi,blending:Za});c.uniforms.tEquirect.value=i;const f=new ya(l,c),p=i.minFilter;return i.minFilter===lr&&(i.minFilter=Jn),new mE(1,10,this).update(t,f),i.minFilter=p,f.geometry.dispose(),f.material.dispose(),this}clear(t,i=!0,s=!0,l=!0){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(i,s,l);t.setRenderTarget(c)}}function hA(r){let t=new WeakMap,i=new WeakMap,s=null;function l(g,M=!1){return g==null?null:M?f(g):c(g)}function c(g){if(g&&g.isTexture){const M=g.mapping;if(M===Yd||M===Wd)if(t.has(g)){const E=t.get(g).texture;return p(E,g.mapping)}else{const E=g.image;if(E&&E.height>0){const R=new Ix(E.height);return R.fromEquirectangularTexture(r,g),t.set(g,R),g.addEventListener("dispose",h),p(R.texture,g.mapping)}else return null}}return g}function f(g){if(g&&g.isTexture){const M=g.mapping,E=M===Yd||M===Wd,R=M===fr||M===xo;if(E||R){let x=i.get(g);const b=x!==void 0?x.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==b)return s===null&&(s=new xv(r)),x=E?s.fromEquirectangular(g,x):s.fromCubemap(g,x),x.texture.pmremVersion=g.pmremVersion,i.set(g,x),x.texture;if(x!==void 0)return x.texture;{const L=g.image;return E&&L&&L.height>0||R&&L&&m(L)?(s===null&&(s=new xv(r)),x=E?s.fromEquirectangular(g):s.fromCubemap(g),x.texture.pmremVersion=g.pmremVersion,i.set(g,x),g.addEventListener("dispose",_),x.texture):null}}}return g}function p(g,M){return M===Yd?g.mapping=fr:M===Wd&&(g.mapping=xo),g}function m(g){let M=0;const E=6;for(let R=0;R<E;R++)g[R]!==void 0&&M++;return M===E}function h(g){const M=g.target;M.removeEventListener("dispose",h);const E=t.get(M);E!==void 0&&(t.delete(M),E.dispose())}function _(g){const M=g.target;M.removeEventListener("dispose",_);const E=i.get(M);E!==void 0&&(i.delete(M),E.dispose())}function v(){t=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:v}}function pA(r){const t={};function i(s){if(t[s]!==void 0)return t[s];const l=r.getExtension(s);return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&wu("WebGLRenderer: "+s+" extension not supported."),l}}}function mA(r,t,i,s){const l={},c=new WeakMap;function f(v){const g=v.target;g.index!==null&&t.remove(g.index);for(const E in g.attributes)t.remove(g.attributes[E]);g.removeEventListener("dispose",f),delete l[g.id];const M=c.get(g);M&&(t.remove(M),c.delete(g)),s.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function p(v,g){return l[g.id]===!0||(g.addEventListener("dispose",f),l[g.id]=!0,i.memory.geometries++),g}function m(v){const g=v.attributes;for(const M in g)t.update(g[M],r.ARRAY_BUFFER)}function h(v){const g=[],M=v.index,E=v.attributes.position;let R=0;if(E===void 0)return;if(M!==null){const L=M.array;R=M.version;for(let F=0,N=L.length;F<N;F+=3){const H=L[F+0],z=L[F+1],I=L[F+2];g.push(H,z,z,I,I,H)}}else{const L=E.array;R=E.version;for(let F=0,N=L.length/3-1;F<N;F+=3){const H=F+0,z=F+1,I=F+2;g.push(H,z,z,I,I,H)}}const x=new(E.count>=65535?Rx:Cx)(g,1);x.version=R;const b=c.get(v);b&&t.remove(b),c.set(v,x)}function _(v){const g=c.get(v);if(g){const M=v.index;M!==null&&g.version<M.version&&h(v)}else h(v);return c.get(v)}return{get:p,update:m,getWireframeAttribute:_}}function gA(r,t,i){let s;function l(g){s=g}let c,f;function p(g){c=g.type,f=g.bytesPerElement}function m(g,M){r.drawElements(s,M,c,g*f),i.update(M,s,1)}function h(g,M,E){E!==0&&(r.drawElementsInstanced(s,M,c,g*f,E),i.update(M,s,E))}function _(g,M,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,M,0,c,g,0,E);let x=0;for(let b=0;b<E;b++)x+=M[b];i.update(x,s,1)}function v(g,M,E,R){if(E===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let b=0;b<g.length;b++)h(g[b]/f,M[b],R[b]);else{x.multiDrawElementsInstancedWEBGL(s,M,0,c,g,0,R,0,E);let b=0;for(let L=0;L<E;L++)b+=M[L]*R[L];i.update(b,s,1)}}this.setMode=l,this.setIndex=p,this.render=m,this.renderInstances=h,this.renderMultiDraw=_,this.renderMultiDrawInstances=v}function _A(r){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,p){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=p*(c/3);break;case r.LINES:i.lines+=p*(c/2);break;case r.LINE_STRIP:i.lines+=p*(c-1);break;case r.LINE_LOOP:i.lines+=p*c;break;case r.POINTS:i.points+=p*c;break;default:Ve("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function vA(r,t,i){const s=new WeakMap,l=new bn;function c(f,p,m){const h=f.morphTargetInfluences,_=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,v=_!==void 0?_.length:0;let g=s.get(p);if(g===void 0||g.count!==v){let O=function(){I.dispose(),s.delete(p),p.removeEventListener("dispose",O)};g!==void 0&&g.texture.dispose();const M=p.morphAttributes.position!==void 0,E=p.morphAttributes.normal!==void 0,R=p.morphAttributes.color!==void 0,x=p.morphAttributes.position||[],b=p.morphAttributes.normal||[],L=p.morphAttributes.color||[];let F=0;M===!0&&(F=1),E===!0&&(F=2),R===!0&&(F=3);let N=p.attributes.position.count*F,H=1;N>t.maxTextureSize&&(H=Math.ceil(N/t.maxTextureSize),N=t.maxTextureSize);const z=new Float32Array(N*H*4*v),I=new Tx(z,N,H,v);I.type=ma,I.needsUpdate=!0;const T=F*4;for(let mt=0;mt<v;mt++){const V=x[mt],J=b[mt],at=L[mt],st=N*H*4*mt;for(let et=0;et<V.count;et++){const P=et*T;M===!0&&(l.fromBufferAttribute(V,et),z[st+P+0]=l.x,z[st+P+1]=l.y,z[st+P+2]=l.z,z[st+P+3]=0),E===!0&&(l.fromBufferAttribute(J,et),z[st+P+4]=l.x,z[st+P+5]=l.y,z[st+P+6]=l.z,z[st+P+7]=0),R===!0&&(l.fromBufferAttribute(at,et),z[st+P+8]=l.x,z[st+P+9]=l.y,z[st+P+10]=l.z,z[st+P+11]=at.itemSize===4?l.w:1)}}g={count:v,texture:I,size:new Re(N,H)},s.set(p,g),p.addEventListener("dispose",O)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let M=0;for(let R=0;R<h.length;R++)M+=h[R];const E=p.morphTargetsRelative?1:1-M;m.getUniforms().setValue(r,"morphTargetBaseInfluence",E),m.getUniforms().setValue(r,"morphTargetInfluences",h)}m.getUniforms().setValue(r,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function xA(r,t,i,s,l){let c=new WeakMap;function f(h){const _=l.render.frame,v=h.geometry,g=t.get(h,v);if(c.get(g)!==_&&(t.update(g),c.set(g,_)),h.isInstancedMesh&&(h.hasEventListener("dispose",m)===!1&&h.addEventListener("dispose",m),c.get(h)!==_&&(i.update(h.instanceMatrix,r.ARRAY_BUFFER),h.instanceColor!==null&&i.update(h.instanceColor,r.ARRAY_BUFFER),c.set(h,_))),h.isSkinnedMesh){const M=h.skeleton;c.get(M)!==_&&(M.update(),c.set(M,_))}return g}function p(){c=new WeakMap}function m(h){const _=h.target;_.removeEventListener("dispose",m),s.releaseStatesOfObject(_),i.remove(_.instanceMatrix),_.instanceColor!==null&&i.remove(_.instanceColor)}return{update:f,dispose:p}}const yA={[lx]:"LINEAR_TONE_MAPPING",[cx]:"REINHARD_TONE_MAPPING",[ux]:"CINEON_TONE_MAPPING",[fx]:"ACES_FILMIC_TONE_MAPPING",[hx]:"AGX_TONE_MAPPING",[px]:"NEUTRAL_TONE_MAPPING",[dx]:"CUSTOM_TONE_MAPPING"};function SA(r,t,i,s,l){const c=new va(t,i,{type:r,depthBuffer:s,stencilBuffer:l}),f=new va(t,i,{type:Qa,depthBuffer:!1,stencilBuffer:!1}),p=new oi;p.setAttribute("position",new ti([-1,3,0,-1,-1,0,3,-1,0],3)),p.setAttribute("uv",new ti([0,2,0,0,2,0],2));const m=new uE({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new ya(p,m),_=new Lu(-1,1,1,-1,0,1);let v=null,g=null,M=!1,E,R=null,x=[],b=!1;this.setSize=function(L,F){c.setSize(L,F),f.setSize(L,F);for(let N=0;N<x.length;N++){const H=x[N];H.setSize&&H.setSize(L,F)}},this.setEffects=function(L){x=L,b=x.length>0&&x[0].isRenderPass===!0;const F=c.width,N=c.height;for(let H=0;H<x.length;H++){const z=x[H];z.setSize&&z.setSize(F,N)}},this.begin=function(L,F){if(M||L.toneMapping===_a&&x.length===0)return!1;if(R=F,F!==null){const N=F.width,H=F.height;(c.width!==N||c.height!==H)&&this.setSize(N,H)}return b===!1&&L.setRenderTarget(c),E=L.toneMapping,L.toneMapping=_a,!0},this.hasRenderPass=function(){return b},this.end=function(L,F){L.toneMapping=E,M=!0;let N=c,H=f;for(let z=0;z<x.length;z++){const I=x[z];if(I.enabled!==!1&&(I.render(L,H,N,F),I.needsSwap!==!1)){const T=N;N=H,H=T}}if(v!==L.outputColorSpace||g!==L.toneMapping){v=L.outputColorSpace,g=L.toneMapping,m.defines={},ke.getTransfer(v)===Je&&(m.defines.SRGB_TRANSFER="");const z=yA[g];z&&(m.defines[z]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=N.texture,L.setRenderTarget(R),L.render(h,_),R=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){c.dispose(),f.dispose(),p.dispose(),m.dispose()}}const zx=new ri,Tp=new wl(1,1),Fx=new Tx,Bx=new Fb,Hx=new Nx,bv=[],Ev=[],Tv=new Float32Array(16),Av=new Float32Array(9),Cv=new Float32Array(4);function Ao(r,t,i){const s=r[0];if(s<=0||s>0)return r;const l=t*i;let c=bv[l];if(c===void 0&&(c=new Float32Array(l),bv[l]=c),t!==0){s.toArray(c,0);for(let f=1,p=0;f!==t;++f)p+=i,r[f].toArray(c,p)}return c}function Ln(r,t){if(r.length!==t.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==t[i])return!1;return!0}function Un(r,t){for(let i=0,s=t.length;i<s;i++)r[i]=t[i]}function Fu(r,t){let i=Ev[t];i===void 0&&(i=new Int32Array(t),Ev[t]=i);for(let s=0;s!==t;++s)i[s]=r.allocateTextureUnit();return i}function MA(r,t){const i=this.cache;i[0]!==t&&(r.uniform1f(this.addr,t),i[0]=t)}function bA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Ln(i,t))return;r.uniform2fv(this.addr,t),Un(i,t)}}function EA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(Ln(i,t))return;r.uniform3fv(this.addr,t),Un(i,t)}}function TA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Ln(i,t))return;r.uniform4fv(this.addr,t),Un(i,t)}}function AA(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Ln(i,t))return;r.uniformMatrix2fv(this.addr,!1,t),Un(i,t)}else{if(Ln(i,s))return;Cv.set(s),r.uniformMatrix2fv(this.addr,!1,Cv),Un(i,s)}}function CA(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Ln(i,t))return;r.uniformMatrix3fv(this.addr,!1,t),Un(i,t)}else{if(Ln(i,s))return;Av.set(s),r.uniformMatrix3fv(this.addr,!1,Av),Un(i,s)}}function RA(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Ln(i,t))return;r.uniformMatrix4fv(this.addr,!1,t),Un(i,t)}else{if(Ln(i,s))return;Tv.set(s),r.uniformMatrix4fv(this.addr,!1,Tv),Un(i,s)}}function wA(r,t){const i=this.cache;i[0]!==t&&(r.uniform1i(this.addr,t),i[0]=t)}function DA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Ln(i,t))return;r.uniform2iv(this.addr,t),Un(i,t)}}function NA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Ln(i,t))return;r.uniform3iv(this.addr,t),Un(i,t)}}function LA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Ln(i,t))return;r.uniform4iv(this.addr,t),Un(i,t)}}function UA(r,t){const i=this.cache;i[0]!==t&&(r.uniform1ui(this.addr,t),i[0]=t)}function OA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Ln(i,t))return;r.uniform2uiv(this.addr,t),Un(i,t)}}function PA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Ln(i,t))return;r.uniform3uiv(this.addr,t),Un(i,t)}}function IA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Ln(i,t))return;r.uniform4uiv(this.addr,t),Un(i,t)}}function zA(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(Tp.compareFunction=i.isReversedDepthBuffer()?Fp:zp,c=Tp):c=zx,i.setTexture2D(t||c,l)}function FA(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||Bx,l)}function BA(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||Hx,l)}function HA(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||Fx,l)}function GA(r){switch(r){case 5126:return MA;case 35664:return bA;case 35665:return EA;case 35666:return TA;case 35674:return AA;case 35675:return CA;case 35676:return RA;case 5124:case 35670:return wA;case 35667:case 35671:return DA;case 35668:case 35672:return NA;case 35669:case 35673:return LA;case 5125:return UA;case 36294:return OA;case 36295:return PA;case 36296:return IA;case 35678:case 36198:case 36298:case 36306:case 35682:return zA;case 35679:case 36299:case 36307:return FA;case 35680:case 36300:case 36308:case 36293:return BA;case 36289:case 36303:case 36311:case 36292:return HA}}function VA(r,t){r.uniform1fv(this.addr,t)}function kA(r,t){const i=Ao(t,this.size,2);r.uniform2fv(this.addr,i)}function jA(r,t){const i=Ao(t,this.size,3);r.uniform3fv(this.addr,i)}function XA(r,t){const i=Ao(t,this.size,4);r.uniform4fv(this.addr,i)}function YA(r,t){const i=Ao(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function WA(r,t){const i=Ao(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function qA(r,t){const i=Ao(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function ZA(r,t){r.uniform1iv(this.addr,t)}function KA(r,t){r.uniform2iv(this.addr,t)}function QA(r,t){r.uniform3iv(this.addr,t)}function JA(r,t){r.uniform4iv(this.addr,t)}function $A(r,t){r.uniform1uiv(this.addr,t)}function tC(r,t){r.uniform2uiv(this.addr,t)}function eC(r,t){r.uniform3uiv(this.addr,t)}function nC(r,t){r.uniform4uiv(this.addr,t)}function iC(r,t,i){const s=this.cache,l=t.length,c=Fu(i,l);Ln(s,c)||(r.uniform1iv(this.addr,c),Un(s,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=Tp:f=zx;for(let p=0;p!==l;++p)i.setTexture2D(t[p]||f,c[p])}function aC(r,t,i){const s=this.cache,l=t.length,c=Fu(i,l);Ln(s,c)||(r.uniform1iv(this.addr,c),Un(s,c));for(let f=0;f!==l;++f)i.setTexture3D(t[f]||Bx,c[f])}function sC(r,t,i){const s=this.cache,l=t.length,c=Fu(i,l);Ln(s,c)||(r.uniform1iv(this.addr,c),Un(s,c));for(let f=0;f!==l;++f)i.setTextureCube(t[f]||Hx,c[f])}function rC(r,t,i){const s=this.cache,l=t.length,c=Fu(i,l);Ln(s,c)||(r.uniform1iv(this.addr,c),Un(s,c));for(let f=0;f!==l;++f)i.setTexture2DArray(t[f]||Fx,c[f])}function oC(r){switch(r){case 5126:return VA;case 35664:return kA;case 35665:return jA;case 35666:return XA;case 35674:return YA;case 35675:return WA;case 35676:return qA;case 5124:case 35670:return ZA;case 35667:case 35671:return KA;case 35668:case 35672:return QA;case 35669:case 35673:return JA;case 5125:return $A;case 36294:return tC;case 36295:return eC;case 36296:return nC;case 35678:case 36198:case 36298:case 36306:case 35682:return iC;case 35679:case 36299:case 36307:return aC;case 35680:case 36300:case 36308:case 36293:return sC;case 36289:case 36303:case 36311:case 36292:return rC}}class lC{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=GA(i.type)}}class cC{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=oC(i.type)}}class uC{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const p=l[c];p.setValue(t,i[p.id],s)}}}const bh=/(\w+)(\])?(\[|\.)?/g;function Rv(r,t){r.seq.push(t),r.map[t.id]=t}function fC(r,t,i){const s=r.name,l=s.length;for(bh.lastIndex=0;;){const c=bh.exec(s),f=bh.lastIndex;let p=c[1];const m=c[2]==="]",h=c[3];if(m&&(p=p|0),h===void 0||h==="["&&f+2===l){Rv(i,h===void 0?new lC(p,r,t):new cC(p,r,t));break}else{let v=i.map[p];v===void 0&&(v=new uC(p),Rv(i,v)),i=v}}}class Eu{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let f=0;f<s;++f){const p=t.getActiveUniform(i,f),m=t.getUniformLocation(i,p.name);fC(p,m,this)}const l=[],c=[];for(const f of this.seq)f.type===t.SAMPLER_2D_SHADOW||f.type===t.SAMPLER_CUBE_SHADOW||f.type===t.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(t,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let c=0,f=i.length;c!==f;++c){const p=i[c],m=s[p.id];m.needsUpdate!==!1&&p.setValue(t,m.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in i&&s.push(f)}return s}}function wv(r,t,i){const s=r.createShader(t);return r.shaderSource(s,i),r.compileShader(s),s}const dC=37297;let hC=0;function pC(r,t){const i=r.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let f=l;f<c;f++){const p=f+1;s.push(`${p===t?">":" "} ${p}: ${i[f]}`)}return s.join(`
`)}const Dv=new Te;function mC(r){ke._getMatrix(Dv,ke.workingColorSpace,r);const t=`mat3( ${Dv.elements.map(i=>i.toFixed(4))} )`;switch(ke.getTransfer(r)){case Au:return[t,"LinearTransferOETF"];case Je:return[t,"sRGBTransferOETF"];default:return ge("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Nv(r,t,i){const s=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(s&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const p=parseInt(f[1]);return i.toUpperCase()+`

`+c+`

`+pC(r.getShaderSource(t),p)}else return c}function gC(r,t){const i=mC(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const _C={[lx]:"Linear",[cx]:"Reinhard",[ux]:"Cineon",[fx]:"ACESFilmic",[hx]:"AgX",[px]:"Neutral",[dx]:"Custom"};function vC(r,t){const i=_C[t];return i===void 0?(ge("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const du=new it;function xC(){ke.getLuminanceCoefficients(du);const r=du.x.toFixed(4),t=du.y.toFixed(4),i=du.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function yC(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(bl).join(`
`)}function SC(r){const t=[];for(const i in r){const s=r[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function MC(r,t){const i={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(t,l),f=c.name;let p=1;c.type===r.FLOAT_MAT2&&(p=2),c.type===r.FLOAT_MAT3&&(p=3),c.type===r.FLOAT_MAT4&&(p=4),i[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:p}}return i}function bl(r){return r!==""}function Lv(r,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Uv(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const bC=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ap(r){return r.replace(bC,TC)}const EC=new Map;function TC(r,t){let i=Ce[t];if(i===void 0){const s=EC.get(t);if(s!==void 0)i=Ce[s],ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("Can not resolve #include <"+t+">")}return Ap(i)}const AC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ov(r){return r.replace(AC,CC)}function CC(r,t,i,s){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function Pv(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const RC={[xu]:"SHADOWMAP_TYPE_PCF",[Ml]:"SHADOWMAP_TYPE_VSM"};function wC(r){return RC[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const DC={[fr]:"ENVMAP_TYPE_CUBE",[xo]:"ENVMAP_TYPE_CUBE",[Ou]:"ENVMAP_TYPE_CUBE_UV"};function NC(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":DC[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const LC={[xo]:"ENVMAP_MODE_REFRACTION"};function UC(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":LC[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const OC={[ox]:"ENVMAP_BLENDING_MULTIPLY",[eb]:"ENVMAP_BLENDING_MIX",[nb]:"ENVMAP_BLENDING_ADD"};function PC(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":OC[r.combine]||"ENVMAP_BLENDING_NONE"}function IC(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function zC(r,t,i,s){const l=r.getContext(),c=i.defines;let f=i.vertexShader,p=i.fragmentShader;const m=wC(i),h=NC(i),_=UC(i),v=PC(i),g=IC(i),M=yC(i),E=SC(c),R=l.createProgram();let x,b,L=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(x=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(bl).join(`
`),x.length>0&&(x+=`
`),b=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(bl).join(`
`),b.length>0&&(b+=`
`)):(x=[Pv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(bl).join(`
`),b=[Pv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+h:"",i.envMap?"#define "+_:"",i.envMap?"#define "+v:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==_a?"#define TONE_MAPPING":"",i.toneMapping!==_a?Ce.tonemapping_pars_fragment:"",i.toneMapping!==_a?vC("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",Ce.colorspace_pars_fragment,gC("linearToOutputTexel",i.outputColorSpace),xC(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(bl).join(`
`)),f=Ap(f),f=Lv(f,i),f=Uv(f,i),p=Ap(p),p=Lv(p,i),p=Uv(p,i),f=Ov(f),p=Ov(p),i.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,x=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,b=["#define varying in",i.glslVersion===G0?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===G0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);const F=L+x+f,N=L+b+p,H=wv(l,l.VERTEX_SHADER,F),z=wv(l,l.FRAGMENT_SHADER,N);l.attachShader(R,H),l.attachShader(R,z),i.index0AttributeName!==void 0?l.bindAttribLocation(R,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(R,0,"position"),l.linkProgram(R);function I(V){if(r.debug.checkShaderErrors){const J=l.getProgramInfoLog(R)||"",at=l.getShaderInfoLog(H)||"",st=l.getShaderInfoLog(z)||"",et=J.trim(),P=at.trim(),G=st.trim();let Y=!0,ot=!0;if(l.getProgramParameter(R,l.LINK_STATUS)===!1)if(Y=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,R,H,z);else{const yt=Nv(l,H,"vertex"),B=Nv(l,z,"fragment");Ve("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(R,l.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+et+`
`+yt+`
`+B)}else et!==""?ge("WebGLProgram: Program Info Log:",et):(P===""||G==="")&&(ot=!1);ot&&(V.diagnostics={runnable:Y,programLog:et,vertexShader:{log:P,prefix:x},fragmentShader:{log:G,prefix:b}})}l.deleteShader(H),l.deleteShader(z),T=new Eu(l,R),O=MC(l,R)}let T;this.getUniforms=function(){return T===void 0&&I(this),T};let O;this.getAttributes=function(){return O===void 0&&I(this),O};let mt=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return mt===!1&&(mt=l.getProgramParameter(R,dC)),mt},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(R),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=hC++,this.cacheKey=t,this.usedTimes=1,this.program=R,this.vertexShader=H,this.fragmentShader=z,this}let FC=0;class BC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const i=t.vertexShader,s=t.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),f=this._getShaderCacheForMaterial(t);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new HC(t),i.set(t,s)),s}}class HC{constructor(t){this.id=FC++,this.code=t,this.usedTimes=0}}function GC(r,t,i,s,l,c){const f=new Gp,p=new BC,m=new Set,h=[],_=new Map,v=s.logarithmicDepthBuffer;let g=s.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(T){return m.add(T),T===0?"uv":`uv${T}`}function R(T,O,mt,V,J){const at=V.fog,st=J.geometry,et=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?V.environment:null,P=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,G=t.get(T.envMap||et,P),Y=G&&G.mapping===Ou?G.image.height:null,ot=M[T.type];T.precision!==null&&(g=s.getMaxPrecision(T.precision),g!==T.precision&&ge("WebGLProgram.getParameters:",T.precision,"not supported, using",g,"instead."));const yt=st.morphAttributes.position||st.morphAttributes.normal||st.morphAttributes.color,B=yt!==void 0?yt.length:0;let W=0;st.morphAttributes.position!==void 0&&(W=1),st.morphAttributes.normal!==void 0&&(W=2),st.morphAttributes.color!==void 0&&(W=3);let dt,Dt,zt,Q;if(ot){const we=ha[ot];dt=we.vertexShader,Dt=we.fragmentShader}else dt=T.vertexShader,Dt=T.fragmentShader,p.update(T),zt=p.getVertexShaderID(T),Q=p.getFragmentShaderID(T);const Et=r.getRenderTarget(),Mt=r.state.buffers.depth.getReversed(),Wt=J.isInstancedMesh===!0,Ut=J.isBatchedMesh===!0,re=!!T.map,ye=!!T.matcap,Rt=!!G,Lt=!!T.aoMap,ae=!!T.lightMap,qt=!!T.bumpMap,he=!!T.normalMap,k=!!T.displacementMap,Ae=!!T.emissiveMap,oe=!!T.metalnessMap,le=!!T.roughnessMap,Gt=T.anisotropy>0,U=T.clearcoat>0,A=T.dispersion>0,q=T.iridescence>0,lt=T.sheen>0,vt=T.transmission>0,ht=Gt&&!!T.anisotropyMap,kt=U&&!!T.clearcoatMap,Pt=U&&!!T.clearcoatNormalMap,te=U&&!!T.clearcoatRoughnessMap,ie=q&&!!T.iridescenceMap,Tt=q&&!!T.iridescenceThicknessMap,wt=lt&&!!T.sheenColorMap,jt=lt&&!!T.sheenRoughnessMap,Ft=!!T.specularMap,Xt=!!T.specularColorMap,_e=!!T.specularIntensityMap,Z=vt&&!!T.transmissionMap,Ot=vt&&!!T.thicknessMap,It=!!T.gradientMap,Kt=!!T.alphaMap,Nt=T.alphaTest>0,xt=!!T.alphaHash,Qt=!!T.extensions;let fe=_a;T.toneMapped&&(Et===null||Et.isXRRenderTarget===!0)&&(fe=r.toneMapping);const He={shaderID:ot,shaderType:T.type,shaderName:T.name,vertexShader:dt,fragmentShader:Dt,defines:T.defines,customVertexShaderID:zt,customFragmentShaderID:Q,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:g,batching:Ut,batchingColor:Ut&&J._colorsTexture!==null,instancing:Wt,instancingColor:Wt&&J.instanceColor!==null,instancingMorph:Wt&&J.morphTexture!==null,outputColorSpace:Et===null?r.outputColorSpace:Et.isXRRenderTarget===!0?Et.texture.colorSpace:So,alphaToCoverage:!!T.alphaToCoverage,map:re,matcap:ye,envMap:Rt,envMapMode:Rt&&G.mapping,envMapCubeUVHeight:Y,aoMap:Lt,lightMap:ae,bumpMap:qt,normalMap:he,displacementMap:k,emissiveMap:Ae,normalMapObjectSpace:he&&T.normalMapType===rb,normalMapTangentSpace:he&&T.normalMapType===sb,metalnessMap:oe,roughnessMap:le,anisotropy:Gt,anisotropyMap:ht,clearcoat:U,clearcoatMap:kt,clearcoatNormalMap:Pt,clearcoatRoughnessMap:te,dispersion:A,iridescence:q,iridescenceMap:ie,iridescenceThicknessMap:Tt,sheen:lt,sheenColorMap:wt,sheenRoughnessMap:jt,specularMap:Ft,specularColorMap:Xt,specularIntensityMap:_e,transmission:vt,transmissionMap:Z,thicknessMap:Ot,gradientMap:It,opaque:T.transparent===!1&&T.blending===mo&&T.alphaToCoverage===!1,alphaMap:Kt,alphaTest:Nt,alphaHash:xt,combine:T.combine,mapUv:re&&E(T.map.channel),aoMapUv:Lt&&E(T.aoMap.channel),lightMapUv:ae&&E(T.lightMap.channel),bumpMapUv:qt&&E(T.bumpMap.channel),normalMapUv:he&&E(T.normalMap.channel),displacementMapUv:k&&E(T.displacementMap.channel),emissiveMapUv:Ae&&E(T.emissiveMap.channel),metalnessMapUv:oe&&E(T.metalnessMap.channel),roughnessMapUv:le&&E(T.roughnessMap.channel),anisotropyMapUv:ht&&E(T.anisotropyMap.channel),clearcoatMapUv:kt&&E(T.clearcoatMap.channel),clearcoatNormalMapUv:Pt&&E(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&E(T.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&E(T.iridescenceMap.channel),iridescenceThicknessMapUv:Tt&&E(T.iridescenceThicknessMap.channel),sheenColorMapUv:wt&&E(T.sheenColorMap.channel),sheenRoughnessMapUv:jt&&E(T.sheenRoughnessMap.channel),specularMapUv:Ft&&E(T.specularMap.channel),specularColorMapUv:Xt&&E(T.specularColorMap.channel),specularIntensityMapUv:_e&&E(T.specularIntensityMap.channel),transmissionMapUv:Z&&E(T.transmissionMap.channel),thicknessMapUv:Ot&&E(T.thicknessMap.channel),alphaMapUv:Kt&&E(T.alphaMap.channel),vertexTangents:!!st.attributes.tangent&&(he||Gt),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!st.attributes.color&&st.attributes.color.itemSize===4,pointsUvs:J.isPoints===!0&&!!st.attributes.uv&&(re||Kt),fog:!!at,useFog:T.fog===!0,fogExp2:!!at&&at.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||st.attributes.normal===void 0&&he===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:Mt,skinning:J.isSkinnedMesh===!0,morphTargets:st.morphAttributes.position!==void 0,morphNormals:st.morphAttributes.normal!==void 0,morphColors:st.morphAttributes.color!==void 0,morphTargetsCount:B,morphTextureStride:W,numDirLights:O.directional.length,numPointLights:O.point.length,numSpotLights:O.spot.length,numSpotLightMaps:O.spotLightMap.length,numRectAreaLights:O.rectArea.length,numHemiLights:O.hemi.length,numDirLightShadows:O.directionalShadowMap.length,numPointLightShadows:O.pointShadowMap.length,numSpotLightShadows:O.spotShadowMap.length,numSpotLightShadowsWithMaps:O.numSpotLightShadowsWithMaps,numLightProbes:O.numLightProbes,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:T.dithering,shadowMapEnabled:r.shadowMap.enabled&&mt.length>0,shadowMapType:r.shadowMap.type,toneMapping:fe,decodeVideoTexture:re&&T.map.isVideoTexture===!0&&ke.getTransfer(T.map.colorSpace)===Je,decodeVideoTextureEmissive:Ae&&T.emissiveMap.isVideoTexture===!0&&ke.getTransfer(T.emissiveMap.colorSpace)===Je,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Wa,flipSided:T.side===vi,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Qt&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Qt&&T.extensions.multiDraw===!0||Ut)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return He.vertexUv1s=m.has(1),He.vertexUv2s=m.has(2),He.vertexUv3s=m.has(3),m.clear(),He}function x(T){const O=[];if(T.shaderID?O.push(T.shaderID):(O.push(T.customVertexShaderID),O.push(T.customFragmentShaderID)),T.defines!==void 0)for(const mt in T.defines)O.push(mt),O.push(T.defines[mt]);return T.isRawShaderMaterial===!1&&(b(O,T),L(O,T),O.push(r.outputColorSpace)),O.push(T.customProgramCacheKey),O.join()}function b(T,O){T.push(O.precision),T.push(O.outputColorSpace),T.push(O.envMapMode),T.push(O.envMapCubeUVHeight),T.push(O.mapUv),T.push(O.alphaMapUv),T.push(O.lightMapUv),T.push(O.aoMapUv),T.push(O.bumpMapUv),T.push(O.normalMapUv),T.push(O.displacementMapUv),T.push(O.emissiveMapUv),T.push(O.metalnessMapUv),T.push(O.roughnessMapUv),T.push(O.anisotropyMapUv),T.push(O.clearcoatMapUv),T.push(O.clearcoatNormalMapUv),T.push(O.clearcoatRoughnessMapUv),T.push(O.iridescenceMapUv),T.push(O.iridescenceThicknessMapUv),T.push(O.sheenColorMapUv),T.push(O.sheenRoughnessMapUv),T.push(O.specularMapUv),T.push(O.specularColorMapUv),T.push(O.specularIntensityMapUv),T.push(O.transmissionMapUv),T.push(O.thicknessMapUv),T.push(O.combine),T.push(O.fogExp2),T.push(O.sizeAttenuation),T.push(O.morphTargetsCount),T.push(O.morphAttributeCount),T.push(O.numDirLights),T.push(O.numPointLights),T.push(O.numSpotLights),T.push(O.numSpotLightMaps),T.push(O.numHemiLights),T.push(O.numRectAreaLights),T.push(O.numDirLightShadows),T.push(O.numPointLightShadows),T.push(O.numSpotLightShadows),T.push(O.numSpotLightShadowsWithMaps),T.push(O.numLightProbes),T.push(O.shadowMapType),T.push(O.toneMapping),T.push(O.numClippingPlanes),T.push(O.numClipIntersection),T.push(O.depthPacking)}function L(T,O){f.disableAll(),O.instancing&&f.enable(0),O.instancingColor&&f.enable(1),O.instancingMorph&&f.enable(2),O.matcap&&f.enable(3),O.envMap&&f.enable(4),O.normalMapObjectSpace&&f.enable(5),O.normalMapTangentSpace&&f.enable(6),O.clearcoat&&f.enable(7),O.iridescence&&f.enable(8),O.alphaTest&&f.enable(9),O.vertexColors&&f.enable(10),O.vertexAlphas&&f.enable(11),O.vertexUv1s&&f.enable(12),O.vertexUv2s&&f.enable(13),O.vertexUv3s&&f.enable(14),O.vertexTangents&&f.enable(15),O.anisotropy&&f.enable(16),O.alphaHash&&f.enable(17),O.batching&&f.enable(18),O.dispersion&&f.enable(19),O.batchingColor&&f.enable(20),O.gradientMap&&f.enable(21),T.push(f.mask),f.disableAll(),O.fog&&f.enable(0),O.useFog&&f.enable(1),O.flatShading&&f.enable(2),O.logarithmicDepthBuffer&&f.enable(3),O.reversedDepthBuffer&&f.enable(4),O.skinning&&f.enable(5),O.morphTargets&&f.enable(6),O.morphNormals&&f.enable(7),O.morphColors&&f.enable(8),O.premultipliedAlpha&&f.enable(9),O.shadowMapEnabled&&f.enable(10),O.doubleSided&&f.enable(11),O.flipSided&&f.enable(12),O.useDepthPacking&&f.enable(13),O.dithering&&f.enable(14),O.transmission&&f.enable(15),O.sheen&&f.enable(16),O.opaque&&f.enable(17),O.pointsUvs&&f.enable(18),O.decodeVideoTexture&&f.enable(19),O.decodeVideoTextureEmissive&&f.enable(20),O.alphaToCoverage&&f.enable(21),T.push(f.mask)}function F(T){const O=M[T.type];let mt;if(O){const V=ha[O];mt=oE.clone(V.uniforms)}else mt=T.uniforms;return mt}function N(T,O){let mt=_.get(O);return mt!==void 0?++mt.usedTimes:(mt=new zC(r,O,T,l),h.push(mt),_.set(O,mt)),mt}function H(T){if(--T.usedTimes===0){const O=h.indexOf(T);h[O]=h[h.length-1],h.pop(),_.delete(T.cacheKey),T.destroy()}}function z(T){p.remove(T)}function I(){p.dispose()}return{getParameters:R,getProgramCacheKey:x,getUniforms:F,acquireProgram:N,releaseProgram:H,releaseShaderCache:z,programs:h,dispose:I}}function VC(){let r=new WeakMap;function t(f){return r.has(f)}function i(f){let p=r.get(f);return p===void 0&&(p={},r.set(f,p)),p}function s(f){r.delete(f)}function l(f,p,m){r.get(f)[p]=m}function c(){r=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:c}}function kC(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function Iv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function zv(){const r=[];let t=0;const i=[],s=[],l=[];function c(){t=0,i.length=0,s.length=0,l.length=0}function f(g){let M=0;return g.isInstancedMesh&&(M+=2),g.isSkinnedMesh&&(M+=1),M}function p(g,M,E,R,x,b){let L=r[t];return L===void 0?(L={id:g.id,object:g,geometry:M,material:E,materialVariant:f(g),groupOrder:R,renderOrder:g.renderOrder,z:x,group:b},r[t]=L):(L.id=g.id,L.object=g,L.geometry=M,L.material=E,L.materialVariant=f(g),L.groupOrder=R,L.renderOrder=g.renderOrder,L.z=x,L.group=b),t++,L}function m(g,M,E,R,x,b){const L=p(g,M,E,R,x,b);E.transmission>0?s.push(L):E.transparent===!0?l.push(L):i.push(L)}function h(g,M,E,R,x,b){const L=p(g,M,E,R,x,b);E.transmission>0?s.unshift(L):E.transparent===!0?l.unshift(L):i.unshift(L)}function _(g,M){i.length>1&&i.sort(g||kC),s.length>1&&s.sort(M||Iv),l.length>1&&l.sort(M||Iv)}function v(){for(let g=t,M=r.length;g<M;g++){const E=r[g];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:m,unshift:h,finish:v,sort:_}}function jC(){let r=new WeakMap;function t(s,l){const c=r.get(s);let f;return c===void 0?(f=new zv,r.set(s,[f])):l>=c.length?(f=new zv,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:t,dispose:i}}function XC(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new it,color:new ze};break;case"SpotLight":i={position:new it,direction:new it,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new it,color:new ze,distance:0,decay:0};break;case"HemisphereLight":i={direction:new it,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":i={color:new ze,position:new it,halfWidth:new it,halfHeight:new it};break}return r[t.id]=i,i}}}function YC(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=i,i}}}let WC=0;function qC(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function ZC(r){const t=new XC,i=YC(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new it);const l=new it,c=new pn,f=new pn;function p(h){let _=0,v=0,g=0;for(let O=0;O<9;O++)s.probe[O].set(0,0,0);let M=0,E=0,R=0,x=0,b=0,L=0,F=0,N=0,H=0,z=0,I=0;h.sort(qC);for(let O=0,mt=h.length;O<mt;O++){const V=h[O],J=V.color,at=V.intensity,st=V.distance;let et=null;if(V.shadow&&V.shadow.map&&(V.shadow.map.texture.format===yo?et=V.shadow.map.texture:et=V.shadow.map.depthTexture||V.shadow.map.texture),V.isAmbientLight)_+=J.r*at,v+=J.g*at,g+=J.b*at;else if(V.isLightProbe){for(let P=0;P<9;P++)s.probe[P].addScaledVector(V.sh.coefficients[P],at);I++}else if(V.isDirectionalLight){const P=t.get(V);if(P.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){const G=V.shadow,Y=i.get(V);Y.shadowIntensity=G.intensity,Y.shadowBias=G.bias,Y.shadowNormalBias=G.normalBias,Y.shadowRadius=G.radius,Y.shadowMapSize=G.mapSize,s.directionalShadow[M]=Y,s.directionalShadowMap[M]=et,s.directionalShadowMatrix[M]=V.shadow.matrix,L++}s.directional[M]=P,M++}else if(V.isSpotLight){const P=t.get(V);P.position.setFromMatrixPosition(V.matrixWorld),P.color.copy(J).multiplyScalar(at),P.distance=st,P.coneCos=Math.cos(V.angle),P.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),P.decay=V.decay,s.spot[R]=P;const G=V.shadow;if(V.map&&(s.spotLightMap[H]=V.map,H++,G.updateMatrices(V),V.castShadow&&z++),s.spotLightMatrix[R]=G.matrix,V.castShadow){const Y=i.get(V);Y.shadowIntensity=G.intensity,Y.shadowBias=G.bias,Y.shadowNormalBias=G.normalBias,Y.shadowRadius=G.radius,Y.shadowMapSize=G.mapSize,s.spotShadow[R]=Y,s.spotShadowMap[R]=et,N++}R++}else if(V.isRectAreaLight){const P=t.get(V);P.color.copy(J).multiplyScalar(at),P.halfWidth.set(V.width*.5,0,0),P.halfHeight.set(0,V.height*.5,0),s.rectArea[x]=P,x++}else if(V.isPointLight){const P=t.get(V);if(P.color.copy(V.color).multiplyScalar(V.intensity),P.distance=V.distance,P.decay=V.decay,V.castShadow){const G=V.shadow,Y=i.get(V);Y.shadowIntensity=G.intensity,Y.shadowBias=G.bias,Y.shadowNormalBias=G.normalBias,Y.shadowRadius=G.radius,Y.shadowMapSize=G.mapSize,Y.shadowCameraNear=G.camera.near,Y.shadowCameraFar=G.camera.far,s.pointShadow[E]=Y,s.pointShadowMap[E]=et,s.pointShadowMatrix[E]=V.shadow.matrix,F++}s.point[E]=P,E++}else if(V.isHemisphereLight){const P=t.get(V);P.skyColor.copy(V.color).multiplyScalar(at),P.groundColor.copy(V.groundColor).multiplyScalar(at),s.hemi[b]=P,b++}}x>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Zt.LTC_FLOAT_1,s.rectAreaLTC2=Zt.LTC_FLOAT_2):(s.rectAreaLTC1=Zt.LTC_HALF_1,s.rectAreaLTC2=Zt.LTC_HALF_2)),s.ambient[0]=_,s.ambient[1]=v,s.ambient[2]=g;const T=s.hash;(T.directionalLength!==M||T.pointLength!==E||T.spotLength!==R||T.rectAreaLength!==x||T.hemiLength!==b||T.numDirectionalShadows!==L||T.numPointShadows!==F||T.numSpotShadows!==N||T.numSpotMaps!==H||T.numLightProbes!==I)&&(s.directional.length=M,s.spot.length=R,s.rectArea.length=x,s.point.length=E,s.hemi.length=b,s.directionalShadow.length=L,s.directionalShadowMap.length=L,s.pointShadow.length=F,s.pointShadowMap.length=F,s.spotShadow.length=N,s.spotShadowMap.length=N,s.directionalShadowMatrix.length=L,s.pointShadowMatrix.length=F,s.spotLightMatrix.length=N+H-z,s.spotLightMap.length=H,s.numSpotLightShadowsWithMaps=z,s.numLightProbes=I,T.directionalLength=M,T.pointLength=E,T.spotLength=R,T.rectAreaLength=x,T.hemiLength=b,T.numDirectionalShadows=L,T.numPointShadows=F,T.numSpotShadows=N,T.numSpotMaps=H,T.numLightProbes=I,s.version=WC++)}function m(h,_){let v=0,g=0,M=0,E=0,R=0;const x=_.matrixWorldInverse;for(let b=0,L=h.length;b<L;b++){const F=h[b];if(F.isDirectionalLight){const N=s.directional[v];N.direction.setFromMatrixPosition(F.matrixWorld),l.setFromMatrixPosition(F.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(x),v++}else if(F.isSpotLight){const N=s.spot[M];N.position.setFromMatrixPosition(F.matrixWorld),N.position.applyMatrix4(x),N.direction.setFromMatrixPosition(F.matrixWorld),l.setFromMatrixPosition(F.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(x),M++}else if(F.isRectAreaLight){const N=s.rectArea[E];N.position.setFromMatrixPosition(F.matrixWorld),N.position.applyMatrix4(x),f.identity(),c.copy(F.matrixWorld),c.premultiply(x),f.extractRotation(c),N.halfWidth.set(F.width*.5,0,0),N.halfHeight.set(0,F.height*.5,0),N.halfWidth.applyMatrix4(f),N.halfHeight.applyMatrix4(f),E++}else if(F.isPointLight){const N=s.point[g];N.position.setFromMatrixPosition(F.matrixWorld),N.position.applyMatrix4(x),g++}else if(F.isHemisphereLight){const N=s.hemi[R];N.direction.setFromMatrixPosition(F.matrixWorld),N.direction.transformDirection(x),R++}}}return{setup:p,setupView:m,state:s}}function Fv(r){const t=new ZC(r),i=[],s=[];function l(_){h.camera=_,i.length=0,s.length=0}function c(_){i.push(_)}function f(_){s.push(_)}function p(){t.setup(i)}function m(_){t.setupView(i,_)}const h={lightsArray:i,shadowsArray:s,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:h,setupLights:p,setupLightsView:m,pushLight:c,pushShadow:f}}function KC(r){let t=new WeakMap;function i(l,c=0){const f=t.get(l);let p;return f===void 0?(p=new Fv(r),t.set(l,[p])):c>=f.length?(p=new Fv(r),f.push(p)):p=f[c],p}function s(){t=new WeakMap}return{get:i,dispose:s}}const QC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,JC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,$C=[new it(1,0,0),new it(-1,0,0),new it(0,1,0),new it(0,-1,0),new it(0,0,1),new it(0,0,-1)],tR=[new it(0,-1,0),new it(0,-1,0),new it(0,0,1),new it(0,0,-1),new it(0,-1,0),new it(0,-1,0)],Bv=new pn,Sl=new it,Eh=new it;function eR(r,t,i){let s=new wx;const l=new Re,c=new Re,f=new bn,p=new fE,m=new dE,h={},_=i.maxTextureSize,v={[Is]:vi,[vi]:Is,[Wa]:Wa},g=new Sa({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Re},radius:{value:4}},vertexShader:QC,fragmentShader:JC}),M=g.clone();M.defines.HORIZONTAL_PASS=1;const E=new oi;E.setAttribute("position",new Xi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const R=new ya(E,g),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xu;let b=this.type;this.render=function(z,I,T){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||z.length===0)return;this.type===IM&&(ge("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=xu);const O=r.getRenderTarget(),mt=r.getActiveCubeFace(),V=r.getActiveMipmapLevel(),J=r.state;J.setBlending(Za),J.buffers.depth.getReversed()===!0?J.buffers.color.setClear(0,0,0,0):J.buffers.color.setClear(1,1,1,1),J.buffers.depth.setTest(!0),J.setScissorTest(!1);const at=b!==this.type;at&&I.traverse(function(st){st.material&&(Array.isArray(st.material)?st.material.forEach(et=>et.needsUpdate=!0):st.material.needsUpdate=!0)});for(let st=0,et=z.length;st<et;st++){const P=z[st],G=P.shadow;if(G===void 0){ge("WebGLShadowMap:",P,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;l.copy(G.mapSize);const Y=G.getFrameExtents();l.multiply(Y),c.copy(G.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(c.x=Math.floor(_/Y.x),l.x=c.x*Y.x,G.mapSize.x=c.x),l.y>_&&(c.y=Math.floor(_/Y.y),l.y=c.y*Y.y,G.mapSize.y=c.y));const ot=r.state.buffers.depth.getReversed();if(G.camera._reversedDepth=ot,G.map===null||at===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Ml){if(P.isPointLight){ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new va(l.x,l.y,{format:yo,type:Qa,minFilter:Jn,magFilter:Jn,generateMipmaps:!1}),G.map.texture.name=P.name+".shadowMap",G.map.depthTexture=new wl(l.x,l.y,ma),G.map.depthTexture.name=P.name+".shadowMapDepth",G.map.depthTexture.format=Ja,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=jn,G.map.depthTexture.magFilter=jn}else P.isPointLight?(G.map=new Ix(l.x),G.map.depthTexture=new aE(l.x,xa)):(G.map=new va(l.x,l.y),G.map.depthTexture=new wl(l.x,l.y,xa)),G.map.depthTexture.name=P.name+".shadowMap",G.map.depthTexture.format=Ja,this.type===xu?(G.map.depthTexture.compareFunction=ot?Fp:zp,G.map.depthTexture.minFilter=Jn,G.map.depthTexture.magFilter=Jn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=jn,G.map.depthTexture.magFilter=jn);G.camera.updateProjectionMatrix()}const yt=G.map.isWebGLCubeRenderTarget?6:1;for(let B=0;B<yt;B++){if(G.map.isWebGLCubeRenderTarget)r.setRenderTarget(G.map,B),r.clear();else{B===0&&(r.setRenderTarget(G.map),r.clear());const W=G.getViewport(B);f.set(c.x*W.x,c.y*W.y,c.x*W.z,c.y*W.w),J.viewport(f)}if(P.isPointLight){const W=G.camera,dt=G.matrix,Dt=P.distance||W.far;Dt!==W.far&&(W.far=Dt,W.updateProjectionMatrix()),Sl.setFromMatrixPosition(P.matrixWorld),W.position.copy(Sl),Eh.copy(W.position),Eh.add($C[B]),W.up.copy(tR[B]),W.lookAt(Eh),W.updateMatrixWorld(),dt.makeTranslation(-Sl.x,-Sl.y,-Sl.z),Bv.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Bv,W.coordinateSystem,W.reversedDepth)}else G.updateMatrices(P);s=G.getFrustum(),N(I,T,G.camera,P,this.type)}G.isPointLightShadow!==!0&&this.type===Ml&&L(G,T),G.needsUpdate=!1}b=this.type,x.needsUpdate=!1,r.setRenderTarget(O,mt,V)};function L(z,I){const T=t.update(R);g.defines.VSM_SAMPLES!==z.blurSamples&&(g.defines.VSM_SAMPLES=z.blurSamples,M.defines.VSM_SAMPLES=z.blurSamples,g.needsUpdate=!0,M.needsUpdate=!0),z.mapPass===null&&(z.mapPass=new va(l.x,l.y,{format:yo,type:Qa})),g.uniforms.shadow_pass.value=z.map.depthTexture,g.uniforms.resolution.value=z.mapSize,g.uniforms.radius.value=z.radius,r.setRenderTarget(z.mapPass),r.clear(),r.renderBufferDirect(I,null,T,g,R,null),M.uniforms.shadow_pass.value=z.mapPass.texture,M.uniforms.resolution.value=z.mapSize,M.uniforms.radius.value=z.radius,r.setRenderTarget(z.map),r.clear(),r.renderBufferDirect(I,null,T,M,R,null)}function F(z,I,T,O){let mt=null;const V=T.isPointLight===!0?z.customDistanceMaterial:z.customDepthMaterial;if(V!==void 0)mt=V;else if(mt=T.isPointLight===!0?m:p,r.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const J=mt.uuid,at=I.uuid;let st=h[J];st===void 0&&(st={},h[J]=st);let et=st[at];et===void 0&&(et=mt.clone(),st[at]=et,I.addEventListener("dispose",H)),mt=et}if(mt.visible=I.visible,mt.wireframe=I.wireframe,O===Ml?mt.side=I.shadowSide!==null?I.shadowSide:I.side:mt.side=I.shadowSide!==null?I.shadowSide:v[I.side],mt.alphaMap=I.alphaMap,mt.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,mt.map=I.map,mt.clipShadows=I.clipShadows,mt.clippingPlanes=I.clippingPlanes,mt.clipIntersection=I.clipIntersection,mt.displacementMap=I.displacementMap,mt.displacementScale=I.displacementScale,mt.displacementBias=I.displacementBias,mt.wireframeLinewidth=I.wireframeLinewidth,mt.linewidth=I.linewidth,T.isPointLight===!0&&mt.isMeshDistanceMaterial===!0){const J=r.properties.get(mt);J.light=T}return mt}function N(z,I,T,O,mt){if(z.visible===!1)return;if(z.layers.test(I.layers)&&(z.isMesh||z.isLine||z.isPoints)&&(z.castShadow||z.receiveShadow&&mt===Ml)&&(!z.frustumCulled||s.intersectsObject(z))){z.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,z.matrixWorld);const at=t.update(z),st=z.material;if(Array.isArray(st)){const et=at.groups;for(let P=0,G=et.length;P<G;P++){const Y=et[P],ot=st[Y.materialIndex];if(ot&&ot.visible){const yt=F(z,ot,O,mt);z.onBeforeShadow(r,z,I,T,at,yt,Y),r.renderBufferDirect(T,null,at,yt,z,Y),z.onAfterShadow(r,z,I,T,at,yt,Y)}}}else if(st.visible){const et=F(z,st,O,mt);z.onBeforeShadow(r,z,I,T,at,et,null),r.renderBufferDirect(T,null,at,et,z,null),z.onAfterShadow(r,z,I,T,at,et,null)}}const J=z.children;for(let at=0,st=J.length;at<st;at++)N(J[at],I,T,O,mt)}function H(z){z.target.removeEventListener("dispose",H);for(const T in h){const O=h[T],mt=z.target.uuid;mt in O&&(O[mt].dispose(),delete O[mt])}}}function nR(r,t){function i(){let Z=!1;const Ot=new bn;let It=null;const Kt=new bn(0,0,0,0);return{setMask:function(Nt){It!==Nt&&!Z&&(r.colorMask(Nt,Nt,Nt,Nt),It=Nt)},setLocked:function(Nt){Z=Nt},setClear:function(Nt,xt,Qt,fe,He){He===!0&&(Nt*=fe,xt*=fe,Qt*=fe),Ot.set(Nt,xt,Qt,fe),Kt.equals(Ot)===!1&&(r.clearColor(Nt,xt,Qt,fe),Kt.copy(Ot))},reset:function(){Z=!1,It=null,Kt.set(-1,0,0,0)}}}function s(){let Z=!1,Ot=!1,It=null,Kt=null,Nt=null;return{setReversed:function(xt){if(Ot!==xt){const Qt=t.get("EXT_clip_control");xt?Qt.clipControlEXT(Qt.LOWER_LEFT_EXT,Qt.ZERO_TO_ONE_EXT):Qt.clipControlEXT(Qt.LOWER_LEFT_EXT,Qt.NEGATIVE_ONE_TO_ONE_EXT),Ot=xt;const fe=Nt;Nt=null,this.setClear(fe)}},getReversed:function(){return Ot},setTest:function(xt){xt?Et(r.DEPTH_TEST):Mt(r.DEPTH_TEST)},setMask:function(xt){It!==xt&&!Z&&(r.depthMask(xt),It=xt)},setFunc:function(xt){if(Ot&&(xt=gb[xt]),Kt!==xt){switch(xt){case Ih:r.depthFunc(r.NEVER);break;case zh:r.depthFunc(r.ALWAYS);break;case Fh:r.depthFunc(r.LESS);break;case vo:r.depthFunc(r.LEQUAL);break;case Bh:r.depthFunc(r.EQUAL);break;case Hh:r.depthFunc(r.GEQUAL);break;case Gh:r.depthFunc(r.GREATER);break;case Vh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Kt=xt}},setLocked:function(xt){Z=xt},setClear:function(xt){Nt!==xt&&(Nt=xt,Ot&&(xt=1-xt),r.clearDepth(xt))},reset:function(){Z=!1,It=null,Kt=null,Nt=null,Ot=!1}}}function l(){let Z=!1,Ot=null,It=null,Kt=null,Nt=null,xt=null,Qt=null,fe=null,He=null;return{setTest:function(we){Z||(we?Et(r.STENCIL_TEST):Mt(r.STENCIL_TEST))},setMask:function(we){Ot!==we&&!Z&&(r.stencilMask(we),Ot=we)},setFunc:function(we,Fn,li){(It!==we||Kt!==Fn||Nt!==li)&&(r.stencilFunc(we,Fn,li),It=we,Kt=Fn,Nt=li)},setOp:function(we,Fn,li){(xt!==we||Qt!==Fn||fe!==li)&&(r.stencilOp(we,Fn,li),xt=we,Qt=Fn,fe=li)},setLocked:function(we){Z=we},setClear:function(we){He!==we&&(r.clearStencil(we),He=we)},reset:function(){Z=!1,Ot=null,It=null,Kt=null,Nt=null,xt=null,Qt=null,fe=null,He=null}}}const c=new i,f=new s,p=new l,m=new WeakMap,h=new WeakMap;let _={},v={},g=new WeakMap,M=[],E=null,R=!1,x=null,b=null,L=null,F=null,N=null,H=null,z=null,I=new ze(0,0,0),T=0,O=!1,mt=null,V=null,J=null,at=null,st=null;const et=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,G=0;const Y=r.getParameter(r.VERSION);Y.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(Y)[1]),P=G>=1):Y.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),P=G>=2);let ot=null,yt={};const B=r.getParameter(r.SCISSOR_BOX),W=r.getParameter(r.VIEWPORT),dt=new bn().fromArray(B),Dt=new bn().fromArray(W);function zt(Z,Ot,It,Kt){const Nt=new Uint8Array(4),xt=r.createTexture();r.bindTexture(Z,xt),r.texParameteri(Z,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(Z,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Qt=0;Qt<It;Qt++)Z===r.TEXTURE_3D||Z===r.TEXTURE_2D_ARRAY?r.texImage3D(Ot,0,r.RGBA,1,1,Kt,0,r.RGBA,r.UNSIGNED_BYTE,Nt):r.texImage2D(Ot+Qt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Nt);return xt}const Q={};Q[r.TEXTURE_2D]=zt(r.TEXTURE_2D,r.TEXTURE_2D,1),Q[r.TEXTURE_CUBE_MAP]=zt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[r.TEXTURE_2D_ARRAY]=zt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Q[r.TEXTURE_3D]=zt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),p.setClear(0),Et(r.DEPTH_TEST),f.setFunc(vo),qt(!1),he(P0),Et(r.CULL_FACE),Lt(Za);function Et(Z){_[Z]!==!0&&(r.enable(Z),_[Z]=!0)}function Mt(Z){_[Z]!==!1&&(r.disable(Z),_[Z]=!1)}function Wt(Z,Ot){return v[Z]!==Ot?(r.bindFramebuffer(Z,Ot),v[Z]=Ot,Z===r.DRAW_FRAMEBUFFER&&(v[r.FRAMEBUFFER]=Ot),Z===r.FRAMEBUFFER&&(v[r.DRAW_FRAMEBUFFER]=Ot),!0):!1}function Ut(Z,Ot){let It=M,Kt=!1;if(Z){It=g.get(Ot),It===void 0&&(It=[],g.set(Ot,It));const Nt=Z.textures;if(It.length!==Nt.length||It[0]!==r.COLOR_ATTACHMENT0){for(let xt=0,Qt=Nt.length;xt<Qt;xt++)It[xt]=r.COLOR_ATTACHMENT0+xt;It.length=Nt.length,Kt=!0}}else It[0]!==r.BACK&&(It[0]=r.BACK,Kt=!0);Kt&&r.drawBuffers(It)}function re(Z){return E!==Z?(r.useProgram(Z),E=Z,!0):!1}const ye={[rr]:r.FUNC_ADD,[FM]:r.FUNC_SUBTRACT,[BM]:r.FUNC_REVERSE_SUBTRACT};ye[HM]=r.MIN,ye[GM]=r.MAX;const Rt={[VM]:r.ZERO,[kM]:r.ONE,[jM]:r.SRC_COLOR,[Oh]:r.SRC_ALPHA,[KM]:r.SRC_ALPHA_SATURATE,[qM]:r.DST_COLOR,[YM]:r.DST_ALPHA,[XM]:r.ONE_MINUS_SRC_COLOR,[Ph]:r.ONE_MINUS_SRC_ALPHA,[ZM]:r.ONE_MINUS_DST_COLOR,[WM]:r.ONE_MINUS_DST_ALPHA,[QM]:r.CONSTANT_COLOR,[JM]:r.ONE_MINUS_CONSTANT_COLOR,[$M]:r.CONSTANT_ALPHA,[tb]:r.ONE_MINUS_CONSTANT_ALPHA};function Lt(Z,Ot,It,Kt,Nt,xt,Qt,fe,He,we){if(Z===Za){R===!0&&(Mt(r.BLEND),R=!1);return}if(R===!1&&(Et(r.BLEND),R=!0),Z!==zM){if(Z!==x||we!==O){if((b!==rr||N!==rr)&&(r.blendEquation(r.FUNC_ADD),b=rr,N=rr),we)switch(Z){case mo:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case I0:r.blendFunc(r.ONE,r.ONE);break;case z0:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case F0:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ve("WebGLState: Invalid blending: ",Z);break}else switch(Z){case mo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case I0:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case z0:Ve("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case F0:Ve("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ve("WebGLState: Invalid blending: ",Z);break}L=null,F=null,H=null,z=null,I.set(0,0,0),T=0,x=Z,O=we}return}Nt=Nt||Ot,xt=xt||It,Qt=Qt||Kt,(Ot!==b||Nt!==N)&&(r.blendEquationSeparate(ye[Ot],ye[Nt]),b=Ot,N=Nt),(It!==L||Kt!==F||xt!==H||Qt!==z)&&(r.blendFuncSeparate(Rt[It],Rt[Kt],Rt[xt],Rt[Qt]),L=It,F=Kt,H=xt,z=Qt),(fe.equals(I)===!1||He!==T)&&(r.blendColor(fe.r,fe.g,fe.b,He),I.copy(fe),T=He),x=Z,O=!1}function ae(Z,Ot){Z.side===Wa?Mt(r.CULL_FACE):Et(r.CULL_FACE);let It=Z.side===vi;Ot&&(It=!It),qt(It),Z.blending===mo&&Z.transparent===!1?Lt(Za):Lt(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),f.setFunc(Z.depthFunc),f.setTest(Z.depthTest),f.setMask(Z.depthWrite),c.setMask(Z.colorWrite);const Kt=Z.stencilWrite;p.setTest(Kt),Kt&&(p.setMask(Z.stencilWriteMask),p.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),p.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),Ae(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?Et(r.SAMPLE_ALPHA_TO_COVERAGE):Mt(r.SAMPLE_ALPHA_TO_COVERAGE)}function qt(Z){mt!==Z&&(Z?r.frontFace(r.CW):r.frontFace(r.CCW),mt=Z)}function he(Z){Z!==OM?(Et(r.CULL_FACE),Z!==V&&(Z===P0?r.cullFace(r.BACK):Z===PM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Mt(r.CULL_FACE),V=Z}function k(Z){Z!==J&&(P&&r.lineWidth(Z),J=Z)}function Ae(Z,Ot,It){Z?(Et(r.POLYGON_OFFSET_FILL),(at!==Ot||st!==It)&&(at=Ot,st=It,f.getReversed()&&(Ot=-Ot),r.polygonOffset(Ot,It))):Mt(r.POLYGON_OFFSET_FILL)}function oe(Z){Z?Et(r.SCISSOR_TEST):Mt(r.SCISSOR_TEST)}function le(Z){Z===void 0&&(Z=r.TEXTURE0+et-1),ot!==Z&&(r.activeTexture(Z),ot=Z)}function Gt(Z,Ot,It){It===void 0&&(ot===null?It=r.TEXTURE0+et-1:It=ot);let Kt=yt[It];Kt===void 0&&(Kt={type:void 0,texture:void 0},yt[It]=Kt),(Kt.type!==Z||Kt.texture!==Ot)&&(ot!==It&&(r.activeTexture(It),ot=It),r.bindTexture(Z,Ot||Q[Z]),Kt.type=Z,Kt.texture=Ot)}function U(){const Z=yt[ot];Z!==void 0&&Z.type!==void 0&&(r.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function A(){try{r.compressedTexImage2D(...arguments)}catch(Z){Ve("WebGLState:",Z)}}function q(){try{r.compressedTexImage3D(...arguments)}catch(Z){Ve("WebGLState:",Z)}}function lt(){try{r.texSubImage2D(...arguments)}catch(Z){Ve("WebGLState:",Z)}}function vt(){try{r.texSubImage3D(...arguments)}catch(Z){Ve("WebGLState:",Z)}}function ht(){try{r.compressedTexSubImage2D(...arguments)}catch(Z){Ve("WebGLState:",Z)}}function kt(){try{r.compressedTexSubImage3D(...arguments)}catch(Z){Ve("WebGLState:",Z)}}function Pt(){try{r.texStorage2D(...arguments)}catch(Z){Ve("WebGLState:",Z)}}function te(){try{r.texStorage3D(...arguments)}catch(Z){Ve("WebGLState:",Z)}}function ie(){try{r.texImage2D(...arguments)}catch(Z){Ve("WebGLState:",Z)}}function Tt(){try{r.texImage3D(...arguments)}catch(Z){Ve("WebGLState:",Z)}}function wt(Z){dt.equals(Z)===!1&&(r.scissor(Z.x,Z.y,Z.z,Z.w),dt.copy(Z))}function jt(Z){Dt.equals(Z)===!1&&(r.viewport(Z.x,Z.y,Z.z,Z.w),Dt.copy(Z))}function Ft(Z,Ot){let It=h.get(Ot);It===void 0&&(It=new WeakMap,h.set(Ot,It));let Kt=It.get(Z);Kt===void 0&&(Kt=r.getUniformBlockIndex(Ot,Z.name),It.set(Z,Kt))}function Xt(Z,Ot){const Kt=h.get(Ot).get(Z);m.get(Ot)!==Kt&&(r.uniformBlockBinding(Ot,Kt,Z.__bindingPointIndex),m.set(Ot,Kt))}function _e(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),_={},ot=null,yt={},v={},g=new WeakMap,M=[],E=null,R=!1,x=null,b=null,L=null,F=null,N=null,H=null,z=null,I=new ze(0,0,0),T=0,O=!1,mt=null,V=null,J=null,at=null,st=null,dt.set(0,0,r.canvas.width,r.canvas.height),Dt.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),p.reset()}return{buffers:{color:c,depth:f,stencil:p},enable:Et,disable:Mt,bindFramebuffer:Wt,drawBuffers:Ut,useProgram:re,setBlending:Lt,setMaterial:ae,setFlipSided:qt,setCullFace:he,setLineWidth:k,setPolygonOffset:Ae,setScissorTest:oe,activeTexture:le,bindTexture:Gt,unbindTexture:U,compressedTexImage2D:A,compressedTexImage3D:q,texImage2D:ie,texImage3D:Tt,updateUBOMapping:Ft,uniformBlockBinding:Xt,texStorage2D:Pt,texStorage3D:te,texSubImage2D:lt,texSubImage3D:vt,compressedTexSubImage2D:ht,compressedTexSubImage3D:kt,scissor:wt,viewport:jt,reset:_e}}function iR(r,t,i,s,l,c,f){const p=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new Re,_=new WeakMap;let v;const g=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(U,A){return M?new OffscreenCanvas(U,A):Ru("canvas")}function R(U,A,q){let lt=1;const vt=Gt(U);if((vt.width>q||vt.height>q)&&(lt=q/Math.max(vt.width,vt.height)),lt<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const ht=Math.floor(lt*vt.width),kt=Math.floor(lt*vt.height);v===void 0&&(v=E(ht,kt));const Pt=A?E(ht,kt):v;return Pt.width=ht,Pt.height=kt,Pt.getContext("2d").drawImage(U,0,0,ht,kt),ge("WebGLRenderer: Texture has been resized from ("+vt.width+"x"+vt.height+") to ("+ht+"x"+kt+")."),Pt}else return"data"in U&&ge("WebGLRenderer: Image in DataTexture is too big ("+vt.width+"x"+vt.height+")."),U;return U}function x(U){return U.generateMipmaps}function b(U){r.generateMipmap(U)}function L(U){return U.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?r.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function F(U,A,q,lt,vt=!1){if(U!==null){if(r[U]!==void 0)return r[U];ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let ht=A;if(A===r.RED&&(q===r.FLOAT&&(ht=r.R32F),q===r.HALF_FLOAT&&(ht=r.R16F),q===r.UNSIGNED_BYTE&&(ht=r.R8)),A===r.RED_INTEGER&&(q===r.UNSIGNED_BYTE&&(ht=r.R8UI),q===r.UNSIGNED_SHORT&&(ht=r.R16UI),q===r.UNSIGNED_INT&&(ht=r.R32UI),q===r.BYTE&&(ht=r.R8I),q===r.SHORT&&(ht=r.R16I),q===r.INT&&(ht=r.R32I)),A===r.RG&&(q===r.FLOAT&&(ht=r.RG32F),q===r.HALF_FLOAT&&(ht=r.RG16F),q===r.UNSIGNED_BYTE&&(ht=r.RG8)),A===r.RG_INTEGER&&(q===r.UNSIGNED_BYTE&&(ht=r.RG8UI),q===r.UNSIGNED_SHORT&&(ht=r.RG16UI),q===r.UNSIGNED_INT&&(ht=r.RG32UI),q===r.BYTE&&(ht=r.RG8I),q===r.SHORT&&(ht=r.RG16I),q===r.INT&&(ht=r.RG32I)),A===r.RGB_INTEGER&&(q===r.UNSIGNED_BYTE&&(ht=r.RGB8UI),q===r.UNSIGNED_SHORT&&(ht=r.RGB16UI),q===r.UNSIGNED_INT&&(ht=r.RGB32UI),q===r.BYTE&&(ht=r.RGB8I),q===r.SHORT&&(ht=r.RGB16I),q===r.INT&&(ht=r.RGB32I)),A===r.RGBA_INTEGER&&(q===r.UNSIGNED_BYTE&&(ht=r.RGBA8UI),q===r.UNSIGNED_SHORT&&(ht=r.RGBA16UI),q===r.UNSIGNED_INT&&(ht=r.RGBA32UI),q===r.BYTE&&(ht=r.RGBA8I),q===r.SHORT&&(ht=r.RGBA16I),q===r.INT&&(ht=r.RGBA32I)),A===r.RGB&&(q===r.UNSIGNED_INT_5_9_9_9_REV&&(ht=r.RGB9_E5),q===r.UNSIGNED_INT_10F_11F_11F_REV&&(ht=r.R11F_G11F_B10F)),A===r.RGBA){const kt=vt?Au:ke.getTransfer(lt);q===r.FLOAT&&(ht=r.RGBA32F),q===r.HALF_FLOAT&&(ht=r.RGBA16F),q===r.UNSIGNED_BYTE&&(ht=kt===Je?r.SRGB8_ALPHA8:r.RGBA8),q===r.UNSIGNED_SHORT_4_4_4_4&&(ht=r.RGBA4),q===r.UNSIGNED_SHORT_5_5_5_1&&(ht=r.RGB5_A1)}return(ht===r.R16F||ht===r.R32F||ht===r.RG16F||ht===r.RG32F||ht===r.RGBA16F||ht===r.RGBA32F)&&t.get("EXT_color_buffer_float"),ht}function N(U,A){let q;return U?A===null||A===xa||A===Cl?q=r.DEPTH24_STENCIL8:A===ma?q=r.DEPTH32F_STENCIL8:A===Al&&(q=r.DEPTH24_STENCIL8,ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===xa||A===Cl?q=r.DEPTH_COMPONENT24:A===ma?q=r.DEPTH_COMPONENT32F:A===Al&&(q=r.DEPTH_COMPONENT16),q}function H(U,A){return x(U)===!0||U.isFramebufferTexture&&U.minFilter!==jn&&U.minFilter!==Jn?Math.log2(Math.max(A.width,A.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?A.mipmaps.length:1}function z(U){const A=U.target;A.removeEventListener("dispose",z),T(A),A.isVideoTexture&&_.delete(A)}function I(U){const A=U.target;A.removeEventListener("dispose",I),mt(A)}function T(U){const A=s.get(U);if(A.__webglInit===void 0)return;const q=U.source,lt=g.get(q);if(lt){const vt=lt[A.__cacheKey];vt.usedTimes--,vt.usedTimes===0&&O(U),Object.keys(lt).length===0&&g.delete(q)}s.remove(U)}function O(U){const A=s.get(U);r.deleteTexture(A.__webglTexture);const q=U.source,lt=g.get(q);delete lt[A.__cacheKey],f.memory.textures--}function mt(U){const A=s.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),s.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(A.__webglFramebuffer[lt]))for(let vt=0;vt<A.__webglFramebuffer[lt].length;vt++)r.deleteFramebuffer(A.__webglFramebuffer[lt][vt]);else r.deleteFramebuffer(A.__webglFramebuffer[lt]);A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer[lt])}else{if(Array.isArray(A.__webglFramebuffer))for(let lt=0;lt<A.__webglFramebuffer.length;lt++)r.deleteFramebuffer(A.__webglFramebuffer[lt]);else r.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&r.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let lt=0;lt<A.__webglColorRenderbuffer.length;lt++)A.__webglColorRenderbuffer[lt]&&r.deleteRenderbuffer(A.__webglColorRenderbuffer[lt]);A.__webglDepthRenderbuffer&&r.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const q=U.textures;for(let lt=0,vt=q.length;lt<vt;lt++){const ht=s.get(q[lt]);ht.__webglTexture&&(r.deleteTexture(ht.__webglTexture),f.memory.textures--),s.remove(q[lt])}s.remove(U)}let V=0;function J(){V=0}function at(){const U=V;return U>=l.maxTextures&&ge("WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+l.maxTextures),V+=1,U}function st(U){const A=[];return A.push(U.wrapS),A.push(U.wrapT),A.push(U.wrapR||0),A.push(U.magFilter),A.push(U.minFilter),A.push(U.anisotropy),A.push(U.internalFormat),A.push(U.format),A.push(U.type),A.push(U.generateMipmaps),A.push(U.premultiplyAlpha),A.push(U.flipY),A.push(U.unpackAlignment),A.push(U.colorSpace),A.join()}function et(U,A){const q=s.get(U);if(U.isVideoTexture&&oe(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&q.__version!==U.version){const lt=U.image;if(lt===null)ge("WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)ge("WebGLRenderer: Texture marked for update but image is incomplete");else{Q(q,U,A);return}}else U.isExternalTexture&&(q.__webglTexture=U.sourceTexture?U.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,q.__webglTexture,r.TEXTURE0+A)}function P(U,A){const q=s.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&q.__version!==U.version){Q(q,U,A);return}else U.isExternalTexture&&(q.__webglTexture=U.sourceTexture?U.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,q.__webglTexture,r.TEXTURE0+A)}function G(U,A){const q=s.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&q.__version!==U.version){Q(q,U,A);return}i.bindTexture(r.TEXTURE_3D,q.__webglTexture,r.TEXTURE0+A)}function Y(U,A){const q=s.get(U);if(U.isCubeDepthTexture!==!0&&U.version>0&&q.__version!==U.version){Et(q,U,A);return}i.bindTexture(r.TEXTURE_CUBE_MAP,q.__webglTexture,r.TEXTURE0+A)}const ot={[kh]:r.REPEAT,[qa]:r.CLAMP_TO_EDGE,[jh]:r.MIRRORED_REPEAT},yt={[jn]:r.NEAREST,[ib]:r.NEAREST_MIPMAP_NEAREST,[Fc]:r.NEAREST_MIPMAP_LINEAR,[Jn]:r.LINEAR,[qd]:r.LINEAR_MIPMAP_NEAREST,[lr]:r.LINEAR_MIPMAP_LINEAR},B={[ob]:r.NEVER,[db]:r.ALWAYS,[lb]:r.LESS,[zp]:r.LEQUAL,[cb]:r.EQUAL,[Fp]:r.GEQUAL,[ub]:r.GREATER,[fb]:r.NOTEQUAL};function W(U,A){if(A.type===ma&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===Jn||A.magFilter===qd||A.magFilter===Fc||A.magFilter===lr||A.minFilter===Jn||A.minFilter===qd||A.minFilter===Fc||A.minFilter===lr)&&ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(U,r.TEXTURE_WRAP_S,ot[A.wrapS]),r.texParameteri(U,r.TEXTURE_WRAP_T,ot[A.wrapT]),(U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY)&&r.texParameteri(U,r.TEXTURE_WRAP_R,ot[A.wrapR]),r.texParameteri(U,r.TEXTURE_MAG_FILTER,yt[A.magFilter]),r.texParameteri(U,r.TEXTURE_MIN_FILTER,yt[A.minFilter]),A.compareFunction&&(r.texParameteri(U,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(U,r.TEXTURE_COMPARE_FUNC,B[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===jn||A.minFilter!==Fc&&A.minFilter!==lr||A.type===ma&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||s.get(A).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");r.texParameterf(U,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,l.getMaxAnisotropy())),s.get(A).__currentAnisotropy=A.anisotropy}}}function dt(U,A){let q=!1;U.__webglInit===void 0&&(U.__webglInit=!0,A.addEventListener("dispose",z));const lt=A.source;let vt=g.get(lt);vt===void 0&&(vt={},g.set(lt,vt));const ht=st(A);if(ht!==U.__cacheKey){vt[ht]===void 0&&(vt[ht]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,q=!0),vt[ht].usedTimes++;const kt=vt[U.__cacheKey];kt!==void 0&&(vt[U.__cacheKey].usedTimes--,kt.usedTimes===0&&O(A)),U.__cacheKey=ht,U.__webglTexture=vt[ht].texture}return q}function Dt(U,A,q){return Math.floor(Math.floor(U/q)/A)}function zt(U,A,q,lt){const ht=U.updateRanges;if(ht.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,A.width,A.height,q,lt,A.data);else{ht.sort((Tt,wt)=>Tt.start-wt.start);let kt=0;for(let Tt=1;Tt<ht.length;Tt++){const wt=ht[kt],jt=ht[Tt],Ft=wt.start+wt.count,Xt=Dt(jt.start,A.width,4),_e=Dt(wt.start,A.width,4);jt.start<=Ft+1&&Xt===_e&&Dt(jt.start+jt.count-1,A.width,4)===Xt?wt.count=Math.max(wt.count,jt.start+jt.count-wt.start):(++kt,ht[kt]=jt)}ht.length=kt+1;const Pt=r.getParameter(r.UNPACK_ROW_LENGTH),te=r.getParameter(r.UNPACK_SKIP_PIXELS),ie=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,A.width);for(let Tt=0,wt=ht.length;Tt<wt;Tt++){const jt=ht[Tt],Ft=Math.floor(jt.start/4),Xt=Math.ceil(jt.count/4),_e=Ft%A.width,Z=Math.floor(Ft/A.width),Ot=Xt,It=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,_e),r.pixelStorei(r.UNPACK_SKIP_ROWS,Z),i.texSubImage2D(r.TEXTURE_2D,0,_e,Z,Ot,It,q,lt,A.data)}U.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,Pt),r.pixelStorei(r.UNPACK_SKIP_PIXELS,te),r.pixelStorei(r.UNPACK_SKIP_ROWS,ie)}}function Q(U,A,q){let lt=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(lt=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(lt=r.TEXTURE_3D);const vt=dt(U,A),ht=A.source;i.bindTexture(lt,U.__webglTexture,r.TEXTURE0+q);const kt=s.get(ht);if(ht.version!==kt.__version||vt===!0){i.activeTexture(r.TEXTURE0+q);const Pt=ke.getPrimaries(ke.workingColorSpace),te=A.colorSpace===Os?null:ke.getPrimaries(A.colorSpace),ie=A.colorSpace===Os||Pt===te?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);let Tt=R(A.image,!1,l.maxTextureSize);Tt=le(A,Tt);const wt=c.convert(A.format,A.colorSpace),jt=c.convert(A.type);let Ft=F(A.internalFormat,wt,jt,A.colorSpace,A.isVideoTexture);W(lt,A);let Xt;const _e=A.mipmaps,Z=A.isVideoTexture!==!0,Ot=kt.__version===void 0||vt===!0,It=ht.dataReady,Kt=H(A,Tt);if(A.isDepthTexture)Ft=N(A.format===cr,A.type),Ot&&(Z?i.texStorage2D(r.TEXTURE_2D,1,Ft,Tt.width,Tt.height):i.texImage2D(r.TEXTURE_2D,0,Ft,Tt.width,Tt.height,0,wt,jt,null));else if(A.isDataTexture)if(_e.length>0){Z&&Ot&&i.texStorage2D(r.TEXTURE_2D,Kt,Ft,_e[0].width,_e[0].height);for(let Nt=0,xt=_e.length;Nt<xt;Nt++)Xt=_e[Nt],Z?It&&i.texSubImage2D(r.TEXTURE_2D,Nt,0,0,Xt.width,Xt.height,wt,jt,Xt.data):i.texImage2D(r.TEXTURE_2D,Nt,Ft,Xt.width,Xt.height,0,wt,jt,Xt.data);A.generateMipmaps=!1}else Z?(Ot&&i.texStorage2D(r.TEXTURE_2D,Kt,Ft,Tt.width,Tt.height),It&&zt(A,Tt,wt,jt)):i.texImage2D(r.TEXTURE_2D,0,Ft,Tt.width,Tt.height,0,wt,jt,Tt.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Z&&Ot&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Kt,Ft,_e[0].width,_e[0].height,Tt.depth);for(let Nt=0,xt=_e.length;Nt<xt;Nt++)if(Xt=_e[Nt],A.format!==sa)if(wt!==null)if(Z){if(It)if(A.layerUpdates.size>0){const Qt=gv(Xt.width,Xt.height,A.format,A.type);for(const fe of A.layerUpdates){const He=Xt.data.subarray(fe*Qt/Xt.data.BYTES_PER_ELEMENT,(fe+1)*Qt/Xt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Nt,0,0,fe,Xt.width,Xt.height,1,wt,He)}A.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Nt,0,0,0,Xt.width,Xt.height,Tt.depth,wt,Xt.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Nt,Ft,Xt.width,Xt.height,Tt.depth,0,Xt.data,0,0);else ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Z?It&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,Nt,0,0,0,Xt.width,Xt.height,Tt.depth,wt,jt,Xt.data):i.texImage3D(r.TEXTURE_2D_ARRAY,Nt,Ft,Xt.width,Xt.height,Tt.depth,0,wt,jt,Xt.data)}else{Z&&Ot&&i.texStorage2D(r.TEXTURE_2D,Kt,Ft,_e[0].width,_e[0].height);for(let Nt=0,xt=_e.length;Nt<xt;Nt++)Xt=_e[Nt],A.format!==sa?wt!==null?Z?It&&i.compressedTexSubImage2D(r.TEXTURE_2D,Nt,0,0,Xt.width,Xt.height,wt,Xt.data):i.compressedTexImage2D(r.TEXTURE_2D,Nt,Ft,Xt.width,Xt.height,0,Xt.data):ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Z?It&&i.texSubImage2D(r.TEXTURE_2D,Nt,0,0,Xt.width,Xt.height,wt,jt,Xt.data):i.texImage2D(r.TEXTURE_2D,Nt,Ft,Xt.width,Xt.height,0,wt,jt,Xt.data)}else if(A.isDataArrayTexture)if(Z){if(Ot&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Kt,Ft,Tt.width,Tt.height,Tt.depth),It)if(A.layerUpdates.size>0){const Nt=gv(Tt.width,Tt.height,A.format,A.type);for(const xt of A.layerUpdates){const Qt=Tt.data.subarray(xt*Nt/Tt.data.BYTES_PER_ELEMENT,(xt+1)*Nt/Tt.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,xt,Tt.width,Tt.height,1,wt,jt,Qt)}A.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Tt.width,Tt.height,Tt.depth,wt,jt,Tt.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Ft,Tt.width,Tt.height,Tt.depth,0,wt,jt,Tt.data);else if(A.isData3DTexture)Z?(Ot&&i.texStorage3D(r.TEXTURE_3D,Kt,Ft,Tt.width,Tt.height,Tt.depth),It&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Tt.width,Tt.height,Tt.depth,wt,jt,Tt.data)):i.texImage3D(r.TEXTURE_3D,0,Ft,Tt.width,Tt.height,Tt.depth,0,wt,jt,Tt.data);else if(A.isFramebufferTexture){if(Ot)if(Z)i.texStorage2D(r.TEXTURE_2D,Kt,Ft,Tt.width,Tt.height);else{let Nt=Tt.width,xt=Tt.height;for(let Qt=0;Qt<Kt;Qt++)i.texImage2D(r.TEXTURE_2D,Qt,Ft,Nt,xt,0,wt,jt,null),Nt>>=1,xt>>=1}}else if(_e.length>0){if(Z&&Ot){const Nt=Gt(_e[0]);i.texStorage2D(r.TEXTURE_2D,Kt,Ft,Nt.width,Nt.height)}for(let Nt=0,xt=_e.length;Nt<xt;Nt++)Xt=_e[Nt],Z?It&&i.texSubImage2D(r.TEXTURE_2D,Nt,0,0,wt,jt,Xt):i.texImage2D(r.TEXTURE_2D,Nt,Ft,wt,jt,Xt);A.generateMipmaps=!1}else if(Z){if(Ot){const Nt=Gt(Tt);i.texStorage2D(r.TEXTURE_2D,Kt,Ft,Nt.width,Nt.height)}It&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,wt,jt,Tt)}else i.texImage2D(r.TEXTURE_2D,0,Ft,wt,jt,Tt);x(A)&&b(lt),kt.__version=ht.version,A.onUpdate&&A.onUpdate(A)}U.__version=A.version}function Et(U,A,q){if(A.image.length!==6)return;const lt=dt(U,A),vt=A.source;i.bindTexture(r.TEXTURE_CUBE_MAP,U.__webglTexture,r.TEXTURE0+q);const ht=s.get(vt);if(vt.version!==ht.__version||lt===!0){i.activeTexture(r.TEXTURE0+q);const kt=ke.getPrimaries(ke.workingColorSpace),Pt=A.colorSpace===Os?null:ke.getPrimaries(A.colorSpace),te=A.colorSpace===Os||kt===Pt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const ie=A.isCompressedTexture||A.image[0].isCompressedTexture,Tt=A.image[0]&&A.image[0].isDataTexture,wt=[];for(let xt=0;xt<6;xt++)!ie&&!Tt?wt[xt]=R(A.image[xt],!0,l.maxCubemapSize):wt[xt]=Tt?A.image[xt].image:A.image[xt],wt[xt]=le(A,wt[xt]);const jt=wt[0],Ft=c.convert(A.format,A.colorSpace),Xt=c.convert(A.type),_e=F(A.internalFormat,Ft,Xt,A.colorSpace),Z=A.isVideoTexture!==!0,Ot=ht.__version===void 0||lt===!0,It=vt.dataReady;let Kt=H(A,jt);W(r.TEXTURE_CUBE_MAP,A);let Nt;if(ie){Z&&Ot&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Kt,_e,jt.width,jt.height);for(let xt=0;xt<6;xt++){Nt=wt[xt].mipmaps;for(let Qt=0;Qt<Nt.length;Qt++){const fe=Nt[Qt];A.format!==sa?Ft!==null?Z?It&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Qt,0,0,fe.width,fe.height,Ft,fe.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Qt,_e,fe.width,fe.height,0,fe.data):ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Z?It&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Qt,0,0,fe.width,fe.height,Ft,Xt,fe.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Qt,_e,fe.width,fe.height,0,Ft,Xt,fe.data)}}}else{if(Nt=A.mipmaps,Z&&Ot){Nt.length>0&&Kt++;const xt=Gt(wt[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Kt,_e,xt.width,xt.height)}for(let xt=0;xt<6;xt++)if(Tt){Z?It&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,wt[xt].width,wt[xt].height,Ft,Xt,wt[xt].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,_e,wt[xt].width,wt[xt].height,0,Ft,Xt,wt[xt].data);for(let Qt=0;Qt<Nt.length;Qt++){const He=Nt[Qt].image[xt].image;Z?It&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Qt+1,0,0,He.width,He.height,Ft,Xt,He.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Qt+1,_e,He.width,He.height,0,Ft,Xt,He.data)}}else{Z?It&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,Ft,Xt,wt[xt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,_e,Ft,Xt,wt[xt]);for(let Qt=0;Qt<Nt.length;Qt++){const fe=Nt[Qt];Z?It&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Qt+1,0,0,Ft,Xt,fe.image[xt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Qt+1,_e,Ft,Xt,fe.image[xt])}}}x(A)&&b(r.TEXTURE_CUBE_MAP),ht.__version=vt.version,A.onUpdate&&A.onUpdate(A)}U.__version=A.version}function Mt(U,A,q,lt,vt,ht){const kt=c.convert(q.format,q.colorSpace),Pt=c.convert(q.type),te=F(q.internalFormat,kt,Pt,q.colorSpace),ie=s.get(A),Tt=s.get(q);if(Tt.__renderTarget=A,!ie.__hasExternalTextures){const wt=Math.max(1,A.width>>ht),jt=Math.max(1,A.height>>ht);vt===r.TEXTURE_3D||vt===r.TEXTURE_2D_ARRAY?i.texImage3D(vt,ht,te,wt,jt,A.depth,0,kt,Pt,null):i.texImage2D(vt,ht,te,wt,jt,0,kt,Pt,null)}i.bindFramebuffer(r.FRAMEBUFFER,U),Ae(A)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,lt,vt,Tt.__webglTexture,0,k(A)):(vt===r.TEXTURE_2D||vt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&vt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,lt,vt,Tt.__webglTexture,ht),i.bindFramebuffer(r.FRAMEBUFFER,null)}function Wt(U,A,q){if(r.bindRenderbuffer(r.RENDERBUFFER,U),A.depthBuffer){const lt=A.depthTexture,vt=lt&&lt.isDepthTexture?lt.type:null,ht=N(A.stencilBuffer,vt),kt=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Ae(A)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,k(A),ht,A.width,A.height):q?r.renderbufferStorageMultisample(r.RENDERBUFFER,k(A),ht,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,ht,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,kt,r.RENDERBUFFER,U)}else{const lt=A.textures;for(let vt=0;vt<lt.length;vt++){const ht=lt[vt],kt=c.convert(ht.format,ht.colorSpace),Pt=c.convert(ht.type),te=F(ht.internalFormat,kt,Pt,ht.colorSpace);Ae(A)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,k(A),te,A.width,A.height):q?r.renderbufferStorageMultisample(r.RENDERBUFFER,k(A),te,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,te,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ut(U,A,q){const lt=A.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,U),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const vt=s.get(A.depthTexture);if(vt.__renderTarget=A,(!vt.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),lt){if(vt.__webglInit===void 0&&(vt.__webglInit=!0,A.depthTexture.addEventListener("dispose",z)),vt.__webglTexture===void 0){vt.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,vt.__webglTexture),W(r.TEXTURE_CUBE_MAP,A.depthTexture);const ie=c.convert(A.depthTexture.format),Tt=c.convert(A.depthTexture.type);let wt;A.depthTexture.format===Ja?wt=r.DEPTH_COMPONENT24:A.depthTexture.format===cr&&(wt=r.DEPTH24_STENCIL8);for(let jt=0;jt<6;jt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+jt,0,wt,A.width,A.height,0,ie,Tt,null)}}else et(A.depthTexture,0);const ht=vt.__webglTexture,kt=k(A),Pt=lt?r.TEXTURE_CUBE_MAP_POSITIVE_X+q:r.TEXTURE_2D,te=A.depthTexture.format===cr?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(A.depthTexture.format===Ja)Ae(A)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,te,Pt,ht,0,kt):r.framebufferTexture2D(r.FRAMEBUFFER,te,Pt,ht,0);else if(A.depthTexture.format===cr)Ae(A)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,te,Pt,ht,0,kt):r.framebufferTexture2D(r.FRAMEBUFFER,te,Pt,ht,0);else throw new Error("Unknown depthTexture format")}function re(U){const A=s.get(U),q=U.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==U.depthTexture){const lt=U.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),lt){const vt=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,lt.removeEventListener("dispose",vt)};lt.addEventListener("dispose",vt),A.__depthDisposeCallback=vt}A.__boundDepthTexture=lt}if(U.depthTexture&&!A.__autoAllocateDepthBuffer)if(q)for(let lt=0;lt<6;lt++)Ut(A.__webglFramebuffer[lt],U,lt);else{const lt=U.texture.mipmaps;lt&&lt.length>0?Ut(A.__webglFramebuffer[0],U,0):Ut(A.__webglFramebuffer,U,0)}else if(q){A.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)if(i.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[lt]),A.__webglDepthbuffer[lt]===void 0)A.__webglDepthbuffer[lt]=r.createRenderbuffer(),Wt(A.__webglDepthbuffer[lt],U,!1);else{const vt=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ht=A.__webglDepthbuffer[lt];r.bindRenderbuffer(r.RENDERBUFFER,ht),r.framebufferRenderbuffer(r.FRAMEBUFFER,vt,r.RENDERBUFFER,ht)}}else{const lt=U.texture.mipmaps;if(lt&&lt.length>0?i.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=r.createRenderbuffer(),Wt(A.__webglDepthbuffer,U,!1);else{const vt=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ht=A.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ht),r.framebufferRenderbuffer(r.FRAMEBUFFER,vt,r.RENDERBUFFER,ht)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function ye(U,A,q){const lt=s.get(U);A!==void 0&&Mt(lt.__webglFramebuffer,U,U.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),q!==void 0&&re(U)}function Rt(U){const A=U.texture,q=s.get(U),lt=s.get(A);U.addEventListener("dispose",I);const vt=U.textures,ht=U.isWebGLCubeRenderTarget===!0,kt=vt.length>1;if(kt||(lt.__webglTexture===void 0&&(lt.__webglTexture=r.createTexture()),lt.__version=A.version,f.memory.textures++),ht){q.__webglFramebuffer=[];for(let Pt=0;Pt<6;Pt++)if(A.mipmaps&&A.mipmaps.length>0){q.__webglFramebuffer[Pt]=[];for(let te=0;te<A.mipmaps.length;te++)q.__webglFramebuffer[Pt][te]=r.createFramebuffer()}else q.__webglFramebuffer[Pt]=r.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){q.__webglFramebuffer=[];for(let Pt=0;Pt<A.mipmaps.length;Pt++)q.__webglFramebuffer[Pt]=r.createFramebuffer()}else q.__webglFramebuffer=r.createFramebuffer();if(kt)for(let Pt=0,te=vt.length;Pt<te;Pt++){const ie=s.get(vt[Pt]);ie.__webglTexture===void 0&&(ie.__webglTexture=r.createTexture(),f.memory.textures++)}if(U.samples>0&&Ae(U)===!1){q.__webglMultisampledFramebuffer=r.createFramebuffer(),q.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let Pt=0;Pt<vt.length;Pt++){const te=vt[Pt];q.__webglColorRenderbuffer[Pt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,q.__webglColorRenderbuffer[Pt]);const ie=c.convert(te.format,te.colorSpace),Tt=c.convert(te.type),wt=F(te.internalFormat,ie,Tt,te.colorSpace,U.isXRRenderTarget===!0),jt=k(U);r.renderbufferStorageMultisample(r.RENDERBUFFER,jt,wt,U.width,U.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Pt,r.RENDERBUFFER,q.__webglColorRenderbuffer[Pt])}r.bindRenderbuffer(r.RENDERBUFFER,null),U.depthBuffer&&(q.__webglDepthRenderbuffer=r.createRenderbuffer(),Wt(q.__webglDepthRenderbuffer,U,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ht){i.bindTexture(r.TEXTURE_CUBE_MAP,lt.__webglTexture),W(r.TEXTURE_CUBE_MAP,A);for(let Pt=0;Pt<6;Pt++)if(A.mipmaps&&A.mipmaps.length>0)for(let te=0;te<A.mipmaps.length;te++)Mt(q.__webglFramebuffer[Pt][te],U,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,te);else Mt(q.__webglFramebuffer[Pt],U,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0);x(A)&&b(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(kt){for(let Pt=0,te=vt.length;Pt<te;Pt++){const ie=vt[Pt],Tt=s.get(ie);let wt=r.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(wt=U.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(wt,Tt.__webglTexture),W(wt,ie),Mt(q.__webglFramebuffer,U,ie,r.COLOR_ATTACHMENT0+Pt,wt,0),x(ie)&&b(wt)}i.unbindTexture()}else{let Pt=r.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Pt=U.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Pt,lt.__webglTexture),W(Pt,A),A.mipmaps&&A.mipmaps.length>0)for(let te=0;te<A.mipmaps.length;te++)Mt(q.__webglFramebuffer[te],U,A,r.COLOR_ATTACHMENT0,Pt,te);else Mt(q.__webglFramebuffer,U,A,r.COLOR_ATTACHMENT0,Pt,0);x(A)&&b(Pt),i.unbindTexture()}U.depthBuffer&&re(U)}function Lt(U){const A=U.textures;for(let q=0,lt=A.length;q<lt;q++){const vt=A[q];if(x(vt)){const ht=L(U),kt=s.get(vt).__webglTexture;i.bindTexture(ht,kt),b(ht),i.unbindTexture()}}}const ae=[],qt=[];function he(U){if(U.samples>0){if(Ae(U)===!1){const A=U.textures,q=U.width,lt=U.height;let vt=r.COLOR_BUFFER_BIT;const ht=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,kt=s.get(U),Pt=A.length>1;if(Pt)for(let ie=0;ie<A.length;ie++)i.bindFramebuffer(r.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ie,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,kt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ie,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,kt.__webglMultisampledFramebuffer);const te=U.texture.mipmaps;te&&te.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,kt.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,kt.__webglFramebuffer);for(let ie=0;ie<A.length;ie++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(vt|=r.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(vt|=r.STENCIL_BUFFER_BIT)),Pt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,kt.__webglColorRenderbuffer[ie]);const Tt=s.get(A[ie]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Tt,0)}r.blitFramebuffer(0,0,q,lt,0,0,q,lt,vt,r.NEAREST),m===!0&&(ae.length=0,qt.length=0,ae.push(r.COLOR_ATTACHMENT0+ie),U.depthBuffer&&U.resolveDepthBuffer===!1&&(ae.push(ht),qt.push(ht),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,qt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ae))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Pt)for(let ie=0;ie<A.length;ie++){i.bindFramebuffer(r.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ie,r.RENDERBUFFER,kt.__webglColorRenderbuffer[ie]);const Tt=s.get(A[ie]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,kt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ie,r.TEXTURE_2D,Tt,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,kt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&m){const A=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[A])}}}function k(U){return Math.min(l.maxSamples,U.samples)}function Ae(U){const A=s.get(U);return U.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function oe(U){const A=f.render.frame;_.get(U)!==A&&(_.set(U,A),U.update())}function le(U,A){const q=U.colorSpace,lt=U.format,vt=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||q!==So&&q!==Os&&(ke.getTransfer(q)===Je?(lt!==sa||vt!==ki)&&ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ve("WebGLTextures: Unsupported texture color space:",q)),A}function Gt(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(h.width=U.naturalWidth||U.width,h.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(h.width=U.displayWidth,h.height=U.displayHeight):(h.width=U.width,h.height=U.height),h}this.allocateTextureUnit=at,this.resetTextureUnits=J,this.setTexture2D=et,this.setTexture2DArray=P,this.setTexture3D=G,this.setTextureCube=Y,this.rebindTextures=ye,this.setupRenderTarget=Rt,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=he,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=Ae,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function aR(r,t){function i(s,l=Os){let c;const f=ke.getTransfer(l);if(s===ki)return r.UNSIGNED_BYTE;if(s===Lp)return r.UNSIGNED_SHORT_4_4_4_4;if(s===Up)return r.UNSIGNED_SHORT_5_5_5_1;if(s===vx)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===xx)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===gx)return r.BYTE;if(s===_x)return r.SHORT;if(s===Al)return r.UNSIGNED_SHORT;if(s===Np)return r.INT;if(s===xa)return r.UNSIGNED_INT;if(s===ma)return r.FLOAT;if(s===Qa)return r.HALF_FLOAT;if(s===yx)return r.ALPHA;if(s===Sx)return r.RGB;if(s===sa)return r.RGBA;if(s===Ja)return r.DEPTH_COMPONENT;if(s===cr)return r.DEPTH_STENCIL;if(s===Mx)return r.RED;if(s===Op)return r.RED_INTEGER;if(s===yo)return r.RG;if(s===Pp)return r.RG_INTEGER;if(s===Ip)return r.RGBA_INTEGER;if(s===yu||s===Su||s===Mu||s===bu)if(f===Je)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===yu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Su)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Mu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===bu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===yu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Su)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Mu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===bu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Xh||s===Yh||s===Wh||s===qh)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===Xh)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Yh)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Wh)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===qh)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Zh||s===Kh||s===Qh||s===Jh||s===$h||s===tp||s===ep)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Zh||s===Kh)return f===Je?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Qh)return f===Je?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===Jh)return c.COMPRESSED_R11_EAC;if(s===$h)return c.COMPRESSED_SIGNED_R11_EAC;if(s===tp)return c.COMPRESSED_RG11_EAC;if(s===ep)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===np||s===ip||s===ap||s===sp||s===rp||s===op||s===lp||s===cp||s===up||s===fp||s===dp||s===hp||s===pp||s===mp)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===np)return f===Je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===ip)return f===Je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===ap)return f===Je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===sp)return f===Je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===rp)return f===Je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===op)return f===Je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===lp)return f===Je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===cp)return f===Je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===up)return f===Je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===fp)return f===Je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===dp)return f===Je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===hp)return f===Je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===pp)return f===Je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===mp)return f===Je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===gp||s===_p||s===vp)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===gp)return f===Je?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===_p)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===vp)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===xp||s===yp||s===Sp||s===Mp)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===xp)return c.COMPRESSED_RED_RGTC1_EXT;if(s===yp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Sp)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Mp)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Cl?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const sR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rR=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class oR{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i){if(this.texture===null){const s=new Lx(t.texture);(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new Sa({vertexShader:sR,fragmentShader:rR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new ya(new Iu(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class lR extends hr{constructor(t,i){super();const s=this;let l=null,c=1,f=null,p="local-floor",m=1,h=null,_=null,v=null,g=null,M=null,E=null;const R=typeof XRWebGLBinding<"u",x=new oR,b={},L=i.getContextAttributes();let F=null,N=null;const H=[],z=[],I=new Re;let T=null;const O=new Vi;O.viewport=new bn;const mt=new Vi;mt.viewport=new bn;const V=[O,mt],J=new gE;let at=null,st=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let Et=H[Q];return Et===void 0&&(Et=new th,H[Q]=Et),Et.getTargetRaySpace()},this.getControllerGrip=function(Q){let Et=H[Q];return Et===void 0&&(Et=new th,H[Q]=Et),Et.getGripSpace()},this.getHand=function(Q){let Et=H[Q];return Et===void 0&&(Et=new th,H[Q]=Et),Et.getHandSpace()};function et(Q){const Et=z.indexOf(Q.inputSource);if(Et===-1)return;const Mt=H[Et];Mt!==void 0&&(Mt.update(Q.inputSource,Q.frame,h||f),Mt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function P(){l.removeEventListener("select",et),l.removeEventListener("selectstart",et),l.removeEventListener("selectend",et),l.removeEventListener("squeeze",et),l.removeEventListener("squeezestart",et),l.removeEventListener("squeezeend",et),l.removeEventListener("end",P),l.removeEventListener("inputsourceschange",G);for(let Q=0;Q<H.length;Q++){const Et=z[Q];Et!==null&&(z[Q]=null,H[Q].disconnect(Et))}at=null,st=null,x.reset();for(const Q in b)delete b[Q];t.setRenderTarget(F),M=null,g=null,v=null,l=null,N=null,zt.stop(),s.isPresenting=!1,t.setPixelRatio(T),t.setSize(I.width,I.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){c=Q,s.isPresenting===!0&&ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){p=Q,s.isPresenting===!0&&ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||f},this.setReferenceSpace=function(Q){h=Q},this.getBaseLayer=function(){return g!==null?g:M},this.getBinding=function(){return v===null&&R&&(v=new XRWebGLBinding(l,i)),v},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(Q){if(l=Q,l!==null){if(F=t.getRenderTarget(),l.addEventListener("select",et),l.addEventListener("selectstart",et),l.addEventListener("selectend",et),l.addEventListener("squeeze",et),l.addEventListener("squeezestart",et),l.addEventListener("squeezeend",et),l.addEventListener("end",P),l.addEventListener("inputsourceschange",G),L.xrCompatible!==!0&&await i.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(I),R&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,Wt=null,Ut=null;L.depth&&(Ut=L.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Mt=L.stencil?cr:Ja,Wt=L.stencil?Cl:xa);const re={colorFormat:i.RGBA8,depthFormat:Ut,scaleFactor:c};v=this.getBinding(),g=v.createProjectionLayer(re),l.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),N=new va(g.textureWidth,g.textureHeight,{format:sa,type:ki,depthTexture:new wl(g.textureWidth,g.textureHeight,Wt,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:L.stencil,colorSpace:t.outputColorSpace,samples:L.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const Mt={antialias:L.antialias,alpha:!0,depth:L.depth,stencil:L.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,i,Mt),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),N=new va(M.framebufferWidth,M.framebufferHeight,{format:sa,type:ki,colorSpace:t.outputColorSpace,stencilBuffer:L.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}N.isXRRenderTarget=!0,this.setFoveation(m),h=null,f=await l.requestReferenceSpace(p),zt.setContext(l),zt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function G(Q){for(let Et=0;Et<Q.removed.length;Et++){const Mt=Q.removed[Et],Wt=z.indexOf(Mt);Wt>=0&&(z[Wt]=null,H[Wt].disconnect(Mt))}for(let Et=0;Et<Q.added.length;Et++){const Mt=Q.added[Et];let Wt=z.indexOf(Mt);if(Wt===-1){for(let re=0;re<H.length;re++)if(re>=z.length){z.push(Mt),Wt=re;break}else if(z[re]===null){z[re]=Mt,Wt=re;break}if(Wt===-1)break}const Ut=H[Wt];Ut&&Ut.connect(Mt)}}const Y=new it,ot=new it;function yt(Q,Et,Mt){Y.setFromMatrixPosition(Et.matrixWorld),ot.setFromMatrixPosition(Mt.matrixWorld);const Wt=Y.distanceTo(ot),Ut=Et.projectionMatrix.elements,re=Mt.projectionMatrix.elements,ye=Ut[14]/(Ut[10]-1),Rt=Ut[14]/(Ut[10]+1),Lt=(Ut[9]+1)/Ut[5],ae=(Ut[9]-1)/Ut[5],qt=(Ut[8]-1)/Ut[0],he=(re[8]+1)/re[0],k=ye*qt,Ae=ye*he,oe=Wt/(-qt+he),le=oe*-qt;if(Et.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(le),Q.translateZ(oe),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Ut[10]===-1)Q.projectionMatrix.copy(Et.projectionMatrix),Q.projectionMatrixInverse.copy(Et.projectionMatrixInverse);else{const Gt=ye+oe,U=Rt+oe,A=k-le,q=Ae+(Wt-le),lt=Lt*Rt/U*Gt,vt=ae*Rt/U*Gt;Q.projectionMatrix.makePerspective(A,q,lt,vt,Gt,U),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function B(Q,Et){Et===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(Et.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(l===null)return;let Et=Q.near,Mt=Q.far;x.texture!==null&&(x.depthNear>0&&(Et=x.depthNear),x.depthFar>0&&(Mt=x.depthFar)),J.near=mt.near=O.near=Et,J.far=mt.far=O.far=Mt,(at!==J.near||st!==J.far)&&(l.updateRenderState({depthNear:J.near,depthFar:J.far}),at=J.near,st=J.far),J.layers.mask=Q.layers.mask|6,O.layers.mask=J.layers.mask&-5,mt.layers.mask=J.layers.mask&-3;const Wt=Q.parent,Ut=J.cameras;B(J,Wt);for(let re=0;re<Ut.length;re++)B(Ut[re],Wt);Ut.length===2?yt(J,O,mt):J.projectionMatrix.copy(O.projectionMatrix),W(Q,J,Wt)};function W(Q,Et,Mt){Mt===null?Q.matrix.copy(Et.matrixWorld):(Q.matrix.copy(Mt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(Et.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(Et.projectionMatrix),Q.projectionMatrixInverse.copy(Et.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Rl*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return J},this.getFoveation=function(){if(!(g===null&&M===null))return m},this.setFoveation=function(Q){m=Q,g!==null&&(g.fixedFoveation=Q),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=Q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(J)},this.getCameraTexture=function(Q){return b[Q]};let dt=null;function Dt(Q,Et){if(_=Et.getViewerPose(h||f),E=Et,_!==null){const Mt=_.views;M!==null&&(t.setRenderTargetFramebuffer(N,M.framebuffer),t.setRenderTarget(N));let Wt=!1;Mt.length!==J.cameras.length&&(J.cameras.length=0,Wt=!0);for(let Rt=0;Rt<Mt.length;Rt++){const Lt=Mt[Rt];let ae=null;if(M!==null)ae=M.getViewport(Lt);else{const he=v.getViewSubImage(g,Lt);ae=he.viewport,Rt===0&&(t.setRenderTargetTextures(N,he.colorTexture,he.depthStencilTexture),t.setRenderTarget(N))}let qt=V[Rt];qt===void 0&&(qt=new Vi,qt.layers.enable(Rt),qt.viewport=new bn,V[Rt]=qt),qt.matrix.fromArray(Lt.transform.matrix),qt.matrix.decompose(qt.position,qt.quaternion,qt.scale),qt.projectionMatrix.fromArray(Lt.projectionMatrix),qt.projectionMatrixInverse.copy(qt.projectionMatrix).invert(),qt.viewport.set(ae.x,ae.y,ae.width,ae.height),Rt===0&&(J.matrix.copy(qt.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale)),Wt===!0&&J.cameras.push(qt)}const Ut=l.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&R){v=s.getBinding();const Rt=v.getDepthInformation(Mt[0]);Rt&&Rt.isValid&&Rt.texture&&x.init(Rt,l.renderState)}if(Ut&&Ut.includes("camera-access")&&R){t.state.unbindTexture(),v=s.getBinding();for(let Rt=0;Rt<Mt.length;Rt++){const Lt=Mt[Rt].camera;if(Lt){let ae=b[Lt];ae||(ae=new Lx,b[Lt]=ae);const qt=v.getCameraImage(Lt);ae.sourceTexture=qt}}}}for(let Mt=0;Mt<H.length;Mt++){const Wt=z[Mt],Ut=H[Mt];Wt!==null&&Ut!==void 0&&Ut.update(Wt,Et,h||f)}dt&&dt(Q,Et),Et.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:Et}),E=null}const zt=new Px;zt.setAnimationLoop(Dt),this.setAnimationLoop=function(Q){dt=Q},this.dispose=function(){}}}const sr=new $a,cR=new pn;function uR(r,t){function i(x,b){x.matrixAutoUpdate===!0&&x.updateMatrix(),b.value.copy(x.matrix)}function s(x,b){b.color.getRGB(x.fogColor.value,Ux(r)),b.isFog?(x.fogNear.value=b.near,x.fogFar.value=b.far):b.isFogExp2&&(x.fogDensity.value=b.density)}function l(x,b,L,F,N){b.isMeshBasicMaterial?c(x,b):b.isMeshLambertMaterial?(c(x,b),b.envMap&&(x.envMapIntensity.value=b.envMapIntensity)):b.isMeshToonMaterial?(c(x,b),v(x,b)):b.isMeshPhongMaterial?(c(x,b),_(x,b),b.envMap&&(x.envMapIntensity.value=b.envMapIntensity)):b.isMeshStandardMaterial?(c(x,b),g(x,b),b.isMeshPhysicalMaterial&&M(x,b,N)):b.isMeshMatcapMaterial?(c(x,b),E(x,b)):b.isMeshDepthMaterial?c(x,b):b.isMeshDistanceMaterial?(c(x,b),R(x,b)):b.isMeshNormalMaterial?c(x,b):b.isLineBasicMaterial?(f(x,b),b.isLineDashedMaterial&&p(x,b)):b.isPointsMaterial?m(x,b,L,F):b.isSpriteMaterial?h(x,b):b.isShadowMaterial?(x.color.value.copy(b.color),x.opacity.value=b.opacity):b.isShaderMaterial&&(b.uniformsNeedUpdate=!1)}function c(x,b){x.opacity.value=b.opacity,b.color&&x.diffuse.value.copy(b.color),b.emissive&&x.emissive.value.copy(b.emissive).multiplyScalar(b.emissiveIntensity),b.map&&(x.map.value=b.map,i(b.map,x.mapTransform)),b.alphaMap&&(x.alphaMap.value=b.alphaMap,i(b.alphaMap,x.alphaMapTransform)),b.bumpMap&&(x.bumpMap.value=b.bumpMap,i(b.bumpMap,x.bumpMapTransform),x.bumpScale.value=b.bumpScale,b.side===vi&&(x.bumpScale.value*=-1)),b.normalMap&&(x.normalMap.value=b.normalMap,i(b.normalMap,x.normalMapTransform),x.normalScale.value.copy(b.normalScale),b.side===vi&&x.normalScale.value.negate()),b.displacementMap&&(x.displacementMap.value=b.displacementMap,i(b.displacementMap,x.displacementMapTransform),x.displacementScale.value=b.displacementScale,x.displacementBias.value=b.displacementBias),b.emissiveMap&&(x.emissiveMap.value=b.emissiveMap,i(b.emissiveMap,x.emissiveMapTransform)),b.specularMap&&(x.specularMap.value=b.specularMap,i(b.specularMap,x.specularMapTransform)),b.alphaTest>0&&(x.alphaTest.value=b.alphaTest);const L=t.get(b),F=L.envMap,N=L.envMapRotation;F&&(x.envMap.value=F,sr.copy(N),sr.x*=-1,sr.y*=-1,sr.z*=-1,F.isCubeTexture&&F.isRenderTargetTexture===!1&&(sr.y*=-1,sr.z*=-1),x.envMapRotation.value.setFromMatrix4(cR.makeRotationFromEuler(sr)),x.flipEnvMap.value=F.isCubeTexture&&F.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=b.reflectivity,x.ior.value=b.ior,x.refractionRatio.value=b.refractionRatio),b.lightMap&&(x.lightMap.value=b.lightMap,x.lightMapIntensity.value=b.lightMapIntensity,i(b.lightMap,x.lightMapTransform)),b.aoMap&&(x.aoMap.value=b.aoMap,x.aoMapIntensity.value=b.aoMapIntensity,i(b.aoMap,x.aoMapTransform))}function f(x,b){x.diffuse.value.copy(b.color),x.opacity.value=b.opacity,b.map&&(x.map.value=b.map,i(b.map,x.mapTransform))}function p(x,b){x.dashSize.value=b.dashSize,x.totalSize.value=b.dashSize+b.gapSize,x.scale.value=b.scale}function m(x,b,L,F){x.diffuse.value.copy(b.color),x.opacity.value=b.opacity,x.size.value=b.size*L,x.scale.value=F*.5,b.map&&(x.map.value=b.map,i(b.map,x.uvTransform)),b.alphaMap&&(x.alphaMap.value=b.alphaMap,i(b.alphaMap,x.alphaMapTransform)),b.alphaTest>0&&(x.alphaTest.value=b.alphaTest)}function h(x,b){x.diffuse.value.copy(b.color),x.opacity.value=b.opacity,x.rotation.value=b.rotation,b.map&&(x.map.value=b.map,i(b.map,x.mapTransform)),b.alphaMap&&(x.alphaMap.value=b.alphaMap,i(b.alphaMap,x.alphaMapTransform)),b.alphaTest>0&&(x.alphaTest.value=b.alphaTest)}function _(x,b){x.specular.value.copy(b.specular),x.shininess.value=Math.max(b.shininess,1e-4)}function v(x,b){b.gradientMap&&(x.gradientMap.value=b.gradientMap)}function g(x,b){x.metalness.value=b.metalness,b.metalnessMap&&(x.metalnessMap.value=b.metalnessMap,i(b.metalnessMap,x.metalnessMapTransform)),x.roughness.value=b.roughness,b.roughnessMap&&(x.roughnessMap.value=b.roughnessMap,i(b.roughnessMap,x.roughnessMapTransform)),b.envMap&&(x.envMapIntensity.value=b.envMapIntensity)}function M(x,b,L){x.ior.value=b.ior,b.sheen>0&&(x.sheenColor.value.copy(b.sheenColor).multiplyScalar(b.sheen),x.sheenRoughness.value=b.sheenRoughness,b.sheenColorMap&&(x.sheenColorMap.value=b.sheenColorMap,i(b.sheenColorMap,x.sheenColorMapTransform)),b.sheenRoughnessMap&&(x.sheenRoughnessMap.value=b.sheenRoughnessMap,i(b.sheenRoughnessMap,x.sheenRoughnessMapTransform))),b.clearcoat>0&&(x.clearcoat.value=b.clearcoat,x.clearcoatRoughness.value=b.clearcoatRoughness,b.clearcoatMap&&(x.clearcoatMap.value=b.clearcoatMap,i(b.clearcoatMap,x.clearcoatMapTransform)),b.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=b.clearcoatRoughnessMap,i(b.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),b.clearcoatNormalMap&&(x.clearcoatNormalMap.value=b.clearcoatNormalMap,i(b.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(b.clearcoatNormalScale),b.side===vi&&x.clearcoatNormalScale.value.negate())),b.dispersion>0&&(x.dispersion.value=b.dispersion),b.iridescence>0&&(x.iridescence.value=b.iridescence,x.iridescenceIOR.value=b.iridescenceIOR,x.iridescenceThicknessMinimum.value=b.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=b.iridescenceThicknessRange[1],b.iridescenceMap&&(x.iridescenceMap.value=b.iridescenceMap,i(b.iridescenceMap,x.iridescenceMapTransform)),b.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=b.iridescenceThicknessMap,i(b.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),b.transmission>0&&(x.transmission.value=b.transmission,x.transmissionSamplerMap.value=L.texture,x.transmissionSamplerSize.value.set(L.width,L.height),b.transmissionMap&&(x.transmissionMap.value=b.transmissionMap,i(b.transmissionMap,x.transmissionMapTransform)),x.thickness.value=b.thickness,b.thicknessMap&&(x.thicknessMap.value=b.thicknessMap,i(b.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=b.attenuationDistance,x.attenuationColor.value.copy(b.attenuationColor)),b.anisotropy>0&&(x.anisotropyVector.value.set(b.anisotropy*Math.cos(b.anisotropyRotation),b.anisotropy*Math.sin(b.anisotropyRotation)),b.anisotropyMap&&(x.anisotropyMap.value=b.anisotropyMap,i(b.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=b.specularIntensity,x.specularColor.value.copy(b.specularColor),b.specularColorMap&&(x.specularColorMap.value=b.specularColorMap,i(b.specularColorMap,x.specularColorMapTransform)),b.specularIntensityMap&&(x.specularIntensityMap.value=b.specularIntensityMap,i(b.specularIntensityMap,x.specularIntensityMapTransform))}function E(x,b){b.matcap&&(x.matcap.value=b.matcap)}function R(x,b){const L=t.get(b).light;x.referencePosition.value.setFromMatrixPosition(L.matrixWorld),x.nearDistance.value=L.shadow.camera.near,x.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function fR(r,t,i,s){let l={},c={},f=[];const p=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(L,F){const N=F.program;s.uniformBlockBinding(L,N)}function h(L,F){let N=l[L.id];N===void 0&&(E(L),N=_(L),l[L.id]=N,L.addEventListener("dispose",x));const H=F.program;s.updateUBOMapping(L,H);const z=t.render.frame;c[L.id]!==z&&(g(L),c[L.id]=z)}function _(L){const F=v();L.__bindingPointIndex=F;const N=r.createBuffer(),H=L.__size,z=L.usage;return r.bindBuffer(r.UNIFORM_BUFFER,N),r.bufferData(r.UNIFORM_BUFFER,H,z),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,F,N),N}function v(){for(let L=0;L<p;L++)if(f.indexOf(L)===-1)return f.push(L),L;return Ve("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(L){const F=l[L.id],N=L.uniforms,H=L.__cache;r.bindBuffer(r.UNIFORM_BUFFER,F);for(let z=0,I=N.length;z<I;z++){const T=Array.isArray(N[z])?N[z]:[N[z]];for(let O=0,mt=T.length;O<mt;O++){const V=T[O];if(M(V,z,O,H)===!0){const J=V.__offset,at=Array.isArray(V.value)?V.value:[V.value];let st=0;for(let et=0;et<at.length;et++){const P=at[et],G=R(P);typeof P=="number"||typeof P=="boolean"?(V.__data[0]=P,r.bufferSubData(r.UNIFORM_BUFFER,J+st,V.__data)):P.isMatrix3?(V.__data[0]=P.elements[0],V.__data[1]=P.elements[1],V.__data[2]=P.elements[2],V.__data[3]=0,V.__data[4]=P.elements[3],V.__data[5]=P.elements[4],V.__data[6]=P.elements[5],V.__data[7]=0,V.__data[8]=P.elements[6],V.__data[9]=P.elements[7],V.__data[10]=P.elements[8],V.__data[11]=0):(P.toArray(V.__data,st),st+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,J,V.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(L,F,N,H){const z=L.value,I=F+"_"+N;if(H[I]===void 0)return typeof z=="number"||typeof z=="boolean"?H[I]=z:H[I]=z.clone(),!0;{const T=H[I];if(typeof z=="number"||typeof z=="boolean"){if(T!==z)return H[I]=z,!0}else if(T.equals(z)===!1)return T.copy(z),!0}return!1}function E(L){const F=L.uniforms;let N=0;const H=16;for(let I=0,T=F.length;I<T;I++){const O=Array.isArray(F[I])?F[I]:[F[I]];for(let mt=0,V=O.length;mt<V;mt++){const J=O[mt],at=Array.isArray(J.value)?J.value:[J.value];for(let st=0,et=at.length;st<et;st++){const P=at[st],G=R(P),Y=N%H,ot=Y%G.boundary,yt=Y+ot;N+=ot,yt!==0&&H-yt<G.storage&&(N+=H-yt),J.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=N,N+=G.storage}}}const z=N%H;return z>0&&(N+=H-z),L.__size=N,L.__cache={},this}function R(L){const F={boundary:0,storage:0};return typeof L=="number"||typeof L=="boolean"?(F.boundary=4,F.storage=4):L.isVector2?(F.boundary=8,F.storage=8):L.isVector3||L.isColor?(F.boundary=16,F.storage=12):L.isVector4?(F.boundary=16,F.storage=16):L.isMatrix3?(F.boundary=48,F.storage=48):L.isMatrix4?(F.boundary=64,F.storage=64):L.isTexture?ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ge("WebGLRenderer: Unsupported uniform value type.",L),F}function x(L){const F=L.target;F.removeEventListener("dispose",x);const N=f.indexOf(F.__bindingPointIndex);f.splice(N,1),r.deleteBuffer(l[F.id]),delete l[F.id],delete c[F.id]}function b(){for(const L in l)r.deleteBuffer(l[L]);f=[],l={},c={}}return{bind:m,update:h,dispose:b}}const dR=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let da=null;function hR(){return da===null&&(da=new Jb(dR,16,16,yo,Qa),da.name="DFG_LUT",da.minFilter=Jn,da.magFilter=Jn,da.wrapS=qa,da.wrapT=qa,da.generateMipmaps=!1,da.needsUpdate=!0),da}class pR{constructor(t={}){const{canvas:i=pb(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:p=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:h=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:g=!1,outputBufferType:M=ki}=t;this.isWebGLRenderer=!0;let E;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=s.getContextAttributes().alpha}else E=f;const R=M,x=new Set([Ip,Pp,Op]),b=new Set([ki,xa,Al,Cl,Lp,Up]),L=new Uint32Array(4),F=new Int32Array(4);let N=null,H=null;const z=[],I=[];let T=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_a,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const O=this;let mt=!1;this._outputColorSpace=Gi;let V=0,J=0,at=null,st=-1,et=null;const P=new bn,G=new bn;let Y=null;const ot=new ze(0);let yt=0,B=i.width,W=i.height,dt=1,Dt=null,zt=null;const Q=new bn(0,0,B,W),Et=new bn(0,0,B,W);let Mt=!1;const Wt=new wx;let Ut=!1,re=!1;const ye=new pn,Rt=new it,Lt=new bn,ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qt=!1;function he(){return at===null?dt:1}let k=s;function Ae(C,X){return i.getContext(C,X)}try{const C={alpha:!0,depth:l,stencil:c,antialias:p,premultipliedAlpha:m,preserveDrawingBuffer:h,powerPreference:_,failIfMajorPerformanceCaveat:v};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Dp}`),i.addEventListener("webglcontextlost",Qt,!1),i.addEventListener("webglcontextrestored",fe,!1),i.addEventListener("webglcontextcreationerror",He,!1),k===null){const X="webgl2";if(k=Ae(X,C),k===null)throw Ae(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw Ve("WebGLRenderer: "+C.message),C}let oe,le,Gt,U,A,q,lt,vt,ht,kt,Pt,te,ie,Tt,wt,jt,Ft,Xt,_e,Z,Ot,It,Kt;function Nt(){oe=new pA(k),oe.init(),Ot=new aR(k,oe),le=new rA(k,oe,t,Ot),Gt=new nR(k,oe),le.reversedDepthBuffer&&g&&Gt.buffers.depth.setReversed(!0),U=new _A(k),A=new VC,q=new iR(k,oe,Gt,A,le,Ot,U),lt=new hA(O),vt=new ME(k),It=new aA(k,vt),ht=new mA(k,vt,U,It),kt=new xA(k,ht,vt,It,U),Xt=new vA(k,le,q),wt=new oA(A),Pt=new GC(O,lt,oe,le,It,wt),te=new uR(O,A),ie=new jC,Tt=new KC(oe),Ft=new iA(O,lt,Gt,kt,E,m),jt=new eR(O,kt,le),Kt=new fR(k,U,le,Gt),_e=new sA(k,oe,U),Z=new gA(k,oe,U),U.programs=Pt.programs,O.capabilities=le,O.extensions=oe,O.properties=A,O.renderLists=ie,O.shadowMap=jt,O.state=Gt,O.info=U}Nt(),R!==ki&&(T=new SA(R,i.width,i.height,l,c));const xt=new lR(O,k);this.xr=xt,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const C=oe.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=oe.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return dt},this.setPixelRatio=function(C){C!==void 0&&(dt=C,this.setSize(B,W,!1))},this.getSize=function(C){return C.set(B,W)},this.setSize=function(C,X,gt=!0){if(xt.isPresenting){ge("WebGLRenderer: Can't change size while VR device is presenting.");return}B=C,W=X,i.width=Math.floor(C*dt),i.height=Math.floor(X*dt),gt===!0&&(i.style.width=C+"px",i.style.height=X+"px"),T!==null&&T.setSize(i.width,i.height),this.setViewport(0,0,C,X)},this.getDrawingBufferSize=function(C){return C.set(B*dt,W*dt).floor()},this.setDrawingBufferSize=function(C,X,gt){B=C,W=X,dt=gt,i.width=Math.floor(C*gt),i.height=Math.floor(X*gt),this.setViewport(0,0,C,X)},this.setEffects=function(C){if(R===ki){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let X=0;X<C.length;X++)if(C[X].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(P)},this.getViewport=function(C){return C.copy(Q)},this.setViewport=function(C,X,gt,ft){C.isVector4?Q.set(C.x,C.y,C.z,C.w):Q.set(C,X,gt,ft),Gt.viewport(P.copy(Q).multiplyScalar(dt).round())},this.getScissor=function(C){return C.copy(Et)},this.setScissor=function(C,X,gt,ft){C.isVector4?Et.set(C.x,C.y,C.z,C.w):Et.set(C,X,gt,ft),Gt.scissor(G.copy(Et).multiplyScalar(dt).round())},this.getScissorTest=function(){return Mt},this.setScissorTest=function(C){Gt.setScissorTest(Mt=C)},this.setOpaqueSort=function(C){Dt=C},this.setTransparentSort=function(C){zt=C},this.getClearColor=function(C){return C.copy(Ft.getClearColor())},this.setClearColor=function(){Ft.setClearColor(...arguments)},this.getClearAlpha=function(){return Ft.getClearAlpha()},this.setClearAlpha=function(){Ft.setClearAlpha(...arguments)},this.clear=function(C=!0,X=!0,gt=!0){let ft=0;if(C){let rt=!1;if(at!==null){const Vt=at.texture.format;rt=x.has(Vt)}if(rt){const Vt=at.texture.type,Jt=b.has(Vt),Ht=Ft.getClearColor(),$t=Ft.getClearAlpha(),Yt=Ht.r,pe=Ht.g,xe=Ht.b;Jt?(L[0]=Yt,L[1]=pe,L[2]=xe,L[3]=$t,k.clearBufferuiv(k.COLOR,0,L)):(F[0]=Yt,F[1]=pe,F[2]=xe,F[3]=$t,k.clearBufferiv(k.COLOR,0,F))}else ft|=k.COLOR_BUFFER_BIT}X&&(ft|=k.DEPTH_BUFFER_BIT),gt&&(ft|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ft!==0&&k.clear(ft)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",Qt,!1),i.removeEventListener("webglcontextrestored",fe,!1),i.removeEventListener("webglcontextcreationerror",He,!1),Ft.dispose(),ie.dispose(),Tt.dispose(),A.dispose(),lt.dispose(),kt.dispose(),It.dispose(),Kt.dispose(),Pt.dispose(),xt.dispose(),xt.removeEventListener("sessionstart",Ge),xt.removeEventListener("sessionend",ba),fn.stop()};function Qt(C){C.preventDefault(),k0("WebGLRenderer: Context Lost."),mt=!0}function fe(){k0("WebGLRenderer: Context Restored."),mt=!1;const C=U.autoReset,X=jt.enabled,gt=jt.autoUpdate,ft=jt.needsUpdate,rt=jt.type;Nt(),U.autoReset=C,jt.enabled=X,jt.autoUpdate=gt,jt.needsUpdate=ft,jt.type=rt}function He(C){Ve("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function we(C){const X=C.target;X.removeEventListener("dispose",we),Fn(X)}function Fn(C){li(C),A.remove(C)}function li(C){const X=A.get(C).programs;X!==void 0&&(X.forEach(function(gt){Pt.releaseProgram(gt)}),C.isShaderMaterial&&Pt.releaseShaderCache(C))}this.renderBufferDirect=function(C,X,gt,ft,rt,Vt){X===null&&(X=ae);const Jt=rt.isMesh&&rt.matrixWorld.determinant()<0,Ht=qe(C,X,gt,ft,rt);Gt.setMaterial(ft,Jt);let $t=gt.index,Yt=1;if(ft.wireframe===!0){if($t=ht.getWireframeAttribute(gt),$t===void 0)return;Yt=2}const pe=gt.drawRange,xe=gt.attributes.position;let ee=pe.start*Yt,Me=(pe.start+pe.count)*Yt;Vt!==null&&(ee=Math.max(ee,Vt.start*Yt),Me=Math.min(Me,(Vt.start+Vt.count)*Yt)),$t!==null?(ee=Math.max(ee,0),Me=Math.min(Me,$t.count)):xe!=null&&(ee=Math.max(ee,0),Me=Math.min(Me,xe.count));const tn=Me-ee;if(tn<0||tn===1/0)return;It.setup(rt,ft,Ht,gt,$t);let en,Be=_e;if($t!==null&&(en=vt.get($t),Be=Z,Be.setIndex(en)),rt.isMesh)ft.wireframe===!0?(Gt.setLineWidth(ft.wireframeLinewidth*he()),Be.setMode(k.LINES)):Be.setMode(k.TRIANGLES);else if(rt.isLine){let hn=ft.linewidth;hn===void 0&&(hn=1),Gt.setLineWidth(hn*he()),rt.isLineSegments?Be.setMode(k.LINES):rt.isLineLoop?Be.setMode(k.LINE_LOOP):Be.setMode(k.LINE_STRIP)}else rt.isPoints?Be.setMode(k.POINTS):rt.isSprite&&Be.setMode(k.TRIANGLES);if(rt.isBatchedMesh)if(rt._multiDrawInstances!==null)wu("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Be.renderMultiDrawInstances(rt._multiDrawStarts,rt._multiDrawCounts,rt._multiDrawCount,rt._multiDrawInstances);else if(oe.get("WEBGL_multi_draw"))Be.renderMultiDraw(rt._multiDrawStarts,rt._multiDrawCounts,rt._multiDrawCount);else{const hn=rt._multiDrawStarts,ne=rt._multiDrawCounts,yn=rt._multiDrawCount,me=$t?vt.get($t).bytesPerElement:1,On=A.get(ft).currentProgram.getUniforms();for(let Wn=0;Wn<yn;Wn++)On.setValue(k,"_gl_DrawID",Wn),Be.render(hn[Wn]/me,ne[Wn])}else if(rt.isInstancedMesh)Be.renderInstances(ee,tn,rt.count);else if(gt.isInstancedBufferGeometry){const hn=gt._maxInstanceCount!==void 0?gt._maxInstanceCount:1/0,ne=Math.min(gt.instanceCount,hn);Be.renderInstances(ee,tn,ne)}else Be.render(ee,tn)};function ts(C,X,gt){C.transparent===!0&&C.side===Wa&&C.forceSinglePass===!1?(C.side=vi,C.needsUpdate=!0,Yn(C,X,gt),C.side=Is,C.needsUpdate=!0,Yn(C,X,gt),C.side=Wa):Yn(C,X,gt)}this.compile=function(C,X,gt=null){gt===null&&(gt=C),H=Tt.get(gt),H.init(X),I.push(H),gt.traverseVisible(function(rt){rt.isLight&&rt.layers.test(X.layers)&&(H.pushLight(rt),rt.castShadow&&H.pushShadow(rt))}),C!==gt&&C.traverseVisible(function(rt){rt.isLight&&rt.layers.test(X.layers)&&(H.pushLight(rt),rt.castShadow&&H.pushShadow(rt))}),H.setupLights();const ft=new Set;return C.traverse(function(rt){if(!(rt.isMesh||rt.isPoints||rt.isLine||rt.isSprite))return;const Vt=rt.material;if(Vt)if(Array.isArray(Vt))for(let Jt=0;Jt<Vt.length;Jt++){const Ht=Vt[Jt];ts(Ht,gt,rt),ft.add(Ht)}else ts(Vt,gt,rt),ft.add(Vt)}),H=I.pop(),ft},this.compileAsync=function(C,X,gt=null){const ft=this.compile(C,X,gt);return new Promise(rt=>{function Vt(){if(ft.forEach(function(Jt){A.get(Jt).currentProgram.isReady()&&ft.delete(Jt)}),ft.size===0){rt(C);return}setTimeout(Vt,10)}oe.get("KHR_parallel_shader_compile")!==null?Vt():setTimeout(Vt,10)})};let Ma=null;function pr(C){Ma&&Ma(C)}function Ge(){fn.stop()}function ba(){fn.start()}const fn=new Px;fn.setAnimationLoop(pr),typeof self<"u"&&fn.setContext(self),this.setAnimationLoop=function(C){Ma=C,xt.setAnimationLoop(C),C===null?fn.stop():fn.start()},xt.addEventListener("sessionstart",Ge),xt.addEventListener("sessionend",ba),this.render=function(C,X){if(X!==void 0&&X.isCamera!==!0){Ve("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(mt===!0)return;const gt=xt.enabled===!0&&xt.isPresenting===!0,ft=T!==null&&(at===null||gt)&&T.begin(O,at);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),xt.enabled===!0&&xt.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(xt.cameraAutoUpdate===!0&&xt.updateCamera(X),X=xt.getCamera()),C.isScene===!0&&C.onBeforeRender(O,C,X,at),H=Tt.get(C,I.length),H.init(X),I.push(H),ye.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Wt.setFromProjectionMatrix(ye,ga,X.reversedDepth),re=this.localClippingEnabled,Ut=wt.init(this.clippingPlanes,re),N=ie.get(C,z.length),N.init(),z.push(N),xt.enabled===!0&&xt.isPresenting===!0){const Jt=O.xr.getDepthSensingMesh();Jt!==null&&Ea(Jt,X,-1/0,O.sortObjects)}Ea(C,X,0,O.sortObjects),N.finish(),O.sortObjects===!0&&N.sort(Dt,zt),qt=xt.enabled===!1||xt.isPresenting===!1||xt.hasDepthSensing()===!1,qt&&Ft.addToRenderList(N,C),this.info.render.frame++,Ut===!0&&wt.beginShadows();const rt=H.state.shadowsArray;if(jt.render(rt,C,X),Ut===!0&&wt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(ft&&T.hasRenderPass())===!1){const Jt=N.opaque,Ht=N.transmissive;if(H.setupLights(),X.isArrayCamera){const $t=X.cameras;if(Ht.length>0)for(let Yt=0,pe=$t.length;Yt<pe;Yt++){const xe=$t[Yt];$e(Jt,Ht,C,xe)}qt&&Ft.render(C);for(let Yt=0,pe=$t.length;Yt<pe;Yt++){const xe=$t[Yt];Xn(N,C,xe,xe.viewport)}}else Ht.length>0&&$e(Jt,Ht,C,X),qt&&Ft.render(C),Xn(N,C,X)}at!==null&&J===0&&(q.updateMultisampleRenderTarget(at),q.updateRenderTargetMipmap(at)),ft&&T.end(O),C.isScene===!0&&C.onAfterRender(O,C,X),It.resetDefaultState(),st=-1,et=null,I.pop(),I.length>0?(H=I[I.length-1],Ut===!0&&wt.setGlobalState(O.clippingPlanes,H.state.camera)):H=null,z.pop(),z.length>0?N=z[z.length-1]:N=null};function Ea(C,X,gt,ft){if(C.visible===!1)return;if(C.layers.test(X.layers)){if(C.isGroup)gt=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(X);else if(C.isLight)H.pushLight(C),C.castShadow&&H.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Wt.intersectsSprite(C)){ft&&Lt.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ye);const Jt=kt.update(C),Ht=C.material;Ht.visible&&N.push(C,Jt,Ht,gt,Lt.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Wt.intersectsObject(C))){const Jt=kt.update(C),Ht=C.material;if(ft&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Lt.copy(C.boundingSphere.center)):(Jt.boundingSphere===null&&Jt.computeBoundingSphere(),Lt.copy(Jt.boundingSphere.center)),Lt.applyMatrix4(C.matrixWorld).applyMatrix4(ye)),Array.isArray(Ht)){const $t=Jt.groups;for(let Yt=0,pe=$t.length;Yt<pe;Yt++){const xe=$t[Yt],ee=Ht[xe.materialIndex];ee&&ee.visible&&N.push(C,Jt,ee,gt,Lt.z,xe)}}else Ht.visible&&N.push(C,Jt,Ht,gt,Lt.z,null)}}const Vt=C.children;for(let Jt=0,Ht=Vt.length;Jt<Ht;Jt++)Ea(Vt[Jt],X,gt,ft)}function Xn(C,X,gt,ft){const{opaque:rt,transmissive:Vt,transparent:Jt}=C;H.setupLightsView(gt),Ut===!0&&wt.setGlobalState(O.clippingPlanes,gt),ft&&Gt.viewport(P.copy(ft)),rt.length>0&&Fe(rt,X,gt),Vt.length>0&&Fe(Vt,X,gt),Jt.length>0&&Fe(Jt,X,gt),Gt.buffers.depth.setTest(!0),Gt.buffers.depth.setMask(!0),Gt.buffers.color.setMask(!0),Gt.setPolygonOffset(!1)}function $e(C,X,gt,ft){if((gt.isScene===!0?gt.overrideMaterial:null)!==null)return;if(H.state.transmissionRenderTarget[ft.id]===void 0){const ee=oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float");H.state.transmissionRenderTarget[ft.id]=new va(1,1,{generateMipmaps:!0,type:ee?Qa:ki,minFilter:lr,samples:Math.max(4,le.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ke.workingColorSpace})}const Vt=H.state.transmissionRenderTarget[ft.id],Jt=ft.viewport||P;Vt.setSize(Jt.z*O.transmissionResolutionScale,Jt.w*O.transmissionResolutionScale);const Ht=O.getRenderTarget(),$t=O.getActiveCubeFace(),Yt=O.getActiveMipmapLevel();O.setRenderTarget(Vt),O.getClearColor(ot),yt=O.getClearAlpha(),yt<1&&O.setClearColor(16777215,.5),O.clear(),qt&&Ft.render(gt);const pe=O.toneMapping;O.toneMapping=_a;const xe=ft.viewport;if(ft.viewport!==void 0&&(ft.viewport=void 0),H.setupLightsView(ft),Ut===!0&&wt.setGlobalState(O.clippingPlanes,ft),Fe(C,gt,ft),q.updateMultisampleRenderTarget(Vt),q.updateRenderTargetMipmap(Vt),oe.has("WEBGL_multisampled_render_to_texture")===!1){let ee=!1;for(let Me=0,tn=X.length;Me<tn;Me++){const en=X[Me],{object:Be,geometry:hn,material:ne,group:yn}=en;if(ne.side===Wa&&Be.layers.test(ft.layers)){const me=ne.side;ne.side=vi,ne.needsUpdate=!0,xn(Be,gt,ft,hn,ne,yn),ne.side=me,ne.needsUpdate=!0,ee=!0}}ee===!0&&(q.updateMultisampleRenderTarget(Vt),q.updateRenderTargetMipmap(Vt))}O.setRenderTarget(Ht,$t,Yt),O.setClearColor(ot,yt),xe!==void 0&&(ft.viewport=xe),O.toneMapping=pe}function Fe(C,X,gt){const ft=X.isScene===!0?X.overrideMaterial:null;for(let rt=0,Vt=C.length;rt<Vt;rt++){const Jt=C[rt],{object:Ht,geometry:$t,group:Yt}=Jt;let pe=Jt.material;pe.allowOverride===!0&&ft!==null&&(pe=ft),Ht.layers.test(gt.layers)&&xn(Ht,X,gt,$t,pe,Yt)}}function xn(C,X,gt,ft,rt,Vt){C.onBeforeRender(O,X,gt,ft,rt,Vt),C.modelViewMatrix.multiplyMatrices(gt.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),rt.onBeforeRender(O,X,gt,ft,C,Vt),rt.transparent===!0&&rt.side===Wa&&rt.forceSinglePass===!1?(rt.side=vi,rt.needsUpdate=!0,O.renderBufferDirect(gt,X,ft,rt,C,Vt),rt.side=Is,rt.needsUpdate=!0,O.renderBufferDirect(gt,X,ft,rt,C,Vt),rt.side=Wa):O.renderBufferDirect(gt,X,ft,rt,C,Vt),C.onAfterRender(O,X,gt,ft,rt,Vt)}function Yn(C,X,gt){X.isScene!==!0&&(X=ae);const ft=A.get(C),rt=H.state.lights,Vt=H.state.shadowsArray,Jt=rt.state.version,Ht=Pt.getParameters(C,rt.state,Vt,X,gt),$t=Pt.getProgramCacheKey(Ht);let Yt=ft.programs;ft.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?X.environment:null,ft.fog=X.fog;const pe=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;ft.envMap=lt.get(C.envMap||ft.environment,pe),ft.envMapRotation=ft.environment!==null&&C.envMap===null?X.environmentRotation:C.envMapRotation,Yt===void 0&&(C.addEventListener("dispose",we),Yt=new Map,ft.programs=Yt);let xe=Yt.get($t);if(xe!==void 0){if(ft.currentProgram===xe&&ft.lightsStateVersion===Jt)return mr(C,Ht),xe}else Ht.uniforms=Pt.getUniforms(C),C.onBeforeCompile(Ht,O),xe=Pt.acquireProgram(Ht,$t),Yt.set($t,xe),ft.uniforms=Ht.uniforms;const ee=ft.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(ee.clippingPlanes=wt.uniform),mr(C,Ht),ft.needsLights=es(C),ft.lightsStateVersion=Jt,ft.needsLights&&(ee.ambientLightColor.value=rt.state.ambient,ee.lightProbe.value=rt.state.probe,ee.directionalLights.value=rt.state.directional,ee.directionalLightShadows.value=rt.state.directionalShadow,ee.spotLights.value=rt.state.spot,ee.spotLightShadows.value=rt.state.spotShadow,ee.rectAreaLights.value=rt.state.rectArea,ee.ltc_1.value=rt.state.rectAreaLTC1,ee.ltc_2.value=rt.state.rectAreaLTC2,ee.pointLights.value=rt.state.point,ee.pointLightShadows.value=rt.state.pointShadow,ee.hemisphereLights.value=rt.state.hemi,ee.directionalShadowMatrix.value=rt.state.directionalShadowMatrix,ee.spotLightMatrix.value=rt.state.spotLightMatrix,ee.spotLightMap.value=rt.state.spotLightMap,ee.pointShadowMatrix.value=rt.state.pointShadowMatrix),ft.currentProgram=xe,ft.uniformsList=null,xe}function dn(C){if(C.uniformsList===null){const X=C.currentProgram.getUniforms();C.uniformsList=Eu.seqWithValue(X.seq,C.uniforms)}return C.uniformsList}function mr(C,X){const gt=A.get(C);gt.outputColorSpace=X.outputColorSpace,gt.batching=X.batching,gt.batchingColor=X.batchingColor,gt.instancing=X.instancing,gt.instancingColor=X.instancingColor,gt.instancingMorph=X.instancingMorph,gt.skinning=X.skinning,gt.morphTargets=X.morphTargets,gt.morphNormals=X.morphNormals,gt.morphColors=X.morphColors,gt.morphTargetsCount=X.morphTargetsCount,gt.numClippingPlanes=X.numClippingPlanes,gt.numIntersection=X.numClipIntersection,gt.vertexAlphas=X.vertexAlphas,gt.vertexTangents=X.vertexTangents,gt.toneMapping=X.toneMapping}function qe(C,X,gt,ft,rt){X.isScene!==!0&&(X=ae),q.resetTextureUnits();const Vt=X.fog,Jt=ft.isMeshStandardMaterial||ft.isMeshLambertMaterial||ft.isMeshPhongMaterial?X.environment:null,Ht=at===null?O.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:So,$t=ft.isMeshStandardMaterial||ft.isMeshLambertMaterial&&!ft.envMap||ft.isMeshPhongMaterial&&!ft.envMap,Yt=lt.get(ft.envMap||Jt,$t),pe=ft.vertexColors===!0&&!!gt.attributes.color&&gt.attributes.color.itemSize===4,xe=!!gt.attributes.tangent&&(!!ft.normalMap||ft.anisotropy>0),ee=!!gt.morphAttributes.position,Me=!!gt.morphAttributes.normal,tn=!!gt.morphAttributes.color;let en=_a;ft.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(en=O.toneMapping);const Be=gt.morphAttributes.position||gt.morphAttributes.normal||gt.morphAttributes.color,hn=Be!==void 0?Be.length:0,ne=A.get(ft),yn=H.state.lights;if(Ut===!0&&(re===!0||C!==et)){const gn=C===et&&ft.id===st;wt.setState(ft,C,gn)}let me=!1;ft.version===ne.__version?(ne.needsLights&&ne.lightsStateVersion!==yn.state.version||ne.outputColorSpace!==Ht||rt.isBatchedMesh&&ne.batching===!1||!rt.isBatchedMesh&&ne.batching===!0||rt.isBatchedMesh&&ne.batchingColor===!0&&rt.colorTexture===null||rt.isBatchedMesh&&ne.batchingColor===!1&&rt.colorTexture!==null||rt.isInstancedMesh&&ne.instancing===!1||!rt.isInstancedMesh&&ne.instancing===!0||rt.isSkinnedMesh&&ne.skinning===!1||!rt.isSkinnedMesh&&ne.skinning===!0||rt.isInstancedMesh&&ne.instancingColor===!0&&rt.instanceColor===null||rt.isInstancedMesh&&ne.instancingColor===!1&&rt.instanceColor!==null||rt.isInstancedMesh&&ne.instancingMorph===!0&&rt.morphTexture===null||rt.isInstancedMesh&&ne.instancingMorph===!1&&rt.morphTexture!==null||ne.envMap!==Yt||ft.fog===!0&&ne.fog!==Vt||ne.numClippingPlanes!==void 0&&(ne.numClippingPlanes!==wt.numPlanes||ne.numIntersection!==wt.numIntersection)||ne.vertexAlphas!==pe||ne.vertexTangents!==xe||ne.morphTargets!==ee||ne.morphNormals!==Me||ne.morphColors!==tn||ne.toneMapping!==en||ne.morphTargetsCount!==hn)&&(me=!0):(me=!0,ne.__version=ft.version);let On=ne.currentProgram;me===!0&&(On=Yn(ft,X,rt));let Wn=!1,yi=!1,qn=!1;const je=On.getUniforms(),mn=ne.uniforms;if(Gt.useProgram(On.program)&&(Wn=!0,yi=!0,qn=!0),ft.id!==st&&(st=ft.id,yi=!0),Wn||et!==C){Gt.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),je.setValue(k,"projectionMatrix",C.projectionMatrix),je.setValue(k,"viewMatrix",C.matrixWorldInverse);const Si=je.map.cameraPosition;Si!==void 0&&Si.setValue(k,Rt.setFromMatrixPosition(C.matrixWorld)),le.logarithmicDepthBuffer&&je.setValue(k,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(ft.isMeshPhongMaterial||ft.isMeshToonMaterial||ft.isMeshLambertMaterial||ft.isMeshBasicMaterial||ft.isMeshStandardMaterial||ft.isShaderMaterial)&&je.setValue(k,"isOrthographic",C.isOrthographicCamera===!0),et!==C&&(et=C,yi=!0,qn=!0)}if(ne.needsLights&&(yn.state.directionalShadowMap.length>0&&je.setValue(k,"directionalShadowMap",yn.state.directionalShadowMap,q),yn.state.spotShadowMap.length>0&&je.setValue(k,"spotShadowMap",yn.state.spotShadowMap,q),yn.state.pointShadowMap.length>0&&je.setValue(k,"pointShadowMap",yn.state.pointShadowMap,q)),rt.isSkinnedMesh){je.setOptional(k,rt,"bindMatrix"),je.setOptional(k,rt,"bindMatrixInverse");const gn=rt.skeleton;gn&&(gn.boneTexture===null&&gn.computeBoneTexture(),je.setValue(k,"boneTexture",gn.boneTexture,q))}rt.isBatchedMesh&&(je.setOptional(k,rt,"batchingTexture"),je.setValue(k,"batchingTexture",rt._matricesTexture,q),je.setOptional(k,rt,"batchingIdTexture"),je.setValue(k,"batchingIdTexture",rt._indirectTexture,q),je.setOptional(k,rt,"batchingColorTexture"),rt._colorsTexture!==null&&je.setValue(k,"batchingColorTexture",rt._colorsTexture,q));const Bn=gt.morphAttributes;if((Bn.position!==void 0||Bn.normal!==void 0||Bn.color!==void 0)&&Xt.update(rt,gt,On),(yi||ne.receiveShadow!==rt.receiveShadow)&&(ne.receiveShadow=rt.receiveShadow,je.setValue(k,"receiveShadow",rt.receiveShadow)),(ft.isMeshStandardMaterial||ft.isMeshLambertMaterial||ft.isMeshPhongMaterial)&&ft.envMap===null&&X.environment!==null&&(mn.envMapIntensity.value=X.environmentIntensity),mn.dfgLUT!==void 0&&(mn.dfgLUT.value=hR()),yi&&(je.setValue(k,"toneMappingExposure",O.toneMappingExposure),ne.needsLights&&En(mn,qn),Vt&&ft.fog===!0&&te.refreshFogUniforms(mn,Vt),te.refreshMaterialUniforms(mn,ft,dt,W,H.state.transmissionRenderTarget[C.id]),Eu.upload(k,dn(ne),mn,q)),ft.isShaderMaterial&&ft.uniformsNeedUpdate===!0&&(Eu.upload(k,dn(ne),mn,q),ft.uniformsNeedUpdate=!1),ft.isSpriteMaterial&&je.setValue(k,"center",rt.center),je.setValue(k,"modelViewMatrix",rt.modelViewMatrix),je.setValue(k,"normalMatrix",rt.normalMatrix),je.setValue(k,"modelMatrix",rt.matrixWorld),ft.isShaderMaterial||ft.isRawShaderMaterial){const gn=ft.uniformsGroups;for(let Si=0,Wi=gn.length;Si<Wi;Si++){const ns=gn[Si];Kt.update(ns,On),Kt.bind(ns,On)}}return On}function En(C,X){C.ambientLightColor.needsUpdate=X,C.lightProbe.needsUpdate=X,C.directionalLights.needsUpdate=X,C.directionalLightShadows.needsUpdate=X,C.pointLights.needsUpdate=X,C.pointLightShadows.needsUpdate=X,C.spotLights.needsUpdate=X,C.spotLightShadows.needsUpdate=X,C.rectAreaLights.needsUpdate=X,C.hemisphereLights.needsUpdate=X}function es(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return J},this.getRenderTarget=function(){return at},this.setRenderTargetTextures=function(C,X,gt){const ft=A.get(C);ft.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,ft.__autoAllocateDepthBuffer===!1&&(ft.__useRenderToTexture=!1),A.get(C.texture).__webglTexture=X,A.get(C.depthTexture).__webglTexture=ft.__autoAllocateDepthBuffer?void 0:gt,ft.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,X){const gt=A.get(C);gt.__webglFramebuffer=X,gt.__useDefaultFramebuffer=X===void 0};const xi=k.createFramebuffer();this.setRenderTarget=function(C,X=0,gt=0){at=C,V=X,J=gt;let ft=null,rt=!1,Vt=!1;if(C){const Ht=A.get(C);if(Ht.__useDefaultFramebuffer!==void 0){Gt.bindFramebuffer(k.FRAMEBUFFER,Ht.__webglFramebuffer),P.copy(C.viewport),G.copy(C.scissor),Y=C.scissorTest,Gt.viewport(P),Gt.scissor(G),Gt.setScissorTest(Y),st=-1;return}else if(Ht.__webglFramebuffer===void 0)q.setupRenderTarget(C);else if(Ht.__hasExternalTextures)q.rebindTextures(C,A.get(C.texture).__webglTexture,A.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const pe=C.depthTexture;if(Ht.__boundDepthTexture!==pe){if(pe!==null&&A.has(pe)&&(C.width!==pe.image.width||C.height!==pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(C)}}const $t=C.texture;($t.isData3DTexture||$t.isDataArrayTexture||$t.isCompressedArrayTexture)&&(Vt=!0);const Yt=A.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Yt[X])?ft=Yt[X][gt]:ft=Yt[X],rt=!0):C.samples>0&&q.useMultisampledRTT(C)===!1?ft=A.get(C).__webglMultisampledFramebuffer:Array.isArray(Yt)?ft=Yt[gt]:ft=Yt,P.copy(C.viewport),G.copy(C.scissor),Y=C.scissorTest}else P.copy(Q).multiplyScalar(dt).floor(),G.copy(Et).multiplyScalar(dt).floor(),Y=Mt;if(gt!==0&&(ft=xi),Gt.bindFramebuffer(k.FRAMEBUFFER,ft)&&Gt.drawBuffers(C,ft),Gt.viewport(P),Gt.scissor(G),Gt.setScissorTest(Y),rt){const Ht=A.get(C.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ht.__webglTexture,gt)}else if(Vt){const Ht=X;for(let $t=0;$t<C.textures.length;$t++){const Yt=A.get(C.textures[$t]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+$t,Yt.__webglTexture,gt,Ht)}}else if(C!==null&&gt!==0){const Ht=A.get(C.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ht.__webglTexture,gt)}st=-1},this.readRenderTargetPixels=function(C,X,gt,ft,rt,Vt,Jt,Ht=0){if(!(C&&C.isWebGLRenderTarget)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let $t=A.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Jt!==void 0&&($t=$t[Jt]),$t){Gt.bindFramebuffer(k.FRAMEBUFFER,$t);try{const Yt=C.textures[Ht],pe=Yt.format,xe=Yt.type;if(C.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Ht),!le.textureFormatReadable(pe)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!le.textureTypeReadable(xe)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=C.width-ft&&gt>=0&&gt<=C.height-rt&&k.readPixels(X,gt,ft,rt,Ot.convert(pe),Ot.convert(xe),Vt)}finally{const Yt=at!==null?A.get(at).__webglFramebuffer:null;Gt.bindFramebuffer(k.FRAMEBUFFER,Yt)}}},this.readRenderTargetPixelsAsync=async function(C,X,gt,ft,rt,Vt,Jt,Ht=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let $t=A.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Jt!==void 0&&($t=$t[Jt]),$t)if(X>=0&&X<=C.width-ft&&gt>=0&&gt<=C.height-rt){Gt.bindFramebuffer(k.FRAMEBUFFER,$t);const Yt=C.textures[Ht],pe=Yt.format,xe=Yt.type;if(C.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Ht),!le.textureFormatReadable(pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!le.textureTypeReadable(xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ee=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,ee),k.bufferData(k.PIXEL_PACK_BUFFER,Vt.byteLength,k.STREAM_READ),k.readPixels(X,gt,ft,rt,Ot.convert(pe),Ot.convert(xe),0);const Me=at!==null?A.get(at).__webglFramebuffer:null;Gt.bindFramebuffer(k.FRAMEBUFFER,Me);const tn=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await mb(k,tn,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,ee),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Vt),k.deleteBuffer(ee),k.deleteSync(tn),Vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,X=null,gt=0){const ft=Math.pow(2,-gt),rt=Math.floor(C.image.width*ft),Vt=Math.floor(C.image.height*ft),Jt=X!==null?X.x:0,Ht=X!==null?X.y:0;q.setTexture2D(C,0),k.copyTexSubImage2D(k.TEXTURE_2D,gt,0,0,Jt,Ht,rt,Vt),Gt.unbindTexture()};const Yi=k.createFramebuffer(),Ta=k.createFramebuffer();this.copyTextureToTexture=function(C,X,gt=null,ft=null,rt=0,Vt=0){let Jt,Ht,$t,Yt,pe,xe,ee,Me,tn;const en=C.isCompressedTexture?C.mipmaps[Vt]:C.image;if(gt!==null)Jt=gt.max.x-gt.min.x,Ht=gt.max.y-gt.min.y,$t=gt.isBox3?gt.max.z-gt.min.z:1,Yt=gt.min.x,pe=gt.min.y,xe=gt.isBox3?gt.min.z:0;else{const mn=Math.pow(2,-rt);Jt=Math.floor(en.width*mn),Ht=Math.floor(en.height*mn),C.isDataArrayTexture?$t=en.depth:C.isData3DTexture?$t=Math.floor(en.depth*mn):$t=1,Yt=0,pe=0,xe=0}ft!==null?(ee=ft.x,Me=ft.y,tn=ft.z):(ee=0,Me=0,tn=0);const Be=Ot.convert(X.format),hn=Ot.convert(X.type);let ne;X.isData3DTexture?(q.setTexture3D(X,0),ne=k.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(q.setTexture2DArray(X,0),ne=k.TEXTURE_2D_ARRAY):(q.setTexture2D(X,0),ne=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,X.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,X.unpackAlignment);const yn=k.getParameter(k.UNPACK_ROW_LENGTH),me=k.getParameter(k.UNPACK_IMAGE_HEIGHT),On=k.getParameter(k.UNPACK_SKIP_PIXELS),Wn=k.getParameter(k.UNPACK_SKIP_ROWS),yi=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,en.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,en.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Yt),k.pixelStorei(k.UNPACK_SKIP_ROWS,pe),k.pixelStorei(k.UNPACK_SKIP_IMAGES,xe);const qn=C.isDataArrayTexture||C.isData3DTexture,je=X.isDataArrayTexture||X.isData3DTexture;if(C.isDepthTexture){const mn=A.get(C),Bn=A.get(X),gn=A.get(mn.__renderTarget),Si=A.get(Bn.__renderTarget);Gt.bindFramebuffer(k.READ_FRAMEBUFFER,gn.__webglFramebuffer),Gt.bindFramebuffer(k.DRAW_FRAMEBUFFER,Si.__webglFramebuffer);for(let Wi=0;Wi<$t;Wi++)qn&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,A.get(C).__webglTexture,rt,xe+Wi),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,A.get(X).__webglTexture,Vt,tn+Wi)),k.blitFramebuffer(Yt,pe,Jt,Ht,ee,Me,Jt,Ht,k.DEPTH_BUFFER_BIT,k.NEAREST);Gt.bindFramebuffer(k.READ_FRAMEBUFFER,null),Gt.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(rt!==0||C.isRenderTargetTexture||A.has(C)){const mn=A.get(C),Bn=A.get(X);Gt.bindFramebuffer(k.READ_FRAMEBUFFER,Yi),Gt.bindFramebuffer(k.DRAW_FRAMEBUFFER,Ta);for(let gn=0;gn<$t;gn++)qn?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,mn.__webglTexture,rt,xe+gn):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,mn.__webglTexture,rt),je?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Bn.__webglTexture,Vt,tn+gn):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Bn.__webglTexture,Vt),rt!==0?k.blitFramebuffer(Yt,pe,Jt,Ht,ee,Me,Jt,Ht,k.COLOR_BUFFER_BIT,k.NEAREST):je?k.copyTexSubImage3D(ne,Vt,ee,Me,tn+gn,Yt,pe,Jt,Ht):k.copyTexSubImage2D(ne,Vt,ee,Me,Yt,pe,Jt,Ht);Gt.bindFramebuffer(k.READ_FRAMEBUFFER,null),Gt.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else je?C.isDataTexture||C.isData3DTexture?k.texSubImage3D(ne,Vt,ee,Me,tn,Jt,Ht,$t,Be,hn,en.data):X.isCompressedArrayTexture?k.compressedTexSubImage3D(ne,Vt,ee,Me,tn,Jt,Ht,$t,Be,en.data):k.texSubImage3D(ne,Vt,ee,Me,tn,Jt,Ht,$t,Be,hn,en):C.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Vt,ee,Me,Jt,Ht,Be,hn,en.data):C.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Vt,ee,Me,en.width,en.height,Be,en.data):k.texSubImage2D(k.TEXTURE_2D,Vt,ee,Me,Jt,Ht,Be,hn,en);k.pixelStorei(k.UNPACK_ROW_LENGTH,yn),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,me),k.pixelStorei(k.UNPACK_SKIP_PIXELS,On),k.pixelStorei(k.UNPACK_SKIP_ROWS,Wn),k.pixelStorei(k.UNPACK_SKIP_IMAGES,yi),Vt===0&&X.generateMipmaps&&k.generateMipmap(ne),Gt.unbindTexture()},this.initRenderTarget=function(C){A.get(C).__webglFramebuffer===void 0&&q.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?q.setTextureCube(C,0):C.isData3DTexture?q.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?q.setTexture2DArray(C,0):q.setTexture2D(C,0),Gt.unbindTexture()},this.resetState=function(){V=0,J=0,at=null,Gt.reset(),It.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ga}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorSpace=ke._getDrawingBufferColorSpace(t),i.unpackColorSpace=ke._getUnpackColorSpace()}}const Hv={type:"change"},jp={type:"start"},Gx={type:"end"},hu=new Nl,Gv=new ia,mR=Math.cos(70*Ex.DEG2RAD),Nn=new it,gi=2*Math.PI,rn={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Th=1e-6;class gR extends yE{constructor(t,i=null){super(t,i),this.state=rn.NONE,this.target=new it,this.cursor=new it,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:pa.ROTATE,MIDDLE:pa.DOLLY,RIGHT:pa.PAN},this.touches={ONE:fo.ROTATE,TWO:fo.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new it,this._lastQuaternion=new zs,this._lastTargetPosition=new it,this._quat=new zs().setFromUnitVectors(t.up,new it(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new mv,this._sphericalDelta=new mv,this._scale=1,this._panOffset=new it,this._rotateStart=new Re,this._rotateEnd=new Re,this._rotateDelta=new Re,this._panStart=new Re,this._panEnd=new Re,this._panDelta=new Re,this._dollyStart=new Re,this._dollyEnd=new Re,this._dollyDelta=new Re,this._dollyDirection=new it,this._mouse=new Re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=vR.bind(this),this._onPointerDown=_R.bind(this),this._onPointerUp=xR.bind(this),this._onContextMenu=AR.bind(this),this._onMouseWheel=MR.bind(this),this._onKeyDown=bR.bind(this),this._onTouchStart=ER.bind(this),this._onTouchMove=TR.bind(this),this._onMouseDown=yR.bind(this),this._onMouseMove=SR.bind(this),this._interceptControlDown=CR.bind(this),this._interceptControlUp=RR.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Hv),this.update(),this.state=rn.NONE}pan(t,i){this._pan(t,i),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const i=this.object.position;Nn.copy(i).sub(this.target),Nn.applyQuaternion(this._quat),this._spherical.setFromVector3(Nn),this.autoRotate&&this.state===rn.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=gi:s>Math.PI&&(s-=gi),l<-Math.PI?l+=gi:l>Math.PI&&(l-=gi),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=f!=this._spherical.radius}if(Nn.setFromSpherical(this._spherical),Nn.applyQuaternion(this._quatInverse),i.copy(this.target).add(Nn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const p=Nn.length();f=this._clampDistance(p*this._scale);const m=p-f;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const p=new it(this._mouse.x,this._mouse.y,0);p.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const h=new it(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(p),this.object.updateMatrixWorld(),f=Nn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(hu.origin.copy(this.object.position),hu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(hu.direction))<mR?this.object.lookAt(this.target):(Gv.setFromNormalAndCoplanarPoint(this.object.up,this.target),hu.intersectPlane(Gv,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>Th||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Th||this._lastTargetPosition.distanceToSquared(this.target)>Th?(this.dispatchEvent(Hv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?gi/60*this.autoRotateSpeed*t:gi/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){Nn.setFromMatrixColumn(i,0),Nn.multiplyScalar(-t),this._panOffset.add(Nn)}_panUp(t,i){this.screenSpacePanning===!0?Nn.setFromMatrixColumn(i,1):(Nn.setFromMatrixColumn(i,0),Nn.crossVectors(this.object.up,Nn)),Nn.multiplyScalar(t),this._panOffset.add(Nn)}_pan(t,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;Nn.copy(l).sub(this.target);let c=Nn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=t-s.left,c=i-s.top,f=s.width,p=s.height;this._mouse.x=l/f*2-1,this._mouse.y=-(c/p)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(gi*this._rotateDelta.x/i.clientHeight),this._rotateUp(gi*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(gi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-gi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(gi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-gi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),l=.5*(t.pageX+s.x),c=.5*(t.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(gi*this._rotateDelta.x/i.clientHeight),this._rotateUp(gi*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(t.pageX+i.x)*.5,p=(t.pageY+i.y)*.5;this._updateZoomParameters(f,p)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new Re,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function _R(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function vR(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function xR(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Gx),this.state=rn.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function yR(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case pa.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=rn.DOLLY;break;case pa.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=rn.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=rn.ROTATE}break;case pa.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=rn.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=rn.PAN}break;default:this.state=rn.NONE}this.state!==rn.NONE&&this.dispatchEvent(jp)}function SR(r){switch(this.state){case rn.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case rn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case rn.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function MR(r){this.enabled===!1||this.enableZoom===!1||this.state!==rn.NONE||(r.preventDefault(),this.dispatchEvent(jp),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Gx))}function bR(r){this.enabled!==!1&&this._handleKeyDown(r)}function ER(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case fo.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=rn.TOUCH_ROTATE;break;case fo.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=rn.TOUCH_PAN;break;default:this.state=rn.NONE}break;case 2:switch(this.touches.TWO){case fo.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=rn.TOUCH_DOLLY_PAN;break;case fo.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=rn.TOUCH_DOLLY_ROTATE;break;default:this.state=rn.NONE}break;default:this.state=rn.NONE}this.state!==rn.NONE&&this.dispatchEvent(jp)}function TR(r){switch(this._trackPointer(r),this.state){case rn.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case rn.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case rn.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case rn.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=rn.NONE}}function AR(r){this.enabled!==!1&&r.preventDefault()}function CR(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function RR(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const wR=6e4,Vx=4,kx=120,Vv=28;function DR({points:r,boxes:t,classes:i,selectedIds:s,activeClass:l,onSelect:c,onMoveSelected:f,onRotateSelected:p,onCreateBox:m,onHoverWorldChange:h}){const _=nt.useRef(null),v=nt.useRef(null),g=nt.useRef(null),M=nt.useRef(null),E=nt.useRef({centerX:0,centerY:0,scale:10}),R=nt.useRef(null),[x,b]=nt.useState({width:0,height:0}),L=nt.useMemo(()=>new Map(i.map(T=>[T.name,T])),[i]),F=nt.useMemo(()=>LR(r,wR),[r]);nt.useEffect(()=>{const T=_.current;if(!T)return;const O=new ResizeObserver(mt=>{const V=mt[0];V&&b({width:Math.max(1,Math.floor(V.contentRect.width)),height:Math.max(1,Math.floor(V.contentRect.height))})});return O.observe(T),()=>O.disconnect()},[]),nt.useEffect(()=>{x.width<=0||x.height<=0||(E.current=kv(F,t,x.width,x.height),N())},[t,F,x.height,x.width]),nt.useEffect(()=>{N()},[l?.color,t,L,F,s,x.height,x.width]);const N=()=>{const T=v.current;if(!T||x.width<=0||x.height<=0)return;const O=window.devicePixelRatio||1,mt=Math.max(1,Math.floor(x.width*O)),V=Math.max(1,Math.floor(x.height*O));(T.width!==mt||T.height!==V)&&(T.width=mt,T.height=V);const J=T.getContext("2d");J&&(J.setTransform(O,0,0,O,0,0),J.clearRect(0,0,x.width,x.height),J.fillStyle="#080b10",J.fillRect(0,0,x.width,x.height),OR(J,x.width,x.height,E.current),PR(J,x.width,x.height,E.current),IR(J,F,E.current,x.width,x.height),zR(J,t,s,L,E.current,x.width,x.height))},H=T=>{E.current={...E.current,scale:Xx(E.current.scale*T,Vx,kx)},N()},z=()=>{E.current=kv(F,t,x.width,x.height),N()},I=(T,O)=>{const mt=v.current;if(!mt)return;const V=mt.getBoundingClientRect(),J=T-V.left,at=O-V.top,st=po(J,at,E.current,x.width,x.height),et=jv(r,st.x,st.y),P=et?[et.x,et.y,et.z]:[st.x,st.y,0];GR(R.current,P)||(R.current=P,h?.(P))};return nt.useEffect(()=>{const T=v.current;if(!T)return;const O=Y=>{g.current=null,Y!=null&&T.hasPointerCapture(Y)&&T.releasePointerCapture(Y),M.current=null,T.style.cursor="crosshair"},mt=Y=>{if(Y.button!==0)return;I(Y.clientX,Y.clientY);const ot=T.getBoundingClientRect(),yt=Y.clientX-ot.left,B=Y.clientY-ot.top,W=po(yt,B,E.current,x.width,x.height),dt=Xv(t,W.x,W.y);if(dt){Y.shiftKey?c(s.includes(dt)?s.filter(Dt=>Dt!==dt):[...s,dt]):(!s.includes(dt)||s.length!==1)&&c([dt]),g.current={kind:"box",startClientX:Y.clientX,startClientY:Y.clientY,lastClientX:Y.clientX,lastClientY:Y.clientY,moved:!1,hitBoxId:dt},M.current=Y.pointerId,T.setPointerCapture(Y.pointerId),T.style.cursor="move",Y.preventDefault();return}g.current={kind:"pan",startClientX:Y.clientX,startClientY:Y.clientY,lastClientX:Y.clientX,lastClientY:Y.clientY,moved:!1,hitBoxId:null},M.current=Y.pointerId,T.setPointerCapture(Y.pointerId),T.style.cursor="grabbing"},V=Y=>{I(Y.clientX,Y.clientY);const ot=g.current;if(!ot){const W=T.getBoundingClientRect(),dt=Y.clientX-W.left,Dt=Y.clientY-W.top,zt=po(dt,Dt,E.current,x.width,x.height);T.style.cursor=Xv(t,zt.x,zt.y)?"move":"crosshair";return}const yt=Y.clientX-ot.lastClientX,B=Y.clientY-ot.lastClientY;if((Math.abs(Y.clientX-ot.startClientX)>2||Math.abs(Y.clientY-ot.startClientY)>2)&&(ot.moved=!0),ot.lastClientX=Y.clientX,ot.lastClientY=Y.clientY,ot.kind==="box"){if(yt!==0||B!==0){const W=-B/E.current.scale,dt=yt/E.current.scale;f(W,dt)}return}E.current={...E.current,centerX:E.current.centerX+B/E.current.scale,centerY:E.current.centerY-yt/E.current.scale},N()},J=Y=>{if(M.current!=null&&M.current!==Y.pointerId)return;const ot=g.current;O(Y.pointerId),ot&&!ot.moved&&ot.kind==="pan"&&c([])},at=Y=>{M.current!=null&&M.current!==Y.pointerId||O(Y.pointerId)},st=()=>{O()},et=Y=>{const ot=T.getBoundingClientRect(),yt=Y.clientX-ot.left,B=Y.clientY-ot.top,W=po(yt,B,E.current,x.width,x.height),dt=jv(r,W.x,W.y);m(dt?[dt.x,dt.y,dt.z]:[W.x,W.y,0])},P=Y=>{if(Y.altKey&&s.length>0){Y.preventDefault(),p(Y.deltaY>0?.06:-.06);return}Y.preventDefault(),H(Y.deltaY>0?1/1.12:1.12)};T.addEventListener("pointerdown",mt),T.addEventListener("pointermove",V),window.addEventListener("pointerup",J),T.addEventListener("pointercancel",at),T.addEventListener("lostpointercapture",st),window.addEventListener("blur",st),T.addEventListener("dblclick",et),T.addEventListener("wheel",P,{passive:!1});const G=Y=>Y.preventDefault();return T.addEventListener("contextmenu",G),()=>{T.removeEventListener("pointerdown",mt),T.removeEventListener("pointermove",V),window.removeEventListener("pointerup",J),T.removeEventListener("pointercancel",at),T.removeEventListener("lostpointercapture",st),window.removeEventListener("blur",st),T.removeEventListener("dblclick",et),T.removeEventListener("wheel",P),T.removeEventListener("contextmenu",G),O()}},[t,m,h,f,p,c,r,s,x.height,x.width]),y.jsxs("div",{className:"frame-canvas",ref:_,children:[y.jsx("canvas",{ref:v,className:"frame-canvas__surface"}),y.jsxs("div",{className:"frame-canvas__toolbar",children:[y.jsx("button",{className:"ghost-button",onClick:()=>H(1.16),type:"button",children:"+"}),y.jsx("button",{className:"ghost-button",onClick:()=>H(1/1.16),type:"button",children:"-"}),y.jsx("button",{className:"ghost-button",onClick:z,type:"button",children:"Fit"}),y.jsx("button",{className:"ghost-button",onClick:z,type:"button",children:"Center"})]})]})}const NR=nt.memo(DR);function LR(r,t){if(r.length<=t)return r;const i=Math.max(1,Math.floor(r.length/t)),s=[];for(let l=0;l<r.length;l+=i)s.push(r[l]);return s}function kv(r,t,i,s){const l=UR(r,t),c=Math.max(l.maxX-l.minX,6),f=Math.max(l.maxY-l.minY,6),p=Xx(Math.min(Math.max(1,(s-Vv*2)/c),Math.max(1,(i-Vv*2)/f)),Vx,kx);return{centerX:(l.minX+l.maxX)*.5,centerY:(l.minY+l.maxY)*.5,scale:p}}function UR(r,t){let i=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY,l=Number.POSITIVE_INFINITY,c=Number.NEGATIVE_INFINITY;for(const f of r)i=Math.min(i,f.x),s=Math.max(s,f.x),l=Math.min(l,f.y),c=Math.max(c,f.y);for(const f of t)for(const p of jx(f))i=Math.min(i,p[0]),s=Math.max(s,p[0]),l=Math.min(l,p[1]),c=Math.max(c,p[1]);return!Number.isFinite(i)||!Number.isFinite(s)||!Number.isFinite(l)||!Number.isFinite(c)?{minX:-10,maxX:10,minY:-10,maxY:10}:{minX:i,maxX:s,minY:l,maxY:c}}function OR(r,t,i,s){const l=BR(s.scale),c=po(0,i,s,t,i),f=po(t,0,s,t,i);r.save(),r.strokeStyle="rgba(24, 34, 48, 0.9)",r.lineWidth=1;const p=Math.floor(c.y/l)*l;for(let h=p;h<=f.y;h+=l){const _=ur(s.centerX,h,s,t,i);r.beginPath(),r.moveTo(_.x,0),r.lineTo(_.x,i),r.stroke()}const m=Math.floor(c.x/l)*l;for(let h=m;h<=f.x;h+=l){const _=ur(h,s.centerY,s,t,i);r.beginPath(),r.moveTo(0,_.y),r.lineTo(t,_.y),r.stroke()}r.restore()}function PR(r,t,i,s){const l=ur(0,0,s,t,i);r.save(),r.lineWidth=1.4,r.strokeStyle="rgba(255, 90, 90, 0.88)",r.beginPath(),r.moveTo(l.x,l.y),r.lineTo(l.x,l.y-36),r.stroke(),r.strokeStyle="rgba(90, 170, 255, 0.88)",r.beginPath(),r.moveTo(l.x,l.y),r.lineTo(l.x+36,l.y),r.stroke(),r.restore()}function IR(r,t,i,s,l){const c=i.scale>=18?2.1:i.scale>=10?1.5:1.1;r.save(),r.fillStyle="#b8e7ff",r.globalAlpha=.9;for(const f of t){const p=ur(f.x,f.y,i,s,l);p.x<-2||p.y<-2||p.x>s+2||p.y>l+2||(r.beginPath(),r.arc(p.x,p.y,c,0,Math.PI*2),r.fill())}r.restore()}function zR(r,t,i,s,l,c,f){for(const p of t){const m=jx(p).map(([M,E])=>ur(M,E,l,c,f)),h=s.get(p.class_name)?.color??"#58a6ff",_=i.includes(p.box_id);r.save(),r.beginPath(),r.moveTo(m[0].x,m[0].y);for(let M=1;M<m.length;M+=1)r.lineTo(m[M].x,m[M].y);r.closePath(),r.fillStyle=HR(h,_?.22:.1),r.fill(),r.strokeStyle=_?"#ffffff":h,r.lineWidth=_?2.2:1.6,r.stroke();const v=ur(p.center_xyz[0]+Math.cos(p.yaw)*p.size_lwh[0]*.5,p.center_xyz[1]+Math.sin(p.yaw)*p.size_lwh[0]*.5,l,c,f),g=ur(p.center_xyz[0],p.center_xyz[1],l,c,f);r.beginPath(),r.moveTo(g.x,g.y),r.lineTo(v.x,v.y),r.strokeStyle=_?"#ffffff":h,r.stroke(),r.restore()}}function ur(r,t,i,s,l){return{x:s*.5+(t-i.centerY)*i.scale,y:l*.5-(r-i.centerX)*i.scale}}function po(r,t,i,s,l){return{x:i.centerX-(t-l*.5)/i.scale,y:i.centerY+(r-s*.5)/i.scale}}function jv(r,t,i){const s=[];let l=Number.POSITIVE_INFINITY;for(const h of r){const _=h.x-t,v=h.y-i,g=_*_+v*v;g<=1.5&&s.push(h),g<l&&(l=g)}if(l>1.5||s.length===0)return null;const c=s.map(h=>h.z).sort((h,_)=>h-_),f=c[Math.max(0,Math.floor((c.length-1)*.16))]??0;let p=null,m=Number.NEGATIVE_INFINITY;for(const h of s){const _=h.x-t,v=h.y-i,g=_*_+v*v,M=(h.z-f)*1.8-g*3.2;M>m&&(m=M,p=h)}return p}function Xv(r,t,i){for(let s=r.length-1;s>=0;s-=1)if(FR(t,i,r[s]))return r[s].box_id;return null}function FR(r,t,i){const s=r-i.center_xyz[0],l=t-i.center_xyz[1],c=Math.cos(-i.yaw),f=Math.sin(-i.yaw),p=s*c-l*f,m=s*f+l*c;return Math.abs(p)<=i.size_lwh[0]*.5&&Math.abs(m)<=i.size_lwh[1]*.5}function jx(r){const t=r.size_lwh[0]*.5,i=r.size_lwh[1]*.5,s=Math.cos(r.yaw),l=Math.sin(r.yaw);return[pu(r.center_xyz[0],r.center_xyz[1],t,i,s,l),pu(r.center_xyz[0],r.center_xyz[1],t,-i,s,l),pu(r.center_xyz[0],r.center_xyz[1],-t,-i,s,l),pu(r.center_xyz[0],r.center_xyz[1],-t,i,s,l)]}function pu(r,t,i,s,l,c){return[r+i*l-s*c,t+i*c+s*l]}function BR(r){const t=[.5,1,2,5,10,20,50];for(const i of t)if(i*r>=42)return i;return 100}function HR(r,t){const i=r.replace("#",""),s=i.length===3?i.split("").map(m=>`${m}${m}`).join(""):i,l=Number.parseInt(s,16),c=l>>16&255,f=l>>8&255,p=l&255;return`rgba(${c}, ${f}, ${p}, ${t})`}function GR(r,t){return!r||!t?r===t:Math.abs(r[0]-t[0])<.05&&Math.abs(r[1]-t[1])<.05&&Math.abs(r[2]-t[2])<.05}function Xx(r,t,i){return Math.min(i,Math.max(t,r))}const VR=[{id:"top",label:"俯视",xAxis:"y",yAxis:"x"},{id:"front",label:"前视",xAxis:"y",yAxis:"z"},{id:"side",label:"侧视",xAxis:"x",yAxis:"z"}],Ah=160,Ch=140;function kR({box:r,points:t}){const i=nt.useMemo(()=>XR(r,t),[r,t]);return y.jsxs("div",{className:"box-overlay",children:[y.jsxs("div",{className:"box-overlay__stats",children:[y.jsx("span",{className:"box-overlay__tag",children:r.class_name}),y.jsxs("span",{className:"box-overlay__tag box-overlay__tag--dim",children:[i.insideCount,"/",i.nearbyCount," pts"]}),y.jsxs("span",{className:"box-overlay__tag box-overlay__tag--dim",children:[r.size_lwh[0].toFixed(2),"×",r.size_lwh[1].toFixed(2),"×",r.size_lwh[2].toFixed(2)]})]}),y.jsx("div",{className:"box-overlay__views",children:VR.map(s=>y.jsx(jR,{preview:i,projection:s},s.id))})]})}function jR({preview:r,projection:t}){const i=nt.useRef(null);return nt.useEffect(()=>{const s=i.current;if(!s)return;const l=Math.min(window.devicePixelRatio||1,2),c=Math.floor(Ah*l),f=Math.floor(Ch*l);(s.width!==c||s.height!==f)&&(s.width=c,s.height=f);const p=s.getContext("2d");p&&(p.setTransform(l,0,0,l,0,0),YR(p,Ah,Ch,r,t))},[r,t]),y.jsxs("div",{className:"box-overlay__card",children:[y.jsx("canvas",{ref:i,style:{width:Ah,height:Ch}}),y.jsx("span",{className:"box-overlay__label",children:t.label})]})}function XR(r,t){if(!Number.isFinite(r.center_xyz[0])||r.size_lwh[0]<=0||r.size_lwh[1]<=0||r.size_lwh[2]<=0)return{nearbyCount:0,insideCount:0,points:[],halfExtents:{x:.1,y:.1,z:.1},drawExtents:{x:.3,y:.3,z:.3}};const i={x:r.size_lwh[0]*.5,y:r.size_lwh[1]*.5,z:r.size_lwh[2]*.5},s={x:Math.max(.25,r.size_lwh[0]*.4),y:Math.max(.25,r.size_lwh[1]*.5),z:Math.max(.15,r.size_lwh[2]*.5)},l=Math.cos(r.yaw),c=Math.sin(r.yaw),f=r.center_xyz[0],p=r.center_xyz[1],m=r.center_xyz[2],h=[];let _=0,v=0,g=1/0,M=-1/0;for(const b of t){const L=b.x-f,F=b.y-p,N=L*l+F*c,H=-L*c+F*l,z=b.z-m;if(Math.abs(N)>i.x+s.x||Math.abs(H)>i.y+s.y||Math.abs(z)>i.z+s.z)continue;const I=Math.abs(N)<=i.x&&Math.abs(H)<=i.y&&Math.abs(z)<=i.z;_++,I&&v++,g=Math.min(g,z),M=Math.max(M,z),h.push({x:N,y:H,z,inside:I,normZ:0,intensity:b.intensity})}const E=Math.max(1e-4,M-g);for(const b of h)b.normZ=Yx((b.z-g)/E,0,1);const R=Math.max(1,Math.ceil(h.length/12e3)),x=R===1?h:h.filter((b,L)=>L%R===0);return{nearbyCount:_,insideCount:v,points:x,halfExtents:i,drawExtents:{x:(i.x+s.x)*1.05,y:(i.y+s.y)*1.05,z:(i.z+s.z)*1.05}}}function YR(r,t,i,s,l){r.fillStyle="rgba(6, 10, 18, 0.88)",r.fillRect(0,0,t,i);const c=mu(s.drawExtents,l.xAxis),f=mu(s.drawExtents,l.yAxis),p=mu(s.halfExtents,l.xAxis),m=mu(s.halfExtents,l.yAxis),h=Rh(-p,-m,t,i,c,f),_=Rh(p,m,t,i,c,f),v=Math.min(h[0],_[0]),g=Math.min(h[1],_[1]),M=Math.abs(_[0]-h[0]),E=Math.abs(_[1]-h[1]);r.fillStyle="rgba(28, 185, 255, 0.06)",r.fillRect(v,g,M,E),r.strokeStyle="rgba(138, 228, 255, 0.5)",r.lineWidth=1,r.strokeRect(v,g,M,E);for(const R of s.points){const x=Yv(R,l.xAxis),b=Yv(R,l.yAxis),[L,F]=Rh(x,b,t,i,c,f),N=s.nearbyCount<=30?2.5:s.nearbyCount<=100?2:1.5;if(R.inside){const[H,z,I]=WR(R.normZ),T=.6+Yx(R.intensity/255,.25,1)*.4;r.fillStyle=`rgb(${H*T*255|0}, ${z*T*255|0}, ${I*T*255|0})`}else r.fillStyle="rgba(255, 100, 120, 0.7)";r.fillRect(L-N*.5,F-N*.5,N,N)}r.fillStyle="rgba(180, 200, 240, 0.6)",r.font="9px monospace",r.fillText(Wv(l.xAxis),t-12,i-4),r.fillText(Wv(l.yAxis),3,10)}function Rh(r,t,i,s,l,c){const p=i-16,m=s-16;return[8+(r+Math.max(.1,l))/(Math.max(.1,l)*2)*p,s-8-(t+Math.max(.1,c))/(Math.max(.1,c)*2)*m]}function Yv(r,t){return t==="x"?r.x:t==="y"?r.y:r.z}function mu(r,t){return t==="x"?r.x:t==="y"?r.y:r.z}function Wv(r){return r.toUpperCase()}function Yx(r,t,i){return Math.min(i,Math.max(t,r))}function WR(r){const t=[[.062,.046,.122],[.251,.072,.349],[.533,.103,.445],[.812,.251,.443],[.953,.553,.349],[.988,.886,.643]],i=r*(t.length-1),s=Math.floor(i),l=Math.min(t.length-1,s+1),c=i-s;return[t[s][0]*(1-c)+t[l][0]*c,t[s][1]*(1-c)+t[l][1]*c,t[s][2]*(1-c)+t[l][2]*c]}const qR=24e4,qv=.06,Zv=4,ZR=.24,KR=50,QR=2.6,JR=2.4,$R=1.05;function tw({mode:r,readOnly:t,points:i,boxes:s,classes:l,pendingClassChoice:c,selectedIds:f,activeClass:p,selectedBox:m,onChoosePendingClass:h,onDismissPendingClassChoice:_,onSelect:v,onMoveSelected:g,onRotateSelected:M,onCreateBox:E,onHoverWorldChange:R}){const x=nt.useRef(null),b=nt.useRef(null),L=nt.useRef(null),F=nt.useRef(null),N=nt.useRef(null),H=nt.useRef(null),z=nt.useRef(null),I=nt.useRef(null),T=nt.useRef(null),O=nt.useRef(null),mt=nt.useRef([]),V=nt.useRef(null),J=nt.useRef(new Map),at=nt.useRef(new dr),st=nt.useRef(!0),et=nt.useRef(null),P=nt.useRef(new _E),G=nt.useRef(new Re),Y=nt.useRef(null),ot=nt.useRef(null),yt=nt.useRef({time:0,point:null}),B=nt.useRef({width:0,height:0}),W=nt.useRef(r),dt=nt.useRef({readOnly:t,boxes:s,points:i,selectedIds:f,classMap:new Map(l.map(Rt=>[Rt.name,Rt])),activeClass:p,onSelect:v,onMoveSelected:g,onRotateSelected:M,onCreateBox:E,onChoosePendingClass:h,onDismissPendingClassChoice:_,onHoverWorldChange:R}),[Dt,zt]=nt.useState(null),Q=nt.useMemo(()=>new Map(l.map(Rt=>[Rt.name,Rt])),[l]),Et=180,Mt=Math.min(Math.max(l.length*44+64,140),320);nt.useEffect(()=>{W.current=r},[r]),nt.useEffect(()=>{dt.current={readOnly:t,boxes:s,points:i,selectedIds:f,classMap:Q,activeClass:p,onSelect:v,onMoveSelected:g,onRotateSelected:M,onCreateBox:E,onChoosePendingClass:h,onDismissPendingClassChoice:_,onHoverWorldChange:R}},[p,s,Q,h,E,_,R,g,M,v,i,t,f]);const Wt=nt.useCallback(()=>W.current==="view3d"?N.current:H.current,[]),Ut=nt.useCallback(()=>{st.current=!0},[]),re=nt.useCallback((Rt=!1)=>{const Lt=at.current,{width:ae,height:qt}=B.current;if(Lt.isEmpty()||ae<=0||qt<=0)return;const he=Lt.getCenter(new it),k=Lt.getSize(new it),Ae=z.current,oe=N.current,le=H.current;if(!(!Ae||!oe||!le)){if(W.current==="view3d"){const U=Math.max(k.x,k.y,k.z,8)/Math.tan(Ex.degToRad(oe.fov*.5))*1.08,A=Rt?new it(1.2,-1.25,.88).normalize():oe.position.clone().sub(Ae.target).normalize();oe.position.copy(he).addScaledVector(A,U),oe.near=.1,oe.far=Math.max(500,U*8),oe.up.set(0,0,1),oe.lookAt(he),oe.updateProjectionMatrix()}else{const Gt=ae/qt,U=Math.max(k.x,k.y,18)*.62;le.left=-U*Gt,le.right=U*Gt,le.top=U,le.bottom=-U,le.near=.1,le.far=Math.max(600,k.z+240),le.position.set(he.x,he.y,he.z+Math.max(k.z+100,140)),le.up.set(0,1,0),le.lookAt(he),le.updateProjectionMatrix()}Ae.target.copy(he),Ae.update(),Ut()}},[Ut]);nt.useEffect(()=>{const Rt=x.current,Lt=b.current;if(!Rt||!Lt)return;const ae=Tt=>{Tt.preventDefault(),zt("WebGL context lost")},qt=()=>{zt(null),Ut()},he=Tt=>{const wt="statusMessage"in Tt&&typeof Tt.statusMessage=="string"?Tt.statusMessage:"WebGL context creation failed";zt(wt)};Lt.addEventListener("webglcontextlost",ae),Lt.addEventListener("webglcontextrestored",qt),Lt.addEventListener("webglcontextcreationerror",he);let k;try{k=new pR({canvas:Lt,antialias:!1,alpha:!1,depth:!0,stencil:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"})}catch(Tt){return zt(Tt instanceof Error?Tt.message:String(Tt)),()=>{Lt.removeEventListener("webglcontextlost",ae),Lt.removeEventListener("webglcontextrestored",qt),Lt.removeEventListener("webglcontextcreationerror",he)}}const Ae=Math.min(window.devicePixelRatio||1,2);k.setPixelRatio(Ae),k.setClearColor(527120,1),k.sortObjects=!1,L.current=k,zt(null);const oe=new Yb;oe.background=new ze(527120),F.current=oe;const le=new Vi(55,1,.1,1200);le.up.set(0,0,1),le.position.set(26,-24,16),N.current=le;const Gt=new Lu(-50,50,50,-50,.1,1200);Gt.up.set(0,1,0),Gt.position.set(0,0,120),Gt.lookAt(0,0,0),H.current=Gt;const U=new gR(le,Lt);U.enableDamping=!1,U.dampingFactor=0,U.screenSpacePanning=!0,U.enableZoom=!0,U.enablePan=!0,U.enableRotate=!0,U.zoomSpeed=QR,U.rotateSpeed=$R,U.panSpeed=JR,U.target.set(0,0,0),z.current=U,U.addEventListener("change",Ut);const A=new pE(16777215,1);oe.add(A);const q=new vE(180,90,1581616,988962);q.rotation.x=Math.PI*.5;const lt=q.material;lt.transparent=!0,lt.opacity=.5,oe.add(q);const vt=new xE(4.5);oe.add(vt);const ht=new ho;oe.add(ht),V.current=ht;const kt=Tt=>{const wt=Tt[0];if(!wt)return;const jt=Math.max(1,Math.floor(wt.contentRect.width)),Ft=Math.max(1,Math.floor(wt.contentRect.height));B.current={width:jt,height:Ft},k.setSize(jt,Ft,!1),le.aspect=jt/Ft,le.updateProjectionMatrix();const Xt=jt/Ft;Gt.left!==-50*Xt&&(Gt.left=-50*Xt,Gt.right=50*Xt,Gt.updateProjectionMatrix()),Ut()},Pt=new ResizeObserver(kt);Pt.observe(Rt);let te=!0;const ie=()=>{if(!te)return;et.current=requestAnimationFrame(ie);const Tt=W.current==="view3d"?le:Gt;U.enableDamping&&U.enabled&&U.update(),st.current&&(st.current=!1,k.render(oe,Tt))};return et.current=requestAnimationFrame(ie),()=>{te=!1,et.current!=null&&cancelAnimationFrame(et.current),Pt.disconnect(),Lt.removeEventListener("webglcontextlost",ae),Lt.removeEventListener("webglcontextrestored",qt),Lt.removeEventListener("webglcontextcreationerror",he),U.removeEventListener("change",Ut),U.dispose(),Kv(I.current,T.current,O.current),V.current&&Qv(V.current),oe.clear(),k.dispose(),L.current=null,F.current=null,N.current=null,H.current=null,z.current=null,V.current=null}},[]),nt.useEffect(()=>{const Rt=z.current,Lt=N.current,ae=H.current;if(!Rt||!Lt||!ae)return;Rt.object=r==="view3d"?Lt:ae,Rt.enableRotate=r==="view3d",Rt.mouseButtons.LEFT=r==="view3d"?pa.ROTATE:pa.PAN,Rt.mouseButtons.MIDDLE=pa.DOLLY,Rt.mouseButtons.RIGHT=pa.PAN,Rt.update();const qt=O.current;qt&&(qt.size=r==="view3d"?qv:Zv,qt.sizeAttenuation=r==="view3d",qt.needsUpdate=!0),i.length>0&&re(r==="view3d"),Ut()},[r,re,Ut,i.length]),nt.useEffect(()=>{const Rt=F.current;if(!Rt)return;if(Kv(I.current,T.current,O.current),at.current.makeEmpty(),i.length===0){I.current=null,T.current=null,O.current=null,Ut();return}const Lt=aw(i,qR);mt.current=Lt;const ae=new Float32Array(Lt.length*3),qt=new Float32Array(Lt.length*3),he=new dr,k=new it,[Ae,oe]=lw(Lt);for(let q=0;q<Lt.length;q+=1){const lt=Lt[q],vt=q*3;ae[vt]=lt.x,ae[vt+1]=lt.y,ae[vt+2]=lt.z;const ht=cw(lt.z,Ae,oe,lt.intensity);qt[vt]=ht[0],qt[vt+1]=ht[1],qt[vt+2]=ht[2],k.set(lt.x,lt.y,lt.z),he.expandByPoint(k)}const le=new oi;le.setAttribute("position",new Xi(ae,3)),le.setAttribute("color",new Xi(qt,3)),le.computeBoundingSphere();const Gt=W.current==="view3d",U=new Dx({size:Gt?qv:Zv,sizeAttenuation:Gt,vertexColors:!0,transparent:!0,opacity:.96,depthWrite:!1}),A=new iE(le,U);A.frustumCulled=!1,Rt.add(A),I.current=A,T.current=le,O.current=U,at.current.copy(he),P.current.params.Points={threshold:ZR},re(!0)},[re,i,Ut]),nt.useEffect(()=>{const Rt=V.current;if(Rt){Qv(Rt),J.current.clear();for(const Lt of s){const ae=Q.get(Lt.class_name)?.color??"#58a6ff",qt=f.includes(Lt.box_id),{group:he,pickMesh:k}=sw(Lt,ae,qt);Rt.add(he),J.current.set(Lt.box_id,k)}Ut()}},[s,Q,Ut,f]),nt.useEffect(()=>{const Rt=b.current;if(!Rt)return;const Lt=U=>{ot.current=null,U!=null&&Rt.hasPointerCapture(U)&&Rt.releasePointerCapture(U),Y.current=null,z.current&&(z.current.enabled=!0),Rt.style.cursor=W.current==="view3d"?"grab":"crosshair"},ae=U=>{if(U.button!==0)return;const A=wh(U,Rt,Wt(),P.current,G.current,J.current);if(!A){U.shiftKey||dt.current.onSelect([]);return}if(U.shiftKey){const kt=dt.current.selectedIds.includes(A)?dt.current.selectedIds.filter(Pt=>Pt!==A):[...dt.current.selectedIds,A];dt.current.onSelect(kt),Ut();return}if((!dt.current.selectedIds.includes(A)||dt.current.selectedIds.length!==1)&&dt.current.onSelect([A]),dt.current.readOnly)return;const q=dt.current.boxes.find(kt=>kt.box_id===A),lt=Wt();if(!q||!lt)return;const vt=new ia(new it(0,0,1),-q.center_xyz[2]),ht=gu(U,Rt,lt,P.current,G.current,vt);ht&&(ot.current={plane:vt,lastPoint:ht.clone()},Y.current=U.pointerId,Rt.setPointerCapture(U.pointerId),z.current&&(z.current.enabled=!1),U.preventDefault(),Rt.style.cursor="move")},qt=U=>{const A=Wt();if(!A)return;if(ot.current){const kt=gu(U,Rt,A,P.current,G.current,ot.current.plane);if(!kt)return;const Pt=kt.x-ot.current.lastPoint.x,te=kt.y-ot.current.lastPoint.y;ot.current.lastPoint.copy(kt),(Math.abs(Pt)>1e-5||Math.abs(te)>1e-5)&&dt.current.onMoveSelected(Pt,te);return}const q=performance.now(),lt=wh(U,Rt,A,P.current,G.current,J.current);if(Rt.style.cursor=lt?"move":W.current==="view3d"?"grab":"crosshair",q-yt.current.time<KR)return;yt.current.time=q;const vt=gu(U,Rt,A,P.current,G.current,new ia(new it(0,0,1),0)),ht=vt?[vt.x,vt.y,vt.z]:null;ow(yt.current.point,ht)||(yt.current.point=ht,dt.current.onHoverWorldChange?.(ht))},he=U=>{Y.current!=null&&Y.current!==U.pointerId||Lt(U.pointerId)},k=U=>{Y.current!=null&&Y.current!==U.pointerId||Lt(U.pointerId)},Ae=()=>{Lt()},oe=U=>{if(dt.current.readOnly||wh(U,Rt,Wt(),P.current,G.current,J.current))return;const A=I.current,q=Wt();if(!A||!q)return;const lt=rw(U,Rt,q,P.current,G.current,A,mt.current);if(lt){const ht=Rt.getBoundingClientRect();dt.current.onCreateBox([lt.x,lt.y,lt.z],{x:U.clientX-ht.left,y:U.clientY-ht.top});return}const vt=gu(U,Rt,q,P.current,G.current,new ia(new it(0,0,1),0));if(vt){const ht=Rt.getBoundingClientRect();dt.current.onCreateBox([vt.x,vt.y,vt.z],{x:U.clientX-ht.left,y:U.clientY-ht.top})}},le=U=>{dt.current.readOnly||!U.altKey||dt.current.selectedIds.length===0||(U.preventDefault(),dt.current.onRotateSelected(U.deltaY>0?.06:-.06))};Rt.addEventListener("pointerdown",ae),Rt.addEventListener("pointermove",qt),window.addEventListener("pointerup",he),Rt.addEventListener("pointercancel",k),Rt.addEventListener("lostpointercapture",Ae),window.addEventListener("blur",Ae),Rt.addEventListener("dblclick",oe),Rt.addEventListener("wheel",le,{passive:!1});const Gt=U=>U.preventDefault();return Rt.addEventListener("contextmenu",Gt),()=>{Rt.removeEventListener("pointerdown",ae),Rt.removeEventListener("pointermove",qt),window.removeEventListener("pointerup",he),Rt.removeEventListener("pointercancel",k),Rt.removeEventListener("lostpointercapture",Ae),window.removeEventListener("blur",Ae),Rt.removeEventListener("dblclick",oe),Rt.removeEventListener("wheel",le),Rt.removeEventListener("contextmenu",Gt),Lt()}},[Wt,Ut]);const ye=nt.useCallback(Rt=>{const Lt=Wt(),ae=z.current;if(!Lt||!ae)return;if(Lt instanceof Lu){Lt.zoom=Cp(Lt.zoom*Rt,.3,12),Lt.updateProjectionMatrix(),Ut();return}const qt=Lt.position.clone().sub(ae.target);qt.multiplyScalar(1/Rt),Lt.position.copy(ae.target.clone().add(qt)),Lt.updateProjectionMatrix(),ae.update(),Ut()},[Wt,Ut]);return y.jsxs("div",{className:"frame-canvas",ref:x,children:[y.jsx("canvas",{ref:b,className:"frame-canvas__surface"}),y.jsxs("div",{className:"frame-canvas__toolbar",children:[y.jsx("button",{className:"ghost-button",onClick:()=>ye(1.16),type:"button",children:"+"}),y.jsx("button",{className:"ghost-button",onClick:()=>ye(1/1.16),type:"button",children:"-"}),y.jsx("button",{className:"ghost-button",onClick:()=>re(!1),type:"button",children:"Fit"}),y.jsx("button",{className:"ghost-button",onClick:()=>re(!0),type:"button",children:"Center"})]}),!t&&c&&y.jsxs("div",{className:"bbox-class-picker",style:{left:Math.min(Math.max(c.x+12,18),Math.max(B.current.width-Et,18)),top:Math.min(Math.max(c.y-10,18),Math.max(B.current.height-Mt,18))},children:[l.map(Rt=>y.jsxs("button",{className:"bbox-class-picker__btn",onClick:()=>h?.(Rt.name),style:{borderColor:`${Rt.color}66`,background:`linear-gradient(135deg, ${nw(Rt.color,.24)}, rgba(13, 17, 23, 0.94))`},type:"button",children:[y.jsx("span",{className:"bbox-class-picker__swatch",style:{background:Rt.color}}),y.jsx("span",{className:"bbox-class-picker__name",children:Rt.name})]},Rt.id)),y.jsx("button",{className:"bbox-class-picker__close",onClick:()=>_?.(),type:"button",children:"×"})]}),m&&i.length>0&&y.jsx(kR,{box:m,points:i}),Dt&&y.jsx("div",{className:"frame-canvas__warning",children:Dt})]})}function ew(r){return r.mode==="bev"?y.jsx(NR,{activeClass:r.activeClass,boxes:r.boxes,classes:r.classes,onCreateBox:r.onCreateBox,onHoverWorldChange:r.onHoverWorldChange,onMoveSelected:r.onMoveSelected,onRotateSelected:r.onRotateSelected,onSelect:r.onSelect,points:r.points,selectedIds:r.selectedIds}):y.jsx(tw,{...r})}function nw(r,t){const i=r.replace("#","");if(i.length!==6)return`rgba(88, 166, 255, ${t})`;const s=Number.parseInt(i.slice(0,2),16),l=Number.parseInt(i.slice(2,4),16),c=Number.parseInt(i.slice(4,6),16);return`rgba(${s}, ${l}, ${c}, ${t})`}const iw=nt.memo(ew);function aw(r,t){if(r.length<=t)return r;const i=Math.max(1,Math.floor(r.length/t)),s=[];for(let l=0;l<r.length;l+=i)s.push(r[l]);return s}function sw(r,t,i){const s=new ho,l=new To(r.size_lwh[0],r.size_lwh[1],r.size_lwh[2]),c=new Vp({color:t,transparent:!0,opacity:i?.22:.1,depthWrite:!1}),f=new ya(l,c);f.userData.boxId=r.box_id,s.add(f);const p=new sE(l),m=new Pu({color:i?"#ffffff":t,transparent:!0,opacity:.95}),h=new kp(p,m);return s.add(h),s.position.set(r.center_xyz[0],r.center_xyz[1],r.center_xyz[2]),s.rotation.z=r.yaw,{group:s,pickMesh:f}}function Kv(r,t,i){r?.parent&&r.parent.remove(r),t?.dispose(),i?.dispose()}function Qv(r){for(;r.children.length>0;){const t=r.children.pop();t&&(r.remove(t),t.traverse(i=>{const s=i;"geometry"in s&&s.geometry&&s.geometry.dispose();const l=s.material;Array.isArray(l)?l.forEach(c=>c.dispose()):l&&l.dispose()}))}}function Xp(r,t,i){const s=t.getBoundingClientRect();i.x=(r.clientX-s.left)/s.width*2-1,i.y=-((r.clientY-s.top)/s.height)*2+1}function wh(r,t,i,s,l,c){if(!i||c.size===0)return null;Xp(r,t,l),s.setFromCamera(l,i);const f=s.intersectObjects([...c.values()],!1);return f.length===0?null:String(f[0].object.userData.boxId??"")}function rw(r,t,i,s,l,c,f){Xp(r,t,l),s.setFromCamera(l,i);const p=s.intersectObject(c,!1).filter(v=>typeof v.index=="number");if(p.length===0)return null;const m=p.reduce((v,g)=>{const M=typeof g.distanceToRay=="number"?g.distanceToRay:g.distance;return Math.min(v,M)},Number.POSITIVE_INFINITY),h=p.filter(v=>(typeof v.distanceToRay=="number"?v.distanceToRay:v.distance)<=m+.05);h.sort((v,g)=>{const M=v.index!=null?f[v.index]:null,R=((g.index!=null?f[g.index]:null)?.z??Number.NEGATIVE_INFINITY)-(M?.z??Number.NEGATIVE_INFINITY);if(Math.abs(R)>1e-5)return R;const x=typeof v.distanceToRay=="number"?v.distanceToRay:v.distance,b=typeof g.distanceToRay=="number"?g.distanceToRay:g.distance;return x-b});const _=h[0];return _.index==null?null:f[_.index]??null}function gu(r,t,i,s,l,c){Xp(r,t,l),s.setFromCamera(l,i);const f=new it;return s.ray.intersectPlane(c,f)?f:null}function ow(r,t){return!r||!t?r===t:Math.abs(r[0]-t[0])<.05&&Math.abs(r[1]-t[1])<.05&&Math.abs(r[2]-t[2])<.05}function Cp(r,t,i){return Math.min(i,Math.max(t,r))}function lw(r){let t=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;for(const s of r)t=Math.min(t,s.z),i=Math.max(i,s.z);return!Number.isFinite(t)||!Number.isFinite(i)||Math.abs(i-t)<1e-4?[-2,2]:[t,i]}function cw(r,t,i,s){const l=Cp((r-t)/Math.max(1e-4,i-t),0,1),c=Cp(s/255,.25,1),[f,p,m]=uw(l),h=.6+c*.4;return[f*h,p*h,m*h]}function uw(r){const t=[[.062,.046,.122],[.251,.072,.349],[.533,.103,.445],[.812,.251,.443],[.953,.553,.349],[.988,.886,.643]],i=r*(t.length-1),s=Math.floor(i),l=Math.min(t.length-1,s+1),c=i-s;return[t[s][0]*(1-c)+t[l][0]*c,t[s][1]*(1-c)+t[l][1]*c,t[s][2]*(1-c)+t[l][2]*c]}const _u="bitfsd-annotator:last-workspace",Jv="bitfsd-annotator:last-package-bag",$v="bitfsd-annotator:last-package-output",vu="bitfsd-annotator:last-export",Dh="bitfsd-annotator:last-training-root",tx=26e4,Wx=5,qx=20,ex=[-15,-25,-2,50,25,2],Tl=[{id:"cone_blue",name:"Cone_Blue",color:"#0066FF",default_size:[.228,.228,.325]},{id:"cone_red",name:"Cone_Red",color:"#FF3030",default_size:[.228,.228,.325]}];function fw(){const[r,t]=nt.useState(()=>localStorage.getItem(_u)??""),[i,s]=nt.useState(""),[l,c]=nt.useState(null),[f,p]=nt.useState(()=>localStorage.getItem(Jv)??""),[m,h]=nt.useState(()=>localStorage.getItem($v)??""),[_,v]=nt.useState(""),[g,M]=nt.useState(null),[E,R]=nt.useState(null),[x,b]=nt.useState(null),[L,F]=nt.useState(()=>localStorage.getItem(vu)??""),[N,H]=nt.useState(()=>localStorage.getItem(Dh)??""),[z,I]=nt.useState(null),[T,O]=nt.useState(""),[mt,V]=nt.useState(null),[J,at]=nt.useState(null),[st,et]=nt.useState(!1),[P,G]=nt.useState(null),[Y,ot]=nt.useState(null),[yt,B]=nt.useState("home"),[W,dt]=nt.useState("annotate"),[Dt,zt]=nt.useState("workspace"),[Q,Et]=nt.useState(""),[Mt,Wt]=nt.useState(null),[Ut,re]=nt.useState(null),[ye,Rt]=nt.useState(null),[Lt,ae]=nt.useState([]),[qt,he]=nt.useState(""),[k,Ae]=nt.useState(""),[oe,le]=nt.useState(!1),[Gt,U]=nt.useState(""),[A,q]=nt.useState(""),[lt,vt]=nt.useState(Tl),[ht,kt]=nt.useState(""),[Pt,te]=nt.useState(!1),[ie,Tt]=nt.useState(null),[wt,jt]=nt.useState(!1),[Ft,Xt]=nt.useState(!1),[_e,Z]=nt.useState(null),[Ot,It]=nt.useState(null),[Kt,Nt]=nt.useState(!1),[xt,Qt]=nt.useState(!1),[fe,He]=nt.useState(null),[we,Fn]=nt.useState(null),li=nt.useRef(null),ts=nt.useRef(null),Ma=nt.useRef(null),pr="view3d",Ge=W==="annotate",ba=nt.useDeferredValue(Ut?.points??[]),fn=nt.useMemo(()=>Tu(Mt?.classes??[]),[Mt?.classes]),Ea=nt.useMemo(()=>Mt?.frames.map(w=>w.frame_id)??[],[Mt?.frames]),Xn=nt.useMemo(()=>Mt?.frames.find(w=>w.frame_id===ye)??null,[ye,Mt?.frames]),$e=nt.useMemo(()=>fn.find(w=>w.name===qt)??fn[0],[qt,fn]),Fe=nt.useMemo(()=>lt.find(w=>w.id===ht)??lt[0]??null,[lt,ht]),xn=nt.useMemo(()=>l?.groups.find(w=>w.group_id===i)??null,[i,l?.groups]),Yn=Ut?.annotation.boxes??[],dn=nt.useMemo(()=>Ut?Ut.annotation.boxes.filter(w=>Lt.includes(w.box_id)):[],[Ut,Lt]),mr=nt.useMemo(()=>{const w=new Map;for(const tt of Yn)w.set(tt.class_name,(w.get(tt.class_name)??0)+1);return w},[Yn]),qe=nt.useMemo(()=>Mt?.tasks.find(w=>w.id===fe)??null,[fe,Mt?.tasks]),En=nt.useMemo(()=>Mt?(W==="review"?Mt.frames.filter(tt=>tt.box_count>0):Mt.frames).filter(tt=>Ge&&oe&&tt.review_status!=="unreviewed"?!1:k.trim()?tt.frame_id.toLowerCase().includes(k.trim().toLowerCase()):!0):[],[Ge,k,oe,Mt,W]),es=nt.useMemo(()=>En.map(w=>w.frame_id),[En]),xi=ye?es.indexOf(ye):-1,Yi=nt.useMemo(()=>Mt?.frames.filter(w=>w.review_status==="reviewed").length??0,[Mt?.frames]),Ta=nt.useMemo(()=>Mt?.frames.filter(w=>w.review_status==="unreviewed").length??0,[Mt?.frames]),C=nt.useCallback((w,tt)=>{It({tone:w,text:tt})},[]),X=nt.useCallback(w=>{const tt=w instanceof Error?w.message:String(w);C("error",tt)},[C]),gt=nt.useCallback((w={})=>{Et(""),Wt(null),re(null),Rt(null),ae([]),Z(null),Xt(!1),Nt(!1),Qt(!1),He(null),vt(Tl),kt(""),te(!1),Tt(null),jt(!1),U(""),q(""),w.clearGroup&&s("")},[]);nt.useEffect(()=>{if(!Ot)return;const w=Ot.tone==="error"?5200:2600,tt=window.setTimeout(()=>{It(Ct=>Ct===Ot?null:Ct)},w);return()=>window.clearTimeout(tt)},[Ot]),nt.useEffect(()=>{if(!lt.length){kt("");return}lt.some(w=>w.id===ht)||kt(lt[0].id)},[lt,ht]);const ft=nt.useCallback(w=>{t(w),c(null),s("")},[]),rt=nt.useCallback(w=>{h(w),M(null),R(null),b(null)},[]),Vt=nt.useCallback(w=>{H(w),I(null),T&&w.trim()!==T&&(O(""),V(null),at(null),et(!1),G(null),ot(null))},[T]),Jt=nt.useCallback(()=>{const w=r.trim();return w?l?.kind==="group_root"?xn?.workspace_path??"":w:""},[xn?.workspace_path,r,l?.kind]),Ht=nt.useCallback(async(w,tt=!1)=>{if(w.trim()){Nt(!0);try{const Ct=await MM(w),Bt=Tu(Ct.classes);nt.startTransition(()=>{(tt||w!==Q)&&Z(null),Et(w),Wt(Ct);const ve=Ct.frames.map(Ue=>Ue.frame_id),Ze=ve[0]??null;Rt(Ue=>Ue&&ve.includes(Ue)?Ue:Ze),U(Ue=>Ue&&ve.includes(Ue)?Ue:Ze??""),q(Ue=>Ue&&ve.includes(Ue)?Ue:ve.length>0?ve[ve.length-1]:""),(tt||!wt)&&(Tt(Ct.settings),jt(!1)),(tt||!Pt)&&(vt(Bt),kt(Ue=>Ue&&Bt.some(Ki=>Ki.id===Ue)?Ue:Bt[0]?.id??""),te(!1)),(!qt||!Bt.some(Ue=>Ue.name===qt))&&he(Bt[0]?.name??""),fe&&!Ct.tasks.some(Ue=>Ue.id===fe)&&He(Ct.tasks[0]?.id??null)})}finally{Nt(!1)}}},[qt,Pt,Q,fe,wt]),$t=nt.useCallback(async(w,tt=!1)=>{const Ct=w.trim();if(!Ct)return;const Bt=await EM(Ct);nt.startTransition(()=>{if(O(Bt.root_path),V(Bt),I(Bt.target),(tt||!st)&&(at(Bt.settings),et(!1)),P&&!Bt.tasks.some(ve=>ve.id===P)&&G(Bt.tasks[0]?.id??null),P)ot(Bt.tasks.find(ve=>ve.id===P)??null);else{const ve=Bt.tasks.find(Ze=>Ze.kind==="train_openpcdet"&&(Ze.status==="pending"||Ze.status==="running"))??Bt.tasks.find(Ze=>Ze.kind==="train_openpcdet")??null;ot(ve),G(ve?.id??null)}})},[st,P]);nt.useEffect(()=>{const w=r.trim();if(!w){c(null),s("");return}let tt=!1;const Ct=window.setTimeout(()=>{Xd(w).then(Bt=>{tt||nt.startTransition(()=>{if(c(Bt),Bt.kind==="group_root"){const ve=Bt.groups.some(Ze=>Ze.group_id===i)?i:"";s(ve)}else i&&s("")})}).catch(()=>{tt||c({kind:"unknown",path:w,groups:[]})})},220);return()=>{tt=!0,window.clearTimeout(Ct)}},[i,r]),nt.useEffect(()=>{const w=m.trim();if(!w){M(null);return}let tt=!1;const Ct=()=>{Xd(w).then(ve=>{tt||M(ve)}).catch(()=>{tt||M({kind:"unknown",path:w,groups:[]})})};Ct();const Bt=window.setInterval(Ct,yt==="package"?2500:6e3);return()=>{tt=!0,window.clearInterval(Bt)}},[yt,m]),nt.useEffect(()=>{const w=N.trim();if(!w){I(null);return}let tt=!1;const Ct=window.setTimeout(()=>{bM(w).then(Bt=>{tt||I(Bt)}).catch(()=>{tt||I({kind:"unknown",path:w,groups:[],frame_count:0,train_count:0,val_count:0})})},220);return()=>{tt=!0,window.clearTimeout(Ct)}},[N]),nt.useEffect(()=>{const w=m.trim();if(yt!=="package"||!w)return;let tt=!1;const Ct=()=>{O0(w).then(ve=>{if(tt)return;const Ze=E?ve.find(Pn=>Pn.id===E)??null:null,Ue=ve.find(Pn=>Pn.kind==="package_groups"&&(Pn.status==="pending"||Pn.status==="running"))??null,Ki=Ze??Ue;nt.startTransition(()=>{b(Ki),!E&&Ue&&R(Ue.id)})}).catch(()=>{!tt&&E&&b(null)})};Ct();const Bt=window.setInterval(Ct,1200);return()=>{tt=!0,window.clearInterval(Bt)}},[yt,m,E]),nt.useEffect(()=>{const w=T||N.trim();if(yt!=="training"||!w)return;let tt=!1;const Ct=()=>{O0(w).then(ve=>{if(tt)return;const Ze=P?ve.find(ui=>ui.id===P)??null:null,Ue=ve.find(ui=>ui.kind==="train_openpcdet"&&(ui.status==="pending"||ui.status==="running"))??null,Ki=ve.find(ui=>ui.kind==="train_openpcdet")??null,Pn=Ze??Ue??Ki;nt.startTransition(()=>{ot(Pn),!P&&Pn&&G(Pn.id)})}).catch(()=>{!tt&&P&&ot(null)})};Ct();const Bt=window.setInterval(Ct,1200);return()=>{tt=!0,window.clearInterval(Bt)}},[yt,T,N,P]),nt.useEffect(()=>{if(!Q)return;const w=window.setInterval(()=>{Ht(Q,!1).catch(X)},3500);return()=>window.clearInterval(w)},[Ht,Q,X]),nt.useEffect(()=>{if(yt!=="training"||!T)return;const w=window.setInterval(()=>{$t(T,!1).catch(X)},3500);return()=>window.clearInterval(w)},[yt,$t,T,X]),nt.useEffect(()=>{if(yt==="workspace"){if(En.length===0){W==="review"&&Rt(null);return}(!ye||!En.some(w=>w.frame_id===ye))&&Rt(En[0].frame_id)}},[yt,ye,En,W]),nt.useEffect(()=>{if(!Q||!ye){re(null),Qt(!1);return}let w=!1;return Qt(!0),U0(Q,ye,tx,ex).then(tt=>{w||nt.startTransition(()=>{re(tt),ae([]),Xt(!1)})}).catch(X).finally(()=>{w||Qt(!1)}),()=>{w=!0}},[ye,Q,X]),nt.useEffect(()=>{if(!qe?.id||!qe.finished_at_ms)return;const w=`${qe.id}:${qe.status}:${qe.finished_at_ms}`;if(li.current!==w){if(li.current=w,qe.kind==="extract_pcd"){if(qe.status==="succeeded"){C("success",`extract finished: ${qe.id}`);const tt=Q||r.trim();tt&&Ht(tt,!1).catch(X)}else qe.status==="failed"&&C("error",qe.error||`extract failed: ${qe.id}`);return}if(qe.kind==="package_groups"){qe.status==="succeeded"?C("success",`分包完成: ${qe.id}`):qe.status==="failed"&&C("error",qe.error||`package failed: ${qe.id}`);return}qe.status==="failed"&&C("error",qe.error||`${qe.kind} failed`)}},[Ht,Q,C,X,qe?.error,qe?.finished_at_ms,qe?.id,qe?.kind,qe?.status,r]),nt.useEffect(()=>{if(!x?.id||!x.finished_at_ms)return;const w=`${x.id}:${x.status}:${x.finished_at_ms}`;if(ts.current!==w){if(ts.current=w,x.status==="succeeded"){C("success","分包完成");const tt=m.trim();tt&&Xd(tt).then(Ct=>{nt.startTransition(()=>{t(tt),c(Ct),s(""),M(Ct)})}).catch(()=>{});return}x.status==="failed"&&C("error",x.error||"分包失败")}},[m,x?.error,x?.finished_at_ms,x?.id,x?.status,C]),nt.useEffect(()=>{if(!Y?.id||!Y.finished_at_ms)return;const w=`${Y.id}:${Y.status}:${Y.finished_at_ms}`;if(Ma.current!==w){if(Ma.current=w,Y.status==="succeeded"){C("success","OpenPCDet 训练完成"),T&&$t(T,!0).catch(X);return}Y.status==="failed"&&C("error",Y.error||"OpenPCDet 训练失败")}},[$t,T,C,X,Y?.error,Y?.finished_at_ms,Y?.id,Y?.status]),nt.useEffect(()=>{if(!Q||!ye||Ft||!Xn)return;let w=!1;return U0(Q,ye,tx,ex).then(tt=>{w||nt.startTransition(()=>{re(tt),ae(Ct=>Ct.filter(Bt=>tt.annotation.boxes.some(ve=>ve.box_id===Bt)))})}).catch(()=>{}),()=>{w=!0}},[ye,Xn?.box_count,Xn?.review_status,Xn?.source,Ft,Q]),nt.useEffect(()=>{const w=tt=>{if(yt!=="workspace")return;const Ct=tt.target,Bt=Ct instanceof HTMLInputElement||Ct instanceof HTMLTextAreaElement||Ct instanceof HTMLSelectElement;if(Ge&&(tt.ctrlKey||tt.metaKey)&&tt.key.toLowerCase()==="s"){tt.preventDefault(),Fs().catch(X);return}if(!Bt){if(Ge&&(tt.key==="Delete"||tt.key==="Backspace")){tt.preventDefault(),en();return}if(tt.key==="ArrowLeft"||tt.key==="ArrowUp"){tt.preventDefault(),ss(-1);return}if(tt.key==="ArrowRight"||tt.key==="ArrowDown"){tt.preventDefault(),ss(1);return}if(Ge&&tt.key.toLowerCase()==="q"){tt.preventDefault(),tn(-.08);return}if(Ge&&tt.key.toLowerCase()==="e"){tt.preventDefault(),tn(.08);return}if(Ge&&/^[1-9]$/.test(tt.key)){const ve=Number.parseInt(tt.key,10)-1,Ze=fn[ve];if(!Ze)return;he(Ze.name),Lt.length>0&&ne(Ze.name)}}};return window.addEventListener("keydown",w),()=>window.removeEventListener("keydown",w)},[yt,fn,Ge,Lt.length]);const Yt=nt.useCallback((w,tt)=>{re(Ct=>{if(!Ct)return Ct;const Bt=gw(Ct.annotation);return w(Bt),tt&&(Bt.source="manual"),Bt.updated_at_ms=Date.now(),{...Ct,annotation:Bt}}),Xt(!0)},[]),pe=nt.useCallback((w,tt)=>{if(!Ut||!$e)return;if(!Rp(w)||Math.abs(w[0])>500||Math.abs(w[1])>500){C("error","3D create failed: invalid pick position");return}const Ct=[...$e.default_size],Bt=hM(Ut.points,w,Ct),ve=Nw(Ut.points,w[0],w[1],Ct[2]),Ze=Bt?.center_xyz??[w[0],w[1],ve],Ue=Bt?.size_lwh??Ct,Ki=Bt?.yaw??0;if(!Rp(Ze)){C("error","box center z is invalid");return}const Pn=`${Ut.frame_id}_${Date.now()}`;Yt(ui=>{ui.boxes.push({box_id:Pn,class_name:$e.name,center_xyz:Ze,size_lwh:Ue,yaw:Ki,score:null})},!0),Z({boxId:Pn,x:tt?.x??24,y:tt?.y??24})},[$e,Ut,Yt]),xe=nt.useCallback(w=>{_e&&(he(w),Yt(tt=>{tt.boxes=tt.boxes.map(Ct=>Ct.box_id===_e.boxId?{...Ct,class_name:w}:Ct)},!0),ae([_e.boxId]),Z(null))},[_e,Yt]),ee=nt.useCallback(()=>{Z(null)},[]),Me=nt.useCallback((w,tt)=>{Lt.length&&Yt(Ct=>{Ct.boxes=Ct.boxes.map(Bt=>Lt.includes(Bt.box_id)?{...Bt,center_xyz:[Bt.center_xyz[0]+w,Bt.center_xyz[1]+tt,Bt.center_xyz[2]]}:Bt)},!0)},[Lt,Yt]),tn=nt.useCallback(w=>{Lt.length&&Yt(tt=>{tt.boxes=tt.boxes.map(Ct=>Lt.includes(Ct.box_id)?{...Ct,yaw:xw(Ct.yaw+w)}:Ct)},!0)},[Lt,Yt]),en=nt.useCallback(()=>{Lt.length&&(Yt(w=>{w.boxes=w.boxes.filter(tt=>!Lt.includes(tt.box_id))},!0),Z(w=>w&&Lt.includes(w.boxId)?null:w),ae([]))},[Lt,Yt]),Be=nt.useCallback(w=>{Yt(tt=>{tt.boxes=tt.boxes.filter(Ct=>Ct.box_id!==w)},!0),Z(tt=>tt?.boxId===w?null:tt),ae(tt=>tt.filter(Ct=>Ct!==w))},[Yt]),hn=nt.useCallback(w=>{ae(w),Z(tt=>tt&&(w.includes(tt.boxId)?tt:null))},[]),ne=nt.useCallback(w=>{Yt(tt=>{tt.boxes=tt.boxes.map(Ct=>Lt.includes(Ct.box_id)?{...Ct,class_name:w}:Ct)},!0)},[Lt,Yt]),yn=nt.useCallback((w,tt,Ct)=>{if(!dn[0])return;const Bt=dn[0].box_id;w==="class_name"&&Z(ve=>ve?.boxId===Bt?null:ve),Yt(ve=>{ve.boxes=ve.boxes.map(Ze=>{if(Ze.box_id!==Bt)return Ze;if(w==="center_xyz"||w==="size_lwh"){const Ue=[...Ze[w]];return Ct!=null&&(Ue[Ct]=Number(tt)),{...Ze,[w]:Ue}}return{...Ze,[w]:tt}})},w!=="score")},[dn,Yt]),me=nt.useCallback(w=>{Yt(tt=>{tt.review_status=w},!1)},[Yt]),On=nt.useCallback(async()=>{if(!Q||!Ut)return!1;const w=await TM(Q,{...Ut.annotation,updated_at_ms:Date.now()});return Wt(tt=>tt&&_w(tt,w)),Xt(!1),!0},[Ut,Q]),Wn=async w=>{gt({clearGroup:l?.kind==="group_root"}),dt(w),zt("workspace"),r.trim()&&localStorage.setItem(_u,r.trim()),B("workspace")},yi=async()=>{try{const w=Jt();if(!w){C("error","workspace path is empty");return}if(l?.kind==="group_root"&&!xn){C("error","请选择要打开的分组");return}localStorage.setItem(_u,r.trim()),await Ht(w,!0),zt("frames"),B("workspace"),C("success",`workspace ready: ${w}`)}catch(w){X(w)}},qn=async()=>{try{const w=await zc(r||Q||null);if(!w)return;t(w),C("info",`workspace selected: ${w}`)}catch(w){X(w)}},je=async()=>{try{const w=await zc(L||null);if(!w)return;F(w),localStorage.setItem(vu,w),C("info",`export root selected: ${w}`)}catch(w){X(w)}},mn=async()=>{try{const w=await wM(f||null);if(!w)return;p(w),C("info",`ros2 bag selected: ${w}`)}catch(w){X(w)}},Bn=async()=>{try{const w=await zc(m||null);if(!w)return;h(w),C("info",`package output selected: ${w}`)}catch(w){X(w)}},gn=async()=>{try{const w=await zc(N||T||null);if(!w)return;Vt(w),localStorage.setItem(Dh,w),C("info",`训练数据目录已选择: ${w}`)}catch(w){X(w)}},Si=nt.useCallback(()=>{B("package")},[]),Wi=nt.useCallback(()=>{B("training")},[]),ns=nt.useCallback(()=>{const w=m.trim();w&&(t(w),s(""),c(g)),B("home")},[m,g]),Bu=nt.useCallback(()=>{B("home")},[]),Hu=nt.useCallback(async(w,tt,Ct,Bt)=>{gt(),t(tt),s(Ct),c(g),dt(w),zt("workspace"),localStorage.setItem(_u,tt),B("workspace"),C("info",`已选择 ${Ct}，点击“打开”后载入`)},[g,C,gt]),Fs=async()=>{if(!(!Ge||!Q||!Ut))try{await On()&&(Z(null),C("success",`saved ${Ut.frame_id}`))}catch(w){X(w)}},qi=async()=>{try{if(!m.trim()){C("error","请先设置分包保存目录");return}if(!f.trim()){C("error","bag path is empty");return}let w=!0;if(g?.kind==="group_root"&&g.groups.length>0){const Ct=Zx(g.groups);w=window.confirm(`检测到目标目录里已有 ${g.groups.length} 组分包。

点击“确定”会删除旧分组并重新分包。
点击“取消”会保留旧分组，并从 ${Ct} 开始把新分组追加到后面。`)}localStorage.setItem(Jv,f.trim()),localStorage.setItem($v,m.trim());const tt=await NM(f.trim(),m.trim(),{topic:_.trim()||void 0,frameStep:Wx,groupSize:qx,replaceExisting:w});R(tt.id),b(tt),C("info",`${w?"覆盖":"追加"}分包任务已启动`)}catch(w){X(w)}},gr=async()=>{try{if(!Q)return;Ge&&Ft&&await On();const w=L.trim();if(!w){C("error","请先选择导出根目录"),zt("export");return}localStorage.setItem(vu,w);const tt=ix(w,Q),Ct=await DM(Q,{outputPath:tt,annotatedOnly:!0});C("success",`exported annotated frames to ${Ct.output_dir}`)}catch(w){X(w)}},_r=async()=>{try{const w=N.trim();if(!w){C("error","请先选择训练数据目录");return}localStorage.setItem(Dh,w),await $t(w,!0),C("success",`训练目录已载入: ${w}`)}catch(w){X(w)}},Aa=async w=>{try{const tt=w||T;if(!tt||!J){C("error","请先载入训练目录");return}const Ct=await RM(tt,J);at(Ct),et(!1),await $t(tt,!0),C("success","训练设置已保存")}catch(tt){X(tt)}},is=async()=>{try{const w=T||N.trim();if(!w){C("error","请先选择训练数据目录");return}(!T||w!==T)&&await _r(),st&&await Aa(w);const tt=await LM(w);G(tt.id),ot(tt),C("info","OpenPCDet 训练任务已启动"),await $t(w,!1)}catch(w){X(w)}},Co=async()=>{try{if(!Q||!Mt)return;const w=vw(Mt.frames,Gt,A);if(!w.length){C("error","selected range is empty");return}const tt=await UM(Q,w);He(tt.id),C("info",`inference started on ${w.length} frames`),await Ht(Q,!1)}catch(w){X(w)}},Ro=async()=>{try{if(!Q||!ie)return;await CM(Q,ie),jt(!1),await Ht(Q,!0),C("success","settings saved")}catch(w){X(w)}},Ll=nt.useCallback(()=>{const w=bw(lt);vt(tt=>[...tt,w]),kt(w.id),te(!0),zt("classes")},[lt]),ra=nt.useCallback((w,tt)=>{vt(Ct=>Ct.map(Bt=>Bt.id!==w?Bt:tt(Bt))),te(!0)},[]),Zi=nt.useCallback(()=>{if(!Fe)return;if(lt.length<=1){C("error","至少保留一个类别");return}window.confirm(`删除类别“${Fe.name}”后不会自动修改已有标注，是否继续？`)&&(vt(tt=>tt.filter(Ct=>Ct.id!==Fe.id)),te(!0))},[lt.length,C,Fe]),wo=async()=>{try{if(!Q){C("error","请先打开工作区");return}const w=Ew(lt);if(w.error){C("error",w.error);return}const tt=await AM(Q,w.classes),Ct=Tu(tt);Wt(Bt=>Bt&&{...Bt,classes:Ct}),vt(Ct),kt(Bt=>Bt&&Ct.some(ve=>ve.id===Bt)?Bt:Ct[0]?.id??""),te(!1),he(Bt=>Bt&&Ct.some(ve=>ve.name===Bt)?Bt:Ct[0]?.name??""),C("success","类别配置已保存")}catch(w){X(w)}},as=nt.useCallback(()=>Ft?window.confirm("Current frame has unsaved changes. Discard them?"):!0,[Ft]),Ni=nt.useCallback(w=>{w!==ye&&as()&&(Z(null),Rt(w),ae([]))},[as,ye]),ss=nt.useCallback(w=>{if(En.length===0||xi<0)return;const tt=Yp(xi+w,0,En.length-1),Ct=En[tt];Ct&&Ni(Ct.frame_id)},[xi,En,Ni]),ci=(w,tt)=>{Tt(Ct=>Ct&&{...Ct,[w]:tt}),jt(!0)},Ul=(w,tt)=>{at(Ct=>Ct&&{...Ct,[w]:tt}),et(!0)},vr=Ot?.tone??(Kt||xt?"info":Ft?"error":"success"),xr=Ot?.text??(Kt||xt?"加载中...":Ft?"当前帧存在未保存修改":Q?"就绪":"等待打开工作区");if(yt==="home"){const w=l?.kind==="group_root"?xn:null,tt=w?.frame_count??(Q===r.trim()?Mt?.frames.length??0:0),Ct=w?.reviewed_count??(Q===r.trim()?Yi:0);return y.jsx(dw,{notice:Ot,onEnterPackage:Si,onEnterTraining:Wi,onEnterAnnotate:()=>{Wn("annotate")},onEnterReview:()=>{Wn("review")},onGroupChange:Bt=>{s(Bt)},onPickWorkspace:()=>{qn()},reviewedCount:Ct,selectedGroupId:xn?.group_id??"",workspaceTarget:l,workspaceInput:r,workspacePath:xn?.workspace_path??(Q===r.trim()?Q:""),framesCount:tt,onWorkspaceChange:ft})}return yt==="package"?y.jsx(hw,{notice:Ot,bagInput:f,outputInput:m,packageTargetInfo:g,topicInput:_,packageTask:x,onBack:ns,onBagChange:p,onEnterGroup:Hu,onOutputChange:rt,onPackage:()=>{qi()},onPickBag:()=>{mn()},onPickOutput:()=>{Bn()},onTopicChange:v}):yt==="training"?y.jsx(pw,{notice:Ot,trainingRootInput:N,trainingTarget:z,trainingSnapshot:mt,trainingTask:Y,trainingSettings:J,trainingSettingsDirty:st,onBack:Bu,onOpenTrainingRoot:()=>{_r()},onPickTrainingRoot:()=>{gn()},onRootChange:Vt,onSaveSettings:()=>{Aa()},onSettingChange:Ul,onStartTraining:()=>{is()}}):y.jsxs("div",{className:"annotator-app",children:[y.jsxs("header",{className:"toolbar",children:[y.jsxs("div",{className:"logo",children:[y.jsx("div",{className:"logo-mark",children:"PC"}),y.jsxs("div",{children:[y.jsx("div",{className:"logo-text",children:"Point Cloud Annotator"}),y.jsx("div",{className:"logo-subtext",children:Q||"No workspace open"})]})]}),y.jsxs("div",{className:"tool-group",children:[y.jsx("button",{className:"tool-btn",onClick:()=>B("home"),type:"button",children:"首页"}),y.jsx("button",{className:"tool-btn active",type:"button",children:W==="annotate"?"标注模式":"查看模式"})]}),y.jsxs("div",{className:"tool-group",children:[y.jsx("button",{className:"tool-btn",onClick:()=>ss(-1),type:"button",children:"上一帧"}),y.jsx("button",{className:"tool-btn",onClick:()=>ss(1),type:"button",children:"下一帧"})]}),Ge&&y.jsxs("div",{className:"tool-group",children:[y.jsx("button",{className:"tool-btn primary",disabled:!Ft||!Ut,onClick:()=>{Fs()},type:"button",children:"保存"}),y.jsx("button",{className:"tool-btn",onClick:()=>{Co()},type:"button",children:"自动标注"})]}),y.jsx("div",{className:"spacer"}),y.jsx("div",{className:"tool-group tool-group--end",children:y.jsx("button",{className:"tool-btn primary",onClick:()=>{gr()},type:"button",children:"导出本地"})})]}),y.jsxs("aside",{className:"left-panel",children:[y.jsx("div",{className:"panel-title",children:"数据与标签"}),y.jsxs("div",{className:"panel-tabs",children:[y.jsx("button",{className:`panel-tab ${Dt==="workspace"?"is-active":""}`,onClick:()=>zt("workspace"),type:"button",children:"工作区"}),Ge&&y.jsx("button",{className:`panel-tab ${Dt==="classes"?"is-active":""}`,onClick:()=>zt("classes"),type:"button",children:"类别"}),y.jsx("button",{className:`panel-tab ${Dt==="frames"?"is-active":""}`,onClick:()=>zt("frames"),type:"button",children:"帧"}),y.jsx("button",{className:`panel-tab ${Dt==="export"?"is-active":""}`,onClick:()=>zt("export"),type:"button",children:"导出"}),Ge&&y.jsx("button",{className:`panel-tab ${Dt==="automation"?"is-active":""}`,onClick:()=>zt("automation"),type:"button",children:"自动"}),Ge&&y.jsx("button",{className:`panel-tab ${Dt==="openpcdet"?"is-active":""}`,onClick:()=>zt("openpcdet"),type:"button",children:"推理"})]}),y.jsxs("div",{className:"panel-body",children:[Dt==="workspace"&&y.jsxs("section",{className:"panel-section",children:[y.jsx("div",{className:"section-title",children:"工作区"}),y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:"Workspace"}),y.jsx("input",{placeholder:"/path/to/output_workspace",value:r,onChange:w=>ft(w.target.value)}),y.jsx("span",{className:"field-hint",children:l?.kind==="group_root"?"当前路径是分组根目录，请先选一组再打开。":"打开后会读取 `pcd / annotations / meta / models`。"})]}),l?.kind==="group_root"&&y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:"标注组"}),y.jsxs("select",{value:xn?.group_id??"",onChange:w=>{s(w.target.value)},children:[y.jsx("option",{value:"",children:"选择一组"}),l.groups.map(w=>y.jsxs("option",{value:w.group_id,children:[w.group_id," · ",w.frame_count," 帧 · reviewed ",w.reviewed_count]},w.group_id))]}),xn&&y.jsxs("span",{className:"field-hint",children:[xn.start_frame_id," - ",xn.end_frame_id," · ",xn.workspace_path]})]}),y.jsxs("div",{className:"button-row",children:[y.jsx("button",{className:"ghost-button",onClick:()=>{qn()},type:"button",children:"选择目录"}),y.jsx("button",{className:"secondary-button",onClick:()=>{yi()},type:"button",children:"打开"}),y.jsx("button",{className:"ghost-button",onClick:()=>{Ht(Q||Jt(),!1)},type:"button",children:"刷新"})]}),y.jsxs("div",{className:"workspace-stats",children:[y.jsx(Lh,{label:"Frames",value:Mt?.frames.length??0}),y.jsx(Lh,{label:"Reviewed",value:Yi}),y.jsx(Lh,{label:"Queue",value:Ta})]})]}),Ge&&Dt==="classes"&&y.jsxs("section",{className:"panel-section",children:[y.jsx("div",{className:"section-title",children:"类别配置"}),Q?y.jsxs(y.Fragment,{children:[y.jsxs("div",{className:"button-row",children:[y.jsx("button",{className:"ghost-button",onClick:Ll,type:"button",children:"新增类别"}),y.jsx("button",{className:"secondary-button",disabled:!Pt||!Q,onClick:()=>{wo()},type:"button",children:"保存类别"})]}),y.jsx("span",{className:"field-hint class-editor__hint",children:"新建框、批量改类和双击后的类别选择都会使用这里的配置。"}),y.jsx("div",{className:"label-list class-editor__list",children:lt.map(w=>y.jsxs("button",{className:`label-card ${Fe?.id===w.id?"active":""}`,onClick:()=>kt(w.id),type:"button",children:[y.jsx("span",{className:"label-dot",style:{background:w.color}}),y.jsx("span",{className:"label-name",children:w.name}),y.jsx("span",{className:"label-badge",children:ww(w.default_size)})]},w.id))}),Fe&&y.jsxs("div",{className:"inline-editor class-editor",children:[y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:"名称"}),y.jsx("input",{value:Fe.name,onChange:w=>ra(Fe.id,tt=>({...tt,name:w.target.value}))})]}),y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:"颜色"}),y.jsxs("div",{className:"class-editor__color-row",children:[y.jsx("input",{className:"class-editor__color-picker",type:"color",value:Jx(Fe.color),onChange:w=>ra(Fe.id,tt=>({...tt,color:w.target.value}))}),y.jsx("input",{value:Fe.color,onChange:w=>ra(Fe.id,tt=>({...tt,color:w.target.value}))})]})]}),y.jsx(Nh,{label:"默认尺寸 LWH",values:Fe.default_size,onChange:(w,tt)=>ra(Fe.id,Ct=>{const Bt=[...Ct.default_size];return Bt[w]=Rw(tt,Ct.default_size[w]),{...Ct,default_size:Bt}})}),y.jsx("div",{className:"button-row",children:y.jsx("button",{className:"ghost-button",disabled:lt.length<=1,onClick:Zi,type:"button",children:"删除类别"})})]})]}):y.jsx("div",{className:"empty-state",children:"打开工作区后可编辑类别。"})]}),Dt==="export"&&y.jsxs("section",{className:"panel-section",children:[y.jsx("div",{className:"section-title",children:"导出结果"}),y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:"Export Root"}),y.jsx("input",{placeholder:"/path/to/export_root",value:L,onChange:w=>{F(w.target.value),localStorage.setItem(vu,w.target.value)}}),y.jsxs("span",{className:"field-hint",children:["导出时会自动落到 ",L.trim()?ix(L.trim(),Q||"group_001"):"/path/to/export_root/group_001"]})]}),y.jsxs("div",{className:"button-row",children:[y.jsx("button",{className:"ghost-button",onClick:()=>{je()},type:"button",children:"选择根目录"}),y.jsx("button",{className:"secondary-button",onClick:()=>{gr()},type:"button",children:"导出当前组"})]}),y.jsx("div",{className:"workspace-stats",children:fn.map(w=>y.jsxs("div",{className:"stat-chip",children:[y.jsx("span",{children:w.name}),y.jsx("strong",{style:{color:w.color},children:mr.get(w.name)??0})]},w.id))})]}),Dt==="frames"&&y.jsxs("section",{className:"panel-section",children:[y.jsx("div",{className:"section-title",children:"帧列表"}),y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:"过滤"}),y.jsx("input",{placeholder:"filter frame id",value:k,onChange:w=>Ae(w.target.value)})]}),y.jsxs("label",{className:"checkbox-row",children:[y.jsx("input",{checked:oe,onChange:w=>le(w.target.checked),type:"checkbox"}),y.jsx("span",{children:"只看待审核帧"})]}),y.jsxs("div",{className:"frame-list",children:[En.map(w=>y.jsxs("button",{className:`frame-item ${w.frame_id===ye?"is-active":""}`,onClick:()=>Ni(w.frame_id),type:"button",children:[y.jsxs("div",{className:"frame-item__name",children:[w.frame_id,".pcd"]}),y.jsxs("div",{className:"frame-item__meta",children:[y.jsx(mw,{reviewStatus:w.review_status??void 0}),y.jsxs("span",{children:[w.box_count," boxes"]}),y.jsx("span",{children:w.source??"-"})]})]},w.frame_id)),!En.length&&y.jsx("div",{className:"empty-state",children:"没有可显示的帧。"})]})]}),Ge&&Dt==="automation"&&y.jsxs("section",{className:"panel-section",children:[y.jsx("div",{className:"section-title",children:"自动化"}),y.jsxs("div",{className:"range-grid",children:[y.jsx(nx,{label:"Auto Start",value:Gt,options:Ea,onChange:U}),y.jsx(nx,{label:"Auto End",value:A,options:Ea,onChange:q})]}),y.jsx("div",{className:"button-column",children:y.jsx("button",{className:"secondary-button",onClick:()=>{Co()},type:"button",children:"对范围自动标注"})})]}),Ge&&Dt==="openpcdet"&&y.jsxs("section",{className:"panel-section",children:[y.jsx("div",{className:"section-title",children:"推理设置"}),ie?y.jsxs(y.Fragment,{children:[y.jsx("span",{className:"field-hint class-editor__hint",children:"训练入口已移到首页“模型训练”。这里保留的是当前工作区自动标注需要的模型与 checkpoint。"}),y.jsxs("div",{className:"settings-grid",children:[y.jsx(si,{label:"Python",value:ie.python_bin,onChange:w=>ci("python_bin",w)}),y.jsx(si,{label:"OpenPCDet Root",value:ie.openpcdet_root,onChange:w=>ci("openpcdet_root",w)}),y.jsx(si,{label:"Model Config",value:ie.model_config_path,onChange:w=>ci("model_config_path",w)}),y.jsx(si,{label:"Dataset Config",value:ie.dataset_config_path,onChange:w=>ci("dataset_config_path",w)}),y.jsx(si,{label:"Checkpoint",value:ie.checkpoint_path,onChange:w=>ci("checkpoint_path",w)}),y.jsx(si,{label:"Score",type:"number",step:"0.01",value:ie.score_threshold,onChange:w=>ci("score_threshold",Number(w))}),y.jsx(si,{label:"Min Reviewed",type:"number",step:"1",value:ie.min_reviewed_for_training,onChange:w=>ci("min_reviewed_for_training",Number(w))}),y.jsx(si,{label:"Train Args",value:ie.train_extra_args,onChange:w=>ci("train_extra_args",w)}),y.jsx(si,{label:"Infer Args",value:ie.infer_extra_args,onChange:w=>ci("infer_extra_args",w)})]})]}):y.jsx("div",{className:"empty-state",children:"打开工作区后可编辑模型设置。"}),y.jsx("button",{className:"secondary-button",disabled:!wt||!Q,onClick:()=>{Ro()},type:"button",children:"保存设置"})]}),Ge&&Dt==="workspace"&&y.jsxs("section",{className:"shortcuts",children:[y.jsx("div",{className:"section-title",children:"快捷键"}),y.jsxs("div",{className:"shortcut-row",children:[y.jsx("span",{children:"双击建框并选类别"}),y.jsx("span",{className:"kbd",children:"Double Click"})]}),y.jsxs("div",{className:"shortcut-row",children:[y.jsx("span",{children:"旋转框"}),y.jsx("span",{className:"kbd",children:"Q / E"})]}),y.jsxs("div",{className:"shortcut-row",children:[y.jsx("span",{children:"删除选中"}),y.jsx("span",{className:"kbd",children:"Del"})]}),y.jsxs("div",{className:"shortcut-row",children:[y.jsx("span",{children:"保存"}),y.jsx("span",{className:"kbd",children:"Ctrl + S"})]}),y.jsxs("div",{className:"shortcut-row",children:[y.jsx("span",{children:"切帧"}),y.jsx("span",{className:"kbd",children:"← →"})]})]})]})]}),y.jsxs("main",{className:"viewport-panel",children:[Ot&&y.jsx("div",{className:`notice notice--${Ot.tone}`,children:Ot.text}),y.jsxs("div",{className:"viewport-header",children:[y.jsxs("div",{className:"hud-chip",children:["帧 ",y.jsx("span",{children:ye??"-"})]}),y.jsxs("div",{className:"hud-chip",children:["点云 ",y.jsx("span",{children:ba.length.toLocaleString()})]}),y.jsxs("div",{className:"hud-chip",children:["标注 ",y.jsx("span",{children:Yn.length})]}),y.jsxs("div",{className:"hud-chip",children:["来源 ",y.jsx("span",{children:Ut?.annotation.source??"-"})]})]}),y.jsx("section",{className:"viewport-card",children:Ut?y.jsx(iw,{activeClass:$e,boxes:Yn,classes:fn,mode:pr,pendingClassChoice:_e,readOnly:!Ge,selectedBox:dn.length===1?dn[0]:null,onCreateBox:Ge?pe:()=>{},onDismissPendingClassChoice:ee,onHoverWorldChange:Fn,onMoveSelected:Ge?Me:()=>{},onChoosePendingClass:xe,onRotateSelected:Ge?tn:()=>{},onSelect:hn,points:ba,selectedIds:Lt}):y.jsx("div",{className:"empty-stage",children:Kt||xt?"Loading frame...":W==="review"?"No annotated frames found in this workspace.":"Open a workspace and pick a frame."})}),y.jsx("div",{className:"viewport-footer",children:y.jsx("div",{className:"viewport-tip",children:Ge?"双击点云会从点击位置附近做一次局部聚类出框，然后在框旁直接选择类别。":"查看模式下只浏览已有标注，双击、拖动和旋转都不会修改数据。"})})]}),y.jsxs("aside",{className:"right-panel",children:[y.jsxs("div",{className:"panel-title panel-title--split",children:[y.jsx("span",{children:"标注列表"}),y.jsxs("span",{children:[Yn.length," 项"]})]}),Ge&&Ut&&y.jsxs("section",{className:"right-stack-card right-stack-card--tight",children:[y.jsx("div",{className:"section-title",children:"当前状态"}),y.jsxs("div",{className:"review-switch",children:[y.jsx("button",{className:`review-switch__btn ${Ut.annotation.review_status==="unreviewed"?"is-active":""}`,onClick:()=>me("unreviewed"),type:"button",children:"待审核"}),y.jsx("button",{className:`review-switch__btn ${Ut.annotation.review_status==="reviewed"?"is-active":""}`,onClick:()=>me("reviewed"),type:"button",children:"已审核"}),y.jsx("button",{className:`review-switch__btn review-switch__btn--danger ${Ut.annotation.review_status==="rejected"?"is-active":""}`,onClick:()=>me("rejected"),type:"button",children:"驳回"})]})]}),y.jsx("div",{className:"annotation-list",children:Yn.length===0?y.jsx("div",{className:"empty-state",children:"暂无标注，双击点云开始聚类建框。"}):Yn.map((w,tt)=>{const Ct=fn.find(Bt=>Bt.name===w.class_name);return y.jsxs("article",{className:`ann-card ${Lt.includes(w.box_id)?"selected":""}`,onClick:()=>hn([w.box_id]),children:[y.jsxs("div",{className:"ann-header",children:[y.jsx("span",{className:"ann-color",style:{background:Ct?.color??"#58a6ff"}}),y.jsx("span",{className:"ann-label",children:w.class_name}),y.jsxs("span",{className:"ann-id",children:["#",tt+1]})]}),y.jsxs("div",{className:"ann-props",children:[y.jsxs("div",{className:"ann-prop",children:[y.jsx("div",{className:"ann-prop-label",children:"位置 XYZ"}),y.jsx("div",{className:"ann-prop-val",children:w.center_xyz.map(Bt=>Bt.toFixed(2)).join(", ")})]}),y.jsxs("div",{className:"ann-prop",children:[y.jsx("div",{className:"ann-prop-label",children:"尺寸 LWH"}),y.jsx("div",{className:"ann-prop-val",children:w.size_lwh.map(Bt=>Bt.toFixed(2)).join(", ")})]})]}),y.jsxs("div",{className:"ann-actions",children:[y.jsx("button",{className:"ann-act",onClick:Bt=>{Bt.stopPropagation(),hn([w.box_id])},type:"button",children:"选中"}),Ge&&y.jsx("button",{className:"ann-act del",onClick:Bt=>{Bt.stopPropagation(),Be(w.box_id)},type:"button",children:"删除"})]})]},w.box_id)})}),Ge&&y.jsxs("section",{className:`edit-panel ${dn.length>0?"visible":""}`,children:[y.jsx("div",{className:"edit-title",children:"编辑属性"}),!Ut&&y.jsx("div",{className:"empty-state",children:"No frame loaded."}),Ut&&dn.length===0&&y.jsx("div",{className:"empty-state",children:"选中一个框后可以在这里修改尺寸、姿态和类别。"}),dn.length>1&&y.jsxs("div",{className:"multi-selection",children:[y.jsxs("div",{children:[dn.length," boxes selected"]}),y.jsx("select",{value:qt,onChange:w=>{he(w.target.value),ne(w.target.value)},children:fn.map(w=>y.jsx("option",{value:w.name,children:w.name},w.id))}),y.jsx("button",{className:"ghost-button",onClick:en,type:"button",children:"删除选中"})]}),dn.length===1&&y.jsxs(y.Fragment,{children:[y.jsxs("div",{className:"inspector-meta",children:[y.jsxs("div",{children:["Frame: ",Ut?.frame_id]}),y.jsxs("div",{children:["Source: ",Ut?.annotation.source]}),y.jsxs("div",{children:["Review: ",Ut?.annotation.review_status]})]}),y.jsxs("div",{className:"inspector-form",children:[y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:"Class"}),y.jsxs("select",{value:fn.some(w=>w.name===dn[0].class_name)?dn[0].class_name:"__legacy_unknown__",onChange:w=>yn("class_name",w.target.value),children:[!fn.some(w=>w.name===dn[0].class_name)&&y.jsx("option",{disabled:!0,value:"__legacy_unknown__",children:dn[0].class_name}),fn.map(w=>y.jsx("option",{value:w.name,children:w.name},w.id))]})]}),y.jsx(Nh,{label:"Center XYZ",values:dn[0].center_xyz,onChange:(w,tt)=>yn("center_xyz",Number(tt),w)}),y.jsx(Nh,{label:"Size LWH",values:dn[0].size_lwh,onChange:(w,tt)=>yn("size_lwh",Number(tt),w)}),y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:"Yaw"}),y.jsx("input",{type:"number",step:"0.01",value:dn[0].yaw,onChange:w=>yn("yaw",Number(w.target.value))})]}),y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:"Score"}),y.jsx("input",{type:"number",step:"0.01",value:dn[0].score??"",onChange:w=>yn("score",w.target.value?Number(w.target.value):null)})]}),y.jsx("button",{className:"ghost-button",onClick:en,type:"button",children:"删除框"})]})]})]})]}),y.jsxs("footer",{className:"statusbar",children:[y.jsxs("div",{className:"status-item",children:[y.jsx("span",{className:`status-dot-large status-dot-large--${vr}`}),y.jsx("span",{children:xr})]}),y.jsxs("div",{className:"status-item",children:["标签:",y.jsx("span",{className:"status-pill-inline",style:{color:$e?.color},children:$e?.name??"-"})]}),y.jsxs("div",{className:"status-item",children:["帧:",y.jsx("span",{className:"status-pill-inline",children:ye?`${xi+1}/${es.length}`:"-"})]}),y.jsxs("div",{className:"status-item status-item--right",children:["光标:",y.jsx("span",{className:"status-pill-inline status-pill-inline--mono",children:we?`X ${we[0].toFixed(2)}  Y ${we[1].toFixed(2)}  Z ${we[2].toFixed(2)}`:"X -.--  Y -.--  Z -.--"})]})]})]})}function dw({notice:r,workspaceInput:t,workspaceTarget:i,selectedGroupId:s,workspacePath:l,framesCount:c,reviewedCount:f,onWorkspaceChange:p,onGroupChange:m,onPickWorkspace:h,onEnterPackage:_,onEnterTraining:v,onEnterAnnotate:g,onEnterReview:M}){return y.jsxs("div",{className:"entry-page",children:[y.jsx("div",{className:"entry-page__hero"}),y.jsx("div",{className:"entry-page__veil"}),y.jsxs("div",{className:"entry-page__content",children:[y.jsxs("div",{className:"entry-page__brand",children:[y.jsx("div",{className:"logo-mark",children:"PC"}),y.jsxs("div",{children:[y.jsx("div",{className:"entry-page__eyebrow",children:"BIT FSD Cone Workflow"}),y.jsx("h1",{children:"Point Cloud Annotator"}),y.jsx("p",{children:"进入标注模式继续人工打框，进入查看模式只加载已经标过的帧并以 3D 视图浏览。"})]})]}),r&&y.jsx("div",{className:`notice notice--${r.tone}`,children:r.text}),y.jsxs("section",{className:"entry-card entry-card--workspace",children:[y.jsx("div",{className:"entry-card__title",children:"工作区入口"}),y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:"Workspace"}),y.jsx("input",{placeholder:"/path/to/output_workspace",value:t,onChange:E=>p(E.target.value)})]}),i?.kind==="group_root"&&y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:"标注组"}),y.jsxs("select",{value:s,onChange:E=>m(E.target.value),children:[y.jsx("option",{value:"",children:"选择一组"}),i.groups.map(E=>y.jsxs("option",{value:E.group_id,children:[E.group_id," · ",E.frame_count," 帧 · 已审 ",E.reviewed_count]},E.group_id))]})]}),y.jsx("div",{className:"button-row",children:y.jsx("button",{className:"ghost-button",onClick:h,type:"button",children:"选择目录"})}),y.jsxs("div",{className:"entry-stats",children:[y.jsxs("div",{className:"entry-stat",children:[y.jsx("span",{children:"Frames"}),y.jsx("strong",{children:c})]}),y.jsxs("div",{className:"entry-stat",children:[y.jsx("span",{children:"Reviewed"}),y.jsx("strong",{children:f})]})]}),i?.kind==="group_root"&&y.jsxs("div",{className:"entry-card__path",children:["检测到分组根目录，共 ",i.groups.length," 组。当前选择: ",s||"-"]}),y.jsx("div",{className:"entry-card__path",children:l||t||"No workspace selected"})]}),y.jsxs("div",{className:"entry-mode-grid entry-mode-grid--quad",children:[y.jsxs("button",{className:"entry-card entry-card--mode",onClick:_,type:"button",children:[y.jsx("div",{className:"entry-card__label",children:"Package"}),y.jsx("div",{className:"entry-card__mode",children:"点云分包"}),y.jsx("p",{children:"进入分包页，按 5 帧取 1 帧、每 20 帧切一组，生成多人协作标注目录。"})]}),y.jsxs("button",{className:"entry-card entry-card--mode",onClick:v,type:"button",children:[y.jsx("div",{className:"entry-card__label",children:"Train"}),y.jsx("div",{className:"entry-card__mode",children:"模型训练"}),y.jsx("p",{children:"进入 OpenPCDet 训练页，直接选择一个或多个 `group_*` 导出的数据目录发起训练。"})]}),y.jsxs("button",{className:"entry-card entry-card--mode",onClick:g,type:"button",children:[y.jsx("div",{className:"entry-card__label",children:"Annotate"}),y.jsx("div",{className:"entry-card__mode",children:"进入标注"}),y.jsx("p",{children:"按你选中的工作区或分组进入 3D 标注，双击建框后可直接选择类别。"})]}),y.jsxs("button",{className:"entry-card entry-card--mode",onClick:M,type:"button",children:[y.jsx("div",{className:"entry-card__label",children:"Review"}),y.jsx("div",{className:"entry-card__mode",children:"进入查看"}),y.jsx("p",{children:"只加载已有标注的帧，保留 3D 浏览和列表查看，不进入编辑流。"})]})]})]})]})}function hw({notice:r,bagInput:t,outputInput:i,topicInput:s,packageTargetInfo:l,packageTask:c,onBack:f,onBagChange:p,onOutputChange:m,onTopicChange:h,onPickBag:_,onPickOutput:v,onPackage:g,onEnterGroup:M}){const E=l?.kind==="group_root"?l.groups:[],R=E.reduce((T,O)=>T+O.frame_count,0),x=E.reduce((T,O)=>T+O.annotated_count,0),b=E.reduce((T,O)=>T+O.reviewed_count,0),L=Zx(E),F=l?.bag_path?.trim()??"",N=l?.path?.trim()||i.trim(),H=E.length>0,z=yw(c),I=c?.status==="pending"||c?.status==="running";return y.jsxs("div",{className:"entry-page entry-page--package",children:[y.jsx("div",{className:"entry-page__hero"}),y.jsx("div",{className:"entry-page__veil"}),y.jsxs("div",{className:"entry-page__content entry-page__content--package",children:[y.jsxs("div",{className:"entry-page__brand",children:[y.jsx("div",{className:"logo-mark",children:"PC"}),y.jsxs("div",{children:[y.jsx("div",{className:"entry-page__eyebrow",children:"BIT FSD Cone Workflow"}),y.jsx("h1",{children:"Point Cloud Packager"}),y.jsx("p",{children:"选择 bag 和保存目录后开始分包。完成后会在下面展示每一组，方便直接进入标注或查看。"})]})]}),r&&y.jsx("div",{className:`notice notice--${r.tone}`,children:r.text}),y.jsxs("section",{className:"package-hero-grid",children:[y.jsxs("article",{className:"entry-card entry-card--package package-pane package-pane--form",children:[y.jsx("div",{className:"entry-card__title",children:"点云分包"}),y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:"ROS2 Bag"}),y.jsx("input",{placeholder:"/path/to/ros2_bag",value:t,onChange:T=>p(T.target.value)})]}),y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:"保存目录"}),y.jsx("input",{placeholder:"/path/to/group_output",value:i,onChange:T=>m(T.target.value)})]}),y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:"Topic"}),y.jsx("input",{placeholder:"auto detect if empty",value:s,onChange:T=>h(T.target.value)})]}),y.jsxs("div",{className:"button-row",children:[y.jsx("button",{className:"ghost-button",onClick:f,type:"button",children:"返回首页"}),y.jsx("button",{className:"ghost-button",onClick:_,type:"button",children:"选择 Bag"}),y.jsx("button",{className:"ghost-button",onClick:v,type:"button",children:"选择目录"}),y.jsx("button",{className:"secondary-button",disabled:I,onClick:g,type:"button",children:I?"分包中...":"分包成组"})]}),c&&y.jsxs("div",{className:`package-progress package-progress--${c.status}`,children:[y.jsxs("div",{className:"package-progress__header",children:[y.jsxs("div",{children:[y.jsx("div",{className:"package-progress__eyebrow",children:"分包进度"}),y.jsx("div",{className:"package-progress__status",children:Kx(c.status)})]}),y.jsx("div",{className:"package-progress__percent",children:z?.percent!=null?`${Math.round(z.percent)}%`:c.status==="succeeded"?"100%":c.status==="failed"?"ERR":"..."})]}),y.jsx("div",{className:"package-progress__bar",children:y.jsx("div",{className:`package-progress__fill ${z?.percent==null&&I?"is-indeterminate":""}`,style:z?.percent!=null?{width:`${Yp(z.percent,0,100)}%`}:void 0})}),y.jsx("div",{className:"package-progress__label",children:z?.label??(c.status==="failed"?c.error||"分包失败":c.status==="succeeded"?"分包完成":"任务已启动，正在读取 bag")}),y.jsxs("div",{className:"package-progress__stats",children:[z?.current!=null&&z?.total!=null&&y.jsxs("span",{children:[z.current," / ",z.total," 消息"]}),z?.outputFrames!=null&&y.jsxs("span",{children:[z.outputFrames," 帧"]}),z?.groupCount!=null&&y.jsxs("span",{children:[z.groupCount," 组"]}),z?.mode&&y.jsx("span",{children:z.mode==="append"?"追加":"覆盖"})]})]}),y.jsxs("div",{className:"entry-card__path",children:["每 ",Wx," 帧取 1 帧，每 ",qx," 帧分成一组，适合多人并行标注。"]}),y.jsx("div",{className:"entry-card__path",children:i||"No package output selected"})]}),y.jsxs("article",{className:"entry-card package-pane package-pane--summary",children:[y.jsx("div",{className:"entry-card__title",children:"输出概览"}),y.jsxs("div",{className:"entry-stats entry-stats--package",children:[y.jsxs("div",{className:"entry-stat",children:[y.jsx("span",{children:"Groups"}),y.jsx("strong",{children:E.length})]}),y.jsxs("div",{className:"entry-stat",children:[y.jsx("span",{children:"Frames"}),y.jsx("strong",{children:R})]}),y.jsxs("div",{className:"entry-stat",children:[y.jsx("span",{children:"Annotated"}),y.jsx("strong",{children:x})]}),y.jsxs("div",{className:"entry-stat",children:[y.jsx("span",{children:"Reviewed"}),y.jsx("strong",{children:b})]})]}),y.jsxs("div",{className:"package-meta-list",children:[y.jsxs("div",{className:"package-meta-item",children:[y.jsx("span",{children:"输出目录"}),y.jsx("strong",{children:N||"未选择"})]}),y.jsxs("div",{className:"package-meta-item",children:[y.jsx("span",{children:"已记录 Bag"}),y.jsx("strong",{children:F||"首次分包时会写入"})]}),y.jsxs("div",{className:"package-meta-item",children:[y.jsx("span",{children:"下一组"}),y.jsx("strong",{children:L})]})]})]})]}),y.jsxs("section",{className:"entry-card package-gallery",children:[y.jsxs("div",{className:"package-gallery__header",children:[y.jsx("div",{className:"entry-card__title",children:"分组预览"}),y.jsx("div",{className:"package-gallery__badge",children:H?`Next ${L}`:"Awaiting Groups"})]}),E.length?y.jsx("div",{className:"group-preview-grid group-preview-grid--full",children:E.map(T=>y.jsxs("article",{className:"group-preview-card",children:[y.jsx("div",{className:"group-preview-card__title",children:T.group_id}),y.jsxs("div",{className:"group-preview-card__meta",children:[T.start_frame_id," - ",T.end_frame_id]}),y.jsxs("div",{className:"group-preview-card__stats",children:[y.jsxs("span",{children:[T.frame_count," 帧"]}),y.jsxs("span",{children:[T.annotated_count," 已标"]}),y.jsxs("span",{children:[T.reviewed_count," 已审"]})]}),y.jsxs("div",{className:"button-row group-preview-card__actions",children:[y.jsx("button",{className:"ghost-button",onClick:()=>M("review",N,T.group_id,T.workspace_path),type:"button",children:"查看这组"}),y.jsx("button",{className:"secondary-button",onClick:()=>M("annotate",N,T.group_id,T.workspace_path),type:"button",children:"标注这组"})]})]},T.group_id))}):y.jsx("div",{className:"empty-state package-gallery__empty",children:"分包完成后，这里会以全屏网格展示每一组。"})]})]})]})}function pw({notice:r,trainingRootInput:t,trainingTarget:i,trainingSnapshot:s,trainingTask:l,trainingSettings:c,trainingSettingsDirty:f,onBack:p,onRootChange:m,onPickTrainingRoot:h,onOpenTrainingRoot:_,onSettingChange:v,onSaveSettings:g,onStartTraining:M}){const E=s?.target??i,R=E?.groups??[],x=E?.frame_count??R.reduce((I,T)=>I+T.frame_count,0),b=E?.train_count??R.reduce((I,T)=>I+T.train_count,0),L=E?.val_count??R.reduce((I,T)=>I+T.val_count,0),F=R.reduce((I,T)=>I+T.labeled_count,0),N=Sw(l),H=l?.status==="pending"||l?.status==="running",z=c?.checkpoint_path?.trim()??"";return y.jsxs("div",{className:"entry-page entry-page--package entry-page--training",children:[y.jsx("div",{className:"entry-page__hero"}),y.jsx("div",{className:"entry-page__veil"}),y.jsxs("div",{className:"entry-page__content entry-page__content--package",children:[y.jsxs("div",{className:"entry-page__brand",children:[y.jsx("div",{className:"logo-mark",children:"PC"}),y.jsxs("div",{children:[y.jsx("div",{className:"entry-page__eyebrow",children:"BIT FSD Cone Workflow"}),y.jsx("h1",{children:"OpenPCDet Trainer"}),y.jsx("p",{children:"训练页只使用已经导出的 OpenPCDet 数据目录。选中根目录后会自动兼容里面多个 `group_*`，并在训练前聚合成一套无冲突的数据集。"})]})]}),r&&y.jsx("div",{className:`notice notice--${r.tone}`,children:r.text}),y.jsxs("section",{className:"package-hero-grid",children:[y.jsxs("article",{className:"entry-card entry-card--package package-pane package-pane--form",children:[y.jsx("div",{className:"entry-card__title",children:"训练数据"}),y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:"训练根目录"}),y.jsx("input",{placeholder:"/sda1/fsd/cone_annoated",value:t,onChange:I=>m(I.target.value)}),y.jsx("span",{className:"field-hint",children:"可选单个导出组目录，也可直接选包含多个 `group_*` 的父目录。"})]}),y.jsxs("div",{className:"button-row",children:[y.jsx("button",{className:"ghost-button",onClick:p,type:"button",children:"返回首页"}),y.jsx("button",{className:"ghost-button",onClick:h,type:"button",children:"选择目录"}),y.jsx("button",{className:"ghost-button",onClick:_,type:"button",children:"载入目录"}),y.jsx("button",{className:"secondary-button",disabled:H||!c,onClick:M,type:"button",children:H?"训练中...":"开始训练"})]}),l&&y.jsxs("div",{className:`package-progress package-progress--${l.status}`,children:[y.jsxs("div",{className:"package-progress__header",children:[y.jsxs("div",{children:[y.jsx("div",{className:"package-progress__eyebrow",children:"训练进度"}),y.jsx("div",{className:"package-progress__status",children:Kx(l.status)})]}),y.jsx("div",{className:"package-progress__percent",children:N?.percent!=null?`${Math.round(N.percent)}%`:l.status==="succeeded"?"100%":l.status==="failed"?"ERR":"..."})]}),y.jsx("div",{className:"package-progress__bar",children:y.jsx("div",{className:`package-progress__fill ${N?.percent==null&&H?"is-indeterminate":""}`,style:N?.percent!=null?{width:`${Yp(N.percent,0,100)}%`}:void 0})}),y.jsx("div",{className:"package-progress__label",children:N?.label??(l.status==="failed"?l.error||"训练失败":l.status==="succeeded"?"训练完成":"正在准备训练任务")}),y.jsxs("div",{className:"package-progress__stats",children:[N?.frameCount!=null&&y.jsxs("span",{children:[N.frameCount," 帧"]}),N?.groupCount!=null&&y.jsxs("span",{children:[N.groupCount," 组"]}),N?.trainCount!=null&&y.jsxs("span",{children:[N.trainCount," train"]}),N?.valCount!=null&&y.jsxs("span",{children:[N.valCount," val"]}),N?.classCount!=null&&y.jsxs("span",{children:[N.classCount," 类"]})]})]}),y.jsx("div",{className:"entry-card__path",children:"训练前会把样本重命名成 `group_xxx__frame_id`，避免不同组里的 `0000000.npy` 冲突。"}),y.jsx("div",{className:"entry-card__path",children:s?.root_path||t||"No training root selected"})]}),y.jsxs("article",{className:"entry-card package-pane package-pane--summary",children:[y.jsx("div",{className:"entry-card__title",children:"数据概览"}),y.jsxs("div",{className:"entry-stats entry-stats--package",children:[y.jsxs("div",{className:"entry-stat",children:[y.jsx("span",{children:"Groups"}),y.jsx("strong",{children:R.length})]}),y.jsxs("div",{className:"entry-stat",children:[y.jsx("span",{children:"Frames"}),y.jsx("strong",{children:x})]}),y.jsxs("div",{className:"entry-stat",children:[y.jsx("span",{children:"Train"}),y.jsx("strong",{children:b})]}),y.jsxs("div",{className:"entry-stat",children:[y.jsx("span",{children:"Val"}),y.jsx("strong",{children:L})]})]}),y.jsxs("div",{className:"package-meta-list",children:[y.jsxs("div",{className:"package-meta-item",children:[y.jsx("span",{children:"标注文件"}),y.jsx("strong",{children:F})]}),y.jsxs("div",{className:"package-meta-item",children:[y.jsx("span",{children:"最新 Checkpoint"}),y.jsx("strong",{children:z||"训练成功后自动回填"})]}),y.jsxs("div",{className:"package-meta-item",children:[y.jsx("span",{children:"目录状态"}),y.jsx("strong",{children:Mw(E?.kind)})]})]})]})]}),y.jsxs("section",{className:"entry-card entry-card--workspace",children:[y.jsx("div",{className:"entry-card__title",children:"训练设置"}),c?y.jsxs(y.Fragment,{children:[y.jsxs("div",{className:"settings-grid",children:[y.jsx(si,{label:"Python",value:c.python_bin,onChange:I=>v("python_bin",I)}),y.jsx(si,{label:"OpenPCDet Root",value:c.openpcdet_root,onChange:I=>v("openpcdet_root",I)}),y.jsx(si,{label:"Model Config",value:c.model_config_path,onChange:I=>v("model_config_path",I)}),y.jsx(si,{label:"Dataset Config",value:c.dataset_config_path,onChange:I=>v("dataset_config_path",I)}),y.jsx(si,{label:"Checkpoint",value:c.checkpoint_path,onChange:I=>v("checkpoint_path",I)}),y.jsx(si,{label:"Train Args",value:c.train_extra_args,onChange:I=>v("train_extra_args",I)})]}),y.jsx("div",{className:"button-row",children:y.jsx("button",{className:"secondary-button",disabled:!f,onClick:g,type:"button",children:"保存训练设置"})})]}):y.jsx("div",{className:"empty-state",children:"载入训练目录后可编辑 OpenPCDet 训练设置。"})]}),y.jsxs("section",{className:"entry-card package-gallery",children:[y.jsxs("div",{className:"package-gallery__header",children:[y.jsx("div",{className:"entry-card__title",children:"Group 预览"}),y.jsx("div",{className:"package-gallery__badge",children:R.length?`${R.length} Groups Ready`:"Awaiting Dataset"})]}),R.length?y.jsx("div",{className:"group-preview-grid group-preview-grid--full",children:R.map(I=>y.jsxs("article",{className:"group-preview-card",children:[y.jsx("div",{className:"group-preview-card__title",children:I.group_id}),y.jsx("div",{className:"group-preview-card__meta",children:I.dataset_path}),y.jsxs("div",{className:"group-preview-card__stats",children:[y.jsxs("span",{children:[I.frame_count," 帧"]}),y.jsxs("span",{children:[I.labeled_count," labels"]}),y.jsxs("span",{children:[I.train_count," train"]}),y.jsxs("span",{children:[I.val_count," val"]})]})]},I.group_id))}):y.jsx("div",{className:"empty-state package-gallery__empty",children:"选中导出目录后，这里会展示训练时会被聚合进去的每一个 group。"})]})]})]})}function nx({label:r,value:t,options:i,onChange:s}){return y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:r}),y.jsxs("select",{value:t,onChange:l=>s(l.target.value),children:[y.jsx("option",{value:"",children:"-"}),i.map(l=>y.jsx("option",{value:l,children:l},l))]})]})}function si({label:r,value:t,onChange:i,type:s="text",step:l}){return y.jsxs("label",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:r}),y.jsx("input",{step:l,type:s,value:t,onChange:c=>i(c.target.value)})]})}function Nh({label:r,values:t,onChange:i}){return y.jsxs("div",{className:"field-group",children:[y.jsx("span",{className:"field-label",children:r}),y.jsx("div",{className:"vector-row",children:t.map((s,l)=>y.jsx("input",{step:"0.01",type:"number",value:s,onChange:c=>i(l,c.target.value)},`${r}-${l}`))})]})}function Lh({label:r,value:t}){return y.jsxs("div",{className:"stat-chip",children:[y.jsx("span",{children:r}),y.jsx("strong",{children:t})]})}function mw({reviewStatus:r}){return y.jsx("span",{className:`status-dot status-dot--${r??"empty"}`})}function gw(r){return{...r,boxes:r.boxes.map(t=>({...t,center_xyz:[...t.center_xyz],size_lwh:[...t.size_lwh]}))}}function Tu(r){const i=(Array.isArray(r)?r:[]).map((l,c)=>{const f=l?.name?.trim();return f?{id:l?.id?.trim()||Qx(f)||`class_${c+1}`,name:f,color:Jx(l?.color),default_size:Cw(l?.default_size)}:null}).filter(l=>l!==null);if(!i.length)return Tl.map(l=>({...l,default_size:[...l.default_size]}));const s=new Set;return i.map((l,c)=>{let f=l.id,p=2;for(;s.has(f.toLowerCase());)f=`${l.id}_${p}`,p+=1;return s.add(f.toLowerCase()),{...l,id:f,default_size:[...l.default_size],color:l.color||Tl[c%Tl.length]?.color||"#58a6ff"}})}function _w(r,t){const i=r.frames.map(s=>s.frame_id===t.frame_id?t:s);return i.some(s=>s.frame_id===t.frame_id)||(i.push(t),i.sort((s,l)=>s.frame_id.localeCompare(l.frame_id))),{...r,frames:i,review_queue:i.filter(s=>s.review_status==="unreviewed").map(s=>s.frame_id)}}function vw(r,t,i){if(!t||!i)return[];const s=r.map(m=>m.frame_id),l=s.indexOf(t),c=s.indexOf(i);if(l<0||c<0)return[];const f=Math.min(l,c),p=Math.max(l,c);return s.slice(f,p+1)}function xw(r){let t=r;for(;t>Math.PI;)t-=Math.PI*2;for(;t<-Math.PI;)t+=Math.PI*2;return t}function Yp(r,t,i){return Math.min(i,Math.max(t,r))}function Zx(r){const t=r.reduce((i,s)=>{const l=s.group_id.match(/group_(\d+)$/i);return l?Math.max(i,Number.parseInt(l[1],10)):i},0);return`group_${String(t+1).padStart(3,"0")}`}function Kx(r){return r==="pending"?"准备中":r==="running"?"处理中":r==="succeeded"?"已完成":"失败"}function yw(r){const t=r?.metadata?.progress;if(!t||typeof t!="object"||Array.isArray(t))return null;const i=t;return{percent:aa(i.percent),current:aa(i.current),total:aa(i.total),label:typeof i.label=="string"?i.label:"",outputFrames:aa(i.output_frames),groupCount:aa(i.group_count),mode:i.mode==="append"||i.mode==="replace"?i.mode:void 0}}function Sw(r){const t=r?.metadata?.progress;if(!t||typeof t!="object"||Array.isArray(t))return null;const i=t;return{percent:aa(i.percent),label:typeof i.label=="string"?i.label:"",groupCount:aa(i.group_count),frameCount:aa(i.frame_count),trainCount:aa(i.train_count),valCount:aa(i.val_count),classCount:aa(i.class_count)}}function Mw(r){return r==="training_group_root"?"多组训练根目录":r==="training_dataset"?"单组训练目录":r==="missing"?"目录不存在":r==="unknown"?"不是可训练目录":"未选择"}function aa(r){return typeof r=="number"&&Number.isFinite(r)?r:null}function bw(r){const t=r.length+1,i=Tw(r,`Class_${t}`),s=Aw(r,Qx(i)||`class_${t}`),l=["#5AA9FF","#FF7A59","#5ED6A8","#F4B740","#B08CFF","#FF5D8F"];return{id:s,name:i,color:l[r.length%l.length],default_size:[.3,.3,.4]}}function Ew(r){const t=Tu(r);if(!t.length)return{classes:[],error:"至少保留一个类别"};const i=new Set;for(const s of t){if(!s.name.trim())return{classes:[],error:"类别名称不能为空"};const l=s.name.trim().toLowerCase();if(i.has(l))return{classes:[],error:`类别名称重复: ${s.name}`};if(i.add(l),!Rp(s.default_size)||s.default_size.some(c=>c<=0))return{classes:[],error:`默认尺寸无效: ${s.name}`}}return{classes:t,error:null}}function Tw(r,t){const i=t.trim()||"Class",s=new Set(r.map(f=>f.name.trim().toLowerCase()));if(!s.has(i.toLowerCase()))return i;let l=2,c=`${i}_${l}`;for(;s.has(c.toLowerCase());)l+=1,c=`${i}_${l}`;return c}function Aw(r,t){const i=(t.trim()||"class").toLowerCase(),s=new Set(r.map(f=>f.id.trim().toLowerCase()));if(!s.has(i))return i;let l=2,c=`${i}_${l}`;for(;s.has(c);)l+=1,c=`${i}_${l}`;return c}function Qx(r){return r.trim().toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}function Jx(r){const t=r?.trim()??"";return/^#[0-9a-fA-F]{6}$/.test(t)?t.toUpperCase():/^#[0-9a-fA-F]{3}$/.test(t)?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`.toUpperCase():"#58A6FF"}function Cw(r){const t=[.3,.3,.4];if(!Array.isArray(r)||r.length!==3)return t;const i=r.map((s,l)=>Number.isFinite(Number(s))?Number(s):t[l]);return i.some(s=>s<=0)?t:[i[0],i[1],i[2]]}function Rw(r,t){const i=Number(r);return Number.isFinite(i)&&i>0?i:t}function ww(r){return r.map(t=>t.toFixed(2)).join(" · ")}function ix(r,t){const i=r.trim().replace(/[\\/]+$/,""),s=Dw(t)||"workspace";return i?`${i}/${s}`:s}function Dw(r){const t=r.trim().replace(/[\\/]+$/,"");if(!t)return"";const i=t.split(/[\\/]+/);return i[i.length-1]??""}function Rp(r){return Number.isFinite(r[0])&&Number.isFinite(r[1])&&Number.isFinite(r[2])}function Nw(r,t,i,s){let l=Number.POSITIVE_INFINITY,c=0;for(const f of r){const p=f.x-t,m=f.y-i,h=p*p+m*m;h<l&&h<.9&&(l=h,c=f.z)}return c+s*.5}class Lw extends nt.Component{state={errorMessage:null,stack:null};static getDerivedStateFromError(t){return{errorMessage:t instanceof Error?t.message:String(t),stack:t instanceof Error?t.stack??null:null}}componentDidCatch(t){console.error("bitfsd-annotator runtime error",t)}render(){return this.state.errorMessage?y.jsx("div",{className:"runtime-error",children:y.jsxs("div",{className:"runtime-error__card",children:[y.jsx("div",{className:"runtime-error__title",children:"Runtime Error"}),y.jsx("div",{className:"runtime-error__message",children:this.state.errorMessage}),this.state.stack&&y.jsx("pre",{className:"runtime-error__stack",children:this.state.stack}),y.jsx("button",{className:"secondary-button",onClick:()=>window.location.reload(),type:"button",children:"Reload"})]})}):this.props.children}}dM.createRoot(document.getElementById("root")).render(y.jsx(aM.StrictMode,{children:y.jsx(Lw,{children:y.jsx(fw,{})})}));
