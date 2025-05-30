/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 */

import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { SessionUser } from 'express-session';

import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(
    user: User,
    done: (err: Error | null, user: SessionUser) => void,
  ) {
    console.log('serializeUser', user);

    done(null, {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  }

  async deserializeUser(
    payload: SessionUser,
    done: (err: Error | null, user: SessionUser | null) => void,
  ) {
    console.log('deserializeUser', payload);

    const user = payload.id ? await this.userService.findOne(payload.id) : null;
    done(null, user);
  }
}
