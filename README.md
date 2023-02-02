Delete this link at the end of the specification process:  
- [Roadmap to Specification](../../issues/1)

# MediatorManager

### Location
The MediatorManager is part of the OperationSupport.

### Description
The MediatorManager decides about which MediatorInstanceManager to be addressed for provisioning of a mediator process for an individual device. It is regarding device type and e.g. load balancing criteria. Future versions might support re-allocation of mediator processes based on planned operational activities like replacement of a mediator virtual machine or unplanned events like failure of a mediator virtual machine.

### Relevance
The MediatorManager is required for connecting devices to the controller.

### Resources
- [Specification](./spec/)
- [TestSuite](./testing/)
- [Implementation](./server/)

### Comments
This application will be specified during [training for ApplicationOwners](https://gist.github.com/openBackhaul/5aabdbc90257b83b9fe7fc4da059d3cd).
