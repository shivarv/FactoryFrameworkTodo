import { LightningElement, api } from 'lwc';

export default class CaseContainerTabPanel extends LightningElement {

    @api content;
    lookupOptionValue = 'CreatedDate';

    get options() {
        return [

            { label: 'CreatedDate', value: 'CreatedDate' },
            { label: 'Status', value: 'Status' },
            { label: 'Status-User-CreatedDate', value: 'Status-User-CreatedDate' },
            { label: 'User', value: 'User' },
        ];
    }


    handleChange(event) {
        this.lookupOptionValue = event.target.value;
    }

}