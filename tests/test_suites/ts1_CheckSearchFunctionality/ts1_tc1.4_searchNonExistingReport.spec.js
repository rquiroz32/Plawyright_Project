import { test, expect } from '@playwright/test';
import { ReportsPage } from '../../pages/ReportsPage.js';


test.describe('Test Cases for TS1 Check Search Functionality, TC1.4 Non Existen Report ID', () => {    

    test('TC1.4 Verify searching for a Report ID that doesn\'t exist displays "No Results" message in Table', async ({ page }) => {
        const reportsPage = new ReportsPage(page)
        await reportsPage.goto()
        await reportsPage.searchForId('999999999') // providing nine "9"s to force no results        
        const wait_noResultsDivContent = await (await reportsPage.page.waitForSelector('text= No results found')).textContent()
        expect(wait_noResultsDivContent).toContain('No results found')
    });


});