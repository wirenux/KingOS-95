export const ExplorerApp = {
    title: 'My Computer',
    width: '420px',
    height: '320px',

    render() {
        return `
            <div class="explorer-app">
                <div class="field-row" style="margin-bottom: 8px;">
                    <label for="explorer-address">Address:</label>
                    <input id="explorer-address" type="text" value="My Computer" readonly />
                </div>

                <div class="sunken-panel explorer-panel">
                    <table>
                        <tbody>
                            <tr><td><button class="menu-button explorer-item" type="button">3.5\" Floppy (A:)</button></td></tr>
                            <tr><td><button class="menu-button explorer-item" type="button">Local Disk (C:)</button></td></tr>
                            <tr><td><button class="menu-button explorer-item" type="button">CD-ROM Drive (D:)</button></td></tr>
                            <tr><td><button class="menu-button explorer-item" type="button">Control Panel</button></td></tr>
                            <tr><td><button class="menu-button explorer-item" type="button">Printers</button></td></tr>
                        </tbody>
                    </table>
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