import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [
            {
                id: 'id-1', name: 'Jack Daniels', number: '459-12-56'
            },
            { id: 'id-2', name: 'Ben Riach', number: '443-89-12' },
            { id: 'id-3', name: 'Glen Moray', number: '645-17-79' },
            { id: 'id-4', name: 'Capitan Morgan', number: '227-91-26' },
        ],
        filter: '',
    },
    reducers: {
        addContact(state, action) {
            state.items.unshift(action.payload);
        },
        deleteContact(state, action) {
            state.items = state.items.filter(
                contact => contact.id !== action.payload
            );
        },
        setFilter(state, action) {
            state.filter = action.payload;
        },
    },
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['filter'],
};

export const persistedContactsReducer = persistReducer(
    persistConfig,
    contactsSlice.reducer
);

export const { setFilter, addContact, deleteContact } = contactsSlice.actions;
export const getContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;

export default contactsSlice.reducer;