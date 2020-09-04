public class ProcessRequestInput  {
    
    public String inputData; //input data must be sent as serialised from js
    public String className; // class name that implements Iservice interface
    public Map<String, Object> inputDataMap;

    public ProcessRequestInput() {
        this.inputData = '';
        this.className  = '';
        this.inputDataMap = new Map<String, Object>();
    }

    public ProcessRequestInput(String inputData, String className, Map<String, Object> inputDataMap) {
        this.inputData  = inputData;
        this.className  = className;
        this.inputDataMap = inputDataMap;
    }

}