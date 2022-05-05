import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string;
}

export function authenticated(request: Request, response: Response, next: NextFunction) {
  // Receiving token
  const authToken = request.headers.authorization;

  // Check if the token is empty
  if (!authToken) {
    return response.status(401).json({ message: 'Invalid token' });
  }

  // Splitting word Bearer and token itself by the space and assigning only the second index to the variable token
  const [, token] = authToken.split(' ');

  try {
    // Checking if the token is valid
    const { sub } = verify(token, process.env.SECRET_KEY) as Payload;

    // Fetching user data from the token
    request.user_id = sub;

    return next();
  } catch {
    return response.status(401).json('Unable to verify token');
  }
}
