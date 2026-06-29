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
            `;
            document.head.appendChild(style);
        }

        const decorativeHeads = [
            {
                src: '/images/Caine_Sprite.gif',
                top: 'clamp(-345px, -30vw, -120px)',
                left: 'clamp(-425px, -40vw, -150px)',
                width: 'clamp(120px, 30vw, 328px)',
                isBubble: false
            },
            {
                src: '/images/Caine_Sprite.gif',
                bottom: 'clamp(-220px, -20vw, -100px)',
                right: 'clamp(-135px, -15vw, -60px)',
                width: 'clamp(100px, 20vw, 232px)',
                isBubble: false
            },
            {
                src: '/images/Bubble.png',
                top: 'clamp(-235px, -25vw, -100px)',
                right: 'clamp(100px, 20vw, 220px)',
                width: 'clamp(80px, 18vw, 198px)',
                isBubble: true
            },
            {
                src: '/images/Bubble.png',
                bottom: 'clamp(-350px, -35vw, -120px)',
                left: 'clamp(-220px, -25vw, -100px)',
                width: 'clamp(80px, 18vw, 202px)',
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