import '../controlPan.css'

export const ControlPanel = {
    title: "Control Panel",
    icon: "/icons/ctrlPan-mini.png",
    width: "300px",
    height: "auto",

    render(windowEl, appConfig) {
        return `
            <div class="controlPan-app">
                <div class="option-bar">
                    <button.default class="option-bar-btn" type="button">File</button.default>
                    <button.default class="option-bar-btn" type="button">Edit</button.default>
                    <button.default class="option-bar-btn" type="button">View</button.default>
                    <button.default class="option-bar-btn" type="button">Help</button.default>
                </div>
                <div class="controlPan-container">
                    <div class="controlPan-shortcut" data-app="display">
                        <div class="controlPan-icon icon-display"></div>
                        <div class="controlPan-label">Display</div>
                    </div>
                </div>
            </div>
        `
    },

    init(windowEl, appContext) {
        const shortcuts = Array.from(windowEl.querySelectorAll('.controlPan-shortcut'));
        const container = windowEl.querySelector('.controlPan-container');

        function clearSelection() {
            shortcuts.forEach((shortcut) => shortcut.classList.remove('is-selected'));
        }

        shortcuts.forEach((shortcut) => {
            shortcut.addEventListener('click', (event) => {
                event.stopPropagation();
                clearSelection();
                shortcut.classList.add('is-selected');
            });

            shortcut.addEventListener('dblclick', (event) => {
                event.stopPropagation();
                const appName = shortcut.dataset.app;

                if (appName) {
                    appContext.openApp?.(appName);
                }
            });
        });

        if (container) {
            container.addEventListener('click', (event) => {
                if (event.target === container) {
                    clearSelection();
                }
            });
        }
    }
}