/* ============================================================
   PROJETO CORRE
   SCRIPT.JS
   Sistema principal do site
   ============================================================ */


/* ============================================================
   CONFIGURAÇÃO
   ============================================================ */

const STORAGE_USERS = "correUsers";
const STORAGE_USER = "correUser";
const STORAGE_SESSION = "correSession";


/* ============================================================
   FUNÇÕES DE USUÁRIO
   ============================================================ */

/*
   Retorna todos os usuários cadastrados.
*/
function getUsers() {

    try {

        const users = localStorage.getItem(STORAGE_USERS);

        if (!users) {
            return [];
        }

        const parsed = JSON.parse(users);

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.error(
            "Erro ao carregar usuários:",
            error
        );

        return [];

    }

}


/*
   Salva todos os usuários.
*/
function saveUsers(users) {

    try {

        localStorage.setItem(
            STORAGE_USERS,
            JSON.stringify(users)
        );

        return true;

    } catch (error) {

        console.error(
            "Erro ao salvar usuários:",
            error
        );

        return false;

    }

}


/*
   Retorna o usuário atualmente logado.
*/
function getCurrentUser() {

    try {

        const user = localStorage.getItem(
            STORAGE_USER
        );

        if (!user) {
            return null;
        }

        return JSON.parse(user);

    } catch (error) {

        console.error(
            "Erro ao carregar usuário atual:",
            error
        );

        return null;

    }

}


/*
   Verifica se existe uma sessão válida.
*/
function isLoggedIn() {

    const session =
        localStorage.getItem(
            STORAGE_SESSION
        );

    const user =
        getCurrentUser();

    return (
        session === "1" &&
        user !== null
    );

}


/* ============================================================
   LOGIN
   ============================================================ */

