import React from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, SView } from 'servisofts-component';
const data_experiencia = [
    {
        "empresa": "SERVISOFTS SRL",
        "cargo": "IT – Sistemas / Desarrollador Full Stack 2022",
        "time": "Actualmente trabajando",
        "tareas": ["Creación de diseños apps web y móvil", "Desarrollador full stack para aplicaciones web y móvil,", "Testing de aplicaciones", "Instalación y configuración de sistemas operativos"],
    },
    {
        "empresa": "SYSLINK BOLIVIA",
        "cargo": "IT – Sistemas / Desarrollador Full Stack 2022",
        "time": "Actualmente trabajando",
        "tareas": ["Creación de diseños apps web y móvil", "Desarrollador full stack para aplicaciones web y móvil,", "Testing de aplicaciones", "Instalación y configuración de sistemas operativos"],
    },
    {
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
        this.state = {
        };
    }


    getExperiencia(data) {




        return <SView col={"xs-12"} row height  >

            <SView col={"xs-3 md-3 lg-3"} height border={'yellow'} center  >
            </SView>

            <SView col={"xs-9 md-9 lg-9"} height border={'blue'} center  >

            </SView>
        </SView>

    }

    render() {
        return (
            <SPage title={''} hidden disableScroll height >
                <SView col={"xs-12"} center height backgroundColor={'transparent'}>
                    <SView col={"xs-12"} flex height backgroundColor={'transparent'}  >


                        <SHr height={70} />
                        <SView col={"xs-12"} height center    >
                            <SText style={{ color: "red", fontSize: 20 }} >02.<SText style={{ color: "blue", fontSize: 20 }}>Experiencia</SText> </SText>
                            <SHr height={20} />
                            <SView col={"xs-11 md-8 lg-7 xl-5 "} height center row>
                                {this.getExperiencia()}
                            </SView>
                        </SView>



                    </SView>
                    <SView col={"xs-11"} flex height backgroundColor={'red'} center>
                        <SText style={{ fontSize: 50 }} >proyecto</SText>
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