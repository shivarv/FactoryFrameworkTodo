import { LightningElement, api, track } from 'lwc';

export default class CaseContainerTabPanel extends LightningElement {

    @api content;
    lookupOptionValue = 'CreatedDate';
    userSelectedCaseId;
    @track isSearchMode = true;
    @api draggedCaseId;
    @api componentId;
    
    get options() {
        return [
            { label: 'CreatedDate', value: 'CreatedDate' },
            { label: 'Status', value: 'Status' },
            { label: 'Status-User-CreatedDate', value: 'Status-User-CreatedDate' },
            { label: 'User', value: 'User' },
        ];
    }


    handleChange(event) {
        this.lookupOptionValue = event.target.value;
        this.isSearchMode = true;
    }

    handleRecordSelected(event) {
        this.userSelectedCaseId = event.detail.recordId;
        this.isSearchMode = false;
    }


    handleItemDragStart(event) {

    }
}