import fs from 'fs';

import {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult,
  FullResult,
} from '@playwright/test/reporter';
import sendEmail from './utils/emailTranspoter';

let failed = 0;
let passed = 0;

class MyReporter implements Reporter {
  constructor() {
    console.log('My Custom Repoter is Running to Collect Logs');
  }

  async onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  async onTestBegin(test: TestCase) {
    console.log(`Starting test ${test.title}`);
  }

  async onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Finished test ${test.title}: ${result.status}`);
    if (result.status === 'failed') {
      failed++;
    } else if (result.status === 'passed') {
      passed++;
    }
  }

  async onEnd(result: FullResult) {
    console.log(`Finished the run: ${result.status}`);
  }
  async onExit() {
    if (process.env.SEND_EMAIL === 'TRUE') {
      await sendEmail(passed, failed);
    }
  }
}
export default MyReporter;
