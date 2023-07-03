class PasswordHash {
  itoa64: string;
  iterationCountLog2: number;
  portableHashes: boolean;
  randomState: string;
  constructor(iterationCountLog2: number, portableHashes: boolean) {
    this.itoa64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (iterationCountLog2 < 4 || iterationCountLog2 > 31)
      iterationCountLog2 = 8;
    this.iterationCountLog2 = iterationCountLog2;

    this.portableHashes = portableHashes;

    this.randomState = Date.now().toString();
    if (typeof process !== 'undefined' && typeof process.pid === 'number')
      this.randomState += process.pid.toString();
  }

  get_random_bytes(count: number) {
    let output = '';
    if (typeof require !== 'undefined' && typeof require('crypto').randomBytes === 'function') {
      output = require('crypto').randomBytes(count).toString('binary');
    } else {
      for (let i = 0; i < count; i += 16) {
        this.randomState = this.md5(Date.now().toString() + this.randomState, true);
        output += this.md5(this.randomState, true);
      }
      output = output.substr(0, count);
    }
    return output;
  }

  encode64(input: string, count: number) {
    let output = '';
    let i = 0;
    do {
      let value = input.charCodeAt(i++);
      output += this.itoa64[value & 0x3f];
      if (i < count)
        value |= input.charCodeAt(i) << 8;
      output += this.itoa64[(value >> 6) & 0x3f];
      if (i++ >= count)
        break;
      if (i < count)
        value |= input.charCodeAt(i) << 16;
      output += this.itoa64[(value >> 12) & 0x3f];
      if (i++ >= count)
        break;
      output += this.itoa64[(value >> 18) & 0x3f];
    } while (i < count);

    return output;
  }

  gensaltPrivate(input: string) {
    let output = '$P$';
    output += this.itoa64[Math.min(this.iterationCountLog2 + 5, 30)];
    output += this.encode64(input, 6);

    return output;
  }

  cryptPrivate(password: any, setting: string) {
    let output = '*0';
    if (setting.substr(0, 2) === output)
      output = '*1';

    const id = setting.substr(0, 3);
    if (id !== '$P$' && id !== '$H$')
      return output;

    const countLog2 = this.itoa64.indexOf(setting[3]);
    if (countLog2 < 7 || countLog2 > 30)
      return output;

    let count = 1 << countLog2;

    const salt = setting.substr(4, 8);
    if (salt.length !== 8)
      return output;

    let hash = this.md5(salt + password, true);
    do {
      hash = this.md5(hash + password, true);
    } while (--count);

    output = setting.substr(0, 12);
    output += this.encode64(hash, 16);

    return output;
  }

  gensaltBlowfish(input: string) {
    const itoa64 = './ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let output = '$2a$';
    output += String.fromCharCode((this.iterationCountLog2 / 10) + 48);
    output += String.fromCharCode((this.iterationCountLog2 % 10) + 48);
    output += '$';

    let i = 0;
    do {
      let c1 = input.charCodeAt(i++);
      output += itoa64[c1 >> 2];
      c1 = (c1 & 0x03) << 4;
      if (i >= 16) {
        output += itoa64[c1];
        break;
      }

      let c2 = input.charCodeAt(i++);
      c1 |= c2 >> 4;
      output += itoa64[c1];
      c1 = (c2 & 0x0f) << 2;

      c2 = input.charCodeAt(i++);
      c1 |= c2 >> 6;
      output += itoa64[c1];
      output += itoa64[c2 & 0x3f];
    } while (true);

    return output;
  }

  md5(input: string, raw: boolean | undefined) {
    const crypto = require('crypto');
    const hash = crypto.createHash('md5').update(input, 'binary').digest(raw ? 'binary' : 'hex');
    return raw ? hash : hash.toString();
  }

  hashPassword(password: string | any[]) {
    if (password.length > 4096) {
      return '*';
    }

    let random = '';

    if (typeof process !== 'undefined' && typeof process.pid === 'number' && typeof require !== 'undefined' && typeof require('crypto').randomBytes === 'function') {
      random = this.get_random_bytes(16);
      const hash = require('bcrypt').hashSync(password, this.gensaltBlowfish(random));
      if (hash.length === 60)
        return hash;
    }

    if (random.length < 6)
      random = this.get_random_bytes(6);
    const hash = this.cryptPrivate(password, this.gensaltPrivate(random));
    if (hash.length === 34)
      return hash;

    return '*';
  }

  checkPassword(password: string | any[], storedHash: string) {
    if (password.length > 4096) {
      return false;
    }

    const hash = this.cryptPrivate(password, storedHash);
    if (hash[0] === '*')
      return require('bcrypt').compareSync(password, storedHash);

    // This is not constant-time. To improve timing safety, you can consider using bcrypt for comparison.
    return hash === storedHash;
  }
}

function wp_hash_password(password: string) {
  const wp_hasher = new PasswordHash(8, true);
  return wp_hasher.hashPassword(password);
}

function validatePassword(password: string, storedHash: string) {
  const wp_hasher = new PasswordHash(8, true);
  return wp_hasher.checkPassword(password, storedHash);
}

export { validatePassword, wp_hash_password };