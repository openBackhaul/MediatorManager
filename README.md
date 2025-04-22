# DeviceDomainManager (former MediatorManager)  

### Location  
The DeviceDomainManager (DDM) is part of the OperationSupport.  

### Description  
The DeviceDomainManager manages and encapsulates all necessary activities for providing and maintaining  
- the NETCONF connections between MountPoint (inside the Controller) and mediatorProcess (inside the mediatorVM)  
- the mediatorVmTemplates, the mediatorVms and the ~ 42,000 mediatorProcesses
- the ~ 42,000 SNMP connections between mediatorProcess and device.  

This includes the following aspects:  
  - establishing the management connection (incl. initiating the necessary device preparation)  
  - sharing the load across mediatorVMs  
  - supporting non-traffic affecting mediator release updates  
  - load sharing based protection of mediatorVMs  
  - representing the network topology beneath the NETCONF interface  

A lot of conceptual work has been done, during specifying the application.  
It lead to an entirely new architectural concept.  
Below documents are summarizing the thoughts made during the development process and the resulting information structure:  
- [Basic Building Blocks](./concepts/01_BasicBuildingBlocks.md)  
- [AutomationArchitecture](./concepts/03_AutomationArchitecture.md)  
- [Network Topology](./concepts/05_NetworkTopology.md)  


### Relevance  
The DeviceDomainManager is required for connecting devices to the controller.  

### Resources  
- [Specification](./spec/)  
- [TestSuite](./testing/)  
- [Implementation](./server/)  

### Comments  
./.
