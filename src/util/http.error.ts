class HttpError extends Error {
  constructor(public readonly statusCode: number, message: string) {
    super(message)
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(404, message)
  }
}
