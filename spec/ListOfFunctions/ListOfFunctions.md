# DeviceDomainManager List of Functions  

<img src="./diagrams/CategoriesOfFunctions.png" alt="CategoriesOfFunctions" width="700" style="display: block; margin: 0 auto"/>  

. 
-  
. 
-  
_muss von LILW nach DDM angepasst werden_
-  
. 
-  


### Interpretation  
- v1-create-controller-template / v1-create-mediator-vm-template / v1-create-device-template  
  - Copies content of RunningDS into CandidateDS  
  - Creates the specified Profile object in CandidateDS  
  - Calls v1-validation-orchestrator  
  - IF ResponseCode==204  
    - Copies content of CandidateDS into RunningDS  
    - Responds 204 to requestor  
    ELSE  
    - Responds ResponseCode to requestor  
- v1-delete-controller-template / v1-delete-mediator-vm-template / v1-delete-device-template  
  - Copies content of RunningDS into CandidateDS  
  - Deletes the specified Profile object from CandidateDS  
  - Calls v1-validation-orchestrator  
  - IF ResponseCode==204  
    - Copies content of CandidateDS into RunningDS  
    - Responds 204 to requestor  
    ELSE  
    - Responds ResponseCode to requestor  
- v1-update-controller-template / v1-update-mediator-vm-template / v1-update-device-template  
  - Copies content of RunningDS into CandidateDS  
  - Updates the specified values of the specified Profile object in CandidateDS  
  - Calls v1-validation-orchestrator  
  - IF ResponseCode==204  
    - Copies content of CandidateDS into RunningDS  
    - Responds 204 to requestor  
    ELSE  
    - Responds ResponseCode to requestor  
- v1-regard-controller / v1-regard-mediator-vm
  - Copies content of RunningDS into CandidateDS  
  - Creates the specified CC object in CandidateDS  
  - Calls v1-validation-orchestrator  
  - IF ResponseCode==204  
    - Copies content of CandidateDS into RunningDS  
    - Responds 204 to requestor  
    ELSE  
    - Responds ResponseCode to requestor  
- v1-disregard-controller / v1-disregard-mediator-vm
  - Copies content of RunningDS into CandidateDS  
  - Deletes the specified CC object from CandidateDS  
  - Calls v1-validation-orchestrator  
  - IF ResponseCode==204  
    - Copies content of CandidateDS into RunningDS  
    - Responds 204 to requestor  
    ELSE  
    - Responds ResponseCode to requestor  
- v1-establish-management-plane-transport  
  - Copies content of RunningDS into CandidateDS  
  - Creates the specified (Device) CC object (incl. LTP and LPs) in CandidateDS  
  - Creates the specified (MountPoint, MediatorProcess) LTP objects (incl. LPs) in CandidateDS  
  - Creates the Link objects (NetconfLink, SnmpLink) in CandidateDS  
  - Creates the FC object in CandidateDS  
  - Calls v1-validation-orchestrator  
  - IF ResponseCode==204  
    - Copies content of CandidateDS into RunningDS  
    - Responds 204 to requestor  
    ELSE  
    - Responds ResponseCode to requestor  
- v1-dismantle-management-plane-transport
  - Copies content of RunningDS into CandidateDS  
  - Deletes the LTP objects (MountPoint, MediatorProcess) that are referenced by the Links that are referenced by the specified FC from CandidateDS  
  - Deletes the Link objects (NetconfLink, SnmpLink) that are referenced by the specified FC from CandidateDS  
  - Deletes the CC objects (Device) that is referenced by the specified FC from CandidateDS  
  - Deletes the specified FC from CandidateDS  
  - Calls v1-validation-orchestrator  
  - IF ResponseCode==204  
    - Copies content of CandidateDS into RunningDS  
    - Responds 204 to requestor  
    ELSE  
    - Responds ResponseCode to requestor  

### Validation  
- p1-validation-orchestrator  
  - Calls a configurable set of the TestFunctions listed below  
  - IF all ResponseCodes==204  
    - Responds 204  
    ELSE  
    - Responds the first ResponseCode different from 204 and terminates  

