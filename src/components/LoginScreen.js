import '../style.css'
import '../login.css'

import { changeState } from '../main.js'

export function renderLoginScreen(parent) {
    parent.innerHTML = `
        <div class="window loginWindow" style="width: 380px;">
            <div class="title-bar">
                <div class="title-bar-text">Welcome to Windows</div>
                <div class="title-bar-controls">
                    <button aria-label="Help"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <div class="window-body login-grid">
                <div class="login-main">

                    <div class="login-instruction">
                        <img src="/icons/key.png" class="keyIcon" alt="Windows Security Key" />
                        <p class="instruction-text">Type a user name and password to log on to Windows.</p>
                    </div>

                    <div class="field-row login-field">
                        <label for="username"><span class="underline">U</span>ser name:</label>
                        <input id="username" type="text" value="kinger"/>
                    </div>
                    <div class="field-row login-field">
                        <label for="password"><span class="underline">P</span>assword:</label>
                        <input id="password" type="password"/>
                    </div>
                </div>

                <div class="login-actions">
                    <button id="login-submit" type="submit">OK</button>
                    <button id="login-cancel">Cancel</button>
                </div>
            </div>
        </div>
    `
}