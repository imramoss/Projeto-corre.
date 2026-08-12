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

/* =====================================================
   PROJETO CORRE
   SCRIPT PRINCIPAL
===================================================== */


/* =====================================================
   VERIFICAÇÃO DE LOGIN
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const session = localStorage.getItem("correSession");

    const user = JSON.parse(
        localStorage.getItem("correUser") || "null"
    );


    /*
     * Se não estiver logado,
     * volta para a tela de login.
     */

    if (
        session !== "1" ||
        !user
    ) {

        window.location.href = "login.html";

        return;

    }


    /* =================================================
       DADOS DO USUÁRIO
    ================================================= */

    const userName =
        user.nome ||
        user.name ||
        "Corredor";


    /*
     * Nome no dashboard
     */

    const title =
        document.querySelector(".topbar h1");


    if (title) {

        title.innerHTML =
            `Olá, ${userName} 👋`;

    }


    /* =================================================
       BOTÃO SAIR
    ================================================= */

    const logoutButton =
        document.getElementById("logoutButton");


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Tem certeza que deseja sair da sua conta?"
                    );


                if (!confirmLogout) {

                    return;

                }


                /*
                 * Remove a sessão
                 */

                localStorage.removeItem(
                    "correSession"
                );


                /*
                 * Redireciona para login
                 */

                window.location.href =
                    "login.html";

            }
        );

    }



    /* =================================================
       AVATAR
    ================================================= */

    const avatar =
        document.querySelector(
            ".top-icons img"
        );


    if (avatar) {

        avatar.style.cursor = "pointer";


        avatar.addEventListener(
            "click",
            function () {

                window.location.href =
                    "perfil.html";

            }
        );

    }



    /* =================================================
       NOTIFICAÇÕES
    ================================================= */

    const notification =
        document.querySelector(
            ".top-icons .fa-bell"
        );


    if (notification) {

        notification.style.cursor = "pointer";


        notification.addEventListener(
            "click",
            function () {

                alert(
                    "🔔 Você não possui novas notificações."
                );

            }
        );

    }



    /* =================================================
       LINKS DO DASHBOARD
    ================================================= */

    const links =
        document.querySelectorAll(
            ".sidebar nav a"
        );


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                /*
                 * Remove ativo de todos
                 */

                links.forEach(function (item) {

                    item.classList.remove(
                        "active"
                    );

                });


                /*
                 * Marca o atual
                 */

                this.classList.add(
                    "active"
                );

            }
        );

    });



    /* =================================================
       TREINO DE HOJE
    ================================================= */

    const workoutCards =
        document.querySelectorAll(
            ".dash-card"
        );


    if (workoutCards.length > 0) {

        workoutCards[0].style.cursor =
            "pointer";


        workoutCards[0].addEventListener(
            "click",
            function () {

                window.location.href =
                    "treinos.html";

            }
        );

    }



    /* =================================================
       CARD DE EVOLUÇÃO
    ================================================= */

    if (workoutCards.length > 2) {

        workoutCards[2].style.cursor =
            "pointer";


        workoutCards[2].addEventListener(
            "click",
            function () {

                window.location.href =
                    "evolucao.html";

            }
        );

    }



    /* =================================================
       PRÓXIMA META
    ================================================= */

    if (workoutCards.length > 3) {

        workoutCards[3].style.cursor =
            "pointer";


        workoutCards[3].addEventListener(
            "click",
            function () {

                window.location.href =
                    "evolucao.html";

            }
        );

    }



    /* =================================================
       CALENDÁRIO
    ================================================= */

    const calendarLink =
        document.querySelector(
            ".calendar-card .card-header a"
        );


    if (calendarLink) {

        calendarLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                window.location.href =
                    "treinos.html";

            }
        );

    }



    /* =================================================
       CURSOS
    ================================================= */

    const coursesLink =
        document.querySelector(
            ".courses-card .card-header a"
        );


    if (coursesLink) {

        coursesLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                window.location.href =
                    "aulas.html";

            }
        );

    }



    /* =================================================
       CURSOS INDIVIDUAIS
    ================================================= */

    const courses =
        document.querySelectorAll(
            ".course"
        );


    courses.forEach(function (course) {

        course.style.cursor =
            "pointer";


        course.addEventListener(
            "click",
            function () {

                window.location.href =
                    "aulas.html";

            }
        );

    });



    /* =================================================
       CONQUISTAS
    ================================================= */

    const achievements =
        document.querySelectorAll(
            ".achievement"
        );


    achievements.forEach(function (achievement) {

        achievement.style.cursor =
            "pointer";


        achievement.addEventListener(
            "click",
            function () {

                window.location.href =
                    "evolucao.html";

            }
        );

    });



    /* =================================================
       ANIMAÇÃO DAS BARRAS
    ================================================= */

    const fills =
        document.querySelectorAll(
            ".progress .fill"
        );


    fills.forEach(function (fill) {

        const width =
            fill.style.width;


        fill.style.width = "0";


        setTimeout(function () {

            fill.style.width =
                width;

        }, 300);

    });



    /* =================================================
       LINKS "VER TUDO"
    ================================================= */

    document
        .querySelectorAll(
            'a[href="#"]'
        )
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                }
            );

        });

});



/* =====================================================
   PROTEÇÃO CONTRA VOLTAR APÓS LOGOUT
===================================================== */

window.addEventListener(
    "pageshow",
    function () {

        const session =
            localStorage.getItem(
                "correSession"
            );


        const user =
            localStorage.getItem(
                "correUser"
            );


        if (
            session !== "1" ||
            !user
        ) {

            /*
             * Só redireciona se estiver
             * em uma página protegida.
             */

            const currentPage =
                window.location.pathname;


            if (
                currentPage.includes(
                    "dashboard.html"
                )
            ) {

                window.location.href =
                    "login.html";

            }

        }

    }
);