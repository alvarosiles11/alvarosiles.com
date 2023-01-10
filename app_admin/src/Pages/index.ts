import { SPage, SPageListProps } from 'servisofts-component';

import Root from './root';
import login from './login';
import profile from './profile';
import usuario from './usuario';
import empresa from './empresa';
import rol from './rol';
import cliente from './cliente';
import sucursal from './sucursal';
import ajustes from './ajustes';
import marketing from './marketing';
import restaurante from './restaurante';
import zona from './zona'
import billetera from './billetera';
import test from './test';
import finanzas from './finanzas';
import conciliacion from './conciliacion';
import chat from './chat';
export default SPage.combinePages("/", {
    "": Root,
    "login": login,
    "test": test,
    ...profile,
    ...usuario,
    ...empresa,
    ...rol,
    ...sucursal,
    ...ajustes,
    ...cliente,
    ...marketing,
    ...restaurante,
    ...zona,
    ...billetera,
    ...finanzas,
    ...conciliacion,
    ...chat
});