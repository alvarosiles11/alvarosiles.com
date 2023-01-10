import SSocket, { SSocketConfigProps } from "./SSocket";
export type SSocketProps = SSocketConfigProps;

var DefautlConfig = null;
export function getDefaultConfig(): SSocketConfigProps {
    return DefautlConfig;
}
export const setProps = (props: SSocketProps) => {
    DefautlConfig = props;
}
export default SSocket;