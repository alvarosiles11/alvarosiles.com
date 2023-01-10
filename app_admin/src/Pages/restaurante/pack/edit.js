import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SHr, SList, SNavigation, SPopup, SText, SView } from 'servisofts-component';
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
    $footer() {
        return <SView col={"xs-12"} >
            <SHr />
            <SList data={this.packs} render={(obj) => {
                return <SView card col={"xs-12"} style={{ padding: 8 }}>
                    <SText>{obj.key}</SText>
                    <SText>precio: {obj.precio}</SText>
                    <SText>cantidad: {obj.cantidad}</SText>
                </SView>
            }} />
            <SHr />
        </SView>
    }
}

export default connect(index);