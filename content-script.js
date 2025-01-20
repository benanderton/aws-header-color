chrome.storage.sync.get('config', ({ config }) => {
    if (config == null) {
        return
    }
    var config = JSON.parse(config)

    // Does the current URL contain one of the keys in the config?
    for (const [key, value] of Object.entries(config)) {
        if (window.location.href.includes(key)) {

            // Create a MutationObserver to wait for the element to be added to the DOM
            const observer = new MutationObserver((mutations, obs) => {
                const element = document.getElementById('awsc-nav-header');
                if (element) {
                    var navBar = element.getElementsByTagName('nav')
                    navBar[0].style.backgroundColor = value;

                    obs.disconnect(); // Stop observing once the element is found
                }
            });

            // Start observing the document for changes
            observer.observe(document, {
                childList: true,
                subtree: true
            });
        }
    }
});