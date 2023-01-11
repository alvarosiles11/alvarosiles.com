import { SPageListProps } from 'servisofts-component';


import login from '../Login/login';
import experiencia from './admin/experiencia';
import proyecto from './admin/proyecto';
import root from './root';



const Pages: SPageListProps = {

    "/": root,
 
 

    "login": login,
    "admin/proyecto": proyecto,
    "admin/experiencia": experiencia,
 

}


export const Reducer = {
    // ...Usuario.Reducers,
    // ...Chat.Reducers,
}

export default Pages;