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


       /* ========================================================
   PÁGINA DE CADASTRO
======================================================== */

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    const togglePassword =
        document.getElementById("togglePassword");

    const passwordInput =
        document.getElementById("password");

    const confirmPasswordInput =
        document.getElementById("confirmPassword");

    const aceiteTermos =
        document.getElementById("aceiteTermos");

    const btnSubmit =
        document.getElementById("btnSubmit");

    const message =
        document.getElementById("message");


    /* ====================================================
       BOTÃO INICIALMENTE DESABILITADO
    ==================================================== */

    if (btnSubmit) {
        btnSubmit.disabled = true;
    }


    /* ====================================================
       ATIVAR BOTÃO AO ACEITAR TERMOS
    ==================================================== */

    if (aceiteTermos && btnSubmit) {

        aceiteTermos.addEventListener(
            "change",
            function () {

                btnSubmit.disabled =
                    !this.checked;

            }
        );

    }


    /* ====================================================
       MOSTRAR / ESCONDER SENHA
    ==================================================== */

    if (togglePassword && passwordInput) {

        togglePassword.addEventListener(
            "click",
            function () {

                if (
                    passwordInput.type === "password"
                ) {

                    passwordInput.type = "text";

                    this.innerHTML =
                        '<i class="fa-solid fa-eye-slash"></i>';

                    this.setAttribute(
                        "aria-label",
                        "Esconder senha"
                    );

                } else {

                    passwordInput.type = "password";

                    this.innerHTML =
                        '<i class="fa-solid fa-eye"></i>';

                    this.setAttribute(
                        "aria-label",
                        "Mostrar senha"
                    );

                }

            }
        );

    }


    /* ====================================================
       FUNÇÃO DE MENSAGEM
    ==================================================== */

    function showError(text) {

        if (!message) {
            return;
        }

        message.className =
            "message error";

        message.innerHTML =
            '<i class="fa-solid fa-circle-exclamation"></i> ' +
            text;

        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

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


    /* ====================================================
       SUBMIT DO CADASTRO
    ==================================================== */

    signupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* =================================================
               CAPTURA OS CAMPOS
            ================================================= */

            const nameInput =
                document.getElementById("name");

            const emailInput =
                document.getElementById("email");


            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";


            const email =
                emailInput
                    ? emailInput.value
                        .trim()
                        .toLowerCase()
                    : "";


            const password =
                passwordInput
                    ? passwordInput.value
                    : "";


            const confirmPassword =
                confirmPasswordInput
                    ? confirmPasswordInput.value
                    : "";


            const termsAccepted =
                aceiteTermos
                    ? aceiteTermos.checked
                    : false;


            /* =================================================
               VALIDA NOME
            ================================================= */

            if (
                !name ||
                name.length < 3
            ) {

                showError(
                    "Digite seu nome completo."
                );

                return;

            }


            /* =================================================
               VALIDA E-MAIL
            ================================================= */

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


            /* =================================================
               VALIDA SENHA
            ================================================= */

            if (
                !password ||
                password.length < 6
            ) {

                showError(
                    "A senha precisa ter pelo menos 6 caracteres."
                );

                return;

            }


            /* =================================================
               CONFIRMA SENHA
            ================================================= */

            if (
                password !== confirmPassword
            ) {

                showError(
                    "As senhas não são iguais."
                );

                return;

            }


            /* =================================================
               TERMOS
            ================================================= */

            if (!termsAccepted) {

                showError(
                    "Você precisa aceitar os Termos de Uso para continuar."
                );

                return;

            }


            /* =================================================
               CARREGA USUÁRIOS EXISTENTES
            ================================================= */

            let users = getUsers();


            if (!Array.isArray(users)) {
                users = [];
            }


            /* =================================================
               VERIFICA E-MAIL EXISTENTE
            ================================================= */

            const existingUser =
                users.find(
                    function (user) {

                        return (
                            user &&
                            user.email &&
                            user.email
                                .toLowerCase()
                                .trim() === email
                        );

                    }
                );


            if (existingUser) {

                showError(
                    "Este e-mail já possui uma conta. " +
                    "Entre com sua conta existente."
                );

                return;

            }


            /* =================================================
               CRIA USUÁRIO
            ================================================= */

            const newUser = {

                id:
                    Date.now().toString(),

                name:
                    name,

                nome:
                    name,

                email:
                    email,

                password:
                    password,

                plan:
                    "free",

                createdAt:
                    new Date().toISOString(),

                /* DADOS PARA O PAINEL */

                treinos:
                    [],

                aulas:
                    [],

                evolucao:
                    {
                        distancia: 0,
                        treinos: 0,
                        tempo: 0,
                        calorias: 0
                    },

                meta:
                    {
                        distancia: 0,
                        objetivo: 5
                    }

            };


            /* =================================================
               SALVA NA BASE LOCAL
            ================================================= */

            users.push(newUser);

            saveUsers(users);


            /* =================================================
               CRIA SESSÃO
            ================================================= */

            localStorage.setItem(
                "correUser",
                JSON.stringify(newUser)
            );

            localStorage.setItem(
                "correSession",
                "1"
            );


            /* =================================================
               CONFERE SE REALMENTE SALVOU
            ================================================= */

            const savedUsers =
                getUsers();

            const savedUser =
                savedUsers.find(
                    function (user) {

                        return (
                            user.email === email
                        );

                    }
                );


            if (!savedUser) {

                showError(
                    "Não foi possível salvar sua conta. Tente novamente."
                );

                return;

            }


            /* =================================================
               SUCESSO
            ================================================= */

            showSuccess(
                "Conta criada com sucesso! Entrando no seu painel..."
            );


            if (btnSubmit) {

                btnSubmit.disabled = true;

                btnSubmit.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> ' +
                    'Entrando...';

            }


            /* =================================================
               REDIRECIONA PARA PAINEL
            ================================================= */

            setTimeout(
                function () {

                    window.location.replace(
                        "painel.html"
                    );

                },
                700
            );

        }
    );

}