import './App.css';
import './index.css';
import Login from "./components/Login/Login";
import {is_auth} from './services/Auth/Auth'
import Home from "./components/Home/home";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {Navigate, Route, Router, Routes} from "react-router-dom";


function App() {

    return (
        <Provider store={store}>
            <Routes>
                {is_auth() ?
                    <>
                        <Route element={<h1>Hello world</h1>} path={"/"}></Route>
                        <Route index element={<Home />}></Route>
                        <Route path="*" element={<Navigate to="/" />} /> {/* Перенаправление на /, если страница не найдена */}

                    </>
                        :
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<Navigate to="/login" />} /> {/* Перенаправление на /login по умолчанию */}

                    </>
                }

            </Routes>

        </Provider>
    )
}

export default App;



