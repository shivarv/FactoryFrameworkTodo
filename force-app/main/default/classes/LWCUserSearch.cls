public with sharing class LWCUserSearch {
    

    @AuraEnabled
    public static List<List<String>> getAllUsers(){
        List<List<String>> outputData = new List<List<String>>();
        List<User> usersList = [select id, firstname, lastname from user where isActive = true];
        for(User indUser: usersList) {
            outputData.add( new List<String>{indUser.Id, indUser.firstName + '-' +indUser.lastName});
        }
        return outputData;
    }
}