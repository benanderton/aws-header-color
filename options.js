
function handleButtonClick(event) {

    //   // Remove styling from the previously selected color
    //   const current = event.target.parentElement.querySelector(
    //     `.${selectedClassName}`
    //   );
    //   if (current && current !== event.target) {
    //     current.classList.remove(selectedClassName);
    //   }

    //   // Mark the button as selected
    //   const color = event.target.dataset.color;
    //   event.target.classList.add(selectedClassName);
    //   chrome.storage.sync.set({ color });

    event.preventDefault();
    configText = document.getElementById('config').value;

    try {
        const config = JSON.parse(configText);
        console.debug(config)
        setSuccess("Success: Config saved")
    } catch (error) {
        setError("Error: Invalid JSON")
    }

    chrome.storage.sync.set({ config: configText });
}

function setError(error) {
    const errorContainer = document.getElementById('config-output');
    errorContainer.innerText = error
    errorContainer.className = 'error';
}

function setSuccess(success) {
    const errorContainer = document.getElementById('config-output');
    errorContainer.innerText = success
    errorContainer.className = 'success';
}
function initPage() {
    const button = document.getElementById('save');
    button.addEventListener('click', handleButtonClick);

    chrome.storage.sync.get('config', ({ config }) => {
        if (config != null) {
            document.getElementById('config').value = config;
        }
    });
}

// Initialize the page by constructing the color options
initPage();