function createSession(user) {

    localStorage.setItem(
        STORAGE_USER,
        JSON.stringify(user)
    );

    localStorage.setItem(
        STORAGE_SESSION,
        "1"
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


    /*
       IMPORTANTE:

       Aqui NÃO apagamos correUsers.

       Portanto a conta continua cadastrada.
       Apenas encerramos a sessão.
    */

    localStorage.removeItem(
        STORAGE_SESSION
    );

    localStorage.removeItem(
        STORAGE_USER
    );


    /*
       Remove também possíveis dados
       da versão antiga do sistema.
    */

    localStorage.removeItem(
        "projetoCorreLogado"
    );

    localStorage.removeItem(
        "projetoCorreUsuario"
    );

    localStorage.removeItem(
        "userName"
    );

    localStorage.removeItem(
        "userEmail"
    );


    /*
       Retorna para o login.
    */

    window.location.replace(
        "login.html"
    );

}


/*
   Disponibiliza logout globalmente.
*/
window.logout = logout;


/* ============================================================
   PÁGINAS PROTEGIDAS
   ============================================================ */

const protectedPages = [

    "painel.html",
    "dashboard.html",

    "treinos.html",

    "aulas.html",

    "evolucao.html",

    "perfil.html"

];


/*
   Descobre qual é a página atual.
*/
function getCurrentPage() {

    return window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

}


/* ============================================================
   PROTEÇÃO DAS PÁGINAS
   ============================================================ */

function protectPage() {

    const currentPage =
        getCurrentPage();


    if (
        !protectedPages.includes(
            currentPage
        )
    ) {

        return true;

    }


    if (!isLoggedIn()) {

        window.location.replace(
            "login.html"
        );

        return false;

    }


    return true;

}


/* ============================================================
   PÁGINAS DE AUTENTICAÇÃO
   ============================================================ */

/*
   Se o usuário já estiver logado e tentar
   abrir login/cadastro, podemos direcioná-lo
   para o painel.
*/

function redirectIfLoggedIn() {

    const currentPage =
        getCurrentPage();


    const authPages = [

        "login.html",
        "cadastro.html"

    ];


    if (
        authPages.includes(
            currentPage
        ) &&
        isLoggedIn()
    ) {

        window.location.replace(
            "painel.html"
        );

        return true;

    }


    return false;

}


/* ============================================================
   DOM READY
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


        redirectIfLoggedIn();


        /* ====================================================
           MENU MOBILE
        ==================================================== */

        const hamburger =
            document.querySelector(
                ".hamburger"
            );

        const menu =
            document.querySelector(
                ".menu"
            );


        if (
            hamburger &&
            menu
        ) {

            hamburger.addEventListener(
                "click",
                function () {

                    hamburger.classList.toggle(
                        "active"
                    );

                    menu.classList.toggle(
                        "active"
                    );

                }
            );


            document
                .querySelectorAll(
                    ".menu a"
                )
                .forEach(
                    function (link) {

                        link.addEventListener(
                            "click",
                            function () {

                                menu.classList.remove(
                                    "active"
                                );

                                hamburger.classList.remove(
                                    "active"
                                );

                            }
                        );

                    }
                );

        }


        /* ====================================================
           NAVBAR AO ROLAR
        ==================================================== */

        const header =
            document.querySelector(
                "header"
            );


        if (header) {

            window.addEventListener(
                "scroll",
                function () {

                    if (
                        window.scrollY > 60
                    ) {

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
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
                function (anchor) {

                    anchor.addEventListener(
                        "click",
                        function (event) {

                            const href =
                                this.getAttribute(
                                    "href"
                                );


                            if (
                                !href ||
                                href === "#"
                            ) {

                                return;

                            }


                            const destino =
                                document.querySelector(
                                    href
                                );


                            if (destino) {

                                event.preventDefault();

                                destino.scrollIntoView({
                                    behavior: "smooth"
                                });

                            }

                        }
                    );

                }
            );


        /* ====================================================
           FAQ
        ==================================================== */

        document
            .querySelectorAll(
                ".faq-question"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const item =
                                this.closest(
                                    ".faq-item"
                                );


                            if (!item) {
                                return;
                            }


                            document
                                .querySelectorAll(
                                    ".faq-item"
                                )
                                .forEach(
                                    function (other) {

                                        if (
                                            other !== item
                                        ) {

                                            other.classList.remove(
                                                "active"
                                            );

                                        }

                                    }
                                );


                            item.classList.toggle(
                                "active"
                            );

                        }
                    );

                }
            );


        /* ====================================================
           ANIMAÇÕES
        ==================================================== */

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


        /* ====================================================
           CONTADORES
        ==================================================== */

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


        /* ====================================================
           BOTÃO VOLTAR AO TOPO
        ==================================================== */

        const topButton =
            document.createElement(
                "button"
            );


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


        /* ====================================================
           PARALLAX DO HERO
        ==================================================== */

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


        /* ====================================================
           LOGIN
        ==================================================== */

        const loginForm =
            document.getElementById(
                "loginForm"
            );


        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const emailInput =
                        document.getElementById(
                            "email"
                        );


                    const senhaInput =
                        document.getElementById(
                            "senha"
                        );


                    const error =
                        document.getElementById(
                            "error"
                        );


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

                        error.innerHTML =
                            "";

                    }


                    /* VALIDA CAMPOS */

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


                    /* BUSCA USUÁRIO */

                    const users =
                        getUsers();


                    const user =
                        users.find(
                            function (item) {

                                return (
                                    String(
                                        item.email || ""
                                    )
                                    .toLowerCase()
                                    === email
                                );

                            }
                        );


                    /* E-MAIL NÃO EXISTE */

                    if (!user) {

                        if (error) {

                            error.innerHTML =
                                "Este e-mail não está cadastrado. Crie uma conta para continuar.";

                            error.style.display =
                                "block";

                        }

                        return;

                    }


                    /* SENHA INCORRETA */

                    if (
                        user.password !== senha
                    ) {

                        if (error) {

                            error.innerHTML =
                                "A senha está incorreta.";

                            error.style.display =
                                "block";

                        }

                        return;

                    }


                    /* LOGIN CORRETO */

                    createSession(
                        user
                    );


                    window.location.replace(
                        "painel.html"
                    );

                }
            );

        }


        /* ====================================================
           LOGIN GOOGLE
        ==================================================== */

        window.loginGoogle =
            function () {

                alert(
                    "O login com Google ainda não está conectado. Utilize seu e-mail e senha cadastrados."
                );

            };


        /* ====================================================
           CADASTRO
        ==================================================== */

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


            /* MOSTRAR SENHA */

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


            /* SUBMIT */

            signupForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const name =
                        document
                            .getElementById(
                                "name"
                            )
                            ?.value
                            .trim();


                    const email =
                        document
                            .getElementById(
                                "email"
                            )
                            ?.value
                            .trim()
                            .toLowerCase();


                    const password =
                        document
                            .getElementById(
                                "password"
                            )
                            ?.value;


                    const confirmPassword =
                        document
                            .getElementById(
                                "confirmPassword"
                            )
                            ?.value;


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


                    function showError(
                        text
                    ) {

                        if (!message) {
                            return;
                        }


                        message.className =
                            "message error";


                        message.innerHTML =
                            '<i class="fa-solid fa-circle-exclamation"></i> ' +
                            text;

                    }


                    function showSuccess(
                        text
                    ) {

                        if (!message) {
                            return;
                        }


                        message.className =
                            "message success";


                        message.innerHTML =
                            '<i class="fa-solid fa-circle-check"></i> ' +
                            text;

                    }


                    /* NOME */

                    if (
                        !name ||
                        name.length < 3
                    ) {

                        showError(
                            "Digite seu nome completo."
                        );

                        return;

                    }


                    /* E-MAIL */

                    const emailRegex =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                    if (
                        !email ||
                        !emailRegex.test(
                            email
                        )
                    ) {

                        showError(
                            "Digite um e-mail válido."
                        );

                        return;

                    }


                    /* SENHA */

                    if (
                        !password ||
                        password.length < 6
                    ) {

                        showError(
                            "A senha precisa ter pelo menos 6 caracteres."
                        );

                        return;

                    }


                    /* CONFIRMAÇÃO */

                    if (
                        password !==
                        confirmPassword
                    ) {

                        showError(
                            "As senhas não são iguais."
                        );

                        return;

                    }


                    /* TERMOS */

                    if (!terms) {

                        showError(
                            "Você precisa aceitar os Termos de Uso para continuar."
                        );

                        return;

                    }


                    /* BUSCA USUÁRIOS */

                    const users =
                        getUsers();


                    /* VERIFICA E-MAIL */

                    const existingUser =
                        users.find(
                            function (user) {

                                return (
                                    String(
                                        user.email || ""
                                    )
                                    .toLowerCase()
                                    === email
                                );

                            }
                        );


                    if (existingUser) {

                        showError(
                            "Este e-mail já possui uma conta. Entre com sua conta existente."
                        );

                        return;

                    }


                    /* CRIA USUÁRIO */

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

                        cadastradoEm:
                            new Date()
                                .toISOString(),

                        plan:
                            "free"

                    };


                    /* SALVA */

                    users.push(
                        newUser
                    );


                    const saved =
                        saveUsers(
                            users
                        );


                    if (!saved) {

                        showError(
                            "Não foi possível salvar sua conta neste navegador."
                        );

                        return;

                    }


                    /* CRIA SESSÃO */

                    createSession(
                        newUser
                    );


                    /* COMPATIBILIDADE */

                    localStorage.setItem(
                        "userName",
                        name
                    );

                    localStorage.setItem(
                        "userEmail",
                        email
                    );


                    /* SUCESSO */

                    showSuccess(
                        "Conta criada com sucesso! Entrando no seu painel..."
                    );


                    /* BLOQUEIA BOTÃO */

                    const submitButton =
                        document.getElementById(
                            "btnSubmit"
                        );


                    const buttonText =
                        document.getElementById(
                            "btnText"
                        );


                    const buttonIcon =
                        document.getElementById(
                            "btnIcon"
                        );


                    if (submitButton) {

                        submitButton.disabled =
                            true;

                    }


                    if (buttonText) {

                        buttonText.textContent =
                            "Conta criada!";

                    }


                    if (buttonIcon) {

                        buttonIcon.className =
                            "fa-solid fa-check";

                    }


                    /* REDIRECIONA */

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


        /* ====================================================
           DADOS DO USUÁRIO
        ==================================================== */

        if (
            isLoggedIn() &&
            protectedPages.includes(
                getCurrentPage()
            )
        ) {

            setupUserInterface();

        }


        /* ====================================================
           LOGOUT
        ==================================================== */

        setupLogoutButton();


        /* ====================================================
           SIDEBAR
        ==================================================== */

        setupSidebar();


        /* ====================================================
           LINKS DO PAINEL
        ==================================================== */

        setupDashboardLinks();


        /* ====================================================
           BARRAS DE EVOLUÇÃO
        ==================================================== */

        setupProgressBars();


    }
);


