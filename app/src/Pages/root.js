import React from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, STheme, SView } from 'servisofts-component';
const data_experiencia = [
    {
        "key": "2001",
        "empresa": "SERVISOFTS SRL",
        "cargo": "IT – Sistemas / Desarrollador Full Stack 2022",
        "time": "Actualmente trabajando",
        "tareas": ["Creación de diseños apps web y móvil", "Desarrollador full stack para aplicaciones web y móvil,", "Testing de aplicaciones", "Instalación y configuración de sistemas operativos"],
    },
    {
        "key": "2002",
        "empresa": "SYSLINK BOLIVIA",
        "cargo": "IT – Sistemas / Desarrollador Full Stack 2022",
        "time": "Actualmente trabajando",
        "tareas": ["Creación de diseños apps web y móvil", "Desarrollador full stack para aplicaciones web y móvil,", "Testing de aplicaciones", "Instalación y configuración de sistemas operativos"],
    },
    {
        "key": "2003",
        "empresa": "EL MORDISCO",
        "cargo": "IT – Sistemas / Desarrollador Full Stack 2022",
        "time": " marzo 2021  ",
        "tareas": [
            "Administrar los sistemas que tiene el Restaurante",
            "Manejo de efectivo",
            "Control de caja, contabilidad básica y arqueo",
            "Reportes",
        ],
    },
    {
        "key": "2004",
        "empresa": "MEGASYSTEM SRL",
        "cargo": "IT – Sistemas / Desarrollador Full Stack 2022",
        "time": " septiembre 2021  ",
        "tareas": [
            "Desarrollador de aplicaciones web",
            "Administrador de servidores",
            "Soporte y mantenimiento a la infraestructura de la empresa",
        ],
    },
    {
        "key": "2005",
        "empresa": "MALL FACILITO",
        "cargo": "IT – Sistemas / Desarrollador Full Stack 2022",
        "time": " septiembre 2021  ",
        "tareas": [
            "Desarrollador de aplicaciones web",
            "Administrador de servidores",
            "Soporte y mantenimiento a la infraestructura de la empresa",
        ],
    },
    {
        "key": "2006",
        "empresa": "CHINREPUESTOS AUTO PARTES",
        "cargo": "IT – Sistemas / Desarrollador Full Stack 2022",
        "time": " septiembre 2021  ",
        "tareas": [
            "Desarrollador de aplicaciones web",
            "Administrador de servidores",
            "Soporte y mantenimiento a la infraestructura de la empresa",
        ],
    },
    {
        "key": "2007",
        "empresa": "Transportadora",
        "cargo": "IT – Sistemas / Desarrollador Full Stack 2022",
        "time": " septiembre 2021  ",
        "tareas": [
            "Desarrollador de aplicaciones web",
            "Administrador de servidores",
            "Soporte y mantenimiento a la infraestructura de la empresa",
        ],
    },
    {
        "key": "2008",
        "empresa": "Universidad Nur",
        "cargo": "IT – Sistemas / Desarrollador Full Stack 2022",
        "time": " septiembre 2021  ",
        "tareas": [
            "Desarrollador de aplicaciones web",
            "Administrador de servidores",
            "Soporte y mantenimiento a la infraestructura de la empresa",
        ],
    }
];
class root extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectValue: 2001 };


    }


    item({ key, title }) {
        // var color = STheme.color.color
        return <SView flex center height onPress={() => { this.setState({ selectValue: key }) }} >
            <SView style={{ borderRadius: 16, width: 55, height: 45 }} center>
                <SText col={"xs-12"} font={"Arial"} fontSize={8} center color={STheme.color.color}  >{title}</SText>
            </SView>
        </SView>
    }


    getExperiencia(data) {
        return data_experiencia.map((obj) => {
            return <SView col={"xs-12"} center border={'yellow'}   >
                {this.item({ key: obj.key, title: obj.empresa })}
            </SView>
        })
    }

    modelo() {
        return data_experiencia.map((obj) => {
            if (obj.key == this.state.selectValue)
                return <SText col={"xs-12"}>{JSON.stringify(obj, "\n", "\t")}</SText>
            // return <SText font={"Arial"} fontSize={8} center style={{ color: "red", fontSize: 20 }} >{obj.empresa}</SText>
        })
    }



    render() {
        return (
            <SPage title={''} hidden     >
                <SView col={"xs-12"} center backgroundColor={'transparent'}>
                    <SView col={"xs-11 md-8 lg-7 xl-5 "} backgroundColor={'transparent'} row>
                        <SHr height={20} />
                        <SText style={{ color: "red", fontSize: 20 }} >02.<SText style={{ color: "blue", fontSize: 20 }}>Experiencia</SText> </SText>
                        <SHr height={20} />
                        <SView col={"xs-3"} center border={'red'}   >
                            {this.getExperiencia()}
                        </SView>
                        <SView col={"xs-9"} center border={'red'}   >
                            {this.modelo()}
                        </SView>
                    </SView>
                </SView>
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root);