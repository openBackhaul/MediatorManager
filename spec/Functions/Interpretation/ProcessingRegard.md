# Processing of Regard  

### Regard  

The following services  
- /v1/regard-application  
- /v1/regard-load-balancer  
- /v1/regard-controller  

shall be processed as follows:  
- copy content of RunningDS into CandidateDS  
- create logical object of specified type and category with values from RequestBody in CandidateDS  
- invoke validationOrchestrator  
- IF ResponseCode==204  
  - copy content of CandidateDS into RunningDS  
  - respond 204 to requestor  
  ELSE  
  - respond ResponseCode to requestor  

### Delete  

The following services  
- /v1/disregard-application  
- /v1/disregard-load-balancer  
- /v1/disregard-controller  

shall be processed as follows:  
- copy content of RunningDS into CandidateDS  
- identify logical object by specified type, category and key attribute value and delete if from CandidateDS  
- invoke validationOrchestrator  
- IF ResponseCode==204  
  - copy content of CandidateDS into RunningDS  
  - respond 204 to requestor  
  ELSE  
  - respond ResponseCode to requestor  

### List  

The following services  
- /v1/list-applications  
- /v1/list-load-balancers  
- /v1/list-controllers  

shall be processed as follows:  
- retrieve key attribute values of logical objects of specified type and category from RunningDS  
- respond list of key attribute values to requestor  

### Inform  

The following services  
- /v1/inform-about-application  
- /v1/inform-about-load-balancer  
- /v1/inform-about-controller  

shall be processed as follows:  
- identify logical object by specified type, category and key attribute value  
- respond values of logical object from RunningDS to requestor  

### Update  

If possible, the update function should be avoided.  
The complex validation is offset by only a small number of incidents during operation.  
There are alternative procedures to cover these incidents.  
