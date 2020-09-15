/* eslint-disable no-unused-vars */
/* eslint-disable @lwc/lwc/no-api-reassignments */
import { LightningElement, api } from 'lwc';

export default class CustomLookup extends LightningElement {
    @api childObjectApiName = 'Case'; //Contact is the default value
    @api targetFieldApiName = 'case__c'; //AccountId is the default value
    @api fieldLabel = 'Your field label here';
    @api disabled = false;
    @api value;
    @api required = false;

    @api componentReferId;

    handleChange(event) {
        // Creates the event
        this.value = String(event.detail.value);
        this.fireEvent(this.value);
    }

    fireEvent(value) {
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
       // this.template.querySelector('lightning-input-field').val
        this.value = String(val);
        this.fireEvent(val);
    }


    handleItemDragStart(ev) {
        const event = new CustomEvent('itemdrag', {
            detail:  {id: this.componentReferId, value: String(this.value)},
            bubbles: true, composed: true
        });
        this.dispatchEvent(event);
    }

    handleDrop(ev) {
        const event = new CustomEvent('itemdrop', {
            detail:  {id: this.componentReferId, value: String(this.value)}
        });
        this.dispatchEvent(event);
    }

    handeDragOver(ev) {
        ev.preventDefault();
    }


}