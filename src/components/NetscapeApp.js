import '../netscape.css'

export const BrowserApp = {
    title: 'Netscape Navigator',
    contentBgColor: '#C8C8C8',
    icon: '/icons/Netscape_icon.svg',
    width: '1000px',
    height: '700px',

    render() {
        return `
            <div class="netscape-app-container">
            <div id="option-bar">
                <button.default class="option-bar-btn">File</button.default>
                <button.default class="option-bar-btn">Edit</button.default>
                <button.default class="option-bar-btn">View</button.default>
                <button.default class="option-bar-btn">Go</button.default>
                <button.default class="option-bar-btn">Bookmarks</button.default>
                <button.default class="option-bar-btn">Options</button.default>
                <button.default class="option-bar-btn">Directory</button.default>
                <button.default class="option-bar-btn">Window</button.default>
                <button.default class="option-bar-btn">Help</button.default>
            </div>

            <hr />

            <div class="toolbar-wrapper">
                <div class="toolbar-left-column">
                    <div id="control-bar">
                        <button.default class="control-btn btn-back"><span class="icon control-back-arrow"></span></button.default>
                        <button.default class="control-btn btn-forward"><span class="icon control-front-arrow"></span></button.default>
                        <button.default class="control-btn btn-home"><span class="icon control-home"></span></button.default>
                        <button.default class="control-btn btn-refresh"><span class="icon control-refresh"></span></button.default>
                        <button.default class="control-btn"><span class="icon control-print"></span></button.default>
                        <button.default class="control-btn"><span class="icon control-search"></span></button.default>
                    </div>
                    <hr class="toolbar-divider" />
                    <div id="address-bar">
                        <p>Location:</p>
                        <div class="address-input-container">
                            <input class="address-input" />
                            <button.default class="address-drop-btn"></button.default>
                        </div>
                    </div>
                </div>

                <div class="toolbar-right-column">
                    <button.default class="netscape-throbber" aria-label="Play Netscape animation">
                        <video class="netscape-throbber-video" autoplay muted loop playsinline preload="auto" hidden>
                            <source src="/video/netscape.mp4" type="video/mp4">
                        </video>
                    </button.default>
                </div>
            </div>

            <div id="address-btn-bar">
                <button class="address-btn">What's New ?</button>
                <button class="address-btn">What's Cool ?</button>
                <button class="address-btn">Destination</button>
                <button class="address-btn">Net Search</button>
                <button class="address-btn">People</button>
                <button class="address-btn">Software</button>
            </div>

            <div class="browser-viewport">
                <iframe src="about:blank" class="browser-iframe"></iframe>
            </div>
        </div>
        `;
    },

    init(windowEl) {
        const addressInput = windowEl.querySelector('.address-input');
        const iframe = windowEl.querySelector('.browser-iframe');

        const backBtn = windowEl.querySelector('.btn-back');
        const forwardBtn = windowEl.querySelector('.btn-forward');
        const homeBtn = windowEl.querySelector('.btn-home');
        const refreshBtn = windowEl.querySelector('.btn-refresh');
        const throbberBtn = windowEl.querySelector('.netscape-throbber');
        const introVideo = windowEl.querySelector('.netscape-throbber-video');

        const titlebarText = windowEl.querySelector('.titlebar-title');

        function playIntroAnimation() {
            if (!introVideo) return;

            introVideo.hidden = false;
            introVideo.currentTime = 0;

            const playPromise = introVideo.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch((error) => {
                    console.warn('Unable to play Netscape intro animation:', error);
                });
            }
        }

        function navigateTo(url) {
            if (!url.trim()) return;
            let targetUrl = url.trim();
            if (!/^https?:\/\//i.test(targetUrl) && !targetUrl.startsWith('./') && !targetUrl.startsWith('about:')) {
                targetUrl = 'https://' + targetUrl;
            }

            iframe.src = targetUrl;
            addressInput.value = targetUrl;

            if (titlebarText) {
                titlebarText.textContent = `Netscape - [${targetUrl}]`;
            }
        }

        iframe.addEventListener('load', () => {
            try {
                const currentIframeUrl = iframe.contentWindow.location.href;
                if (currentIframeUrl && currentIframeUrl !== 'about:blank') {
                    addressInput.value = currentIframeUrl;
                    if (titlebarText) {
                        titlebarText.textContent = `Netscape - [${currentIframeUrl}]`;
                    }
                }
            } catch (securityError) {
                console.warn("Cross-origin navigation restriction: Can't read internal iframe deep links");
            }
        })

        addressInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') navigateTo(addressInput.value);
        });

        if (homeBtn) {
            homeBtn.addEventListener('click', () => navigateTo('wirenux.github.io/blog'));
        }

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => { iframe.src = iframe.src; });
        }

        if (throbberBtn) {
            throbberBtn.addEventListener('click', playIntroAnimation);
        }

        navigateTo('wirenux.github.io/blog');
    }
}