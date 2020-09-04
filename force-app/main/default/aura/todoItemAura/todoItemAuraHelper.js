({
    dispatchCheckEventHelper : function(component, taskId, isCompleted) {
        console.log('in dispatchCheckEvent method ');
        var compEvent = component.getEvent("todoEvent");
        compEvent.setParams(
            {"taskId": taskId, "isCompleted": isCompleted}
        );
        compEvent.fire();
    },
})