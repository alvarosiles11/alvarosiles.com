import Usuario from './Usuario';
import Yoalquilo from './Yoalquilo';
const Pages = {
    ...Usuario.Pages,
    ...Yoalquilo.Pages,
}

const Reducers = {
    ...Usuario.Reducers,
    ...Yoalquilo.Reducers,
}

export default {
    Pages,
    Reducers
}