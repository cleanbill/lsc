"use client"
import { useLocalStorage } from "usehooks-ts";
import { KeyboardEvent, useEffect, useState } from "react";
import { API_KEY, MessageType, Toast, VERSIONS_STAMP } from "../types";
import Message from "./message";


type Props = {
    overwriteData: Function;
    data: any;
}


const Sync = (props: Props): JSX.Element => {

    const [mounted, setMounted] = useState(false);
    const [tokenTyped, setTokenTyped] = useState(false);
    const [toast, setToast] = useState({} as Toast);
    const [versionstamp, setVersionstamp] = useLocalStorage(VERSIONS_STAMP, 0);
    const [token, setToken] = useLocalStorage(API_KEY, "munch");

    let blocked = false;

    useEffect(() => {
        setMounted(true);
    }, []);

    const error = (message: string) => {
        setToast({ message, messageType: MessageType.ERROR });
    }

    const info = (message: string) => {
        setToast({ message, messageType: MessageType.INFO });
    }

    const getData = async () => {
        const URL = 'sync/';
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", "X-API-KEY": token },
        };
        const response = await fetch(URL, requestOptions);
        if (response.status != 200) {
            error('Failed to Sync data');
            return;
        }
        try {
            const data = await response.json();
            if (!data) {
                error('Sync has no data?');
            }
            return data;
        } catch (err) {
            console.error('Cannot parse data', err);
            error("Sync failed - parsing problem");
        }
    }

    const load = async () => {
        if (blocked) {
            console.warn('Re-click load - blocked');
        }
        block();
        const data = await getData();
        if (data) {
            props.overwriteData(data);
            setVersionstamp(data.versionstamp);
            info("Sync'd up!");
        }
        release();
    }

    const checkVersion = async () => {
        if (versionstamp == 0) {
            return;
        }
        const data = await getData();
        if (data.versionstamp != versionstamp) {
            error('Cannot Send - out of sync');
            throw Error("Out of sync");
        }
    }

    const save = async () => {
        if (blocked) {
            console.warn('Re-click save - blocked');
        }
        block();
        checkVersion();
        const URL = 'sync/';
        const data = {
            token,
            data: props.data
        };

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-API-KEY": token },
            body: JSON.stringify(data),
        };
        const response = await fetch(URL, requestOptions);
        if (response.status != 200) {
            error('Cannot Send - Server Error: ' + response.status);
            release();
            return;
        }
        try {
            const backData = await response.json();
            const vs = backData.versionstamp;
            setVersionstamp(vs);
            info("Sync sent and saved");
            console.log(backData)
        } catch (er) {
            error('Cannot Send - error');
            console.error(er);
            console.error(response);
        }
        release();
    }

    const hasToken = token != 'munch';
    const noToken = !hasToken;

    const updateToken = () => {
        if (!tokenTyped) {
            return;
        }
        const el = document.getElementById("sync-token-input") as HTMLInputElement;
        setToken(el.value);
    }

    const clearToken = () => {
        setToken("munch");
    }

    const block = () => {
        (document.getElementById("sync-load-butt") as HTMLButtonElement).disabled = true;
        (document.getElementById("sync-save-butt") as HTMLButtonElement).disabled = true;
        (document.getElementById("sync-clear-butt") as HTMLButtonElement).disabled = true;
        blocked = true;
    }

    const release = () => {
        (document.getElementById("sync-load-butt") as HTMLButtonElement).disabled = false;
        (document.getElementById("sync-save-butt") as HTMLButtonElement).disabled = false;
        (document.getElementById("sync-clear-butt") as HTMLButtonElement).disabled = false;
        blocked = false;
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            updateToken();

        }
        const el = document.getElementById("sync-token-input") as HTMLInputElement;
        setTokenTyped(el.value?.length > 0);
    }

    return (
        <div data-testid="sync-main" id='main-sync' className="m-3">
            {mounted && noToken && <div className="text-center">
                <input data-testid="sync-token-input" id='sync-token-input' autoFocus={true} onKeyUp={(e) => handleKeyDown(e)} className="w-4/5 bg-sky-200 text-left p-2 rounded-lg" placeholder="Whats the token"></input>
                {tokenTyped && <button data-testid="sync-token-post-butt" className="ml-2 w-10 text-black bg-sky-200 hover:bg-blue-200 focus:outline-none focus:ring hover:pr-0 focus:ring-yellow-300 text-xs rounded-xl h-8" disabled={tokenTyped} onClick={updateToken}>Post</button>}
            </div>}

            {mounted && hasToken && <div>
                <Message toast={toast}></Message>
                <div data-testid='sync-butt-grid' id='sync-butt-grid' className='grid grid-cols-3'>
                    <button data-testid="sync-load-butt" id="sync-load-butt" className="w-10 text-red-800 bg-sky-200  hover:bg-blue-200 focus:outline-none focus:ring hover:pr-0 focus:ring-yellow-300 text-xs rounded-xl h-6 float-start" onClick={load} >Sync</button>
                    <button data-testid="sync-clear-butt" id="sync-clear-butt" className="w-10 text-red-800 bg-sky-200  hover:bg-blue-200 focus:outline-none focus:ring hover:pr-0 focus:ring-yellow-300 text-xs rounded-xl h-6 place-self-center" onClick={clearToken} >Clear</button>
                    <button data-testid="sync-save-butt" id="sync-save-butt" className="w-10 text-green-800 bg-sky-200  hover:bg-blue-200 focus:outline-none focus:ring hover:pr-0 focus:ring-yellow-300 text-xs rounded-xl h-6 place-self-end" onClick={save} >Send</button>
                </div>
            </div>}
        </div >
    )
}

export default Sync