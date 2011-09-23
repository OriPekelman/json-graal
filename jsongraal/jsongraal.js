Object.defineProperty(Object.prototype, "merge", {
    enumerable: false,
    value: function() {
        var override = true,
        dest = this,
        len = arguments.length,
        props,
        merge,
        i,
        from;

        if (typeof(arguments[arguments.length - 1]) === "boolean") {
            override = arguments[arguments.length - 1];
            len = arguments.length - 1;
        }

        for (i = 0; i < len; i++) {
            from = arguments[i];
            Object.getOwnPropertyNames(from).forEach(function(name) {
                var descriptor;

                // nesting
                if ((typeof(dest[name]) === "object" || typeof(dest[name]) === "undefined")
                && typeof(from[name]) === "object") {

                    // ensure proper types (Array rsp Object)
                    if (typeof(dest[name]) === "undefined") {
                        dest[name] = Array.isArray(from[name]) ? [] : {};
                    }
                    if (override) {
                        if (!Array.isArray(dest[name]) && Array.isArray(from[name])) {
                            dest[name] = [];
                        }
                        else if (Array.isArray(dest[name]) && !Array.isArray(from[name])) {
                            dest[name] = {};
                        }
                    }
                    dest[name].merge(from[name], override);
                }

                // flat properties
                else if ((name in dest && override) || !(name in dest)) {
                    descriptor = Object.getOwnPropertyDescriptor(from, name);
                    if (descriptor.configurable) {
                        Object.defineProperty(dest, name, descriptor);
                    }
                }
            });
        }
        return this;
    }
});


