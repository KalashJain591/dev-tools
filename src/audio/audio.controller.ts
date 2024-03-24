import { Controller, Injectable, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Controller('api')
export class AudioController {
    constructor(
        @InjectQueue('audio') private audioQueue: Queue,
        @InjectQueue('video') private videoQueue: Queue
    ) {}

    @Post()
    async transcode() {
        await this.audioQueue.add('audio-job', {
            file: 'audio.mp3',
        });
        await this.videoQueue.add('video-job', {
            file: 'video.mp4',
        });
        
    }
  
    
}