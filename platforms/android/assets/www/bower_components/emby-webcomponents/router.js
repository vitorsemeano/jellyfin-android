define(["loading","viewManager","skinManager","pluginManager","backdrop","browser","pageJs"],function(e,n,t,r,o,i,a){function c(){o.clear(),e.show(),G.connect().then(function(n){s(n,e)})}function s(e,n){switch(e.State){case MediaBrowser.ConnectionState.SignedIn:n.hide(),t.loadUserSkin();break;case MediaBrowser.ConnectionState.ServerSignIn:e.ApiClient.getPublicUsers().then(function(n){n.length?W.showLocalLogin(e.ApiClient,e.Servers[0].Id):W.showLocalLogin(e.ApiClient,e.Servers[0].Id,!0)});break;case MediaBrowser.ConnectionState.ServerSelection:W.showSelectServer();break;case MediaBrowser.ConnectionState.ConnectSignIn:W.showWelcome();break;case MediaBrowser.ConnectionState.ServerUpdateNeeded:require(["alert"],function(e){e(Globalize.translate("core#ServerUpdateNeeded",'<a href="https://emby.media">https://emby.media</a>')).then(function(){W.showSelectServer()})})}}function u(e,n,t,r){var o=t.contentPath||t.path;if(0!=o.toLowerCase().indexOf("http")&&0!=o.indexOf("file:")&&(0!=o.indexOf("/")&&(o="/"+o),o=C()+o),e.querystring&&t.enableContentQueryString&&(o+="?"+e.querystring),t.enableCache!==!1){var i=J[o];if(i)return void y(e,t,i,r)}o+=-1==o.indexOf("?")?"?":"&",o+="v="+j;var a=new XMLHttpRequest;a.onload=a.onerror=function(){if(this.status<400){var i=this.response;t.enableCache!==!1&&(J[o.split("?")[0]]=i),y(e,t,i,r)}else n()},a.onerror=n,a.open("GET",o,!0),a.send()}function l(e,n,t){v(e,t,function(){d(e,n,t)})}function d(e,n,t){var r=function(r){p(e,n,t,r)};require(t.dependencies||[],function(){t.controller?require([t.controller],r):r()})}function f(){var e=H;e&&(e.cancel=!0)}function p(e,t,r,o){f();var i=e.isBack,a={url:C()+e.path,transition:r.transition,isBack:i,state:e.state,type:r.type,controllerFactory:o,options:{supportsThemeMedia:r.supportsThemeMedia||!1},autoFocus:r.autoFocus};H=a;var c=function(){"string"==typeof r.path?u(e,t,r,a):t()};return i||"home"==r.type?void n.tryRestoreView(a).then(function(){X={route:r,path:e.path}},c):void c()}function h(n){e.show(),require(["connectionManager"],function(t){G=t,G.connect().then(function(t){z=t,e.hide(),n=n||{},a({click:n.click!==!1,hashbang:n.hashbang!==!1,enableHistory:m()})})})}function m(){return i.xboxOne?!1:!0}function g(){return a.enableNativeHistory()}function v(n,r,o){var i=z;if(i&&(z=null,i.State!=MediaBrowser.ConnectionState.SignedIn))return void s(i,e);{var a=G.currentApiClient();n.pathname.toLowerCase()}if(!(a&&a.isLoggedIn()||r.anonymous))return alert(JSON.stringify(r)),void c();if(a&&a.isLoggedIn()){if(n.isBack&&r.isDefaultRoute)return void b();if(r.isDefaultRoute)return void t.loadUserSkin();if(r.roles)return void w(a,r.roles,o).then(o,c)}o()}function w(e,n){return Promise.all(n.split(",").map(function(n){return S(e,n)}))}function S(e,n){return"admin"==n?e.getCurrentUser().then(function(e){return e.Policy.IsAdministrator?Promise.resolve():Promise.reject()}):Promise.resolve()}function b(){t.loadUserSkin(),V||(V=!0,t.getCurrentSkin().showBackMenu().then(function(){V=!1}))}function y(e,t,r,o){r=Globalize.translateDocument(r,t.dictionary),o.view=r,n.loadView(o),X={route:t,path:e.path},e.handled=!0}function k(){var e=window.location.pathname||"",n=e.lastIndexOf("/");return e=-1!=n?e.substring(n):"/"+e,e&&"/"!=e||(e="/index.html"),e}function C(){return Q}function L(e){return function(n,t){l(n,t,e)}}function B(){var e=X?X.path||"":"",n=e.indexOf("?"),t="";return-1!=n&&(t=e.substring(n)),t||""}function x(e,n){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t="[\\?&]"+e+"=([^&#]*)",r=new RegExp(t,"i"),o=r.exec(n||B());return null==o?"":decodeURIComponent(o[1].replace(/\+/g," "))}function I(){a.back()}function M(){var e=O();return e?"home"==e.type?!1:a.canGoBack():!1}function R(e,n){return new Promise(function(t){var r=C();return e=e.replace(r,""),X&&X.path==e&&"home"!=X.route.type?void t():(a.show(e,n),void setTimeout(t,500))})}function O(){return X?X.route:null}function T(){var e=t.getCurrentSkin(),n=e.getRoutes().filter(function(e){return"home"==e.type})[0];return R(r.mapRoute(e,n))}function U(e){"string"==typeof e?Emby.Models.item(e).then(U):t.getCurrentSkin().showItem(e)}function E(e){t.getCurrentSkin().setTitle(e)}function P(){var e=t.getCurrentSkin(),n=e.getRoutes().filter(function(e){return"video-osd"==e.type})[0];return R(r.mapRoute(e,n))}function q(e,n){a(e,L(n)),K.push(n)}function D(){return K}function N(e){"full"==e||e==Emby.TransparencyLevel.Full?(o.clear(!0),document.documentElement.classList.add("transparentDocument")):"backdrop"==e||e==Emby.TransparencyLevel.Backdrop?(o.externalBackdrop(!0),document.documentElement.classList.add("transparentDocument")):(o.externalBackdrop(!1),document.documentElement.classList.remove("transparentDocument"))}function A(e,n,t){e.navigate=!1,a.pushState(e,n,t)}function F(){var e=window.location.pathname.replace(k(),"");e.lastIndexOf("/")==e.length-1&&(e=e.substring(0,e.length-1)),a.base(e)}var G,H,z,V,W={showLocalLogin:function(e,n,t){var r=t?"manuallogin":"login";R("/startup/"+r+".html?serverid="+n)},showSelectServer:function(){R("/startup/selectserver.html")},showWelcome:function(){R("/startup/welcome.html")},showSettings:function(){R("/settings/settings.html")}},J={},j=(new Date).getTime(),Q=window.location.href.split("?")[0].replace(k(),"");Q=Q.split("#")[0],Q.lastIndexOf("/")==Q.length-1&&(Q=Q.substring(0,Q.length-1));var X,K=[];return F(),W.addRoute=q,W.param=x,W.back=I,W.show=R,W.start=h,W.baseUrl=C,W.canGoBack=M,W.current=O,W.beginConnectionWizard=c,W.goHome=T,W.showItem=U,W.setTitle=E,W.setTransparency=N,W.getRoutes=D,W.pushState=A,W.enableNativeHistory=g,W.showVideoOsd=P,W.TransparencyLevel={None:0,Backdrop:1,Full:2},W});