import './../../App.css';
import './../../index.css';
import {useState} from "react";
import {login} from "../../services/Auth/Auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Добавлено для показа пароля
    const [errorMessage, setErrorMessage] = useState(""); // Для вывода ошибки

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await login(email, password);
            if (!result) { // Предполагаем, что login возвращает объект с полем success
                setErrorMessage('');
            }
        } catch (error) {
            setErrorMessage("");
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Вход</h2>

                {errorMessage && ( // Если есть ошибка, показываем её
                    <div className="mb-4 text-red-500 text-sm">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Пароль
                        </label>
                        <input
                            type={showPassword ? "text" : "password"} // Показываем пароль, если чекбокс активен
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Show Password Checkbox */}
                    <div className="mb-6 flex items-center">
                        <input
                            id="show-password"
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)} // Переключаем видимость пароля
                            className="mr-2"
                        />
                        <label htmlFor="show-password" className="text-sm text-gray-700">Показать пароль</label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                    >
                        Войти
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;
