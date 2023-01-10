import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SHr, SImage, SInput, SList, SLoad, SText, SView } from 'servisofts-component';
import Model from '../../../Model';

class index extends DPA.profile {
    constructor(props) {
        super(props, { Parent: Parent, excludes: ["key", "key_servicio", "estado"] });
    }
    $allowBack(){
        return true;
    }
    $allowEdit() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $allowDelete() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $footer() {
        var datos = Model.dato.Action.getAll();
        var rol_dato = Model.rol_dato.Action.getAllBy({
            key_rol: this.pk
        });
        var allowEdit = Model.usuarioPage.Action.getPermiso({ url: "/rol/profile/datos", permiso: "edit" })
        if (!datos) return <SLoad />;
        if (!rol_dato) return <SLoad />;
        if (allowEdit == "cargando") return <SLoad />;
        return (<SView col={"xs-12"}>
            <SHr />
            <SText fontSize={16} bold>Datos</SText>
            <SHr />
            <SList
                data={datos}
                buscador
                render={(itm) => {
                    var activo = Object.values(rol_dato).find(o => o.key_dato == itm.key && o.estado > 0)
                    return <SView row col={"xs-12"} style={{
                        alignItems: 'center'
                    }}>
                        <SInput
                            col={""}
                            type={"checkBox"}
                            defaultValue={!!activo}
                            disabled={!allowEdit || !!this.props.disabled}
                            onChangeText={(e) => {
                                if (e) {
                                    Model.rol_dato.Action.registro({
                                        data: {
                                            key_dato: itm.key,
                                            key_rol: this.pk,
                                        },
                                        key_usuario: Model.usuario.Action.getKey()
                                    })
                                } else {
                                    Model.rol_dato.Action.editar({
                                        data: {
                                            ...activo,
                                            estado: 0
                                        },
                                        key_usuario: Model.usuario.Action.getKey()
                                    })
                                }
                            }} />
                        <SView width={4} />
                        <SText bold>{itm.descripcion}</SText>
                        <SView width={8} />
                        <SText>{itm.tipo}</SText>
                        <SView width={8} />
                        <SText>{itm.required ? "Requerido" : ""}</SText>
                        <SView width={8} />
                        <SText>{itm.caducable ? "Caducable" : ""}</SText>

                    </SView>

                }}
            />
        </SView>
        )
    }

}
export default connect(index);