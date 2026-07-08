import "../displaySettings.css"

export const DisplayApp = {
    title: 'Display Properties',
    icon: '/icons/display.png',
    width: '420px',
    height: '445px',

    wallpapers: {
        none: '/images/wallpaper/None.png',
        'black-thatch': '/images/wallpaper/Black_Thatch.png',
        'blue-rivets': '/images/wallpaper/Blue_Rivets.png',
        bubble: '/images/wallpaper/Bubbles.png',
        triangle: '/images/wallpaper/Triangles.png',
        waves: '/images/wallpaper/Waves.png',
    },

    render() {
        return `
            <div class="display-container">
                <menu role="tablist">
                    <li role="tab" aria-selected="true"><a href="">Background</a></li>
                    <li role="tab"><a href="#">Screen Saver</a></li>
                    <li role="tab"><a href="#">Appearance</a></li>
                    <li role="tab"><a href="#">Settings</a></li>
                </menu>
                <div class="display-content window" role="tabpanel">
                    <div class="window-body">
                        <div class="screen-overlay">
                            <div class="screen-content" aria-hidden="true"></div>
                            <img class="screen-frame" src="/images/display.png" alt="Display preview" />
                        </div>
                        <div class="display-settings-panels">
                            <fieldset>
                                <legend id="wallpaper-screen">Settings</legend>
                                <div class="wallpaper-display-style">
                                    <p id="wallpaper-display-style-text">CRT Effect:</p>
                                    <div class="wallpaper-display-style-options">
                                        <div class="field-row">
                                            <input id="crt-effect-on" name="crt-effect" type="radio" checked>
                                            <label id="crt-effect-on-text" for="crt-effect-on">On</label>
                                        </div>
                                        <div class="field-row">
                                            <input id="crt-effect-off" name="crt-effect" type="radio">
                                            <label id="crt-effect-off-text" for="crt-effect-off">Off</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend id="wallpaper-screen">Wallpaper</legend>
                                <div class="wallpaper-list" role="group" aria-label="Wallpaper list">
                                    <button.default type="button" class="wallpaper-option is-selected" data-wallpaper="none" aria-pressed="true">
                                        <span class="wallpaper-option-label">None</span>
                                    </button.default>
                                    <button.default type="button" class="wallpaper-option" data-wallpaper="black-thatch" aria-pressed="false">
                                        <span class="wallpaper-option-label">Black Thatch</span>
                                    </button.default>
                                    <button.default type="button" class="wallpaper-option" data-wallpaper="blue-rivets" aria-pressed="false">
                                        <span class="wallpaper-option-label">Blue Rivets</span>
                                    </button.default>
                                    <button.default type="button" class="wallpaper-option" data-wallpaper="bubble" aria-pressed="false">
                                        <span class="wallpaper-option-label">Bubble</span>
                                    </button.default>
                                    <button.default type="button" class="wallpaper-option" data-wallpaper="triangle" aria-pressed="false">
                                        <span class="wallpaper-option-label">Triangle</span>
                                    </button.default>
                                    <button.default type="button" class="wallpaper-option" data-wallpaper="waves" aria-pressed="false">
                                        <span class="wallpaper-option-label">Waves</span>
                                    </button.default>
                                </div>
                                <div class="wallpaper-display-style">
                                    <p id="wallpaper-display-style-text">Display:</p>
                                    <div class="wallpaper-display-style-options">
                                        <div class="field-row">
                                            <input id="wallpaper-display-tile" name="wallpaper-display-style" type="radio" checked>
                                            <label id="wallpaper-display-tile-text" for="wallpaper-display-tile">Tile</label>
                                        </div>
                                        <div class="field-row">
                                            <input id="wallpaper-display-center" name="wallpaper-display-style" type="radio">
                                            <label id="wallpaper-display-center-text" for="wallpaper-display-center">Center</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div class="display-action-button">
                            <button type="button">OK</button>
                            <button type="button">Cancel</button>
                            <button type="button">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    init(windowEl) {
        const wallpaperOptions = Array.from(windowEl.querySelectorAll('.wallpaper-option'));
        const screenContent = windowEl.querySelector('.screen-content');
        const applyButton = windowEl.querySelector('.display-action-button button:last-child');
        const wallpaperMap = this.wallpapers;
        const desktopEl = document.getElementById('workspace');
        let selectedWallpaper = 'none';

        function applyWallpaper(wallpaperName) {
            const wallpaperUrl = wallpaperMap[wallpaperName] || null;

            if (!screenContent) {
                return;
            }

            screenContent.dataset.wallpaper = wallpaperName;
            screenContent.style.backgroundImage = wallpaperUrl ? `url("${wallpaperUrl}")` : 'none';
            screenContent.style.backgroundRepeat = 'repeat';
            screenContent.style.backgroundPosition = 'top left';
        }

        function applyDesktopWallpaper(wallpaperName) {
            const wallpaperUrl = wallpaperMap[wallpaperName] || null;

            if (!desktopEl) {
                return;
            }

            desktopEl.dataset.wallpaper = wallpaperName;
            desktopEl.style.backgroundImage = wallpaperUrl ? `url("${wallpaperUrl}")` : 'none';
            desktopEl.style.backgroundRepeat = 'repeat';
            desktopEl.style.backgroundPosition = 'top left';
        }

        function selectWallpaper(selectedOption) {
            selectedWallpaper = selectedOption.dataset.wallpaper || 'none';

            wallpaperOptions.forEach((option) => {
                const isSelected = option === selectedOption;
                option.classList.toggle('is-selected', isSelected);
                option.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
            });

            applyWallpaper(selectedWallpaper);
        }

        wallpaperOptions.forEach((option) => {
            option.addEventListener('click', () => selectWallpaper(option));
        });

        applyButton?.addEventListener('click', () => {
            applyDesktopWallpaper(selectedWallpaper);
        });

        applyWallpaper('none');
    }
}