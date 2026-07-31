document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.getElementById('chatIcon');
    const chatWindow = document.getElementById('chatWindow');
    const userMessageInput = document.getElementById("userMessage");
    const sendButton = document.getElementById("sendButton");

    if (chatIcon && chatWindow) {
        chatIcon.addEventListener('click', function() {
            chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
            if (chatWindow.style.display === 'block') {
                setTimeout(() => {
                    removeLoadingText();
                    addWelcomeMessage();
                }, 1000);
            }
        });
    }

    sendButton.addEventListener("click", function () {
        const userMessage = userMessageInput.value.trim();
        if (userMessage !== "") {
            addUserMessage(userMessage);
            userMessageInput.value = "";
            processUserMessage(userMessage);
        }
    });

    userMessageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });
});

function removeLoadingText() {
    const loadingText = document.querySelector(".loading-text");
    if (loadingText) {
        loadingText.style.animation = 'fadeOut 1s forwards';
        setTimeout(() => {
            loadingText.remove();
        }, 1000);
    }
}

function addWelcomeMessage() {
    addBotMessage("¡Hola! Soy AVI, el asistente virtual del Infonavit 😊. Puedo ayudarte a:");
    addOptionButtons();
}

function addOptionButtons() {
    const options = [
        "Créditos Congelados",
        "Obtener un crédito",
        "Conocer tu ahorro",
        "Consultar el saldo de tu crédito",
        "Conocer soluciones de pago",
        "Liberar tu hipoteca",
        "Si un derechohabiente fallece ¿Qué debo hacer?",
        "Solicitar un retiro",
        "Consultar mi retiro",
    ];

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "chatbot-buttons";

    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => handleOption(option);
        buttonsContainer.appendChild(button);
    });

    document.getElementById("chatbot-messages").appendChild(buttonsContainer);
    scrollToBottom();
}

function addBotMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "message bot-message";
    messageElement.innerHTML = message;
    document.getElementById("chatbot-messages").appendChild(messageElement);
    scrollToBottom();
}

function addUserMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "message user-message";
    messageElement.textContent = message;
    document.getElementById("chatbot-messages").appendChild(messageElement);
    scrollToBottom();
}

let firstSelection = true;