/**
* JsonGraal allows the dynamic creation of html forms that are bound to a specific structure of JSON data
* It uses an annotated schema that can be generated from JSON schemas
*
* Dependencies: jQuery, Handlebars, jquery-datalink, and jquery-globalize (soft)
*
* Main Methods:
*
* constructor : initializes jsonGraal with a schema and information about dom binding
* entries: the data to be bound to the dom
* createTemplate :  generates a dom structure representing the schema
* bindDataToDom : Binds the internal data structure to the dom
*
**/
var JsonGraal = function(config) {
    // Configuration with Defaults
    this.config = config;
    var default_args = {
        'schema': {},
        'elements_root_class': "entries",
        'elements_class': "entry",
        'insert_element': "#insert",
        'save_element': "#save",
        'load_element': "#load",
    }

    for (var index in default_args) {
        if (typeof this.config[index] == "undefined") this.config[index] = default_args[index];
    }

    this._entries = {};
    // internal object to hold the bound json
    this._schema = this.config.schema;
    var that = this;

    /* GenericTemplates*/
    this.singleFieldTemplate = '                                                          \
  <div>                                                                                   \
    {{{label this}}}                                                                      \
    {{{forminput this}}}                                                                  \
  </div>                                                                                  \
  ';

    this.groupFieldTemplate = '                                                           \
  <fieldset>                                                                              \
    {{{legend this}}}                                                                     \
    <div class="{{name}}">                                                                \
      {{#singleFields}}                                                                   \
		  <div>                                                                               \
		    {{{label this}}}                                                                  \
		    {{{groupforminput this}}}                                                         \
		  </div>                                                                              \
      {{/singleFields}}                                                                   \
    </div>                                                                                \
  </fieldset>                                                                             \
  ';

    this.repeatingFieldTemplate = '                                                       \
  <fieldset>                                                                              \
    {{{legend this}}}                                                                     \
    <div class="{{rootElement}}">                                                         \
      {{openIteratorBlock rootElement}}                                                   \
        <div class="{{name}}">                                                            \
          {{#singleFields}}                                                               \
            {{> singleField}}                                                             \
          {{/singleFields}}                                                               \
      <div><a href="#" class="{{name}}-remove remove">{{t "Remove"}}</a></div>            \
    </div>                                                                                \
    {{closeIteratorBlock rootElement}}                                                    \
    </div>                                                                                \
    <a href="#" class="{{name}}-add add">{{t "Add new"}}</a>                              \
  </fieldset>                                                                             \
  ';
    /* /GenericTemplates*/

    Handlebars.registerPartial("singleField", this.singleFieldTemplate);

    /* translation helper if globalize not present returns argument*/
    Handlebars.registerHelper("t",
    function(t) {
        if ($.global == undefined)
        return t;
        else
        return $.global.t(t);
    });

    /* Output a handlebar expression with the 't' tranlsation helper, used for template of template*/
    Handlebars.registerHelper("checkboxvalue",
    function(value) {
        if (value) return ' checked=checked';
        else return '';
    });

    // wrapper for normal form input
    Handlebars.registerHelper("forminput",
    function(element) {
        return formInput(element, false);
    });

    // wrapper for  form input in a group of fields (dot notation, sub element)
    Handlebars.registerHelper("groupforminput",
    function(element) {
        return formInput(element, true);
    });

    function formInput(element, group) {
        // when using the dot notation if the parent element is undefined handlebars will issue an error. 	
        var value_expression = group ? '{{#if ' + element.rootElement + ' }}{{' + element.rootElement + "." + element.name + '}}{{/if}}': '{{ ' + element.name + '}}';
        var jsongraal_path_expression = group ? "{{datapath  " + element.rootElement + "}}": "{{data-jsongraal-path}}";

        switch (element.type) {
        case "textarea":
            return '<textarea  data-jsongraal-path= "' + jsongraal_path_expression + '"  class="' + that.config.elements_class + '" name="' + element.name + '" placeholder="{{t "' + element.placeholder + '"}}">{{ ' + element.name + '}}</textarea>';
            break;
        case "boolean":
            return '<input  data-jsongraal-path= "' + jsongraal_path_expression + '" class="' + that.config.elements_class + '" name="' + element.name + '" type="checkbox" {{checkboxvalue  ' + element.name + '}} />';
            break;
        }
        return '<input   data-jsongraal-path= "' + jsongraal_path_expression + '"   class="' + that.config.elements_class + '" name="' + element.name + '" type="' + element.type + '"  value="' + value_expression + '"   placeholder="{{t "' + element.placeholder + '"}}" />';
    }


    /* Output a label, used for generating the template */
    Handlebars.registerHelper("datapath",
    function(element) {
        if (element) return element['data-jsongraal-path'];
    });

    /* Output a label, used for generating the template */
    Handlebars.registerHelper("label",
    function(element) {
        return '<label for="' + element.name + '">{{t  "' + element.label + '"}}</label>';
    });

    /* Output a legened, used , used for generating the template*/
    Handlebars.registerHelper("legend",
    function(element) {
        return '<legend>{{t  "' + element.legend + '"}}</legend>';
    });

    /* Output an iterator start block, used for generating the template*/
    Handlebars.registerHelper("openIteratorBlock",
    function(element) {
        return '{{#' + element + '}}';
    });
    /* Output an iteratir end block, used for generating the template*/
    Handlebars.registerHelper("closeIteratorBlock",
    function(element) {
        return '{{/' + element + '}}';
    });

    // generic debug function
    Handlebars.registerHelper("debug",
    function(optionalValue) {
        console.log("Current Context");
        console.log("====================");
        console.log(this);

        if (optionalValue) {
            console.log("Value");
            console.log("====================");
            console.log(optionalValue);
        }
    });


    // debug to be used in template generating templat 	
    Handlebars.registerHelper("metadebug",
    function(optionalValue) {
        return '{{#debug}}';
    });

}

