const browser = window?.browser || window?.chrome;

async function main() {
    var activeTab = null;
    /**
     * The active URL retrieved from the browser tabs.
     * @type {URL}
     */
    var activeUrl = null;

    /**
     * @type {HTMLButtonElement}
     */
    const btn = document.getElementById("acceptAll");

    const tabs = await browser.tabs.query({ active: true, currentWindow: true });

    activeTab = tabs[0];
    activeUrl = new URL(activeTab.url);
    if (activeTab === null) {
        console.error("No active tab found, click to reload");
        btn.textContent = "No active tab found";
        return;
    }

    if (activeUrl.hostname !== "learn.reboot01.com") {
        console.error("Not on Reboot01");
        btn.textContent = "Not on Reboot01, click to reload";
        return;
    }

    if (!activeUrl.pathname.startsWith('/intra/bahrain/bh-module/')) {
        console.error("Not on a project page");
        btn.textContent = "Not on a project page, click to reload";
        return;
    }
    if (!activeUrl.searchParams.has('audit')) {
        console.error("No audit parameter found");
        btn.textContent = "No audit parameter found, click to reload";
        return;
    }


    btn.textContent = "Accept all";
    btn.onclick = async () => {
        browser.scripting.executeScript({
            target: { tabId: activeTab.id, allFrames: true },
            func: () => {
                document.querySelectorAll("input[type=radio][id$='yes']").forEach(i => i.click());
            }
        });
    }

}

main();
