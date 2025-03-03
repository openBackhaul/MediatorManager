Execution result
```
[server]$ node index.js
<?xml version="1.0" encoding="UTF-8" standalone="yes"?><rpc message-id="101" xmlns="urn:ietf:params:xml:ns:netconf:base:1.0"><get-config><source><running/></source><filter><control-construct xmlns="urn:onf:yang:core-model-1-4"><control-construct-pac xmlns="urn:onf:yang:equipment-augment-1-0"><external-label/></control-construct-pac></control-construct></filter></get-config></rpc>
]]>]]>

{"rpc_reply":{"$":{"xmlns":"urn:ietf:params:xml:ns:netconf:base:1.0","message_id":101},"data":{"control_construct":{"$":{"xmlns":"urn:onf:yang:core-model-1-4"},"control_construct_pac":{"$":{"xmlns":"urn:onf:yang:equipment-augment-1-0"},"external_label":5132500010}}}}}
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<rpc message-id="101" xmlns="urn:ietf:params:xml:ns:netconf:base:1.0">
  <close-session/>
</rpc>
]]>]]>
```