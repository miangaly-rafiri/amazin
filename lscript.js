document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message); // Affiche un message de succès

                // Rediriger l'utilisateur vers page-single.html
                window.location.href = 'page-single.html'; // Redirection vers page-single.html
            } else {
                const error = await response.text();
                alert(error); // Affiche un message d'erreur si les identifiants sont incorrects
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Une erreur est survenue, veuillez réessayer.');
        }
    });
});
