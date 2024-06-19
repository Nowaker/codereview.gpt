// Saves options to chrome.storage
const saveOptions = () => {
    const openai_apikey = document.getElementById('openai_apikey').value;
    const openai_model = document.getElementById('openai_model').value;

    chrome.storage.sync.set(
      {
        openai_apikey: openai_apikey,
        openai_model: openai_model,
      },
      () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  };

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get(
      {
        openai_apikey: '',
        openai_model: '',
      },
      (items) => {
        document.getElementById('openai_apikey').value = items.openai_apikey;
        document.getElementById('openai_model').value = items.openai_model
      }
    );
  };

  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);
