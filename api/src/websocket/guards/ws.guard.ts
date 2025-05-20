/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 */

import { CanActivate, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { config } from '@/config';
import { LoggerService } from '@/logger/logger.service';
import { Observable } from 'rxjs';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private logger: LoggerService,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    this.logger.log(
      `Context: ${JSON.stringify(context.args[0].handshake.auth)}`,
    );
    const bearerToken =
      context.args[0].handshake.headers.authorization.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(bearerToken, {
        secret: config.authentication.jwtOptions.secret,
      }) as any;
      this.logger.log('Decoded JWT:', decoded);
      return decoded;
    } catch (ex) {
      this.logger.error(ex);
      return false;
    }
  }
}
