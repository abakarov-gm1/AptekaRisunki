import axios from "axios";

export const is_auth = () => {
    return !!localStorage.getItem('token');
}


export const login = (email, password) => {

    const data = {
        email: email,
        password: password
    };

    axios.post('http://api.abakarov/panel/login', data)
        .then(response => {
            localStorage.setItem('token', response.data.token)
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });
}

export const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
}
