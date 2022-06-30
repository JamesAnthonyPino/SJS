    console.clear();
    test_1();

    function test_1() {
        const key = SJS.generateKey();
        assert("Key is a string", typeof key  === "string");
        assert("Key length is correct", key.length === 65);
        
        
        const sjs = new SJS(key);
        const someObj = {
            name: "James",
            dob: "1/1/1990",
            ssn: "123-456-7890"
        }
        
        const serializedObj =  sjs.serialize(someObj);
        assert("Serialized result is a string",typeof typeof serializedObj === "string");
        assert("Serialized length is correct",serializedObj.length) === 72;

        
    
        // -------------
        const key2 = SJS.generateKey();
        const sjs2 = new SJS(key);
        const q2 =  sjs2.deserialize(serializedObj);
        
        console.log("q2",q2);
        
        
        // ---
        
        function assert(message, condition) {
            if (!condition) {
                console.error(`FAILED: ${message}`);
            } else {
                console.log(`%cPASS:  ${message}`, 'color: green');
            }
        }
    }

