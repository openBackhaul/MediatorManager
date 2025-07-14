# DeviceDomainManager Specification  

### Managed Elements  
- The following kinds of Elements are encapsulated:  
  - Device  
    - [ConnectionPreparation](./Elements/CP/cp.md)
  - MediatorVM  
    - [MediatorInstanceManager](./Elements/xMIM/mim.md)  
- The following kinds of Connections are managed:  
  - MountPoint (Controller) <---> MediatorProcess (MediatorVM)  
  - MediatorProcess (MediatorVM) <---> Device  
- The following kind of Endpoint is managed, despite its holding Elements are encapsulated by a neighboring domain:  
  - NetconfClient at MountPoint encapsulated by [ControllerDomainManager](./Elements/CDM/cdm.md)  

### InformationStructure  
- Introduction and detailed specification of the [Internal Information Structure](./InformationStructure/InformationStructure.md) of the DDM  

### Supported UseCases  
- Connecting Devices to the ApplicationLayer  
- Adding and removing MediatorProcesses, which implies:  
  - LoadSharing on MediatorVMs  
  - Protection of MediatorVM  
  - Upgrading MediatorVMs without traffic impact  

### ListOfFunctions  
- High level considerations on the [Functions](./ListOfFunctions/ListOfFunctions.md) of the DDM  

### Diagrams  
- [Collection of Diagrams](./diagrams)  

### ServiceList  
- [DeviceDomainManager+services](./DeviceDomainManager+services.yaml)  

### ProfileList and ProfileInstanceList  
- [DeviceDomainManager+profiles](./DeviceDomainManager+profiles.yaml)  
- [DeviceDomainManager+profileInstances](./DeviceDomainManager+profileInstances.yaml)  

### ForwardingList  
- [DeviceDomainManager+forwardings](./DeviceDomainManager+forwardings.yaml)  

### Open API specification (Swagger)  
- [DeviceDomainManager](./DeviceDomainManager.yaml)  

### CONFIGfile (JSON)  
- [DeviceDomainManager+config](./DeviceDomainManager+config.json)  

### Comments  
A lot of conceptual work has been done, during specifying the application.  
It lead to an entirely new architectural concept.  
Below documents are summarizing the thoughts made during the development process:  
- [BasicBuildingBlocks](./concepts/01_BasicBuildingBlocks.md)  
- [AutomationArchitecture](./concepts/03_AutomationArchitecture.md)  
- [NetworkTopology](./concepts/05_NetworkTopology.md)  
- [FunctionConcepts](./concepts/07_FunctionConcepts.md)  