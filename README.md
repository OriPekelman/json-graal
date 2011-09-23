# JsonGraal -- Call For Contributions
This project aims to create javascript binding for JSON that would permit a round trip between a generated HTML form and a schema complying JSON document.

It is a prototype and it is very limited. Most importantly arbitrary JSON can not be handled. Which means only very shallow structures will work. 

I am no good at Javascript. So this should be considered as a Proof of Concept, real implementation needed...

* And possibly JSON TO FORM Javascript bindings with a bunch of inference/generation


_Note: No longer uses the *beta* data-link, as it is broken by design

_Note: No longer uses the *beta* and totally broken jquery template. Long live handlebars_


For an idea of what this does open  jsongraal/jsongraal.html in your favorite browser

## The reasons for this project are two fold: 

1. I wanted to create a form that can respect 100% the Portable Contacts scheme, and I wanted it as generic and generated as possible. This is for the Turbulences projects, but should be useful anywhere.
2. My personal holly grail in computing is the generation of intefaces for documented oriented stores, if possible for schema free ones. If I can get this to really work, this is going to be hugely useful, you'll see.

Basically this takes a configuration of the types of fields there will be in a form (singular, group/complex, or plural (repeating group) and through templating generates a binded Form that can generate Json that conforms to a specific schema. 

Currently it annotates both the JSON structure and the DOM so we can map between both. We use traverse.js for that.

Currently the depth is not arbitray, ie you can only have a structure like this

	|-Single Field
	|
	|-Single Field
	|
	---Group of Fields
	|    |-Single Field
	|    |-Single Field
	|
	---Group of Fields
	|    |-Single Field
	|    |-Single Field
	|
	---Repeating Group of Fields
	|    |-Single Field
	|    |-Single Field

So you can generate a Json like this one:

	"entry": [
	{
	  "id": "309252405",
	  "published": "2007-11-05T17:37:27Z",
	  "updated": "2009-09-18T15:15:33Z",
	  "displayName": "OriPekelman",
	  "birthday": "0000-01-19",
	  "emails": [
	    {
	      "value": "ori@af83.com",
	      "type": "work"
	    }
	  ],
	  "name": {
	    "formatted": "Mr. Ori Pekelman",
	    "familyName": "Pekelman",
	    "givenName": "Ori",
	    "honorificPrefix": "Mr.",
	  },
	  "organizations": [
	    {
	      "name": "AF83"
	    }
	  ],
	  "urls": [
	    {
	      "value": "http:\/\/www.af83.com\/users\/ori\/@self",
	      "type": "JsonGraal"
	    },
	    {
	      "value": "http:\/\/www.af83.com",
	      "type": "Homepage"
	    },
	    {
	      "value": "http:\/\/dev.af83.com",
	      "type": "blog",
	      "primary": true
	    },
	  ]
	  },

## What is Json-Schema?

JSON (JavaScript Object Notation) Schema defines the media type
 "application/schema+json", a JSON based format for defining the
 structure of JSON data.  JSON Schema provides a contract for what
 JSON data is required for a given application and how to interact
 with it.  JSON Schema is intended to define validation,
 documentation, hyperlink navigation, and interaction control of JSON
 data.

see [[http://tools.ietf.org/html/draft-zyp-json-schema-03]]

## Give us an example
### Geo
	{
	"description" : "A geographical coordinate",
	"type" : "object",
	"properties" : {
		"latitude" : { "type" : "number" },
		"longitude" : { "type" : "number" }
	}
	}

So this document is conforming:

`{"latitude":23.12,"longitude":43.1}`

and this code will not return validation errors:
	latlong= {};
	latlong.latitude = 23.12;
	latlong.longitude = 43.1;
	errors = jsonschema.validate (JSON.stringify(latlong));

## Give us a better example 
### Card
   
	{
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
	}

## What Was Done?

* JsonGraal -initial something
* annotationFromSchema()
* Some Tests -- Currently all broken

### Current Problems

 * This code was written by me, and I am very bad at Javascript
 * This will need to be totally rewritten to support arbitrary JSON. 
 * This will therfor also need to be rewritten to handle arbitrary JSON-Schema
 * Handling non existant nodes in a JSON document is complicated (between default, and required items )
 * Probably performance is very bad. 
 * Annotating the JSON may be evil. 
 * Annotating the DOM may be evil. 

#Licence 
BSD      

Copyright (c) 2011, Ori Pekelman, AF83
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
