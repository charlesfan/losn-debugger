# losen-debugger
A debugger for losen.
#### API
* Get datas:
```
GET http://<host>/data/dev/firmware?page=<int>&number=<int>&start=<timestamp>&end=<timestamp>&desc=<boolean>
```
* Get devices:
```
GET http://<host>/device/info/list?uuid=<string>&stationUUID=<string>&fwVersion=<string>&ipAddress=<string>
```
* Add one device:
```
POST "Content-Type: application/json" http://<host>/device -d '{"uuid": <string>, "stationUUID": <string>}'
```
* Remove one device:
```
DELETE http://<host>/device?uuid=<string>
```
* Get stations:
```
GET http://<host>/station/info/list
```
* Get stations(empty):
```
GET http://<host>/station/info/list/empty?lineUUID=<string>
```
* Get lines:
```
GET http://<host>/line/info/list
```
* Update a device:
```
PUT "Content-Type: application/json" http://<host>/device/info/:deviceUUID -d '{"stationUUID": <string>, "fwVersion": <string>}'
```
#### Response(Get datas)
```
{
  page: <int>,
  number: <int>,
  pre: <string>,
  next: <string>,
  datas: [
    {
      page: <int>,
      number: <int>,
      pre: <string>,
      next: <string>,
      datas: [...]
    }
  ]
}
```
example:
```
{
  page: 1,
  number: 3,
  pre: '',
  next: '/data/dev/firmware?page=2&number=3&start=1526523044&end=1526523532',
  datas: [
    {
      Station_GUID: 'LOSN-607990', 
      Checkin_time: '2018-05-17 10:04:22.000', 
      Checkout_time: 2018-05-17 10:04:32.000, 
      Interval_sec: 10, 
      RFID_ID: '27 F4 AD C2'
    },
    {
      Station_GUID: 'LOSN-607b21', 
      Checkin_time: '2018-05-17 10:04:23.000', 
      Checkout_time: 2018-05-17 10:04:37.000, 
      Interval_sec: 15, 
      RFID_ID: '87 9B F0 E3'
    },
    {
      Station_GUID: 'LOSN-60895e', 
      Checkin_time: '2018-05-17 10:04:24.000', 
      Checkout_time: 2018-05-17 10:04:38.000, 
      Interval_sec: 14, 
      RFID_ID: '12 8D A2 C2'
    }
  ]
}
```
#### Start
Cloen project and get node modules:
```
$ git cloen https://github.com/charlesfan/losen-debugger.git
$ cd losen-debugger && npm install
```
Set up env:
```
$ export DB_HOST=192.168.XX.XX
$ export DB_PASSWORD=XXXXXX
$ export DB_USER=UserName
```
Start server:
```
$ node app server
```

#### Request Params
* guid(default: all device)
* page(default: 1)
* number(default: 100)
* Interval_sec
* desc(default: false)
* start(unix time)
* end(unix time)
