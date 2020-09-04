import { LightningElement } from 'lwc';

export default class LookupHolderCmp extends LightningElement {
    selectedRecordId1; //store the record id of the selected 
    selectedRecordId2; //store the record id of the selected 
    selectedRecordId3; //store the record id of the selected 
    draggedCompName;
    draggedValue;
    droppedCompName;
    handleValueSelcted(event) {
        let compList = this.template.querySelectorAll('c-custom-lookup');
        let val = event.detail.id;
        let target = this.template.querySelector(`[data-id="${val}"]`).dataset.id;
        if(val == 'comp1') {
            this.selectedRecordId1 = event.detail.value;
        } else if(val == 'comp2') {
            this.selectedRecordId2 = event.detail.value;
        } else if(val == 'comp3') {
            this.selectedRecordId3 = event.detail.value;
        } 
    }

    validateLookupField() {
        this.template.querySelector('c-custom-lookup')[0].isValid();
    }

    handleClick(event) {
        this.template.querySelector('c-custom-lookup')[0].setCaseId('5004K0000029nURQAY');
    }

    handleItemDrag(event) {
        this.draggedCompName = event.detail.id;
        this.draggedValue = event.detail.value;
    }

    handleDrop(event) {
        let val = event.detail.id;
        alert(val);
        let compRef = this.template.querySelector(`[data-id="${val}"]`);
        alert(compRef);
        if(val == 'comp1') {
            this.selectedRecordId1 = this.draggedValue;
        } else if(val == 'comp2') {
            this.selectedRecordId2 = this.draggedValue;
        } else if(val == 'comp3') {
            this.selectedRecordId3 = this.draggedValue;
        } 
        compRef.setCaseId(this.draggedValue);
    }
}