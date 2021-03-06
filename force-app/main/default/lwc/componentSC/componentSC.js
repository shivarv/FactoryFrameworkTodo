/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import executeApex from '@salesforce/apex/IServiceController.process';

    const callApexWithCallbackMethod = function(componentRef, inputDataObject, className, callback) {
        console.log(' callApexWithCallbackMethod method ');
        let inputDataValue = !inputDataObject || JSON.stringify(inputDataObject) === '{}'?
                                     '""' : JSON.stringify(inputDataObject);

        let requestParameters = {inputData: inputDataValue, className : className};
        let inputData = JSON.stringify(requestParameters); 
        executeApex({inputData: inputData}).then(result => {
            console.log(" result " +result);
            let resultObj = JSON.parse(result);
            console.log(" resultObj " +JSON.stringify(resultObj));
            let outputDataObj  = !resultObj || !resultObj.outputData ? '""': 
                                                JSON.parse(resultObj.outputData);
            if(resultObj.isError === true) {
                showToastHelper(componentRef, 'error', 'Callback error ' + resultObj.errorMessages
                     , [], 'error', 'dismissable' );
            }
            if(callback) {
                callback.call(componentRef, outputDataObj, resultObj.isError);
            }
        })
        .catch(error => {
            console.log(error);
            showToastHelper(componentRef, 
                            'error', 'error in retrieving '+error ,
                            [], 'error', 'dismissable' );
        })
    }
    const callApexMethod = function(inputParam, className) {
        console.log(' call apex method ');
        let inputDataValue = !inputParam || JSON.stringify(inputParam) === '{}'? '""' : JSON.stringify(inputParam);
        let requestParameters = {inputData: inputDataValue, className : className};
        let inputData = JSON.stringify(requestParameters); 
        return  executeApex({inputData: inputData});
    } 

    // sample
    //showToastHelper('sucess', 'record is saved' , [], 'success', 'dismissable' )
    const showToastHelper = function(componentRef, title, message, messageData, variant, mode) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        componentRef.dispatchEvent(toastEvent);

    }

export { callApexMethod, callApexWithCallbackMethod, showToastHelper};