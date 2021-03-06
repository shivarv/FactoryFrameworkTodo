public with sharing class TodoSubmitTasks implements IService{
        
    public static void execute(ProcessRequestInput input, ProcessRequestOutput output) {
        if(input == null || String.isBlank(input.inputData)) {
            return;
        }
        submitTaskDone(input.inputData, output);
    }
   
    private static void submitTaskDone(String inputString, ProcessRequestOutput output) {
        List<todo_Answer__c> ansList = [SELECT id, is_Completed__c, todo_Task__c FROM todo_Answer__c 
                                        WHERE createddate = TODAY];
        boolean isAnyUpdated = false;
        List<Object> inputDeserialised = (List<Object>) JSON.deserializeUntyped(inputString);
        System.debug(inputDeserialised);
        Map<String, Boolean> taskIdBooleanMap = new  Map<String, Boolean>();
        Map<Id, todo_Answer__c> taskIdAnsMap = generateTaskIdQuestionMap(ansList);
        System.debug('initial map '+taskIdAnsMap.size());
        addFillerAnswersToMap(taskIdAnsMap);
        System.debug('after filler map '+taskIdAnsMap.size());
        for(Object indRecord: inputDeserialised) {
            System.debug('in input loop '+indRecord);
            Map<String, Object> objectMap = (Map<String, Object>)(indRecord);
            if(objectMap.isEmpty() || objectMap.get('taskId') == null ||  objectMap.get('isCompleted') == null) {
                continue;
            }
            todo_Answer__c ansRec = taskIdAnsMap.get((Id)objectMap.get('taskId'));
            boolean newBooleanValue = (Boolean) objectMap.get('isCompleted');
            System.debug('after loop continue '+newBooleanValue + ' ans record: '+ansRec);

            if(ansRec.is_Completed__c != newBooleanValue || String.isBlank(ansRec.Id)) {
                ansRec.is_Completed__c = newBooleanValue;
                isAnyUpdated = true;
            }
        }
        if(isAnyUpdated) {
            upsert taskIdAnsMap.values();
        }
    }

    private static void addFillerAnswersToMap(Map<Id, todo_Answer__c> taskIdAnsMap) {
        List<todo_Task__c> tasksList = [
                SELECT id, task_details__c FROM todo_Task__c LIMIT 5
        ];
        if(tasksList == null || tasksList.isEmpty()) {
            return;
        }
        for(todo_Task__c indTask: tasksList) {
            if(indTask == null || taskIdAnsMap.containsKey(indTask.Id)) {
                continue;
            }
            taskIdAnsMap.put(indTask.Id, generateAnswerRecord(indTask.Id));
        }
    }

    private static todo_Answer__c generateAnswerRecord(Id taskId) {
        todo_Answer__c record = new todo_Answer__c(is_Completed__c = false, todo_Task__c = taskId);
        return record;
    }

    private static Map<Id, todo_Answer__c> generateTaskIdQuestionMap(List<todo_Answer__c> ansList) {
        Map<Id, todo_Answer__c> ansRecordMap = new Map<Id, todo_Answer__c>();
        if(ansList == null || ansList.isEmpty()) {
            return ansRecordMap;
        }
        for(todo_Answer__c indAns: ansList) {
            if(indAns == null || indAns.todo_Task__c == null) {
                continue;
            }
            ansRecordMap.put(indAns.todo_Task__c, indAns);
        }
        return ansRecordMap;
    }

}