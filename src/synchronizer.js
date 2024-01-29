
class synchronizer {
    constructor(conf={}) {

      this.delay = (conf.delay !== undefined) ? conf.delay : 15000;
      this.column = (conf.column !== undefined) ? conf.column : [];  
      this.element = (conf.element !== undefined) ? conf.element : null;  
      this.source = (conf.source !== undefined) ? conf.source : null;  
      
      if(this.source === 'form' && !this.isHtmlElement(this.element)) return;
      if(!this.isSource(this.source)) return;

      this.action = (conf.action !== undefined) ? conf.action : null;
      if(!this.isFunction(this.action)) return;

      this.request = this.dataCompiler(this.column);            
      this.run();

    }
    
    isOnline() {
        return navigator.onLine;
    }

    isArray(data){
        return Array.isArray(data);
    }

    isLocalStorageKeyExist(key) {
        return localStorage.getItem(key) !== null;
    }

    isString(data) {
        return typeof data === 'string' || data instanceof String;
    }

    isFunction(func) {
        return typeof func === 'function';
    }

    isSource(source) {
        return (['form', 'storage'].includes(source));
    }

    isHtmlElement(element) {
        if(document.querySelector(element) !== null){
            return true;
        } 
        return false;
    }

    dataCompiler(data){
        let request = {};

        if(this.source === 'storage'){

            if(this.isArray(data) && this.isOnline()){
                data.forEach((name)=>{
                    if(this.isLocalStorageKeyExist(name)){
                        request[name] = JSON.parse(localStorage.getItem(name));
                    }
                });            
            }
            if(this.isString(data) && this.isOnline()){
                if(this.isLocalStorageKeyExist(data)){
                    request[data] = JSON.parse(localStorage.getItem(data));  
                }          
            }

        }

        if(this.source === 'form' && this.isOnline()){
            request = JSON.parse(this.serialize(this.element));
        }

        return request;
    }
    serialize(element){
        var obj = {};
        var elements = document.querySelector(element).querySelectorAll( "input, select, textarea, button" );
        for( var i = 0; i < elements.length; ++i ) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;
    
            if( name ) {
                obj[ name ] = value;
            }
        }
        return JSON.stringify( obj );
    }
    async run(){
        while (true) {
            this.request = this.dataCompiler(this.column);        
            await this.action(this.request); // Call the function
            await this.sleep(this.delay);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
