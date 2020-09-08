import { LightningElement, api} from 'lwc';
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority'; 
import CASENUMBER_FIELD from '@salesforce/schema/Case.CaseNumber';
import CASECUST_FIELD from '@salesforce/schema/Case.case__c';
import STATUS_FIELD from '@salesforce/schema/Case.Status'; 
import SUBJECT_FIELD from '@salesforce/schema/Case.Subject';
export default class CasePanelItem extends LightningElement {
    @api caseId = '5004K0000029nUHQAY';
    @api objectApiName;
    objectApiName = 'Case';
    fields = [PRIORITY_FIELD, CASENUMBER_FIELD, CASECUST_FIELD, 
        STATUS_FIELD, SUBJECT_FIELD];

}