# SJS: Secure JSON Serializer

SJS is a simple and secure way to exchange JSON between applications. SJS can be used with or without its built-in encryption.

## The Problem
Passing data back and forth between applications is difficult and can expose sensitive data, especially when used as a URL parameter. Parsing and handing URL query parameters is tedious and error-prone, and does not accomodate nested or complex data structures. Even when converted to plain JSON, you can end up with non-standard characters, character encoding issues, delimiter issues, and clearly visible data.

## The Solution
While JavaScript natively supports serialization (JSON is a serialized form of a JavaScipt object), SJS solves this by converting that native JavaScript object to a base64 string (unreadable to humans), and then optionally encrypting that string. This is especially useful for passing data in `GET` API calls as query parameters, e.g.:

```
https://my.app.com?data=UXkzRD0Fs34fb=6tlcqfA1kNvpsfEfsJAhIaqHN2q1s/sB9hvfsos3IXqXrr9HRt9hK2q1kO
```

Even if someone were to attempt to decode this string, it would not be possible since it is encrypted.

### Known Limitations
1. No encryption scheme is perfect. This should not be used for transferring secret data
1. URL character limits in some browsers may limit the amount of data you can pass



## Usage

1. Generate a key -- this is a key you will use to encrypt and decrypt the JSON. This can be shared with other consumers or just used within your own application.

```javascript
const key = SJS.generateKey();

// key should look something like:
// WY1gI65QskxAq9EeCLbHP7DcRlZvTyUnKdf3NF=B4Vj8/tzaMJXhr0pSm2ouGOi+w
```
2. Serialize and encrypt:

```javascript
// should be same key generated above
const sjs = new SJS(key);
const someObj = {
    name: "Bob",
    dob: "1/1/1990",
    ssn: "123-456-7890"
}
const serializedObj =  sjs.serialize(someObj);

// serializedObj is somehting like:
// UXkzRD0Fs34fb=6tlcqfA1kNvpsfEfsJAhIaqHN2q1s/sB9hvfsos3IXqXrr9HRt9hK2q1kO
```

3. Decrypt and deserialize:
```javascript
// should be same key generated above
const sjs = new SJS(key); 

// Should be the same serialized object from above
const deserialized =  sjs.deserialize(serializedObj); 

// output:
// {name: 'James', dob: '1/1/1990', ssn: '123-456-7890'}
```


## Usage Without Encryption
If you don't need to encrypt your serialized JSON, you can use SJS without encryption by initializing an instance *without* a key:

1. Serialize: The output will be a standard base64-encoded string.
```javascript
const sjs = new SJS();
const someObj = {
    name: "Bob",
    dob: "1/1/1990",
    ssn: "123-456-7890"
}
const serializedObj =  sjs.serialize(someObj);

// serializedObj is something like:
// nI7ATB10KN6MbSHvjyzMlw7uLYKMxMK3lZeGzouqzwK2Kp9ZLMKOKNeIzIQQ9oTv9Zrqzw78
```

2. Deserialize: The inout will be the previously serialized standard base64-encoded string.
```javascript
const sjs = new SJS();
// Should be the same serialized object from above
const deserialized =  SJS.deserialize(serializedObj);

// Output:
// {name: 'James', dob: '1/1/1990', ssn: '123-456-7890'}
```
## Development
Originally developed by James Pino. If you want to contibute, please see the GitHub page associated with this project.

Clone the source to your local system and run locally. There is no build or local server to run. Rudeimentary tests are located in **tests.js**.


## License
This software is free and open source and is covered under the generic MIT License. See the LICENSE file included in this repository.

