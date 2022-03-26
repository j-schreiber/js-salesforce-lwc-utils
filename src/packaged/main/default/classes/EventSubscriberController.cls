public class EventSubscriberController {
    @AuraEnabled(cacheable=true)
    public static Account getAccount(String recordId) {
        return [SELECT Id, Name, BillingStreet, BillingCity FROM Account WHERE Id = :recordId];
    }
}
