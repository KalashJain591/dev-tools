import { Job } from 'bull';
import { OnQueueActive, Process, Processor } from '@nestjs/bull';

@Processor('video')
export class VideoConsumer {
  @Process('video-job')
  handleTransvideo(job: Job) {
    console.log('Start vidoe compress into mp4...');
    console.log(job.data);
    console.log('completed!!');
  }
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}