import bcrypt from 'bcrypt';

export const hashPassword = async (originPassword: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(originPassword, saltRounds);
};

export const comparePassword = async (originPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(originPassword, hashedPassword);
};


export const generateAccessToken = async (email: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(email, saltRounds);
}

export const compareAccessToken = async (originAccessToken: string, hashedAccessToken: string): Promise<boolean> => {
  return await bcrypt.compare(originAccessToken, hashedAccessToken);
  
};