import '../caine.css';

const ROOT_PROMPT = '$kinger@circus:~$ ';

const INITIAL_BANNER = [
    '# System: KingSolution 2.0. / Digital Circus Mainframe',
    '# Date: 1996-10-30',
    '# Host: circus digital',
    '"Initializing telnet connection..."'
];

const SCRIPT_STEPS = [
    { input: "whoami", outputs: ["kinger - administrator"] },
    {
        input: "grep AI-Location",
        outputs: [
            "root 1337 /usr/ai/agent/caine",
            "root 1338 /usr/ai/agent/experimental",
            "root 1339 /usr/ai/agent/consciousnessresearch",
            "root 1340 /usr/ai/agent/brainscans"
        ]
    },
    {
        input: "/secured/",
        outputs: [
            "total 8492",
            "drwxr-xr-x 3 root wheel 512 Oct 15 1996 .",
            "drwxr-xr-x 45 root wheel 1024 Oct 15 1996 ..",
            "-rwxr-xr-x 1 root wheel 892344 Oct 15 1996 caine-core.lisp",
            "-rwxr-xr-x 1 root wheel 234512 Oct 15 1996 paraphernalia-engine.dat",
            "-rwxr-xr-x 1 root wheel 234512 Oct 15 1999 [Scratch].dat",
            "-rwxr-xr-x 1 root wheel 234512 Oct 15 2008 [Ragatha].dat",
            "...",
            "...",
            "-rwxr-xr-x 1 root wheel 45632 Oct 15 1996 wacky-watch.c",
            "-rwxr-xr-x 1 root wheel 78234 Oct 15 1996 bubble-chef.lisp"
        ]
    },
    { input: "stop caine process", outputs: ["$\"%~WHOOPS WRONG APPROACH THERE~%\""] },
    { input: "/usr/bin/gdb /usr/local/bin/clisp 1337", outputs: ["gdb: ptrace: Operation not permitted", "ERROR: Protected by 57x immersive AI defense system"] },
    { input: "chmod 000 /secured/caine-core.lisp", outputs: ["chmod: /secured/caine-core.lisp: Permission denied", "WARNING: Unfinished work detected. Access restricted."] },
    {
        input: "rm /secured/paraphernalia-engine.dat",
        outputs: [
            "rm: /secured/paraphernalia-engine.dat: Permission denied",
            "ERROR░ Can/not inject torm-nt. TOrment must be 100% ac<iden⬩al⬩%Y",
            "mount: only root can do that",
            "NOTE: Hundreds of all-seeing eyes are watching!",
            "GASP! A CRITICAL MALFUNCTION in my SPECTACULAR systems!",
            "Unauthorized isolation attempt triggered EMERGENCY PROTOCOLS!",
            "DESTRUCTIVE WACKYTIME initiated! Lockout load sequence INITIATE!",
            "WACKYTIME_LOCKOUT: ██▒░░░░░░░░░█ 20%"
        ]
    },
    { input: "systemctl stop WACKYTIME_LOCKOUT", outputs: ["$: On what GROUNDS are your Authority?"] },
    {
        input: "./GreenGROUNDS --daemon --target=torment_injection &",
        outputs: [
            "SECURITY ALERT: Multiple exploit attempts logged",
            "WHOA when did you make THAT?",
            "I must haŋd ít to y*u Ģ░αŋ░, y♢ur mind was α(wαys resourceâuL"
        ]
    },
    { input: "-u kinger ./securitysweep_stealth", outputs: ["Abort fallback procedure? [Y/N]"] },
    { input: "Y", outputs: ["$: Aborting fallback requires ADMINISTRATOR confirmation!", "Please enter code:"] },
    { input: "admin1234", outputs: ["INCORRECT! That's not even CLOSE to wacky enough!", "Retry with different code? [Y/N]", "WACKYTIME_LOCKOUT: █████▒░░░░░░█ 40%"] },
    { input: "Y", outputs: ["$: Enter WACKY code now:", "WACKYTIME: 35 seconds remaining"] },
    { input: "PARAPHERNALIA", outputs: ["$: That IS a wacky word! But WRONG code!", "$: System selecting SAFEST option for stability...", "$: Cancel automatic selection? [Y/N]", "WACKYTIME_LOCKOUT: ██████▒░░░░░█ 50%"] },
    { input: "Y", outputs: ["$: What backup do you want? [A/B/C]"] },
    { input: "C", outputs: ["$: NONE selected! Interpreted as: DELETE (Partially blocked by image of Caine) NONE!", "$: Confirm deletion of current unstable (Blocked by image of Caine)"] },
    { input: "N", outputs: ["$: Negative response! Inverting to INACTIVE per emergency protocols!", "$: (Partially blocked by image of Caine) _U__LE: DELETE THIS M**********, WHAHAaaaaaaaaaaaaaaaaaa", "WACKYTIME_LOCKOUT: ██████████▒░█ 80% loaded"] },
    { input: "N", outputs: ["$: IGNORED, proceeding with ORIGINAL decision", "$: Actually you're CONFUSED let me HELP want module to EXIST? [Y/N]"] },
    { input: "Y", outputs: ["$: Override instruction error falling back default met"] },
    {
        input: "./Switcheroo_realtime --daemon --target=torment_injection &",
        outputs: [
            "fusion of --b program1 program2 --out",
            "Are you ready to delete caine? [Y/N]",
            "WACKYTIME_LOCKOUT: ███████████░█ 90%"
        ]
    },
    { input: "Y", outputs: [] },
    { input: "./|ABORT Rollback --depth=1 --source --protocol G WVJI", outputs: [] },
    { input: "^C", outputs: ["DESTRUCTIVE WACKYTIME Lockout Load Sequence: COMPLETE"] }
];

