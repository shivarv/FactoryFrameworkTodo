public with sharing class TodoGetTasks implements IService{
    public static void execute(ProcessRequestInput input, ProcessRequestOutput output) {
        List<Map<String, Object>> returnData = getTasks();
        System.debug(JSON.serialize(returnData));
        output.outputData = JSON.serialize(returnData);
    }

    private static List<Map<String, Object>>  getTasks() {
        List<Map<String, Object>> returnData = new  List<Map<String, Object>>();
        Map<Id, todo_Answer__c> taskIdAnsMap = new Map<Id, todo_Answer__c>();
        List<todo_Answer__c> ansList = [SELECT id, is_Completed__c, todo_Task__c FROM todo_Answer__c 
                                        WHERE createddate = TODAY];
        taskIdAnsMap = TodoReusableApex.generateTaskIdQuestionMap(ansList);
        List<todo_Task__c> tasksList = [
                SELECT id, task_details__c FROM todo_Task__c LIMIT 5
            ];
        if(tasksList == null || tasksList.isEmpty()) {
            return null;
        }
        for(todo_Task__c indTask: tasksList) {
            boolean choice = (indTask != null && taskIdAnsMap.containsKey(indTask.id)
                                && taskIdAnsMap.get(indTask.id).is_Completed__c != null)
                                ? taskIdAnsMap.get(indTask.id).is_Completed__c: false;
            Map<String, Object> recordMap = new Map<String, Object>();
            recordMap.put('taskDetail', indTask.task_details__c);
            recordMap.put('taskId', indTask.id);
            recordMap.put('isCompleted', choice);
            returnData.add(recordMap);
        }
        return returnData;
    }
}