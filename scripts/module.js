import { MODULE_ID, ICON_PERMISSIONS, SETTINGS, getCustomUserIds, getEffectivePermission } from "./helpers.js";

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

function updateNoteFlags(note) {
    const customUserIds = getCustomUserIds(note);
    return note.setFlag(MODULE_ID, "customUserIds", customUserIds);
}

function drawCustomPermissionIcons(note) {
    if (!game.user.isGM) return;

    note.children.filter(c => c.name?.startsWith("note-permissions-")).forEach(c => c.destroy());

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

    const customUserIds = note.document.getFlag(MODULE_ID, "customUserIds") || [];
    const validUserIds = customUserIds.filter(userId => {
        const perm = note.page.ownership?.[userId] ?? CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE;
        return ICON_PERMISSIONS[perm];
    });

    const totalFlagsWidth = (validUserIds.length - 1) * spacing;

    validUserIds.forEach((userId, index) => {
        const user = game.users.get(userId);
        if (!user) return;

        const perm = note.page.ownership?.[userId] ?? CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE;
        const iconPath = ICON_PERMISSIONS[perm];
        if (!iconPath) return;

        const tex = PIXI.Texture.from(iconPath);
        const flag = new PIXI.Sprite(tex);
        flag.tint = PIXI.utils.string2hex(user.color || "#ffffff");
        flag.width = sizePlayer;
        flag.height = sizePlayer;
        flag.anchor.set(0.5);
        flag.name = `note-permissions-user-${userId}`;
        const x = -totalFlagsWidth / 2 + index * spacing;
        const y = iconSize / 2 + verticalOffset + sizePlayer / 2;
        flag.position.set(x, y);
        note.addChild(flag);
    });
}

Hooks.once("init", registerSettings);

Hooks.on("drawNote", drawCustomPermissionIcons);

Hooks.on("updateNote", async (noteDoc) => {
    if (!game.user.isGM) return;
    await updateNoteFlags(noteDoc);
    const note = canvas.notes.get(noteDoc.id);
    if (note) drawCustomPermissionIcons(note);
});

Hooks.on("createNote", async (noteDoc) => {
    if (!game.user.isGM) return;
    await updateNoteFlags(noteDoc);
});

Hooks.once("ready", async () => {
    if (!game.user.isGM) return;
    for (const note of canvas.notes.placeables) {
        await updateNoteFlags(note.document);
        drawCustomPermissionIcons(note);
    }
});
