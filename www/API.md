# API - ExplainShell Trends

## POST `/api/click/`

### Request (`application/json`)

```javascript
{
  url: <string>         // full URL where extension got a click
}
```

### Response (`text/plain`)

- 200 - OK
- 500 - Database insert failed

## GET `/api/clicks/`

### Response (`application/json`)

```javascript
[
  {
    "url": <string>,      // full URL where extension got a click
    "timestamp": <Date>,  // JavaScript Date() object
    "domain": <string>    // Domain name from URL
  }
]
```
## GET `/api/top/:field/`

Used to aggregate the field given with counts

### Request

- `:field` - one of `urls` or `domains` (note the 's')

### Reponse (`application/json`)

```javascript
[
  {
    ":field": <string>,  // :field is the string from the URL,
                         // mapping to a unique identifier for that field
    "count": <int>       // Number of entries for that id
  }
]
```
