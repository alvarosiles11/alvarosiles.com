import { SPageListProps } from 'servisofts-component'

const ServiceName = "usuario";

import usuario from './Components/usuario';


const Pages: SPageListProps = {
	...usuario.Pages
}

const Reducers = {
	...usuario.Reducers,

}

export default {
	ServiceName,
	Pages,
	Reducers,
};