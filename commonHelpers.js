import"./assets/modulepreload-polyfill-3cfb730f.js";import{f}from"./assets/vendor-77e16229.js";import h from"https://cdn.jsdelivr.net/npm/izitoast@1/+esm";const i=document.querySelector("#datetime-picker"),p=document.querySelector("span[data-days]"),S=document.querySelector("span[data-hours]"),y=document.querySelector("span[data-minutes]"),v=document.querySelector("span[data-seconds]"),o=document.querySelector("button[data-start]");let n;const b={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const c=Date.now(),e=t[0]-c;e<0&&e<0?(h.error({timeout:5e3,position:"topRight",title:"Error",message:"Please choose a date in the future"}),n=0,o.classList.remove("activ"),o.removeEventListener("click",u)):(o.classList.add("activ"),o.addEventListener("click",u),n=e)}};f(i,b);function g(t){const s=Math.floor(t/864e5),r=Math.floor(t%864e5/36e5),l=Math.floor(t%864e5%36e5/6e4),m=Math.floor(t%864e5%36e5%6e4/1e3);return{days:s,hours:r,minutes:l,seconds:m}}function D(t,c){const a=c(t);if(n){let e=a.days;e=String(e).padStart(2,0),p.textContent=e;let d=a.hours;d=String(d).padStart(2,0),S.textContent=d;let s=a.minutes;s=String(s).padStart(2,0),y.textContent=s;let r=a.seconds;r=String(r).padStart(2,0),v.textContent=r}}function u(){o.disabled=!0,i.disabled=!0,o.classList.remove("activ"),i.classList.add("disabled-hover");const t=setInterval(()=>{n<0?(clearInterval(t),i.disabled=!1,o.disabled=!1):(D(n,g),n-=1e3)},1e3)}
//# sourceMappingURL=commonHelpers.js.map