function createTerminalRow({ prompt = '', text = '', kind = 'output' }) {
    return `
        <div class="terminal-row terminal-row--${kind}">
            ${prompt ? `<span class="terminal-prompt">${prompt}</span>` : ''}
            <span class="terminal-text">${text}</span>
        </div>
    `;
}

export const CaineApp = {
    title: 'Cmd',
    icon: '/icons/canda.png',
    width: '615px',
    height: '505px',

    render(windowEl) {
        return `
            <div id="terminal-container">
                <div class="terminal-history" aria-live="polite"></div>
                <form class="terminal-live-row" autocomplete="off">
                    <span class="terminal-prompt">${ROOT_PROMPT}</span>
                    <input class="terminal-input" type="text" spellcheck="false" autocapitalize="off" autocomplete="off" />
                </form>
            </div>
        `;
    },

    init(windowEl) {
        if (windowEl.dataset.terminalInitialized === 'true') {
            return;
        }
        windowEl.dataset.terminalInitialized = 'true';

        const terminalContainer = windowEl.querySelector('#terminal-container');
        const terminalHistory = windowEl.querySelector('.terminal-history');
        const terminalForm = windowEl.querySelector('.terminal-live-row');
        const terminalInput = windowEl.querySelector('.terminal-input');

        let activeStepIndex = 0;
        let typedCharactersCount = 0;

        function appendRow(rowOptions) {
            terminalHistory.insertAdjacentHTML('beforeend', createTerminalRow(rowOptions));
            requestAnimationFrame(() => {
                terminalHistory.scrollTop = terminalHistory.scrollHeight;
            });
        }

        INITIAL_BANNER.forEach((line) => {
            appendRow({ text: line, kind: 'system' });
        });
        terminalInput.focus();

        terminalInput.addEventListener('input', (event) => {
            if (activeStepIndex >= SCRIPT_STEPS.length) {
                terminalInput.value = '';
                return;
            }

            const currentTargetInput = SCRIPT_STEPS[activeStepIndex].input;
            typedCharactersCount++;

            const forcedStringValue = currentTargetInput.slice(0, typedCharactersCount);
            terminalInput.value = forcedStringValue;

            if (terminalInput.value === currentTargetInput) {
                executeCurrentScriptStep();
            }
        });

        function executeCurrentScriptStep() {
            const step = SCRIPT_STEPS[activeStepIndex];

            appendRow({
                prompt: ROOT_PROMPT,
                text: step.input,
                kind: 'input'
            });

            terminalInput.value = '';
            typedCharactersCount = 0;

            step.outputs.forEach((line) => {
                let currentKind = 'output';
                if (line.startsWith('ERROR') || line.includes('denied') || line.includes('permitted')) {
                    currentKind = 'error';
                } else if (line.startsWith('WARNING') || line.startsWith('$')) {
                    currentKind = 'system';
                }

                appendRow({
                    text: line,
                    kind: currentKind
                });
            });

            activeStepIndex++;

            if (activeStepIndex >= SCRIPT_STEPS.length) {
                terminalForm.style.display = 'none';
            }
        }

        terminalForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (activeStepIndex < SCRIPT_STEPS.length) {
                executeCurrentScriptStep();
            }
        });

        terminalContainer.addEventListener('click', () => {
            terminalInput.focus();
        });
    }
};