var FORM_URL="https://docs.google.com/forms/d/e/1FAIpQLSdaF4G4A-Uh_BewEIPwdRiF6quOQtsIWHT3nlm4aUW-WL_xyA/viewform", OWNER_EMAIL="Elimstaymactan1107@gmail.com", TITLE="Elim Stay Mactan", RATE=1990, MAX=4;
var PH=[
 {s:"images/IMG_5031.webp",t:"Bedroom with pillows in focus"},
 {s:"images/IMG_5034.webp",t:"Living room with a comfortable sofa"},
 {s:"images/IMG_5038.webp",t:"A closer look inside the condo"},
 {s:"images/IMG_5044.webp",t:"Bathroom with vanity and washing machine"},
 {s:"images/IMG_5085.webp",t:"Dining area"},
 {s:"images/IMG_5735.webp",t:"Kitchen area"},
 {s:"images/IMG_5796.webp",t:"Pool and buildings at Primeworld District"}
];
var AM=[
 ["M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M5 10V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3","Queen-size bed"],
 ["M6 3h12v18H6zM12 3v18","Clothes cabinet"],
 ["M3 5h18v5H3zM7 14l-1 4M12 14v4M17 14l1 4","Air conditioning"],
 ["M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 4 0","Bathroom with toiletries"],
 ["M5 9h14M7 9v10M17 9v10M9 5h6","Kitchen area"],
 ["M5 11h14v9H5zM8 11V8a4 4 0 0 1 8 0v3","Secure entry"],
 ["M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 20c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 4v9M14 4v9M8 7h6","Pool"],
 ["M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12","Gym"],
 ["M5 3h14v18H5zM12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8","Washing machine"],
 ["M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01","Wi-Fi"],
 ["M3 5h18v12H3zM8 21h8","TV"],
 ["M12 3s6 6 6 11a6 6 0 0 1-12 0c0-5 6-11 6-11z","Water and electricity"]
];
var $=function(id){return document.getElementById(id)};
function peso(n){return "₱"+Math.round(n).toLocaleString("en-PH")}
$("pr").textContent=peso(RATE);
AM.forEach(function(a){var li=document.createElement("li");li.innerHTML='<span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+a[0]+'"/></svg></span>';li.appendChild(document.createTextNode(a[1]));$("am").appendChild(li)});

var cur=0;
var lbBuilt=false;
function buildThumbs(){var t=$("lbThumbs");PH.forEach(function(p,i){var b=document.createElement("button");b.type="button";b.setAttribute("aria-label","Photo "+(i+1)+": "+p.t);var m=document.createElement("img");m.src=p.s;m.alt="";b.appendChild(m);b.addEventListener("click",function(){show(i)});t.appendChild(b)});lbBuilt=true}
function show(i){var n=PH.length,old=cur;cur=(i+n)%n;
  if(!lbBuilt)buildThumbs();
  var fig=document.querySelector(".lbfig"),dir=$("lb").open?(cur>old?1:cur<old?-1:0):0;
  $("lbImg").src=PH[cur].s;$("lbImg").alt=PH[cur].t;$("lbBg").src=PH[cur].s;
  $("lbCap").textContent=PH[cur].t;$("lbCount").textContent=(cur+1)+" / "+n;
  fig.style.setProperty("--dx",(dir*48)+"px");fig.classList.remove("go");void fig.offsetWidth;fig.classList.add("go");
  var th=$("lbThumbs").children;for(var k=0;k<th.length;k++)th[k].classList.toggle("on",k===cur);
  if(!$("lb").open){if($("lb").showModal)$("lb").showModal();else $("lb").setAttribute("open","")}
  try{th[cur].scrollIntoView({inline:"center",block:"nearest"})}catch(e){}}
function img(i){var m=document.createElement("img");m.src=PH[i].s;m.alt=PH[i].t;return m}
var si=0;
function slGo(i){var n=PH.length;si=(i+n)%n;var im=$("slImg");im.classList.add("out");
  setTimeout(function(){im.src=PH[si].s;im.alt=PH[si].t;im.classList.remove("out")},180);
  $("slCap").textContent=PH[si].t;$("slCount").textContent=(si+1)+" / "+n;
  var tb=$("slThumbs"),th=tb.children;for(var k=0;k<th.length;k++)th[k].classList.toggle("on",k===si);
  try{var b=th[si];tb.scrollTo({left:b.offsetLeft-(tb.clientWidth-b.offsetWidth)/2,behavior:"smooth"})}catch(e){}}
PH.forEach(function(p,i){var b=document.createElement("button");b.type="button";b.setAttribute("aria-label","Photo "+(i+1)+": "+p.t);var m=document.createElement("img");m.src=p.s;m.alt="";b.appendChild(m);b.addEventListener("click",function(){slGo(i)});$("slThumbs").appendChild(b)});
$("slImg").src=PH[0].s;slGo(0);
$("slPrev").addEventListener("click",function(){slGo(si-1)});
$("slNext").addEventListener("click",function(){slGo(si+1)});
$("slExp").addEventListener("click",function(){show(si)});
$("slImg").addEventListener("click",function(){show(si)});
var sx0=null;$("stage").addEventListener("touchstart",function(e){sx0=e.touches[0].clientX},{passive:true});
$("stage").addEventListener("touchend",function(e){if(sx0===null)return;var dx=e.changedTouches[0].clientX-sx0;if(Math.abs(dx)>50)slGo(si+(dx<0?1:-1));sx0=null});
$("h1").appendChild(img(0));$("h2").appendChild(img(1));
$("hero").style.backgroundImage="linear-gradient(100deg,rgba(52,30,22,.93) 0%,rgba(52,30,22,.8) 48%,rgba(52,30,22,.45) 100%),url(images/hero-buildings.jpg)";
$("h1").addEventListener("click",function(){show(0)});$("h2").addEventListener("click",function(){show(1)});
$("prev").addEventListener("click",function(){show(cur-1)});$("next").addEventListener("click",function(){show(cur+1)});
$("lbClose").addEventListener("click",function(){$("lb").close()});
$("lb").addEventListener("click",function(e){if(e.target===$("lb"))$("lb").close()});
$("lb").addEventListener("keydown",function(e){if(e.key==="ArrowRight")show(cur+1);if(e.key==="ArrowLeft")show(cur-1)});


/* interactive touches */
(function(){
var rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
$("sp").textContent=peso(RATE);
if(!rm){var t0=null;(function step(t){if(t0===null)t0=t;var k=Math.min((t-t0)/1100,1),e=1-Math.pow(1-k,3);$("pr").textContent=peso(RATE*e);if(k<1)requestAnimationFrame(step)})(performance.now())}
var els=[].slice.call(document.querySelectorAll(".head,.fact,.kc,.map,.slider,.mos button,.am li,.near div,.steps li,.rules li,.card,.book h2,.book p"));
if("IntersectionObserver" in window&&!rm){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var n=e.target;n.classList.add("in");io.unobserve(n);setTimeout(function(){n.style.transitionDelay="0s";n.classList.add("done")},1000)}})},{threshold:.12});
  els.forEach(function(n){n.classList.add("rv");var i=[].indexOf.call(n.parentNode.children,n);n.style.transitionDelay=Math.min(i,8)*.06+"s";io.observe(n)});
}
var hero=$("hero"),sb=$("sbar"),pg=$("prog"),tick=false;
function onScroll(){var y=window.scrollY||0,hb=hero.offsetHeight;
  sb.classList.toggle("on",y>hb-60);
  var max=document.documentElement.scrollHeight-window.innerHeight;pg.style.width=(max>0?y/max*100:0)+"%";
  if(!rm&&y<hb)hero.style.backgroundPosition="center "+Math.min(30+y*.05,80)+"%";
  tick=false}
window.addEventListener("scroll",function(){if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
var sx=null;
$("lbImg").addEventListener("touchstart",function(e){sx=e.touches[0].clientX},{passive:true});
$("lbImg").addEventListener("touchend",function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)show(cur+(dx<0?1:-1));sx=null});
})();

/* things to know dialog */
(function(){var d=$("kd");if(!d)return;
[].forEach.call(document.querySelectorAll(".more[data-d]"),function(b){b.addEventListener("click",function(){
  var t=document.getElementById("t-"+b.getAttribute("data-d"));$("kt").textContent=t.getAttribute("data-title");$("kb").innerHTML=t.innerHTML;
  if(d.showModal)d.showModal();else d.setAttribute("open","")})});
$("kx").addEventListener("click",function(){d.close()});
d.addEventListener("click",function(e){if(e.target===d)d.close()});})();
