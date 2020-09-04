import { LightningElement, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import FontAwesome from '@salesforce/resourceUrl/fontawesome';

export default class TodoItem extends LightningElement {

    @api todoItem;
    constructor() {
        super();
        console.log(' in constructor todoItem ');
        console.log('todoItem '+ JSON.stringify(this.todoItem));
    }

    renderedCallback() {
        Promise.all([
            loadStyle(this, FontAwesome + '/fontawesome/css/all.css')
        ]);
    }

    onchangeCheckBox(event) {
        console.log('in onchangeCheckBox method');
        let userCheckedVal = event.target.checked;
        console.log(userCheckedVal);
        console.log(JSON.stringify(this.todoItem));
        //this.todoItem['isCompleted'] = checkval;
        this.dispatchCheckEvent(this.todoItem['taskId'], userCheckedVal);
    }

    dispatchCheckEvent(taskId, isCompleted) {
        console.log('in dispatchCheckEvent method ');
        const selectedEvent = new CustomEvent('checkselected', { detail: 
            {taskId: taskId, isCompleted: isCompleted}
        });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    
}