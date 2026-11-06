document.addEventListener("DOMContentLoaded", () => {
    const $ = (id) => document.getElementById(id);
    const icon = $("chatIcon");
    const win = $("chatWindow");
    const box = $("chatbot-messages");
    const form = $("chatForm");
    const input = $("userMessage");
    const closeBtn = $("chatClose");
    if (!icon || !win || !box) return;

    // Después de una respuesta NO se vuelve a mostrar el menú completo.
    // true  = aparece un solo botón compacto "Menú principal"
    // false = no aparece nada (el usuario escribe su siguiente pregunta)
    const SHOW_HOME_BUTTON = true;

    // TODO: pon aquí la URL oficial del Portal Empresarial (si se deja vacío, solo muestra el nombre)
    const PORTAL_URL = "";
    const PORTAL_LINK = PORTAL_URL ? `<a href="${PORTAL_URL}">Portal Empresarial</a>` : "Portal Empresarial";
    const MCI = '<a href="https://micuenta.infonavit.org.mx">Mi Cuenta Infonavit</a>';

    /* ============ CONTENIDO (label = botón, k = palabras clave para texto libre) ============ */
    const TOPICS = [
        {
            label: "Infonavit solución integral",
            k: ["congelad", "solucion integral"],
            msgs: [
                `<p>Si originaste tu crédito hipotecario antes de mayo 2021, INFONAVIT Solución Integral mejora las condiciones de tu crédito. Y si cumples con los requisitos, <b>¡podríamos ayudarte liquidando tu deuda!</b></p>
                 <p>El programa te ofrece al menos alguno de estos beneficios:</p>
                 <ul>
                    <li><b>Pagos fijos y en pesos</b>, para que sepas cuánto pagar cada mes.</li>
                    <li><b>Tasa de interés justa</b>, según tu nivel de ingreso.</li>
                    <li><b>Reducción del monto de tu deuda</b>.</li>
                 </ul>`,
                `<p>La aplicación es automática si cumples los requisitos. Revisa en "Saldos y movimientos" de ${MCI} si ya recibiste los beneficios, y mantén actualizados tu correo y teléfono.</p>`
            ]
        },
        {
            label: "Obtener un crédito",
            k: ["obtener", "solicitar un credito", "pedir un credito", "requisitos", "comprar", "construir"],
            msgs: [
                `<b>Para obtener un crédito Infonavit</b> tenemos productos según tus necesidades:
                 <ul>
                    <li>Comprar una vivienda (nueva o existente) 🏠</li>
                    <li>Comprar un terreno 🌎</li>
                    <li>Construir o remodelar tu vivienda 🔨</li>
                    <li>Pagar una hipoteca con otra institución 🏦</li>
                    <li>Unir tu crédito con alguien más 👨‍👩‍👦‍👦</li>
                 </ul>`,
                `<b>Requisitos principales:</b>
                 <ul>
                    <li>Cotizar o haber cotizado al Infonavit</li>
                    <li>Realizar el curso en línea "Saber más, para decidir mejor"</li>
                    <li>Cumplir con la puntuación mínima de 1080 puntos</li>
                    <li>Utilizar el simulador de crédito</li>
                 </ul>`,
                `<b>Regístrate o ingresa a ${MCI}</b>, donde podrás hacer una precalificación, conocer el monto al que puedes aspirar y comenzar tu trámite.`
            ]
        },
        {
            label: "Conocer tu ahorro",
            k: ["ahorro", "subcuenta"],
            msgs: [
                `<b>Para consultar cuánto ahorro tienes en la Subcuenta de Vivienda</b>, ingresa o regístrate en ${MCI}, selecciona "Mi ahorro" y luego "Cuánto ahorro tengo". Ahí verás el tipo de ahorro, la cuenta, el período y el monto 💰.`
            ]
        },
        {
            label: "Consultar el saldo de tu crédito",
            k: ["saldo", "estado de cuenta", "cuanto debo"],
            msgs: [
                `<p>Puedes <b>revisar y descargar tu estado de cuenta</b> ingresando a ${MCI}, en la sección "Mi crédito".</p>`
            ]
        },
        {
            label: "Conocer soluciones de pago",
            k: ["soluciones de pago", "pago", "pagar", "desempleo", "no puedo pagar", "ingresos"],
            msgs: [
                `<p>Las <b>soluciones de pago</b> del Infonavit son 📢:</p>
                 <ol>
                    <li>Flexipago 👛</li>
                    <li>Registrar el paro técnico de tu empleador 📅</li>
                    <li>Nivela tu pago 📄</li>
                    <li>Estudio socioeconómico 📋</li>
                    <li>Solución a tu medida ✏️</li>
                    <li>Borrón y cuenta nueva por convenio privado 🤝</li>
                    <li>Apoyo a jubilados 👴👵</li>
                    <li>INFONAVIT Solución Integral 👨‍👩‍👧‍👦</li>
                 </ol>`,
                `<p>Para <b>más información</b> y cómo tramitarlos, ingresa a <a href="https://micuenta.infonavit.org.mx">este enlace</a>, sección "Mis ingresos disminuyeron".</p>`
            ]
        },
        {
            label: "Liberar tu hipoteca",
            k: ["hipoteca", "liberar", "escrituras", "gravamen"],
            msgs: [
                `<p>Una vez liquidado <b>tu crédito</b>, ingresa o regístrate en ${MCI} y solicita la <i>Carta de instrucción de cancelación de hipoteca</i> en: Mi crédito → Carta de instrucción de cancelación de hipoteca.</p>
                 <p>El proceso concluye hasta que el RPP (Registro Público de la Propiedad) o el notario te entrega el documento que confirma que tu crédito está libre de gravamen, por lo que debes dar seguimiento con la institución seleccionada.</p>`
            ]
        },
        {
            label: "Si un derechohabiente fallece ¿Qué debo hacer?",
            k: ["fallec", "murio", "difunto", "beneficiari", "defuncion"],
            msgs: [
                `<p>Si el <b>titular de la cuenta Infonavit falleció</b>, sus beneficiarios reconocidos ante el IMSS, o quienes cuenten con la designación emitida por los Tribunales Federales en materia laboral, pueden solicitar la devolución del saldo de su Subcuenta de Vivienda.</p>`
            ]
        },
        {
            label: "Consultar mi retiro",
            k: ["estatus", "status", "consultar mi retiro", "consultar retiro", "seguimiento"],
            msgs: [
                `<p><b>Para verificar el estatus de tu retiro</b>, ingresa tus datos en <a href="tramite.html">este enlace</a> y llena el formulario. Te confirmaremos el estatus por correo 💰.</p>`
            ]
        },
        {
            label: "Solicitar un retiro",
            k: ["solicitar un retiro", "retiro", "retirar"],
            msgs: [
                `<p><b>Para solicitar un retiro</b>, ingresa en <a href="form.html">este enlace</a> y llena el formulario 💰.</p>`
            ]
        },
        {
            label: "Conocer el portal empresarial",
            k: ["portal empresarial", "empresarial", "patron", "empresa"],
            msgs: ["Seleccione una opción"],
            sub: [
                {
                    label: "Quiero registrarme",
                    msgs: [`<p>Para registrarte en el ${PORTAL_LINK}, ingresa al portal y selecciona la opción de registro. Sigue las indicaciones en pantalla.</p>`]
                },
                {
                    label: "No puedo registrarme",
                    msgs: [`<p>Revisa que los datos capturados sean correctos y vuelve a intentarlo. Si el problema continúa, escribe tu pregunta en el chat indicando en qué paso te detienes.</p>`]
                },
                {
                    label: "Olvidé contraseña",
                    msgs: [`<p>En la pantalla de inicio de sesión del ${PORTAL_LINK}, selecciona la opción para recuperar tu contraseña y sigue las instrucciones.</p>`]
                },
                {
                    label: "Trámites",
                    msgs: [`<p>Escribe el trámite que necesitas realizar en el ${PORTAL_LINK} y te oriento.</p>`]
                },
                {
                    label: "Consultas",
                    msgs: [`<p>Escribe tu consulta sobre el ${PORTAL_LINK} y con gusto te ayudo.</p>`]
                }
            ]
        },
        {
            label: "Quiero hacer otra pregunta",
            k: ["otra pregunta"],
            free: true,
            msgs: ["Con gusto, ¿en qué te puedo ayudar?"]
        }
    ];

    const WELCOME = "¡Hola! <strong>Soy AVI</strong>, el asistente virtual del Infonavit 😊. <strong>Puedo ayudarte a:</strong>";
    const FALLBACK = "No encontré una respuesta para eso 🤔. Elige una de las opciones o reformula tu pregunta:";

    /* ============ UTILIDADES ============ */
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    let busy = false;
    let started = false;

    function scrollBottom() {
        box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
    }

    function addMessage(role, content) {
        const el = document.createElement("div");
        el.className = `message ${role}-message`;
        if (role === "user") el.textContent = content;     // texto del usuario nunca como HTML
        else {
            el.innerHTML = content;
            el.querySelectorAll('a[href^="http"]').forEach((a) => {
                a.target = "_blank";
                a.rel = "noopener noreferrer";
            });
        }
        box.appendChild(el);
        return el;
    }

    function removeMenu() {
        box.querySelectorAll(".chatbot-buttons").forEach((m) => m.remove());
    }

    function showMenu(items = TOPICS, withBack = false) {
        removeMenu();                                       // nunca más de un menú
        const menu = document.createElement("div");
        menu.className = "chatbot-buttons";
        items.forEach((t) => {
            const b = document.createElement("button");
            b.type = "button";
            b.textContent = t.label;
            b.addEventListener("click", () => selectTopic(t));
            menu.appendChild(b);
        });
        if (withBack) {
            const back = document.createElement("button");
            back.type = "button";
            back.textContent = "← Menú principal";
            back.addEventListener("click", () => { if (!busy) { showMenu(TOPICS); scrollBottom(); } });
            menu.appendChild(back);
        }
        box.appendChild(menu);
    }

    // Botón único y compacto (no es el menú completo)
    function showHome() {
        removeMenu();
        const wrap = document.createElement("div");
        wrap.className = "chatbot-buttons chatbot-buttons--home";
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = "↩ Menú principal";
        b.addEventListener("click", () => { if (!busy) { showMenu(TOPICS); scrollBottom(); } });
        wrap.appendChild(b);
        box.appendChild(wrap);
    }

    /* Muestra "escribiendo…", luego las respuestas y al final el menú (una sola vez) */
    async function reply(messages, { menu = TOPICS, back = false, feedback = false, home = false } = {}) {
        busy = true;
        removeMenu();
        const typing = addMessage("bot", '<span class="typing" aria-label="Escribiendo"><i></i><i></i><i></i></span>');
        scrollBottom();
        await wait(600);
        typing.remove();

        let first = null, last = null;
        for (let i = 0; i < messages.length; i++) {
            const el = addMessage("bot", messages[i]);
            first = first || el;
            last = el;
            if (i < messages.length - 1) await wait(350);
        }
        if (feedback && last) addFeedback(last);
        if (menu) showMenu(menu, back);
        else if (home && SHOW_HOME_BUTTON) showHome();

        // Llevar al inicio de la respuesta (no al final del menú)
        if (first) box.scrollTo({ top: Math.max(0, first.offsetTop - 10), behavior: "smooth" });
        busy = false;
    }

    function selectTopic(topic) {
        if (busy) return;
        removeMenu();
        addMessage("user", topic.label);
        respondTo(topic);
    }

    async function respondTo(topic) {
        if (topic.sub) return reply(topic.msgs, { menu: topic.sub, back: true });
        if (topic.free) {
            await reply(topic.msgs, { menu: false });
            if (input) input.focus({ preventScroll: true });
            return;
        }
        return reply(topic.msgs, { feedback: true, menu: false, home: true });
    }

    function addFeedback(msgEl) {
        const row = document.createElement("div");
        row.className = "feedback";
        [["👍", "up", "Me sirvió"], ["👎", "down", "No me sirvió"]].forEach(([emoji, value, label]) => {
            const b = document.createElement("button");
            b.type = "button";
            b.textContent = emoji;
            b.setAttribute("aria-label", label);
            b.addEventListener("click", () => {
                row.querySelectorAll("button").forEach((x) => {
                    x.disabled = true;
                    x.classList.toggle("selected", x === b);
                });
                // Engánchate aquí para analítica: document.addEventListener("avi:feedback", ...)
                document.dispatchEvent(new CustomEvent("avi:feedback", { detail: { value, text: msgEl.textContent.trim().slice(0, 120) } }));
            });
            row.appendChild(b);
        });
        msgEl.appendChild(row);
    }

    function findTopic(text) {
        const q = norm(text);
        return TOPICS.find((t) => t.k.some((k) => q.includes(k)));
    }

    /* ============ EVENTOS ============ */
    function openChat() {
        win.classList.add("open");
        icon.setAttribute("aria-expanded", "true");
        if (!started) {                                     // bienvenida solo la primera vez
            started = true;
            reply([WELCOME]);
        } else {
            scrollBottom();
        }
        if (input) setTimeout(() => input.focus({ preventScroll: true }), 50);
    }

    function closeChat() {
        win.classList.remove("open");
        icon.setAttribute("aria-expanded", "false");
    }

    icon.setAttribute("role", "button");
    icon.setAttribute("tabindex", "0");
    icon.setAttribute("aria-label", "Abrir asistente virtual");
    icon.setAttribute("aria-expanded", "false");
    icon.addEventListener("click", () => (win.classList.contains("open") ? closeChat() : openChat()));
    icon.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); icon.click(); }
    });

    if (closeBtn) closeBtn.addEventListener("click", closeChat);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && win.classList.contains("open")) closeChat();
    });

    if (form && input) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (!text || busy) return;
            input.value = "";
            removeMenu();
            addMessage("user", text);
            const topic = findTopic(text);
            if (topic) respondTo(topic);
            else reply([FALLBACK]);
        });
    }
});