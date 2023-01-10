import { SDate, SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";

export default class Action extends SAction {
    getHorarios() {
        var reducer = this._getReducer();
        if (reducer.horario) {
            return reducer.horario;
        }
        var key_usuario = Model.usuario.Action.getKey()
        if (!key_usuario) return null;
        if (reducer.estado == "cargando") return null;
        var petition = {
            component: "zona",
            type: "getHorarios",
            estado: "cargando",
            delivery: true,
            key_usuario: key_usuario
        }
        SSocket.send(petition);
        return null;

    }

    toTime(hora) {
        return new SDate(hora, "hh:mm").getTime()
    }
    getHorariosReducidosByKey(key_zona, day) {
        var zonas = this.getHorarios();
        if (!zonas) return null;
        var obj = zonas[key_zona];

        // var horarios = obj.horarios.filter(h => h.dia == this.state.date.getDayOfWeek())
        var horarios = obj.horarios.filter(h => h.dia == day)
        horarios = horarios.sort((a, b) => this.toTime(a.hora_inicio) - this.toTime(b.hora_inicio))
        var horariosFinal = [];
        horarios.map((obj2, i) => {
            var horario = { ...obj2 }
            if (horariosFinal.length <= 0) {
                horariosFinal.push(horario);
            } else {
                const h = {
                    ini: this.toTime(horario.hora_inicio),
                    fin: this.toTime(horario.hora_fin)
                }
                var succes = false;
                horariosFinal.map((hf) => {
                    //Cuando la hora inicio intercepta
                    if (h.ini >= this.toTime(hf.hora_inicio) && h.ini <= this.toTime(hf.hora_fin)) {
                        if (h.fin >= this.toTime(hf.hora_fin)) {
                            hf.hora_fin = horario.hora_fin;
                        }
                        succes = true;
                        return;
                    }
                    //Cuando la hora fin intercepta
                    if (h.fin >= this.toTime(hf.hora_inicio) && h.ini <= this.toTime(hf.hora_fin)) {
                        if (h.ini <= this.toTime(hf.hora_inicio)) {
                            hf.hora_inicio = horario.hora_inicio;
                        }
                        succes = true;
                        return;
                    }
                })
                if (!succes) {
                    horariosFinal.push(horario);
                }
            }

        })
        return horariosFinal;
    }
}