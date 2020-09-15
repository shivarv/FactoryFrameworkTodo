import { LightningElement, api, track } from 'lwc';

import selectorList from '@salesforce/apex/LWCGenericSearch.getGenericRecordsList';

export default class LwcGenericSearch extends LightningElement {
    data;
    @api columns;

  //  @api whereFieldName;
 //   @api whereCondition;
//    @api whereFieldValue;
    @api fieldNames;
    @api objectName;

    @api type;
    @api createdDate;
    @api userId;
    @api status;

    selectedRecordId;

    @api
    searchRecords() {
        this.getRecordsFromBackend();
    }

    getRecordsFromBackend() {
        let that = this;
        console.log('  fieldNames ' +this.fieldNames +
            ' objectName ' + this.objectName +
            ' createdDate '+ this.createdDate +
            ' userId '+ this.userId +
            ' status '+ this.status +
            ' selectedRecordId ' + this.selectedRecordId
        );

        selectorList(
            {searchParam: {
                objectName: 'Case',
                fieldNames: 'Id, caseNumber',
                whereCondition: this.getWhereCondition(),
            }})
            .then(result => {
                that.data = [];
                for(let i in result) {
                    let tempRecord = Object.assign({}, result[i]); //cloning object  
                    tempRecord.recordLink = "/" + tempRecord.Id;  
                    that.data.push(tempRecord); 
                }
                console.log(' in user result op : ');
                console.log(JSON.stringify(result));
            })
            .catch(error => {
               
                // eslint-disable-next-line no-alert
                alert(JSON.stringify(error));
            });
    
    }
    
    getWhereCondition() {
        let whereCondition = '';
        if(this.type === 'User') {
            whereCondition = 'ownerId = \'' +this.userId+'\'';
        }  else if(this.type === 'CreatedDate') {
            whereCondition = 'createdDate >= '+ this.createdDate+'T00:00:00Z';
        } else if(this.type === 'Status') {
            whereCondition = 'status = \''+this.status+'\'';
        } else if(this.type === 'Status-User-CreatedDate') {
            whereCondition = ('createdDate >='+ this.createdDate +'T00:00:00Z'+ ' AND '+
                                'status = \''+this.status+'\'' + ' AND '+
                                'ownerId = \'' +this.userId+'\'');

        } else {
        }
        return whereCondition;
    }


    handleRowSelection(event) {
        const selectedRows = event.detail.selectedRows;
        this.fireEvent(selectedRows[0].Id);
    
    }

    handleRowAction(event) {
        console.log(JSON.stringify(event.detail.action));
       
    }

    fireEvent(value) {
        const recordSelectedEvent = new CustomEvent('recordselected', {
            detail: {recordId: value},
                bubbles: true, composed: true
            }
        );
        //dispatching the custom event
        this.dispatchEvent(recordSelectedEvent);
    }
}