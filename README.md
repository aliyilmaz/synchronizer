# synchronizer

This library is used to determine the fate of a form or local storage data. It periodically checks the internet connection, does not take any action if there is no connection, and repeats the operations every specified seconds if there is a connection.

## Use

Add the library between the head codes of the page.

```html
<script src="src/synchronizer.js"></script>
```

### form
An example of determining the fate of form data within the specified period. In the element section, you should use an identifier that we make sure there is only one on the page. It takes into account HTML form elements inside any HTML element that needs closing. Don't forget to define the name descriptions of the form elements.

```javascript
new synchronizer({
    'delay':'1000', // The frequency of sending the request is 1 seconds
    'source':'form', // storage, form
    'element':'div#test', // Used when selected source form
    'action': function(request) {
        // Determine the fate of the data
        console.log(request);
    } 
});
```

### storage
It is used to determine the fate of the data in Localstorage within a specified period of time. You must specify the `column` key in data type `String` or `Array` and update the `source` key to `storage`.

```javascript
new synchronizer({
    'delay':'1000', // The frequency of sending the request is 1 seconds
    'column':['setting', 'user'], // Used when selected source storage 
    'source':'storage', // storage, form
    'action': function(request) {
        // Determine the fate of the data
        console.log(request);
    } 
});
```

### info

It is not mandatory to specify the `delay` key. If `delay` is not specified, the program is run once. The `delay` must be specified in **milliseconds** (For example: 1000 for 1 second). Specifying the `action` button is mandatory.

### Scenarios:


#### form example
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form</title>
    <script src="src/synchronizer.js"></script>
</head>
<body>
    <div id="test">
        <!-- Text Input -->
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"><br><br>

        <!-- Select -->
        <label for="gender">Gender:</label>
        <select id="gender" name="gender">
            <option value="male">Male</option>
            <option value="female">Woman</option>
            <option value="other">Other</option>
        </select><br><br>

        <!-- Textarea -->
        <label for="message">Your Message:</label><br>
        <textarea id="message" name="message" rows="4" cols="50"></textarea><br><br>

        <!-- Checkbox -->
        <label for="subscribe">Subscribe:</label>
        <input type="checkbox" id="subscribe" name="subscribe" checked><br><br>

        
        <!-- Button -->
        <button type="submit" name="submit">Send</button>   
    </div>
    <script>
        
        new synchronizer({
            'delay':'1000',
            'source':'form',
            'element':'div#test',
            'action': function(request) {
                console.log(request);
            } 
        });
    </script>
</body>
</html>
```

#### storage example
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Storage</title>
    <script src="src/synchronizer.js"></script>
</head>
<body>
    <script>
        localStorage.setItem('setting', JSON.stringify({'coordinate':'39.90973623453719,32.82714843750001'}));
        localStorage.setItem('user', JSON.stringify({'username':'ali'}));

        new synchronizer({
            'delay':'1000',
            'column':['setting', 'user'],
            'source':'storage',
            'action': function(request) {
                console.log(request);
            } 
        });
    </script>
</body>
</html>
```