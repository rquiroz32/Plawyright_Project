import { test, expect } from '@playwright/test';
// import { ReportsPage } from '../../pages/ReportsPage.js';


test.describe('Test Cases for TS1 Check Search Functionality, TC1.5 Search by email : invalid characters ', () => {
    
    test.fixme('FIX_ME_TC1.5 Searching for hacker emails using invalid characters should result in an Error message', async ({ page }) => {
        
        // Work in progress, commenting out until bug has been fixed
        
        
        // const reportsPage = new ReportsPage(page)
        // const hacker_email = 'SomeTestEmail!@#$%^&*()_+@example.com' //Once Fixed this should be parameterized to search for each invalid character one at a time to ensure none are missed
        // await reportsPage.goto()
        // await reportsPage.searchForhacker_email(hacker_email)
        // const row_hacker_email = await reportsPage.page.getByText(`${hacker_email}`).textContent();
        // await expect(row_hacker_email).toBe(`#${hacker_email}`)
    });


});