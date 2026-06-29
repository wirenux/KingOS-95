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

        if (!document.getElementById('purge-animations')) {
            const style = document.createElement('style');
            style.id = 'purges-animations';
            style.innerHTML = `
                @keyframes purgeShake {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    25% { transform: translate(2px, -2px) rotate(2deg); }
                    50% { transform: translate(-2px, 2px) rotate(-2deg); }
                    75% { transform: translate(-2px, -2px) rotate(1deg); }
                    100% { transform: translate(2px, 2px) rotate(-1deg); }
                }
                .shake-effect {
                    animation: purgeShake 0.3s infinite alternate ease-in-out;
                }

                @media (max-width: 1200px) {
                    .purge-head {
                        transform: scale(0.6) !important;
                    }
                    /* Pull the offsets closer so they don't drift away when small */
                    .head-0 { top: -200px !important; left: -250px !important; }
                    .head-1 { bottom: -130px !important; right: -80px !important; }
                    .head-2 { top: -140px !important; right: 130px !important; }
                    .head-3 { bottom: -210px !important; left: -130px !important; }
                }

                /* Tablets / Mobile: Heavy panic downsizing down to 25% original size */
                @media (max-width: 800px) {
                    .purge-head {
                        transform: scale(0.25) !important;
                    }
                    .head-0 { top: -100px !important; left: -120px !important; }
                    .head-1 { bottom: -60px !important; right: -40px !important; }
                    .head-2 { top: -70px !important; right: 60px !important; }
                    .head-3 { bottom: -100px !important; left: -60px !important; }
                }
            `;
            document.head.appendChild(style);
        }

        const decorativeHeads = [
            {
                src: '/images/Caine_Sprite.gif',
                top: '-345px',
                left: '-425px',
                width: '328px',
                isBubble: false
            },
            {
                src: '/images/Caine_Sprite.gif',
                bottom: '-220px',
                right: '-135px',
                width: '232px',
                isBubble: false
            },
            {
                src: '/images/Bubble.png',
                top: '-235px',
                right: '220px',
                width: '198px',
                isBubble: true
            },
            {
                src: '/images/Bubble.png',
                bottom: '-350px',
                left: '-220px',
                width: '202px',
                isBubble: true
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

            if (head.isBubble) {
                img.classList.add('shake-effect');
            }

            windowEl.appendChild(img);
        });
    }
}