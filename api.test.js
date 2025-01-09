const request = require('supertest');
const app = require('./functions/api');
const mysql = require('mysql2');
jest.mock('mysql2');

describe('API Routes', () => {
    let dbMock;

    beforeAll(() => {
        dbMock = {
            query: jest.fn(),
            connect: jest.fn()
        };
        mysql.createConnection.mockReturnValue(dbMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get all products', async () => {
        const mockResponse = [{ id: 1, produto: 'Product 1', categoria: 'Category 1' }];
        dbMock.query.mockImplementation((query, callback) => {
            callback(null, mockResponse);
        });

        const response = await request(app).get('/api/produtos');
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResponse);
    });

    it('should create a new product', async () => {
        const productData = {
            produto: 'Product 1',
            categoria: 'Category 1',
            quantidade: 10,
            preco: 15.50,
            localizacao: 'Location 1'
        };
        
        const mockInsertResponse = { insertId: 1 };
        dbMock.query.mockImplementation((query, params, callback) => {
            callback(null, mockInsertResponse);
        });

        const response = await request(app)
            .post('/api/produtos')
            .send(productData);
        
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 1, produto: productData.produto });
    });

    it('should delete a product', async () => {
        dbMock.query.mockImplementation((query, params, callback) => {
            callback(null, { affectedRows: 1 });
        });

        const response = await request(app).delete('/api/produtos/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Product deleted successfully' });
    });

    it('should update a product', async () => {
        const updatedProduct = {
            produto: 'Updated Product',
            categoria: 'Updated Category',
            quantidade: 20,
            preco: 25.00,
            localizacao: 'New Location'
        };

        dbMock.query.mockImplementation((query, params, callback) => {
            callback(null, { affectedRows: 1 });
        });

        const response = await request(app)
            .put('/api/produtos/1')
            .send(updatedProduct);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Product updated successfully' });
    });
});
