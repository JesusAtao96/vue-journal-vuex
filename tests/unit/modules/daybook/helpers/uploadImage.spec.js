import cloudinary from "cloudinary"
import axios from "axios"

import uploadImage from "@/modules/daybook/helpers/uploadImage"

cloudinary.config({
    cloud_name: 'jealeat96',
    api_key: '878796746126635',
    api_secret: 'vVAhGg-tAYbyWnEoyPVu8Igb42U'
})

describe('Pruebas en el uploadImage', () => {
    test('debe de cargar un archivo y retornar el url', async (done) => {
        const { data } = await axios.get('https://res.cloudinary.com/jealeat96/image/upload/v1629929589/kacbr99lcmq5b5a5blff.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([data], 'foto.jpg')

        const url = await uploadImage(file)

        expect(typeof url).toBe('string')

        // Tomar el ID
        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')
        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done()
        })
    })
})