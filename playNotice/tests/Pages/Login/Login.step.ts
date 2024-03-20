import { Page, expect, test } from '@playwright/test';
import { LoginPage } from './Login.page';

export const goToHomePage = (page: Page) =>
  test.step('Goto App Url', async () => {
    await page.goto('/');
  });

export const verifyLoginPage = (page: Page) =>
  test.step('Verify Login Page is Displaying', async () => {
    await expect(
      page.getByRole('heading', { name: LoginPage.txtLocators.loginTxt }),
    ).toBeVisible();
  });
export const enterUsernameAndPassword = (
  page: Page,
  username: String,
  password: String,
) =>
  test.step('Enter Credentials to Login to App', async () => {
    await test.step(`Enter Username: ${username} `, async () => {
      await expect(
        page.locator(LoginPage.xpathLocators.usernameInput),
      ).toBeVisible();
      await page
        .locator(LoginPage.xpathLocators.usernameInput)
        .type(`${username}`, { delay: 50 });
    });
    await test.step(`Enter Password: ${password} `, async () => {
      await expect(
        page.locator(LoginPage.xpathLocators.passwordInput),
      ).toBeVisible();
      await page
        .locator(LoginPage.xpathLocators.passwordInput)
        .type(`${password}`, { delay: 50 });
    });
    await test.step(`Click on Login Button`, async () => {
      await expect(
        page.getByRole('button', { name: LoginPage.txtLocators.loginTxt }),
      ).toBeVisible();
      await page
        .getByRole('button', { name: LoginPage.txtLocators.loginTxt })
        .click();
    });
  });

export const verifyDashBoardPageIsDisplaying = (page: Page) =>
  test.step('Verify that user has successfully Logged In and Dashboard Is Displaying', async () => {
    await expect(
      page
        .getByRole('heading')
        .filter({ hasText: LoginPage.txtLocators.planNoticeTxt })
        .first(),
    ).toBeVisible();
  });

export const verifyIncorrectCredsErrorMessage = (page: Page) =>
  test.step('Verify that user is able to see "Invalid email or password" Error Message', async () => {
    await expect(
      page.getByText(LoginPage.txtLocators.invalidCredsMsgTxt).first(),
    ).toBeVisible();
  });

export const verifyAndClickOnPlans = (page: Page) =>
  test.step('Verify and Click "Plans" in Nav Menu', async () => {
    await expect(
      page.getByTitle(LoginPage.titleLocator.planNavMenu).first(),
    ).toBeVisible();
    await page.getByTitle(LoginPage.titleLocator.planNavMenu).first().click();
  });

export const verifyAndClickOnCreatePlansBtn = (page: Page) =>
  test.step('Verify and Click on "Create Plan" Button in Plans', async () => {
    await expect(
      page
        .getByRole('button')
        .filter({ hasText: LoginPage.txtLocators.createPlanBtn })
        .first(),
    ).toBeVisible();
    await page
      .getByRole('button')
      .filter({ hasText: LoginPage.txtLocators.createPlanBtn })
      .first()
      .click();
  });

export const verifyCreatePlanPopupIsDisplaying = (page: Page) =>
  test.step('Verify "Craete a Plan" popup is Displaying', async () => {
    await expect(
      page
        .getByText(LoginPage.txtLocators.creataAPlanPopup, { exact: true })
        .first(),
    ).toBeVisible();
  });

export const verifyAndEnterPlanName = (page: Page, planname: string) =>
  test.step(`Verify and Enter Plan Name: ${planname} `, async () => {
    await expect(
      page.getByTestId(LoginPage.idLocators.planNameInput).first(),
    ).toBeVisible();
    await page
      .getByTestId(LoginPage.idLocators.planNameInput)
      .first()
      .type(planname);
  });

export const verifyAndClickOnSaveButton = (page: Page) =>
  test.step('Verify and Click on Save Button', async () => {
    await expect(
      page.getByText(LoginPage.txtLocators.saveBtn, { exact: true }).first(),
    ).toBeVisible();
    await page
      .getByText(LoginPage.txtLocators.saveBtn, { exact: true })
      .first()
      .click();
  });

export const verifyPlanCreatedSuccessfullyAndPlanDashBoardisDisplaing = (
  page: Page,
) =>
  test.step('Verify "Craete a Plan" popup is Displaying', async () => {
    await expect(
      page
        .getByText(LoginPage.txtLocators.planDashboardComponenet, {
          exact: true,
        })
        .first(),
    ).toBeVisible();
  });
