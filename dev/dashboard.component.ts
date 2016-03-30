import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Player } from './player';
import { PlayerService } from './player.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/templates/dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    players: Player[] = [];
    constructor(
        private _router: Router,
        private _playerService: PlayerService) {
    }

    ngOnInit() {
        this._playerService.getPlayers()
            .then(p => this.players = p);
    }

    gotoDetail(player: Player) {
        let link = ['PlayerDetail', { name: player.name }];
        this._router.navigate(link);
    }
}