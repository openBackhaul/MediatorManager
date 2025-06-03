# /v1/establish-management-plane-transport

## Purpose :
This service will be used to prepare the device(using ConnectionPreparation(CP) application) and to create a new mediator process in one of the available mediatorVM(using MediatorInstanceManager(MIM) application). 
A mediator process Nefconf Interface in the NorthBound and native protocol(Qx for huawei and SNMP for both Ericsson and SIAE) interface in the SouthBound. SDN controller will interact with the Nefconf interface where as the mediator process interacts with the device using the native protocol.

## Configuration file :
NA

## Information Data Model :

Every MediatorProcess will be represented as a 
- ControlConstruc(CC) Object(Device) in the domain-controller/network-domain-controller/ControlConstruct array
- LogicalTerminationPoint(LTP) Object(MediatorProcess) in the domain-controller/network-domain-controller/ControlConstruct/category=mediatorVm
- LogicalTerminationPoint(LTP) Object(MountPoint) in the domain-controller/network-domain-controller/ControlConstruct/category=controller
- Link(l) Objects(NetconfConnection and SnmpConnection) in the domain-controller/network-domain-controller/link. Two links representing netconf connection between the controller and the mediator process , SNMP connection between the mediator process and the device.
- ForwardingConstruct(FC) Object(ManagementPlaneTransportConnection) in the domain-controller/network-domain-controller/forwarding-domain. This represents the end to end connection (i.e) from the controller to the device.


### Candidate DataStore :

When the API /v1/establish-management-plane-transport is called, Interpretation module will create the following CC Object and store it in the CandiateDS.
Following Objects will be created in the Information Data Model.

#### ControlConstruc(CC) Object(Device) :
This object represents the device and its snmp-server and tcp-server. 
For schema , please refer schemas/31_Device.yaml

Example : 

For the following Request body
```json
{
  "controller-name": "ODLPrimaryController",
  "device-name": "MountA",
  "device-kind-name": "ML6352",
  "device-ip-address": "1.2.3.4"
} 
```
Following control-construct object shall be created, 

```json
{
"control-construct" : [
{
	"element-name" : "MountA",
	"category" : "device", 
	"_template" : "ML6352",
	"logical-termination-point" :
	[
		{
		"local-id" : "management",
		"layer-protocol" : [
			{
			"local-id" : "snmp-server",
			"mediator-user-name" : "openbackhaul", //refer the schema to know the source
			"mediator-password" : "openbackhaul@123", //refer the schema to know the source
			},
			{
           		"local-id" : "tcp-server",
			"local-ip-address" : "1.2.3.4" ,
			"local-port": 161 // static
                        } 
                ]
		}
	]
}
]
}
```

#### LogicalTerminationPoint(LTP) Object(MediatorProcess) :
This object represents the MediatorProcess and its netconf-server and snmp-client.
For schema , please refer schemas/22_MediatorProcess.yaml  

Example : 

For the following Request body
```json
{
  "controller-name": "ODLPrimaryController",
  "device-name": "MountA",
  "device-kind-name": "ML6352",
  "device-ip-address": "1.2.3.4"
} 
```
Following logical-termination-point object shall be created and added to the corresponding mediatorVM's CC object, 

```json
{
  "logical-termination-point": [
    {
      "local-id": "MountA",
      "layer-protocol": [
        {
          "local-id": "netconf-server"
        },
        {
          "local-id": "tcp-server",
          "local-ip-address": "1.1.3.1",
          "local-port": "8001"
        }
      ]
    }
  ]
}

```

#### LogicalTerminationPoint(LTP) Object(MountPoint) :
This object represents the MountPoint and its netconf-client and tcp-client.
For schema , please refer schemas/12_MediatorPoint.yaml  

mediator-instance-netconf-port |

Example : 

For the following Request body
```json
{
  "controller-name": "ODLPrimaryController",
  "device-name": "MountA",
  "device-kind-name": "ML6352",
  "device-ip-address": "1.2.3.4"
} 
```
Following logical-termination-point object shall be created and added to the corresponding mediatorVM's CC object, 

```json
{
  "logical-termination-point": [
    {
      "local-id": "MountA",
      "layer-protocol": [
        {
          "local-id": "netconf-client"
        },
        {
          "local-id": "tcp-client",
          "remote-ip-address": "1.1.3.1",
          "remote-port": 8001
        }
      ]
    }
  ]
}

```

### Link(l) Objects(NetconfConnection and SnmpConnection)
This object represents the connection between the netconf client and server , SNMP client and server.
For schema , please refer schemas/81_NetconfConnection.yaml and 82_SnmpConnection.yaml 

Example : 

For the following Request body
```json
{
  "controller-name": "ODLPrimaryController",
  "device-name": "MountA",
  "device-kind-name": "ML6352",
  "device-ip-address": "1.2.3.4"
} 
```
Following logical-termination-point object shall be created and added to the corresponding mediatorVM's CC object, 

