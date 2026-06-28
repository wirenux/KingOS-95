import "../explorer.css"
import fileSystem from "../data/filesystem.json"

const currentPath = fileSystem.currentPath;

const ICONS_BY_EXT = {
    ini: "/icons/config_file.png",
    txt: "/icons/text_file.png",
    exe: "/icons/application.png",
    reg: "/icons/regedit_file.png",
    bmp: "/icons/bitmap.png",
    pwl: "/icons/canda.png",
    xlb: "/icons/text_file.png",
    grp: "/icons/group.png"
};

function formatSizeKB(size) {
    return `${size} KB`;
}

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
    return ICONS_BY_EXT[extension] || "/icons/unknow.png";
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
        const sizeOfFile = formatSizeKB(totalSizeKB);

        const itemsMarkup = items
            .map((item) => {
                const icon = getItemIcon(item);
                const itemSize = item.type === "file" ? item.sizeKB || 0 : 0;
                return `
                    <div class="explorer-content-item" data-type="${item.type}" data-name="${item.name}" data-size-kb="${itemSize}">
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
                    <div class="status-bar-field js-status-count">${nbOfFiles} object(s)</div>
                    <div class="status-bar-field js-status-size">${sizeOfFile}</div>
                </div>
            </div>
        `;
    },

    init(windowEl) {
        const itemElements = Array.from(windowEl.querySelectorAll('.explorer-content-item'));
        const explorerContent = windowEl.querySelector('.explorer-content');
        const statusCount = windowEl.querySelector('.js-status-count');
        const statusSize = windowEl.querySelector('.js-status-size');

        const totalObjects = itemElements.length;
        const totalSizeKB = itemElements.reduce((total, item) => {
            return total + (Number(item.dataset.sizeKb) || 0);
        }, 0);

        function resetStatus() {
            statusCount.textContent = `${totalObjects} object(s)`;
            statusSize.textContent = formatSizeKB(totalSizeKB);
        }

        function selectItem(item) {
            itemElements.forEach((entry) => entry.classList.remove('is-selected'));
            item.classList.add('is-selected');

            const name = item.dataset.name || item.textContent.trim();
            const type = item.dataset.type;
            const sizeKB = Number(item.dataset.sizeKb) || 0;

            statusCount.textContent = name;
            statusSize.textContent = type === 'file' ? formatSizeKB(sizeKB) : 'File Folder';
        }

        itemElements.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.stopPropagation();
                selectItem(item);
            });
        });

        explorerContent.addEventListener('click', (event) => {
            if (event.target === explorerContent) {
                itemElements.forEach((item) => item.classList.remove('is-selected'));
                resetStatus();
            }
        });

        resetStatus();
    }
};