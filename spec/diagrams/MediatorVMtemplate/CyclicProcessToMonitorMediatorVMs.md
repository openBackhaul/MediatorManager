# CyclicProcessToMonitorMediatorVMs

practically /v1/embed-yourself puts the application to operational. 
So after receiving /v1/embed-yourself , a cyclic process shall be initiate to monitor the mediatorVMs availability.

**Forwarding**
```
forwardingName : CyclicProcessToMonitorMediatorVMs
create : /v1/regard-mediator-instance-manager 
delete : /v1/disregard-mediator-instance-manager 
input : /v1/embed-yourself 
output : /v1/list-mediator-instances
```

**profiles** : 
```
MediatorMonitoringFrequency(IntegerProfile)
MediatorMonitoringIsOn(StringProfile)
```

**Sequence** :

![your-UML-diagram-name](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/PrathibaJee/applicationPatternDummy/refs/heads/main/MediatorManager/CyclicProcessToMonitorMediatorVMs.iuml?token=GHSAT0AAAAAACXA25NICZVCPVLDUJXOWC4EZ6QAEHQ)
