import z from "zod";

const statusEnum=z.enum(['pending','in_progress','done']);

export  const createSchema={
    body:z.object({
        title:z.string().min(1,"title is required"),
        description:z.string().optional(),
        status:statusEnum.optional(),
        priority:z.number().int().min(1).max(5).optional(),
        dueDate:z.string().datetime().optional()
    })
}

 export const updateTaskSchema={
    body:z.object({
        title:z.string().min(1).optional(),
        description:z.string().optional(),
        status:statusEnum.optional(),
        priority:z.number().int().min(1).max(5).optional(),
         dueDate:z.string().datetime().optional()

    })
}

export const getTaskQuerySchema={
    query:z.object({
        page:z.string().regex(/^\d+$/).transform(Number).optional(),
        limit:z.string().regex(/^\d+$/).transform(Number).optional(),
        status:statusEnum.optional(),
        search:z.string().optional(),
        sort:z.string().optional()



    })
}



