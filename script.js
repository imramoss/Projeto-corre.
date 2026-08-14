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

        const savedUsers =
            localStorage.getItem(STORAGE_USERS);

        if (!savedUsers) {
            return [];
        }

        const users =
            JSON.parse(savedUsers);

        return Array.isArray(users)
            ? users
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

        const savedUser =
            localStorage.getItem(STORAGE_USER);

        if (!savedUser) {
            return null;
        }

        return JSON.parse(savedUser);

    } catch (error) {

        console.error(
            "Erro ao carregar usuário atual:",
            error
        );

        return null;
    }
}


/*
   Verifica se existe sessão válida.
*/
function isLoggedIn() {

    const session =
        localStorage.getItem(STORAGE_SESSION);

    const user =
        getCurrentUser();

    return (
        session === "1" &&
        user !== null
    );
}


/* ============================================================
   SESSÃO
============================================================ */

function createSession(user) {

    if (!user) {
        return false;
    }

    try {

        localStorage.setItem(
            STORAGE_USER,
            JSON.stringify(user)
        );

        localStorage.setItem(
            STORAGE_SESSION,
            "1"
        );

        return true;

    } catch (error) {

        console.error(
            "Erro ao criar sessão:",
            error
        );

        return false;
    }
}


/* ============================================================
   LOGOUT
============================================================ */

function logout() {

    const confirmLogout =
        confirm(
            "Tem certeza que deseja sair da sua conta?"
        );

    if (!confirmLogout) {
        return;
    }


    /*
       IMPORTANTE:

       Não removemos correUsers.

       A conta continua cadastrada.
       Apenas encerramos a sessão.
    */

    localStorage.removeItem(
        STORAGE_SESSION
    );

    localStorage.removeItem(
        STORAGE_USER
    );


    /*
       Remove dados de versões antigas.
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
       Redireciona para o login.
    */

    window.location.replace(
        "login.html"
    );
}


/*
   Disponibiliza globalmente.
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


/* ============================================================
   DESCOBRIR PÁGINA ATUAL
============================================================ */

function getCurrentPage() {

    let page =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    /*
       Caso esteja acessando a raiz do site.
    */

    if (!page) {
        page = "index.html";
    }

    return page;
}


/* ============================================================
   PROTEGER PÁGINAS
============================================================ */

