import { LightningElement, api, wire } from "lwc";
import getAccount from "@salesforce/apex/EventSubscriberController.getAccount";
import { subscribe } from "lightning/empApi";
import { refreshApex } from "@salesforce/apex";

export default class WiredApexRecordComponent extends LightningElement {
  @api recordId;
  @api objectApiName;
  @api autoRefresh = false;

  @wire(getAccount, { recordId: "$recordId" })
  record;

  handleRecordUpdate(event) {
    console.log("Update registered. Executing custom refreshApex.");
    refreshApex(this.record);
  }

  get recordName() {
    return this.getFieldValue(this.record.data, "Name");
  }

  get recordStreet() {
    return this.getFieldValue(this.record.data, "BillingStreet");
  }

  get recordCity() {
    return this.getFieldValue(this.record.data, "BillingCity");
  }

  get cardTitle() {
    return `Wired Apex Account (Auto-Refresh: ${this.autoRefresh})`;
  }

  getFieldValue(record, fieldName) {
    if (record === undefined) {
      return undefined;
    }
    return record[fieldName];
  }
}
