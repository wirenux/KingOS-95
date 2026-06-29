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
        const workspace = document.getElementById('workspace');
        windowEl._decorativeHeads = [];

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
            `;
            document.head.appendChild(style);
        }

        const decorativeHeads = [
            {
                src: '/images/Caine_Sprite.gif',
                top: '50%',
                left: '50%',
                width: '380px',
                transform: 'translate(-50%, -50%)',
                isBubble: false
            },
            {
                src: '/images/Caine_Sprite.gif',
                top: '0%',
                right: '5%',
                width: '260px',
                transform: 'rotate(25deg)',
                isBubble: false
            },
            {
                src: '/images/Caine_Sprite.gif',
                bottom: '27%',
                left: '10%',
                width: '230px',
                transform: 'rotate(-25deg)',
                isBubble: false
            },
            {
                src: '/images/Bubble.png',
                top: '-20px',
                left: '100px',
                width: '200px',
                transform: 'rotate(-20deg)',
                isBubble: true
            },
            {
                src: '/images/Bubble.png',
                top: '50%',
                right: '20px',
                width: '170px',
                transform: 'rotate(15deg)',
                isBubble: true
            },
            {
                src: '/images/Bubble.png',
                bottom: '-50px',
                left: '-50px',
                width: '300px',
                transform: 'rotate(15deg)',
                isBubble: true
            },
            {
                src: '/images/Caine_Sprite.gif',
                bottom: '-400px',
                left: '15%',
                width: '280px',
                transform: 'rotate(-5deg)',
                isBubble: false
            },
            {
                src: '/images/Bubble.png',
                bottom: '0px',
                right: '25%',
                width: '200px',
                transform: 'rotate(10deg)',
                isBubble: true
            },
            {
                src: '/images/Caine_Sprite.gif',
                bottom: '50px',
                right: '80px',
                width: '220px',
                transform: 'rotate(-30deg)',
                isBubble: false
            }
        ];

        decorativeHeads.forEach((head) => {
            const wrapper = document.createElement('div');

            wrapper.style.position = 'absolute';
            wrapper.style.zIndex = '9999';
            wrapper.style.pointerEvents = 'none';

            if (head.width) wrapper.style.width = head.width;
            if (head.top) wrapper.style.top = head.top;
            if (head.bottom) wrapper.style.bottom = head.bottom;
            if (head.left) wrapper.style.left = head.left;
            if (head.right) wrapper.style.right = head.right;
            if (head.transform) wrapper.style.transform = head.transform;

            const img = document.createElement('img');
            img.src = head.src;
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
            img.style.imageRendering = 'pixelated';

            if (head.isBubble) {
                img.classList.add('shake-effect');
            }

            wrapper.appendChild(img);
            workspace.appendChild(wrapper);

            windowEl._decorativeHeads.push(wrapper);
        });
    }
}