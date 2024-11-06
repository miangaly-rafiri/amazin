document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Vérifie si l'email est 'john@example.com'
        if (email === 'john@example.com') {
            // Redirige vers x.html si l'email correspond
            window.location.href = 'x.html'; // Redirection vers x.html
        } else {
            // Redirige vers page-simple.html si l'email ne correspond pas
            window.location.href = 'page-single.html'; // Redirection vers page-simple.html
        }
    });
});
