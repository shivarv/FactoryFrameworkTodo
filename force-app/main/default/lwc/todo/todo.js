import { LightningElement, api, track } from 'lwc';
import TodoList from '@salesforce/resourceUrl/todolist';
import getTaskApexMethod from '@salesforce/apex/TodoApex.getTasks';
import submitTaskDoneApexMethod from '@salesforce/apex/TodoApex.submitTaskDone';
import TaskToastMessageLabel from '@salesforce/label/c.TaskToastMessage';
import SaveButtonLabel from '@salesforce/label/c.SaveButton';

import { callApexMethod, callApexWithCallbackMethod, showToastHelper } from 'c/componentSC';

export default class Todo extends LightningElement {

    @track todoItemList;
    error;

    label = {
        TaskToastMessageLabel,
        SaveButtonLabel
    };
    showSpinner;
    imgUrl = TodoList +'/todolist/bg.png';

    constructor() {
        super();
        console.log('in constructor todo method ');      
        this.todoItemList = [];
        this.error = 'sample ';
        this.showSpinner = false;
        this.fetchAllTasksForToday();
    }

    fetchTasksSuccess(result) {
        console.log(' in fetchTasksSuccess ');
        let arrayItemList = [];  
        let resultObj = JSON.parse(result);
        for(let i in resultObj) {
            console.log(i + ' ' +resultObj[i]);
            arrayItemList.push({'itemNo': (parseInt(i) + 1),
                             'itemDetails': resultObj[i].taskDetail,
                             'taskId': resultObj[i].taskId,
                             'isCompleted': resultObj[i].isCompleted});
        }
        console.log(JSON.stringify(arrayItemList));
        this.todoItemList = arrayItemList;
    }

    responseHandler(responseObj, isError) {
        console.log(' in response handler '+ JSON.stringify(responseObj));
        if(isError) {
            return;
        }
        let arrayItemList = [];  
        for(let i in responseObj ) {
            console.log(i + ' ' +JSON.stringify(responseObj[i]));
            arrayItemList.push({'itemNo': (parseInt(i) + 1),
                            'itemDetails': responseObj[i].taskDetail,
                            'taskId': responseObj[i].taskId,
                            'isCompleted': responseObj[i].isCompleted});
        }
        console.log(JSON.stringify(arrayItemList));
        this.todoItemList = arrayItemList;
        this.showSpinner = false;
    }

    fetchAllTasksForToday() {
        console.log('in fetchAllTasksForToday method framework');  
        let arrayItemList = [];  
        let parentThis = this;
        this.showSpinner = true;
        callApexWithCallbackMethod(this, '', 'TodoGetTasks', this.responseHandler);
        /*
        callApexMethod('', 'TodoGetTasks').then(result => {
            console.log(result);
            let resultObj = JSON.parse(result);
            let outputDataObj  = JSON.parse(resultObj.outputData);
            for(let i in outputDataObj ) {
               console.log(i + ' ' +JSON.stringify(outputDataObj[i]));
               arrayItemList.push({'itemNo': (parseInt(i) + 1),
                                'itemDetails': outputDataObj[i].taskDetail,
                                'taskId': outputDataObj[i].taskId,
                                'isCompleted': outputDataObj[i].isCompleted});
            }
            console.log(JSON.stringify(arrayItemList));
            parentThis.todoItemList = arrayItemList;
        })
        .catch(error => {
            this.error = error;
        }); */
    }

    saveChanges() {
        console.log('in save changes method ');
        console.log(JSON.stringify(this.todoItemList));
        let inputParamString = JSON.stringify(this.todoItemList);
        let parent = this;
        submitTaskDoneApexMethod({inputString: inputParamString})
        .then(result => {
            console.log('result is successful');
            parent.showToast();
        })
        .catch(error => {
            console.log('error '+JSON.stringify(error));
            this.error = error;
        });
    }

    oncheckselectedMethod(event) {
        console.log(' in oncheckselectedMethod');
        const taskId = event.detail.taskId;
        const isCompleted = event.detail.isCompleted
        let selectedTodoItem = this.todoItemList.find(task => task.taskId === taskId);
        console.log(JSON.stringify(selectedTodoItem));
        selectedTodoItem.isCompleted = isCompleted;
        console.log('isCompleted '+isCompleted +' '+selectedTodoItem.isCompleted);
        console.log(JSON.stringify(this.todoItemList));

    }

    get cusstyle() {
        return 'background-image:'+this.imgUrl;
    }

}