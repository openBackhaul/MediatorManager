# Network Topology  

We cannot control the management interfaces and functions of the xMediatorInstanceManager and the Controller.  
While both elements are present within our network infrastructure, they do not integrate into the MW SDN application layer.  
As a result, we encapsulate them into sub-domains.  

The LiveDomain and its sub-domains are now spanning a network composed from controllers including mountPoints, mediatorVMs including mediatorProcesses and devices.  
These elements are managed within these domains, but the management is done by applications (e.g. ControllerDomainManager, DeviceDomainManager, ConnectionPreparation, LiveDomainManager).  
These applications do not belong to the LiveDomain and its sub-domains, but to the MW SDN domain.  
They are fully integrated into the MW SDN domain's management, which is executed by the TinyApplicationController.  

<img src="./diagrams/23_MwSdnDomain.png" alt="MwSdnDomain" width="700" style="display: block; margin: 0 auto"/>  


# Network Topology inside the DeviceDomainManager  

The DeviceDomainManager application encapsulates all instances of xMediatorInstanceManager.  
In contrary to former concepts, the DeviceDomainManager will not mimic the xMediatorInstanceManagers towards the ApplicationLayerTopology or the ExecutionAndTraceLog.  
It will document the network topology inside its domain and expose an abstracted view to the LiveDomainManager application.  
The documentation of the network topology shall follow the NMDA concepts.  

<img src="./diagrams/22_DeviceDomainFc.png" alt="DeviceDomainFc" width="700" style="display: block; margin: 0 auto"/>  


**Internal Data Structure**  
The DDM's internal data structure is an [own NetworkControlDomain](./schemas/NetworkControlDomain.yaml) that is successively filled with additional objects.

Whenever DDM://v1/regard-controller is addressed, it ...  
- models a [controller](./schemas/Controller.yaml) by creating ...  
  - a ControlConstruct  

Whenever DDM://v1/regard-mediator-vm is addressed, it ...  
- models a [mediatorVM](./schemas/MediatorVm.yaml) that is referencing one of the existing [mediatorVmTemplates in the AppDATA](./schemas/AppData.yaml) by creating ...  
  - a ControlConstruct  
  - and a MediatorProcessFd  
- models the management interface (xMediatorInstanceManager) of the mediatorVM by creating ...  
  - LTPs for the ...  
      - TcpServer,  
      - HttpServer  
      - and the OperationServers  
        - /v1/list-mediator-instances  
        - /v1/provide-mediator-instance  
        - /v1/dismantle-mediator-instance  

Whenever its DDM://v1/establish-management-plane-transport service is addressed, it  
- models the [interfaces of a mountPoint at the defined controller](./schemas/MountPoint.yaml) by creating ...  
  - LTPs for the ...  
    - ManagementPlaneTransportClient  
    - the NetconfClient  
    - and the TcpClient  
- models the [device](./schemas/Device.yaml) by creating ...   
  - a ControlConstruct  
  - and LTPs for ...  
      - the ManagementPlaneTransportServer,  
      - the SnmpServer,  
      - and the TcpServer  
- models the [ManagementPlaneTransport connection](./schema/ManagementPlaneTransportConnection.yaml) by ...  
  - creating a ManagementPlaneTransportFc into the ManagementPlaneTransportFd of the ControllerDomain  
  - and connecting its endpoints with the newly created ManagementPlaneTransportClient at the controller and ManagementPlaneTransportServer at the device.  
- models a [mediatorProcess in a mediatorVm](./schemas/MediatorProcess.yaml) by ...
  - creating LTPs for ...  
    - a NetconfServer,  
    - a TcpServer,  
    - a SnmpClient,  
    - and a TcpClient  
  - creating a MediatorProcessFc in the MediatorProcessFd of a mediatorVm  
  - and connecting its endpoints with the newly created NetconfServer and SnmpClient  
- models a [NETCONF connection](./schemas/NetconfConnection.yaml) by ...  
  - creating a Link  
  - and connecting its endpoints with the newly created NetconfClient at the controller and the NetconfServer at the MediatorProcessFc  
- models an [SNMP connection](./schemas/SnmpConnection.yaml) by ...  
  - creating a Link  
  - and connecting its endpoints with the newly created SnmpClient at the MediatorProcessFc and the SnmpServer at the device  

<img src="./diagrams/InternalDataStructure.png" alt="InternalDataStructure" width="800" style="display: block; margin: 0 auto"/> 