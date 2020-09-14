/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement, api, track } from 'lwc';
import selectorList from '@salesforce/apex/LWCGenericSearch.getGenericRecordsList';

const DELAY = 300;

export default class GenericLookup extends LightningElement {

    @api lookupSearchLabel;
    @track usersList
    @track searchKey;
    error;

    @track selectedUserId;

    constructor() {
        super();
        if(!this.searchKey) {
            this.searchKey = '';
        }
        this.searchApex();
    }

    searchApex() {
        let that = this;
        selectorList(
            {searchParam: {
                objectName: 'User',
                fieldNames: 'Id, FirstName, LastName',
                whereCondition: 'isActive = true AND FirstName like \'%'+ that.searchKey +'%\'',
            }})
            .then(result => {
                let usersList = [];
                // eslint-disable-next-line guard-for-in
                for(let i in result) {
                    usersList.push({key: i, id: result[i].Id, 
                                        value: result[i].FirstName + '-' + result[i].LastName });
                }
                that.usersList = usersList;
                console.log(' in user result op : ');
                console.log(JSON.stringify(result));
            })
            .catch(error => {
                that.error = error;
                // eslint-disable-next-line no-alert
                alert(JSON.stringify(error));
            });
    }

    handleKeyChange(event) {
        let that = this;
        // Debouncing this method: Do not update the reactive property as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.delayTimeout = setTimeout(() => {
            that.searchKey = searchKey;
            that.toggleDiv();
            that.searchApex();
        }, DELAY);
    }

    toggleDiv() {
        const dataIdToClose = 'userList';
        this.template.querySelector(`div[data-id="${dataIdToClose}"]`).classList.toggle('slds-hide');
    }

    handleUserSelect(event) {
        this.selectedUserId = event.currentTarget.dataset.item;
        const itemVal = this.selectedUserId;
        this.toggleDiv();
        this.template.querySelector('input').value = this.usersList.find( function(ele) {
            return ele.id === itemVal;
        }).value; 
    }
}