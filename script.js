/* ============================================================
   PROJETO CORRE
   SCRIPT.JS
   Sistema principal do site
============================================================ */


/* ============================================================
   FUNÇÕES GERAIS
============================================================ */

function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem("correUsers") || "[]"
        );

    } catch (error) {

        console.error("Erro ao carregar usuários:", error);

        return [];

    }

}


function saveUsers(users) {

    localStorage.setItem(
        "correUsers",
        JSON.stringify(users)
    );

}


function getCurrentUser() {

    try {

        return JSON.parse(
            localStorage.getItem("correUser") || "null"
        );

    } catch (error) {

        return null;

    }

}


function isLoggedIn() {

    return (
        localStorage.getItem("correSession") === "1" &&
        getCurrentUser() !== null
    );

}


function logout() {

    const confirmLogout = confirm(
        "Tem certeza que deseja sair da sua conta?"
    );

    if (!confirmLogout) {

        return;

    }

    localStorage.removeItem("correSession");
    localStorage.removeItem("correUser");

    window.location.href = "login.html";

}


/* ============================================================
   INICIALIZAÇÃO
============================================================ */

document.addEventListener("DOMContentLoaded", function () {


    /* ========================================================
       MENU MOBILE
    ======================================================== */

    const hamburger =
        document.querySelector(".hamburger");

    const menu =
        document.querySelector(".menu");

    if (hamburger && menu) {

        hamburger.addEventListener(
            "click",
            function () {

                hamburger.classList.toggle("active");

                menu.classList.toggle("active");

            }
        );

        document
            .querySelectorAll(".menu a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        menu.classList.remove("active");

                        hamburger.classList.remove("active");

                    }
                );

            });

    }


    /* ========================================================
       NAVBAR AO ROLAR
    ======================================================== */

    const header =
        document.querySelector("header");

    if (header) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 60) {

                    header.style.background =
                        "rgba(5,5,5,.95)";

                    header.style.boxShadow =
                        "0 10px 35px rgba(0,0,0,.35)";

                } else {

                    header.style.background =
                        "rgba(5,5,5,.75)";

                    header.style.boxShadow =
                        "none";

                }

            }
        );

    }


    /* ========================================================
       SCROLL SUAVE
    ======================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (anchor) {

            anchor.addEventListener(
                "click",
                function (event) {

                    const href =
                        this.getAttribute("href");

                    if (
                        !href ||
                        href === "#"
                    ) {

                        return;

                    }

                    const destino =
                        document.querySelector(href);

                    if (destino) {

                        event.preventDefault();

                        destino.scrollIntoView({

                            behavior: "smooth"

                        });

                    }

                }
            );

        });


    /* ========================================================
       FAQ
    ======================================================== */

    document
        .querySelectorAll(".faq-question")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const item =
                        this.closest(".faq-item");

                    if (!item) {

                        return;

                    }

                    document
                        .querySelectorAll(".faq-item")
                        .forEach(function (other) {

                            if (other !== item) {

                                other.classList.remove(
                                    "active"
                                );

                            }

                        });

                    item.classList.toggle(
                        "active"
                    );

                }
            );

        });


    /* ========================================================
       ANIMAÇÕES
    ======================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".benefit-card," +
            ".step-card," +
            ".plan-card," +
            ".testimonial," +
            ".faq-item," +
            ".hero-stats div"
        );

    if (
        animatedElements.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );

        animatedElements.forEach(
            function (element) {

                element.classList.add(
                    "fade-up"
                );

                observer.observe(
                    element
                );

            }
        );

    }


    /* ========================================================
       CONTADORES
    ======================================================== */

    const numeros =
        document.querySelectorAll(
            ".numbers-grid h2"
        );

    if (
        numeros.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const contadorObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }

                            const numero =
                                entry.target;

                            const texto =
                                numero.innerText;

                            const valor =
                                parseInt(
                                    texto.replace(
                                        /\D/g,
                                        ""
                                    )
                                );

                            if (
                                isNaN(valor)
                            ) {

                                return;

                            }

                            const sufixo =
                                texto.replace(
                                    /[0-9]/g,
                                    ""
                                );

                            let atual = 0;

                            const incremento =
                                Math.max(
                                    1,
                                    Math.ceil(
                                        valor / 120
                                    )
                                );

                            function atualizar() {

                                atual += incremento;

                                if (
                                    atual < valor
                                ) {

                                    numero.innerText =
                                        atual +
                                        sufixo;

                                    requestAnimationFrame(
                                        atualizar
                                    );

                                } else {

                                    numero.innerText =
                                        texto;

                                }

                            }

                            atualizar();

                            contadorObserver.unobserve(
                                numero
                            );

                        }
                    );

                },
                {
                    threshold: 0.5
                }
            );

        numeros.forEach(
            function (numero) {

                contadorObserver.observe(
                    numero
                );

            }
        );

    }


    /* ========================================================
       BOTÃO VOLTAR AO TOPO
    ======================================================== */

    const topButton =
        document.createElement("button");

    topButton.innerHTML =
        '<i class="fa-solid fa-arrow-up"></i>';

    topButton.className =
        "topButton";

    topButton.setAttribute(
        "aria-label",
        "Voltar ao topo"
    );

    document.body.appendChild(
        topButton
    );

    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 500
            ) {

                topButton.classList.add(
                    "showTop"
                );

            } else {

                topButton.classList.remove(
                    "showTop"
                );

            }

        }
    );

    topButton.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    /* ========================================================
       PARALLAX DO HERO
    ======================================================== */

    const heroImage =
        document.querySelector(
            ".hero-right img"
        );

    if (heroImage) {

        window.addEventListener(
            "mousemove",
            function (event) {

                const x =
                    (
                        window.innerWidth / 2 -
                        event.clientX
                    ) / 45;

                const y =
                    (
                        window.innerHeight / 2 -
                        event.clientY
                    ) / 45;

                heroImage.style.transform =
                    `translate(${x}px, ${y}px)`;

            }
        );

    }


    /* ========================================================
       LOADER
    ======================================================== */

    const loader =
        document.querySelector(".loader");

    if (loader) {

        window.addEventListener(
            "load",
            function () {

                loader.style.opacity = "0";

                setTimeout(
                    function () {

                        loader.remove();

                    },
                    500
                );

            }
        );

    }


    /* ========================================================
       PÁGINA DE LOGIN
    ======================================================== */

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const emailInput =
                    document.getElementById("email");

                const senhaInput =
                    document.getElementById("senha");

                const error =
                    document.getElementById("error");

                const email =
                    emailInput
                        ? emailInput.value
                            .trim()
                            .toLowerCase()
                        : "";

                const senha =
                    senhaInput
                        ? senhaInput.value
                        : "";


                if (error) {

                    error.style.display =
                        "none";

                    error.innerHTML = "";

                }


                /* --------------------------------------------
                   VALIDA CAMPOS
                -------------------------------------------- */

                if (
                    !email ||
                    !senha
                ) {

                    if (error) {

                        error.innerHTML =
                            "Preencha o e-mail e a senha.";

                        error.style.display =
                            "block";

                    }

                    return;

                }


                /* --------------------------------------------
                   BUSCA USUÁRIO
                -------------------------------------------- */

                const users =
                    getUsers();

                const user =
                    users.find(
                        function (item) {

                            return (
                                item.email
                                    .toLowerCase() ===
                                email
                            );

                        }
                    );


                /* --------------------------------------------
                   E-MAIL NÃO CADASTRADO
                -------------------------------------------- */

                if (!user) {

                    if (error) {

                        error.innerHTML =
                            "Este e-mail não está cadastrado. " +
                            "Crie uma conta gratuitamente para continuar.";

                        error.style.display =
                            "block";

                    }

                    return;

                }


                /* --------------------------------------------
                   SENHA INCORRETA
                -------------------------------------------- */

                if (
                    user.password !==
                    senha
                ) {

                    if (error) {

                        error.innerHTML =
                            "A senha está incorreta. " +
                            "Confira sua senha e tente novamente.";

                        error.style.display =
                            "block";

                    }

                    return;

                }


                /* --------------------------------------------
                   LOGIN CORRETO
                -------------------------------------------- */

                localStorage.setItem(
                    "correUser",
                    JSON.stringify(user)
                );

                localStorage.setItem(
                    "correSession",
                    "1"
                );


                window.location.href =
                    "dashboard.html";

            }
        );

    }


    /* ========================================================
       LOGIN COM GOOGLE
    ======================================================== */

    window.loginGoogle =
        function () {

            alert(
                "O login com Google ainda não está conectado. " +
                "Por enquanto, utilize seu e-mail e senha cadastrados."
            );

        };


    /* ========================================================
       PÁGINA DE CADASTRO
    ======================================================== */

    const signupForm =
        document.getElementById(
            "signupForm"
        );

    if (signupForm) {

        const togglePassword =
            document.getElementById(
                "togglePassword"
            );

        const passwordInput =
            document.getElementById(
                "password"
            );


        /* --------------------------------------------
           MOSTRAR / ESCONDER SENHA
        -------------------------------------------- */

        if (
            togglePassword &&
            passwordInput
        ) {

            togglePassword.addEventListener(
                "click",
                function () {

                    if (
                        passwordInput.type ===
                        "password"
                    ) {

                        passwordInput.type =
                            "text";

                        this.innerHTML =
                            '<i class="fa-solid fa-eye-slash"></i>';

                    } else {

                        passwordInput.type =
                            "password";

                        this.innerHTML =
                            '<i class="fa-solid fa-eye"></i>';

                    }

                }
            );

        }


        /* --------------------------------------------
           FORMULÁRIO DE CADASTRO
        -------------------------------------------- */

        signupForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        ?.value
                        .trim();


                const email =
                    document
                        .getElementById("email")
                        ?.value
                        .trim()
                        .toLowerCase();


                const password =
                    document
                        .getElementById("password")
                        ?.value;


                const confirmPassword =
                    document
                        .getElementById(
                            "confirmPassword"
                        )
                        ?.value;


                const terms =
                    document
                        .getElementById("terms")
                        ?.checked;


                const message =
                    document.getElementById(
                        "message"
                    );


                function showError(text) {

                    if (!message) {

                        return;

                    }

                    message.className =
                        "message error";

                    message.innerHTML =
                        '<i class="fa-solid fa-circle-exclamation"></i> ' +
                        text;

                }


                function showSuccess(text) {

                    if (!message) {

                        return;

                    }

                    message.className =
                        "message success";

                    message.innerHTML =
                        '<i class="fa-solid fa-circle-check"></i> ' +
                        text;

                }


                /* ----------------------------------------
                   VALIDA NOME
                ---------------------------------------- */

                if (
                    !name ||
                    name.length < 3
                ) {

                    showError(
                        "Digite seu nome completo."
                    );

                    return;

                }


                /* ----------------------------------------
                   VALIDA E-MAIL
                ---------------------------------------- */

                const emailRegex =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (
                    !email ||
                    !emailRegex.test(email)
                ) {

                    showError(
                        "Digite um e-mail válido."
                    );

                    return;

                }


                /* ----------------------------------------
                   VALIDA SENHA
                ---------------------------------------- */

                if (
                    !password ||
                    password.length < 6
                ) {

                    showError(
                        "A senha precisa ter pelo menos 6 caracteres."
                    );

                    return;

                }


                /* ----------------------------------------
                   CONFIRMA SENHA
                ---------------------------------------- */

                if (
                    password !==
                    confirmPassword
                ) {

                    showError(
                        "As senhas não são iguais."
                    );

                    return;

                }


                /* ----------------------------------------
                   TERMOS
                ---------------------------------------- */

                if (!terms) {

                    showError(
                        "Você precisa aceitar os termos para continuar."
                    );

                    return;

                }


                /* ----------------------------------------
                   BUSCA USUÁRIOS EXISTENTES
                ---------------------------------------- */

                const users =
                    getUsers();


                const existingUser =
                    users.find(
                        function (user) {

                            return (
                                user.email
                                    .toLowerCase() ===
                                email
                            );

                        }
                    );


                /* ----------------------------------------
                   E-MAIL JÁ EXISTENTE
                ---------------------------------------- */

                if (existingUser) {

                    showError(
                        "Este e-mail já possui uma conta. " +
                        "Entre com sua conta existente."
                    );

                    return;

                }


                /* ----------------------------------------
                   CRIA NOVO USUÁRIO
                ---------------------------------------- */

                const newUser = {

                    id:
                        Date.now(),

                    name:
                        name,

                    nome:
                        name,

                    email:
                        email,

                    password:
                        password,

                    createdAt:
                        new Date().toISOString(),

                    plan:
                        "free"

                };


                /* ----------------------------------------
                   ADICIONA À BASE LOCAL
                ---------------------------------------- */

                users.push(
                    newUser
                );

                saveUsers(
                    users
                );


                /* ----------------------------------------
                   CRIA SESSÃO
                ---------------------------------------- */

                localStorage.setItem(
                    "correUser",
                    JSON.stringify(
                        newUser
                    )
                );

                localStorage.setItem(
                    "correSession",
                    "1"
                );


                /* ----------------------------------------
                   MENSAGEM
                ---------------------------------------- */

                showSuccess(
                    "Conta criada com sucesso! " +
                    "Entrando no seu painel..."
                );


                /* ----------------------------------------
                   REDIRECIONA
                ---------------------------------------- */

                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    1000
                );

            }
        );

    }


    /* ========================================================
       PROTEÇÃO DAS PÁGINAS DO PAINEL
    ======================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const protectedPages = [

        "dashboard.html",
        "treinos.html",
        "cursos.html",
        "aulas.html",
        "desafios.html",
        "perfil.html",
        "evolucao.html"

    ];


    if (
        protectedPages.includes(
            currentPage
        )
    ) {

        if (!isLoggedIn()) {

            window.location.href =
                "login.html";

            return;

        }

    }


    /* ========================================================
       DADOS DO USUÁRIO NO PAINEL
    ======================================================== */

    if (
        isLoggedIn() &&
        protectedPages.includes(
            currentPage
        )
    ) {

        const user =
            getCurrentUser();


        const userName =
            user.nome ||
            user.name ||
            "Corredor";


        /* --------------------------------------------
           NOME DO USUÁRIO
        -------------------------------------------- */

        const title =
            document.querySelector(
                ".topbar h1"
            );

        if (title) {

            title.innerHTML =
                `Olá, ${userName} 👋`;

        }


        /* --------------------------------------------
           AVATAR
        -------------------------------------------- */

        const avatar =
            document.querySelector(
                ".top-icons img"
            );

        if (avatar) {

            avatar.style.cursor =
                "pointer";

            avatar.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "perfil.html";

                }
            );

        }


        /* --------------------------------------------
           NOTIFICAÇÕES
        -------------------------------------------- */

        const notification =
            document.querySelector(
                ".top-icons .fa-bell"
            );

        if (notification) {

            notification.style.cursor =
                "pointer";

            notification.addEventListener(
                "click",
                function () {

                    alert(
                        "🔔 Você não possui novas notificações."
                    );

                }
            );

        }


        /* ====================================================
           BOTÃO SAIR
        ==================================================== */

        const logoutButton =
            document.getElementById(
                "logoutButton"
            );

        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                logout
            );

        }


        /* ====================================================
           SIDEBAR
        ==================================================== */

        const sidebarLinks =
            document.querySelectorAll(
                ".sidebar nav a"
            );

        sidebarLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        sidebarLinks.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );

                        this.classList.add(
                            "active"
                        );

                    }
                );

            }
        );


        /* ====================================================
           CARDS DO DASHBOARD
        ==================================================== */

        const dashCards =
            document.querySelectorAll(
                ".dash-card"
            );


        /* TREINO */

        if (
            dashCards[0]
        ) {

            dashCards[0].style.cursor =
                "pointer";

            dashCards[0].addEventListener(
                "click",
                function () {

                    window.location.href =
                        "treinos.html";

                }
            );

        }


        /* DISTÂNCIA */

        if (
            dashCards[2]
        ) {

            dashCards[2].style.cursor =
                "pointer";

            dashCards[2].addEventListener(
                "click",
                function () {

                    window.location.href =
                        "evolucao.html";

                }
            );

        }


        /* META */

        if (
            dashCards[3]
        ) {

            dashCards[3].style.cursor =
                "pointer";

            dashCards[3].addEventListener(
                "click",
                function () {

                    window.location.href =
                        "evolucao.html";

                }
            );

        }


        /* ====================================================
           CALENDÁRIO
        ==================================================== */

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


        /* ====================================================
           CURSOS
        ==================================================== */

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
                        "cursos.html";

                }
            );

        }


        const courses =
            document.querySelectorAll(
                ".course"
            );

        courses.forEach(
            function (course) {

                course.style.cursor =
                    "pointer";

                course.addEventListener(
                    "click",
                    function () {

                        window.location.href =
                            "aulas.html";

                    }
                );

            }
        );


        /* ====================================================
           CONQUISTAS
        ==================================================== */

        const achievements =
            document.querySelectorAll(
                ".achievement"
            );

        achievements.forEach(
            function (achievement) {

                achievement.style.cursor =
                    "pointer";

                achievement.addEventListener(
                    "click",
                    function () {

                        window.location.href =
                            "desafios.html";

                    }
                );

            }
        );


        /* ====================================================
           BARRAS DE EVOLUÇÃO
        ==================================================== */

        const fills =
            document.querySelectorAll(
                ".progress .fill"
            );

        fills.forEach(
            function (fill) {

                const width =
                    fill.style.width;

                fill.style.width =
                    "0";

                setTimeout(
                    function () {

                        fill.style.width =
                            width;

                    },
                    300
                );

            }
        );

    }


});


/* ============================================================
   PROTEÇÃO CONTRA VOLTAR AO PAINEL APÓS LOGOUT
============================================================ */

window.addEventListener(
    "pageshow",
    function () {

        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        const protectedPages = [

            "dashboard.html",
            "treinos.html",
            "cursos.html",
            "aulas.html",
            "desafios.html",
            "perfil.html",
            "evolucao.html"

        ];


        if (
            protectedPages.includes(
                currentPage
            )
        ) {

            if (!isLoggedIn()) {

                window.location.replace(
                    "login.html"
                );

            }

        }

    }
);


/* ============================================================
   DISPONIBILIZA LOGOUT GLOBALMENTE
============================================================ */

window.logout =
    logout;