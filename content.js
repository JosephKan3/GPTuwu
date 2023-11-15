// Function to handle the replacement of the SVG with an image
function replaceSvgWithImage(svg) {
  if (!svg.parentNode) {
    return;
  }
  
  // Create an image element
  const img = document.createElement('img');
  svg = svg.parentNode
  img.setAttribute('width', svg.getAttribute('width'));
  img.setAttribute('height', svg.getAttribute('height'));
  img.setAttribute('role', 'img');
  img.src = chrome.runtime.getURL('uwu.gif'); // Ensure this is the correct path to your GIF
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  img.style.transform = 'scale(1.1)';
  img.style.transformOrigin = 'center center';

  // Replace the SVG with the new image
  svg.parentNode.replaceChild(img, svg);
}

// Observer callback to handle mutations
function handleMutations(mutations) {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      // Check if the added node is an SVG and has a child with the text 'ChatGPT'
      if (node.nodeName.toLowerCase() === 'svg' && node.querySelector('text')?.textContent.includes('ChatGPT')) {
        replaceSvgWithImage(node);
      }
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
