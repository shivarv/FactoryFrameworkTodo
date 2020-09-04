public with sharing class ProcessRequestOutput {
    
    public String outputData; //output data must be sent as serialised string
    public Boolean isError; // class name that implements Iservice interface
    public List<String> errorMessages;
    public ProcessRequestOutput() {
        this.outputData = '""';
        this.isError  = false;
        this.errorMessages = new List<String>();
    }

    public ProcessRequestOutput(String outputData, Boolean isError, List<String> errorMessages) {
        this.outputData  = outputData;
        this.isError  = isError;
        this.errorMessages = errorMessages;
    }
}