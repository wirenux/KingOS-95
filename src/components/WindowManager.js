let topZIndex = 10;
const APP_REGISTRY = {

};

export const WindowManager = {
    init(appRegistry, desktopParent) {
        this.registry = appRegistry;
        this.parent = desktopParent;
    },

    /**
     * Spawns window
     * @param {Object} appConfig - The configuration object
     */
    spawnWindow(appConfig) {
        const workspace = this.parent.querySelector('#workspace');
        const taskbarApps = this.parent.querySelector('#taskbar-apps');

        if (!workspace || !taskbarApps) {
            return null;
        }

        const windowId = `win-${Math.random().toString(36).slice(2, 9)}`;
        const windowEl = document.createElement('div');
        windowEl.className = 'window app-window';
        windowEl.dataset.id = windowId;

        topZIndex += 1;
        windowEl.style.zIndex = `${topZIndex}`;
        windowEl.style.left = `${20 + workspace.querySelectorAll('.app-window').length * 24}px`;
        windowEl.style.top = `${20 + workspace.querySelectorAll('.app-window').length * 24}px`;
        windowEl.style.width = appConfig.width || '420px';
        windowEl.style.height = appConfig.height || '320px';

        if (appConfig.startPath) {
            windowEl.dataset.explorerPath = appConfig.startPath;
        }

        const appContext = {
            openApp: (appName) => {
                const app = this.registry[appName];
                if (app) {
                    this.spawnWindow(app);
                }
            }
        }

        windowEl._appContext = appContext;

        windowEl.innerHTML = `
            <div class="title-bar">
                <div class="title-bar-left">
                    ${appConfig.icon ? `<img src="${appConfig.icon}" class="title-bar-icon"/>` : ''}
                    <div class="title-bar-text">${appConfig.title}</div>
                </div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <div class="window-body">
                ${appConfig.render(windowEl)}
            </div>
        `

        const taskButton = document.createElement('button');
        taskButton.type = 'button';
        taskButton.className = 'taskbar-app-button';
        taskButton.textContent = appConfig.title;
        taskbarApps.appendChild(taskButton);


        function focusWindow() {
            taskbarApps.querySelectorAll('.taskbar-app-button').forEach((button) => {
            button.classList.remove('focused');
            });

            taskButton.classList.add('focused');

            if (windowEl.classList.contains('minimized')) {
            windowEl.classList.remove('minimized');
            }

            topZIndex += 1;
            windowEl.style.zIndex = `${topZIndex}`;
        }

        function closeWindow() {
            windowEl.remove();
            taskButton.remove();
        }

        windowEl.addEventListener('mousedown', focusWindow);

        taskButton.addEventListener('click', (event) => {
            event.stopPropagation();

            if (windowEl.classList.contains('minimized')) {
            focusWindow();
            return;
            }

            windowEl.classList.add('minimized');
            taskButton.classList.remove('focused');
        });

        const minimizeButton = windowEl.querySelector('[aria-label="Minimize"]');
        const closeButton = windowEl.querySelector('[aria-label="Close"]');
        const titleBar = windowEl.querySelector('.title-bar');

        minimizeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            windowEl.classList.add('minimized');
            taskButton.classList.remove('focused');
        });

        closeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            closeWindow();
        });

        this._makeWindowDraggable(windowEl, titleBar);

        workspace.appendChild(windowEl);
        focusWindow();

        if (typeof appConfig.init === 'function') {
            appConfig.init(windowEl, appContext);
        }

        return windowEl;
    },

    /**
     * Mouse pointer movement translation pipeline tracking loop
     * @private
     */

    _makeWindowDraggable(windowEl, titlebarEl) {
        if (!windowEl || !titlebarEl) {
            return;
        }

        titlebarEl.addEventListener('mousedown', (event) => {
            if (event.target.closest('button') || windowEl.classList.contains('maximized')) {
            return;
            }

            event.preventDefault();

            const startX = event.clientX;
            const startY = event.clientY;
            const startLeft = parseInt(windowEl.style.left, 10) || windowEl.offsetLeft || 20;
            const startTop = parseInt(windowEl.style.top, 10) || windowEl.offsetTop || 20;
            const workspace = document.getElementById('workspace');
            const workspaceHeight = workspace ? workspace.clientHeight : window.innerHeight;
            const titlebarHeight = titlebarEl.offsetHeight;

            function onMouseMove(moveEvent) {
            const scale = 1.25;
            const deltaX = (moveEvent.clientX - startX) / scale;
            const deltaY = (moveEvent.clientY - startY) / scale;

            let newLeft = startLeft + deltaX;
            let newTop = startTop + deltaY;

            if (newTop < 0) {
                newTop = 0;
            }

            const maxTop = workspaceHeight - titlebarHeight;
            if (newTop > maxTop) {
                newTop = maxTop;
            }

            windowEl.style.left = `${newLeft}px`;
            windowEl.style.top = `${newTop}px`;
            }

            function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }
}