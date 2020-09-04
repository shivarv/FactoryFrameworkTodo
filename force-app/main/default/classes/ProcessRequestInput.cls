public class ProcessRequestInput  {
    
    public String inputData; //input data must be sent as serialised from js
    public String className; // class name that implements Iservice interface
    
    public ProcessRequestInput() {
        this.inputData = '';
        this.className  = '';
    }

    public ProcessRequestInput(String inputData, String className) {
        this.inputData  = inputData;
        this.className  = className;
    }

}