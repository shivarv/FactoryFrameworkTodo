import { LightningElement, api} from 'lwc';
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority'; 
import CASENUMBER_FIELD from '@salesforce/schema/Case.CaseNumber';
import CASECUST_FIELD from '@salesforce/schema/Case.case__c';
import STATUS_FIELD from '@salesforce/schema/Case.Status'; 
import SUBJECT_FIELD from '@salesforce/schema/Case.Subject';
export default class CasePanelItem extends LightningElement {
    //@api recordId = '5004K0000029nUHQAY';
    isRenderedValue = false;
    @api recordId;
    @api objectApiName = 'Case';
    @api  componentReferenceId;
    fields = [PRIORITY_FIELD, CASENUMBER_FIELD, CASECUST_FIELD, 
        STATUS_FIELD, SUBJECT_FIELD];
  
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

    renderedCallback() {
        alert(' in rendered callback');
        debugger;
        if(this.isRenderedValue === true) {
            return;
        }
        this.isRenderedValue = true;
        let val = '5004K0000029nUHQAY';
        let cSearchTemplete = this.template.querySelector('c-custom-lookup');
        console.log(' rendered callback ' + cSearchTemplete);
        cSearchTemplete.setCaseId(val);
            
    }
}