_(existing entries to be seen as examples, list of validation tests is to be defined by ApplicationOwner:)_  
- p1-ensure-unique-template-names  
  Ensures that all Profile definitions have unique template-names  
- p1-ensure-all-elements-referencing-an-existing-template  
  Ensures that all Profile definitions have unique template-names  
- p1-ensure-all-existing-controllers-complying-with-template-definition  
  Ensures that updated template is not in conflict with existing controllers  
- p1-ensure-all-existing-mediator-vms-complying-with-template-definition  
  Ensures that updated template is not in conflict with existing mediatorVms  
- p1-ensure-all-existing-devices-complying-with-template-definition  
  Ensures that updated template is not in conflict with existing devices  
- p1-ensure-unique-element-names  
  Ensures that all CC definitions have unique element-names  
- p1-ensure-all-cc-referenced-by-fc-in-operational-exist-in-candidate  
  Ensures that no CC of an operational FC gets deleted  
- p1-ensure-all-lp-referenced-by-link-in-operational-exist-in-candidate  
  Ensures that no LP of an operational Link gets deleted  
- p1-ensure-unique-local-ids-at-links  
  Ensures that the local-ids at links are unique  
- p1-ensure-unique-mount-names-at-fcs  
  Ensures that there is just a single FC per MountName  
- p1-ensure-every-fc-having-at-least-one-route  
  Ensures every FC being routed
- p1-ensure-every-route-connecting-end-to-end
  Ensures every route referencing the links necessary for a path between the endpoints of the FC  

