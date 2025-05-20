/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 */

import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';

import { config } from '@/config';

import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validates a user by checking if the provided email and password are correct.
   * It retrieves the user by email from the UserService and compares the hashed password.
   *
   * @param email - The user's email address.
   * @param password - The user's password to validate.
   *
   * @returns The user object if the credentials are valid, or null if they are invalid.
   */
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(
      {
        email,
      },
      {},
    );

    if (user && compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      user,
      access_token: this.jwtService.sign(
        {
          id: user.id,
          email: user.email,
        },
        {
          secret: config.authentication.jwtOptions.secret,
        },
      ),
    };
  }
}