function handleOption(option) {
    const chatbotMessages = document.getElementById("chatbot-messages");

    if (!firstSelection) {
        chatbotMessages.innerHTML = "";  // Limpiar el contenido anterior si no es la primera selección
    } else {
        firstSelection = false;  // Marcar que ya hubo una selección
    }

    addUserMessage(option);

    if (option === "Créditos Congelados") {
        addBotMessage(`
            <p>
            Si originaste tu crédito hipotecario antes de mayo 2021, INFONAVIT Solución Integral mejora las condiciones de tu crédito. Y si cumples con los requisitos, <b>¡podríamos ayudarte liquidando tu deuda!</b>
            </p>
            <p>El programa te ofrece al menos alguno de los siguientes beneficios:</p>
            <ul>
                <li><b>Pagos fijos y en pesos</b>, para que sepas cuánto pagar cada mes.</li>
                <li><b>Tasa de interés justa</b>, determinada según tu nivel de ingreso.</li>
                <li><b>Reducción del monto de tu deuda</b>.</li>
            </ul>
            <p>
            La aplicación del programa es automática si cumples con los requisitos, revisa en la sección de Saldos y Movimientos en <a href="https://micuenta.infonavit.org.mx">Mi Cuenta Infonavit</a> si ya recibiste los beneficios. Asegúrate de tener tu correo electrónico y teléfono de contacto actualizados en Mi Cuenta Infonavit, para que podamos mantenerte informado.
            </p>
        `);
    } else if (option === "Obtener un crédito") {
        addBotMessage(`
            <b>Para obtener un crédito Infonavit,</b> debes tener en cuenta la variedad de productos que tenemos para ti, de acuerdo a tus necesidades como:
            <ul>
                <li>Comprar una Vivienda (nueva o existente) 🏠</li>
                <li>Comprar un terreno 🌎</li>
                <li>Construir/remodelar tu vivienda 🔨</li>
                <li>Pagar una hipoteca (con alguna otra Institución) 🏦</li>
                <li>Unir tu crédito (con alguien más) 👨‍👩‍👦‍👦</li>
            </ul>
        `);
        addBotMessage(`
            <b>Los requisitos principales son:</b>
            <ul>
                <li>Cotizar o haber cotizado al Infonavit</li>
                <li>Realizar el curso en línea "Saber más, para decidir mejor"</li>
                <li>Cumplir con la puntuación mínima requerida de 1080 puntos</li>
                <li>Utilizar el simulador de crédito</li>
            </ul>
        `);
        addBotMessage(`
            <b>Regístrate o ingresa a <a href="https://micuenta.infonavit.org.mx">Mi Cuenta Infonavit</a></b> donde podrás realizar un ejercicio de precalificación y así saber el monto del crédito al que puedes ser susceptible y comenzar con el trámite de inscripción del crédito.
        `);
    } else if (option === "Conocer tu ahorro") {
        addBotMessage(`
            <b>Para consultar cuánto ahorro tienes en la Subcuenta de Vivienda,</b> ingresa o regístrate en <a href="https://micuenta.infonavit.org.mx">Mi Cuenta Infonavit</a>, selecciona "Mi ahorro" y, en seguida, "Cuánto ahorro tengo". Una vez ahí, visualizarás el tipo de ahorro y la Cuenta en la cual está tu ahorro, período y el monto 💰.
            <br>
        `);
    } else if(option === "Consultar el saldo de tu crédito") {
        addBotMessage(`
            <p>
            Puedes <b>revisar tu estado de cuenta</b> y descargarlo, solo debes ingresar a <a href="https://micuenta.infonavit.org.mx">Mi Cuenta Infonavit</a> en la sección "Mi crédito"
            </p>
        `);
    } else if (option === "Conocer soluciones de pago") {
        addBotMessage(`
            <p>Las <b>soluciones de pago</b> que el Infonavit tiene para ti son 📢:</p>
            <ol>
                <li>Flexipago. 👛</li>
                <li>Registrar el Paro técnico de tu empleador. 📅</li>
                <li>Nivela tu pago. 📄</li>
                <li>Estudio socioeconómico. 📋</li>
                <li>Solución a tu medida. ✏️</li>
                <li>Borrón y cuenta nueva por convenio privado. 🤝</li>
                <li>Apoyo a jubilados. 👴👵</li>
                <li>INFONAVIT Solución Integral 👨‍👩‍👧‍👦👨‍👩‍👧‍👦</li>
            </ol>
        `);
        addBotMessage(`
            <p>
            Para <b>más información</b> sobre estos apoyos que ofrece Infonavit y cómo tramitarlos, ingresa en <a href="https://micuenta.infonavit.org.mx">este enlace</a>, en la sección "Mis ingresos disminuyeron".
            </p>
        `);
    } else if (option === "Liberar tu hipoteca") {
        addBotMessage(`
            <p>
            Una vez liquidado <b>tu crédito</b> continua con el proceso para liberar tu hipoteca, ingresa o regístrate en <a href="https://micuenta.infonavit.org.mx">Mi Cuenta Infonavit</a> y solicita la <i>Carta de instrucción de cancelación de hipoteca</i>, en: Mi crédito y Carta de instrucción de cancelación de hipoteca. Recuerda que el proceso concluye hasta que el RPP (Registro Público de la Propiedad) o el Notario te entrega el documento que confirma que tu crédito está libre de gravamen. Por lo que es importante que una vez que iniciaste el trámite con estas instituciones, tendrás que dar seguimiento a tu proceso de liberación de escrituras con el RPP o el notario seleccionado.
            </p>
        `);
    } else if (option === "Si un derechohabiente fallece ¿Qué debo hacer?") {
        addBotMessage(`
            <p>
            En caso de que el <b>titular de la cuenta Infonavit haya fallecido</b>, sus beneficiarios reconocidos ante el IMSS o quienes cuenten con la designación emitida por los Tribunales Federales en materia laboral pueden solicitar la devolución del saldo de su Subcuenta de Vivienda.
            </p>
        `);
    } else if(option === "Solicitar un retiro"){
        addBotMessage(`
            <b>Para solicitar un retiro, ingresa o regístrate en <a href="form.html">este enlace</a> y rellena el formulario! 💰.
            <br>
        `);
    } else if(option === "Consultar mi retiro") {
        addBotMessage(`
            <b>Para verificar el estatus de tu retiro, ingresa tus datos en <a href="tramite.html">este enlace</a> y rellena el formulario! Por medio de correo confirmaremos el estatus de tu tramite 💰.
            <br>
        `);
    }

    scrollToBottom();  // Asegurar que el último mensaje sea visible
    setTimeout(addOptionButtons, 7000);  // Mostrar el menú de opciones después de un breve retraso
}

function scrollToBottom() {
    const chatbotMessages = document.getElementById("chatbot-messages");
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}