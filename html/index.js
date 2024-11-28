document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('estudianteForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const estudiante = {
            cod_e: document.getElementById('cod_e').value,
            nom_e: document.getElementById('nom_e').value,
            dir_e: document.getElementById('dir_e').value,
            tel_e: document.getElementById('tel_e').value,
            fech_nac: document.getElementById('fech_nac').value
        };

        //fetch('http://localhost:3000/estudiantes', {
        fetch('http://127.0.0.1:3000/estudiantes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(estudiante),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => console.error('Error:', error));
    });
});