function protectPage() {

    const currentPage =
        getCurrentPage();

    /*
       Se não for uma página protegida,
       não faz nada.
    */

    if (
        !protectedPages.includes(
            currentPage
        )
    ) {

        return true;
    }


    /*
       Se não estiver logado,
       manda para o login.
    */

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
   INTERFACE DO USUÁRIO
============================================================ */

/* ============================================================
   INTERFACE DO USUÁRIO
   + RECADO PERSONALIZADO
============================================================ */

function setupUserInterface() {

    const user =
        getCurrentUser();

    if (!user) {
        return;
    }


    /* ========================================================
       DADOS DO USUÁRIO
    ======================================================== */

    const userName =
        user.nome ||
        user.name ||
        "Corredor";

    const userEmail =
        String(
            user.email || ""
        )
        .trim()
        .toLowerCase();


    /* ========================================================
       NOME NOS ELEMENTOS
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
       PLANO
    ======================================================== */

    document
        .querySelectorAll(
            "[data-user-plan]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    user.plan || "free";

            }
        );


    /* ========================================================
       TÍTULO DO PAINEL
    ======================================================== */

    const topbarTitle =
        document.querySelector(
            ".topbar h1"
        );


    if (topbarTitle) {

        topbarTitle.innerHTML =
            `Olá, ${escapeHTML(userName)} 👋`;

    }


    /* ========================================================
       RECADO ESPECIAL
       
       SOMENTE ESTE E-MAIL RECEBE O RECADO:
       
       hellenvitoria428@gmail.com
    ======================================================== */

    const specialEmail =
        "hellenvitoria428@gmail.com";


    /*
       ESCREVA AQUI O RECADO QUE VOCÊ QUER
       QUE APAREÇA PARA ELA.
    */

    const specialMessage =
        "Te amo meu amô!❤️";


    /*
       Verifica o e-mail do usuário logado.
    */

    if (
        userEmail === specialEmail
    ) {

        /*
           Procura o subtítulo que fica
           logo abaixo do "Olá, Fulano".
        */

        const topbarSubtitle =
            document.querySelector(
                ".topbar p"
            );


        if (topbarSubtitle) {

            /*
               Mantém o texto original
               e acrescenta o recado.
            */

            topbarSubtitle.innerHTML =
                `
                Pronto para mais um dia de evolução?
                
                <span
                    class="special-message">
                    ${escapeHTML(specialMessage)}
                </span>
                `;


            /*
               Estilo do recado.
            */

            const style =
                document.createElement(
                    "style"
                );


            style.textContent = `

                .special-message {

                    display: block;

                    margin-top: 8px;

                    color: #A3FF12;

                    font-size: 11px;

                    font-weight: 600;

                    animation:
                        specialMessageAppear
                        .8s ease;

                }


                @keyframes specialMessageAppear {

                    from {

                        opacity: 0;

                        transform:
                            translateY(5px);

                    }

                    to {

                        opacity: 1;

                        transform:
                            translateY(0);

                    }

                }

            `;


            document.head.appendChild(
                style
            );

        }

    }


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



/* ============================================================
   ESCAPAR HTML
============================================================ */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
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
               Evita cadastrar o evento duas vezes.
            */

            if (
                button.dataset.logoutReady === "true"
            ) {

                return;
            }


            button.dataset.logoutReady =
                "true";


            button.addEventListener(
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


/*
   Também usamos delegação de evento.

   Isso permite que o botão sair continue
   funcionando mesmo se algum elemento for
   criado dinamicamente depois.
*/

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "#logoutButton, .logoutButton, [data-logout]"
            );


        if (!button) {
            return;
        }


        event.preventDefault();

        event.stopPropagation();


        /*
           Evita chamar duas vezes caso
           setupLogoutButton também esteja ativo.
        */

        if (
            button.dataset.logoutHandling === "true"
        ) {

            return;
        }


        button.dataset.logoutHandling =
            "true";


        logout();

    },
    true
);


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


    if (
        currentPage !== "painel.html" &&
        currentPage !== "dashboard.html"
    ) {

        return;
    }


    /*
       CARDS
    */

    const dashCards =
        document.querySelectorAll(
            ".dash-card"
        );


    /*
       TREINOS
    */

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


    /*
       DISTÂNCIA
    */

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


    /*
       META
    */

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


    /*
       CALENDÁRIO
    */

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


    /*
       AULAS
    */

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


    /*
       CURSOS
    */

    document
        .querySelectorAll(
            ".course"
        )
        .forEach(
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


    /*
       CONQUISTAS
    */

    document
        .querySelectorAll(
            ".achievement"
        )
        .forEach(
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
   LOGIN
============================================================ */

function setupLogin() {

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (!loginForm) {
        return;
    }


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /*
               Aceita tanto id="senha"
               quanto id="password".
            */

            const emailInput =
                document.getElementById(
                    "email"
                );


            const senhaInput =
                document.getElementById(
                    "senha"
                ) ||
                document.getElementById(
                    "password"
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


            /*
               Limpa erro.
            */

            if (error) {

                error.style.display =
                    "none";

                error.textContent =
                    "";

            }


            /*
               Campos vazios.
            */

            if (
                !email ||
                !senha
            ) {

                showLoginError(
                    "Preencha o e-mail e a senha.",
                    error
                );

                return;
            }


            /*
               Busca usuário.
            */

            const users =
                getUsers();


            const user =
                users.find(
                    function (item) {

                        return (
                            String(
                                item.email || ""
                            )
                            .trim()
                            .toLowerCase()
                            === email
                        );

                    }
                );


            /*
               E-mail inexistente.
            */

            if (!user) {

                showLoginError(
                    "Este e-mail não está cadastrado. Crie uma conta para continuar.",
                    error
                );

                return;
            }


            /*
               Senha incorreta.
            */

            if (
                String(user.password || "") !==
                senha
            ) {

                showLoginError(
                    "A senha está incorreta.",
                    error
                );

                return;
            }


            /*
               Login realizado.
            */

            const sessionCreated =
                createSession(user);


            if (!sessionCreated) {

                showLoginError(
                    "Não foi possível iniciar sua sessão.",
                    error
                );

                return;
            }


            /*
               Compatibilidade.
            */

            localStorage.setItem(
                "userName",
                user.nome ||
                user.name ||
                ""
            );

            localStorage.setItem(
                "userEmail",
                user.email ||
                ""
            );


            /*
               Redireciona.
            */

            window.location.replace(
                "painel.html"
            );

        }
    );
}


function showLoginError(
    text,
    errorElement
) {

    if (!errorElement) {
        alert(text);
        return;
    }


    errorElement.textContent =
        text;

    errorElement.style.display =
        "block";
}


/* ============================================================
   LOGIN GOOGLE
============================================================ */

window.loginGoogle =
    function () {

        alert(
            "O login com Google ainda não está conectado. Utilize seu e-mail e senha cadastrados."
        );

    };


/* ============================================================
   CADASTRO
============================================================ */

function setupSignup() {

    const signupForm =
        document.getElementById(
            "signupForm"
        );


    if (!signupForm) {
        return;
    }


    const togglePassword =
        document.getElementById(
            "togglePassword"
        );


    const passwordInput =
        document.getElementById(
            "password"
        );


    const confirmPasswordInput =
        document.getElementById(
            "confirmPassword"
        );


    const terms =
        document.getElementById(
            "aceiteTermos"
        );


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


    const message =
        document.getElementById(
            "message"
        );


    /*
       MOSTRAR / ESCONDER SENHA
    */

    if (
        togglePassword &&
        passwordInput
    ) {

        togglePassword.addEventListener(
            "click",
            function () {

                const showing =
                    passwordInput.type ===
                    "text";


                passwordInput.type =
                    showing
                        ? "password"
                        : "text";


                this.innerHTML =
                    showing
                        ? '<i class="fa-solid fa-eye"></i>'
                        : '<i class="fa-solid fa-eye-slash"></i>';


                this.setAttribute(
                    "aria-label",
                    showing
                        ? "Mostrar senha"
                        : "Ocultar senha"
                );

            }
        );

    }


    /*
       ATIVA / DESATIVA BOTÃO
       CONFORME TERMOS.
    */

    function updateSubmitButton() {

        if (!submitButton) {
            return;
        }


        submitButton.disabled =
            !(
                terms &&
                terms.checked
            );

    }


    if (terms) {

        terms.addEventListener(
            "change",
            updateSubmitButton
        );

    }


    updateSubmitButton();


    /*
       MENSAGENS.
    */

    function showMessage(
        text,
        type
    ) {

        if (!message) {
            return;
        }


        message.className =
            "message " +
            type;


        message.innerHTML =
            text;

    }


    function clearMessage() {

        if (!message) {
            return;
        }


        message.className =
            "message";

        message.textContent =
            "";

    }


    /*
       SUBMIT DO CADASTRO.
    */

    signupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            clearMessage();


            /*
               NOME
            */

            const nameInput =
                document.getElementById(
                    "name"
                );


            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";


            if (
                !name ||
                name.length < 3
            ) {

                showMessage(
                    '<i class="fa-solid fa-circle-exclamation"></i> Digite seu nome completo.',
                    "error"
                );

                if (nameInput) {
                    nameInput.focus();
                }

                return;
            }


            /*
               E-MAIL
            */

            const emailInput =
                document.getElementById(
                    "email"
                );


            const email =
                emailInput
                    ? emailInput.value
                        .trim()
                        .toLowerCase()
                    : "";


            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !email ||
                !emailRegex.test(email)
            ) {

                showMessage(
                    '<i class="fa-solid fa-circle-exclamation"></i> Digite um e-mail válido.',
                    "error"
                );

                if (emailInput) {
                    emailInput.focus();
                }

                return;
            }


            /*
               SENHA
            */

            const password =
                passwordInput
                    ? passwordInput.value
                    : "";


            if (
                !password ||
                password.length < 6
            ) {

                showMessage(
                    '<i class="fa-solid fa-circle-exclamation"></i> A senha precisa ter pelo menos 6 caracteres.',
                    "error"
                );

                if (passwordInput) {
                    passwordInput.focus();
                }

                return;
            }


            /*
               CONFIRMAÇÃO
            */

            const confirmPassword =
                confirmPasswordInput
                    ? confirmPasswordInput.value
                    : "";


            if (
                password !==
                confirmPassword
            ) {

                showMessage(
                    '<i class="fa-solid fa-circle-exclamation"></i> As senhas não são iguais.',
                    "error"
                );

                if (confirmPasswordInput) {
                    confirmPasswordInput.focus();
                }

                return;
            }


            /*
               TERMOS
            */

            if (
                !terms ||
                !terms.checked
            ) {

                showMessage(
                    '<i class="fa-solid fa-circle-exclamation"></i> Você precisa aceitar os Termos de Uso para continuar.',
                    "error"
                );

                return;
            }


            /*
               BUSCA USUÁRIOS.
            */

            const users =
                getUsers();


            /*
               VERIFICA E-MAIL.
            */

            const existingUser =
                users.find(
                    function (user) {

                        return (
                            String(
                                user.email || ""
                            )
                            .trim()
                            .toLowerCase()
                            === email
                        );

                    }
                );


            if (existingUser) {

                showMessage(
                    '<i class="fa-solid fa-circle-exclamation"></i> Este e-mail já possui uma conta. Entre com sua conta existente.',
                    "error"
                );

                if (emailInput) {
                    emailInput.focus();
                }

                return;
            }


            /*
               CRIA USUÁRIO.
            */

            const now =
                new Date().toISOString();


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

                plan:
                    "free",

                createdAt:
                    now,

                cadastradoEm:
                    now

            };


            /*
               ADICIONA À LISTA.
            */

            users.push(
                newUser
            );


            /*
               SALVA.
            */

            const saved =
                saveUsers(users);


            if (!saved) {

                showMessage(
                    '<i class="fa-solid fa-circle-exclamation"></i> Não foi possível salvar sua conta neste navegador.',
                    "error"
                );

                return;
            }


            /*
               CRIA SESSÃO AUTOMATICAMENTE.
            */

            const sessionCreated =
                createSession(
                    newUser
                );


            if (!sessionCreated) {

                showMessage(
                    '<i class="fa-solid fa-circle-exclamation"></i> A conta foi criada, mas não foi possível iniciar sua sessão.',
                    "error"
                );

                return;
            }


            /*
               COMPATIBILIDADE COM VERSÕES ANTIGAS.
            */

            localStorage.setItem(
                "userName",
                name
            );

            localStorage.setItem(
                "userEmail",
                email
            );


            /*
               SUCESSO.
            */

            showMessage(
                '<i class="fa-solid fa-circle-check"></i> Conta criada com sucesso! Entrando no seu painel...',
                "success"
            );


            /*
               BLOQUEIA BOTÃO.
            */

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


            /*
               REDIRECIONA.
            */

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


