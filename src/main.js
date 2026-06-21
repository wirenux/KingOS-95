import './style.css'
import { renderLoginScreen } from './components/LoginScreen'

export function makeDragable(windowEl, titlebarEl) {
  if (!windowEl || !titlebarEl) {
    return;
  }

  if (window.getComputedStyle(windowEl).position != 'absolute') {
    windowEl.style.position = 'absolute';
  }

  titlebarEl.addEventListener('mousedown', (e) => {

    if (e.target.closest('button') || e.target.closest('.win-btn') || windowEl.classList.contains('maximized')) {
      return;
    }

    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;

    const startLeft = parseInt(windowEl.style.left) || windowEl.offsetLeft || 20;
    const startTop = parseInt(windowEl.style.top) || windowEl.offsetTop || 20;

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
      if (workspace && newTop > maxTop) {
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


const AppState = {
  BOOT: 'BOOT',
  LOGIN: 'LOGIN',
  DESKTOP: 'DESKTOP'
}

let currentState = AppState.LOGIN; // TODO: change to boot later

export function changeState(newState) {
  currentState = newState;
  const appContainer = document.querySelector("#app");

  appContainer.innerHTML = ''; // clear page

  switch (currentState) {
    case AppState.BOOT:
      break; // TODO: add renderBootScreen
    case AppState.LOGIN:
      renderLoginScreen(appContainer);

      const loginWindow = document.querySelector('.window');
      const titleBar = document.querySelector('.title-bar');

      if (loginWindow && titleBar) {
        makeDragable(loginWindow, titleBar);
      }

      break;
    case AppState.DESKTOP:
      break; // TODO: add renderDesktop
  }
}

document.addEventListener('DOMContentLoaded', () => {
  changeState(AppState.LOGIN) // TODO: change to AppState.BOOT
})