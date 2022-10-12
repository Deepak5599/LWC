import { LightningElement,wire,track,api } from 'lwc';
import { getSObjectValue } from '@salesforce/apex';
import getAllObjects from '@salesforce/apex/AssingmentController.getAllObjects';
import getAllFields from '@salesforce/apex/AssingmentController.getAllFields';
import getDb from '@salesforce/apex/AssingmentController.getDb';

export default class AssingmentLWC extends LightningElement {
 @track objects;  
 @track value='';

connectedCallback(){
    getAllObjects({})
    .then(result=>{
        this.objects=result
    })
    .catch(error=>{
        console.log('error');
    }); 
}
@track fields='';
handleChange(event) {

    this.value = event.detail.value;
    getAllFields({
        objectName: this.value
    })
    .then(result=>{
        this.fields=result;
    })
    .catch(error=>{
        console.log('error');
    }); 

}
@track query =[];
//@track stringQuery='SELECT ';
@api stringQuery='';
changeMethod(event){
    
    this.query=event.detail.value;
    this.stringQuery='SELECT ';
    this.stringQuery+=this.query;
    this.stringQuery+=' FROM '+this.value;

}
@track getData='';
@track things=[];

handleClick(){
    getDb({
        queryi: this.stringQuery
    })
    .then(result =>{
        console.log('the data coming'+result);
        this.getData=result;
        this.things=[];
        for(let i=0;i<this.query.length;i++){
            this.things.push({
                label: this.query[i],
                fieldName: this.query[i], //type:'text'
            })
        }

    })
    .catch(error =>{
        console.log('error');
    });
}

   
    
}