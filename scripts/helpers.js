export const MODULE_ID = "note-permissions";

export const ICON_PERMISSIONS = {
    1: "systems/pl1e/icons/square.svg",       // LIMITED
    2: "systems/pl1e/icons/circle.svg",       // OBSERVER
    3: "systems/pl1e/icons/star.svg",         // OWNER
    [-1]: "systems/pl1e/icons/triangle.svg"   // INHERIT
};

export const SETTINGS = {
    COLOR_DEFAULT: "colorDefaultPermission",
    SIZE_DEFAULT: "sizeDefaultPermission",
    SIZE_PLAYER: "sizePlayerPermission"
};

export function getEffectivePermission(page, entry) {
    const pageDefault = page?.ownership?.default ?? CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE;
    const entryDefault = entry?.ownership?.default ?? CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE;

    return pageDefault === CONST.DOCUMENT_OWNERSHIP_LEVELS.INHERIT
        ? entryDefault
        : pageDefault;
}

export function getUsersWithExplicitPerm(page, entry) {
    const effectiveDefault = getEffectivePermission(page, entry);

    return game.users.filter(u => {
        if (u.isGM) return false;

        const perm = page.ownership?.[u.id] ?? effectiveDefault;
        return perm !== effectiveDefault && perm !== CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE;
    });
}