import '../bios.css'
import win95Boot from '/images/win95boot.png'
import energyLogo from '/icons/Energy_Star_logo.svg'

export function renderBootScreen(parent, changeState) {
    parent.innerHTML = `
        <div id="bios-screen">
            <div id="bios-logo">
                <img src="${energyLogo}"/>
                <div class="epa-text">EPA POLLUTION PREVENTER</div>
            </div>

            <div id="bios-content">
                <img id="bios-man" src="/images/BIOS_Logo.png"/>
                <div id="bios-text"></div>
            </div>

            <span class="bios-cursor"></span>

            <div id="bios-bottom">
                <span>Press <strong>DEL</strong> to enter SETUP</span>
                <span>12/10/96-i430VX,UMC8669-2A59GH2BC-00</span>
            </div>
        </div>
    `

    async function wait(ms) {
        return new Promise(r => setTimeout(r, ms))
    }

    async function runBiosBoot() {
        await wait(2300)

        const container = parent.querySelector('#bios-text')
        const biosScreen = parent.querySelector('#bios-screen')

        const lines = [
            { text: "Award Modular BIOS v4.51PG, An Energy Star Ally", delay: 700 },
            { text: "Copyright (C) 1984-96, Award Software, Inc.", delay: 600 },
            { text: "&nbsp;", delay: 100 },
            { text: "(55XWUQ0E) Intel i430VX PCIset(TM)", delay: 600 },
            { text: "&nbsp;", delay: 100 },
            { text: "PENTIUM-S CPU at 175MHz", delay: 500 },
            { text: "Memory Test :  <span id='bios-ram'>0K</span>", delay: 0, isRam: true },
            { text: "&nbsp;", delay: 100 },
            { text: "Award Plug and Play BIOS Extension v1.0A", delay: 600 },
            { text: "Copyright (C) 1996, Award Software, Inc.", delay: 600 },
            { text: "&nbsp;&nbsp;Detecting IDE Primary Master ... PCemHD", delay: 1000 },
            { text: "&nbsp;&nbsp;Detecting IDE Primary Slave ... PCemCD", delay: 1000 },
            { text: "&nbsp;&nbsp;Detecting IDE Secondary Master... None", delay: 1000 },
            { text: "&nbsp;&nbsp;Detecting IDE Secondary Slave ... None", delay: 1000 }
        ]

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]

            const div = document.createElement('div')
            div.innerHTML = line.text

            if (i === 3) div.style.clear = 'left'

            container.appendChild(div)

            if (line.isRam) {
                const ramSpan = parent.querySelector('#bios-ram')

                for (let r = 0; r <= 65536; r += 4096) {
                    ramSpan.textContent = `${r}KB OK`
                    await wait(70)
                }
            } else {
                await wait(line.delay)
            }
        }

        await wait(600)

        biosScreen.classList.add('fade-out')
        await wait(500)
        biosScreen.remove()

        await showWin95Boot()
    }

    async function showWin95Boot() {
        parent.innerHTML = `
            <div id="win95-boot-screen" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: black; transition: opacity 500ms ease-out; opacity: 1;">
                <img src="${win95Boot}" />
            </div>
        `
        await wait(2000)

        const stillBoot = document.getElementById('win95-boot-screen')
        if (!stillBoot) {
            return;
        }

        stillBoot.style.opacity = '0'
        await wait(500)
        changeState('LOGIN')
    }

    return runBiosBoot()
}