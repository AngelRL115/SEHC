import path from 'path';

export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API documentation for SEHC',
            version: '1.0.0',
            description: 'Documentacion de los endpoints para el sistema de control de taller especializado honda',
        },
        servers: [
            {
                url: 'http://localhost:3000/SEHC', //cuando el server este en la nube cambiar esto por la url del servicio
            },
        ],
        components: {
            schemas: {
                InventoryItem: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            format: 'int64',
                        },
                        name: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                        quantity: {
                            type: 'integer',
                        },
                        price: {
                            type: 'number',
                            format: 'float',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                ServiceInventoryItem: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            format: 'int64',
                        },
                        serviceId: {
                            type: 'integer',
                        },
                        inventoryItemId: {
                            type: 'integer',
                        },
                        quantity: {
                            type: 'integer',
                        },
                    },
                },
                Client: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                        },
                        lastName: {
                            type: 'string',
                        },
                        phone: {
                            type: 'string',
                        },
                        invoice: {
                            type: 'boolean',
                        },
                        socialReason: {
                            type: 'string',
                        },
                        zipcode: {
                            type: 'string',
                        },
                        fiscalRegimen: {
                            type: 'string',
                        },
                        email: {
                            type: 'string',
                        },
                    },
                },
                Vehicle: {
                    type: 'object',
                    properties: {
                        cliente_idcliente: {
                            type: 'integer',
                        },
                        brand: {
                            type: 'string',
                        },
                        model: {
                            type: 'string',
                        },
                        year: {
                            type: 'string',
                        },
                        color: {
                            type: 'string',
                        },
                        plate: {
                            type: 'string',
                        },
                        doors: {
                            type: 'integer',
                        },
                        motor: {
                            type: 'string',
                        },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                        },
                        name: {
                            type: 'string',
                        },
                        lastName: {
                            type: 'string',
                        },
                    },
                },
            },
            securitySchemes: {
                Bearer: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Ingresa el token generado en el metodo login'
                },
            }
        },
        security: [
            {
                Bearer: []
            },
        ],
    },
    apis: [path.join(__dirname, '../routes/*.ts')], // Indica la ubicación de tus rutas para generar la documentación
};
