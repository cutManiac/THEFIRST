import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Player } from './player';
import { PlayerDetailComponent } from './player-detail.component';
import { PlayerService } from './player.service';

@Component({
    selector: 'my-players',
    templateUrl: 'app/templates/players.component.html',
    directives: [PlayerDetailComponent]
})

export class PlayersComponent implements OnInit {
    players: Player[];
    selectedPlayer: Player;

    constructor(
        private _router: Router,
        private _heroService: PlayerService) {
    }

    getHeroes() {
        this._heroService.getPlayers().then(heroes => this.players = heroes);
    }
    ngOnInit() {
        this.getHeroes();
    }
    onSelect(hero: Player) { this.selectedPlayer = hero; }

    gotoDetail() {
        this._router.navigate(['PlayerDetail', { name: this.selectedPlayer.name }]);
    }
}
