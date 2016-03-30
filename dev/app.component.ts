import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import { PlayerService }     from './player.service';
import { PlayersComponent } from './players.component';
import { PlayerDetailComponent } from './player-detail.component';
import { DashboardComponent } from './dashboard.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        PlayerService
    ]
})
@RouteConfig([
    {
        path: '/',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/player/:name',
        name: 'PlayerDetail',
        component: PlayerDetailComponent
    },
    {
        path: '/video',
        name: 'Players',
        component: PlayersComponent
    }
])
export class AppComponent {
    title = 'rP@4u';
}
