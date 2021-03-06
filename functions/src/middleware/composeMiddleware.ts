const compose = (...middlewares: Function[]): Function => {
  let result = (next: any) => (req: any, res: any) => next(req, res);
  middlewares.forEach(middleware=>{
    result = (next: any) => (req: any, res: any) => middleware(req, res, result(next));
  })
  return result;
}

export default compose;