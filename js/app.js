async function cargarComponentes() {

    try {

        const esHome =
            window.location.pathname.endsWith("/") ||
            window.location.pathname.endsWith("index.html");

        const rutaComponentes = esHome
            ? "components/"
            : "../components/";

        // NAVBAR
        const navbar = await fetch(rutaComponentes + "navbar.html");

        if (!navbar.ok) {
            throw new Error("No se pudo cargar el navbar.");
        }

        document.getElementById("navbar-container").innerHTML =
            await navbar.text();

        // FOOTER
        const footer = await fetch(rutaComponentes + "footer.html");

        if (!footer.ok) {
            throw new Error("No se pudo cargar el footer.");
        }

        document.getElementById("footer-container").innerHTML =
            await footer.text();

        corregirRutas();
        iniciarMenu();

        const nav = document.querySelector(".navbar");

        if (!esHome && nav) {
            nav.classList.add("interno");
        }

    } catch (e) {

        console.error(e);

    }

}

function corregirRutas() {

    const esHome =
        window.location.pathname.endsWith("/") ||
        window.location.pathname.endsWith("index.html");

    const prefijo = esHome ? "" : "../";

    // enlaces
    document.querySelectorAll("#navbar-container a, #footer-container a")
        .forEach(link => {

            const href = link.getAttribute("href");

            if (!href) return;

            if (
                href.startsWith("http") ||
                href.startsWith("#") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:")
            ) return;

            link.setAttribute("href", prefijo + href);

        });

    // imágenes
    document.querySelectorAll("#navbar-container img, #footer-container img")
        .forEach(img => {

            const src = img.getAttribute("src");

            if (!src) return;

            img.setAttribute("src", prefijo + src);

        });

}

function iniciarMenu() {

    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("nav-menu");

    if (toggle && menu) {

        toggle.addEventListener("click", () => {

            menu.classList.toggle("active");

        });

    }

    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {

        const link = dropdown.querySelector(":scope > a");

        if (!link) return;

        link.addEventListener("click", function (e) {

            if (window.innerWidth <= 992) {

                e.preventDefault();

                dropdowns.forEach(item => {

                    if (item !== dropdown) {
                        item.classList.remove("active");
                    }

                });

                dropdown.classList.toggle("active");

            }

        });

    });

}

cargarComponentes();

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});