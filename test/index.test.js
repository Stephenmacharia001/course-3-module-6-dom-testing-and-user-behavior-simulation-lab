/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
// Fixed: Path updated to look up one directory to find index.js
const { initDOMManipulation } = require('../index');

describe('DOM Testing and User Behavior Simulation Lab', () => {
  beforeEach(() => {
    // Step 1: Setup Testing Environment and load the user-provided HTML template
    // Fixed: Path updated to '../index.html' to look up one directory
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.body.innerHTML = html;
    
    // Bind all user behavior listeners
    initDOMManipulation();
  });

  // Criterion 1: Update the DOM
  test('index.js should simulate a button click and update the DOM', () => {
    const clickBtn = document.getElementById('simulate-click');
    const dynamicContent = document.getElementById('dynamic-content');

    expect(dynamicContent.textContent).toBe('');
    
    // Step 2: Simulate Click Behavior
    clickBtn.click();
    expect(dynamicContent.textContent).toBe('Button Clicked!');
  });

  // Criterion 2: Display Error Message
  test('index.js should display an error message for empty input', () => {
    const form = document.getElementById('user-form');
    const input = document.getElementById('user-input');
    const errorDiv = document.getElementById('error-message');

    input.value = '   '; // Edge case validation: invalid blank space input
    form.dispatchEvent(new Event('submit'));

    expect(errorDiv.textContent).toBe('Input cannot be empty');
    expect(errorDiv.classList.contains('hidden')).toBe(false);
  });

  // Criterion 3: Form Submission and Updates
  test('index.js should handle form submission and update the DOM', () => {
    const form = document.getElementById('user-form');
    const input = document.getElementById('user-input');
    const dynamicContent = document.getElementById('dynamic-content');

    input.value = 'Valid Submission Text';
    form.dispatchEvent(new Event('submit'));

    // Verify container updated structure and cleared the input field
    expect(dynamicContent.children.length).toBe(1);
    expect(input.value).toBe('');
  });

  // Criterion 4: Add element to the DOM
  test('index.js should add an element to the DOM', () => {
    const form = document.getElementById('user-form');
    const input = document.getElementById('user-input');
    const dynamicContent = document.getElementById('dynamic-content');

    input.value = 'New Item Added';
    form.dispatchEvent(new Event('submit'));

    const createdItem = dynamicContent.querySelector('.dynamic-item');
    expect(createdItem).not.toBeNull();
    expect(createdItem.textContent).toContain('New Item Added');
  });

  // Criterion 5: Remove an element from the DOM
  test('index.js should remove an element from the DOM', () => {
    const form = document.getElementById('user-form');
    const input = document.getElementById('user-input');
    const dynamicContent = document.getElementById('dynamic-content');

    // Add item first
    input.value = 'Item to Delete';
    form.dispatchEvent(new Event('submit'));
    expect(dynamicContent.children.length).toBe(1);

    // Trigger internal dynamic deletion button behavior
    const removeBtn = dynamicContent.querySelector('.delete-btn');
    removeBtn.click();

    expect(dynamicContent.children.length).toBe(0);
  });
});
