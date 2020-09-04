({
    fetchTasksSuccessHelper: function(component, result) {
        console.log(' in fetchTasksSuccess ');
        let arrayItemList = [];  
        let resultObj = JSON.parse(result);
        for(let i in resultObj) {
            console.log(i + ' ' +resultObj[i]);
            arrayItemList.push(
                            {
                                'itemNo': (parseInt(i) + 1),
                                'itemDetails': resultObj[i].taskDetail,
                                'taskId': resultObj[i].taskId,
                                'isCompleted': resultObj[i].isCompleted
                            });
        }
        console.log(JSON.stringify(arrayItemList));
        component.set('v.todoItemList', arrayItemList);
    },

    responseHandlerHelper: function(component, responseObj, isError) {
        console.log(' in response handler '+ JSON.stringify(responseObj));
        let arrayItemList = [];  
        if(isError) {
            return;
        }
        for(let i in responseObj ) {
            console.log(i + ' ' +JSON.stringify(responseObj[i]));
            arrayItemList.push({'itemNo': (parseInt(i) + 1),
                            'itemDetails': responseObj[i].taskDetail,
                            'taskId': responseObj[i].taskId,
                            'isCompleted': responseObj[i].isCompleted});
        }
        console.log(JSON.stringify(arrayItemList));
        component.set('v.todoItemList', arrayItemList);
        component.set('v.showSpinner', false);
    },

    fetchAllTasksForTodayHelper: function(component) {
        console.log('in fetchAllTasksForToday method framework');  
        let helper = this;
        let arrayItemList = [];  
        let parentThis = this;
        component.set('v.showSpinner', true);
        helper.callApex(component, '', 'TodoGetTasks', helper.responseHandlerHelper);
    },

    saveChanges: function(component) {
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
    },

    showToast: function(component) {
        const event = new ShowToastEvent({
            title: 'Successfull',
            variant: 'success',
            message: this.label.TaskToastMessageLabel
        });
        this.dispatchEvent(event);
    },

    oncheckselectedMethod: function(component, event) {
        console.log(' in oncheckselectedMethod');
        const taskId = event.detail.taskId;
        const isCompleted = event.detail.isCompleted
        let selectedTodoItem = this.todoItemList.find(task => task.taskId === taskId);
        console.log(JSON.stringify(selectedTodoItem));
        selectedTodoItem.isCompleted = isCompleted;
        console.log('isCompleted '+isCompleted +' '+selectedTodoItem.isCompleted);
        console.log(JSON.stringify(this.todoItemList));

    }

})