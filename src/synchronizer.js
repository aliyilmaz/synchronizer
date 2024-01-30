class synchronizer {
    constructor(conf={}) {

      this.online = (conf.online !== undefined) ? conf.online : false;
      this.delay = (conf.delay !== undefined) ? conf.delay : null;
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

            if(this.isArray(data)){
                data.forEach((name)=>{
                    if(this.isLocalStorageKeyExist(name)){
                        request[name] = localStorage.getItem(name);
                    }
                });            
            }
            if(this.isString(data)){
                if(this.isLocalStorageKeyExist(data)){
                    request[data] = localStorage.getItem(data); 
                }          
            }
                       
        }

        if(this.source === 'form'){
            request = this.serialize(this.element);
        }

        return request;
    }
    serialize(element){
        return new FormData(document.querySelector(element));
    }
    async run(){
        let internet = true;
        while (true) {  
            internet = (this.online === true && this.isOnline() === false) ? false : true;

            if(internet){
                this.request = this.dataCompiler(this.column);        
                await this.action(this.request); // Call the function  
            }
          
            if(this.delay === null) return;
            await this.sleep(this.delay);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
