# Domain Contents  

We cannot control the management interfaces and functions of the xMediatorInstanceManager and the Controller.  
While both elements are present within our network infrastructure, they do not integrate into the MW SDN application layer.  
As a result, we encapsulate them into sub-domains.  

The ManagementPlane (domain) and its sub-domains are now spanning a network composed from controllers including mountPoints, mediatorVMs including mediatorProcesses and devices.  
These elements are managed within these domains, but this management is done by applications (e.g. ControllerDomainManager, DeviceDomainManager, ConnectionPreparation, ManagementPlaneManager).  

These applications do not belong to the ManagementPlane or its sub-domains, but to the MW SDN domain.  
They are fully integrated into the MW SDN domain's management, which is executed by the TinyApplicationController.  

<img src="./diagrams/23_MwSdnDomain.png" alt="MwSdnDomain" width="700" style="display: block; margin: 0 auto"/>  


# Network Topology inside the DeviceDomainManager  

The DeviceDomainManager application encapsulates all instances of xMediatorInstanceManager.  
In contrary to former concepts, the DeviceDomainManager will not mimic the xMediatorInstanceManagers towards the ApplicationLayerTopology or the ExecutionAndTraceLog.  
It will document the network topology inside its domain and expose an abstracted view to the ManagementPlaneManager application.  
The documentation of the network topology inside the DeviceDomainManager shall follow the NMDA concepts.  

<img src="./diagrams/22_DeviceDomainFc.png" alt="DeviceDomainFc" width="700" style="display: block; margin: 0 auto"/>  



The DeviceDomainManager's internal data structure is outlined in the following picture.

<img src="./diagrams/InternalDataStructure.png" alt="InternalDataStructure" width="800" style="display: block; margin: 0 auto"/> 

Its top level element is a [DomainController](./schemas/00_DomainController.yaml) that holds the parameter settings of the [Functions](./schemas/01_Function.yaml) and the [CurrentAlarms](./schemas/02_CurrentAlarm.yaml) within the DeviceDomain.  

Apart from that it holds four different documentations of the same [Network](./schemas/03_NetworkControlDomain.yaml) (running, operational, startup and candidate).  

[ControllerTemplates](./schemas/05_ControllerTemplate.yaml), [mediatorVmTemplates](./schemas/06_MediatorVmTemplate.yaml) and [DeviceTemplates](./schemas/07_DeviceTemplate.yaml) are defined for each of the network documentations.  

These templates get referenced whenever a new [Controller](./schemas/11_Controller.yaml), [mediatorVm](./schemas/21_MediatorVm.yaml) or Device gets instantiated.  

Additional instances of [MountPoint](./schemas/12_MountPoint.yaml), [MediatorProcess](./schemas/22_MediatorProcess.yaml), [Device](./schemas/31_Device.yaml), [NetconfConnection](./schemas/81_NetconfConnection.yaml) and [SnmpConnection](./schemas/82_SnmpConnection.yaml) get created, whenever a new [ManagementPlaneTransportConnection](./schemas/88_ManagementPlaneTransportConnection.yaml) is requested to be established.  
