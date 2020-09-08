import { LightningElement, track } from 'lwc';

export default class CasePaneList extends LightningElement {
    @track caseIdList;
    @track recordName;
    targetApiName='case__c';
    required = true;

    selectedRecordId1;
    constructor() {
        super();
        this.caseIdList = [];
        this.recordName = 'Case';
    }

    handleValueSelected(event) {
        let caseId = event.detail.value;
        if(this.caseIdList.length > 2) {
            return;
        }
        this.caseIdList.push({key: this.caseIdList.length, value: String(caseId)});
    }

    handleItemDrag(event) {

    }

    handleDrop(event) {
        
    }

}