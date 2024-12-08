import dotenv from 'dotenv'; 
dotenv.config()
import fetch from 'node-fetch'; //previamente se debe ejecutar npm install node-fetch

const baseUrl = process.env.BASE_URL; //agregar la url base al .env para evitar exponerla 

//POST
// (async () => {
//     try {            
//         const url = `${baseUrl}/api/asignaturas`;
//         const body = {
//             nombre: 'Matematicas III',
//             profesor_id: 1,
//             create_user: 'admin'
//         };
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(body)
//         });
//         const data = await response.json();
//         console.log('POST realizado correctamente, datos al servidor:', data);
//         if (response.status === 201) {
//             console.log('Prueba exitosa: solicitud aprobada');
//         } else {
//             console.log('Prueba fallida: Error en la solicitud');
//         }
//     } catch (error) {
//         console.error('Error en la prueba:', error);
//     }
// })();

// GET
(async () => {
    try {
        const url = `${baseUrl}/api/calificaciones`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Respuesta del servidor: ',data);
    } catch (error) {
        console.error('Error en la solicitud API:', error);
    }
})();

