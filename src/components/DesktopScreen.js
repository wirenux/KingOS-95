import '../style.css'
import '../desktop.css'

import { changeState } from '../main.js'
import { ExplorerApp } from './ExplorerApp.js'
import { CaineApp } from './CaineApp.js'
import { WindowManager } from './WindowManager.js'

const APP_REGISTRY = {
  explorer: ExplorerApp,
  caine: CaineApp,
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

export function renderDesktop(parent) {

  WindowManager.init(APP_REGISTRY, parent);

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
  const desktopShortcuts = Array.from(parent.querySelectorAll('.desktop-shortcut'));

  function clearDesktopSelection() {
    desktopShortcuts.forEach((shortcut) => shortcut.classList.remove('is-selected'));
  }

  function selectDesktopShortcut(shortcut) {
    clearDesktopSelection();
    shortcut.classList.add('is-selected');
  }

  desktopShortcuts.forEach((shortcut) => {
    shortcut.addEventListener('click', (event) => {
      event.stopPropagation();
      selectDesktopShortcut(shortcut);
    });
  });

  if (workspace) {
    workspace.addEventListener('click', (event) => {
      if (event.target === workspace) {
        clearDesktopSelection();
      }
    });
  }

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
        WindowManager.spawnWindow(selectedApp);
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
          WindowManager.spawnWindow(appConfig);
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