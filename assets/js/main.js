
document.addEventListener("DOMContentLoaded", () => {
    const portada = document.querySelector("#portada");
    const botonAbrir = document.querySelector("#abrirInvitacion");
    const interior = document.querySelector("#interior");
    const contador = document.querySelector("#contador");
    const mensajeContador = document.querySelector("#mensajeContador");
    const botonWhatsApp = document.querySelector("#confirmarWhatsApp");
    const botonVolver = document.querySelector("#volverPortada");

    if (!portada || !botonAbrir || !interior) {
        console.error("Faltan elementos necesarios de la invitación.");
        return;
    }

    let abierta = false;
    let contadorIniciado = false;
    let respaldoApertura;

    const fechaBoda = new Date("2027-10-25T20:00:00-03:00");

    const puertaIzquierda = portada.querySelector(
        ".portada__mitad--izquierda"
    );

    function finalizarApertura() {
        if (document.body.classList.contains("invitacion-abierta")) {
            return;
        }

        window.clearTimeout(respaldoApertura);

        document.body.classList.add("invitacion-abierta");
        portada.classList.add("portada--cerrada");
        portada.setAttribute("aria-hidden", "true");

        iniciarContador();
    }

    botonAbrir.addEventListener("click", () => {
        if (abierta) return;

        abierta = true;
        botonAbrir.disabled = true;

        interior.classList.add("interior--visible");
        interior.inert = false;
        interior.setAttribute("aria-hidden", "false");

        portada.classList.add("portada--abriendo");

        if (!puertaIzquierda) {
            finalizarApertura();
            return;
        }

        const alTerminar = (evento) => {
            if (
                evento.target !== puertaIzquierda ||
                evento.propertyName !== "transform"
            ) {
                return;
            }

            puertaIzquierda.removeEventListener(
                "transitionend",
                alTerminar
            );

            finalizarApertura();
        };

        puertaIzquierda.addEventListener(
            "transitionend",
            alTerminar
        );

        respaldoApertura = window.setTimeout(() => {
            puertaIzquierda.removeEventListener(
                "transitionend",
                alTerminar
            );

            finalizarApertura();
        }, 2800);
    });

    function iniciarContador() {
        if (!contador || !mensajeContador || contadorIniciado) {
            return;
        }

        const dias = document.querySelector("#dias");
        const horas = document.querySelector("#horas");
        const minutos = document.querySelector("#minutos");
        const segundos = document.querySelector("#segundos");

        if (!dias || !horas || !minutos || !segundos) {
            return;
        }

        contadorIniciado = true;

        function actualizarContador() {
            const diferencia = fechaBoda.getTime() - Date.now();

            if (diferencia <= 0) {
                dias.textContent = "00";
                horas.textContent = "00";
                minutos.textContent = "00";
                segundos.textContent = "00";

                mensajeContador.textContent =
                    "¡Llegó nuestro día! Gracias por ser parte de esta historia.";

                window.clearInterval(window.intervaloContador);
                return;
            }

            const segundo = 1000;
            const minuto = segundo * 60;
            const hora = minuto * 60;
            const dia = hora * 24;

            dias.textContent = String(
                Math.floor(diferencia / dia)
            ).padStart(2, "0");

            horas.textContent = String(
                Math.floor((diferencia % dia) / hora)
            ).padStart(2, "0");

            minutos.textContent = String(
                Math.floor((diferencia % hora) / minuto)
            ).padStart(2, "0");

            segundos.textContent = String(
                Math.floor((diferencia % minuto) / segundo)
            ).padStart(2, "0");

            mensajeContador.textContent = "";
        }

        actualizarContador();

        window.clearInterval(window.intervaloContador);

        window.intervaloContador = window.setInterval(
            actualizarContador,
            1000
        );
    }

    if (botonWhatsApp) {
        const numeroWhatsApp = "5493512290218";

        const mensaje =
            "¡Hola, Lucía y Juan! Quiero confirmar mi asistencia a su boda del 25 de octubre. ¡Muchas felicidades!";

        botonWhatsApp.href =
            `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    }

    
if (botonVolver) {
    botonVolver.addEventListener("click", () => {
        if (abierta === false) return;

        const pantallaCarga = document.createElement("div");

        pantallaCarga.innerHTML = `
            <div class="carga-anillos">
                <div class="carga-anillos__figura">
                    <span class="carga-anillos__izquierdo"></span>
                    <span class="carga-anillos__derecho"></span>
                </div>

                <p class="carga-anillos__texto">Tu Invitación · 2026</p>
            </div>
        `;

        const estilos = document.createElement("style");

        estilos.textContent = `
            .carga-anillos {
                position: fixed;
                inset: 0;
                z-index: 99999;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 18px;
                background: #fffdf8;
            }

            .carga-anillos__figura {
                position: relative;
                width: 90px;
                height: 90px;
            }

            .carga-anillos__izquierdo,
            .carga-anillos__derecho {
                position: absolute;
                top: 25px;
                width: 48px;
                height: 48px;
                border: 2px solid #b99a62;
                border-radius: 50%;
            }

            .carga-anillos__izquierdo {
                left: 12px;
                animation: anilloIzq 1s ease-in-out infinite alternate;
            }

            .carga-anillos__derecho {
                right: 12px;
                animation: anilloDer 1s ease-in-out infinite alternate;
            }

            .carga-anillos__texto {
                margin: 0;
                color: #604b3c;
                font-family: Montserrat, sans-serif;
                font-size: 11px;
                letter-spacing: 2px;
                text-transform: uppercase;
            }

            @keyframes anilloIzq {
                to {
                    transform: translateX(8px) rotate(-15deg);
                }
            }

            @keyframes anilloDer {
                to {
                    transform: translateX(-8px) rotate(15deg);
                }
            }
        `;

        pantallaCarga.appendChild(estilos);
        document.body.appendChild(pantallaCarga);

        window.setTimeout(() => {
            window.location.reload();
        }, 900);
    });
}

});
