import { LightningElement, track } from 'lwc';

export default class CasePaneList extends LightningElement {
    @track caseIdList;
    @track recordName;
    targetApiName='case__c';
    required = true;
    @track draggedCaseId;
    @track draggedComponentId;
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
        this.caseIdList.push({key: 'case'+this.caseIdList.length, value: String(caseId)});
    }

    handleItemDragStart(event) {
        this.draggedCaseId = event.detail.value;
        console.log(' in handleItemDragStart method '+ this.draggedCaseId);
    }

    handeItemDragOver(ev) {
        ev.preventDefault();
    }

}