/* ============================================================
   INTERFACE DO USUÁRIO
   ============================================================ */

function setupUserInterface() {

    const user =
        getCurrentUser();


    if (!user) {
        return;
    }


    const userName =
        user.nome ||
        user.name ||
        "Corredor";


    /* ========================================================
       NOME NO TOPO
    ======================================================== */

    const titles =
        document.querySelectorAll(
            ".topbar h1"
        );


    titles.forEach(
        function (title) {

            title.innerHTML =
                `Olá, ${userName} 👋`;

        }
    );


    /* ========================================================
       ELEMENTOS COM DATA-USER-NAME
    ======================================================== */

    document
        .querySelectorAll(
            "[data-user-name]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    userName;

            }
        );


    /* ========================================================
       E-MAIL
    ======================================================== */

    document
        .querySelectorAll(
            "[data-user-email]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    user.email || "";

            }
        );


    /* ========================================================
       AVATAR
    ======================================================== */

    const avatars =
        document.querySelectorAll(
            ".top-icons img, .user-avatar"
        );


    avatars.forEach(
        function (avatar) {

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
    );


    /* ========================================================
       NOTIFICAÇÃO
    ======================================================== */

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

}


/* ============================================================
   BOTÃO SAIR
   ============================================================ */

function setupLogoutButton() {

    const logoutButtons =
        document.querySelectorAll(
            "#logoutButton, .logoutButton, [data-logout]"
        );


    logoutButtons.forEach(
        function (button) {

            /*
               Clona o botão para evitar que outro
               script tenha colocado eventos duplicados.
            */

            const newButton =
                button.cloneNode(true);


            button.parentNode.replaceChild(
                newButton,
                button
            );


            newButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    logout();

                }
            );

        }
    );

}


