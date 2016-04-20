import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import { PlayerService }     from './player.service';
import { PlayersComponent } from './players.component';
import { PlayerDetailComponent } from './player-detail.component';
import { DashboardComponent } from './dashboard.component';
import { VideoComponent } from './video.component';
import { VideoService } from './video.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        PlayerService,
        VideoService
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
        path: '/players',
        name: 'Players',
        component: PlayersComponent
    },
    {
        path: '/video',
        name: 'Video',
        component: VideoComponent
    }
])
export class AppComponent {
    title = 'rP@4u';
}
