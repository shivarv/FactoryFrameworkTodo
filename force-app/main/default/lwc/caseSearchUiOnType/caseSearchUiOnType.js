import { LightningElement, api, track } from 'lwc';

export default class CaseSearchUiOnType extends LightningElement {
    @api type;

    chosenDateValue;
    chosenUserValue;
    chosenStatusValue;
    objectName;
    @track fieldNames;
    @track columns;

    constructor() {
        super();
        this.objectName = 'Case';
        this.fieldNames = ['Id, CaseNumber'];
        this.columns = [ 
                            { label: 'Id', fieldName: 'Id' },
                            { label: 'caseNumber', fieldName: 'CaseNumber' }
                        ];
    }

    handleUserSelectEvent(event) {
        this.chosenUserValue = event.detail.userId;
    }

    handleCaseStatusChange(event) {
        this.chosenStatusValue = event.target.value;
    }

    handleDateFieldChange(event) {
        this.chosenDateValue = event.target.value;
        console.log('date value is '+ this.chosenDateValue);
    }

    get caseStatusOptions() {
        return [
            { label: 'New', value: 'New'},
            { label: 'Working', value: 'Working'},
            { label: 'Escalated', value: 'Escalated'},
            { label: 'Closed', value: 'Closed'}
        ];
    }

    get isUserVisible() {
        return this.type === 'User' || this.type === 'Status-User-CreatedDate';
    }

    get isStatusVisible() {
        return this.type === 'Status' || this.type === 'Status-User-CreatedDate';
    }

    get isCreatedDateVisible() {
        return this.type === 'CreatedDate' || this.type === 'Status-User-CreatedDate';
    }

    searchClicked(event) {
        this.template.querySelector('c-lwc-generic-search').searchRecords();
    }
}