/*
* Internal data structure to be bound to dom
*/
JsonGraal.prototype.entries = function(elements) {

    if (elements) this._entries = elements;
    return this._entries;

}
/*
* enrich data with fully materalized path
*/
JsonGraal.prototype.addMateralizedPath = function(elements) {


    if (elements) {
        Traverse(elements).forEach(function(element) {

            if (element != null && (typeof(element) == "object" || typeof(element) == "array") && this.key != ";") {
                element['data-jsongraal-path'] = escape(JSON.stringify(this.path));
            }
        });
    }
    return elements;
}

/*
*  let's for fun add missing defaults          
*/
JsonGraal.prototype.fillInMissingDefaults = function(elements) {

    for (var i = 0; i < elements.length; i++)
    {
        elements[i].merge(this.config.schema.defaultEntry, false);
    }
    return elements;
}


/**
* Create template, rendrer it and bind data to the generated form
*/
JsonGraal.prototype.refresh = function() {
    var root = "div." + this.config.elements_root_class;

    $(root).empty();

    this._entries = this.fillInMissingDefaults(this._entries);
    // this is a bit brutal.
    this._entries = this.addMateralizedPath(this._entries);
    // this is a bit brutal.
    var template = Handlebars.compile(this.createTemplate());

    var data = {
        entries: this.entries()
    };
    $(root).html(template(data));

    this.bindDataToDom($("div." + this.config.elements_class));

}

/*
* Bind Data to the Rendered form
*/
JsonGraal.prototype.bindDataToDom = function(target) {
    var that = this;
    target.each(function(i, domEntry) {

        var entry = that.entries()[i];
        /*        that.linkSingleField($(domEntry), entry);
    that.linkGroupField($(domEntry), entry);*/
        that.linkRepeatingField($(domEntry), entry);

        $(".entry-remove", domEntry).click(function() {
            that.entries().splice(i, 1);
        });
    });
}

/*
* Remove the path elements we added to the object
*/
JsonGraal.prototype._cleanEntries = function() {

    tempEntries = Traverse.clone(this._entries);

    Traverse(tempEntries).forEach(
    function(x) {
        if (this.key == "data-jsongraal-path")
        {
            this.del();
        }
    });
    return tempEntries;
}

/*
* Pretty Print results to dom (for console/debug)
*/
JsonGraal.prototype.getJson = function() {
    return JSON.stringify(this._cleanEntries(this._entries), null, 4);
}

/*
* Create a template from annotated schema
*/
JsonGraal.prototype.createTemplate = function() {

    var jsongraalTemplate = "";

    var template = Handlebars.compile(this.singleFieldTemplate);
    var that = this;
    jQuery.each(that.config.schema.singleFields,
    function(i, val) {
        jsongraalTemplate += template(val);
    });

    var template = Handlebars.compile(that.groupFieldTemplate);
    jQuery.each(that.config.schema.groupFields,
    function(i, val) {
        jsongraalTemplate += template(val);
    });

    var template = Handlebars.compile(that.repeatingFieldTemplate);
    jQuery.each(that.config.schema.repeatingFields,
    function(i, val) {
        jsongraalTemplate += template(val);
    });

    jsongraalTemplate = "{{#entries}}\n" +
    '<div class="' + this.config.elements_class + '">' + jsongraalTemplate +
    '<a href="#" class="entry-remove remove">Remove Entry</a>' +
    '</div>{{/entries}}';
    return jsongraalTemplate;
}


/*
* Insert a new entry
*/
JsonGraal.prototype.insert = function(entry) {

    this.entries().unshift(entry);
    this.refresh();
}
/*
* Bind a repeating or "plural" "DOM" field to its corresponding one in the internal data
*/

