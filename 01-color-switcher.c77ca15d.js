const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};let e=null;t.startBtn.addEventListener("click",(()=>{e=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.startBtn.disabled=!0}));t.stopBtn.addEventListener("click",(()=>{clearInterval(e),t.startBtn.disabled=!1}));
//# sourceMappingURL=01-color-switcher.c77ca15d.js.map
