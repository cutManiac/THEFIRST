import {Injectable} from 'angular2/core';

import {VIDEOS} from './mock-video';

@Injectable()
export class VideoService {
    getVideos() {
        return Promise.resolve(VIDEOS);
    }
}