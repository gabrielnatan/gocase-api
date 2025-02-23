import bcrypt from 'bcrypt';
import { Encrypt } from '../../../domain/bcrypt/entity/encrypt.entity.js';

export class Bcrypt implements Encrypt {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const compare = await bcrypt.compare(password, hash);
    return compare;
  }
}
