import { LightningElement, api } from 'lwc';

export default class CaseContainerTab extends LightningElement {
    @api content;
    @api workspaceName;

    get tabId1() {
        return this.workspaceName + '-'+ 'panel1';
    }

    get tabId2() {
        return this.workspaceName + '-'+ 'panel2';
    }

    get tabId3() {
        return this.workspaceName + '-'+ 'panel3';
    }
}