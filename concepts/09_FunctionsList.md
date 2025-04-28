# List of Functions


### Interpretation and Validation (>58)

- v1-create-controller-template
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


