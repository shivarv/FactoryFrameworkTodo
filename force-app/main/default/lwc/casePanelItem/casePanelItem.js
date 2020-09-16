/* eslint-disable no-alert */
/* eslint-disable @lwc/lwc/no-api-reassignments */
/* eslint-disable no-unused-vars */
import { LightningElement, api, wire} from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority'; 
import CASENUMBER_FIELD from '@salesforce/schema/Case.CaseNumber';
import CASECUST_FIELD from '@salesforce/schema/Case.case__c';
import CASEID_FIELD from '@salesforce/schema/Case.Id';
import CASEDESC_FIELD from '@salesforce/schema/Case.Description';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { createMessageContext, releaseMessageContext,
            subscribe, unsubscribe, publish } from 'lightning/messageService';
import MESSAGECHANNEL from "@salesforce/messageChannel/RecordDraggedMessageChannel__c";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


const FIELDS = [PRIORITY_FIELD, CASECUST_FIELD, CASENUMBER_FIELD, CASEDESC_FIELD];
export default class CasePanelItem extends LightningElement {
    context = createMessageContext();
    subscription = null;
    @api panelId;
    isRenderedValue = false;
    @api recordId;
    @api objectApiName = 'Case';
    @api  componentReferenceId;
    @api draggedCaseId;
    isRetrieved = false;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS }) caseLookupRecord;
    @wire(getRecord, { recordId: '$_caseChidId', fields: FIELDS }) caseChildRecord;

    _caseChidId;

    constructor() {
        super();
        this.subscribeMC();
    }

    get caseChildRecordDesValue() {
        return this.caseChildRecord.data.fields.Description.value;
    }

    get caseRecordNumber() {
        return this.caseLookupRecord.data.fields.CaseNumber.value;
    }

    get caseChidId() {
        console.log('get caseChildId  '+this._caseChidId);
        try {
            if(this._caseChidId && this._caseChidId !== 'undefined' || this._caseChidId === '') {
                return this._caseChidId;
            }
            this._caseChidId = String(getFieldValue(this.caseLookupRecord.data, CASECUST_FIELD));
        }
        catch(e) {
            this._caseChidId ='';
            // eslint-disable-next-line no-alert
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
    handleValueSelected(event) {
        this._caseChidId = String(event.detail.value);
        console.log(' in handleValueSelected method '+ this.caseChidId);

    }

    handleDragStart(event) {
        this.publishMC();
    }

    handleDragOver(event) {
       // console.log('in handle drag over');
        event.preventDefault();
    }

    handleDrop(event) {
        this._caseChidId = this.draggedCaseId;
        console.log(' in handleItemDrop method '+ this.caseChidId + ' '+ this.draggedCaseId);
        this.setCaseValueOnRecord();
    }

    setCaseValueOnRecord() {
        let childEle =  this.template.querySelector('c-custom-lookup');
        childEle.setCaseId(this._caseChidId);
    }

    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        console.log('onsubmit event recordEditForm '+ JSON.stringify(fields));
        fields.case__c = this._caseChidId;
        console.log('onsubmit event recordEditForm '+ JSON.stringify(fields));
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        this.handeParentLookupSubmit();
    }

    handeParentLookupSubmit() {
        const fields = {};
        fields[CASEID_FIELD.fieldApiName] = this.caseChidId;
        fields[CASEDESC_FIELD.fieldApiName] = this.template.querySelector("[data-field='childDes']").value;
        const recordInput = { fields };
        updateRecord(recordInput)
        .then(() => {
            console.log('in update success');
            // Display fresh data in the form
            return refreshApex(this.caseChildRecord);
        })
        .catch(error => {
            alert(error.body.message);
        });
    }


    handleMessage(message) {
       if(message.panelName !== this.panelId) {
           this.draggedCaseId = message.recordId;
       }
       // eslint-disable-next-line no-alert
       //alert(' in handle Message '+ message.panelName + ' '+ message.recordId);
    }

    subscribeMC() {
       if (this.subscription) {
           return;
       }
       this.subscription = subscribe(this.context, MESSAGECHANNEL, (message) => {
           this.handleMessage(message);
       });
    }

    unsubscribeMC() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    publishMC() {
        const message = {recordId: this.recordId, 
                        panelName: this.panelId};
        publish(this.context, MESSAGECHANNEL, message);
    }

    disconnectedCallback() {
        releaseMessageContext(this.context);
    }
}