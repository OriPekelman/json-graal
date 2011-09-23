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

/**
*  This file is the beginning of a json schema to annotated schema generations
*/

var address = {
	"description" : "An Address following the convention of http://microformats.org/wiki/hcard",
	"type" : "object",
	"properties" : {
		"post-office-box" : { "type" : "string" },
		"extended-address" : { "type" : "string" },
		"street-address" : { "type":"string" },
		"locality" : { "type" : "string", "required" : true },
		"region" : { "type" : "string", "required" : true },
		"postal-code" : { "type" : "string" },
		"country-name" : { "type" : "string", "required" : true }
	},
	"dependencies" : {
		"post-office-box" : "street-address",
		"extended-address" : "street-address",
		"street-address" : "region",
		"locality" : "region",
		"region" : "country-name"
	}
};

var card= {
   "description":"A representation of a person, company, organization, or place",
   "type":"object",
   "properties":{
      "fn":{
         "description":"Formatted Name",
         "type":"string"
      },
      "familyName":{
         "type":"string",
         "required":true
      },
      "givenName":{
         "type":"string",
         "required":true
      },
      "additionalName":{
         "type":"array",
         "items":{
            "type":"string"
         }
      },
      "honorificPrefix":{
         "type":"array",
         "items":{
            "type":"string"
         }
      },
      "honorificSuffix":{
         "type":"array",
         "items":{
            "type":"string"
         }
      },
      "nickname":{
         "type":"string"
      },
      "url":{
         "type":"string",
         "format":"url"
      },
      "email":{
         "type":"object",
         "properties":{
            "type":{
               "type":"string"
            },
            "value":{
               "type":"string",
               "format":"email"
            }
         }
      },
      "tel":{
         "type":"object",
         "properties":{
            "type":{
               "type":"string"
            },
            "value":{
               "type":"string",
               "format":"phone"
            }
         }
      },
      "adr":{"$ref" : "http://json-schema.org/address"},
      "geo":{"$ref" : "http://json-schema.org/geo"},
      "tz":{
         "type":"string"
      },
      "photo":{
         "format":"image",
         "type":"string"
      },
      "logo":{
         "format":"image",
         "type":"string"
      },
      "sound":{
         "format":"attachment",
         "type":"string"
      },
      "bday":{
         "type":"string",
         "format":"date"
      },
      "title":{
         "type":"string"
      },
      "role":{
         "type":"string"
      },
      "org":{
         "type":"object",
         "properties":{
            "organizationName":{
               "type":"string"
            },
            "organizationUnit":{
               "type":"string"
            }
         }
      }
   }
};


var geo={
	"description" : "A geographical coordinate",
	"type" : "object",
	"properties" : {
		"latitude" : { "type" : "number" },
		"longitude" : { "type" : "number" }
	}
};

