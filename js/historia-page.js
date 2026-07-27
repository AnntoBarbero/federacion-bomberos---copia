// INTRODUCCION

document.getElementById("historia-introduccion").innerHTML = `

<section class="historia-section">

    <div class="container">

        <div class="titulo-seccion">

            <h2>${historiaFederacion.introduccion.titulo}</h2>

        </div>

        <div class="historia-texto">

            <p>${historiaFederacion.introduccion.texto}</p>

        </div>

    </div>

</section>

`;


// TIMELINE

document.getElementById("historia-timeline").innerHTML = `

<div class="timeline">

${historiaFederacion.timeline.map(item=>`

<div class="timeline-item">

    <div class="timeline-card">

        <span class="timeline-anio">
            ${item.anio}
        </span>

        <h4>${item.titulo}</h4>

        <p>${item.descripcion}</p>

    </div>

</div>

`).join("")}

</div>

`;


// HITOS

document.getElementById("historia-hitos").innerHTML = `

<div class="hitos-panel">

    <h3>
        <i class="fa-solid fa-star"></i>
        Hitos destacados
    </h3>

    ${historiaFederacion.hitos.map(hito=>`

    <div class="hito-item">

        <i class="fa-solid fa-check"></i>

        <p>${hito}</p>

    </div>

    `).join("")}

</div>

`;


// PRESIDENTES

document.getElementById("historia-presidentes").innerHTML = `

<section class="historia-section fondo-gris">

    <div class="container">

        <div class="titulo-seccion">

            <h2>Presidentes</h2>

        </div>

        <div class="row">

            ${historiaFederacion.presidentes.map(p => `

                <div class="col-md-3 mb-4">

                    <div class="presidente-card">

                        <i class="fa-solid fa-user-tie"></i>

                        <h4>${p.nombre}</h4>

                        <p>${p.periodo}</p>

                    </div>

                </div>

            `).join("")}

        </div>

    </div>

</section>

`;

