var socket = io("https://bse-machine-ui.azurewebsites.net:8080");


socket.on("postMessage", function (obj) {
    let message = obj.text;
    let author = obj.author;

    let messageContainer = document.getElementById("messageContainer");
    let messageDiv = document.createElement("div");

    messageDiv.className = "messageContent";
    messageDiv.innerHTML = "AUTHOR: " + author + ", NOTE: " + message;
    messageContainer.appendChild(messageDiv);
});