var jsonschema={
	"$schema" : "http://json-schema.org/draft-03/schema#",
	"id" : "http://json-schema.org/draft-03/schema#",
	"type" : "object",
	
	"properties" : {
		"type" : {
			"type" : ["string", "array"],
			"items" : {
				"type" : ["string", {"$ref" : "#"}]
			},
			"uniqueItems" : true,
			"default" : "any"
		},
		
		"properties" : {
			"type" : "object",
			"additionalProperties" : {"$ref" : "#"},
			"default" : {}
		},
		
		"patternProperties" : {
			"type" : "object",
			"additionalProperties" : {"$ref" : "#"},
			"default" : {}
		},
		
		"additionalProperties" : {
			"type" : [{"$ref" : "#"}, "boolean"],
			"default" : {}
		},
		
		"items" : {
			"type" : [{"$ref" : "#"}, "array"],
			"items" : {"$ref" : "#"},
			"default" : {}
		},
		
		"additionalItems" : {
			"type" : [{"$ref" : "#"}, "boolean"],
			"default" : {}
		},
		
		"required" : {
			"type" : "boolean",
			"default" : false
		},
		
		"dependencies" : {
			"type" : "object",
			"additionalProperties" : {
				"type" : ["string", "array", {"$ref" : "#"}],
				"items" : {
					"type" : "string"
				}
			},
			"default" : {}
		},
		
		"minimum" : {
			"type" : "number"
		},
		
		"maximum" : {
			"type" : "number"
		},
		
		"exclusiveMinimum" : {
			"type" : "boolean",
			"default" : false
		},
		
		"exclusiveMaximum" : {
			"type" : "boolean",
			"default" : false
		},
		
		"minItems" : {
			"type" : "integer",
			"minimum" : 0,
			"default" : 0
		},
		
		"maxItems" : {
			"type" : "integer",
			"minimum" : 0
		},
		
		"uniqueItems" : {
			"type" : "boolean",
			"default" : false
		},
		
		"pattern" : {
			"type" : "string",
			"format" : "regex"
		},
		
		"minLength" : {
			"type" : "integer",
			"minimum" : 0,
			"default" : 0
		},
		
		"maxLength" : {
			"type" : "integer"
		},
		
		"enum" : {
			"type" : "array",
			"minItems" : 1,
			"uniqueItems" : true
		},
		
		"default" : {
			"type" : "any"
		},
		
		"title" : {
			"type" : "string"
		},
		
		"description" : {
			"type" : "string"
		},
		
		"format" : {
			"type" : "string"
		},
		
		"divisibleBy" : {
			"type" : "number",
			"minimum" : 0,
			"exclusiveMinimum" : true,
			"default" : 1
		},
		
		"disallow" : {
			"type" : ["string", "array"],
			"items" : {
				"type" : ["string", {"$ref" : "#"}]
			},
			"uniqueItems" : true
		},
		
		"extends" : {
			"type" : [{"$ref" : "#"}, "array"],
			"items" : {"$ref" : "#"},
			"default" : {}
		},
		
		"id" : {
			"type" : "string",
			"format" : "uri"
		},
		
		"$ref" : {
			"type" : "string",
			"format" : "uri"
		},
		
		"$schema" : {
			"type" : "string",
			"format" : "uri"
		}
	},
	
	"dependencies" : {
		"exclusiveMinimum" : "minimum",
		"exclusiveMaximum" : "maximum"
	},
	
	"default" : {}
};

var calendar= { 
	"description" : "A representation of an event",
	"type" : "object",
	"properties" : {
		"dtstart" : {
			"format" : "date-time",
			"type" : "string",
			"description" : "Event starting time",
			"required":true
		},
		"summary" : {
			"type":"string",
			"required":true
		},
		"location" : { 
			"type" : "string" 
		},
		"url" : {
			"type" : "string", 
			"format" : "url" 
		},
		"dtend" : {
			"format" : "date-time",
			"type" : "string",
			"description" : "Event ending time"
		},
		"duration" : {
			"format" : "date",
			"type" : "string",
			"description" : "Event duration"
		},
		"rdate" : {
			"format" : "date-time",
			"type" : "string",
			"description" : "Recurrence date"
		},
		"rrule" : {
			"type" : "string",
			"description" : "Recurrence rule"
		},
		"category" : {
			"type" : "string"
		},
		"description" : {
			"type" : "string"
		},
		"geo" : { "$ref" : "http://json-schema.org/draft-03/geo" }
	}
}
;
/**
* generate annotation From Schema
*/
function annotationFromSchema (inputJsonSchema){

var _schema={};
_schema.singleFields=[];
_schema.groupFields=[];
_schema.repeatingFields=[];
defaultEntry={};

 jQuery.each(inputJsonSchema.properties,
 function(i, val) {
 	_schema.singleFields.unshift({name:i ,label: val.description ? val.description : i, placeholder: i, type: val.type,  required: val.required ? val.required : undefined });
 
});
return _schema;
}

/**
* generate annotation From Schema
*/
function schemaFromAnnotation (annotation){

var _schema={};
_schema.description = "A representation of something";
_schema.type = "object";
_schema.properties ={};

jQuery.each(annotation.singleFields,
function(i, val) {
_schema.properties[val.name]={};
_schema.properties[val.name].description = val.label;
_schema.properties[val.name].type = val.type;
_schema.properties[val.name].required = val.required;

});

jQuery.each(annotation.groupFields,
function(i, val) {
console.log (val);
});

jQuery.each(annotation.repeatingFields,
function(i, val) {
console.log (val);
});


return _schema;
}

