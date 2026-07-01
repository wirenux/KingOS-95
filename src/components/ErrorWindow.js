import "../error.css"

export const ErrorWindow = {
    title: "Error",
    icon: "/icons/error.png",
    width: "300px",
    height: "auto",
    message: "Error",

    render(windowEl, appConfig) {
        const message = appConfig.message || 'Error';

        return `
            <div class="error-container">
                <div class="error-main-row">
                    <div class="error-image">
                        <img src="/icons/error.png" width="32px" height="32px"/>
                    </div>
                    <p class="error-text">${message}</p>
                </div>
                <div class="error-actions">
                    <button class="error-ok-btn" type="button">OK</button>
                </div>
            </div>
        `
    },

    init(windowEl, appContext) {
        const okButton = windowEl.querySelector('.error-ok-btn');

        if (okButton) {
            okButton.addEventListener('click', () => {
                const closeButton = windowEl.querySelector('[aria-label="Close"]');
                if (closeButton) {
                    closeButton.click();
                }
            });
        }
    }
}