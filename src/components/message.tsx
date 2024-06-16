import { useEffect, useState } from "react";
import { MessageType, Toast } from "../types";


type Props = {
    toast: Toast;
}

const Message = (props: Props) => {

    const [show, setShow] = useState(true)

    useEffect(() => {
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 5000);
    }, [props])

    return (show && <h1 className={props.toast.messageType == MessageType.INFO ? "text-center w-full rounded-xl p-3 mb-2 bg-orange-300" : "text-center w-full rounded-xl p-3 mb-2 bg-red-500"}>{props.toast.message}</h1>)
}

export default Message