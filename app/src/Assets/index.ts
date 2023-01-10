import { SAssets } from 'servisofts-component'

import MenuEstado, { ReactComponent as MenuEstadoW } from './svg/menuEstado.svg';
import MenuCall, { ReactComponent as MenuCallW } from './svg/menuCall.svg';
import MenuCamara, { ReactComponent as MenuCamaraW } from './svg/menuCamara.svg';
import MenuChats, { ReactComponent as MenuChatsW } from './svg/menuChats.svg';
import MenuAjustes, { ReactComponent as MenuAjustesW } from './svg/menuAjustes.svg';

const Assets: SAssets = {
    svg: {
        "MenuEstado": { Native: MenuEstado, Web: MenuEstadoW },
        "MenuCall": { Native: MenuCall, Web: MenuCallW },
        "MenuCamara": { Native: MenuCamara, Web: MenuCamaraW },
        "MenuChats": { Native: MenuChats, Web: MenuChatsW },
        "MenuAjustes": { Native: MenuAjustes, Web: MenuAjustesW },
    }
}

export default Assets;