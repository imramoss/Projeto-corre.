/* ============================================================
   PROJETO CORRE
   SCRIPT.JS
   Sistema principal
============================================================ */


/* ============================================================
   BANCO LOCAL
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


/* ============================================================
   LOGOUT
============================================================ */

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

window.logout = logout;


/* ============================================================
   PÁGINAS PROTEGIDAS
============================================================ */

const protectedPages = [

    "painel.html",
    "treinos.html",
    "aulas.html",
    "evolucao.html",
    "perfil.html"

];


function getCurrentPage() {

    return window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

}


function protectPage() {

    const page = getCurrentPage();

    if (
        protectedPages.includes(page) &&
        !isLoggedIn()
    ) {

        window.location.replace("login.html");

        return false;

    }

    return true;

}


/* ============================================================
   DOM
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ====================================================
           PROTEÇÃO
        ==================================================== */

        if (!protectPage()) {

            return;

        }


        /* ====================================================
           MENU MOBILE
        ==================================================== */

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


        /* ====================================================
           HEADER
        ==================================================== */

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


        /* ====================================================
           SCROLL SUAVE
        ==================================================== */

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


        /* ====================================================
           FAQ
        ==================================================== */

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


        /* ====================================================
           LOGIN
        ==================================================== */

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

                        error.style.display = "none";

                        error.innerHTML = "";

                    }


                    if (!email || !senha) {

                        if (error) {

                            error.innerHTML =
                                "Preencha o e-mail e a senha.";

                            error.style.display =
                                "block";

                        }

                        return;

                    }


                    const users =
                        getUsers();


                    const user =
                        users.find(
                            function (item) {

                                return (
                                    item.email &&
                                    item.email
                                        .toLowerCase() ===
                                    email
                                );

                            }
                        );


                    if (!user) {

                        if (error) {

                            error.innerHTML =
                                "Este e-mail não está cadastrado.";

                            error.style.display =
                                "block";

                        }

                        return;

                    }


                    if (user.password !== senha) {

                        if (error) {

                            error.innerHTML =
                                "A senha está incorreta.";

                            error.style.display =
                                "block";

                        }

                        return;

                    }


                    /* ================================
                       CRIA SESSÃO
                    ================================= */

                    localStorage.setItem(
                        "correUser",
                        JSON.stringify(user)
                    );

                    localStorage.setItem(
                        "correSession",
                        "1"
                    );


                    window.location.href =
                        "painel.html";

                }
            );

        }


        /* ====================================================
           LOGIN GOOGLE
        ==================================================== */

        window.loginGoogle =
            function () {

                alert(
                    "O login com Google ainda não está conectado. " +
                    "Utilize seu e-mail e senha."
                );

            };


        /* ====================================================
           CADASTRO
        ==================================================== */

        const signupForm =
            document.getElementById("signupForm");


        if (signupForm) {


            const togglePassword =
                document.getElementById(
                    "togglePassword"
                );


            const passwordInput =
                document.getElementById(
                    "password"
                );


            /* ================================================
               MOSTRAR SENHA
            ================================================ */

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


            /* ================================================
               CADASTRAR
            ================================================ */

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


                    /*
                       IMPORTANTE:
                       O ID correto é aceiteTermos
                    */

                    const terms =
                        document
                            .getElementById(
                                "aceiteTermos"
                            )
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


                    /* ========================================
                       NOME
                    ======================================== */

                    if (
                        !name ||
                        name.length < 3
                    ) {

                        showError(
                            "Digite seu nome completo."
                        );

                        return;

                    }


                    /* ========================================
                       E-MAIL
                    ======================================== */

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


                    /* ========================================
                       SENHA
                    ======================================== */

                    if (
                        !password ||
                        password.length < 6
                    ) {

                        showError(
                            "A senha precisa ter pelo menos 6 caracteres."
                        );

                        return;

                    }


                    /* ========================================
                       CONFIRMAR SENHA
                    ======================================== */

                    if (
                        password !==
                        confirmPassword
                    ) {

                        showError(
                            "As senhas não são iguais."
                        );

                        return;

                    }


                    /* ========================================
                       TERMOS
                    ======================================== */

                    if (!terms) {

                        showError(
                            "Você precisa aceitar os termos para continuar."
                        );

                        return;

                    }


                    /* ========================================
                       USUÁRIOS EXISTENTES
                    ======================================== */

                    const users =
                        getUsers();


                    const existingUser =
                        users.find(
                            function (user) {

                                return (
                                    user.email &&
                                    user.email
                                        .toLowerCase() ===
                                    email
                                );

                            }
                        );


                    if (existingUser) {

                        showError(
                            "Este e-mail já possui uma conta. Entre com ela."
                        );

                        return;

                    }


                    /* ========================================
                       NOVO USUÁRIO
                    ======================================== */

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
                            new Date()
                                .toISOString(),

                        plan:
                            "free",

                        avatar:
                            "",

                        goal:
                            "5 km",

                        totalKm:
                            0,

                        workouts:
                            0,

                        classes:
                            0

                    };


                    /* ========================================
                       SALVA DEFINITIVAMENTE
                    ======================================== */

                    users.push(
                        newUser
                    );

                    saveUsers(
                        users
                    );


                    /* ========================================
                       LOGIN AUTOMÁTICO
                    ======================================== */

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


                    showSuccess(
                        "Conta criada com sucesso! Entrando..."
                    );


                    setTimeout(
                        function () {

                            window.location.href =
                                "painel.html";

                        },
                        700
                    );

                }
            );

        }


        /* ====================================================
           PÁGINAS LOGADAS
        ==================================================== */

        if (isLoggedIn()) {

            const user =
                getCurrentUser();


            if (!user) {

                return;

            }


            const userName =
                user.nome ||
                user.name ||
                "Corredor";


            /* ================================================
               NOME
            ================================================ */

            document
                .querySelectorAll(
                    "[data-user-name]"
                )
                .forEach(function (element) {

                    element.textContent =
                        userName;

                });


            /* ================================================
               EMAIL
            ================================================ */

            document
                .querySelectorAll(
                    "[data-user-email]"
                )
                .forEach(function (element) {

                    element.textContent =
                        user.email || "";

                });


            /* ================================================
               BOTÃO LOGOUT
            ================================================ */

            document
                .querySelectorAll(
                    "#logoutButton, [data-logout]"
                )
                .forEach(function (button) {

                    button.addEventListener(
                        "click",
                        logout
                    );

                });


            /* ================================================
               NAVEGAÇÃO
            ================================================ */

            document
                .querySelectorAll(
                    "[data-page]"
                )
                .forEach(function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            const page =
                                this.dataset.page;

                            if (page) {

                                window.location.href =
                                    page;

                            }

                        }
                    );

                });


            /* ================================================
               PÁGINA ATIVA
            ================================================ */

            const currentPage =
                getCurrentPage();


            document
                .querySelectorAll(
                    "[data-page]"
                )
                .forEach(function (link) {

                    if (
                        link.dataset.page ===
                        currentPage
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });


            /* ================================================
               AVATAR
            ================================================ */

            const avatar =
                document.querySelector(
                    "[data-user-avatar]"
                );


            if (avatar) {

                if (user.avatar) {

                    avatar.src =
                        user.avatar;

                } else {

                    avatar.src =
                        "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(
                            userName
                        ) +
                        "&background=A3FF12&color=080808";

                }

            }


            /* ================================================
               LINKS ANTIGOS
            ================================================ */

            document
                .querySelectorAll(
                    'a[href="dashboard.html"]'
                )
                .forEach(function (link) {

                    link.setAttribute(
                        "href",
                        "painel.html"
                    );

                });


            /* ================================================
               NOME DO TOPO ANTIGO
            ================================================ */

            const title =
                document.querySelector(
                    ".topbar h1"
                );


            if (
                title &&
                !title.hasAttribute(
                    "data-user-name"
                )
            ) {

                title.innerHTML =
                    `Olá, ${userName} 👋`;

            }

        }


    }

);


/* ============================================================
   VOLTAR AO PAINEL SE USUÁRIO TENTAR ABRIR LOGIN/CADASTRO
============================================================ */

window.addEventListener(
    "pageshow",
    function () {

        const page =
            getCurrentPage();


        if (
            (
                page === "login.html" ||
                page === "cadastro.html"
            ) &&
            isLoggedIn()
        ) {

            /*
               Não bloqueia totalmente o cadastro,
               mas permite entrar no painel.
            */

        }


        if (
            protectedPages.includes(page) &&
            !isLoggedIn()
        ) {

            window.location.replace(
                "login.html"
            );

        }

    }
);