/* ============================================================
   SIDEBAR
   ============================================================ */

function setupSidebar() {

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

}


/* ============================================================
   LINKS DO DASHBOARD
   ============================================================ */

function setupDashboardLinks() {

    const currentPage =
        getCurrentPage();


    /*
       Só executa esses comportamentos
       no painel/dashboard.
    */

    if (
        currentPage !== "painel.html" &&
        currentPage !== "dashboard.html"
    ) {

        return;

    }


    /* ========================================================
       CARDS
    ======================================================== */

    const dashCards =
        document.querySelectorAll(
            ".dash-card"
        );


    /* TREINOS */

    if (dashCards[0]) {

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

    if (dashCards[2]) {

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

    if (dashCards[3]) {

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


    /* ========================================================
       CALENDÁRIO
    ======================================================== */

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


    /* ========================================================
       AULAS
    ======================================================== */

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


    /* ========================================================
       CURSOS / AULAS
    ======================================================== */

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


    /* ========================================================
       CONQUISTAS
    ======================================================== */

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
                        "evolucao.html";

                }
            );

        }
    );

}


/* ============================================================
   BARRAS DE EVOLUÇÃO
   ============================================================ */

function setupProgressBars() {

    const fills =
        document.querySelectorAll(
            ".progress .fill"
        );


    fills.forEach(
        function (fill) {

            const width =
                fill.style.width;


            if (!width) {
                return;
            }


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


/* ============================================================
   PROTEÇÃO CONTRA VOLTAR PARA PÁGINA PROTEGIDA
   ============================================================ */

window.addEventListener(
    "pageshow",
    function () {

        const currentPage =
            getCurrentPage();


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
   PROTEÇÃO ADICIONAL CONTRA PÁGINA EM CACHE
   ============================================================ */

window.addEventListener(
    "popstate",
    function () {

        const currentPage =
            getCurrentPage();


        if (
            protectedPages.includes(
                currentPage
            ) &&
            !isLoggedIn()
        ) {

            window.location.replace(
                "login.html"
            );

        }

    }
);


/* ============================================================
   FUNÇÕES GLOBAIS
   ============================================================ */

window.getUsers =
    getUsers;

window.saveUsers =
    saveUsers;

window.getCurrentUser =
    getCurrentUser;

window.isLoggedIn =
    isLoggedIn;

window.createSession =
    createSession;