public class IServiceController {

    @AuraEnabled
    public static String process(String inputData) {
        String className;
        Type classTypeInst;
        System.debug(inputData);
        ProcessRequestInput input = (ProcessRequestInput) JSON.deserialize(inputData, ProcessRequestInput.class);
        ProcessRequestOutput output = new ProcessRequestOutput();
        IService service;
        System.debug('input '+ input);
        try {
            className = input.className;
            System.debug(' input.inputData '+ input.inputData + ' '+ (input.inputData != null) + ' ' 
            + !String.isBlank(input.inputData)
            );
            if(input.inputData == '""') {
                input.inputData = '';
            }
            if(input.inputData != null &&  !String.isBlank(input.inputData)) {
                System.debug('before deserialise ');
                input.inputDataMap = (Map<String, Object>) JSON.deserializeUntyped(input.inputData);
            }
            classTypeInst = Type.forName(className);
            service = (IService) classTypeInst.newInstance();
            if(service != null) {
                service.execute(input, output);
            }
        } catch(Exception e) {
            System.debug(e.getCause());
            System.debug(e.getMessage());
            System.debug(e.getStackTraceString());
            output.outputData  = '';
            output.isError  = true;
            output.errorMessages = e.getMessage().split('\n');
        }
        return JSON.serialize(output);
    }
    
}