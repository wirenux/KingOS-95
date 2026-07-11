import "../bios.css"

let biosKeyHandler = null;

export function renderBIOSScreen(parent, changeState) {
    let currentTab = 'Main';
    let selectedIndex = 0;

    const tabData = {
        'Main' : {
            selectable: [
                { label: 'System Language', value: '[English]', desc: 'Choose the system default language' },
                { label: 'System Date', value: '[Sat 07/11/1996]', desc: 'Set the Date. Use Tab to switch between Date elements.<br />Default Ranges: <br/>Year: 1996-2097<br/>Months: 1-12<br/>Days: Dependent on month<br/>Range of Years may vary.' },
                { label: 'System Time', value: '[14:21:11]', desc: 'Set the Time. Use Tab to switch between Time elements.' },
            ]
        },
        'Save & Exit': {
            selectable: [
                { label: 'Save Changes and Exit', value: '', desc: 'Exit system setup after saving the changes.' },
                { label: 'Discard Changes and Exit', value: '', desc: 'Exit system setup without saving any changes.' },
                { label: 'Save Changes and Reset', value: '', desc: 'Reset the system after saving the changes.' },
                { label: 'Discard Changes and Reset', value: '', desc: 'Reset system setup without saving any changes.' },
                { label: 'Restore Defaults', value: '', desc: 'Restore/Load Default values for all the setup options.' }
            ]
        }
    };

    function render() {
        const tabsHTML = ['Main', 'Advanced', 'Chipset', 'Security', 'Boot', 'Save & Exit']
            .map(tab => `<div class="bios-tab ${tab === currentTab ? 'active' : ''}">${tab}</div>`)
            .join('');

        let mainContentHTML = '';

        if (currentTab === 'Main') {
            mainContentHTML = `
                <div class="bios-row"><div class="bios-label">BIOS Information</div><div class="bios-value"></div></div>
                <div class="bios-row"><div class="bios-label">BIOS Vendor</div><div class="bios-value">C&A</div></div>
                <div class="bios-row"><div class="bios-label">Core Version</div><div class="bios-value">5.19</div></div>
                <div class="bios-row"><div class="bios-label">Compliancy</div><div class="bios-value">BIOS 1.6; PI 1.7</div></div>
                <div class="bios-row"><div class="bios-label">Project Version</div><div class="bios-value">GF168_S_V0.20.18</div></div>
                <div class="bios-row"><div class="bios-label">Build Date and Time</div><div class="bios-value">04/30/1996 13:25:55</div></div>
                <div class="bios-row"><div class="bios-label">EC Version </div><div class="bios-value">V0.08</div></div>
                <div class="bios-row"><div class="bios-label">EC Build Date and Time</div><div class="bios-value">04/30/1996 01:14:37</div></div>
                <div class="bios-row"><div class="bios-label">Access Level</div><div class="bios-value">Administrator</div></div>
                <div class="bios-row"><div class="bios-label">Manufacturer Name</div><div class="bios-value">C&A</div></div>
                <div class="bios-row"><div class="bios-label">Product Name</div><div class="bios-value">C&A Workstation</div></div>
                <div class="bios-row"><div class="bios-label">SKU Number</div><div class="bios-value">CANDAWork</div></div>
                <div class="bios-row"><div class="bios-label">Familly</div><div class="bios-value">Low cost</div></div>
                <div class="bios-row"><div class="bios-label">Baseboard Manufacturer</div><div class="bios-value">IBM</div></div>
                <div class="bios-row"><div class="bios-label">Baseboard Product Name</div><div class="bios-value">IBMG20312SE</div></div>
                <div class="bios-row"><div class="bios-label">Enclosure Type</div><div class="bios-value">0A</div></div>
                <div class="bios-row"><div class="bios-label">Serial Number</div><div class="bios-value">bbe5c83d-11a17302a</div></div>
                <div class="bios-row"><div class="bios-label">UUID</div><div class="bios-value">ece65c95-dbd7-4b0d-a65e-7ac1aad4a6b4</div></div>
                <br />
                <div class="bios-row"><div class="bios-label">Processor Information</div><div class="bios-value"></div></div>
                <div class="bios-row"><div class="bios-label">Name</div><div class="bios-value">i8086-5</div></div>
                <div class="bios-row"><div class="bios-label">Type</div><div class="bios-value">PENTIUM-S CPU @ 175MHz</div></div>
                <br />
            `;
        } else if (currentTab === 'Save & Exit') {
            mainContentHTML = `
                <div class="bios-row" style="color: #000000; font-weight: bold; margin-bottom: 10px;">
                    <div class="bios-label">Save Options</div>
                </div>
            `;
        }

        const selectableItemsHTML = tabData[currentTab].selectable.map((item, index) => {
            const isSelected = index === selectedIndex ? 'bios-selected' : '';
            return `
                <div class="bios-row bios-selectable ${isSelected}">
                    <div class="bios-label">${item.label}</div>
                    <div class="bios-value">${item.value}</div>
                </div>
            `
        }).join('');

        const currentDescription = tabData[currentTab].selectable[selectedIndex].desc;

        parent.innerHTML = `
            <div id="bios-container">
                <div id="bios-title">
                    <p>Aptio Setup - AMI</p>
                </div>

                <div id="bios-tabs">
                    ${tabsHTML}
                </div>

                <div id="bios-content">
                    <div id="bios-content-main">
                        ${mainContentHTML}
                        ${selectableItemsHTML}
                    </div>

                    <div class="bios-content-divider"></div>

                    <div id="bios-content-right">
                        <div id="bios-description">${currentDescription}</div>
                        <hr id="desc-ctrl"/>
                        <div id="bios-control">
                            <div>&rarr;&larr;: Select Screen</div>
                            <div>&uarr;&darr;: Select Item</div>
                            <div>Enter: Select</div>
                            <div>+/-: Change Opt.</div>
                            <div>F1: General Help</div>
                            <div>F2: Previous Values</div>
                            <div>F3: Optimized Defaults</div>
                            <div>F4: Save & Exit</div>
                            <div>ESC: Exit</div>
                        </div>
                    </div>
                </div>
                <div id="bios-footer">
                    <p>Version 2.22.1282 Copyright (C) 1996 AMI</p>
                </div>
            </div>
        `;
    }

    function handleKeyDown(e) {
        const itemCount = tabData[currentTab].selectable.length;

        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            currentTab = currentTab === 'Main' ? 'Save & Exit' : 'Main';
            selectedIndex = 0;
            render();
        } else if (e.key === 'ArrowDown') {
            if (selectedIndex < itemCount - 1) {
                selectedIndex++;
                render();
            }
        } else if (e.key === 'ArrowUp') {
            if (selectedIndex > 0) {
                selectedIndex--;
                render();
            }
        } else if (e.key === 'Enter') {
            if (currentTab === 'Save & Exit' && selectedIndex === 0) {
                document.removeEventListener('keydown', handleKeyDown);
                changeState('BOOT');
            }
        }
    }

    if (biosKeyHandler) {
        document.removeEventListener('keydown', biosKeyHandler);
    }

    biosKeyHandler = handleKeyDown;
    document.addEventListener('keydown', biosKeyHandler);

    render();
}