import { createHash } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoUtil {
  /**
   * 加密登录密码
   * @param password 登录密码
   */
  encryptPassword(password: string): string {
    console.log(createHash('sha256').update(password));

    return createHash('sha256')
      .update(password)
      .digest('hex');
  }

  /**
   * 检查等密码是否正确
   * @param password 登录密码
   * @param encryptedPassword 加密的密码
   */
  validatePassword(password: string, encryptedPassword: string): boolean {
    const password_validating = this.encryptPassword(password);
    if (password_validating === encryptedPassword) {
      return true;
    }
    return false;
  }
}
