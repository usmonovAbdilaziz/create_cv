import type { Response } from "express"

export const successMessage =(res:Response,data:any,code=200)=>{
   return res.status(code).json({
    statusCode:code||200,
    message:'success',
    data
   })
}

export const  errorMessage =(res:Response,error:any,code=500)=>{
    const msgErr = error.message || error
    return res.status(code).json({
        statusCode:code||500,
        message:msgErr
    })
}