const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector(`#username-input-signup`).value.trim();
    const password = document.querySelector(`#password-input-signup`).value.trim();

    const response = await fetch(`/api/user`, {
        method: `POST`,
        body: JSON.stringify({
            name,
            password
        }),
        headers: {
            'Content-Type': `application/json` },
    });
    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert(`Unable to signup`);
    }
};

document
    .querySelector(`.signup-form`)
    .addEventListener(`submit`, signupFormHandler);