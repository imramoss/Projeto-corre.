/* =====================================================
   PROJETO CORRE
   SCRIPT.JS - PARTE 1
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       MENU MOBILE
    ========================================== */

    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");

    if (hamburger) {

        hamburger.addEventListener("click", () => {

            hamburger.classList.toggle("active");
            menu.classList.toggle("active");

        });

    }

    document.querySelectorAll(".menu a").forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("active");
            hamburger.classList.remove("active");

        });

    });

    /* ==========================================
       NAVBAR AO ROLAR
    ========================================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if(window.scrollY > 60){

            header.style.background = "rgba(5,5,5,.95)";
            header.style.boxShadow = "0 10px 35px rgba(0,0,0,.35)";

        }else{

            header.style.background = "rgba(5,5,5,.75)";
            header.style.boxShadow = "none";

        }

    });

    /* ==========================================
       SCROLL SUAVE
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const destino=document.querySelector(this.getAttribute("href"));

            if(destino){

                destino.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

});
/* =====================================================
   SCRIPT.JS - PARTE 2
   ANIMAÇÕES + CONTADORES + FAQ + BOTÃO TOPO
====================================================== */

/* ==========================================
   ANIMAÇÕES AO ROLAR
========================================== */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

document.querySelectorAll(
".benefit-card,.step-card,.plan-card,.testimonial,.faq-item,.hero-stats div"
).forEach(el=>{

    el.classList.add("fade-up");

    observer.observe(el);

});

/* ==========================================
   CONTADORES
========================================== */

const numeros=document.querySelectorAll(".numbers-grid h2");

const contadorObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const numero=entry.target;

const texto=numero.innerText;

const valor=parseInt(texto.replace(/\D/g,""));

const sufixo=texto.replace(/[0-9]/g,"");

let atual=0;

const incremento=Math.ceil(valor/120);

const atualizar=()=>{

atual+=incremento;

if(atual<valor){

numero.innerText=atual+sufixo;

requestAnimationFrame(atualizar);

}else{

numero.innerText=texto;

}

}

atualizar();

contadorObserver.unobserve(numero);

}

});

});

numeros.forEach(n=>contadorObserver.observe(n));

/* ==========================================
   BOTÃO VOLTAR AO TOPO
========================================== */

const botao=document.createElement("button");

botao.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

botao.className="topButton";

document.body.appendChild(botao);

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

botao.classList.add("showTop");

}else{

botao.classList.remove("showTop");

}

});

botao.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

/* ==========================================
   FAQ
========================================== */

document.querySelectorAll(".faq-item").forEach(item=>{

item.addEventListener("click",()=>{

item.classList.toggle("active");

});

});

/* ==========================================
   PARALLAX HERO
========================================== */

const heroImage=document.querySelector(".hero-right img");

window.addEventListener("mousemove",(e)=>{

if(!heroImage) return;

const x=(window.innerWidth/2-e.clientX)/45;

const y=(window.innerHeight/2-e.clientY)/45;

heroImage.style.transform=`translate(${x}px,${y}px)`;

});

/* ==========================================
   LOADER
========================================== */

window.addEventListener("load",()=>{

const loader=document.querySelector(".loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.remove();

},500);

}

});
