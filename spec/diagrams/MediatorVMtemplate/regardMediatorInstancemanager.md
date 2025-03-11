# /v1/regard-mediator-instance-manager

This service is used to create or update a MediatorInstanceManager to the MediatorManager application.

**Request body** :
```json
    {
        "mediator-instance-name" : "EricssonMediatorVMOne",
        "mediator-instance-release-number" : "1.0.0"
        "mediator-vm-template-name" : "EricssonMLTNTemplate"
        "mediator-instance-manager-protocol" : "HTTP"
        "mediator-instance-manager-ip-address" : "127.0.0.1"
        "mediator-instance-manager-port" : 3000
    }
```
> Notes :
	Without the attributes mediator-instance-name, mediator-instance-release-number , the http-client instance uniqueness shall be compromised.

**Response body** :
NA

**Response Code** :
204 (other usual response codes)

**APPData** :
Schema to be generated based on https://github.com/openBackhaul/MediatorManager/blob/v1.0.0_spec/concepts/schemas/MediatorVmSchema.yaml and updated to the ElasticSearch

**Sequence diagram** :

![your-UML-diagram-name](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/openBackhaul/MediatorManager/refs/heads/v1.0.0_spec/spec/diagrams/MediatorVMtemplate/regardMediatorInstanceManager.iuml)
