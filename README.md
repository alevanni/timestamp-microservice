
# API Project: Timestamp Microservice for FCC

### User stories :
![My preview](https://lh3.googleusercontent.com/uolh-eBsrRzsxsAOXjiF_8MouzHq9gp_3bFwOLyR5_8vXgpt7tRHxwL73B8GpTn915t-nQNYZm4a6zYj-jlO6vwX6NSgkM0m4NX7L0yU0s1FGe46l8Owb20B73yFyG98YQ1GSy9Aww=w2400)
The project can be found at: https://timestamp-microservice-for-fc.glitch.me/

1. The API endpoint is `GET [project_url]/api/timestamp/:date_string?`
2. A date string is valid if can be successfully parsed by `new Date(date_string)` (JS) . Note that the unix timestamp needs to be an **integer** (not a string) specifying **milliseconds**. In our test we will use date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure an UTC timestamp.
3. If the date string is **empty** it should be equivalent to trigger `new Date()`, i.e. the service uses the current timestamp.
4. If the date string is **valid** the api returns a JSON having the structure 
`{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
e.g. `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`.
5. If the date string is **invalid** the api returns a JSON having the structure `{"error": Invalid Date" }`.

#### Example usage:
* https://curse-arrow.hyperdev.space/api/timestamp/2015-12-15
* https://curse-arrow.hyperdev.space/api/timestamp/1450137600000

#### Example output:
* { "unix": 1450137600, "natural": "December 15, 2015" }
