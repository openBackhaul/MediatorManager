### Validation  
- p1-validation-orchestrator  
  - Calls a configurable set of ValidationTestFunctions listed below  
  - IF all ResponseCodes==204  
    - Responds 204  
    ELSE  
    - Responds the first ResponseCode different from 204 and terminates  


    _Table with relations between InterpretationFunction and ValidationTests to be added_

_(See the following entries as examples. List of ValidationTestFunctions is to be defined by ApplicationOwner:)_  


  - check all ManagementPlaneTransport (FC) for existing termination points (CC) in CandidateDS  
  - check all Routes at all FCs for existing Links in CandidateDS  

- p1-ensure-unique-template-names  
  Ensures that all Profile definitions have unique template-names  
- p1-ensure-all-elements-referencing-an-existing-template  
  Ensures that all Profile definitions have unique template-names  
- p1-ensure-all-existing-controllers-complying-with-template-definition  
  Ensures that updated template is not in conflict with existing controllers  
- p1-ensure-all-existing-mediator-vms-complying-with-template-definition  
  Ensures that updated template is not in conflict with existing mediatorVms  
- p1-ensure-all-existing-devices-complying-with-template-definition  
  Ensures that updated template is not in conflict with existing devices  
- p1-ensure-unique-element-names  
  Ensures that all CC definitions have unique element-names  
- p1-ensure-all-cc-referenced-by-fc-in-operational-exist-in-candidate  
  Ensures that no CC of an operational FC gets deleted  
- p1-ensure-all-lp-referenced-by-link-in-operational-exist-in-candidate  
  Ensures that no LP of an operational Link gets deleted  
- p1-ensure-unique-local-ids-at-links  
  Ensures that the local-ids at links are unique  
- p1-ensure-unique-mount-names-at-fcs  
  Ensures that there is just a single FC per MountName  
- p1-ensure-every-fc-having-at-least-one-route  
  Ensures every FC being routed
- p1-ensure-every-route-connecting-end-to-end
  Ensures every route referencing the links necessary for a path between the endpoints of the FC  