### Measurement  
- p1-measure-management-plane-transport-availability  
  - Picks next FC object from rolling list in RunningDS  
  - Sends Restconf request to MountPoint to check ManagementPlaneTransport connection to Device  
  - IF expected CC::externalLabel
    - Creates FC object and all related objects (both Links, CC and both LTPs) similar to RunningDS in OperationalDS (might already have existed)  
    - Deletes all entries related to the FC in the CurrentAlarms (there might be no entry)  
    ELSE  
    - Deletes FC object from OperationalDS (might not have existed)  
    - Creates an entry with ErrorCode [to be defined#1] at the FC object in the CurrentAlarms (might have already existed)  
    - calls p1-measure-snmp-link-availability  
    - IF available  
      - calls p1-measure-netconf-link-availability  
- p1-measure-snmp-link-availability  
  - Sends Netconf request to MediatorProcess to check SnmpLink to Device  
  - IF expected CC::externalLabel
    - Creates Link object and all related objects (CC and LTP) similar to RunningDS in OperationalDS (might already have existed)  
    - Deletes all entries related to the Link in the CurrentAlarms (there might be no entry)  
    - Returns true
    ELSE  
    - Deletes Link object from OperationalDS (might not have existed)  
    - Creates an entry with ErrorCode [to be defined#2] at the Link object in the CurrentAlarms (might have already existed)  
    - calls p1-measure-device-availability  
    - IF available  
      - calls p1-measure-mediator-process-availability  
    - Returns false
- p1-measure-device-availability  
  - Pings TcpServer of Device  
  - IF responding  
    - Creates CC object (Device) similar to RunningDS in OperationalDS (might already exist)  
    - Deletes all entries related to the CC in the CurrentAlarms (there might be no entry)  
    - Returns true  
    ELSE  
    - Deletes CC object from OperationalDS (might not have existed)  
    - Creates an entry with ErrorCode 532 at the missing CC object in the CurrentAlarms (might have already existed)  
    - Returns false  
- p1-measure-mediator-process-availability  
  - Request MIM://v1/list-mediator-instances  
  - IF MountName of FC in the list of MediatorProcesses  
    - Creates LTP object (MediatorProcess) similar to RunningDS in OperationalDS (might already exist)  
    - Deletes all entries related to the LTP in the CurrentAlarms (there might be no entry)  
    - Returns true  
    ELSE  
    - Deletes LTP object from OperationalDS (might not have existed)  
    - Creates an entry with ErrorCode [to be defined#3] at the missing LTP object in the CurrentAlarms (might have already existed)  
    - Returns false  
- p1-measure-netconf-link-availability
  - Request CDM://v1/inform-about-mount-point
  - IF MountPoint exists
    - Creates LTP object (MountPoint) similar to RunningDS in OperationalDS (might already exist)  
    - Deletes all entries related to the LTP in the CurrentAlarms (there might be no entry)  
    - IF state==connected  
      - Creates Link object (NetconfLink) similar to RunningDS in OperationalDS (might already have existed)  
      - Deletes all entries related to the Link in the CurrentAlarms (there might be no entry)  
      - Returns true
      ELSE  
      - Deletes Link object from OperationalDS (might not have existed)  
      - Creates an entry with ErrorCode [to be defined#4] at the missing Link object in the CurrentAlarms (might have already existed)  
      - Return false
    ELSE  
    - Deletes Link object (NetconfLink) from OperationalDS (might not have existed)  
    - Creates an entry with ErrorCode [to be defined#4] at the missing Link object in the CurrentAlarms (might have already existed)  
    - Deletes LTP object (MountPoint) from OperationalDS (might not have existed)  
    - Creates an entry with ErrorCode [to be defined#5] at the missing LTP object in the CurrentAlarms (might have already existed)  
    - Returns false  


[Thorsten to continue here]


### Monitoring  
- ./. (cyclic operation)  

_(further examples to be potentially removed by ApplicationOwner:)_
- v1-check-if-cc-external-label-equal-to-mount-point  
- v1-check-if-operational-tx-power-is-below-planned  

### Implementation  
- v1-implementation-orchestrator (cyclic operation)  
  - Picks next FC object from rolling list in CurrentAlarms  
  - Identifies errored object and checks dateOfNextAttemptToFix  
    - IF currentDate > dateOfNextAttemptToFix  
      - Increments dateOfNextAttemptToFix  
      - Calls predefined ImplementationFunction depending on the ErrorCode and pastAttemptsToFix  
  - Documents response into pastAttemptsToFix

- v1-update-ltp-external-label  
  - Reads calculatedLinkId attribute from Link and mountName + AirInterfaceUuid from AirInterface in OperationalDS
  - Sends PUT request to MWDG://live/mountName/AirInterfaceUuid/externalLabel with calculatedLinkId from Link in Operational  
    - IF ResponseCode==204
      - Sends ResponseCode=204
      ELSE
      - Sends ErrorCode [to be defined#3]

### Concepts for defining ImplementationFunctions  
During discussions we found out that:  
- With increasing number of deviations between RunningDS and OperationalDS some deadlock might occur.  
- It is unclear how roll-back of partly executed implementation sequences could be defined in case of idempotent functions.  

The following concepts should help minimizing the risk of dead lock and partly executed implementation sequences:  
- Implementation sequences should be short (this is why the information structure is now limiting to a single function).  
- Each implementation sequence shall terminate in a stable state more close to the target state defined in the RunningDS.  
- Steps that are increasing the options in the total system (e.g. releasing limited resources) shall be done first. Steps that are narrowing down the options in the total system (e.g. allocating resources) shall be done in a separated sequence later.  

. 
-  
. 
-  
_von DDM_
-  
. 
-  


# List of Functions


### Interpretation and Validation (>58)


  - v1-create-controller-template-validation
    - ...
- v1-delete-controller-template
  - v1-delete-controller-template-validation
    - ...
- v1-list-controller-templates

- v1-create-mediator-vm-template
  - v1-create-mediator-vm-template-validation
    - v1-confirm-number-of-processes-less-than-limit
    - ...
- v1-delete-mediator-vm-template
  - v1-delete-mediator-vm-template-validation
    - v1-confirm-template-not-being-operational
    - ...
- v1-list-mediator-vm-templates

- v1-create-device-template
  - v1-create-device-template-validation
    - ...
- v1-delete-device-template
  - v1-delete-device-template-validation
    - ...
- v1-list-device-templates


- v1-regard-controller
  - v1-regard-controller-validation
    - ...
- v1-disregard-controller
  - v1-disregard-controller-validation
    - ...
- v1-list-controllers

- v1-regard-mediator-vm
  - v1-regard-mediator-vm-validation
    - ...
- v1-disregard-mediator-vm
  - v1-disregard-mediator-vm-validation
    - ...
- v1-list-mediator-vms

- v1-list-devices


- v1-establish-management-plane-transport
  - v1-regard-device
    - v1-regard-device-validation
      - ...
  - v1-regard-mount-point
    - v1-regard-mount-point-validation
      - ...
  - v1-establish-management-plane-transport-validation
    - ...
  - v1-create-route
    - v1-create-mediator-process
      - v1-create-mediator-process-validation
        - ...
    - v1-establish-snmp-link
      - v1-establish-snmp-link-validation
        - ...
    - v1-establish-netconf-link
      - v1-establish-netconf-link-validation
        - ...
    - v1-create-route-validation
      - ...
- v1-dismantle-route
  - v1-dismantle-netconf-link
    - v1-dismantle-netconf-link-validation
      - ...
  - v1-dismantle-snmp-link
    - v1-dismantle-snmp-link-validation
      - ...
  - v1-dismantle-mediator-process
    - v1-dismantle-mediator-process-validation
      - ...
  - v1-dismantle-route-validation
    - ...
- v1-dismantle-management-plane-transport
  - v1-disregard-mount-point
    - v1-disregard-mount-point-validation
      - ...
  - v1-disregard-device
    - v1-disregard-device-validation
      - ...
  - v1-dismantle-management-plane-transport-validation
    - ...


### Measurement (6)

List of measurements we could do:
- Getting the list of available **Controllers** from the ControllerDomainController
- Getting the list of available **MountPoints** at a Controller from the ControllerDomainController
- Detecting the availability of a **ManagementPlaneTransport connection** by 
Getting the connection state of a MountPoint from the ControllerDomainController
- Detecting the availability of a **MediatorVM** by addressing it with some request (e.g., /v1/list-mediator-instances)
- Getting the list of available **MediatorProcesses** from the MediatorVM
- Detecting the availability of an **SNMP connection** by addressing a NETCONF request to its MediatorProcesses
- Detecting the availability of a **Device** by addressing it by Ping

The measurements is organized from top to bottom.  
If the higher layer is available, the lower layers are assumed to be available, too.  
If the higher layer is not available, measurement is drilling down.  
```
here is a problem with alternative routes  
```

This translates into the following functions:

- v1-detect-management-plane-transport-state
  - cdm-v1-inform-about-mount-point

  if not existing:
  - v1-detect-controller-state
    - cdm-v1-provide-list-of-controllers
  - v1-detect-mount-point-state
    - cdm-v1-provide-list-of-mount-points-at-controller

  if management-plane-transport not available, execute for each route:
  - v1-detect-link-states
    - NetconfClient->MediatorProcess://control-construct/control-construct-pac/external-label

    if snmp-link available: netconf-link := unavailable  
    if snmp-link not available:  
    - v1-detect-mediator-state
      - xmim-v1-list-mediator-instances

      if not responding: MediatorVM := unavailable  
      if MediatorProcess not listed: MediatorProcess := unavailable  
      else:
      - v1-detect-device-state
        - PingClient->TcpServer of Device


### Management and Implementation


hier gehts weiter => 


- v1-alert-unavailable-management-plane-transport
  - v1-alert-unavailable-device
    - cp-v1-prepare-connection
  - v1-alert-unavailable-mount-point
    - _v1-dismantle-management-plane-transport
  - v1-alert-unavailable-route
    - v1-alert-unavailable-mediator-process
      - xmim-v1-provide-mediator-instance
      - cdm-v1-update-tcp-client
    - v1-alert-unavailable-snmp-link
    - v1-alert-unavailable-netconf-link
      - cp-v1-update-netconf-client
      - cp-v1-update-tcp-client

- v1-alert-obsolete-management-plane-transport
  - v1-alert-obsolete-device
  - v1-alert-obsolete-mount-point
  - v1-alert-obsolete-route
    - v1-alert-obsolete-mediator-process
    - v1-alert-obsolete-snmp-link
    - v1-alert-obsolete-netconf-link

- v1-list-alarms-on-connection


