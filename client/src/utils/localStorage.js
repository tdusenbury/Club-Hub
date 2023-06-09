export const getSavedEventIds = () => {
    const savedEventIds = localStorage.getItem('saved_Events')
        ? JSON.parse(localStorage.getItem('saved_Events'))
        : [];
    return savedEventIds;
};

export const saveEventIds = (EventIdArr) => {
    if (EventIdArr.length) {
        localStorage.setItem('saved_Events', JSON.stringify(EventIdArr));
    } else {
        localStorage.removeItem('saved_Events');
    }
};

export const removeEventId = (EventId) => {
    const savedEventIds = localStorage.getItem('saved_Events')
        ? JSON.parse(localStorage.getItem('saved_Events'))
        : null;

    if (!savedEventIds) {
        return false;
    }

    const updatedSavedEventIds = savedEventIds?.filter((savedEventId) => savedEventId !== EventId);
    localStorage.setItem('saved_Events', JSON.stringify(updatedSavedEventIds));

    return true;
};