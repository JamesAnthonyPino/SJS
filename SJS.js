class SJS {
    
    static #SEED = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    #USE_ENC = false;

    constructor(/*String*/key){
        if(key) {
            // TODO: add key validation
            this.KEY_MAP = {};
            this.REV_KEY_MAP = {};
            const seedAsAry = SJS.#SEED.split("");
            const keyAsAry = key.split("");
            seedAsAry.forEach((k,i)=>{
                this.KEY_MAP[k] = keyAsAry[i];
            });
    
            keyAsAry.forEach((k,i)=>{
                this.REV_KEY_MAP[k] = seedAsAry[i];
            });
            this.#USE_ENC = true;
        }
    }

    

    serialize(/*Object*/ obj) {
        const objAsJSON = JSON.stringify(obj);
        const objAsB64 = btoa(objAsJSON);
        const encrypted = this.#_encrypt(objAsB64);
        return encrypted;
    }

    deserialize(/*String*/ encStr) {
        const decrypted = this.#_decrypt(encStr);
        const decodedEncStr = atob(decrypted);
        const decodedObj = JSON.parse(decodedEncStr);
        return decodedObj;
    }


    static generateKey() {
        return SJS.#_shuffle(this.#SEED.split("")).join("");
    }


    static #_shuffle(/*Array*/array) {
        let m = array.length;
        while (m) {
          let i = Math.floor(Math.random() * m--);
          let t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
        return array;
    }


     // --- private --
     

    #_encrypt(/*String*/ unencryptedStr) {
        if(! this.#USE_ENC) {
            return unencryptedStr;
        }
        const encryptedStrAry = [];
        const unencryptedStrAsAry = unencryptedStr.split("");
        unencryptedStrAsAry.forEach((c)=>{
            encryptedStrAry.push(this.KEY_MAP[c]);
        });
        const encryptedString = encryptedStrAry.join("");
        return encryptedString;
    }

    #_decrypt(/*String*/ encryptedStr) {
        if(! this.#USE_ENC) {
            return encryptedStr;
        }
        const decryptedStrAry = [];
        const encryptedStrAsAry = encryptedStr.split("");
        encryptedStrAsAry.forEach((c)=>{
            decryptedStrAry.push(this.REV_KEY_MAP[c]);
        });
        const decryptedStr = decryptedStrAry.join("");
        return decryptedStr;
    }
}
