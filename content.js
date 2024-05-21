// Wait for the page to fully load
window.addEventListener('load', function() {
  // Function to add the Subscribr link
  function addSubscribrLink() {
      // Check if the link already exists
      if (document.getElementById('subscribr-link')) return;

      // Get the container for the buttons
      const buttonContainer = document.querySelector('#top-level-buttons-computed');
      if (!buttonContainer) return;

      // Create the Subscribr link
      const subscribrLink = document.createElement('a');
      subscribrLink.id = 'subscribr-link';
      subscribrLink.style.marginRight = '8px'; // Adjust the margin as needed
      subscribrLink.style.cursor = 'pointer';

      // Create the image element for the icon
      const icon = document.createElement('img');
      icon.src = chrome.runtime.getURL('icon48.png');
      icon.alt = 'Subscribr Video Breakdown';
      icon.title = 'Subscribr Video Breakdown';
      icon.style.width = '32px';
      icon.style.height = '32px';

      // Add the icon to the link
      subscribrLink.appendChild(icon);

      // Create the loading spinner
      const spinner = document.createElement('div');
      spinner.id = 'subscribr-spinner';
      spinner.style.display = 'none';
      spinner.style.width = '30px';
      spinner.style.height = '30px';
      spinner.style.border = '4px solid #EBB2A6'; // accent color
      spinner.style.borderTop = '4px solid #CC3E21'; // primary color
      spinner.style.borderRadius = '50%';
      spinner.style.animation = 'spin 1s linear infinite';
      subscribrLink.appendChild(spinner);

      // Add click event to the link
      subscribrLink.addEventListener('click', function() {
          const videoId = new URLSearchParams(window.location.search).get('v');
          if (videoId) {
              // Show the spinner
              icon.style.display = 'none';
              spinner.style.display = 'block';

              // Redirect after a short delay to simulate loading
              setTimeout(() => {
                  window.location.href = `https://subscribr.ai/research/breakdown/${videoId}`;
              }, 2000); // Adjust the delay as needed
          }
      });

      // Insert the link into the container
      buttonContainer.insertBefore(subscribrLink, buttonContainer.firstChild);
  }

  // Add the link when the page loads
  addSubscribrLink();

  // Add the link when the URL changes (e.g., navigating to a new video)
  const observer = new MutationObserver(addSubscribrLink);
  observer.observe(document.body, { childList: true, subtree: true });
});

// Add CSS for spinner animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);