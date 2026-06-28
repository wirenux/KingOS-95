export const ExplorerApp = {
    title: 'Exploring - My Computer',
    icon: '/icons/search.png',
    width: '420px',
    height: '320px',

    render() {
        return `
            <div class="explorer-app">
                
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