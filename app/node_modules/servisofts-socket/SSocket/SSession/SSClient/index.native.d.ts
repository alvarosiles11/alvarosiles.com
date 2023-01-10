import { SSocketConfigProps } from "../..";
import SSession from '../index';
export default class SSClient {
    socket: any;
    props: SSocketConfigProps;
    SSession: any;
    url: any;
    constructor(props: SSocketConfigProps, SSession: SSession);
    isOpen(): boolean;
    open(): void;
    close(): void;
    send(data: any): void;
}
