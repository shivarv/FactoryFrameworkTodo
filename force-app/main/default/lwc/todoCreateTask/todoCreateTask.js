import { LightningElement, track} from 'lwc';
import { callApexMethod, callApexWithCallbackMethod, showToastHelper } from 'c/componentSC';

export default class TodoCreateTask extends LightningElement {

    textValue;
    showSpinner = false;

    handleTextChange(event) {
        this.textValue = event.target.value;
    }

    createTask() {
        alert(this.textValue);
        this.showSpinner = true;
        callApexWithCallbackMethod(this, {'taskDetail': this.textValue}, 'TodoCreateTask', 
                                this.responseHandler);
    }

    responseHandler(responseObj, isError) {
        if(isError) {
            return;
        }
        let textAreaRef = this.template.querySelector('lightning-textarea');
        textAreaRef.value = '';
        this.showSpinner = false;

    }

}