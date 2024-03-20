import { expect, test } from '@playwright/test';
import {
  enterUsernameAndPassword,
  goToHomePage,
  verifyDashBoardPageIsDisplaying,
  verifyIncorrectCredsErrorMessage,
  verifyLoginPage,
} from '../../Pages/Login/Login.step';

test.describe('Feature - Login To Application', () => {
  //Before Hook goto baseURL
  test.beforeEach(async ({ page }) => {
    await goToHomePage(page);
  });

  test('Verify that user is able to login with valid credentials', async ({
    page,
  }) => {
    const username = process.env.PN_USERNAME as string;
    const password = process.env.PN_PASSWORD as string;
    await verifyLoginPage(page);
    await enterUsernameAndPassword(page, username, password);
    // await page.waitForTimeout(500000);
    await verifyDashBoardPageIsDisplaying(page);
  });

  // <-------------------Negative TestCase ---------------------->
  test('Verify that user is not able to login with wrong credentials', async ({
    page,
  }) => {
    const username = 'wrongemail@gmail.com';
    const password = 'TEST12345@@';
    await verifyLoginPage(page);
    await enterUsernameAndPassword(page, username, password);
    await verifyIncorrectCredsErrorMessage(page);
  });
});
