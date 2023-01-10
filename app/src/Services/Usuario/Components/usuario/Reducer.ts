import { SStorage } from 'servisofts-component'

import Parent from './index'

type DataProps = {
    component: any,
    type: string,
    version?: any,
    estado?: "exito" | "cargando" | "error",
    error: any,
    [key: string]: any;
}

const initialState = () => {
    var initialState: any = {
        component: Parent.component,
        version: Parent.version,
    }
    SStorage.getItem("usr_log", (resp: any) => {
        initialState.usuarioLog = JSON.parse(resp);
    })
    return initialState;
}
export default (state: any, action: DataProps) => {
    if (!state) return initialState();
    if (action.component != Parent.component) return state;
    // if (action.version != Parent.version) return state;
    TypesSwitch(state, action)
    state.type = action.type;
    state.estado = action.estado;
    state.error = action.error;
    state.lastSend = new Date();
    state = { ...state };
    return state;
}

const TypesSwitch = (state: any, action: DataProps) => {
    switch (action.type) {
        case "getAll": return getAll(state, action);
        case "registro": return registro(state, action);
        case "editar": return editar(state, action);
        case "getById": return getById(state, action);
        case "login": return login(state, action);
        case "loginGmail": return loginGmail(state, action);
        case "loginFacebook": return loginFacebook(state, action);
        case "recuperarPass": return recuperarPass(state, action);
        case "verificarCodigoPass": return verificarCodigoPass(state, action);


    }
}

const getAll = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    state.data = action.data;
}
const registro = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    state.lastRegister = action.data;
    if (!state.data) return;
    state.data[action.data.key] = action.data;
}
const editar = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    if (state.usuarioLog) {
        if (state.usuarioLog.key == action.data.key) {
            state.usuarioLog = action.data;
            SStorage.setItem("usr_log", JSON.stringify(action.data));
        }
    }
    if (!state.data) return;
    state.data[action.data.key] = action.data;
}
const getById = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    state.data[action.data.key] = action.data;
}
const login = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    state.usuarioLog = action.data;
    SStorage.setItem("usr_log", JSON.stringify(action.data));
    state.login = action.data
}
const loginGmail = (state: any, action: DataProps) => {
    state.gmailData = action.data;
    if (action.estado != "exito") return;
    state.usuarioLog = action.data;
    SStorage.setItem("usr_log", JSON.stringify(action.data));
    state.login = action.data
}
const loginFacebook = (state: any, action: DataProps) => {
    state.facebookData = action.data;
    if (action.estado != "exito") return;
    state.usuarioLog = action.data;
    SStorage.setItem("usr_log", JSON.stringify(action.data));
    state.login = action.data
}
const recuperarPass = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    if (!state.data) return;
    state.data[action.data.key] = action.data;
}

const verificarCodigoPass = (state: any, action: DataProps) => {
    // if (action.estado != "exito") return;
    // state.usuarioRecuperado = action.data;
    if (action.estado === "exito") {
        state.usuarioRecuperado = action.data;
    }
    // SStorage.setItem("usr_log", JSON.stringify(action.data));
    // state.login = action.data
}