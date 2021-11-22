export const successResponse = (req: any, res: any, data: any, code = 200) => res.send({
  code,
  data,
  success: true,
});

export const errorResponse = (
  req: any,
  res: any,
  errorMessage = 'Something went wrong',
  code = 500,
  error = {},
) => res.status(code).json({
  code,
  errorMessage,
  error,
  data: null,
  success: false,
});

export const defaultRegion = "us-east4";

// import * as corsModule from 'cors';
// export const cors = corsModule({origin: true});

