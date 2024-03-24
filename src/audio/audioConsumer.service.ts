import { Job } from 'bull';
import { OnGlobalQueueActive, OnQueueActive, Process, Processor } from '@nestjs/bull';

@Processor('audio')
export class AudioConsumer {
  @Process('audio-job')
  handleTranscode(job: Job) {
    console.log('Start audio compress into mp3...');
    console.log(job.data);
    console.log('completed!!');
  }
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
  @OnGlobalQueueActive()
  onGlobalActive(jobId: number) {
    console.log(`Active job ${jobId}...`);
  }

}
