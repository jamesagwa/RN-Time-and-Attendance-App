import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

TaskManager.defineTask("tamsGeofenceTask", function geoFencingTask({
  data: { eventType, region },
  error
}) {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  if (eventType === Location.GeofencingEventType.Enter) {
    globalThis.isWithinGeofence = {
      region,
      success: true
    };
  } else if (eventType === Location.GeofencingEventType.Exit) {
    globalThis.isWithinGeofence = {
      region,
      success: false
    };
  }
});
