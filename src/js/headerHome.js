import { btnMenu, btnTema, containerNav, logout, routeLogin } from "./elementsDom.js"
import { navigationByPage } from "./utils.js";

function showNavBar(){

    if(!btnMenu)return;

    btnMenu.addEventListener('click', () => {
        containerNav.classList.toggle('active-nav')
    })

}

function toggleTheme(){

    if(!btnTema) return

    // Verifica o tema salvo ao carregar a página
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.getElementById('body-home').classList.add('dark-mode');
        
        // Se já estava no dark, aplica o filtro no logo e troca o ícone
        if (document.getElementById('logo-img')) {
            document.getElementById('logo-img').classList.add('filter-img-logo');
        }
        if (btnTema) {
            btnTema.classList.remove('fa-moon');
            btnTema.classList.add('fa-sun');
        }
    }
    
    // Evento de clique
    if (btnTema) {
        btnTema.addEventListener('click', () => {
            // Alterna a classe no body
            document.getElementById('body-home').classList.toggle('dark-mode');
            
            // Alterna o filtro do logo (se ele existir na página)
            const logo = document.getElementById('logo-img');
            if (logo) logo.classList.toggle('filter-img-logo');
    
            //  Define o ícone e salva no navegador
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                
                // Modo Dark: Sol (para indicar que clicando volta pro claro)
                btnTema.classList.remove('fa-moon');
                btnTema.classList.add('fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                
                // Modo Light: Lua (para indicar que clicando vai pro escuro)
                btnTema.classList.remove('fa-sun');
                btnTema.classList.add('fa-moon');
            }
        });
    }
}

function logoutHome(){
    if(!logout) return;

    logout.addEventListener('click', () => {
        window.location.href = routeLogin;
    })
}


function actionsHeader(){
    
    showNavBar();
    toggleTheme();
    logoutHome();

    navigationByPage('btn-inicio', 'sec-inicio')
}

export { actionsHeader }