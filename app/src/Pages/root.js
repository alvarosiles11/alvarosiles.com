import React from 'react';
import { connect } from 'react-redux';
import { SHr, SImage, SPage, SText, STheme, SView } from 'servisofts-component';
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


const data_proyecto = [
    {
        "key": "2001",
        "nombre": "Calistenia",
        "descripcion": "Monitoring application made from scratch with auth module, configurable graphics, configurable alarms, and user management. It also has feedback form logic for parameter configuration.",
        "foto": "https://i.ytimg.com/vi/KVMn06NGFdg/maxresdefault.jpg",
        "tecnologia": [
            "java",
            "node",
            "react",
            "react native",
            "javascript"]
    },
    {
        "key": "2002",
        "nombre": "tepeke",
        "descripcion": "Monitoring application made from scratch with auth module, configurable graphics, configurable alarms, and user management. It also has feedback form logic for parameter configuration.",
        "foto": "https://i.ytimg.com/vi/KVMn06NGFdg/maxresdefault.jpg",
        "tecnologia": [
            "java",
            "node",
            "react",
            "react native",
            "javascript"]
    },
    {
        "key": "2003",
        "nombre": "motonet",
        "descripcion": "Monitoring application made from scratch with auth module, configurable graphics, configurable alarms, and user management. It also has feedback form logic for parameter configuration.",
        "foto": "https://i.ytimg.com/vi/KVMn06NGFdg/maxresdefault.jpg",
        "tecnologia": [
            "java",
            "node",
            "react",
            "react native",
            "javascript"]
    },
    {
        "key": "2004",
        "nombre": "casa grande",
        "descripcion": "Monitoring application made from scratch with auth module, configurable graphics, configurable alarms, and user management. It also has feedback form logic for parameter configuration.",
        "foto": "https://i.ytimg.com/vi/KVMn06NGFdg/maxresdefault.jpg",
        "tecnologia": [
            "java",
            "node",
            "react",
            "react native",
            "javascript"]
    },


];

class root extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectValue: 2001 };
    }
    getExpMenu(data) {
        return data_experiencia.map((obj) => {
            return <SView col={"xs-12"} center border={'yellow'}   >
                <SView flex center height onPress={() => { this.setState({ selectValue: obj.key }) }} >
                    <SView style={{ borderRadius: 16, height: 45 }} center>
                        <SText col={"xs-12"} fontSize={14} center color={STheme.color.color}  >{obj.empresa}</SText>
                    </SView>
                </SView>
            </SView>
        })
    }

    gettareas(data) {
        return data.map((obj) => {
            return <SText col={"xs-12"} fontSize={14} color={STheme.color.color}  >{obj}</SText>
        })
    }


    getTecnology(data) {
        return data.map((obj) => {
            return <SText col={"xs-2"} fontSize={14} color={STheme.color.color}  >{obj}</SText>
        })
    }

    getExpDetail() {
        return data_experiencia.map((obj) => {
            if (obj.key == this.state.selectValue)
                // return <SText col={"xs-12"}>{JSON.stringify(obj, "\n", "\t")}</SText>
                return <SView>
                    <SText col={"xs-12"} font={"Arial"} fontSize={14} color={STheme.color.color}  >{obj.empresa}</SText>
                    <SText col={"xs-12"} font={"Arial"} fontSize={14} color={STheme.color.color}  >{obj.cargo}</SText>
                    <SText col={"xs-12"} font={"Arial"} fontSize={14} color={STheme.color.color}  >{obj.time}</SText>
                    <SText col={"xs-12"} font={"Arial"} fontSize={14} color={STheme.color.color}  >tareas realizadas</SText>
                    {this.gettareas(obj.tareas)}
                </SView>
        })
    }
    getProject() {
        return data_proyecto.map((obj) => {
            return <SView col={"xs-12 "} height={300} row>
                <SView col={"xs-6"} center border={'red'}   >
                    <SView style={{ width: "100%", height: "90%", borderWidth: 1, borderColor: STheme.color.card }}>
                        <SImage src={obj.foto} style={{ width: "100%", height: "100%", resizeMode: "cover" }} />
                    </SView>
                </SView>
                <SView col={"xs-6"} center border={'red'}   >
                    <SText col={"xs-12"} font={"Arial"} fontSize={14} color={STheme.color.color}  >Proyecto destacado</SText>
                    <SText col={"xs-12"} font={"Arial"} fontSize={14} color={STheme.color.color}  >{obj.nombre}</SText>
                    <SText col={"xs-12"} font={"Arial"} fontSize={14} color={STheme.color.color}  >{obj.descripcion}</SText>
                    <SView col={"xs-12"} row border={'red'}   >
                        {this.getTecnology(obj.tecnologia)}
                    </SView>
                </SView>
            </SView>
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
                            {this.getExpMenu()}
                        </SView>
                        <SView col={"xs-9"} center border={'red'}   >
                            {this.getExpDetail()}
                        </SView>
                    </SView>
                    {/* <SView col={"xs-12 md-11 "} row>
                        <SHr height={20} />
                        <SText style={{ color: "red", fontSize: 20 }} >03.<SText style={{ color: "blue", fontSize: 20 }}>Proyecto</SText> </SText>
                        <SHr height={20} />
                        <SView col={"xs-12"} center border={'red'}   >
                            {this.getProject()}
                        </SView>
                    </SView> */}
                    <SHr height={60} />
                </SView>
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root);