public with sharing class LWCGenericSearch {

    public class GenericSearchParameter {
        @AuraEnabled
        public string objectName{get; set;}
        @AuraEnabled
        public string fieldNames{get; set;}
        @AuraEnabled
        public string whereCondition{get; set;}
        @AuraEnabled
        public string sortBy{get; set;}
        @AuraEnabled
        public boolean sortAsc{get; set;}
        @AuraEnabled
        public string limitRecords{get; set;}
    }

    @AuraEnabled
    public static List<sObject> getGenericRecordsList(GenericSearchParameter searchParam)
    {
        System.debug(' searchParam '+searchParam);
        String simpleQuery = 'select {0} FROM {1}';
        String conditionalQuery = 'select {0} FROM {1} WHERE {2}';  
        String executeQuery = '';
        try {
        if(string.isNotBlank(searchParam.whereCondition)){
            executeQuery = String.format(conditionalQuery, new List<Object>
                                    {   searchParam.fieldNames, searchParam.objectName, 
                                        searchParam.whereCondition
                                    });
        } else {
           executeQuery = String.format(simpleQuery, new List<Object> 
                                        {searchParam.fieldNames, searchParam.objectName});
        }
        if(String.isNotBlank(searchParam.limitRecords)) {
                executeQuery += ' LIMIT ' + searchParam.limitRecords;
        }
        if(String.isBlank(searchParam.sortBy)) {
            searchParam.sortBy = 'Id';
        }
        if(String.isNotBlank(searchParam.sortBy)) {
            executeQuery += ' ORDER BY ' + searchParam.sortBy + ' '+
                            (!searchParam.sortAsc ? ' ASC ' : ' DESC ');
        }
        } catch(Exception e) {
            System.debug(' exception e '+ e.getMessage());
            System.debug(' exception e '+ e.getCause());
            System.debug(' exception e '+ e.getStackTraceString());
            System.debug(' exception e '+ e.getLineNumber());
        }
        //executeQuery += ' WITH SECURITY_ENFORCED';
        system.debug('executeQuery: ' + executeQuery);
        return (List<sObject>) Database.query(executeQuery);
    }

}
