// MAPA CUARTELES
const coloresZona = {

    "I": "#0d6efd",      // azul
    "II": "#198754",     // verde
    "III": "#fd7e14",    // naranja
    "IV": "#dc3545",     // rojo
    "V": "#6f42c1",      // violeta
    "VI": "#ffc107"      // amarillo

};
// CREAR MAPA
const mapa = L.map('mapa').setView([-36.6167, -64.2833], 6);
// MAPA BASE
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

    attribution:
    '&copy; OpenStreetMap contributors'

}).addTo(mapa);

// AJUSTAR MAPA AUTOMATICAMENTE

const grupo = L.featureGroup(
    cuarteles.map(cuartel =>
        L.marker(cuartel.coordenadas)
    )
);

mapa.fitBounds(grupo.getBounds());

// BUSCADOR Y MARCADORES

const inputBusqueda =
    document.getElementById("buscarCuartel");

const marcadores = [];

cuarteles.forEach(cuartel => {

    const marcador = L.circleMarker(cuartel.coordenadas, {

        radius: 8,
        fillColor: coloresZona[cuartel.zona],
        color: "#fff",
        weight: 2,
        fillOpacity: 1

    })
    .addTo(mapa)
    .bindPopup(`
        <div class="popup-cuartel">

            <h3>${cuartel.nombre}</h3>

            <p><strong>📍 Localidad:</strong> ${cuartel.localidad}</p>

            <p><strong>🗺️ Zona:</strong> ${cuartel.zona}</p>

            <p><strong>📞 Asociación:</strong> ${cuartel.telefonos.asociacion}</p>

            <p><strong>🚒 Presidente:</strong> ${cuartel.autoridades.presidente}</p>

            <a
                href="https://www.google.com/maps?q=${cuartel.coordenadas[0]},${cuartel.coordenadas[1]}"
                target="_blank"
                class="btn-mapa">
                Cómo llegar
            </a>

        </div>
        `);
    marcadores.push({
        nombre: cuartel.nombre,
        zona: cuartel.zona,
        marker: marcador,
        coords: cuartel.coordenadas
    });

});

// LISTADO DE CUARTELES

const contenedor =
    document.getElementById("contenedor-cuarteles");

