import { SPageListProps } from 'servisofts-component'

import alquiler from './Components/alquiler';
import cliente from './Components/cliente';

const ServiceName = "yoalquilo";


const Pages: SPageListProps = {
	...alquiler.Pages,
	...cliente.Pages,
}

const Reducers = {
	...alquiler.Reducers,
	...cliente.Reducers,

}

export default {
	ServiceName,
	Pages,
	Reducers,
};