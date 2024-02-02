import { test, expect } from '@playwright/test';
import { ReportsPage } from '../../pages/ReportsPage.js';
const testData = require('../../testData/ts1_tc1.3_searchIdSpecChar.json')


test.describe('Test Cases for TS1 Check Search Functionality, TC1.3 Serach with invalid characters', () => { 
 
    testData.forEach(data => {

        test(`Data driven tests for ${data.testCase_Title}`, async ({ page }) => {
            const reportsPage = new ReportsPage(page)
            const id = data.SearchValue
            await reportsPage.goto()
            await reportsPage.searchForId(id)
            const errorDiv = await reportsPage.page.getByTestId('reports-error').textContent()
            await expect(errorDiv).toContain(`${data.expectedError}`)
        });


    });

    


});