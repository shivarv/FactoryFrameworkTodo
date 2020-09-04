import { LightningElement, track} from 'lwc';

export default class TodoCreateTask extends LightningElement {

    @track textValue;


    handleTextChange(event) {
        this.textValue = event.target.value;
    }
    createTask() {
        alert(this.textValue);
    }
}