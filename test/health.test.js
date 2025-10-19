import supertest from "supertest";
import app from "../app";

describe('Health endpoint',()=>{
    it('return ok',async()=>{
        const res=await request(app).get('/api/health')
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('ok')
    })
})
