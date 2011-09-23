/**BSD      
*
* Copyright (c) 2011, Ori Pekelman, AF83
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  */

var BetterDatalink = function() {
}

BetterDatalink.prototype.bind = function(domelement, path) {

        initialValue = this.getValueFromDom(domelement);

        $(domelement).data("graal-path", path);
        $(domelement).data("graal-initial-value", initialValue);
        $(domelement).data("graal-dirty", false);
        that=this;
        $(domelement).change( function(element) {
                that.elementChange(element);
        });
};

BetterDatalink.prototype.elementChange = function( domelement ){

        this.setDataValue (domelement, this.getValueFromDom(domelement.currentTarget));

}

BetterDatalink.prototype.getObject = function( domelement ){
        var myReturn = {};
				//Being evil
        //myReturn[$(domelement).data("graal-path")] = {};
        //compose = "myReturn." + $(domelement).data("graal-path") + "=\'" + $(domelement).data("graal-current-value")+"\'";
        //eval(compose);
        
        /* merge object2 into object1, recursively */
        //$.extend(true, object1, object2);

        return (myReturn);
}

BetterDatalink.prototype.getelementType = function( domelement )
{


        if ($(domelement).get(0)==undefined) throw "Oh My God, Couldn't find the selector in the dom"; 

        if($(domelement).get(0).tagName== "INPUT")
        {
                return $(domelement).get(0).type.toLowerCase()
        }
        else 
        {
                return $(domelement).get(0).tagName.toLowerCase() ; 
        }
}

BetterDatalink.prototype.getValueFromDom = function(domelement) {

        type = this.getelementType (domelement);

        if  (type == "checkbox" || type == "radio" ) { 
                if  ($(domelement).is(":checked"))  return  $(domelement).val() ; else return undefined;
        }
        if  ((type == "div" || type == "span" || type == "p" ) ) return  $(domelement).html();  else return undefined;

        return $(domelement).val();
}


BetterDatalink.prototype.setDataValue = function(domelement, value) {

        $(domelement).data("graal-current-value", value);

        if  ($(domelement).data("graal-initial-value") == $(domelement).data("graal-current-value") ) 
        $(domelement).data("graal-dirty", false); 
        else 
        $(domelement).data("graal-dirty", true); 

}

BetterDatalink.prototype.setValue = function(domelement, object) {

        value = eval($(domelement).data("graal-path"));

        this.setDataValue (domelement, value);

        type = this.getelementType (domelement);

        $(domelement).val( value);

        if  ((type == "div" || type == "span" || type == "p" ) ) $(domelement).html(value) ;

        if  (type == "checkbox" || type == "radio") 
        {
                console.log ("checkbox or radio, value is " + value)        

                if (value) 
                $(domelement).attr("checked","checked");
                else
                $(domelement).attr("checked","");
        }

}

/* Content Editable*/ 
$('[contenteditable]').live('focus', function() {
        var $this = $(this);
        $this.data('graal-current-value', $this.html());
        return $this;
}).live('blur keyup paste', function() {
        var $this = $(this);
        if ($this.data('graal-current-value') !== $this.html()) {
                $this.data('graal-current-value', $this.html());
                $this.trigger('change');
        }
        return $this;
});