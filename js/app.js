async function cargarComponentes() {

    try {

        const enPaginaInterna =
            window.location.pathname.includes("/pages/");

        const rutaBase =
            enPaginaInterna ? "../components/" : "components/";

        // NAVBAR
        const navbar = await fetch(rutaBase + "navbar.html");

        if (!navbar.ok) {
            throw new Error("Error cargando navbar");
        }

        document.getElementById("navbar-container").innerHTML =
            await navbar.text();

        // FOOTER
        const footer = await fetch(rutaBase + "footer.html");

        if (!footer.ok) {
            throw new Error("Error cargando footer");
        }

        document.getElementById("footer-container").innerHTML =
            await footer.text();

        // INICIAR MENU HAMBURGUESA
        iniciarMenu();

        // PAGINAS INTERNAS
        const nav = document.querySelector(".navbar");

        const esHome =
            window.location.pathname.includes("index.html") ||
            window.location.pathname === "/" ||
            window.location.pathname.endsWith("/");

        if (!esHome && nav) {
            nav.classList.add("interno");
        }


    } catch (error) {

        console.error(error);

    }

}

function iniciarMenu() {

    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("nav-menu");

    if (toggle && menu) {
        toggle.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    }

    // DROPDOWNS
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {

        const link = dropdown.querySelector(":scope > a");

        link.addEventListener("click", function(e){

            if(window.innerWidth <= 992){

                e.preventDefault();

                // cerrar los demás
                dropdowns.forEach(item=>{
                    if(item !== dropdown){
                        item.classList.remove("active");
                    }
                });

                // abrir/cerrar este
                dropdown.classList.toggle("active");
            }

        });

    });

}

cargarComponentes();

// NAVBAR STICKY
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if(!navbar) return;
    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }
});



