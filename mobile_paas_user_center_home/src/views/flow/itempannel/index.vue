<template>
  <div>
    <div class="itempannel-box">
      <img
        draggable="false"
        src="data:image/svg+xml;base64,PHN2ZyAgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxODIgNzQiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojODBkYWQwO3N0cm9rZTojMDBiNGEyO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDoycHg7ZmlsbC1ydWxlOmV2ZW5vZGQ7fS5jbHMtMntmb250LXNpemU6MjRweDtmaWxsOiMzMzM7Zm9udC1mYW1pbHk6UGluZ0ZhbmdTQy1SZWd1bGFyLUdCcGMtRVVDLUgsIFBpbmdGYW5nIFNDO308L3N0eWxlPjwvZGVmcz48dGl0bGU+c3RhcnQ8L3RpdGxlPjxnIGlkPSLlm77lsYJfMiIgZGF0YS1uYW1lPSLlm77lsYIgMiI+PGcgaWQ9IuWbvuWxgl8xLTIiIGRhdGEtbmFtZT0i5Zu+5bGCIDEiPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTM3LDFIMTQ1YTM2LDM2LDAsMSwxLDAsNzJIMzdBMzYsMzYsMCwwLDEsMzcsMVoiLz48dGV4dCBjbGFzcz0iY2xzLTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY3IDQ0LjU0KSI+5byA5aeLPC90ZXh0PjwvZz48L2c+PC9zdmc+"
        data-type="node"
        data-shape="flow-capsule"
        data-size="80*36"
        data-color="#00b4a2"
        data-label="开始"
        data-name="start"
        class="getItem"
        style="width:80px;height:36px"
      >
    </div>
    <div class="itempannel-box">
      <img
        draggable="false"
        src="data:image/svg+xml;base64,PHN2ZyAgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxODIgNzQiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojOTRkMmZkO3N0cm9rZTojNTlhOWZlO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDoycHg7ZmlsbC1ydWxlOmV2ZW5vZGQ7fS5jbHMtMntmb250LXNpemU6MjRweDtmaWxsOiMzMzM7Zm9udC1mYW1pbHk6UGluZ0ZhbmdTQy1SZWd1bGFyLUdCcGMtRVVDLUgsIFBpbmdGYW5nIFNDO308L3N0eWxlPjwvZGVmcz48dGl0bGU+cmVjdGFuZ2xlMTwvdGl0bGU+PGcgaWQ9IuWbvuWxgl8yIiBkYXRhLW5hbWU9IuWbvuWxgiAyIj48ZyBpZD0i5Zu+5bGCXzEtMiIgZGF0YS1uYW1lPSLlm77lsYIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTAuODIsMUgxNzEuMThDMTc2LjYsMSwxODEsNi4zNywxODEsMTNWNjFjMCw2LjYzLTQuNCwxMi05LjgyLDEySDEwLjgyQzUuNCw3MywxLDY3LjYzLDEsNjFWMTNDMSw2LjM3LDUuNCwxLDEwLjgyLDFaIi8+PHRleHQgY2xhc3M9ImNscy0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NyA0NC41NCkiPuiKgueCuTwvdGV4dD48L2c+PC9nPjwvc3ZnPg=="
        data-type="node"
        data-shape="flow-rect"
        data-size="100*36"
        data-color="#1890FF"
        data-label="节点"
        data-name="normal"
        class="getItem"
        style="width:100px;height:36px"
      >
    </div>
    <div class="itempannel-box">
      <img
        draggable="false"
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE4NS4zOSA3NC4xNSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmNmQxOGM7c3Ryb2tlOiNmMWFiMmI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjJweDtmaWxsLXJ1bGU6ZXZlbm9kZDt9LmNscy0ye2ZvbnQtc2l6ZToyNHB4O2ZpbGw6IzMzMztmb250LWZhbWlseTpQaW5nRmFuZ1NDLVJlZ3VsYXItR0JwYy1FVUMtSCwgUGluZ0ZhbmcgU0M7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5kaWFtb25kMTwvdGl0bGU+PGcgaWQ9IuWbvuWxgl8yIiBkYXRhLW5hbWU9IuWbvuWxgiAyIj48ZyBpZD0i5Zu+5bGCXzEtMiIgZGF0YS1uYW1lPSLlm77lsYIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNOTIuNjksMS4wOGwtOTAsMzYuMzYsOTAsMzUuNjQsOTAtMzUuNjRaIi8+PHRleHQgY2xhc3M9ImNscy0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2OC42OSA0NC42MSkiPuWGs+etljwvdGV4dD48L2c+PC9nPjwvc3ZnPg=="
        data-type="node"
        data-shape="flow-rhombus"
        data-size="100*42"
        data-color="#f1ab2b"
        data-label="决策"
        data-name="decision"
        class="getItem"
        style="width:100px;height:42px"
      >
    </div>
    <div class="itempannel-box">
      <img
        draggable="false"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxODIgNzQiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojZDBiN2U5O3N0cm9rZTojYTE2ZmQ0O3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDoycHg7ZmlsbC1ydWxlOmV2ZW5vZGQ7fS5jbHMtMntmb250LXNpemU6MjRweDtmaWxsOiMzMzM7Zm9udC1mYW1pbHk6UGluZ0ZhbmdTQy1SZWd1bGFyLUdCcGMtRVVDLUgsIFBpbmdGYW5nIFNDO308L3N0eWxlPjwvZGVmcz48dGl0bGU+6LWE5rqQIDE5PC90aXRsZT48ZyBpZD0i5Zu+5bGCXzIiIGRhdGEtbmFtZT0i5Zu+5bGCIDIiPjxnIGlkPSLlm77lsYJfMS0yIiBkYXRhLW5hbWU9IuWbvuWxgiAxIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMC44MiwxSDE3MS4xOEMxNzYuNiwxLDE4MSw2LjM3LDE4MSwxM1Y2MWMwLDYuNjMtNC40LDEyLTkuODIsMTJIMTAuODJDNS40LDczLDEsNjcuNjMsMSw2MVYxM0MxLDYuMzcsNS40LDEsMTAuODIsMVoiLz48dGV4dCBjbGFzcz0iY2xzLTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQzIDQ0LjU0KSI+6L+c56iL6IqC54K5PC90ZXh0PjwvZz48L2c+PC9zdmc+"
        data-type="node"
        data-shape="flow-rect"
        data-size="100*36"
        data-color="#a16fd4"
        data-label="远程节点"
        data-name="remote"
        class="getItem"
        style="width:100px;height:36px"
      >
    </div>
    <div class="itempannel-box">
      <img
        draggable="false"
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE4MiA3NCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNlZWI5Yjg7c3Ryb2tlOiNkYzczNzA7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjJweDtmaWxsLXJ1bGU6ZXZlbm9kZDt9LmNscy0ye2ZvbnQtc2l6ZToyNHB4O2ZpbGw6IzMzMztmb250LWZhbWlseTpQaW5nRmFuZ1NDLVJlZ3VsYXItR0JwYy1FVUMtSCwgUGluZ0ZhbmcgU0M7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5zdG9wPC90aXRsZT48ZyBpZD0i5Zu+5bGCXzIiIGRhdGEtbmFtZT0i5Zu+5bGCIDIiPjxnIGlkPSLlm77lsYJfMS0yIiBkYXRhLW5hbWU9IuWbvuWxgiAxIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zNywxSDE0NWEzNiwzNiwwLDEsMSwwLDcySDM3QTM2LDM2LDAsMCwxLDM3LDFaIi8+PHRleHQgY2xhc3M9ImNscy0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NyA0NC41NCkiPue7k+adnzwvdGV4dD48L2c+PC9nPjwvc3ZnPg=="
        data-type="node"
        data-shape="flow-capsule"
        data-size="80*36"
        data-color="#dc7370"
        data-label="结束"
        data-name="end"
        class="getItem"
        style="width:80px;height:36px"
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'FlowItemPannel',
  data() {
    return {}
  }
}
</script>

<style >
.itempannel-box {
  padding-top: 30px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}
</style>
