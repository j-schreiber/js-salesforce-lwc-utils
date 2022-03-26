import { LightningElement, api, track } from "lwc";

export default class ChangeDataCaptureSubscriber extends LightningElement {
  @api objectApiName;
  @api recordId;

  @track registeredEvents = [];

  handleRecordUpdate(recordUpdateEvent) {
    this.registeredEvents.push(recordUpdateEvent);
    // this let's us get rid of the aura component that otherwise would have to wrap around the LWC
    // it fires the force:refreshView interface that refreshes the record page, related lists and
    // all wires of the record
    eval("$A.get('e.force:refreshView').fire();");
  }

  get registeredEventCount() {
    return this.registeredEvents.length;
  }
}