JsonGraal.prototype.linkRepeatingField = function(target, entry) {
    var that = this;
    jQuery.each(that.config.schema.repeatingFields,

    function(i, repeatingField) {
        $(target).find("." + repeatingField.name + "-remove").click(function(i) {
            if (entry[val.rootElement] != undefined) {
                entry[val.rootElement].splice(i, 1);
                that.refresh();
            }
        });

        $(target).find("." + repeatingField.name + "-add", this).click(function() {
            if (entry[repeatingField.rootElement] == undefined) {
                entry[repeatingField.rootElement] = [];
            }
            var FieldMap = that._defaultFieldMap(that, repeatingField);
            entry[repeatingField.rootElement].push(FieldMap);
            that.refresh();
            // @fixme: ok this is where we need to add the materialized path. For the moment we will do this in refresh. Later this needs to be optmized so we don't recalculate everything.
        });

    });
}
// we should maybe use a simply deep merge..? how does the repeating field get into that
JsonGraal.prototype._defaultFieldMap = function(that, schemaField) {
    var fieldMap = {};

    jQuery.each(schemaField.singleFields,
    function(i, field) {
        fieldMap[field.name] = field.name;
    });

    var defaultFieldMap = fieldMap;
    jQuery.each(defaultFieldMap,
    function(i) {
        if ((typeof(schemaField.rootElement) == "undefined") && (typeof(that.config.schema.defaultEntry[schemaField.rootElement]) == "undefined")) {
            defaultFieldMap[i] = "";
        }
        else
        {
            if (typeof(that.config.schema.defaultEntry[schemaField.rootElement]) == "object")
            defaultFieldMap[i] = that.config.schema.defaultEntry[schemaField.rootElement][0][i];
            // get the default value from the schema
            else
            defaultFieldMap[i] = that.config.schema.defaultEntry[schemaField.rootElement];
        }
    });
    return defaultFieldMap;
}




JsonGraal.prototype.bindToDom = function() {
    var that = this;
    that.refresh();

    $(this.config.insert_element).click(function() {

        myJsonGraal.insert(that._schema['defaultEntry']);
    });

    /*CONSOLE */
    //$(document).bind('keypress', function(e){ myJsonGraal.getJson( "#results" ); editableResults();});
    //$(document).bind('click', function(e){ myJsonGraal.getJson( "#results" );editableResults();});
    // show the results of the linking -- object graph is already full of the data
    $(this.config.load_element).click(function() {
        console.log("trying to load json", $('#results').html());
        entries = eval($('#results').html());
        that.entries(entries);
        that.refresh();
    });
    // show the results of the linking -- object graph is already full of the data
    $(this.config.save_element).click(function() {
        $('#results').html(myJsonGraal.getJson());
        console.log("was here save");
        $('#results').get(0).contentEditable = "true";
    });

    // here we listen to dom change events and check whether the element is bound to somethign in our domtree
    $("input,textarea").live("change",
    function() {

        myinput = this;
        Traverse(that.entries()).forEach(function(elem) {
            if ($(myinput).attr("data-jsongraal-path") == escape(JSON.stringify(this.path)))
            {
                elem[$(myinput).attr("name")] = $(myinput).val();
            }
        });
    });
}


// define helper function for globalize, similiar to gettext
$(document).ready(function() {
    if ($.global != undefined) {

        /**
         * return result from globalize, fallback to term identifier without package name, fallback to term if all else fails
         * @FIXME: @CAVEAT: If there are preriods, or a string ends with a period and it is not in the config, it will miserably fail
         */
        $.global.t = function(term, culture) {
            if (term == undefined) return term;
            if (culture == undefined) culture = $.global.culture;

            var localize_path = term.split('.');
            var depth = localize_path.length;
            if (depth == 1) return term;

            var localized = jQuery.global.localize(localize_path[0], culture);
            if (!localized) {
                if (console) console.log('Warning: No translations for ' + localize_path[0]);
                return localize_path[depth - 1];
            }

            for (i = 1; i < depth; i++) {
                if (typeof(localized[localize_path[i]]) == 'string') {
                    return localized[localize_path[i]];
                } else {
                    if (console) console.log('Warning: Missing translation for ' + term + ' in ' + culture);
                }
                return localize_path[i];
            };

        };
        // fallback to identifier and emit warning
    }
})


