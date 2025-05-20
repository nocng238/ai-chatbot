/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 */

import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { WsGuard } from './guards/ws.guard';
import { SocketEventDispatcherService } from './services/socket-event-dispatcher.service';
import { WebsocketGateway } from './websocket.gateway';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [WebsocketGateway, SocketEventDispatcherService, WsGuard],
  exports: [WebsocketGateway],
})
export class WebsocketModule {}
