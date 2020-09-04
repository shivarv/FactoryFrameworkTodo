import { LightningElement, track } from 'lwc';
import serachCases from '@salesforce/apex/searchCase.retrieveCases';
// datatable columns
const columns = [
    {
        label: 'caseNumber',
        fieldName: 'CaseNumber',
    }, {
        label: 'parentCase',
        fieldName: 'case__c',
    }, {
        label: 'createddate',
        fieldName: 'createddate',
    }, {
        label: 'Type',
        fieldName: 'Type',
        type: 'text'
    },
];
export default class CaseSearch extends LightningElement {
    @track searchData;
    @track columns = columns;
    @track errorMsg = '';
    strSearchCaseName = '';
    
    handleCaseName(event) {
        this.strSearchCaseName = event.detail.value;
    }

    handleSearch() {
        if(!this.strSearchCaseName) {
            this.errorMsg = 'Please enter Case number to search.';
            this.searchData = undefined;
            return;
        }

        serachCases({strCaseNum : this.strSearchCaseName})
        .then(result => {
            result.forEach((record) => {
                console.log(JSON.stringify(record));
                //record.caseNumber = '/' + record.Id;
            });

            this.searchData = result;
            
        })
        .catch(error => {
            this.searchData = undefined;
            console.log('error =====> '+JSON.stringify(error));
            if(error) {
                this.errorMsg = error;
            }
        }) 
    }


}