/* ============================================================
   MENU MOBILE
============================================================ */

function setupMobileMenu() {

    const hamburger =
        document.querySelector(
            ".hamburger"
        );


    const menu =
        document.querySelector(
            ".menu"
        );


    if (
        !hamburger ||
        !menu
    ) {

        return;
    }


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


    menu
        .querySelectorAll("a")
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


/* ============================================================
   NAVBAR AO ROLAR
============================================================ */

function setupNavbarScroll() {

    const header =
        document.querySelector(
            "header"
        );


    if (!header) {
        return;
    }


    function updateHeader() {

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


    window.addEventListener(
        "scroll",
        updateHeader
    );


    updateHeader();
}


/* ============================================================
   SCROLL SUAVE
============================================================ */

function setupSmoothScroll() {

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


                        const target =
                            document.querySelector(
                                href
                            );


                        if (target) {

                            event.preventDefault();

                            target.scrollIntoView({
                                behavior: "smooth"
                            });

                        }

                    }
                );

            }
        );
}


/* ============================================================
   FAQ
============================================================ */

function setupFAQ() {

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
}


/* ============================================================
   ANIMAÇÕES
============================================================ */

function setupAnimations() {

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
        animatedElements.length === 0 ||
        !("IntersectionObserver" in window)
    ) {

        return;
    }


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


