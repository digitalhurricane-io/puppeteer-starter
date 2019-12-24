import { Task, CustomTask } from './task';

class MyTask extends Task implements CustomTask {
    headless = false;

    async start() {
        await this.launchBrowser();
        await this.page.goto('https://google.com');
    }
}


const myTask = new MyTask();
myTask.start();