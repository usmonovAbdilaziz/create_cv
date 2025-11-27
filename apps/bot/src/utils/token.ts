import jwt from 'jsonwebtoken'

export const generateAccessToken = async(data:any)=>{
    const token = jwt.sign({data},"1111",{expiresIn:"2h"})
    return token
}
export const generateRefreshToken = async (data: any) => {
  const token = jwt.sign({ data }, "1111", { expiresIn: "1d" });
  return token;
};