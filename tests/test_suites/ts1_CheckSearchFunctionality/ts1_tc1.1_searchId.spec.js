import { test, expect } from '@playwright/test';
import { ReportsPage } from '../../pages/ReportsPage.js';

test.describe('Test Cases for TS1 Check Search Functionality, TC1.1 Search by a report ID', () => {

    test('TC1.1 Verify Users can search by report id', async ({ page }) => {
        const reportsPage = new ReportsPage(page)
        const id = '23'
        await reportsPage.goto()
        await reportsPage.searchForId(id)
        const row_id = await reportsPage.page.getByTestId(`report-row-${id}`).getByText('#').textContent();
        await expect(row_id).toBe(`#${id}`)
    });    

});