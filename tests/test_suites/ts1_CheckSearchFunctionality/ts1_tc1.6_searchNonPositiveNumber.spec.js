import { test, expect } from '@playwright/test';
import { ReportsPage } from '../../pages/ReportsPage.js';


test.describe('Test Cases for TS1 Check Search Functionality, TC1.6 Non Positive Number Search', () => {
   
    test('TC1.6 Searching for non-positive numbers should result in an Error Message. Search value : -1', async ({ page }) => {
        const reportsPage = new ReportsPage(page)
        const id = '-1'
        await reportsPage.goto()
        await reportsPage.searchForId(id)
        const errorDiv = await reportsPage.page.getByTestId('reports-error').textContent()
        await expect(errorDiv).toContain('Invalid query: reportId must be a positive number')
    });

    test('TC1.6 Searching for non-positive numbers should result in an Error Message. Search Value: 0', async ({ page }) => {
        const reportsPage = new ReportsPage(page)
        const id = '0'
        await reportsPage.goto()
        await reportsPage.searchForId(id)
        const errorDiv = await reportsPage.page.getByTestId('reports-error').textContent()
        await expect(errorDiv).toContain('Invalid query: reportId must be a positive number')
    });

});