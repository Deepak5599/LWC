public with sharing class AssingmentController {
    @AuraEnabled
    public static list<Wrapper> getAllObjects(){
        list<Schema.SObjectType> objList = Schema.getGlobalDescribe().values();
        List<Wrapper> objects = new List<Wrapper>();

        for(SObjectType sb : objList){
            Wrapper wp = new Wrapper();
            wp.value =sb.getDescribe().getName();
            wp.label = sb.getDescribe().getLabel();
            objects.add(wp);
        }
        return objects;
    }
    public class Wrapper{
        @AuraEnabled  public string value;
        @AuraEnabled  public string label;
    }
   @AuraEnabled
    public static List<FieldWrapper> getAllFields(string objectName){
        list<FieldWrapper> allFields = new List<FieldWrapper>();
        map<string,Schema.SObjectType> objMap = Schema.getGlobalDescribe();
        SObjectType objType = objMap.get(objectName);
        
        map<string,Schema.SObjectField> objField = objType.getDescribe().fields.getMap();
        for(String name: objField.keySet()){
            FieldWrapper fw = new FieldWrapper();
           fw.label = objField.get(name).getDescribe().getlabel();
            fw.value = objField.get(name).getDescribe().getName();
            allFields.add(fw);
        }
        return allFields;
        
    }
    public class FieldWrapper{
        @AuraEnabled public string label;
        @AuraEnabled public string value;
    }
    @AuraEnabled
    public static List<sObject> getDb(String queryi){
        return Database.query(queryi);
    }
    

}
