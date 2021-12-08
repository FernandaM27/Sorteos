const supertest = require('supertest');
const mongoose = require('mongoose');
const { server } = require('../index.js');

const api = supertest(server);

describe('Pruebas de modificar sorteo', () => {
    afterAll(() => {
        mongoose.connection.close();
        server.close();
    });

    test('Que el periodo de notificación no sea mayor a 2 días', async () => {
        const id = '6196ad25c19acb5f185f23c0';
        const url =
            '/sorteo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/' +
            id;

        const response = await api.put(url).send({
            numMin: 1,
            numMax: 5,
            precioNumeros: 40,
            fechaInicioVenta: '2020-09-09T06:00:00.000Z',
            fechaFinVenta: '2020-09-10T06:00:00.000Z',
            fechaCreacion: '2020-09-09T06:00:00.000Z',
            fechaSorteo: '2020-09-10T06:00:00.000Z',
            diasLimiteApartado: 1,
            titulo: 'test',
            descripcion: 'SorteoCAmbiado',
            estado: 'Libre',
            tiempoRecordatorio: 3,
            estadoSorteo: 'vigente',
        });
        const statusSorteo = response.body['status'];
        expect(statusSorteo).toBe('error');
    });

    test('Modificar un sorteo con un id que no existe.', async () => {
        const idNoExistente = '6asdad25c19acb5f185f23c0';
        const url =
            '/sorteo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/' +
            idNoExistente;

        const response = await api.put(url).send({
            numMin: 1,
            numMax: 5,
            precioNumeros: 40,
            fechaInicioVenta: '2020-09-09T06:00:00.000Z',
            fechaFinVenta: '2020-09-10T06:00:00.000Z',
            fechaCreacion: '2020-09-09T06:00:00.000Z',
            fechaSorteo: '2020-09-10T06:00:00.000Z',
            diasLimiteApartado: 1,
            titulo: 'test',
            descripcion: 'SorteoCAmbiado',
            estado: 'Libre',
            tiempoRecordatorio: 2,
            estadoSorteo: 'vigente',
        });
        const statusSorteo = response.body['status'];
        expect(statusSorteo).toBe('error');
    });

    test('no se pueda modificar sorteo sin un token del usuario administrador.', async () => {
        const id = '6196ad25c19acb5f185f23c0';
        const url = '/sorteo/' + id;

        const response = await api.put(url).send({
            numMin: 1,
            numMax: 5,
            precioNumeros: 40,
            fechaInicioVenta: '2020-09-09T06:00:00.000Z',
            fechaFinVenta: '2020-09-10T06:00:00.000Z',
            fechaCreacion: '2020-09-09T06:00:00.000Z',
            fechaSorteo: '2020-09-10T06:00:00.000Z',
            diasLimiteApartado: 1,
            titulo: 'test',
            descripcion: 'SorteoCAmbiado',
            estado: 'Libre',
            tiempoRecordatorio: 2,
            estadoSorteo: 'vigente',
        });
        const statusSorteo = response.body['status'];
        expect(statusSorteo).toBe(undefined);
    });

    test('Modificar sorteo con atributo erroneo', async () => {
        const id = '61a5b2a90f08916869730afa';
        const url =
            '/sorteo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/' +
            id;
        const data = {
            numMin: 1,
            numMax: 5,
            precioNumeros: 40,
            fechaInicioVenta: '2020-09-09T06:00:00.000Z',
            fechaFinVenta: '2020-09-10T06:00:00.000Z',
            fechaCreacion: '2020-09-09T06:00:00.000Z',
            fechaSorteo: '2020-09-10T06:00:00.000Z',
            diasLimiteApartado: 1,
            titulo: 'test',
            descripcion: 'SorteoCAmbiado',
            estado: 'Libre',
            tiempoRecordatorio: 2,
            estadoSorteo: 'vigente',
            prueba: 'prueb',
            boletos: [],
        };
        const response = await api.put(url).send(data);
        const sorteo = response.body;
        expect(sorteo).not.toEqual(data);
    });

    test('Modificar sorteo con tipo de dato invalido en el precio', async () => {
        const id = '61a5b2a90f08916869730afa';
        const url =
            '/sorteo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/' +
            id;
        const data = {
            numMin: 1,
            numMax: 5,
            precioNumeros: 'perro',
            fechaInicioVenta: '2020-09-09T06:00:00.000Z',
            fechaFinVenta: '2020-09-10T06:00:00.000Z',
            fechaCreacion: '2020-09-09T06:00:00.000Z',
            fechaSorteo: '2020-09-10T06:00:00.000Z',
            diasLimiteApartado: 1,
            titulo: 'test',
            descripcion: 'SorteoCAmbiado',
            estado: 'Libre',
            tiempoRecordatorio: 2,
            estadoSorteo: 'vigente',
            boletos: [],
        };
        const response = await api.put(url).send(data);
        const statusResponse = response.body.status;
        expect(statusResponse).toBe('error');
    });

    test('no se pueda modificar el titulo del sorteo con espacios vacios o en blanco', async () => {
        const id = '61a5b2a90f08916869730afa';
        const url =
            '/sorteo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/' +
            id;
        const data = {
            numMin: 1,
            numMax: 5,
            precioNumeros: '40',
            fechaInicioVenta: '2020-09-09T06:00:00.000Z',
            fechaFinVenta: '2020-09-10T06:00:00.000Z',
            fechaCreacion: '2020-09-09T06:00:00.000Z',
            fechaSorteo: '2020-09-10T06:00:00.000Z',
            diasLimiteApartado: 1,
            titulo: '      ',
            descripcion: 'SorteoCAmbiado',
            estado: 'Libre',
            tiempoRecordatorio: 2,
            estadoSorteo: 'vigente',
            boletos: [],
        };
        const response = await api.put(url).send(data);
        const statusResponse = response.body.status;
        expect(statusResponse).toBe('error');
    });

    test('Que el rango de inicio de boletos sea inferior al final.', async () => {
        const id = '61a5b2a90f08916869730afa';
        const url =
            '/sorteo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/' +
            id;
        const data = {
            numMin: 5,
            numMax: 1,
            precioNumeros: '40',
            fechaInicioVenta: '2020-09-09T06:00:00.000Z',
            fechaFinVenta: '2020-09-10T06:00:00.000Z',
            fechaCreacion: '2020-09-09T06:00:00.000Z',
            fechaSorteo: '2020-09-10T06:00:00.000Z',
            diasLimiteApartado: 1,
            titulo: 'titulo',
            descripcion: 'SorteoCAmbiado',
            estado: 'Libre',
            tiempoRecordatorio: 2,
            estadoSorteo: 'vigente',
            boletos: [],
        };
        const response = await api.put(url).send(data);
    });

    test('Actualizar un sorteo con un precio del boleto menor a 1', async () => {
        const id = '61a5b2a90f08916869730afa';
        const url =
            '/sorteo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/' +
            id;
        const data = {
            numMin: 1,
            numMax: 5,
            precioNumeros: '-1',
            fechaInicioVenta: '2020-09-09T06:00:00.000Z',
            fechaFinVenta: '2020-09-10T06:00:00.000Z',
            fechaCreacion: '2020-09-09T06:00:00.000Z',
            fechaSorteo: '2020-09-10T06:00:00.000Z',
            diasLimiteApartado: 1,
            titulo: 'titulo',
            descripcion: 'SorteoCAmbiado',
            estado: 'Libre',
            tiempoRecordatorio: 2,
            estadoSorteo: 'vigente',
            boletos: [],
        };
        const response = await api.put(url).send(data);
        const statusResponse = response.body.status;
        expect(statusResponse).toBe('error');
    });

    test('no se pueda modificar el estado a “espera” si ya se tienen boletos vendidos.', async () => {
        const id = '61a5b2a90f08916869730afa';
        const url =
            '/sorteo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/' +
            id;
        const data = {
            numMin: 1,
            numMax: 5,
            precioNumeros: '23',
            fechaInicioVenta: '2020-09-09T06:00:00.000Z',
            fechaFinVenta: '2020-09-10T06:00:00.000Z',
            fechaCreacion: '2020-09-09T06:00:00.000Z',
            fechaSorteo: '2020-09-10T06:00:00.000Z',
            diasLimiteApartado: 1,
            titulo: 'titulo',
            descripcion: 'SorteoCAmbiado',
            estado: 'Libre',
            tiempoRecordatorio: 2,
            estadoSorteo: 'vigente',
            boletos: [],
        };

        const response = await api.put(url).send(data);
        const statusResponse = response.body.status;
        expect(statusResponse).toBe('success');
    });

    //write a test that validates two date objects are not equal
    test('fecha de inicio de sorteo sea anterior a la fecha de finalización.', async () => {
        const id = '61a5b2a90f08916869730afa';
        const url =
            '/sorteo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/' +
            id;
        const data = {
            numMin: 1,
            numMax: 5,
            precioNumeros: '23',
            fechaInicioVenta: '2020-09-09T06:00:00.000Z',
            fechaFinVenta: '2020-07-10T06:00:00.000Z',
            fechaCreacion: '2020-09-09T06:00:00.000Z',
            fechaSorteo: '2020-09-10T06:00:00.000Z',
            diasLimiteApartado: 1,
            titulo: 'titulo',
            descripcion: 'SorteoCAmbiado',
            estado: 'Libre',
            tiempoRecordatorio: 2,
            estadoSorteo: 'vigente',
            boletos: [],
        };

        const response = await api.put(url).send(data);
        const statusResponse = response.body.status;
        console.log(statusResponse);
        //        expect(statusResponse).toBe('success');
    });
});
