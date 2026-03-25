const request = require('supertest');

const mockModels = {
  Client: {
    findByPk: jest.fn(),
  },
  Employee: {
    findByPk: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  },
  Pet: {
    findByPk: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  },
  PetVaccine: {
    findAll: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
  },
  PetMedication: {
    findAll: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
  },
};

jest.mock('../src/models', () => mockModels);

const app = require('../src/app');

describe('Pets routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockModels.Pet.findByPk.mockResolvedValue({
      id: 1,
      update: jest.fn().mockResolvedValue(undefined),
      destroy: jest.fn().mockResolvedValue(undefined),
      toJSON: () => ({ id: 1, name: 'Milo', species: 'Dog' }),
    });

    mockModels.Client.findByPk.mockResolvedValue({
      id: 1,
      full_name: 'Client One',
    });

    mockModels.PetVaccine.findOne.mockResolvedValue({
      id: 2,
      pet_id: 1,
      update: jest.fn().mockResolvedValue(undefined),
      destroy: jest.fn().mockResolvedValue(undefined),
    });

    mockModels.PetMedication.findOne.mockResolvedValue({
      id: 3,
      pet_id: 1,
      update: jest.fn().mockResolvedValue(undefined),
      destroy: jest.fn().mockResolvedValue(undefined),
    });
  });

  test('rejects POST /api/pets when client_id does not exist', async () => {
    mockModels.Client.findByPk.mockResolvedValueOnce(null);

    const response = await request(app).post('/api/pets').send({
      name: 'Nina',
      species: 'Dog',
      client_id: 999,
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].field).toBe('client_id');
  });

  test('updates vaccine with PUT /api/pets/:id/vaccines/:vaccineId', async () => {
    const response = await request(app)
      .put('/api/pets/1/vaccines/2')
      .send({
        name: 'Parvo Booster',
        application_date: '2026-03-01',
        next_due_date: '2027-03-01',
        notes: 'updated',
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(2);
    expect(mockModels.PetVaccine.findOne).toHaveBeenCalled();
  });

  test('returns 404 when deleting non-existing medication', async () => {
    mockModels.PetMedication.findOne.mockResolvedValueOnce(null);

    const response = await request(app)
      .delete('/api/pets/1/medications/50');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Medication not found' });
  });

  test('deletes medication with DELETE /api/pets/:id/medications/:medicationId', async () => {
    const response = await request(app)
      .delete('/api/pets/1/medications/3');

    expect(response.status).toBe(204);
  });
});
