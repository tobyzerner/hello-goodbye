function t(t,e,n={}){const s=new WeakMap,r=a(n);t instanceof HTMLCollection&&(t=Array.from(t)),t.forEach((t=>{s.set(t,t.getBoundingClientRect())})),e(),t.forEach((t=>{const e=s.get(t),n=e.top-t.getBoundingClientRect().top,a=e.left-t.getBoundingClientRect().left,c=t.style;c.transitionDuration="0s",c.transform=`translate(${a}px, ${n}px)`,i((()=>{t.classList.add(r+"move"),c.transitionDuration=c.transform="",o(t,(()=>{t.classList.remove(r+"move")}))}))}))}function e(t,e,n={}){const s=a(n);t.classList.add(s+e+"-active"),t.classList.add(s+e+"-from"),t.classList.remove(s+"move"),i((()=>{t.classList.add(s+e+"-to"),t.classList.remove(s+e+"-from"),o(t,(()=>{t.classList.remove(s+e+"-active"),t.classList.remove(s+e+"-to"),n.finish&&n.finish()}))}))}function n(t,n={}){e(t,"enter",n)}function s(t,n={}){e(t,"leave",n)}function i(t){requestAnimationFrame((()=>{requestAnimationFrame(t)}))}function o(t,e){if(getComputedStyle(t).transitionDuration.startsWith("0s"))e();else{const n=()=>{e(),t.removeEventListener("transitionend",n)};t.addEventListener("transitionend",n)}}function a(t){return t.classPrefix?t.classPrefix+"-":""}export{e as animate,s as goodbye,n as hello,t as move};
