import '../style.css'
import { changeState } from '../main.js'

export function renderDesktop(parent) {
    parent.innerHTML = `
        <div id="desktop">
          <div id="workspace"></div>

          <div id="taskbar">
            <div id="taskbar-apps">
            </div>

            <div id="system-tray">
              <div class="clock">09:04 AM</div>
            </div>
          </div>
        </div>
    `
}
