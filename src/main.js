import './style.css'
import "98.css";
import { renderLoginScreen } from './components/LoginScreen'
import { renderDesktop } from './components/DesktopScreen';
import { renderBootScreen } from './components/BootScreen';

window.addEventListener("load", () => { // enable crt
    const crt = document.querySelector(".container");
    crt.classList.add("crt-off");

    setTimeout(() => {
      crt.classList.remove("crt-off");
      crt.classList.add("crt-on");
    }, 300);
});

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

let currentState = AppState.BOOT;

export function changeState(newState) {
  currentState = newState

  const appContainer = document.querySelector("#app")
  const biosRoot = document.getElementById('bios-root')
  const crtContainer = document.querySelector(".container")

  appContainer.innerHTML = ''
  if (biosRoot) {
    biosRoot.innerHTML = ''
  }

  if (crtContainer) {
    crtContainer.classList.toggle("os-active", currentState !== AppState.BOOT)
  }

  switch (currentState) {
    case AppState.BOOT:
      renderBootScreen(document.getElementById('bios-root'), changeState);
      break

    case AppState.LOGIN:
      renderLoginScreen(appContainer, changeState);

      const loginWindow = document.querySelector('.loginWindow')
      const titleBar = document.querySelector('.title-bar')

      if (loginWindow && titleBar) {
        requestAnimationFrame(() => {
          const scale = 1.25

          const centerX = ((window.innerWidth / scale) - loginWindow.offsetWidth) / 2
          const centerY = ((window.innerHeight / scale) - loginWindow.offsetHeight) / 2

          loginWindow.style.left = `${centerX}px`
          loginWindow.style.top = `${centerY}px`

          makeDragable(loginWindow, titleBar)
        })
      }
      break

    case AppState.DESKTOP:
      renderDesktop(appContainer, changeState);
      break
  }
}

document.addEventListener('DOMContentLoaded', () => {
  changeState(currentState);
})