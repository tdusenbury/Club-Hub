// Retrieve the saved event IDs from local storage
export const getSavedEventIds = () => {
    const savedEventIds = localStorage.getItem('saved_Events')
        ? JSON.parse(localStorage.getItem('saved_Events'))
        : [];
    return savedEventIds;
};

// Save the provided array of event IDs to local storage
export const saveEventIds = (EventIdArr) => {
    if (EventIdArr.length) {
        // If the provided array is not empty, stringify and store it in local storage
        localStorage.setItem('saved_Events', JSON.stringify(EventIdArr));
    } else {
        // If the provided array is empty, remove the 'saved_Events' key from local storage
        localStorage.removeItem('saved_Events');
    }
};

// Remove a specific event ID from the saved event IDs in local storage
export const removeEventId = (EventId) => {
    // Retrieve the existing saved event IDs from local storage
    const savedEventIds = localStorage.getItem('saved_Events')
        ? JSON.parse(localStorage.getItem('saved_Events'))
        : null;

    if (!savedEventIds) {
        // If no saved event IDs are found, return false
        return false;
    }

    // Filter out the specified event ID from the saved event IDs
    const updatedSavedEventIds = savedEventIds?.filter((savedEventId) => savedEventId !== EventId);

    // Update the 'saved_Events' key in local storage with the updated array of event IDs
    localStorage.setItem('saved_Events', JSON.stringify(updatedSavedEventIds));

    // Return true to indicate successful removal of the event ID
    return true;
};
