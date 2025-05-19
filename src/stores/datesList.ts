import { writable } from 'svelte/store';

interface Booking {
    roomId: string;
    url: string;
    date: string;
    bookedHour: string;
    duration: string;
}

 export let thisUserID = writable("");

// Initialize the store with data from localStorage if available
// @ts-ignore
const storedData: Booking[] = JSON.parse(localStorage.getItem('bookings-data')) || [];
export const myBookingStore = writable(storedData);


// Subscribe to the store and update localStorage whenever the store changes
myBookingStore.subscribe(value => {
    localStorage.setItem('bookings-data', JSON.stringify(value));
});
