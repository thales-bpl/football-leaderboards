import { JwtPayload, sign, verify } from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.JWT_SECRET || 'SECRET';

const generateToken = async (email: string, password: string): Promise<string> => {
  const token = sign({ email, password }, SECRET, { algorithm: 'HS256' });
  return token;
};

const verifyToken = async (token: string): Promise<JwtPayload> => {
  const verified = verify(token, SECRET);
  return verified as JwtPayload;
};

export {
  generateToken,
  verifyToken,
};
