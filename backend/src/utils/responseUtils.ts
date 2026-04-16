import { Response } from 'express';

export const sendSuccess = (res: Response, data: any, statusCode: number = 200) => {
  return res.status(statusCode).json(data); // Send unwrapped data to match NextJS old structure
};

export const sendError = (res: Response, message: string, statusCode: number = 400) => {
  return res.status(statusCode).json({ error: message });
};
