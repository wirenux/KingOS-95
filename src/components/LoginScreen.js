import '../style.css'
import '../login.css'
import { changeState } from '../main.js'

export function renderLoginScreen(parent) {
    parent.innerHTML = `
        <div class="window loginWindow" style="width: 300px">
            <div class="title-bar">
                <div class="title-bar-text">Welcome to Windows</div>
                <div class="title-bar-controls">
                <button aria-label="Help"></button>
                <button aria-label="Close"></button>
                </div>
            </div>
            <div class="window-body">
                <div class="keyIcon"></div>
                <p>Type a user name and password to log on to Windows.</p>
                <div class="loginButton">
                    <input type="submit" />
                    <button>Cancel</button>
                </div>
                <div class="field-row usernameInput">
                    <label for="text17">User name:</label> <!-- TODO: Underline the 1st letter & add padding right -->
                    <input id="text17" type="text" value="kinger"/>
                </div>
                <div class="field-row passwordInput">
                    <label for="text17">Password:</label> <!-- TODO: Underline the 1st letter & add padding right -->
                    <input id="text17" type="password"/>
                </div>
            </div>
        </div>
    `
}