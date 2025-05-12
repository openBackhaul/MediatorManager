# NodeJs Netconf client (POC)
## 1. Introduction
In the mounting automation, it is essential to validate whether a mediator process is operational and connected to a device. This POC outlines the approach to establishing a NETCONF interface connection from a Node.js application. By leveraging the node-netconf npm package, we can facilitate communication with NETCONF interface (mediator instance/process) and retrieve required data for validation.
## 2. Implementation
### 2.1 Using the node-netconf npm Package
The node-netconf npm package provides a way to communicate with NETCONF-enabled devices. 
It allows sending RPCs, retrieving configurations programmatically. 
### 2.2 Proof of Concept (POC)
In the index.js file, a POC has been implemented to establish a NETCONF connection. 
This POC demonstrates how to send NETCONF requests (RPCs in XML format) and fetch desired resources.
### 2.3 Extracting Device Information
As part of the POC, we retrieve the external-label attribute from the control-construct-pac of the control-construct. 
Console output is as follows, 
#### Request
```diff
[server]$ node index.js
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<rpc message-id="101" xmlns="urn:ietf:params:xml:ns:netconf:base:1.0">
<get-config>
<source><running/></source>
<filter>
<control-construct xmlns="urn:onf:yang:core-model-1-4">
<control-construct-pac xmlns="urn:onf:yang:equipment-augment-1-0">
+ <external-label/>
</control-construct-pac>
</control-construct>
</filter>
</get-config>
</rpc>
]]>]]>
```
#### Response
```diff
{"rpc_reply":
{"$":{"xmlns":"urn:ietf:params:xml:ns:netconf:base:1.0","message_id":101},
"data":
{"control_construct":
{"$":{"xmlns":"urn:onf:yang:core-model-1-4"},
"control_construct_pac":
{"$":{"xmlns":"urn:onf:yang:equipment-augment-1-0"},
+ "external_label":5132500010
}
}
}
}
}
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<rpc message-id="101" xmlns="urn:ietf:params:xml:ns:netconf:base:1.0">
  <close-session/>
</rpc>
]]>]]>
```
### 2.4 Identifying Required Resources
To perform effective validation, we must determine the specific resource that needs to be fetched from the device. 
This involves:
- Identifying the appropriate data points required for validation along with the vendors.
- Analyzing the device’s YANG model.
### 2.5 Formulating and Executing NETCONF RPCs
Once the resource is identified, a corresponding NETCONF RPC must be constructed and sent to the device. The process involves:
- Creating a properly structured NETCONF request.
- Sending the request through the NETCONF session.
- Parsing the response to extract relevant information.
