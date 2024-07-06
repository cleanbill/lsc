
class SyncComponent extends HTMLElement {

    blocked = false;

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = `<style>.sync-input-layout {
    display: grid;
    grid-template-columns: 11fr 1fr;
    width: 100%;
    place-items: center;
}

.text-center {
    text-align: center;
}

.sync-button-grid {
    display: grid;
    grid-template-columns: auto auto auto;
}

.sync-input {
    width: 100%;
    margin-left: 50px;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-scroll-snap-strictness: proximity;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    font-family: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    font-size: 80%;
    font-weight: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0.5rem;
    --tw-bg-opacity: 1;
    background-color: rgb(186 230 253 / var(--tw-bg-opacity));
    padding: 0.5rem;
    text-align: left;
}

.sync-button {
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-gradient-from-position: ;
    --tw-gradient-via-position: ;
    --tw-gradient-to-position: ;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    font-family: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
    margin: 0;
    padding: 0;
    text-transform: none;
    -webkit-appearance: button;
    background-image: none;
    cursor: pointer;
    height: 1.5rem;
    width: 2.5rem;
    place-self: center;
    border-radius: 0.75rem;
    --tw-bg-opacity: 1;
    background-color: rgb(186 230 253 / var(--tw-bg-opacity));
    font-size: 70%;
    line-height: 1rem;
    --tw-text-opacity: 1;
    color: rgb(153 27 27 / var(--tw-text-opacity));
}

.left {
    justify-self: left;
}

.right {
    justify-self: right;
}

.error {
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-feature-settings: normal;
    font-variation-settings: normal;
    -webkit-tap-highlight-color: transparent;
    line-height: inherit;
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-scroll-snap-strictness: proximity;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
    margin-bottom: 0.5rem;
    width: 100%;
    border-radius: 0.75rem;
    --tw-bg-opacity: 1;
    background-color: rgb(239 68 68 / var(--tw-bg-opacity));
    padding: 0.75rem;
    text-align: center;
    margin: 10px;
}</style>
                <div data-testid="sync-main" id='main-sync'>
                    <div class="sync-input-layout" id="token-input-layout">
                        <input data-testid="sync-token-input" id='sync-token-input' autoFocus=true class="sync-input"
                            placeholder="Whats the token"></input>
                        <div><button id="sync-token-post-butt" data-testid="sync-token-post-butt" class="sync-button">Post</button>
                        </div>
                    </div>

                    <div id='button-layout'>
                        <div class="error" id="message"></div>
                        <div data-testid='sync-butt-grid' id='sync-butt-grid' class='sync-button-grid'>
                            <button data-testid="sync-load-butt" id="sync-load-butt" class="sync-button left">Sync</button>
                            <button data-testid="sync-clear-butt" id="sync-clear-butt" class="sync-button"
                                onClick={clearToken}>Clear</button>
                            <button data-testid="sync-save-butt" id="sync-save-butt" class="sync-button right">Send</button>
                        </div>
                    </div>
                </div>`;
        shadowRoot.innerHTML = template;
    }

    register(id, fn) {
        const butt = this.getElement(id);
        this.registerButton(butt, fn);
    }

    toast(message, messageType = 'ERROR') {
        const el = this.getElement('message');
        el.style.display = 'block';
        el.style.backgroundColor = messageType == 'INFO' ? 'lightblue' : 'red';
        el.innerHTML = message;

        setTimeout(() => {
            el.style.display = 'none';
        }, 5000);

    }

    registerButton(butt, fn) {
        if (!butt) return;
        butt.onclick = (e) => fn(e);
    }

    swapInput() {
        const key = window.localStorage.getItem("API_KEY");
        const ti = this.getElement("token-input-layout");
        const bl = this.getElement("button-layout");
        if (key) {
            ti.style.display = 'none';
            bl.style.display = 'block';
        } else {
            ti.style.display = 'grid';
            bl.style.display = 'none';
            const input = (this.getElement("sync-token-input"));
            input.focus();
            input.value = '';
        }
    }

    async getData() {
        const token = window.localStorage.getItem("API_KEY");
        const URL = this.getAttribute("url") || 'local-sync/';
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", "X-API-KEY": token },
        };
        const response = await fetch(URL, requestOptions);
        if (response.status != 200) {
            this.toast('Failed to Sync data');
            return;
        }
        let data;
        try {

            data = await response.text();
            if (!data) {
                this.toast('Sync has no data?');
            }
            return JSON.parse(data);
        } catch (err) {
            console.error('Cannot parse data', err);
            console.error('', data);
            this.toast("Sync failed - parsing problem");
        }

    }

    fireEvent(id, data) {
        const ce = new CustomEvent(id, {
            detail: {
                data,
            },
        });
        document.dispatchEvent(ce);
    }

    async load() {
        if (this.blocked) {
            console.warn('Re-click load - blocked');
        }
        this.block();
        const data = await this.getData();
        if (data) {
            this.fireEvent("overwriteData", data);
            window.localStorage.setItem("versions-stamp", data.versionstamp);
            this.toast("Sync'd up!", "INFO");
        }
        this.release();
    }

    getElement(id) {
        return this.shadowRoot.getElementById(id);
    }

    block() {
        (this.getElement("sync-load-butt")).disabled = true;
        (this.getElement("sync-save-butt")).disabled = true;
        (this.getElement("sync-clear-butt")).disabled = true;
        this.blocked = true;
    }

    release() {
        (this.getElement("sync-load-butt")).disabled = false;
        (this.getElement("sync-save-butt")).disabled = false;
        (this.getElement("sync-clear-butt")).disabled = false;
        this.blocked = false;
    }

    clear() {
        this.updateToken("");
    }

    async save() {
        if (this.blocked) {
            console.warn('Re-click save - blocked');
        }
        this.block();
        this.checkVersion();
        const URL = this.getAttribute("url") || 'local-sync/';
        const token = window.localStorage.getItem("API_KEY");
        try {
            const data = {
                token,
                data: JSON.stringify(this.getAttribute("data"))
            };

            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-API-KEY": token },
                body: data,
            };
            const response = await fetch(URL, requestOptions);
            const backData = await response.json();
            const vs = backData.versionstamp;
            window.localStorage.setItem("versions-stamp", vs);
            this.toast("Sync data sent and saved", "INFO");
            console.log(backData)
        } catch (er) {
            console.error(er);
            console.error(response);
            this.toast('Cannot send data');
        }
        this.release();

    }

    async checkVersion() {
        const versionstamp = window.localStorage.getItem("versions-stamp");
        if (!versionstamp) {
            return;
        }
        const data = await this.getData();
        if (!data?.versionstamp || data.versionstamp != versionstamp) {
            this.toast('Cannot Send - out of sync');
            throw Error("Out of sync");
        }
    }

    updateToken(newToken) {
        window.localStorage.setItem("API_KEY", newToken);
        this.swapInput();
    }

    handleKeyDown(e, postButton) {
        if (e.key == 'Enter') {
            this.updateToken(e.target.value);

        }
        const el = e.target;
        const display = el.value?.length > 4 ? 'block' : 'none';
        postButton.style.display = display;
    }


    connectedCallback() {
        const el = this.getElement('message');
        el.style.display = 'none';

        const input = this.getElement("sync-token-input");
        input.addEventListener('keydown', (e) => this.handleKeyDown(e, postButton));

        const postButton = this.getElement("sync-token-post-butt");
        postButton.style.display = 'none';

        this.register('sync-load-butt', () => this.load());
        this.register('sync-clear-butt', () => this.clear());
        this.register('sync-save-butt', () => this.save());

        this.registerButton(postButton, () => this.updateToken(input.value));

        this.swapInput();
    }
}

customElements.define('data-sync', SyncComponent);

export default SyncComponent;
