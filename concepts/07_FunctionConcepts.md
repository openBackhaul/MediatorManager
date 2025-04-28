# Function Concepts  


### Functions shall be categorized into the following kinds of activities  
- Interpretation  
  - Abstracted intends (e.g. incoming requests or internal tasks) get translated into creation/change/deletion of concrete logical objects in the CandidateDS  
- Validation  
  - Diverse tests on the content of the CandidateDS  
  - Copying from CandidateDS to RunningDS and vice versa  
  - Orchestration of the process (choosing the correct set of tests, dealing with the composition of tests changing over time, assuring all necessary being executed,...)  
- Measurement  
  - Actual status of the managed elements gets detected and documented into the OperationalDS  
- Management  
  - Divergences between RunningDS and OperationalDS are continuously searched  
  - Detected divergences are classified into error codes and messages (results get documented and notified)  
  - Countermeasures are chosen and scheduled
  - Documentation is updated based on results of countermeasures  
- Implementation  
  - Translating divergences between RunningDS and OperationalDS into concrete creation/change/deletion operations on the managed elements  
  - Transaction management (incl. determining the sequence of operations, pre-test, try run, re-try and potential roll-back, if just a sub-set of operations could be executed successfully)  

<img src="./diagrams/CategoriesOfFunctions.png" alt="CategoriesOfFunctions" width="700" style="display: block; margin: 0 auto"/>  


### Functions shall relate to the following managed objects  
- ControllerTemplate  
- MediatorVmTemplate  
- DeviceTemplate  
- Controller  
- MediatorVm  
- ManagementPlaneTransportConnection, includes:  
  - Device  
  - mountPoint
  - SnmpConnection  
    - mediatorProcess  
  - NetconfConnection  


### Sequence Diagram Example  
The following sequence diagram describes the Function v1-create-mediator-vm-template as an example.  
(click to enlarge example)  
<img src="./diagrams/v1-create-mediator-vm-template.png" alt="exampleSequence" width="350" style="display: block; margin: 0 auto"/>  


### High Level Description  
Definition of a notation for describing functions on high level.  

```
functionName:
  type: string
public:
  type: boolean
inputs:
  type: array
  items:
    type: object
    properties:
      from:
        type: string
      to:
        type: string
outputs:
  type: array
  items:
    type: object
    properties:
      to:
        type: string
      from:
        type: string
servers:
  type: string
parameters:
  type: array
    type: string
comments:
  type: array
```

