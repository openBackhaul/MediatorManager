# MediatorManager  

### Location  
The MediatorManager (MM) is part of the OperationSupport.  

### Description  
The MediatorManager manages and encapsulates all necessary activities for providing and maintaining NETCONF interfaces to the devices.  

This includes the following aspects:  
  - establishing the interface (incl. initiating the necessary device preparation)  
  - sharing the load accross mediatorVMs  
  - supporting non-traffic affecting mediator release updates  
  - load sharing based protection of mediatorVMs  
  - representing the network topology behind the NETCONF interface  

More detailed information about the MM's concepts:  
- [Basic Building Blocks](./concepts/BasicBuildingBlocks.md)  
- [Network Topology Representation](./concepts/NetworkTopologyRepresentation.md)  
- [Automated Operation](./concepts/AutomatedOperation.md)  

### Relevance  
The MediatorManager is required for connecting devices to the controller.  

### Resources  
- [Specification](./spec/)  
- [TestSuite](./testing/)  
- [Implementation](./server/)  

### Comments  
./.