function mostrarCuarteles(lista){

    contenedor.innerHTML = "";

    lista.forEach(cuartel=>{

        const colorZona = coloresZona[cuartel.zona];

        contenedor.innerHTML += `

        <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4">

            <div class="card-cuartel"
                style="border-top:6px solid ${colorZona};">

                <div class="card-header-cuartel">

                    <div class="icono-cuartel"
                        style="background:${colorZona}">

                        <i class="fa-solid fa-fire-flame-curved"></i>

                    </div>

                    <div>

                        <h3>${cuartel.localidad}</h3>

                        <span class="badge-zona"
                        style="background:${colorZona}">
                            Zona ${cuartel.zona}
                        </span>

                    </div>

                </div>

                <div class="card-body-cuartel">

                    <p>
                        <i class="fa-solid fa-building"></i>
                        ${cuartel.nombre}
                    </p>

                    <p>
                        <i class="fa-solid fa-calendar-days"></i>
                        Fundación:
                        ${cuartel.fundacion || "-"}
                    </p>

                    <p>
                        <i class="fa-solid fa-user-tie"></i>
                        ${cuartel.autoridades.presidente || "-"}
                    </p>

                    <p>
                        <i class="fa-solid fa-helmet-safety"></i>
                        ${cuartel.autoridades.jefe || "-"}
                    </p>

                    <p>
                        <i class="fa-solid fa-phone-volume"></i>
                        ${cuartel.telefonos.asociacion || "-"}
                    </p>

                </div>

                <div class="card-footer-cuartel">

                    <a
                        href="https://www.google.com/maps?q=${cuartel.coordenadas[0]},${cuartel.coordenadas[1]}"
                        target="_blank"
                        class="btn btn-danger">

                        <i class="fa-solid fa-map-location-dot"></i>
                        Cómo llegar

                    </a>

                    <button
                        class="btn btn-dark btn-ficha"
                        data-id="${cuartel.id}">

                        <i class="fa-solid fa-circle-info"></i>
                        Ver ficha

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

mostrarCuarteles(cuarteles);

document.addEventListener("click", function(e){

    const boton = e.target.closest(".btn-ficha");

    if(!boton) return;

    const id = Number(boton.dataset.id);

    const cuartel = cuarteles.find(c=>c.id===id);

    mostrarFichaCuartel(cuartel);

});


function mostrarFichaCuartel(cuartel){

    const modal = document.getElementById("contenidoModalCuartel");

    modal.innerHTML = `

        <div class="ficha-cuartel">

            <h2>${cuartel.nombre}</h2>

            <span class="badge"
                style="background:${coloresZona[cuartel.zona]}">
                Zona ${cuartel.zona}
            </span>

            <hr>

            <div class="row">

                <div class="col-md-6">

                    <h5>
                        <i class="fa-solid fa-location-dot"></i>
                        Ubicación
                    </h5>

                    <p><strong>Localidad:</strong> ${cuartel.localidad}</p>

                    <p><strong>Provincia:</strong> ${cuartel.provincia}</p>

                    <p><strong>Dirección:</strong> ${cuartel.direccion || "-"}</p>

                </div>

                <div class="col-md-6">

                    <h5>
                        <i class="fa-solid fa-building"></i>
                        Institución
                    </h5>

                    <p><strong>Fundación:</strong> ${cuartel.fundacion}</p>

                    <p><strong>Legajo:</strong> ${cuartel.legajo}</p>

                </div>

            </div>

            <hr>

            <div class="row">

                <div class="col-md-6">

                    <h5>
                        <i class="fa-solid fa-user-tie"></i>
                        Presidente
                    </h5>

                    <p>${cuartel.autoridades.presidente || "-"}</p>

                </div>

                <div class="col-md-6">

                    <h5>
                        <i class="fa-solid fa-helmet-safety"></i>
                        Jefe de Cuerpo
                    </h5>

                    <p>${cuartel.autoridades.jefe || "-"}</p>

                </div>

            </div>

            <hr>

            <h5>

                <i class="fa-solid fa-phone-volume"></i>

                Contacto

            </h5>

            <p><strong>Guardia:</strong> ${cuartel.telefonos.guardia || "-"}</p>

            <p><strong>Asociación:</strong> ${cuartel.telefonos.asociacion || "-"}</p>

            <p>

                <strong>Email:</strong>

                ${cuartel.correos.oficial || "-"}

            </p>

            <div class="mt-4 d-flex gap-2 flex-wrap">

                <a
                    class="btn btn-danger"
                    target="_blank"
                    href="https://www.google.com/maps?q=${cuartel.coordenadas[0]},${cuartel.coordenadas[1]}">

                    <i class="fa-solid fa-map-location-dot"></i>

                    Cómo llegar

                </a>

            </div>

        </div>

    `;

    new bootstrap.Modal(
        document.getElementById("modalCuartel")
    ).show();

}

// BUSCADOR

inputBusqueda.addEventListener("keyup", function () {

    const texto =
        this.value.toLowerCase().trim();

    if (texto === "") {

        mapa.closePopup();

        mapa.fitBounds(grupo.getBounds());

        return;
    }

    marcadores.forEach(item => {

        if (
            item.nombre
                .toLowerCase()
                .includes(texto)
        ) {

            mapa.flyTo(item.coords, 10);

            item.marker.openPopup();
        }

    });

});

// FILTROS POR ZONA

const botonesZona =
    document.querySelectorAll(".filtro-zona");

botonesZona.forEach(boton => {

    boton.addEventListener("click", () => {

        const zona =
            boton.dataset.zona;

        if (zona === "TODAS") {

            marcadores.forEach(item => {
                mapa.addLayer(item.marker);
            });

            mostrarCuarteles(cuarteles);

            const grupoZona =
                L.featureGroup(
                    marcadores.map(
                        item => item.marker
                    )
                );

            mapa.fitBounds(
                grupoZona.getBounds()
            );

            mapa.closePopup();

            return;
        }

        marcadores.forEach(item => {
            mapa.removeLayer(item.marker);
        });

        const filtrados =
            marcadores.filter(
                item => item.zona === zona
            );

        filtrados.forEach(item => {
            mapa.addLayer(item.marker);
        });

        mostrarCuarteles(
            cuarteles.filter(
                c => c.zona === zona
            )
        );

        const grupoZona =
            L.featureGroup(
                filtrados.map(
                    item => item.marker
                )
            );

        mapa.fitBounds(
            grupoZona.getBounds()
        );

        mapa.closePopup();

    });

});

// TOTAL DE CUARTELES

document.getElementById(
    "total-cuarteles"
).textContent = cuarteles.length;

// CUARTEL MÁS CERCANO

document.getElementById("btn-cercano")
.addEventListener("click", () => {

    navigator.geolocation.getCurrentPosition(pos => {

        const lat =
            pos.coords.latitude;

        const lng =
            pos.coords.longitude;

        let masCercano = null;

        let distanciaMinima =
            Infinity;

        marcadores.forEach(item => {

            const distancia =
                mapa.distance(
                    [lat, lng],
                    item.coords
                );

            if (
                distancia <
                distanciaMinima
            ) {

                distanciaMinima =
                    distancia;

                masCercano = item;
            }

        });

        mapa.flyTo(
            masCercano.coords,
            11
        );

        masCercano.marker.openPopup();

        const datos =
            cuarteles.find(
                c =>
                c.nombre ===
                masCercano.nombre
            );

        document.getElementById(
            "detalle-cuartel"
        ).innerHTML = `

            <div class="detalle-destacado">

                <h3>
                    📍 Cuartel más cercano
                </h3>

                <h4>
                    ${datos.nombre}
                </h4>

                <p>
                    <strong>Dirección:</strong>
                    ${datos.direccion}
                </p>

                <p>
                    <strong>Teléfono:</strong>
                    ${datos.telefono}
                </p>

                <p>
                    <strong>Zona:</strong>
                    ${datos.zona}
                </p>

                <a
                    href="https://www.google.com/maps?q=${datos.coords[0]},${datos.coords[1]}"
                    target="_blank"
                    class="btn-mapa"
                >
                    Cómo llegar
                </a>

            </div>

        `;

        document
            .getElementById(
                "detalle-cuartel"
            )
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});

document.querySelectorAll(".cuartel-card").forEach(card => {

    card.addEventListener("click", function () {

        // en mobile y tablets
        if (window.innerWidth <= 768) {
            this.classList.toggle("active");
        }

    });

});

document.querySelectorAll(".cuartel-card").forEach(card => {

    card.addEventListener("click", function () {

        if (window.innerWidth <= 768) {
            this.classList.toggle("active");
        }

    });

});