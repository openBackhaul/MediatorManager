# /v1/regard-mediator-vm

## Purpose :
To include MediatorVM details to the DeviceDomainManager(DDM) application's configuration as well as information data model.
MediatorVM hosts MediatorInstanceManager(MIM) application to expose REST APIs to create, delete and list mediator processes.
DDM communicates with MIM to manage mediator processes.

## Configuration file :
In the configuration file, the details of the MIM and its operations will be stored to facilitate the REST interaction.

## Information Data Model :

Every MediatorVM will be represented as a ControlConstruct(CC) Object in the domain-controller/network-domain-controller/ControlConstruct array. 

### Candidate DataStore :

When the API /v1/regard-mediator-vm is called, Interpretation module will create the following CC Object and store it in the CandiateDS.
MediatorVM's CC will hold 2 types of LogicalTerminationPoint(LTP). The 1st LTP will hold the information of the mediatorVM itself where as the rest of the LTPs hold information about the mediator processes created in this mediatorVM. So, while receiving the /v1/regard-mediator-vm request, the CC object will be intiated with the 1st LTP as per the below mapping.


| Field Path                          | Derived From                                                                                                                                                                           |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| element-name                        | request.body#mediator-vm-name                                                                                                                                                           |
| category                            | **Static**: "mediatorVm"                                                                                                                                                                    |
| _template                           | request.body#mediator-vm-template-name                                                                                                                                                  |
| ltp[0].local-id                     | **Static**: "mediator-instance-manager"                                                                                                                                                     |
| ltp[0].lp[0]."server-name"            | **Static**: "mim-operation-server-create"                                                                                                                                                   |
| ltp[0].lp[0].operation-name         | /network-control-domain=candidate/profile=[request.body#_template]/provide-mediator-instance-operation-name                                                                             |
| ltp[0].lp[1]."server-name"            | **Static**: "mim-operation-server-dismantle"                                                                                                                                                |
| ltp[0].lp[1].operation-name         | /network-control-domain=candidate/profile=[request.body#_template]/dismantle-mediator-instance-operation-name                                                                           |
| ltp[0].lp[2]."server-name"            | **Static**: "mim-operation-server-list"                                                                                                                                                     |  |
| ltp[0].lp[2].operation-name         | /network-control-domain=candidate/profile=[request.body#_template]/list-mediator-instances-operation-name                                                                               |
| ltp[0].lp[3]."server-name"            | **Static**: "mim-http-server"                                                                                                                                                               |
| ltp[0].lp[3].mediator-user-name     | request.body#mediator-user-name or fallback from /network-control-domain=candidate/profile=[_template]/default-mediator-user=[*]/default-mediator-user-name which is not in use         |
| ltp[0].lp[3].mediator-user-password | request.body#mediator-user-password or fallback from /network-control-domain=candidate/profile=[_template]/default-mediator-user=[*]/default-mediator-user-password which is not in use |
| ltp[0].lp[4]."server-name"            | **Static**: "mim-tcp-server"                                                                                                                                                                |
| ltp[0].lp[4].local-ip-address       | request.body#mediator-vm-ip-address                                                                                                                                                     |
| ltp[0].lp[4].local-port             | request.body#mediator-vm-port       
| ltp[1..n].lp[0].local-port             | request.body#mediator-vm-port                                                                                                                                                      |

Example : 

For the following Request body
```json
{
  "mediator-vm-name": "EricssonMediatorManager",
  "mediator-vm-number": "1.0.1",
  "mediator-vm-template-name": "EricssonMediatorTemplate",
  "mediator-user": {
    "mediator-user-name": "openbackhaul",
    "mediator-user-password": "openbackhaul@123"
  },
  "mediator-vm-protocol": "HTTP",
  "mediator-vm-ip-address": "1.1.3.1",
  "mediator-vm-port": 3001
} 
```
Following control-construct object shall be created, 

```json
control-construct : [
{
	"element-name" : "EricssonMediatorManager",
	"category" : "mediatorVm", 
	"_template" : "EricssonMediatorTemplate",
	"logical-termination-point" : [
	{
		"local-id" : "mediator-instance-manager",
		"layer-protocol" : [
			{
			"server-name" : "mim-operation-server-create",
			"operation-name" : "/v1/provide-mediator-instance" //from associated template
			},
			{
			"server-name" : "mim-operation-server-dismantle",
			"operation-name" : "/v1/dismantle-mediator-instance" //from associated template
			},
			{
			"server-name" : "mim-operation-server-list",
			"operation-name" : "/v1/list-mediator-instances" //from associated template
			},
			{
			"server-name" : "mim-http-server",
			"mediator-user-name" : "openbackhaul", //if not provided, then value shall be taken from the associated template 
			"mediator-user-password" : "openbackhaul@123" //if not provided, then value shall be taken from the associated template 
			},
			{
            "server-name" : "mim-tcp-server",
			"local-address" : "1.1.3.1" ,
			"local-port": 3001
            } 
			]
	}
	]
}
]

```

#### validation
1. ping test

Note : no service reachability test will be done

### Running DataStore :

from candidate

### Operational DataStore :

from running

Query : 
In the last call we discussed about having update APIs separate and not making create as idempotence. but this may create a problem that 
if already a mediator VM is created, then again a duplication will be created in the candidateDS and post the validation module this information will be removed, this is unnessary and the idempotence shall be retained.

