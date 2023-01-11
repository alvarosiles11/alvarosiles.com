import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { SComponentContainer, SNavigation } from 'servisofts-component';
import SSocket, { setProps } from 'servisofts-socket';
import Assets from './Assets';
import Pages from './Pages';
import Reducer from './Reducer';
import SConfig from './SConfig';
setProps(SConfig.SocketProps);

const store = createStore(Reducer, {}, applyMiddleware(reduxThunk),);

const App = (props) => {
    return (
        <Provider store={store}>
            <SComponentContainer
                // debug
                // socket={SSocket}
                assets={Assets}
                // background={<BackgroundImage />}
                theme={{ initialTheme: "dark", themes: SConfig.SThemeProps }}>
                <SNavigation props={{
                    prefixes: ["https://component.servisofts.com", "component.servisofts://"],
                    pages: Pages,
                    title: "App Alvaro",
                }} />
                <SSocket identificarse={(props) => {
                    var usuario = props.state.usuarioReducer.usuarioLog;
                    return { data: usuario ? usuario : {}, deviceKey: "as-asa-as", }
                }} />
                {/* <NavBar /> barraaaaaaaa  */}
            </SComponentContainer>
        </Provider>
    )
}
export default App;