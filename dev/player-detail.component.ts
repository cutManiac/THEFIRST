import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { PlayerService } from './player.service';
import { Player } from './player';

@Component({
    selector: 'my-player-detail',
    templateUrl: 'app/templates/player-detail.component.html'
})
export class PlayerDetailComponent implements OnInit {
    @Input() player: Player;

    constructor(
        private _heroService: PlayerService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        let name = this._routeParams.get('name');
        this._heroService.getPlayer(name)
            .then(hero => this.player = hero);
    }

    goBack() {
        window.history.back();
    }
}
