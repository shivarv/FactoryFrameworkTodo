public with sharing class TodoCreateTask implements IService{
    public static void execute(ProcessRequestInput input, ProcessRequestOutput output) {
        createTask((String) input.inputDataMap.get('taskDetail'));
    }

    public static void createTask(String taskDetail) {
        Todo_Task__c newTask = new Todo_Task__c(task_details__c = taskDetail);
        insert newTask;
    }

}
