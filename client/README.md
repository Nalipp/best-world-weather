## connect to an api
add the following to your package.json file (above scripts)
to reference your backend api address

```
  "proxy": "http://localhost:8080",
```

allows you to make a fetch request

```
componentWillMount() {
  fetch('/api/todos')
  .then(data => data.json())
  .then(todos => this.setState({todos}));
}
```
