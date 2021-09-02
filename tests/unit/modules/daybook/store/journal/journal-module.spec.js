import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state';


const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

describe('Vuex - Pruebas en el Journal Module', () => {
    // Basicas
    test('Este el estado inicial, debe tener este state', () => {
        const store = createVuexStore(journalState)
        const { isLoading, entries } = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    })

    // Mutations
    test('mutation: setEntries', () => {
        const store = createVuexStore({ isLoading: true, entries: [] })

        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(2)

        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(4)

        expect(store.state.journal.isLoading).toBeFalsy()
    });

    test('mutation: updateEntry', () => {
        const store = createVuexStore(journalState)
        const updatedEntry = {
            id: '-MhvJKMXNJJRYY741GH3',
            date: 1629861531630,
            text: "Hola mundo desde pruebas"
        }

        store.commit('journal/updateEntry', updatedEntry)

        const { entries } = store.state.journal

        expect(entries.length).toBe(2)
        expect(entries.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry)
    });

    test('mutation: addEntry', () => {
        const store = createVuexStore(journalState)
        const newEntry = {
            id: 'ABC-123',
            date: 1629861531630,
            text: "Hola Mundito"
        }

        store.commit('journal/addEntry', newEntry)

        const { entries } = store.state.journal

        expect(entries.length).toBe(3)
        expect(entries.find(e => e.id === newEntry.id)).toBeTruthy()
    });

    test('mutation: deleteEntry', () => {
        const store = createVuexStore(journalState)
        const entryId = 'ABC-123'

        store.commit('journal/deleteEntry', entryId)

        const { entries } = store.state.journal

        expect(entries.length).toBe(2)
        expect(entries.find(e => e.id === entryId)).toBeFalsy()
    });

    // GETTERS
    test('getters: getEntriesByTerm & getEntryById', () => {
        const store = createVuexStore(journalState)

        const [ entry1, entry2 ] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('segunda').length).toBe(1)

        expect(store.getters['journal/getEntriesByTerm']('segunda')).toEqual([ entry2 ])

        expect(store.getters['journal/getEntryById']('-MhvJKMXNJJRYY741GH3')).toEqual(entry1)
    });

    // ACTIONS
    test('actions: loadEntries', async() => {
        const store = createVuexStore({ isLoading: true, entries: [] })

        await store.dispatch('journal/loadEntries')

        expect(store.state.journal.entries.length).toBe(2)
    });

    test('actions: updateEntry', async() => {
        const store = createVuexStore(journalState)

        const updatedEntry = {
            id: '-MhvJKMXNJJRYY741GH3',
            date: 1629861531630,
            text: "Hola mundo desde mock data",
            otroCampo: true,
            otroMas: { a: 1 }
        }

        await store.dispatch('journal/updateEntry', updatedEntry)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e => e.id === updatedEntry.id)).toEqual({
            id: '-MhvJKMXNJJRYY741GH3',
            date: 1629861531630,
            text: "Hola mundo desde mock data",
        })
    });

    test('actions: createEntry & deleteEntry', async() => {
        const store = createVuexStore(journalState)

        const newEntry = { date: 1627077227978, text: "Nueva entrada desde pruebas" }

        const id = await store.dispatch('journal/createEntry', newEntry)

        expect(typeof id).toBe('string')
        expect(store.state.journal.entries.find(e => e.id === id)).toBeTruthy()

        await store.dispatch('journal/deleteEntry', id)
        expect(store.state.journal.entries.find(e => e.id === id)).toBeFalsy()
    });
});