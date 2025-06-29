import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '12');

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user: User): string => {
  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name
  };

  return jwt.sign(payload, JWT_SECRET);
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}; 