/* ============================================================
   CONTADORES
============================================================ */

function setupCounters() {

    const numbers =
        document.querySelectorAll(
            ".numbers-grid h2"
        );


    if (
        numbers.length === 0 ||
        !("IntersectionObserver" in window)
    ) {

        return;
    }


    const counterObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;
                        }


                        const number =
                            entry.target;


                        const originalText =
                            number.innerText;


                        const value =
                            parseInt(
                                originalText.replace(
                                    /\D/g,
                                    ""
                                ),
                                10
                            );


                        if (
                            isNaN(value)
                        ) {

                            return;
                        }


                        const suffix =
                            originalText.replace(
                                /[0-9]/g,
                                ""
                            );


                        let current =
                            0;


                        const increment =
                            Math.max(
                                1,
                                Math.ceil(
                                    value / 120
                                )
                            );


                        function update() {

                            current +=
                                increment;


                            if (
                                current < value
                            ) {

                                number.innerText =
                                    current +
                                    suffix;


                                requestAnimationFrame(
                                    update
                                );

                            } else {

                                number.innerText =
                                    originalText;

                            }

                        }


                        update();


                        counterObserver.unobserve(
                            number
                        );

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    numbers.forEach(
        function (number) {

            counterObserver.observe(
                number
            );

        }
    );
}


