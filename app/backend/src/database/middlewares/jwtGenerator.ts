import { sign } from 'jsonwebtoken';

const SECRET = 'SECRET';

const generateToken = async (email: string, password: string): Promise<string> => {
  const token = sign({ email, password }, SECRET, { algorithm: 'HS256' });

  return token;
};

export default generateToken;
