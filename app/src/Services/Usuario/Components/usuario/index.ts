//  COMPONENT CONFIG
const component = "usuario"; // COMPONENT NAME
const version = "2.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";
import CerrarSession from "./Pages/CerrarSession";
import Lista from "./Pages/Lista";
import Login from "./Pages/Login";
import LoginFacebook from "./Pages/LoginFacebook";
import LoginGmail from "./Pages/LoginGmail";
import NuevoPass from "./Pages/NuevoPass";
import Perfil from "./Pages/Perfil";
import RecuperarPass from "./Pages/RecuperarPass";
import Registro from "./Pages/Registro";
//alvaro
export default {
    component,
    version,
    Actions,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {
        "cerrarsession": CerrarSession,
        ["admin/" + component]: Lista,
        "login": Login,
        "loginfacebook": LoginFacebook,
        "logingmail": LoginGmail,
        [component + "/nuevaContrasena"]: NuevoPass,
        [component + "/perfil"]: Perfil,
        [component + "/recuperarContrasena"]: RecuperarPass,
        [component + "/registro"]: Registro,
    }
}