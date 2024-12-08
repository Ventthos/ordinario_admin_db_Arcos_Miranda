import fetch from 'node-fetch'; //previamente se debe ejecutar npm install node-fetch

(async () => {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/asignaturas');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error en la solicitud API:', error);
    }
})();

