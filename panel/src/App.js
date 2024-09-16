import './App.css';
import './index.css';
import Login from "./components/Login/Login";
import {is_auth} from './services/Auth/Auth'
import Home from "./components/Home/home";
import {Provider} from "react-redux";
import {store} from "./store/store";


function App() {

    return (
        <Provider store={store}>
            {is_auth() ? <Home/> : <Login/>}
        </Provider>
    )
}

export default App;



