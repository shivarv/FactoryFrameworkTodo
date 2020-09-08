public with sharing class searchCase {
    @AuraEnabled(Cacheable = true)
    public static list<Case> retrieveCases(String strCaseNum) {
        strCaseNum = '%' + String.escapeSingleQuotes(strCaseNum) + '%';
        list<Case> lstCases = [SELECT  Id, case__c, caseNumber, createddate, Type 
                        From Case WHERE caseNumber LIKE :strCaseNum];

        if(lstCases.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return lstCases; 
    }
}