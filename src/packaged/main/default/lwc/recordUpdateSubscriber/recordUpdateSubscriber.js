import { LightningElement, api } from "lwc";
import { subscribe, unsubscribe } from "lightning/empApi";

export default class RecordUpdateSubscriber extends LightningElement {
  @api sobjectName;
  @api recordId;

  _subscription = null;

  connectedCallback() {
    this.subscribeChangeDataCaptureEvents();
  }

  disconnectedCallback() {
    unsubscribe(this._subscription);
    this._subscription = null;
  }

  /**
   * The callback function that is passed into the subscribe method from lightning/empApi
   * This method will receive event for all records of the sobject
   * Filter for the desired record id by extracting it from the ChangeEventHeader.
   *
   * @param {*} changeEvent
   */
  handleChangeDataCapture = (changeEvent) => {
    // console.log(JSON.stringify(changeEvent, null, 2));
    let recordId = changeEvent.data.payload.ChangeEventHeader.recordIds[0];
    if (this.recordId === recordId) {
      this.dispatchEvent(
        new CustomEvent("recordupdate", {
          detail: changeEvent.data.payload
        })
      );
    }
  };

  /**
   * Call this from the connected callback, so the LWC immediately subscribes to the channel,
   * once it is connected.
   */
  subscribeChangeDataCaptureEvents() {
    subscribe(this.channelName, -1, this.handleChangeDataCapture)
      .then((response) => {
        this._subscription = response;
        console.log(
          "Successfully subscribed to: " + JSON.stringify(this._subscription)
        );
      })
      .catch((error) => {
        console.log("SUBSCRIPTION FAILED!");
        console.log(error);
      });
  }

  get channelName() {
    let sobjName = this.sobjectName.replace("__c", "__");
    return `/data/${sobjName}ChangeEvent`;
  }
}
