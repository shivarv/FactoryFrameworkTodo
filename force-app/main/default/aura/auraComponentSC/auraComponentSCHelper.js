({
    //showToastHelper('sucess', 'record is saved' , [], 'success', 'dismissable' )
    showToast : function(component, title, message, messageTemplateData, type, mode) {
        var toastEvent = $A.get("e.force:showToast");
        if(!toastEvent) {
            return;
        }
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type": type,
            "mode": mode
        });
        toastEvent.fire();
    },

    callApex : function(component, inputDataObject, className, callback) {
        var action;
        let helper = this;
        let requestParameters;
        let inputData;
        if(!component || (!className)) {
            return;
        }
        action = component.get("c.process");
        requestParameters = {inputData: inputDataObject, className : className};
        inputData = JSON.stringify(requestParameters); 
        action.setParams({ "inputData" : inputData });
        action.setCallback(this, function(result) {
            var state = result.getState();
            if (state === "SUCCESS") {
                let resultString = result.getReturnValue();
                let resultObj;
                let outputDataObj;
                resultObj = JSON.parse(resultString);
                if(resultObj.isError) {
                    helper.showToast('error', 'Error in apex call ' +response.getError(),
                                            [], 'error', 'dismissable');
                }
                outputDataObj  = JSON.parse(resultObj.outputData);
                if(callback) {
                    callback(component, outputDataObj, resultObj.isError);
                }
            }
            else if (state === "INCOMPLETE") {
                helper.showToast('error', 'Error in apex call ' +response.getError(),
                                     [], 'error', 'dismissable');
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
                helper.showToast('error', 'Error in apex call ' +errors,
                                     [], 'error', 'dismissable');
            }
        });
        $A.enqueueAction(action);
    }
})
