async function signUpFunction(e) {

    e.preventDefault();

    const username = document.querySelector('#usernameSignUp').value.trim();
    const password = document.querySelector('#passwordSignUp').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/login');

        } else {
            alert(response.statusText);
        }
    }
}

const signUpBtn = document.querySelector('.signUp-box');
signUpBtn.addEventListener("submit", signUpFunction);