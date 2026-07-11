# KingOS 95 Customization & Settings

Welcome to the KingOS 95 settings guide! I've built this OS to be as immersive and lore-accurate as possible, but I also know that heavy retro shaders aren't for everyone.

Here is how you can customize your experience `(˶ᵔᗜᵔ˶)ﾉﾞ`

## Visual Options

### Toggling the CRT & Scanline Effect
The screen scanlines, and CRT flicker look awesome, but they can cause eye strain or trigger photosensitivity.

**To remove the effect:**
* Open the **Settings** app from the **Start Menu**
* Double Click on the **Display** app in the **Settings** app.
* Uncheck the box labeled **"CRT Shader Effect"**.
* Click **Apply** to instantly remove the shader and enjoy a crisp, clean pixel UI!

### Changing Your Wallpaper
Tired of the default background? In my latest update, I've added a full wallpaper menu
* Open the **Settings** app from the **Start Menu**
* Double Click on the **Display** app in the **Settings** app.
* Browse through the hand-redrawn classic wallpapers.
* These images are perfectly optimized to tile across the screen (whether they are 16x16, 32x32, 64x64, or 128x128 patterns).
* Use the live preview window inside the app to see exactly how it will scale to your screen before you hit **Apply**.

## System Configuration (For Developers)

If you are poking around the code and want to change default behaviors or add your own apps:

* **Customizing the Filesystem:** You can easily add new desktop shortcuts, folders, or executables by mapping them out in `src/data/filesystem.json`.
* **Changing Default OS Boot States:** Looking to skip the BIOS or the boot sequence while testing? You can toggle the initial state in the main application logic inside the `src/main.js` file.

---

*Got an idea for a new setting or an Easter Egg? Check out the [contribution guide in the README](README.md#how-to-contribute-)!* ᕙ(  •̀ ᗜ •́  )ᕗ