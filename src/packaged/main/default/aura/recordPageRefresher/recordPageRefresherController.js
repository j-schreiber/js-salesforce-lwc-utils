({
  refreshRecordPage: function (component, event, helper) {
    console.log("Record change captured. Refreshing page ...");
    $A.get("e.force:refreshView").fire();
  }
});
