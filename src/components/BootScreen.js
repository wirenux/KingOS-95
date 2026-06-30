import '../bios.css'
import energyLogo from '/icons/Energy_Star_logo.svg'

export function renderBootScreen(parent) {
    parent.innerHTML = `
        <div id="bios-screen">
            <div id="bios-logo">
                <img src="${energyLogo}"/>
                <div class="epa-text">EPA POLLUTION PREVENTER</div>
            </div>
            <div id="bios-content">
                <!-- TODO: Add blue human logo -->
            </div>
            <span class="bios-cursor"></span>
            <div id="bios-bottom">
                <span>Press <strong>DEL</strong> to enter SETUP</span>
                <span>12/10/96-i430VX,UMC8669-2A59GH2BC-00</span>
            </div>
        </div>
  `

    async function runBiosBoot() {
        await new Promise(res => setTimeout(res, 2300)); // wait for the crt effect to be stable

        const container = parent.querySelector('#bios-content');
        const biosScreen = parent.querySelector('#bios-screen');

        const lines = [
            { text: "Award Modular BIOS v4.51PG, An Energy Star Ally", delay: 700 },
            { text: "Copyright (C) 1984-96, Award Software, Inc.", delay: 600 },
            { text: "&nbsp;", delay: 100 },
            { text: "(55XWUQ0E) Intel i430VX PCIset(TM)", delay: 600 },
            { text: "&nbsp;", delay: 100 },
            { text: "PENTIUM-S CPU at 175MHz", delay: 500 },
            { text: "Memory Test :  <span id='bios-ram'>0K</span>\n", delay: 0, isRam: true },
            { text: "&nbsp;", delay: 100 },
            { text: "Award Plug and Play BIOS Extension v1.0A", delay: 600 },
            { text: "Copyright (C) 1996, Award Software, Inc.", delay: 600 },
            { text: "&nbsp;&nbsp;Detecting IDE Primary Master &nbsp;... PCemHD", delay: 1000 },
            { text: "&nbsp;&nbsp;Detecting IDE Primary Salve &nbsp; ... PCemCD", delay: 1000 },
            { text: "&nbsp;&nbsp;Detecting IDE Secondary Master... None", delay: 1000 },
            { text: "&nbsp;&nbsp;Detecting IDE Secondary Salve ... None", delay: 1000 }
        ];

        for (const line of lines) {
            const div = document.createElement('div');
            div.innerHTML = line.text;
            container.appendChild(div);

            if (line.isRam) {
                const ramSpan = parent.querySelector('#bios-ram');
                for (let currentRam = 0; currentRam <= 65536; currentRam += 4096) {
                    ramSpan.textContent = `${currentRam}KB OK`;
                    await new Promise(res => setTimeout(res, 70));
                }
            } else {
                await new Promise(res => setTimeout(res, line.delay));
            }
        }

        // TODO: re-enable this
        // await new Promise(res => setTimeout(res, 600));

        // biosScreen.classList.add('fade-out');

        // await new Promise(res => setTimeout(res, 500));
        // biosScreen.remove();
    }

    return runBiosBoot();
}