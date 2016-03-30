import {Injectable} from 'angular2/core';

import {Player} from './player';
import {PLAYERS} from './mock-players';

@Injectable()
export class PlayerService {
    getPlayers() {
        return Promise.resolve(PLAYERS);
    }
    getgetPlayersSlow() {
        return new Promise<Player[]>(resolve =>
                setTimeout(()=>resolve(PLAYERS), 2000) // 2 seconds
        );
    }
    getPlayer(name: string) {
        return Promise.resolve(PLAYERS).then(
                players => players.filter(player => player.name === name)[0]
        );
    }
}