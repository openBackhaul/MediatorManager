# Functions Overview  

<img src="./diagrams/CategoriesOfFunctions.png" alt="CategoriesOfFunctions" width="700" style="display: block; margin: 0 auto"/>  

## Interpretation  
- Public InterpretationFunctions translate abstract requests into concrete changes to the logical objects of the internal data structure inside the CandidateDataStore. This is the only kind of Function that is publicly available at the API of the automation application.  
- Private InterpretationFunctions implement closed loop automation. They cyclically check the OperationalDS. If generically defined conditions are fulfilled, abstractly predefined countermeasures are translated into concrete changes to the logical objects in the CandidateDataStore.  

Further details on [InterpretationFunctions](./Interpretation/InterpretationFunctions.md)  

## Validation  
- ValidationFunctions analyze the data structure inside the CandidateDS for compliance with generic rules. The following subgroups can be distinguished:
  - SelfTestingFunctions analyze whether the data structure that is resulting from executing the InterpretationFunctions are free from conflicts with generic modelling rules (e.g., the Links referenced by a Route must combine to a chain between the two termination points of the FC). It is expected that these Functions can be reused in various applications. After completion of a test phase, these functions should be deactivated for performance reasons.  
  - TargetStateValidationFunctions analyze whether the data in the CandidateDS is describing a reasonable and stable target status of the administrated network. This implicitly validates the changes caused by the InterpretationFunctions in the context of the entire network.  
- The ValidationOrchestrator gets activated by the InterpretationFunctions. It executes a configurable set of ValidationFunctions specific to the respective InterpretationFunction. After successful validation, the content of the CandidateDS gets copied into the RunningDS (otherwise the CandidateDS will simply be overwritten by the RunningDS when the next cycle begins).  

Further details on [ValidationFunctions](./Validation/ValidationFunctions.md)  

## Measurement  
- MeasurementFunctions cyclically retrieve data from the Elements that are managed within the domain. Collected data is translated into concrete logical objects that build the internal data structure inside the OperationalDS. The data structures inside the CandidateDS, RunningDS and OperationalDS are build from the same classes. In an ideal and stable situation, they should be identical.  

Further details on [MeasurementFunctions](./Measurement/MeasurementFunctions.md)  

## Monitoring  
- MonitoringFunctions cyclically compare the data structures inside the RunningDS and the OperationalDS. Depending on the type of deviation found, entries are generated in the internal AlarmList. Each entry is described by an ErrorCode.  

Further details on [MonitoringFunctions](./Monitoring/MonitoringFunctions.md)  

## Implementation  
- ImplementationFunctions execute a specific configuration activity on one kind of the Elements that are managed within the domain. It documents the result of the configuration attempt and the next step into the AlarmList.  
- The ImplementationOrchestrator cyclically checks the AlarmList for entries. If an entry is found, it invokes the ImplementationFunction associated with the ErrorCode. The association between ErrorCode and its respective ImplementationFunction is configurable.  

Further details on [ImplementationFunctions](./Implementation/ImplementationFunctions.md)  
