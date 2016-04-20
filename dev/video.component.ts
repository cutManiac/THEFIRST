import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { VideoService } from './video.service';

@Component({
    selector: 'videos',
    template: `<div><span><ul>
    <li *ngFor="#video of videos">
<span><iframe width="853" height="480" src="{{video}}?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe></span>
</li>
</ul></span></div>`
})

export class VideoComponent implements OnInit {
    videos: string[];

    constructor(

        private _router: Router,
        private _videoService: VideoService) {
    }

    getVideos() {
        this._videoService.getVideos().then(heroes => this.videos = heroes);
    }
    ngOnInit() {
        this.getVideos();
    }
}
