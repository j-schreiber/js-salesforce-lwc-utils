import { LightningElement, wire, api } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";

import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";
import ACCOUNT_BILLING_STREET_FIELD from "@salesforce/schema/Account.BillingStreet";
import ACCOUNT_BILLING_CITY_FIELD from "@salesforce/schema/Account.BillingCity";

const fields = [
  ACCOUNT_NAME_FIELD,
  ACCOUNT_BILLING_STREET_FIELD,
  ACCOUNT_BILLING_CITY_FIELD
];

export default class WiredRecordComponent extends LightningElement {
  @api recordId;
  @api objectApiName;

  @wire(getRecord, { recordId: "$recordId", fields })
  record;

  get recordName() {
    return getFieldValue(this.record.data, ACCOUNT_NAME_FIELD);
  }

  get recordStreet() {
    return getFieldValue(this.record.data, ACCOUNT_BILLING_STREET_FIELD);
  }

  get recordCity() {
    return getFieldValue(this.record.data, ACCOUNT_BILLING_CITY_FIELD);
  }
}
