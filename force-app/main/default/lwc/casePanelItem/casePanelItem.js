import { LightningElement, api, wire} from 'lwc';
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority'; 
import CASENUMBER_FIELD from '@salesforce/schema/Case.CaseNumber';
import CASECUST_FIELD from '@salesforce/schema/Case.case__c';
import STATUS_FIELD from '@salesforce/schema/Case.Status'; 
import SUBJECT_FIELD from '@salesforce/schema/Case.Subject';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import AlternateTxtRecordName from '@salesforce/schema/EmailDomainKey.AlternateTxtRecordName';

const FIELDS = [PRIORITY_FIELD, CASECUST_FIELD];
export default class CasePanelItem extends LightningElement {
    //@api recordId = '5004K0000029nUHQAY';
    isRenderedValue = false;
    @api recordId;
    @api objectApiName = 'Case';
    @api  componentReferenceId;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS }) caseLookupRecord;

    get caseLookupRecordId() {
        let datav = '';
        console.log('hello ');
        try {
            datav = String(getFieldValue(this.caseLookupRecord.data, CASECUST_FIELD));
        }
        catch(e) {
            alert(e);
        }
        return datav;
    }
   
  
    handleError(event) {
        console.log(event.detail);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error creating record',
                message: event.detail.message,
                variant: 'error',
            }),
        );
    }

    get recordValue() {
        return String(this.recordId);
    }

    get isEmpty() {
        
        try {
            console.log( 'in isEmpty ' +this.recordId + ' '+ v === '5004K0000029nUHQAY'
            );

        } catch(e) {
            console.log(e);
        }

        return !this.recordId  ;
    }

    handleValueSelected(event) {
        let caseId = event.detail.value;
        alert(caseId);
    }
}