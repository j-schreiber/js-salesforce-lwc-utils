import { LightningElement, api, track } from "lwc";

export default class ChangeDataCaptureSubscriber extends LightningElement {
  @api sobjectName;
  @api recordId;

  @track registeredEvents = [];

  handleRecordUpdate(recordUpdateEvent) {
    this.registeredEvents.push(recordUpdateEvent);
    // we dispatch the event again, because the original event is composed: false and bubbles: false
    // which does not allow it to surpass beyond this parent. If both values are true, we do not need to
    // dispatch the event egain
    this.dispatchEvent(new CustomEvent("recordupdate"));
  }

  get registeredEventCount() {
    return this.registeredEvents.length;
  }
}
