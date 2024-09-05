document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    // Vérifie le token une fois le DOM chargé
    if (!token && (document.title !== 'Register' && document.title !== 'Login')) {
        location.href = '/auth/register';
        return;
    }

    // Ajouter les événements aux boutons
    const btnRegister = document.getElementById('btn_register');
    const btnLogin = document.getElementById('btn_login');

    if (btnRegister) {
        btnRegister.addEventListener('click', () => handleAuth('register'));
    }

    if (btnLogin) {
        btnLogin.addEventListener('click', () => handleAuth('login'));
    }

    const handleAuth = (authType) => {
        const emailRegisterInput = document.getElementById('email_register')?.value || "";
        const passwordRegisterInput = document.getElementById('password_register')?.value || "";

        const emailLoginInput = document.getElementById('email_login')?.value || "";
        const passwordLoginInput = document.getElementById('password_login')?.value || "";

        const isLoginType = authType === 'login';

        const email = isLoginType ? emailLoginInput : emailRegisterInput;
        const password = isLoginType ? passwordLoginInput : passwordRegisterInput;

        if (!email || !password) {
            console.log('1 Email:', email, 'Password:', password);

            document.body.innerHTML += "<h3 style='color: red'>The email or the password is empty</h3>";
            return;
        }

        console.log('2 Email:', email, 'Password:', password);

        // Préparation des données à envoyer
        const body = { username: email, password };

        // Requête POST pour signin ou signup
        fetch(`http://localhost:3000/users/${isLoginType ? 'signin' : 'signup'}`, {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.result) {
                localStorage.setItem('token', data.token);
                location.href = '../index.html';
            } else {
                document.body.innerHTML += "<h3 style='color: red'>The email or the password is not valid</h3>";
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            document.body.innerHTML += "<h3 style='color: red'>An error occurred</h3>";
        });
    };
});