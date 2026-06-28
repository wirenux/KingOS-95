import "../explorer.css"
import fileSystem from "../data/filesystem.json"

const currentPath = fileSystem.currentPath;

const ICONS_BY_EXT = {
    ini: "/icons/settings.png",
    txt: "/icons/documents.png"
};

function getItemExtension(fileName) {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex <= 0 || lastDotIndex === fileName.length - 1) {
        return "";
    }
    return fileName.slice(lastDotIndex + 1).toLowerCase();
}

function getItemIcon(item) {
    if (item.type === "folder") {
        return "/icons/folder.png";
    }

    const extension = getItemExtension(item.name);
    return ICONS_BY_EXT[extension] || "/icons/documents.png";
}

export const ExplorerApp = {
    title: currentPath,
    icon: '/icons/open_folder.png',
    width: '600px',
    height: '420px',

    render() {
        const items = fileSystem.directories[currentPath] || [];
        const nbOfFiles = items.length;
        const totalSizeKB = items
            .filter((item) => item.type === "file")
            .reduce((total, item) => total + (item.sizeKB || 0), 0);
        const sizeOfFile = `${totalSizeKB} KB`;

        const itemsMarkup = items
            .map((item) => {
                const icon = getItemIcon(item);
                return `
                    <div class="explorer-content-item" data-type="${item.type}">
                        <img class="explorer-content-icon" src="${icon}" alt="${item.type}">
                        <span>${item.name}</span>
                    </div>
                `;
            })
            .join("");

        return `
            <div class="explorer-app">
                <div class="option-bar">
                    <button.default class="option-bar-btn" type="button">File</button.default>
                    <button.default class="option-bar-btn" type="button">Edit</button.default>
                    <button.default class="option-bar-btn" type="button">View</button.default>
                    <button.default class="option-bar-btn" type="button">Help</button.default>
                </div>
                <div class="explorer-content">
                    ${itemsMarkup}
                </div>
                <div class="status-bar">
                    <div class="status-bar-field">${nbOfFiles} object(s)</div>
                    <div class="status-bar-field">${sizeOfFile}</div>
                </div>
            </div>
        `;
    },

    init(windowEl) {
        const items = windowEl.querySelectorAll('.explorer-content-item');

        items.forEach((item) => {
            item.addEventListener('click', () => {
                console.log(`Open ${item.textContent}`);
            });
        });
    }
};