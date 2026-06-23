import '../style.css'
import '../desktop.css'

import { changeState } from '../main.js'

let clockInterval;

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
    parent.innerHTML = `
        <div id="desktop">
          <div id="workspace"></div>

          <div id="taskbar">
            <button class="start-menu-btn">
              <img class="start-btn-image" src="/icons/logo.png" />
              <span>Start</span>
            </button>

            <div id="start-menu">
              <div class="start-menu-item">Test1</div>
              <div class="start-menu-item">Test2</div>
              <div class="start-menu-item">Test3</div>
              <div class="start-menu-item">Test4</div>
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

    startBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startMenu.classList.toggle('show');
    })

    document.addEventListener('click', () => {
      startMenu.classList.remove('show');
    });

    // Clock
    updateClock();
    clearInterval(clockInterval);
    clockInterval = setInterval(updateClock, 1000);
}