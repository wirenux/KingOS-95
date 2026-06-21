import './style.css'
import { renderLoginScreen } from './components/LoginScreen'

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
      break;
    case AppState.DESKTOP:
      break; // TODO: add renderDesktop
  }
}

document.addEventListener('DOMContentLoaded', () => {
  changeState(AppState.LOGIN) // TODO: change to AppState.BOOT
})

document.querySelector('#app').innerHTML = `
  <div id="desktop">
    <p>Test W95F</p>
    <div id="workspace">

    </div>
    <div id="taskbar">

    </div>

    <div id="clock-widget">
      <div class="clock-icon"></div>
      <div class="clock">--:--</div>
    </div>
  </div>
`