/* ============================================================
   BOTÃO VOLTAR AO TOPO
============================================================ */

function setupTopButton() {

    /*
       Não cria outro botão se já existir.
    */

    let topButton =
        document.querySelector(
            ".topButton"
        );


    if (!topButton) {

        topButton =
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

    }


    function updateTopButton() {

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


    window.addEventListener(
        "scroll",
        updateTopButton
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


    updateTopButton();
}


/* ============================================================
   PARALLAX DO HERO
============================================================ */

function setupHeroParallax() {

    const heroImage =
        document.querySelector(
            ".hero-right img"
        );


    if (!heroImage) {
        return;
    }


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


/* ============================================================
   DOM READY
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Primeiro verifica proteção.
        */

        if (!protectPage()) {
            return;
        }


        /*
           Redireciona usuário já logado
           caso esteja em login/cadastro.
        */

        redirectIfLoggedIn();


        /*
           Funcionalidades gerais.
        */

        setupMobileMenu();

        setupNavbarScroll();

        setupSmoothScroll();

        setupFAQ();

        setupAnimations();

        setupCounters();

        setupTopButton();

        setupHeroParallax();


        /*
           Autenticação.
        */

        setupLogin();

        setupSignup();


        /*
           Área logada.
        */

        if (
            isLoggedIn() &&
            protectedPages.includes(
                getCurrentPage()
            )
        ) {

            setupUserInterface();

        }


        /*
           Botão sair.
        */

        setupLogoutButton();


        /*
           Sidebar.
        */

        setupSidebar();


        /*
           Links do painel.
        */

        setupDashboardLinks();


        /*
           Barras de evolução.
        */

        setupProgressBars();

    }
);


/* ============================================================
   PROTEÇÃO CONTRA CACHE
============================================================ */

window.addEventListener(
    "pageshow",
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
   PROTEÇÃO CONTRA VOLTAR NO NAVEGADOR
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

window.protectPage =
    protectPage;

window.setupLogoutButton =
    setupLogoutButton;

    /* ============================================================
   PROJETO CORRE
   SUPABASE.JS
   Configuração principal do Supabase
============================================================ */

const SUPABASE_URL = "https://mubzyyppizxuofitnysp.supabase.co/rest/v1/";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_7TMsNk3z-oks9HQjTfi6ug_dy0Rvaw0";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        }
    );


window.supabaseClient =
    supabaseClient;