import { LightningElement, api, track } from "lwc";
import { subscribe } from "lightning/empApi";

export default class ChangeDataCaptureSubscriber extends LightningElement {
  @api sobjectName;
  @api recordId;

  @track registeredEvents = [];

  subscription = {};

  connectedCallback() {
    this.subscribeChangeEvents();
  }

  handleChangeDataCapture = (changeEvent) => {
    console.log(JSON.stringify(changeEvent, null, 2));
    let recordId = changeEvent.data.payload.ChangeEventHeader.recordIds[0];
    if (this.recordId === recordId) {
      this.registeredEvents.push(changeEvent.data.payload);
      this.dispatchEvent(
        new CustomEvent("recordupdate", {
          detail: changeEvent.data.payload
        })
      );
    }
  };

  subscribeChangeEvents() {
    subscribe(this.channelName, -1, this.handleChangeDataCapture)
      .then((response) => {
        this.subscription = response;
        console.log(
          "Successfully subscribed to: " + JSON.stringify(this.subscription)
        );
      })
      .catch((error) => {
        console.log("SUBSCRIPTION FAILED!");
        console.log(error);
      });
  }

  extractRecordId(changeEvent) {
    return changeEvent.data.payload.ChangeEventHeader.recordIds[0];
  }

  get channelName() {
    let sobjName = this.sobjectName.replace("__c", "__");
    return `/data/${sobjName}ChangeEvent`;
  }

  get registeredEventCount() {
    return this.registeredEvents.length;
  }
}
