// Login logic
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then(data => {
        if (data.success) {
            window.location.href = '/chat.html';
        } else {
            const errorMessage = document.getElementById("errorMessage");
            errorMessage.style.display = "block";
            errorMessage.textContent = "Invalid username or password. Please try again.";
        }
    });
});

// Chat functionality
document.getElementById("sendMessageBtn").addEventListener("click", function() {
    const message = document.getElementById("messageInput").value;
    if (message) {
        fetch('/api/sendMessage', {
            method: 'POST',
            body: JSON.stringify({ message }),
            headers: { 'Content-Type': 'application/json' }
        }).then(() => {
            document.getElementById("messageInput").value = '';
        });
    }
});

// Load friends list and messages
window.onload = function() {
    fetch('/api/receiveMessage')
        .then(response => response.json())
        .then(data => {
            const friendsList = document.getElementById("friends");
            const messages = document.getElementById("messages");
            
            // Load friends
            data.friends.forEach(friend => {
                const li = document.createElement("li");
                li.textContent = friend;
                friendsList.appendChild(li);
            });

            // Load messages
            data.messages.forEach(msg => {
                const div = document.createElement("div");
                div.textContent = msg;
                messages.appendChild(div);
            });
        });
};
