![](https://img.shields.io/badge/Foundry-v12-informational)

# Note Permissions

**Note Permissions** is a lightweight Foundry VTT module that displays visual permission indicators directly above and below journal notes on the canvas. Designed for Game Masters, it offers a clear overview of who has access to what, using customizable SVG icons.

![Screenshot](https://github.com/user-attachments/assets/8b4bbadc-0ca2-4b88-b7af-26d2bfc50e30)

## Features

- Automatically shows a **default permission icon** above each note based on the effective access level (page + entry).
- Displays **individual user permissions** below each note using color-coded icons.
- Uses customizable **SVG shapes** to represent permission levels:
  - `LIMITED` → Square  
  - `OBSERVER` → Circle  
  - `OWNER` → Star  
  - `INHERIT` → Triangle  
- Provides configurable settings for icon size and color via Foundry’s Module Settings.
- Purely cosmetic and non-intrusive — no overrides, no patching, and no journal modifications.

## Installation

The module can be installed **directly from within Foundry VTT**:

1. Open **Foundry VTT**.
2. Go to **Configuration & Setup → Add-on Modules**.
3. Click **Install Module**.
4. Search for **Note Permissions**.
5. Click **Install**.

Once installed, enable the module via **Settings → Manage Modules**.

## Usage

- When a GM places or draws a **journal note**, icons automatically appear:
  - Above the note → the **default permission level**.
  - Below the note → **user-specific overrides**, color-coded by player.
- Changing ownership settings on a journal entry or page updates the icons in real time.
- Icons adjust dynamically based on configured sizes and colors.

## Settings

- **Default Icon Color** – Tint applied to the default permission icon.  
- **Default Icon Size** – Pixel size for the default permission icon.  
- **Player Icon Size** – Pixel size for user-specific icons.  

All settings are **world-scoped** and visible only to GMs.

## Compatibility

- Compatible with **Foundry VTT v12 and v13**
- System-agnostic
- Designed specifically for **JournalEntryPage**

## License

MIT – Free to use, modify, and redistribute.
