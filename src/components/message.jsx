import { useEffect, useState } from "react";
import { MessageType } from "../constants";

/**
* @typedef {Object} Props
* @property {Toast} toast 
*/

/**
 * A component that shows toast messages
 * 
 * @param {Props} props - The component properties.
 * @returns {JSX.Element | null} - The JSX element to be rendered, or null if not rendering.
 */
const Message = (props) => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        const length = props?.toast?.message?.trim()?.length;
        const startShow = length ? length > 0 : false;
        setShow(startShow);
        setTimeout(() => {
            setShow(false);
        }, 5000);
    }, [props])

    return (show && <h1 className={props.toast.messageType == MessageType.INFO ? "text-center w-full rounded-xl p-3 mb-2 bg-orange-300" : "text-center w-full rounded-xl p-3 mb-2 bg-red-500"}>{props.toast.message}</h1>)
}

export default Message