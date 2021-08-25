import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-journal-b9313-default-rtdb.firebaseio.com'
})

export default journalApi
