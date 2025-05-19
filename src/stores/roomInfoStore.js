import { writable } from "svelte/store";

/**
 * @param {string} key
 * @param {string|any} defaultValue
 */
function createLocalStorageStore(key, defaultValue) {
    const storedValue = localStorage.getItem(key);
    const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue;

    const store = writable(initialValue);

    store.subscribe(value => {
        localStorage.setItem(key, JSON.stringify(value));
    });

    return store;
}

export const bookedRoomUrl = createLocalStorageStore("bookedRoom", "");
export const bookedRoomID = createLocalStorageStore("bookedRoomID", "");
export const bookedDateDuration = createLocalStorageStore("bookedDateDuration", "");
export const bookingInfo = createLocalStorageStore("bookingInfo", 
    []
);
