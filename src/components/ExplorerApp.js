import "../explorer.css"
import fileSystem from "../data/filesystem.json"

const ROOT_PATH = fileSystem.currentPath;

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

    if (item.name === "CAINE") { // exception
        return "/icons/application.png";
    }

    if (item.name === "???") { // exception
        return "/icons/block.png";
    }

    const extension = getItemExtension(item.name);
    return ICONS_BY_EXT[extension] || "/icons/unknow.png";
}

function getDirectoryItems(path) {
    return fileSystem.directories[path] || [];
}

function joinPath(parentPath, childName) {
    return `${parentPath}\\${childName}`;
}

function getWindowPath(windowEl) {
    return windowEl.dataset.explorerPath || ROOT_PATH;
}

function renderExplorerWindow(windowEl) {
    const currentPath = getWindowPath(windowEl);
    const windowBody = windowEl.querySelector('.window-body');
    const titleBarText = windowEl.querySelector('.title-bar-text');

    windowBody.innerHTML = ExplorerApp.render(windowEl);
    titleBarText.textContent = currentPath;
    ExplorerApp.init(windowEl, windowEl._appContext || {});
}

export const ExplorerApp = {
    title: ROOT_PATH,
    icon: '/icons/open_folder.png',
    width: '615px',
    height: '505px',
    startPath: ROOT_PATH,

    render(windowEl) {
        const currentPath = getWindowPath(windowEl || { dataset: {} });
        const items = getDirectoryItems(currentPath);
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

    init(windowEl, context = {}) {
        windowEl._appContext = context;

        if (!windowEl.dataset.explorerPath) {
            windowEl.dataset.explorerPath = ROOT_PATH;
        }

        const currentPath = getWindowPath(windowEl);

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

        function openFolder(item) {
            const folderName = item.dataset.name;
            const nextPath = joinPath(currentPath, folderName);
            const nextItems = getDirectoryItems(nextPath);

            if (nextItems.length === 0) {
                return;
            }

            windowEl.dataset.explorerPath = nextPath;
            renderExplorerWindow(windowEl);
        }

        itemElements.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.stopPropagation();
                selectItem(item);
            });

            item.addEventListener('dblclick', (event) => {
                event.stopPropagation();

                if (item.dataset.type === 'folder') {
                    openFolder(item);
                }

                if (item.dataset.name === 'CAINE') {
                    context.openApp?.('caine');
                }
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