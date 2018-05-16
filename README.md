# losen-debugger
A debugger for losen.
#### API
* Get datas:
```
GET http://<host>/data?page=<int>&number=<int>&start=<timestamp>&end=<timestamp>
```
#### Response
```
{
  page: <int>,
  pre: <string>,
  next: <string>,
  datas: [...]
}
```
