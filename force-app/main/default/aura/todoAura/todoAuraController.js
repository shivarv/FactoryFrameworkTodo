({
    doInit : function(component, event, helper) {
        component.set('v.showSpinner', false);
        helper.fetchAllTasksForTodayHelper(component);

    }   

})