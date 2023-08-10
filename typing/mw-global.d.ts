/// <reference types="jquery" />
/// <reference path="../node_modules/types-mediawiki/index.d.ts" />

declare global {
    interface Window {
        jQuery: JQueryStatic;
        mw: typeof mw;
    }
}
export {};
