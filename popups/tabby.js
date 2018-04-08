const wrapper = document.getElementById('tabby');

const tabby = {

    storeOpenedTabs(tabs) {
        const key = Object.keys(tabs[0]);
        const contentToStore = [];

        tabs.map((tab, index) => {
            contentToStore.push({
                url: tab.url,
                title: tab.title,
                favicon: tab.favIconUrl
            });
        });

        // TODO: Prompt user for group name
    },

    open() {
        // TODO: Offer stored group to be opened
    },

    saveAs() {
        browser.tabs.query({ currentWindow: true })
            .then(this.storeOpenedTabs);
    }
};

document.addEventListener('click', e => {
    const event = e.target.getAttribute('data-event');
    switch (event) {
        case 'save-as':
            tabby.saveAs();
            break;
        case 'open':
            tabby.open();
            break;
    }
});