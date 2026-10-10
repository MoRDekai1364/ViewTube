/**
 * ============================================================================
 *  YouTube Subtitle Pro
 *  Copyright (c) VoidKSA. All rights reserved.
 * ============================================================================
 *
 *  Website: https://extractly.vip/
 *
 * ============================================================================
 *  LEGAL NOTICE:
 *  This code is the intellectual property of VoidKSA.
 *  It is strictly PROHIBITED to remove, modify, or hide this copyright header.
 *  Redistribution or commercial use without permission is not allowed.
 * ============================================================================
 */

// content.js is declared once by manifest.json. Never inject it from the
// service worker: a second live instance would install duplicate observers and
// both instances would fight over YouTube's caption tree.
function sendMessageToTopFrame(tabId, action) {
    if (!tabId) return;
    chrome.tabs.sendMessage(tabId, { action }, { frameId: 0 }).catch(() => {
        // The tab may have been open before the extension was installed/reloaded.
        // A normal page refresh lets the manifest install the single content script.
    });
}

chrome.action.onClicked.addListener((tab) => {
    sendMessageToTopFrame(tab && tab.id, 'togglePanel');
});

chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0] && tabs[0].id;
        if (!tabId) return;

        if (command === 'toggle-panel') {
            sendMessageToTopFrame(tabId, 'togglePanel');
        } else if (command === 'font-size-up') {
            sendMessageToTopFrame(tabId, 'fontSizeUp');
        } else if (command === 'font-size-down') {
            sendMessageToTopFrame(tabId, 'fontSizeDown');
        }
    });
});
