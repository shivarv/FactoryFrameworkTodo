import { LightningElement, api } from 'lwc';

export default class CustomLookup extends LightningElement {
    @api childObjectApiName = 'Case'; //Contact is the default value
    @api targetFieldApiName = 'case__c'; //AccountId is the default value
    @api fieldLabel = 'search';
    @api disabled = false;
    @api value;
    @api required = false;
    @api componentReferId;

    handleChange(event) {
        console.log('in handle change ');
        //alert(JSON.stringify(event.detail.value));
        if(!event.detail.value || event.detail.value.length === 0) {
            //alert(' empty ');
            return;
        }
        this.fireEvent(event.detail.value);
    }

    fireEvent(value) {
        this.value = value;
        const selectedEvent = new CustomEvent('valueselected', {
            detail: {id: this.componentReferId, value: value}
        });
        //dispatching the custom event
        this.dispatchEvent(selectedEvent);
    }

    @api isValid() {
        if (this.required) {
            this.template.querySelector('lightning-input-field').reportValidity();
        }
    }


    @api setCaseId(val) {
 
        this.value = val;
        this.fireEvent(val);
    }


    handleItemDragStart(ev) {
        const event = new CustomEvent('itemdrag', {
            detail:  {id: this.componentReferId, value: this.value}
        });
        this.dispatchEvent(event);
    }

    handleDrop(ev) {
        const event = new CustomEvent('itemdrop', {
            detail:  {id: this.componentReferId, value: this.value}
        });
        this.dispatchEvent(event);
    }

    handeDragOver(ev) {
        console.log(' drag over ');
        ev.preventDefault();

    }


}





/*
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
*/