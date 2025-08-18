import { writeFileSync } from 'fs';
import { createHash } from 'crypto';

const secret = process.env.ADMIN_SECRET || '123456';
const hashedSecret = createHash('sha256').update(secret).digest('hex').slice(0, 16);

const authCode = `
export const ADMIN_HASH = '${hashedSecret}';
export const validateAdmin = (input) => {
  const inputHash = input ? btoa(input).slice(0, 16) : '';
  return inputHash === ADMIN_HASH;
};
`;

writeFileSync('./src/utils/adminSecret.js', authCode);
console.log('Admin secret injected successfully');