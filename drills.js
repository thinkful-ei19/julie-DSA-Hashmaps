class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0;
        this._slots = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._slots[index] === undefined) {
            throw new Error('Key error');
        }
        return this._slots[index].value;
    }

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }

        const index = this._findSlot(key);


        //if key exists change value but not length
        //if not add value and change length
        // console.log('key is ', key);
       
        if(!this._slots[index]){
            this.length++;
        } 
            this._slots[index]={
                key,
                value,
                deleted: false
            }

        // console.log('length is ', this.length);
        // console.log('value is ', value);

    }

    remove(key) {
        const index = this._findSlot(key);
        const slot = this._slots[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.deleted = true;
        this.length--;
        this._deleted++;
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        for (let i=start; i<start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._slots[index];
            if (slot === undefined || (slot.key == key && !slot.deleted)) {
                return index;
            }
        }
    }

    _resize(size) {
        const oldSlots = this._slots;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._slots = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.deleted) {
                this.set(slot.key, slot.value);
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i=0; i<string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

function main() {
   let lor = new HashMap(); 
    lor.set('Hobbit', 'Bilbo');
    lor.set('Hobbit', 'Frodo');
    lor.set('Wizard', 'Gandolf');
    lor.set('Human', 'Aragon');
    lor.set('Elf', 'Legolas');
    lor.set('Maiar', 'The Necromancer');
    lor.set('Maiar', 'Sauron');
    lor.set('RingBearer', 'Gollum');
    lor.set('LadyOfLight', 'Galadriel');
    lor.set('HalfElven', 'Arwen');
    lor.set('Ent', 'Treebeard');
    // console.log(lor);
    // console.log(lor.get('Maiar'));
    //if you have same key, it will override value for key. won't insert new item
    //so length won't change 
}
main();

function containsKey(hashMap, key) {
    for (let i = 0; i<hashMap._slots.length; i++) {
        if(hashMap.get(key)){
            return true;
        } 
    }
    return false;
}

function palindrome(string) {
    let pal = new HashMap();
    //every single character in string will be even
    //only one character is going to be odd
    //split strings into letters
    //key would be each letter
    //value would be 1, and increment it
    //hash based on string 
    let count = 0;
    let item = string.split('');
    console.log(item)
    for (let i = 0; i < item.length; i++) {
        let container = pal.get(item[i]);
        console.log(container);
        // pal.set(item[i], value+1)
        // console.log(container);
        // if(container % 2 !== 0) {
        //     count ++;
        // }
        // if(count > 1) {
        //     return false;
        // }
        return true;
    }
}

palindrome('racecar');








function anagram(array) {
    //objects with keys
    //return array of anagrams 
}










