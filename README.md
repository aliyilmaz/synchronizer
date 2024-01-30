# synchronizer

This library is used to determine the fate of a form or local storage data.

## Use

Add the library between the head codes of the page.

```html
<script src="src/synchronizer.js"></script>
```

### form
An example of determining the fate of form data within the specified time.It takes into account the specified form element.

```javascript
new synchronizer({
    'online':true,
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
    'online':true, // When there is no internet connection, `true` is specified to wait
    'delay':'1000', // The frequency of sending the request is 1 seconds
    'column':['setting', 'user'], // Used when selected source storage 
    'source':'storage', // storage, form
    'action': function(request) {
        // Determine the fate of the data
        console.log(request);
    } 
});
```

### Additional info:

It is not mandatory to specify the `delay` key. If `delay` is not specified, the program is run once. `delay` must be specified in **milliseconds** (For example: 1000 for 1 second). Specifying the `action` button is mandatory. The `online` key does not have to be specified. If the `online` switch is specified as `true`, the program will not run until there is internet.

### Scenarios:


#### form example
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form</title>
    <!-- <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script> -->
    <script src="src/synchronizer.js"></script>
</head>
<body>
    <form id="test">
        <!-- Text Input -->
        <label for="name">Name:</label>
        <input type="text" name="name" autocomplete="off" id="name" ><br><br>

        <!-- Select -->
        <label for="gender">Gender:</label><br>
        <select id="gender" name="gender">
            <option value="male">Male</option>
            <option value="female">Woman</option>
            <option value="other">Other</option>
        </select><br><br>

        <!-- Multi Select -->
        <label for="sport">Sport:</label><br>
        <select name="sport[]" id="sport" multiple>
            <option value="swimming">Swimming</option>
            <option value="hiking">Hiking</option>
            <option value="soccer">Soccer</option>
        </select><br><br>

        <!-- Textarea -->
        <label for="message">Your Message:</label><br>
        <textarea id="message" name="message" rows="4" cols="50"></textarea><br><br>

        <!-- Checkbox -->
        <label for="subscribe">Subscribe:</label><br>
        <input type="checkbox" id="subscribe" name="subscribe" checked><br><br>
        
        <!-- Multi Checkbox -->
        <span>Groups:</span><br>
        <input type="checkbox" name="groups" value="user"> User <br>
        <input type="checkbox" name="groups" value="editor"> Editor <br>
        <input type="checkbox" name="groups" value="admin"> Admin <br>
        <br>

        <!-- Radio -->
        <span>Appointment day:</span><br>
        <input type="radio" name="appointment_day" value="Monday"> Monday <br>
        <input type="radio" name="appointment_day" value="Tuesday"> Tuesday <br>
        <input type="radio" name="appointment_day" value="Wednesday"> Wednesday <br>
        <input type="radio" name="appointment_day" value="Thursday"> Thursday <br>
        <input type="radio" name="appointment_day" value="Friday"> Friday <br>
        <input type="radio" name="appointment_day" value="Saturday"> Saturday <br>
        <input type="radio" name="appointment_day" value="Sunday"> Sunday <br><br>

        <!-- File -->
        <label for="single_file">File:</label><br>
        <input type="file" name="single_file" id="single_file"><br><br>

        <!-- Files -->
        <label for="multi_files">Files:</label><br>
        <input type="file" name="multi_files[]" id="multi_files" multiple><br><br>
        
        <!-- Button -->
        <button type="submit" name="submit">Send</button>   
    </form>
    <script>
        
        new synchronizer({
            'online':true,
            'delay':'4000',
            'source':'form',
            'element':'form#test',
            'action': function(request) {  
                    
                //  With Axios or another Javascript library
                //  you can send the Request object  

                /*
                axios.post('form.php', request)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
                */
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
    <!-- <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script> -->
    <script src="src/synchronizer.js"></script>
</head>
<body>
    <script>
        localStorage.setItem('setting', JSON.stringify({'coordinate':'39.90973623453719,32.82714843750001'}));
        localStorage.setItem('user', JSON.stringify({'username':'ali'}));

        new synchronizer({
            'online':true,
            'delay':'4000',
            'column':['setting', 'user'],
            'source':'storage',
            'action': function(request) {
                
                //  With Axios or another Javascript library
                //  you can send the Request object 

                //  console.log(request);  

                /*
                axios.post('form.php', request)
                .then(function (response) {
                    let data = JSON.parse(response.data);
                    console.log(data);
                })
                .catch(function (error) {
                    console.log(error);
                });
                */
            } 
        });
    </script>
</body>
</html>
```