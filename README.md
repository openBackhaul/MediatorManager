# DeviceDomainManager (former MediatorManager)  

### Location  
The DeviceDomainManager (DDM) is part of the OperationSupport.  

### Description  
The DeviceDomainManager manages and encapsulates all necessary activities for providing and maintaining the ManagementPlaneTransport connection between the NETCONF client at the MountPoint inside the Controller and the SNMP server inside the Device.  

This includes  
- the NETCONF connections between the MountPoints and the mediatorProcesses (inside the mediatorVMs)  
- the mediatorVmTemplates, the mediatorVms and the ~ 42,000 mediatorProcesses inside  
- and the SNMP connections between mediatorProcesses and devices.  

The following use cases are covered (maybe, not all of them from beginning on)  
  - establishing the management connection (incl. initiating the necessary device preparation)  
  - sharing the load across mediatorVMs  
  - supporting non-traffic affecting mediator release updates  
  - load sharing based protection of mediatorVMs  
  - representing the network topology beneath the NETCONF interface  

### Relevance  
The DeviceDomainManager is required for connecting devices to the controller.  

### Resources  
- [Specification](./spec/)  
- [TestSuite](./testing/)  
- [Implementation](./server/)  

### Comments  
./.
