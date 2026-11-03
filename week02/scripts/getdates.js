// Step 5: Declare variables holding references to the input, button, and list elements
const input = document.querySelector('#favchap');
const button = document.querySelector('#add-btn');
const list = document.querySelector('#list');

// Add click event listener to the "Add Chapter" button
button.addEventListener('click', function () {
    // Ensure the input field is not empty before creating elements
    if (input.value.trim() !== '') {
        // Step 6: Create an li element
        const li = document.createElement('li');

        // Step 7: Create a delete button
        const deleteButton = document.createElement('button');

        // Step 8: Populate the li element variable's textContent with the input value
        li.textContent = input.value;

        // Step 9: Set the delete button's textContent to ❌
        deleteButton.textContent = '';

        // Step 10: Append the delete button to the li element
        li.append(deleteButton);

        // Step 11: Append the li element variable to the unordered list
        list.append(li);

        // Add event listener to delete button to remove chapter item from list
        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });

        // Clear input field and set focus back to input box
        input.value = '';
        input.focus();
    } else {
        // Focus input if clicked while empty
        input.focus();
    }
});