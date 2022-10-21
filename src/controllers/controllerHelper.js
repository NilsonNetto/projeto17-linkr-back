function serverErrorResponse(res, error) {
  console.log(error);
  return res.status(500).send(error.message);
}

export { serverErrorResponse };
