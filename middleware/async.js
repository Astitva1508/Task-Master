const asyncWrapper = (fun1,fun2)=>{
    return async(req,res,next)=>{
        try{
            await fun1(req,res,next);
        }catch(error){
            next(error);
        }
    }
}

module.exports = asyncWrapper;
