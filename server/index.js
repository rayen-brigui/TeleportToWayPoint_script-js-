import { registerCmd } from '../systems/chat';
import alt from 'alt-server';


registerCmd('tp','just to tp', (player) => {
    alt.emitClient(player,'tpto');
  });                                                     // requesting teleporting the player using the command              
