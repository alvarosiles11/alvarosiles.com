import { Component } from 'react';
import { connect } from 'react-redux';
import { SText, SView } from 'servisofts-component';
class ItemExp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // getItems() {
    //     console.log("memo ", this.props.data?.empresa)

    //     return <>
    //         <SView col={"xs-12"} height={190} center border={'transparent'}   >
    //             <SView col={"xs-11"} center style={{ borderRadius: 8, borderWidth: 2 }}>
    //                 <SView col={"xs-11.9"} center border={STheme.color.card} style={{ borderRadius: 8, borderWidth: 2 }}>
    //                     <SView col={"xs-11"} height={30} row center border={'red'}  >
    //                         <SText fontSize={12} font={"Roboto"} >{this.props.data?.empresa}</SText>
    //                     </SView>
    //                     <SHr height={5} />
    //                 </SView>
    //             </SView>
    //         </SView>
    //     </>
    // }



    render() {
        return <>
            <SView col={"xs-12"} height={50} center border={'transparent'}   >
                <SView col={"xs-11"} center style={{ borderRadius: 8, borderWidth: 2 }}>

                    <SText fontSize={12} font={"Roboto"} >{this.props.data?.empresa}</SText>

                    {/* <SView col={"xs-11.9"} center border={STheme.color.card} style={{ borderRadius: 8, borderWidth: 2 }}>
                        <SView col={"xs-11"} height={30} row center border={'red'}  >
                            <SText fontSize={12} font={"Roboto"} >{this.props.data?.empresa}</SText>
                        </SView>
                        <SHr height={5} />
                    </SView> */}
                </SView>
            </SView>
        </>
    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ItemExp);