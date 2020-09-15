import { LightningElement, api, wire} from 'lwc';
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority'; 
import CASENUMBER_FIELD from '@salesforce/schema/Case.CaseNumber';
import CASECUST_FIELD from '@salesforce/schema/Case.case__c';
import STATUS_FIELD from '@salesforce/schema/Case.Status'; 
import SUBJECT_FIELD from '@salesforce/schema/Case.Subject';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import AlternateTxtRecordName from '@salesforce/schema/EmailDomainKey.AlternateTxtRecordName';

const FIELDS = [PRIORITY_FIELD, CASECUST_FIELD, CASENUMBER_FIELD];
export default class CasePanelItem extends LightningElement {
    //@api recordId = '5004K0000029nUHQAY';
    isRenderedValue = false;
    @api recordId;
    @api objectApiName = 'Case';
    @api  componentReferenceId;
    @api draggedCaseId;
    isRetrieved = false;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS }) caseLookupRecord;
    _caseChidId;

    get caseRecordNumber() {
        return this.caseLookupRecord.data.fields.CaseNumber.value;
    }

    get caseChidId() {
        console.log('get caseChildId  '+this._caseChidId);
        try {
            if(this._caseChidId && this._caseChidId !== 'undefined' || this._caseChidId == '') {
                return this._caseChidId;
            }
            this._caseChidId = String(getFieldValue(this.caseLookupRecord.data, CASECUST_FIELD));
        }
        catch(e) {
            this._caseChidId ='';
            alert(e);
        }
        this._caseChidId = (this._caseChidId === 'null' ? '' : this._caseChidId);
        return this._caseChidId;
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
        this._caseChidId = String(event.detail.value);
        console.log(' in handleValueSelected method '+ this.caseChidId);

    }

    handleItemDrop(event) {
        this._caseChidId = this.draggedCaseId;
        console.log(' in handleItemDrop method '+ this.caseChidId + ' '+ this.draggedCaseId);

    }

    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        console.log('onsubmit event recordEditForm '+ JSON.stringify(fields));
        fields.case__c = this._caseChidId;
        console.log('onsubmit event recordEditForm '+ JSON.stringify(fields));
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
}