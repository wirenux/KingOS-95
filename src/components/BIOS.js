import "../bios.css"

export function renderBIOSScreen(parent, changeState) {
    parent.innerHTML = `
        <div id="bios-container">
            <div id="bios-title">
                <p>Aptio Setup - AMI</p>
            </div>
            <div id="bios-tabs">
                <div class="bios-tab active">Main</div>
                <div class="bios-tab">Advanced</div>
                <div class="bios-tab">Chipset</div>
                <div class="bios-tab">Security</div>
                <div class="bios-tab">Boot</div>
                <div class="bios-tab">Save & Exit</div>
            </div>
            <div id="bios-content">
                <div id="bios-content-main">
                    <div class="bios-row"><div class="bios-label">BIOS Information</div><div class="bios-value"></div></div>
                    <div class="bios-row"><div class="bios-label">BIOS Vendor</div><div class="bios-value">C & A</div></div>
                    <div class="bios-row"><div class="bios-label">Core Version</div><div class="bios-value">5.19</div></div>
                    <div class="bios-row"><div class="bios-label">Compliancy</div><div class="bios-value">BIOS 1.6; PI 1.7</div></div>
                    <div class="bios-row"><div class="bios-label">Project Version</div><div class="bios-value">GF168_S_V0.20.18</div></div>
                    <div class="bios-row"><div class="bios-label">Build Date and Time</div><div class="bios-value">04/30/1996 13:25:55</div></div>
                    <div class="bios-row"><div class="bios-label">EC Version </div><div class="bios-value">V0.08</div></div>
                    <div class="bios-row"><div class="bios-label">EC Build Date and Time</div><div class="bios-value">04/30/1996 01:14:37<</div></div>
                    <div class="bios-row"><div class="bios-label">Access Level</div><div class="bios-value">Administrator</div></div>
                    <div class="bios-row"><div class="bios-label">Manufacturer Name</div><div class="bios-value">C & A</div></div>
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

                    <div class="bios-row"><div class="bios-label">System Language</div><div class="bios-value">[English]</div></div>

                    <br />

                    <div class="bios-row"><div class="bios-label">System Date</div><div class="bios-value">[Sat 07/11/1996]</div></div>
                    <div class="bios-row"><div class="bios-label">System Time</div><div class="bios-value">[14:21:11]</div></div>
                </div>

                <div class="bios-content-divider"></div>

                <div id="bios-content-right">
                    <div id="bios-description"></div>
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
    `
}