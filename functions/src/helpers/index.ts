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
) => res.status(500).json({
  code,
  errorMessage,
  error,
  data: null,
  success: false,
});

export const defaultRegion = "asia-southeast2";

