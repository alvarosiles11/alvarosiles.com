import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SForm, SHr, SList, SNavigation, SPopup, SText, SView } from 'servisofts-component';
import Model from '../../../Model';

class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: []
        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $getData() {
        this.packs = Model.pack.Action.getAllBy({ key_horario: this.pk })
        var data = Parent.model.Action.getByKey(this.pk);
        if (!data || !this.packs) return null;
        return data;
    }
    $onSubmit(data) {
        Parent.model.Action.editar({
            data: {
                ...this.data,
                ...data
            },
            key_usuario: ""
        }).then((resp) => {
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
    $inputs() {
        var imp = super.$inputs();
        imp["hora_inicio"].col = "xs-5.5"
        imp["hora_fin"].col = "xs-5.5"
        return imp;
    }
    $submitName() {
        return ""
    }
    $footer() {
        var arr_pack = Object.values(this.packs);
        var pack = {};
        if (arr_pack) {
            pack = arr_pack[0]
        }
        return <SView col={"xs-12"} >
            <SForm
                row
                inputs={{
                    precio: { label: "Precio", col: "xs-5.5", type: "money", defaultValue: parseFloat(pack?.precio ?? 0).toFixed(2) },
                    cantidad: { label: "Cantidad", type: "number", col: "xs-5.5", defaultValue: pack?.cantidad },
                }}
                style={{
                    justifyContent: 'space-between',
                }}
                onSubmitName={"Aceptar"}
                onSubmit={(resp) => {
                    this.form.submit();
                    Model.pack.Action.registro({
                        data: {
                            key_horario: this.pk,
                            ...resp
                        },
                        key_usuario: Model.usuario.Action.getKey()
                    }).then((resp) => console.log(resp)).catch((e) => console.error(e))
                }}
            />
            {/* <SList data={this.packs} render={(obj) => {
                return <SView card col={"xs-12"} style={{ padding: 8 }} onPress={() => {
                    SNavigation.navigate("/restaurante/pack/profile", { pk: obj.key })
                }}>
                    <SText fontSize={10}>{obj.key}</SText>
                    <SText>precio: {obj.precio}</SText>
                    <SText>cantidad: {obj.cantidad}</SText>
                </SView>
            }} /> */}
            {/* <SHr /> */}
        </SView>
    }
}

export default connect(index);