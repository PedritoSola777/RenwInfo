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
        "Obtener un crédito",
        "Conocer tu ahorro",
        "Consultar el saldo de tu crédito",
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

    if (option === "Obtener un crédito") {
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
            Puedes<b>revisar tu estado de cuenta</b> y descargarlo, solo debes ingresar a <a href="https://micuenta.infonavit.org.mx">Mi Cuenta Infonavit</a> en la sección "Mi crédito"
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