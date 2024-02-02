const { expect } = require('@playwright/test');
const { isTypedArray } = require('util/types');

exports.ReportsPage = class ReportsPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {        
        this.page = page;
        this.searchByIdInput = page.getByPlaceholder('Search by id');
        this.filterByProjectDropdown = page.getByPlaceholder('Filter by Project');
        this.filterBySeverityDropdown = page.getByPlaceholder('Filter by Severity');
        this.filterByTypeDropdown = page.getByPlaceholder('Filter by type');
        this.filterByAll = page.getByTestId('filter-status').getByText('All');
        this.filterByReported = page.getByTestId('filter-status').getByText('Reported');
        this.filterByEscalated = page.getByTestId('filter-status').getByText('Escalated');
        this.filterByConfirmed = page.getByTestId('filter-status').getByText('Confirmed');
        this.filterByClosed = page.getByTestId('filter-status').getByText('Closed');
        this.filterByPaid = page.getByTestId('filter-status').getByText('Paid');

        /*

        This Property will be for the hacker email search when it's fixed:

        this.searchByHackerEmail = page.getByPlaceholder('Search by email');

        */
    }

    async goto(){
        await this.page.goto('http://localhost:3000/');
    }

    async searchForId(id) {
       await this.searchByIdInput.fill(id);               
    }

    /*

    This method will be for searching by hacker email
    async searchForhacker_email(email){
        
        await this.searchByHackerEmail.fill(email)
    }
    
    */

    async buildResultsArr(){
        const rows = await this.page.locator('tr')        
        let resultsArr=[]

        for(let i=0; i< await rows.count(); i++){  
            // skips first two indices because rows[0] returns the row with the table headers, and row[1] returns an empty string - the tr is transparent
            if(i<2){
                continue
            }
            const row = rows.nth(i)
            const colData = await row.locator('td').allTextContents()
            resultsArr.push(colData)       
        }           
        
        return resultsArr
    }

    async getValuesByColumnIndex(colIndexToCheck, ...resultsArray){
        let rowsArr = [...resultsArray]
        let actualColValuesArr = []

        for(const row of rowsArr){                        
            
            actualColValuesArr.push(row[colIndexToCheck])            
        }        
        return actualColValuesArr        
    };

};



