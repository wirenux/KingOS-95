import '../style.css'
import '../desktop.css'

import { changeState } from '../main.js'
import { ExplorerApp } from './ExplorerApp.js'

const APP_REGISTRY = {
  explorer: ExplorerApp,
};

let clockInterval;
let topZIndex = 10;
let documentClickHandler = null;

function updateClock() {
  const clock = document.querySelector('.clock');
  if (!clock) return;

  const time = new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  clock.textContent = time;
}

function makeWindowDraggable(windowEl, titlebarEl) {
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

function spawnWindow(appConfig, parent) {
  const workspace = parent.querySelector('#workspace');
  const taskbarApps = parent.querySelector('#taskbar-apps');

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
  `;

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

  makeWindowDraggable(windowEl, titleBar);
  workspace.appendChild(windowEl);
  focusWindow();

  if (typeof appConfig.init === 'function') {
    appConfig.init(windowEl);
  }

  return windowEl;
}

export function renderDesktop(parent) {
    parent.innerHTML = `
        <div id="desktop">

          <div id="workspace">
            <div class="desktop-shortcut" data-app="explorer">
              <div class="shortcut-icon icon-computer"></div>
              <div class="shortcut-label">My Computer</div>
            </div>

            <div class="desktop-shortcut" data-app="networkn">
              <div class="shortcut-icon icon-networkn"></div>
              <div class="shortcut-label">Network Neighborhood</div>
            </div>

            <div class="desktop-shortcut" data-app="inbox">
              <div class="shortcut-icon icon-inbox"></div>
              <div class="shortcut-label">Inbox</div>
            </div>

            <div class="desktop-shortcut" data-app="bin">
              <div class="shortcut-icon icon-bin"></div>
              <div class="shortcut-label">Recycle Bin</div>
            </div>

            <div class="desktop-shortcut" data-app="briefcase">
              <div class="shortcut-icon icon-briefcase"></div>
              <div class="shortcut-label">My Briefcase</div>
            </div>
          </div>

          <div id="taskbar">
            <button class="start-menu-btn">
              <img class="start-btn-image" src="/icons/canda.png" />
              <span>Start</span>
            </button>

            <div id="start-menu">
              <div class="start-sidebar">
                <span class="start-sidebar-text">C & A<span class="version-text">95</span></span>
              </div>

              <div class="start-menu-content">
                <div class="start-menu-item" data-action="programs">
                  <img src="/icons/programs.png" class="menu-icon" onerror="this.style.display='none'"/>
                  <span>Programs</span>
                </div>
                <div class="start-menu-item" data-action="favorites">
                  <img src="/icons/favorite.png" class="menu-icon" onerror="this.style.display='none'"/>
                  <span>Favorites</span>
                </div>
                <div class="start-menu-item" data-action="documents">
                  <img src="/icons/documents.png" class="menu-icon" onerror="this.style.display='none'" style="transform: scale(1.5);"/>
                  <span>Documents</span>
                </div>
                <div class="start-menu-item" data-action="settings">
                  <img src="/icons/settings.png" class="menu-icon" onerror="this.style.display='none'" style="transform: scale(1.5);"/>
                  <span>Settings</span>
                </div>

                <hr class="start-separator" />

                <div class="start-menu-item" data-action="logoff">
                  <img src="/icons/logoff.png" class="menu-icon" onerror="this.style.display='none'" style="transform: scale(1.5);"/>
                  <span>Log Off Kinger...</span>
                </div>
                <div class="start-menu-item" data-action="shutdown">
                  <img src="/icons/shutdown.png" class="menu-icon" onerror="this.style.display='none'"/>
                  <span>Shut Down...</span>
                </div>
              </div>
            </div>

            <div id="taskbar-apps">
            </div>

            <div id="clock-widget" class="field-border-disabled" style="padding: 7px 8px 5px">
              <img class="sound-img-clock" src="/icons/sound.png" />
              <div class="clock">--:-- xM</div>
            </div>
          </div>
        </div>
    `

    // Start Btn
    const startBtn = parent.querySelector('.start-menu-btn');
    const startMenu = parent.querySelector('#start-menu');
    const workspace = parent.querySelector('#workspace');

    startBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startMenu.classList.toggle('show');
    });

    if (documentClickHandler) {
      document.removeEventListener('click', documentClickHandler);
    }

    documentClickHandler = () => {
      startMenu.classList.remove('show');
    };

    document.addEventListener('click', documentClickHandler);

    if (workspace) {
      workspace.addEventListener('dblclick', (e) => {
        const shortcut = e.target.closest('.desktop-shortcut');

        if (!shortcut) {
          return;
        }

        const appType = shortcut.dataset.app;
        const selectedApp = APP_REGISTRY[appType];

        if (selectedApp) {
          spawnWindow(selectedApp, parent);
        }
      });
    }

    // Start menu item
    const menuItems = parent.querySelectorAll('.start-menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const action = e.currentTarget.getAttribute('data-action');
        if (action === 'logoff') {
          // TODO: add an animation
          changeState('LOGIN');
        } else {
          const appConfig = APP_REGISTRY[action];

          if (appConfig) {
            spawnWindow(appConfig, parent);
          }

          console.log(`Clicked on: ${action}`);
        }
      });
    });

    // Clock
    updateClock();
    clearInterval(clockInterval);
    clockInterval = setInterval(updateClock, 1000);
}