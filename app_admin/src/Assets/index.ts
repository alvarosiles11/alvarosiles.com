import { SAssets } from 'servisofts-component';

import Logo, { ReactComponent as LogoW } from './svg/logo.svg';
import logoCompleto, { ReactComponent as logoCompletoW } from './svg/logoCompleto.svg';
import profile2, { ReactComponent as profile2W } from './svg/profile2.svg';


const Assets: SAssets = {
    svg: {
        "Logo": { Native: Logo, Web: LogoW },
        "logoCompleto": { Native: logoCompleto, Web: logoCompletoW },
        "profile2": { Native: profile2, Web: profile2W },
    }
}

export default Assets;