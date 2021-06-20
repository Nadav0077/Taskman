import { Overlay } from "./Overlay";

export function ModalWrapper({ children, onClick }) {
    return <>
        <Overlay onClick={onClick}>
            {children}
        </Overlay>
    </>
}