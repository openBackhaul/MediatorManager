# Measurement  

## Basic Concept of Measurement  

The MeasurementFunctions are interpreting data for creating the data structure of the OperationalDS.  
They are addressing Elements to retrieve information about the termination points managed within this domain.  
The received information is interpreted into availability of the termination points in the OperationalDS.  
The availability of the connections in the OperationalDS is derived from the availability of the termination points in the OperationalDS.  

## Offered Measurements  

The Elements that are managed within this domain are offering proprietary APIs with limited capabilities.  
The Offered Measurements section describes the measurements that are available at these proprietary APIs.  

### Application  

The Applications of the MW SDN application layer are equipped with an ONF Core IM based OaM REST interface that allows to configure during runtime.  

#### ApplicationDomainManager
The Application's OaM interface is encapsulated by the [ApplicationDomainManager](https://github.com/openBackhaul/ApplicationDomainManager) (ADM) application.  

The ADM is offering the following services for measurement:  
- Retrieving the names of the regarded Applications  
  ADM://v1/list-applications  
- Retrieving the names of the created ManagementDomainInterfaces  
  ADM://v1/list-management-domain-interfaces  
- Retrieving information about a ManagementDomainInterface  
  ADM://v1/inform-about-management-domain-interface  

The openAPI specification of the ApplicationDomainManager can be found [here](https://github.com/openBackhaul/ApplicationDomainManager/blob/develop/spec/ApplicationDomainManager.yaml).

### LoadBalancer  

#### nginx
The currently used nginx LoadBalancer is offering the following resources:  
...  

### Controller  

#### OpenDaylight  
OpenDaylight supports to manage the MountPoints via its REST interface.  

The following measurements are offered:  
- Retrieving the names of the configured MountPoints, equals with mountName, deviceName, Telefonica's NE-Id  
  ODL://rests/data/network-topology:network-topology/topology=topology-netconf?fields=node(node-id)  
- Retrieving information about a MountPoint (deviceName), includes  
  - the NetconfClient's remote address configuration  
  - the status of the connection towards a device, e.g. 'connected', 'connecting' or 'unable-to-connect'  
  ODL://rests/data/network-topology:network-topology/topology=topology-netconf/node={deviceName}


A detailed description of the measurement services can be found [here](../../Elements/OpenDaylight/OpenDaylight.yaml).  

## Appliance of Measurements  

The MeasurementFunctions translate the measurement results into concrete objects in the OperationalDS.  
The Appliance of Measurements section describes the concrete effects of the provided measurement results to the objects in the OperationalDS.  
Due to internal relationships, chains of changes to the availability might unfold from a single measurement result.  
Such internal relationships (e.g., Link is unavailable, if at least one end point is unavailable) are described in this section, too.  

<span style="color:red;"> _**! The following definitions are experimental !**_ </span>  

### Direct consequences of external Measurements  

| Application    |   |
| -------------- | - |
| Object         | ControlConstruct with [/control-construct/category]=='application' |
| Measurement    | [ADM://v1/list-applications$response.body#list-of-application-names] |
| Result         | list of names of Applications |
| Interpretation | entire Object to be deleted from OperationalDS, if applicationName==[/control-construct/element-name] not included in Result |

| Management DomainInterface |   |
| -------------- | - |
| Object         | LTP identified by [managementDomain] inside ControlConstruct with [/control-construct/category]=='application' |
| Measurement    | [ADM://v1/list-management-domain-interfaces$response.body#list-of-management-domain-interfaces] |
| Result         | list of names of ManagementDomains |
| Interpretation | entire Object to be deleted from OperationalDS, if managementDomain==[/control-construct/logical-termination-point/local-id] not included in Result |

| LoadBalancer   |   |
| -------------- | - |
| Object         | ControlConstruct with [/control-construct/category]=='loadBalancer' |
| Measurement    | [LB://_service-for-retrieving-list-of-forwardings_$response.code] |
| Result         | ResponseCode |
| Interpretation | entire Object to be deleted from OperationalDS, if ResponseCode!=200 |

| Forwarding     |   |
| -------------- | - |
| Object         | LTP identified by [managementDomain] inside ControlConstruct with [/control-construct/category]=='loadBalancer' |
| Measurement    | [LB://_service-for-retrieving-list-of-forwardings$response.body#list-of-forwardings_] |
| Result         | list of names of Forwardings |
| Interpretation | entire Object to be deleted from OperationalDS, if managementDomain==[/control-construct/logical-termination-point/local-id] not included in Result |

| Controller     |   |
| -------------- | - |
| Object         | ControlConstruct with [/control-construct/category]=='controller' |
| Measurement    | [C://_service-for-retrieving-list-of-mount-points_$response.code] |
| Result         | ResponseCode |
| Interpretation | entire Object to be deleted from OperationalDS, if ResponseCode!=200 |

| MountPoint     |   |
| -------------- | - |
| Object         | LTP identified by [deviceName] inside ControlConstruct with [/control-construct/category]=='controller' |
| Measurement    | [C://_service-for-retrieving-list-of-mount-points$response.body#list-of-mount-points_] |
| Result         | list of names of MountPoints |
| Interpretation | entire Object to be deleted from OperationalDS, if deviceName==[/control-construct/logical-termination-point/local-id] not included in Result |

| LogicalController |   |
| -------------- | - |
| Object         | ControlConstruct with [/control-construct/category]=='logicalController' |
| Measurement    | ./. |
| Result         | ./. |
| Interpretation | must exist in OperationalDS |

| LogicalMountPoint |   |
| -------------- | - |
| Object         | LTP identified by [deviceName] inside ControlConstruct with [/control-construct/category]=='logicalController' |
| Measurement    | ./. |
| Result         | ./. |
| Interpretation | must exist in OperationalDS |


### Internal dependencies     

| Link           |   |
| -------------- | - |
| Object         | any Link with termination points described by triple of references {_cc,_ltp ,_lp } |
| Measurement    | [/network-control-domain=operational/control-construct=_cc/logical-termination-point=_ltp/layer-protocol=_lp] |
| Result         | available/not available in OperationalDS |
| Interpretation | entire Object to be deleted from OperationalDS, if Result==not available |

| Route          |   |
| -------------- | - |
| Object         | any Route with _links (list of references to the Links that chain up between the FC's endpoints) |
| Measurement    | [/network-control-domain=operational/link=[_links]] |
| Result         | available/not available in OperationalDS |
| Interpretation | entire Object to be deleted from OperationalDS, if Result==not available for at least one of the referenced Links |

| FC             |   |
| -------------- | - |
| Object         | any FC with route (list of alternative Routes between the FC's endpoints) |
| Measurement    | [/network-control-domain=operational/forwarding-domain=_any_/forwarding-construct=_any_/route].length |
| Result         | number of operational Routes |
| Interpretation | entire Object to be deleted from OperationalDS, if Result==0 |
