const supertest = require('supertest');
const { server, mongo } = require('../index.js');

const api = supertest(server);

describe('Pruebas ConsultarSorteo', () => {
    test('Buscar sorteo por id', async () => {
        const id = '6196ad25c19acb5f185f23c0';
        const url =
            '/sorteo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/' +
            id;
        const response = await api.get(url);
        const sorteos = response.body['data'];
        expect(sorteos._id).toBe(id);
    });

    test('Buscar sorteos por título', async () => {
        const titulo = 'test';
        const url =
            '/sorteoTitulo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/' +
            titulo;
        const response = await api.get(url);
        expect(response.body['data'][0].titulo).toBe(titulo);
    });

    test('Buscar sorteos por estado', async () => {
        const estado = 'finalizado';
        const url =
            '/sorteoEstado/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/' +
            estado;
        const response = await api.get(url);
        expect(response.body['data'][0].estadoSorteo).toBe(estado);
    });

    test('Buscar sorteo por id no existente', async () => {
        const id = '5e9f8f9f9c9d440000c8f9fa';
        const url =
            '/sorteo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/' +
            id;
        const response = await api.get(url);
        expect(response.body['data']).toBe(null);
    });

    test('Buscar sorteo con titulo vacio ', async () => {
        const titulo = '?';
        const url =
            '/sorteoTitulo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/' +
            titulo;
        const response = await api.get(url);
        expect(response.body['data']).toBe(undefined);
    });

    test('Buscar sorteo con estado vacio ', async () => {
        const estado = '';
        const url =
            '/sorteoEstado/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/' +
            estado;
        const response = await api.get(url);
        expect(response.body['data']).toBe(undefined);
    });
});

describe('Pruebas de modificar sorteo', () => {
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
            estadoSorteo: 'oycupasd',
        });
        const statusSorteo = response.body['status'];
        expect(statusSorteo).toBe('error');
    });
});

afterAll(() => {
    mongo.connection.close();
    server.close();
});