```json
{
  "link": [
    {
      "local-id": "0",
      "linktp": [
        {
          "interface-type": "netconf-client",
          "_cc": "ODLPrimaryController",
          "_ltp": "MountA",
          "lp": "netconf-client"
        },
        {
          "interface-type": "netconf-server",
          "_cc": "EricssonMediatorManager", //See schema for source
          "_ltp": "MountA",
          "lp": "netconf-server"
        }
      ]
    },
    {
      "local-id": "1",
      "linktp": [
        {
          "interface-type": "snmp-client",
          "_cc": "EricssonMediatorManager", //See schema for source
          "_ltp": "MountA",
          "lp": "snmp-client"
        },
        {
          "interface-type": "snmp-server",
          "_cc": "MountA",
          "_ltp": "management", //See schema for source
          "lp": "openbackhaul" //See schema for source [Prathiba] Why this alone is different ?
        }
      ]
    }
  ]
}

```

### ForwardingConstruct(FC) Object(ManagementPlaneTransportConnection)
This object represents the connection between the netconf client and server , SNMP client and server.
For schema , please refer schemas/88_ManagementPlaneTransportConnection.yaml and 82_SnmpConnection.yaml 

Example : 

For the following Request body
```json
{
  "controller-name": "ODLPrimaryController",
  "device-name": "MountA",
  "device-kind-name": "ML6352",
  "device-ip-address": "1.2.3.4"
} 
```
Following logical-termination-point object shall be created and added to the corresponding mediatorVM's CC object, 

```json

{
  "forwarding-domain" : [
  {
	"forwarding-domain-name" : "management-plane-transport",
	"forwarding-construct" : [
		{
			"mount-name" : "MountA",
			"fctp" : [
				{
				"fctp-type" : "management-plane-transport-client",
				"_cc" : "ODLPrimaryController"		
				},
				{
				"fctp-type" : "management-plane-transport-server",
				"_cc" : "MountA"		
				}
			],
			"route" : [
				{
					"local-id" : "1",
					"_links" : [
						{
							"netconf-link" : "0"
						},
						{
							"snmp-link" : "1"
						}
					]
				}
			]
		}
		]
  }
]
}

```


### Running DataStore :

from candidate

### Monitoring

Identifies that there is no such instance exists in the operational DS and creates an alarm 

```json
{
  "alarm": {
    "affected-fc": [
      {
        "_affected-fc": "MountA", // Missing forwarding construct in the OperationalDS
        "affected-link": [
          {
            "_affected-link": "0", // NETCONF link
            "affected-cc": [
              {
                "_affected-cc": "ODLPrimaryController", // Controller in the NETCONF link
                "error": 500, // Controller is not reachable
                "affected-ltp": [
                  {
                    "_affected-ltp": "MountA", // Logical Termination Point
                    "error": "500", // Mountpoint is not available in ODL
                    "affected-lp": [
                      {
                        "_affected-lp": "netconf-client", // Logical Port
                        "error": {
                          "_error-code": "",
                          "date-of-creation": "",
                          "past-attempts-to-fix": "",
                          "date-of-next-attempt-to-fix": ""
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "_affected-cc": "EricssonMediatorManager", // Mediator in the NETCONF link
                "error": 500, // Mediator VM is not reachable
                "affected-ltp": [
                  {
                    "_affected-ltp": "MountA",
                    "error": "500", // Mediator process or NETCONF server not reachable
                    "affected-lp": [
                      {
                        "_affected-lp": "netconf-server",
                        "error": {
                          "_error-code": "",
                          "date-of-creation": "",
                          "past-attempts-to-fix": "",
                          "date-of-next-attempt-to-fix": ""
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "_affected-fc": "MountA", // Missing forwarding construct in the OperationalDS
        "affected-link": [
          {
            "_affected-link": "0", // SNMP link
            "affected-cc": [
              {
                "_affected-cc": "EricssonMediatorManager", // Mediator in the SNMP client
                "error": 500, // Mediator is not reachable
                "affected-ltp": [
                  {
                    "_affected-ltp": "MountA",
                    "error": "500", // Mountpoint is not available in ODL
                    "affected-lp": [
                      {
                        "_affected-lp": "snmp-client",
                        "error": {
                          "_error-code": "",
                          "date-of-creation": "",
                          "past-attempts-to-fix": "",
                          "date-of-next-attempt-to-fix": ""
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "_affected-cc": "MountA", // SNMP server (device)
                "error": 500, // Device IP is not reachable
                "affected-ltp": [
                  {
                    "_affected-ltp": "MountA",
                    "error": "500", // SNMP interface not accessible or reachable
                    "affected-lp": [
                      {
                        "_affected-lp": "snmp-server",
                        "error": {
                          "_error-code": "",
                          "date-of-creation": "",
                          "past-attempts-to-fix": "",
                          "date-of-next-attempt-to-fix": ""
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```
| Affected FC | Link Type | Component (CC)            | CC Error | LTP    | LTP Error | LP             | LP Error Code | Date Created | Fix Attempts | Next Fix Date |
|-------------|-----------|---------------------------|----------|--------|-----------|----------------|---------------|---------------|--------------|----------------|
| MountA      | netconf   | ODLPrimaryController      | 500      | MountA | 500       | netconf-client |               |               |              |                |
| MountA      | netconf   | EricssonMediatorManager   | 500      | MountA | 500       | netconf-server |               |               |              |                |
| MountA      | snmp      | EricssonMediatorManager   | 500      | MountA | 500       | snmp-client    |               |               |              |                |
| MountA      | snmp      | MountA                    | 500      | MountA | 500       | snmp-server    |               |               |              |                |



### Operational DataStore :

from operations

