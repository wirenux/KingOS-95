export const PurgeAIProgram = {
    title: "Purge AI Program",
    icon: "/icons/canda_white.svg",
    width: "500px",
    height: "100px",

    render(windowEl) {
        return `
            <div class="empty-canvas" style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; gap: 12px; box-sizing: border-box;">
                <span style="animation: purgeBlink 1s infinite; font-size: 16px">
                    Deleting...
                </span>
                <div class="progress-indicator" style="width: 80%; max-width: 400px; height: 20px; box-sizing: border-box; position: relative; display: flex; align-items: center;">
                    <span class="progress-indicator-bar" style="height: 12px; display: block; width: 0%;"></span>
                </div>
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

                @keyframes purgeLoading {
                    0% { width: 0%; }
                    20% { width: 15%; }
                    45% { width: 55%; }
                    70% { width: 85%; }
                    100% { width: 100%; }
                }

                @keyframes purgeBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }

                .progress-indicator-bar {
                    animation: purgeLoading 6s cubic-bezier(0.1, 0.2, 0.5, 1) forwards;
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