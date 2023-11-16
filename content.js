// Function to handle the replacement of the SVG with an image
function replaceSvgWithImage(svg) {
  try {
    if (!svg.parentNode || !svg.parentNode.parentNode) {
      console.error('SVG element has no parent:', svg);
      return;
    }
  
    // Create an image element
    const img = document.createElement('img');
    img.setAttribute('role', 'img');
    img.src = chrome.runtime.getURL('uwu.gif');
    img.style.position = 'absolute';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.transform = 'scale(1.1)';
    img.style.transformOrigin = 'center center';
  
    // Hide the previous svg to avoid DOM state conflicts
    svg.parentNode.style.opacity = '0'
    svg.parentNode.parentNode.appendChild(img)
  } catch (err) {
    return
  }
}

// Observer callback to handle mutations
function handleMutations(mutations) {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      // If the added node contains SVGs, check its children
      if (node.querySelectorAll) {
        const svgElements = node.querySelectorAll('svg.icon-sm');
        svgElements.forEach(svg => {
          if (svg.querySelector('text')?.textContent.includes('ChatGPT')) {
            replaceSvgWithImage(svg);
          }
        });
      }
    });
  });
}

// Create an observer instance with a callback function to execute when mutations are observed
const observer = new MutationObserver(handleMutations);

// Start observing the body for added nodes
observer.observe(document.body, { childList: true, subtree: true });
