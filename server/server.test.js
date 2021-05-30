const request = require('supertest')
const app = require('./server')

describe('Post Endpoints', () => {
    it('should create a new city', async () => {
        const res = await request(app)
            .post('/cidade/')
            .send({
                Nome: "Campinas",
                Estado: "SP",
            })
        expect(res.statusCode).toEqual(200)
        //expect(response.body.message).toBe('pass!')
        //expect(res.body).toHaveProperty('post')
    })
    it('should create a new client', async () => {
        const res = await request(app)
            .post('/cliente/')
            .send({
                nome_completo: "Chandler",
                sexo: "masculino",
                data_de_nascimento: "1968-04-25",
                idade: "51",
                cidade_mora: "Campinas"
            })
        expect(res.statusCode).toEqual(200)
        //expect(response.body.message).toBe('pass!')
        //expect(res.body).toHaveProperty('post')
    })
})

describe('get Endpoints', () => {
    it('should get cities by state', async () => {
        const res = await request(app)
            .get('/cidade/estado/SP/')
        expect(res.statusCode).toEqual(200)
        //expect(response.body.message).toBe('pass!')
        //expect(res.body).toHaveProperty('post')
    })
    it('should get cities by name', async () => {
        const res = await request(app)
            .get('/cidade/name/Campinas')
        expect(res.statusCode).toEqual(200)
        //expect(response.body.message).toBe('pass!')
        //expect(res.body).toHaveProperty('post')
    })
})