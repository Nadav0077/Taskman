import { OverlayAction } from "../board/taskDetails/action/actionModal/OverlayAction";

export function ModalAction({children,onClick}){
    return <>
   <OverlayAction onClick={onClick}/>
    {children}
    </>
}