export const MODULE_ID = "note-permissions";

export const ICON_PERMISSIONS = {
    1: "systems/pl1e/icons/square.svg",         // LIMITED
    2: "systems/pl1e/icons/circle.svg",         // OBSERVER
    3: "systems/pl1e/icons/star.svg",           // OWNER
    [-1]: "systems/pl1e/icons/triangle.svg"     // INHERIT
};

export const SETTINGS = {
    COLOR_DEFAULT: "colorDefaultPermission",
    SIZE_DEFAULT: "sizeDefaultPermission",
    SIZE_PLAYER: "sizePlayerPermission"
};

export function getCustomUserIds(note) {
    const page = note.page;
    if (!page) return [];
    const defaultPerm = page.ownership?.default ?? CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE;
    return game.users
        .filter(u => {
            const userPerm = page.ownership?.[u.id] ?? defaultPerm;
            return !u.isGM && userPerm !== defaultPerm && userPerm !== 0;
        })
        .map(u => u.id);
}

export function getEffectivePermission(page, entry) {
    const pagePerm = page?.ownership?.default ?? CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE;
    const entryPerm = entry?.ownership?.default ?? CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE;
    if (pagePerm === CONST.DOCUMENT_OWNERSHIP_LEVELS.INHERIT) {
        return entryPerm;
    }
    return pagePerm;
}