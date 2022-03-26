import { LightningElement, api, wire } from "lwc";
import getAccount from "@salesforce/apex/EventSubscriberController.getAccount";

export default class WiredApexRecordComponent extends LightningElement {
  @api recordId;
  @api objectApiName;

  @wire(getAccount, { recordId: "$recordId" })
  record;

  get recordName() {
    return this.getFieldValue(this.record.data, "Name");
  }

  get recordStreet() {
    return this.getFieldValue(this.record.data, "BillingStreet");
  }

  get recordCity() {
    return this.getFieldValue(this.record.data, "BillingCity");
  }

  getFieldValue(record, fieldName) {
    if (record === undefined) {
      return undefined;
    }
    return record[fieldName];
  }
}
