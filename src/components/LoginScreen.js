import '../style.css'
import '../login.css'

import { changeState } from '../main.js'

export function renderLoginScreen(parent) {
    parent.innerHTML = `
        <div class="window loginWindow" style="width: 380px;">
            <div class="title-bar">
                <div class="title-bar-text">Welcome to Windows</div>
                <div class="title-bar-controls">
                    <button aria-label="Help" type="button"></button>
                    <button aria-label="Close" type="button"></button>
                </div>
            </div>

            <form id="login-form" class="window-body login-grid">
                <div class="login-main">

                    <div class="login-instruction">
                        <img src="/icons/key.png" class="keyIcon" alt="Windows Security Key" />
                        <p class="instruction-text">Type a user name and password to log on to Windows.</p>
                    </div>

                    <div class="field-row login-field">
                        <label for="username"><span class="underline">U</span>ser name:</label>
                        <input id="username" name="username" type="text" value="kinger"/>
                    </div>
                    <div class="field-row login-field">
                        <label for="password"><span class="underline">P</span>assword:</label>
                        <input id="password" name="password" type="password"/>
                    </div>
                </div>

                <div class="login-actions">
                    <button id="login-submit" type="submit">OK</button>
                    <button id="login-cancel" type="button">Cancel</button>
                </div>
            </form>
        </div>
    `
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = loginForm.username.value;
        const password = loginForm.password.value;

        if (username === 'kinger' && password === "quennie123") {
            changeState('DESKTOP');
        }
    })

    const cancelButton = document.getElementById('login-cancel');
    cancelButton.addEventListener('click', () => {
        loginForm.username.value = '';
        loginForm.password.value = '';
    })
}