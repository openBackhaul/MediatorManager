# /v1/disregard-mediator-instance-manager

This service is used to mark a MediatorInstanceManager as PENDING_REMOVAL in the APPData.

**Request body**:
```json
    {
        "mediator-instance-name" : "EricssonMediatorVMOne",
        "mediator-instance-release-number" : "1.0.0"
    }
```
**Response body** :
NA

**Response Code** :
204 (other usual response codes)

**Sequence diagram** :

![your-UML-diagram-name](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/PrathibaJee/applicationPatternDummy/refs/heads/main/MediatorManager/disregardMediatorInstanceManager.iuml?token=GHSAT0AAAAAAC72XVCRQ6C2MED5MFPBXDS4Z6P2TSA)
