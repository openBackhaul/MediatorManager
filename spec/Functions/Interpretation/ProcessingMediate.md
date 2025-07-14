# Processing of Mediate  

### Update  

The following services  
- /v1/mediate-netconf-client-update  

shall be processed as follows:  
- copy content of RunningDS into CandidateDS  
- update object specified in RequestBody with values from RequestBody in CandidateDS  
- invoke validationOrchestrator  
- IF ResponseCode==204  
  - copy content of CandidateDS into RunningDS  
  - respond 204 to requestor  
  ELSE  
  - respond ResponseCode to requestor  
