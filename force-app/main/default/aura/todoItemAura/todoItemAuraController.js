({
    onchangeCheckBox: function(component, event, helper) {
        console.log('in onchangeCheckBox method');
        let userCheckedVal = event.target.checked;
        let task = component.get('v.todoItem');
        console.log(userCheckedVal);
        console.log(JSON.stringify(task));
        helper.dispatchCheckEventHelper(component, task['taskId'], userCheckedVal);
    },

   

})