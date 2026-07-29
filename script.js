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
