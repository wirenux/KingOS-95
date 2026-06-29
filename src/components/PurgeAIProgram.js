export const PurgeAIProgram = {
    title: "Purge AI Program",

    icon: "/images/Caine_Sprite.gif",
    width: "500px",
    height: "100px",

    render(windowEl) {
        return `
            <div class="empty-canvas" style="height: 100%; display: flex; align-items: center; justify-content: center; background: #fff;">
                <span style="color: #808080; font-family: monospace;">[ Empty Window Canvas ]</span>
            </div>
        `;
    },

    init(windowEl, appContext) {
        windowEl.style.overflow = 'visible';

        const decorativeHeads = [
            {
                src: '/images/Caine_Sprite.gif',
                top: '-345px',
                left: '-425px',
                width: '328px'
            },
            {
                src: '/images/Caine_Sprite.gif',
                bottom: '-220px',
                right: '-135px',
                width: '232px'
            },
            {
                src: '/images/Bubble.png',
                top: '-235px',
                right: '220px',
                width: '198px'
            },
            {
                src: '/images/Bubble.png',
                bottom: '-350px',
                left: '-220px',
                width: '202px'
            }
        ];

        decorativeHeads.forEach(head => {
            const img = document.createElement('img');
            img.src = head.src;
            img.alt = "Decoration";

            img.style.position = 'absolute';
            img.style.zIndex = '9999'; 
            img.style.pointerEvents = 'none';

            img.style.imageRendering = 'pixelated'; 

            if (head.width) img.style.width = head.width;
            if (head.top) img.style.top = head.top;
            if (head.bottom) img.style.bottom = head.bottom;
            if (head.left) img.style.left = head.left;
            if (head.right) img.style.right = head.right;

            windowEl.appendChild(img);
        });
    }
}