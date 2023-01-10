import DPA, { connect } from 'servisofts-page';
import { SDate, SHr, SList, SLoad, SNavigation, SText, SView } from 'servisofts-component';

import Model from '../../../../Model'

const Parent = {
    name: "horario",
    path: "/restaurante/horario",
    model: Model.horario
}
class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            type: "componentTitle",
            excludes: ["key", "fecha_on", "key_usuario", "estado", "latitude", "longitude", "descripcion"],
            // item: Item,

        });
    }
    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }

    onNew() {
        SNavigation.navigate(Parent.path + "/new", { key_restaurante: this.props.key_restaurante })
    }

    $allowTable() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" });
    }
    $filter(data) {
        return data.estado != 0
    }
    $getData() {
        return Parent.model.Action.getAllBy({ key_restaurante: this.props.key_restaurante });
    }

    $render() {
        this.data = this.$getData();
        if (!this.data) return <SLoad />
        var packs = Model.pack.Action.getAll();
        if (!packs) return <SLoad />
        return <SList
            data={[0, 1, 2, 3, 4, 5, 6]}
            render={(dia) => {
                var horariosDia = Model.horario.Action.getAllBy({
                    key_restaurante: this.props.key_restaurante,
                    dia: dia
                })


                if (Object.values(horariosDia).length <= 0) return null;
                return <SView>
                    <SText fontSize={14} bold>{SDate.getDayOfWeek(dia).text}</SText>
                    <SHr />
                    <SList
                        horizontal
                        data={horariosDia}
                        order={[{ key: "hora_inicio", order: "asc", peso: 1 }]}
                        render={(data) => {
                            var packs_resta = Model.pack.Action.getAllBy({
                                key_horario: data.key
                            });

                            return <SView style={{
                                padding: 4
                            }}>
                                <SView card center style={{
                                    padding: 8
                                }} onPress={() => {
                                    SNavigation.navigate("/restaurante/horario/edit", { pk: data.key })
                                }}>
                                    <SText fontSize={14}>{data.hora_inicio} - {data.hora_fin}</SText>
                                    <SHr />
                                    <SText fontSize={14}>{"C.P. ( " + (data.porcentaje_comision ?? 0) + "%)"}</SText>
                                    {/* <SHr /> */}
                                    {/* <SText fontSize={14}>{Object.keys(packs_resta).length}</SText> */}
                                </SView>
                            </SView>
                        }}
                    />
                    <SHr />
                </SView>
            }}
        />
    }
}
export default connect(index);