public with sharing class TodoReusableApex {
    

    public static Map<Id, todo_Answer__c> generateTaskIdQuestionMap(List<todo_Answer__c> ansList) {
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