import { test, expect } from '@playwright/test';
import { ReportsPage } from '../../pages/ReportsPage.js';
import { sleep, returnMatchCount } from '../../util/util.js';
const testData = require('../../testData/ts2_tc2.1_filterByStatus_testData.json')

//Data Driven tests based on '../../testData/ts2_tc2.1_filterByStatus_testData.json' 
test.describe('Test Cases for TS2 Check Filter Functionality, TC2.1 Filter By Status"', () => {
    testData.forEach(data => {
        test(`Data driven tests for ${data.testCase_Title}`, async ({ page }) => {
            const reportsPage = new ReportsPage(page)
            await reportsPage.goto()
            if (data.FilterValue === 'Reported') {                
                await reportsPage.filterByReported.click();
                await sleep(2)
                const resultsArr = await reportsPage.buildResultsArr()
                const arrayOfColValues = await reportsPage.getValuesByColumnIndex(data.colIndex, ...resultsArr)
                let matchCount = returnMatchCount(data.expectedValue, arrayOfColValues)
                expect.soft(arrayOfColValues).toEqual(expect.arrayContaining([data.expectedValue]))
                expect.soft(matchCount).toEqual(data.ExpectedMatchCount)
            }
            else if (data.FilterValue === 'Escalated') {                
                await reportsPage.filterByEscalated.click();
                await sleep(2)
                const resultsArr = await reportsPage.buildResultsArr()
                const arrayOfColValues = await reportsPage.getValuesByColumnIndex(data.colIndex, ...resultsArr)
                let matchCount = returnMatchCount(data.expectedValue, arrayOfColValues)
                expect.soft(arrayOfColValues).toEqual(expect.arrayContaining([data.expectedValue]))
                expect.soft(matchCount).toEqual(data.ExpectedMatchCount)
            }
            else if (data.FilterValue === 'Confirmed') {                
                await reportsPage.filterByConfirmed.click();
                await sleep(2)
                const resultsArr = await reportsPage.buildResultsArr()
                const arrayOfColValues = await reportsPage.getValuesByColumnIndex(data.colIndex, ...resultsArr)
                let matchCount = returnMatchCount(data.expectedValue, arrayOfColValues)
                expect.soft(arrayOfColValues).toEqual(expect.arrayContaining([data.expectedValue]))
                expect.soft(matchCount).toEqual(data.ExpectedMatchCount)
            }
            else if (data.FilterValue === 'Paid') {               
                await reportsPage.filterByPaid.click();
                await sleep(2)
                const resultsArr = await reportsPage.buildResultsArr()
                const arrayOfColValues = await reportsPage.getValuesByColumnIndex(data.colIndex, ...resultsArr)
                let matchCount = returnMatchCount(data.expectedValue, arrayOfColValues)
                expect.soft(arrayOfColValues).toEqual(expect.arrayContaining([data.expectedValue]))
                expect.soft(matchCount).toEqual(data.ExpectedMatchCount)
            }
            else if (data.FilterValue === 'Closed') {                
                await reportsPage.filterByClosed.click();
                await sleep(2)
                const resultsArr = await reportsPage.buildResultsArr()
                const arrayOfColValues = await reportsPage.getValuesByColumnIndex(data.colIndex, ...resultsArr)
                let matchCount = returnMatchCount(data.expectedValue, arrayOfColValues)
                expect.soft(arrayOfColValues).toEqual(expect.arrayContaining([data.expectedValue]))
                expect.soft(matchCount).toEqual(data.ExpectedMatchCount)
            }

            else {

                test.fixme()
                console.log('data.FilterValue did not match a value in the if/else if checks')
                //TO DO: Improve Failure message, should output a more meaningful message 
                
            }

            

        });

    });

});










