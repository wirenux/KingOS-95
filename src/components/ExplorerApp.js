import "../explorer.css"

export const ExplorerApp = {
    title: 'Exploring - My Computer',
    icon: '/icons/search.png',
    width: '420px',
    height: '320px',

    render() {
        let nbOfFiles = 13;
        let unitForSizeOfFile = "KB"
        let sizeOfFile = `816 ${unitForSizeOfFile}`;

        return `
            <div class="explorer-app">
                <div class="option-bar">
                    <button.default class="option-bar-btn" type="button">File</button.default>
                    <button.default class="option-bar-btn" type="button">Edit</button.default>
                    <button.default class="option-bar-btn" type="button">View</button.default>
                    <button.default class="option-bar-btn" type="button">Help</button.default>
                </div>
                <div class="status-bar">
                    <div class="status-bar-field">${nbOfFiles} object(s)</div>
                    <div class="status-bar-field">${sizeOfFile}</div>
                </div>
            </div>
        `;
    },

    init(windowEl) {
        const items = windowEl.querySelectorAll('.explorer-item');

        items.forEach((item) => {
            item.addEventListener('click', () => {
                console.log(`Open ${item.textContent}`);
            });
        });
    }
};