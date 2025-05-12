# DeviceDomainManager Modules








### Modules that are updating the OperationalDS  

**OperationalMediatorVmAndProcesses**  
- In /network-control-domain=running/control-construct[*] filtered for category=mediatorVm
- Repeat (send request to xMIM://v1/list-mediator-instances)
- Out
    - /network-control-domain=operational/control-construct[*]
      (if xMIM://v1/list-mediator-instances does not respond, mediatorVm shall be deleted from list)
    - /network-control-domain=operational/control-construct=mediatorVmName/logical-termination-point=deviceName
      (if xMIM://v1/list-mediator-instances does not contain deviceName)

**OperationalManagementPlaneTransportList**
- In /network-control-domain=running/forwarding-domain=management-plane-transport/forwarding-construct[*]
- Repeat (send request to CDM://v1/test-mount-point)
- Out
    - /network-control-domain=operational/forwarding-domain=management-plane-transport/forwarding-construct[*]
      (if result of test of NetconfClient negative, FC shall not be represented in OperationalDS)
    - /alarm-pac/current-alarms/current-alarm-list[*]
      (if result of test of NetconfClient negative, alarm shall be represented in AlarmList)