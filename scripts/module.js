import { MODULE_ID, ICON_PERMISSIONS, SETTINGS, getEffectivePermission, getUsersWithExplicitPerm } from "./helpers.js";

console.log("Note Permissions | loaded");

function registerSettings() {
    game.settings.register(MODULE_ID, SETTINGS.COLOR_DEFAULT, {
        name: "NP.ColorDefaultName",
        hint: "NP.ColorDefaultHint",
        scope: "world",
        config: true,
        type: String,
        default: "#ffffff"
    });

    game.settings.register(MODULE_ID, SETTINGS.SIZE_DEFAULT, {
        name: "NP.SizeDefaultName",
        hint: "NP.SizeDefaultHint",
        scope: "world",
        config: true,
        type: Number,
        default: 15
    });

    game.settings.register(MODULE_ID, SETTINGS.SIZE_PLAYER, {
        name: "NP.SizePlayerName",
        hint: "NP.SizePlayerHint",
        scope: "world",
        config: true,
        type: Number,
        default: 15
    });
}

function drawIcons(note) {
    if (!game.user.isGM) return;

    note.children
        .filter(c => c.name?.startsWith("note-permissions-"))
        .forEach(c => c.destroy());

    const iconSize = note.document.iconSize;
    const spacing = 18;
    const verticalOffset = 5;

    const colorDefault = game.settings.get(MODULE_ID, SETTINGS.COLOR_DEFAULT);
    const sizeDefault = game.settings.get(MODULE_ID, SETTINGS.SIZE_DEFAULT);
    const sizePlayer = game.settings.get(MODULE_ID, SETTINGS.SIZE_PLAYER);

    const page = note.page;
    const entry = game.journal.get(note.document.entryId);

    const effectivePerm = getEffectivePermission(page, entry);
    const iconPath = ICON_PERMISSIONS[effectivePerm];

    // Default icon
    if (iconPath) {
        const tex = PIXI.Texture.from(iconPath);
        const icon = new PIXI.Sprite(tex);
        icon.tint = PIXI.utils.string2hex(colorDefault);
        icon.width = sizeDefault;
        icon.height = sizeDefault;
        icon.anchor.set(0.5);
        icon.name = "note-permissions-default";
        icon.position.set(0, -iconSize / 2 - verticalOffset - sizeDefault / 2);
        note.addChild(icon);
    }

    // Per-user icons
    const users = getUsersWithExplicitPerm(page, entry);
    const totalWidth = (users.length - 1) * spacing;

    users.forEach((u, i) => {
        const perm = page.ownership?.[u.id] ?? effectivePerm;
        const path = ICON_PERMISSIONS[perm];
        if (!path) return;

        const tex = PIXI.Texture.from(path);
        const sprite = new PIXI.Sprite(tex);

        sprite.tint = PIXI.utils.string2hex(u.color || "#ffffff");
        sprite.width = sizePlayer;
        sprite.height = sizePlayer;
        sprite.anchor.set(0.5);
        sprite.name = `note-permissions-user-${u.id}`;
        sprite.position.set(
            -totalWidth / 2 + i * spacing,
            iconSize / 2 + verticalOffset + sizePlayer / 2
        );

        note.addChild(sprite);
    });
}

Hooks.once("init", registerSettings);

Hooks.once("ready", () => {
    if (!game.user.isGM) return;
    for (const note of canvas.notes.placeables) {
        drawIcons(note);
    }
});

Hooks.on("drawNote", drawIcons);