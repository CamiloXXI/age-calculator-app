parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"H99C":[function(require,module,exports) {
var e=document,t=e.getElementById("calculate"),n=(new Date).getFullYear(),a=(new Date).getDate(),o=(new Date).toLocaleString("es-ES",{month:"long"});function r(){var e=l({day:document.getElementById("day").value,month:document.getElementById("month").value,year:document.getElementById("year").value});c(e),d(e)}function l(e){var t=e.day,n=e.month,a=e.year;"string"==typeof t&&(t=parseInt(t,10)),"string"==typeof n&&(n=parseInt(n,10)),"string"==typeof a&&(a=parseInt(a,10));var o=!1;return a<2023?o=!0:2023===a&&n<=12&&n>=1&&(o=2===n?t<=28||!(29!==t||!function(e){return e%4==0&&e%100!=0||e%400==0}(a)):!!([1,3,5,7,8,10,12].includes(n)&&t>=1&&t<=31)||!!([4,6,9,11].includes(n)&&t>=1&&t<=30)),{day:t,month:n,year:a,conditionsMet:o}}function d(t){t.conditionsMet?(e.textContent="Las condiciones se cumplen.",e.getElementById("verified").classList.remove("error")):(e.querySelectorAll(".hide-content").forEach(function(e){e.style.display="block",e.classList.add("error")}),e.querySelectorAll("label").forEach(function(e){e.classList.add("error"),e.firstElementChild.classList.add("error-border")}),e.querySelectorAll(".no-valid-format").forEach(function(e){e.textContent="- -"}))}function c(t){var n=t.day,a=t.month,o=t.year,r=new Date,l=new Date(o,a-1,n),d=new Date(r-l),c=d.getUTCFullYear()-1970,s=d.getUTCMonth(),i=d.getUTCDate()-1;console.log("La edad del usuario es:",c,"años,",s,"meses y",i,"días."),e.getElementById("days").textContent=i,e.getElementById("months").textContent=s,e.getElementById("years").textContent=c}t.addEventListener("click",function(e){e.preventDefault(),alert("click"),r()});
},{}]},{},["H99C"], null)
//# sourceMappingURL=/src.3de326b6.js.map