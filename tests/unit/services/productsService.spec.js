const productsService = require('../../../services/productsService');
const { mockGet } = require('nordic/restclient');

describe('Ejercicio 1 - productsService', () => {
    beforeEach(() => {
        mockGet.mockResolvedValueOnce({ data: { results: [
            {
                id: 'MLA67562',
                title: 'Ipad Air'
            }
        ]}});
    });

    it('1) El método estático getProducts debería responser con el objeto entero cuando la petición es exitosa', async () => {
        const res = await productsService.getProducts('MLA', 'tablet');
        expect(mockGet).toHaveBeenCalled();
        expect(mockGet).toHaveBeenCalledWith('/sites/MLA/search', {
            params: {
                q: 'tablet',
                offset: undefined,
                limit: undefined
            }
        });
        expect(typeof res).toBe('object');
    });
})

describe('OPCIONAL : manejo de error correcto de getProducts', () => {
    beforeEach(() => {
       mockGet.mockRejectedValueOnce('error')
    });

    it('2) Si la petición falla, arrojar un array como respuesta', async () => { 
        const res = await productsService.getProducts(null)
        expect(res).toBeInstanceOf(Array)
    });
});

xdescribe('Ejercicio 2 - productsService', () => {
    beforeEach(() => {
        mockGet.mockResolvedValueOnce({ data: { results: [
            {
                id: 'MLA67562',
                title: 'Ipad Air'
            }
        ]}});
    });

    it('3) Hace el llamado a la API utilizando la propiedad `offset` para cargar los siguientes productos', async () => {
        const res = await productsService.getProducts('MLA', 'tablet', 10);
        expect(mockGet).toHaveBeenCalled();
        expect(mockGet).toHaveBeenCalledWith('/sites/MLA/search', {
            params: {
                q: 'tablet',
                offset: 10,
                limit: undefined
            }
        });
        expect(typeof res).toBe('object');
    });
});

xdescribe('OPCIONAL - productsService', () => {
    beforeEach(() => {
        mockGet.mockResolvedValueOnce({ data: { results: [
            {
                id: 'MLA67562',
                title: 'Ipad Air'
            }
        ]}});
    });

    it('3) Hace el llamado a la API utilizando la propiedad `offset` para cargar los siguientes productos', async () => {
        const res = await productsService.getProducts('MLA', 'tablet', 10, 10);
        expect(mockGet).toHaveBeenCalled();
        expect(mockGet).toHaveBeenCalledWith('/sites/MLA/search', {
            params: {
                q: 'tablet',
                offset: 10,
                limit: 10
            }
        });
        expect(typeof res).toBe('object');
    });
});

