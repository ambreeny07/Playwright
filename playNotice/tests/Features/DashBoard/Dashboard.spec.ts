import { expect, test } from '@playwright/test';
import {
  enterUsernameAndPassword,
  goToHomePage,
  verifyAndClickOnCreatePlansBtn,
  verifyAndClickOnPlans,
  verifyAndClickOnSaveButton,
  verifyAndEnterPlanName,
  verifyCreatePlanPopupIsDisplaying,
  verifyDashBoardPageIsDisplaying,
  verifyLoginPage,
  verifyPlanCreatedSuccessfullyAndPlanDashBoardisDisplaing,
} from '../../Pages/Login/Login.step';

const planName: string = 'MyAutoPlan';

test.describe('Feature - Dashboard - Plans', () => {
  //Before Hook goto baseURL
  test.beforeEach(async ({ page }) => {
    await goToHomePage(page);
  });

  test('Verify that user is able to Create Plan', async ({ page }) => {
    const username = process.env.PN_USERNAME as string;
    const password = process.env.PN_PASSWORD as string;
    await verifyLoginPage(page);
    await enterUsernameAndPassword(page, username, password);
    await verifyDashBoardPageIsDisplaying(page);
    await verifyAndClickOnPlans(page);
    await verifyAndClickOnCreatePlansBtn(page);
    await verifyCreatePlanPopupIsDisplaying(page);
    await verifyAndEnterPlanName(page, planName);
    await verifyAndClickOnSaveButton(page);
    await verifyPlanCreatedSuccessfullyAndPlanDashBoardisDisplaing(page);
  });
  test('Verify that user is able to Delete newly Created Plan', async ({
    page,
  }) => {
    const username = process.env.PN_USERNAME as string;
    const password = process.env.PN_PASSWORD as string;
    await verifyLoginPage(page);
    await enterUsernameAndPassword(page, username, password);
    await verifyDashBoardPageIsDisplaying(page);
    await verifyAndClickOnPlans(page);
    const byPlanRow = page.locator('//tr').filter({ hasText: planName });
    await byPlanRow.locator('//td').last().click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.getByText(planName).first()).not.toBeVisible();
  });
});
