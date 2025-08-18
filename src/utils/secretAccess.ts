// Secret key sequence for admin access
let keySequence: string[] = [];
const SECRET_SEQUENCE = ['s', 'h', 'a', 's', 'h', 'a', 'n', 'k'];

export const initSecretAccess = (callback: () => void) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    keySequence.push(event.key.toLowerCase());
    
    if (keySequence.length > SECRET_SEQUENCE.length) {
      keySequence = keySequence.slice(-SECRET_SEQUENCE.length);
    }
    
    if (keySequence.join('') === SECRET_SEQUENCE.join('')) {
      keySequence = [];
      callback();
    }
  };

  document.addEventListener('keydown', handleKeyPress);
  return () => document.removeEventListener('keydown', handleKeyPress);
};