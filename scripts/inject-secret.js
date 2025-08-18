import { writeFileSync } from 'fs';

const secret = process.env.ADMIN_SECRET || '123456';
const hashedSecret = Buffer.from(secret).toString('base64').slice(0, 16);

const authCode = `
export const ADMIN_HASH = '${hashedSecret}';
export const validateAdmin = (input) => {
  const inputHash = input ? btoa(input).slice(0, 16) : '';
  return inputHash === ADMIN_HASH;
};
`;

writeFileSync('./src/utils/adminSecret.js', authCode);
console.log('Admin secret injected successfully');