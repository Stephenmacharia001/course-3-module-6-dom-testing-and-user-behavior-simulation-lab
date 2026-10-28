function initDOMManipulation() {
  // 1. Update the DOM on Click
  const clickBtn = document.getElementById('simulate-click');
  const dynamicContent = document.getElementById('dynamic-content');

  if (clickBtn && dynamicContent) {
    clickBtn.addEventListener('click', () => {
      dynamicContent.textContent = 'Button Clicked!';
    });
  }

  // 2. Form Submission, Element Addition, and Error Display
  const form = document.getElementById('user-form');
  const input = document.getElementById('user-input');
  const errorDiv = document.getElementById('error-message');

  if (form && input && errorDiv && dynamicContent) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = input.value.trim();

      // Criterion: Display Error Message for empty input
      if (value === '') {
        errorDiv.textContent = 'Input cannot be empty';
        errorDiv.classList.remove('hidden');
      } else {
        errorDiv.textContent = '';
        errorDiv.classList.add('hidden');

        // Criterion: Add element to the DOM & Form Updates
        const newElement = document.createElement('div');
        newElement.className = 'dynamic-item';
        newElement.textContent = value;

        // Criterion: Remove an element from the DOM
        const removeBtn = document.createElement('button');
        removeBtn.className = 'delete-btn';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
          newElement.remove();
        });

        newElement.appendChild(removeBtn);
        dynamicContent.appendChild(newElement);

        // Reset input field
        input.value = '';
      }
    });
  }
}

// Export for Jest execution environments and auto-run in browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initDOMManipulation };
} else {
  document.addEventListener('DOMContentLoaded', initDOMManipulation);
}
