# Basic building blocks  
_(This is a conceptual document that is not directly part of the DDM specification.  
It reflects the status as of early May 2025 and has not been updated since that time.)_  

**In regards with the mediator management, the DeviceDomainManager is distinguishing three categories of things**  

- **MediatorVmTemplate**  
The MediatorVmTemplate defines a set of characteristics that are filled with values that are specific to a mediator software. It exists in the DeviceDomainManager only.  
- **MediatorVm**  
The MediatorVm is an actual installation that can be managed via its xMediatorInstanceManager REST interface. The representation of this installation is created as an instance of the corresponding MediatorVmTemplate inside the DeviceDomainManager.  
- **MediatorProcess**  
Thousands of MediatorProcesses are running inside a MediatorVm. The MediatorProcess is the translator that is dedicated to a physical device. Initially the MediatorProcess was often referenced as mediatorInstance, which explains why the management interface at the MediatorVm has been named xMediatorInstanceManager.  

**Static Characteristics of the MediatorVm**  
The MediatorVmTemplate, from which the MediatorVms were generated, still determines the characteristics of the MediatorVms even after instantiation.  
(You could also say that the characteristics in the MediatorVmTemplate are defined like static variables that can only be changed in the class (MediatorVmTemplate) but not in the derived objects (MediatorVms).)  

Example:  
If a new device type is added to the list of supported device types at a MediatorVmTemplate, all MediatorVms that have been generated from this MediatorVmTemplate will connect with this device type in future.  

Remark:  
The risk inherent in lowering the engineering limit in the MediatorVmTemplate is known and accepted.  

**The work process distinguishes the following three stages:**  
Preparation:  
A lead operational expert or engineering expert is creating the MediatorVmTemplate whenever a new mediator software release got delivered. It means that the DeviceDomainManager gets prepared.  

Resource allocation:  
A member of the operational team is creating an instance of the MediatorVmTemplate inside the DeviceDomainManager, whenever a new MediatorVm got instantiated.  

Automated Operation:  
MediatorProcesses get created and dismantled automatically by the DeviceDomainManager after it has been requested to provide a NETCONF interface for a device.  

<img src="./diagrams/BasicBuildingBlocks.png" alt="NetworkStructure" width="400" style="display: block; margin: 0 auto"/>  