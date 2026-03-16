function generateStrongPassword() {
    function secureRandomInt(max) {
      const uint32 = new Uint32Array(1);
      const range = 0x100000000;
      const limit = range - (range % max);
      while (true) {
        window.crypto.getRandomValues(uint32);
        const r = uint32[0];
        if (r < limit) return r % max;
      }
    }
  
    const LOWER = 'abcdefghijklmnopqrstuvwxyz';
    const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const DIGITS = '0123456789';
    const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.<>?/|~';
    const ALL = LOWER + UPPER + DIGITS + SYMBOLS;
  
    function secureShuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = secureRandomInt(i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
  
    const length = 16 + secureRandomInt(5); // 16..20
    const required = [
      LOWER.charAt(secureRandomInt(LOWER.length)),
      UPPER.charAt(secureRandomInt(UPPER.length)),
      DIGITS.charAt(secureRandomInt(DIGITS.length)),
      SYMBOLS.charAt(secureRandomInt(SYMBOLS.length))
    ];
  
    const chars = required.slice();
    const remaining = length - required.length;
    for (let i = 0; i < remaining; i++) {
      chars.push(ALL.charAt(secureRandomInt(ALL.length)));
    }
  
    secureShuffle(chars);
    return chars.join('');
  }
  