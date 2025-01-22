export function parseResponse(res: any) {
  return Response.json(
    JSON.parse(
      JSON.stringify(res, (key, value) => {
        return value instanceof Map ? [...value] : value;
      })
    )
  );
}
