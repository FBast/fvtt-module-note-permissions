![](https://img.shields.io/badge/Foundry-v12-informational)

# Note Permissions

**Note Permissions** is a lightweight Foundry VTT module that displays visual permission indicators directly above and below journal notes on the canvas. Designed for Game Masters, it offers a clear overview of who has access to what, using customizable SVG icons.

![Screenshot](https://github.com/user-attachments/assets/8b4bbadc-0ca2-4b88-b7af-26d2bfc50e30)

## Features

- Automatically shows a **default permission icon** above each note based on the effective access level (page + entry).
- Displays **individual user permissions** below each note using color-coded icons.
- Uses customizable **SVG shapes** for different permission levels:
  - `LIMITED` → Square
  - `OBSERVER` → Circle
  - `OWNER` → Star
  - `INHERIT` → Triangle
- Provides configurable settings for icon size and color via the Foundry settings menu.
- Purely cosmetic and non-intrusive: no system overrides or journal modifications.

## Installation
1. Install the module using the Foundry Add-on Modules menu.
#### Or
1. Download and unzip the module into your `FoundryVTT/Data/modules` folder.
#### Then
2. Enable the module via `Settings > Manage Modules`.
3. Configure your preferred icon sizes and default color in `Settings > Module Settings > Note Permissions`.

## Usage

- When a GM places or draws a **journal note**, icons will automatically appear above (default permission) and below (per-user overrides) the note icon.
- Changing ownership settings on a journal entry or page updates the icons in real time.

## Settings

- **Default Icon Color** – Sets the tint for the default permission icon.  
- **Default Icon Size** – Size in pixels for the default permission icon.  
- **Player Icon Size** – Size in pixels for user-specific icons.  

All settings are **world-scoped** and visible to GMs only.

## Compatibility

- ✅ Compatible with Foundry VTT **v12**
- 🎲 System-agnostic
- 🧩 Designed for `JournalEntryPage`

## License

MIT – Free to use, modify, and redistribute.
