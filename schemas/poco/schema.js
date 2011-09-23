/**
*  This file is an example annotated schema for Portable Contacts
*/
var poco ={
   "singleFields":[
     {"name":"id",				"label":"poco.id",			"placeholder":"poco.id_Placeholder",			"type":"text"		},
     {"name":"displayName",			"label":"poco.displayName",		"placeholder":"poco.displayName_Placeholder",		"type":"text"		},
     {"name":"published",			"label":"poco.published",		"placeholder":"poco.published_Placeholder",		"type":"datetime"	},
     {"name":"updated",				"label":"poco.updated",			"placeholder":"poco.updated_Placeholder",		"type":"datetime"	},
     {"name":"birthday",			"label":"poco.birthday",		"placeholder":"poco.birthday_Placeholder",		"type":"date"		},
     {"name":"anniversary",			"label":"poco.anniversary",		"placeholder":"poco.anniversary_Placeholder",		"type":"date"		},
     {"name":"gender",				"label":"poco.gender",			"placeholder":"poco.gender_Placeholder",		"type":"text"		},
     {"name":"note",				"label":"poco.note",			"placeholder":"poco.note_Placeholder",			"type":"textarea"	},
     {"name":"preferredUsername",		"label":"poco.preferredUsername",	"placeholder":"poco.preferredUsername_Placeholder",	"type":"text"		},
     {"name":"utcOffset",			"label":"poco.utcOffset",		"placeholder":"poco.utcOffset_Placeholder",		"type":"text"		},
     {"name":"connected",			"label":"poco.connected",		"placeholder":"poco.connected_Placeholder",		"type":"boolean"	},
     // Start Really optional fields [Open Social Container Optional fields]
     {"name":"aboutMe",				"label":"poco.aboutMe",			"placeholder":"poco.aboutMe_Placeholder","type":"text"		},
     {"name":"currentLocation",			"label":"poco.currentLocation",		"placeholder":"poco.currentLocation_Placeholder","type":"text"		},
     {"name":"drinker",			        "label":"poco.drinker",		        "placeholder":"poco.drinker_Placeholder","type":"text"		},
     {"name":"ethnicity",			"label":"poco.ethnicity",		"placeholder":"poco.ethnicity_Placeholder","type":"text"		},
     {"name":"fashion",				"label":"poco.fashion",			"placeholder":"poco.fashion_Placeholder","type":"text"		},
     {"name":"happiestWhen",			"label":"poco.happiestWhen",		"placeholder":"poco.happiestWhen_Placeholder","type":"text"		},
     {"name":"humor",				"label":"poco.humor",			"placeholder":"poco.humor_Placeholder","type":"text"		},
     {"name":"livingArrangement",		"label":"poco.livingArrangement",	"placeholder":"poco.livingArrangement_Placeholder","type":"text"	},
     {"name":"lookingFor",			"label":"poco.lookingFor",		"placeholder":"poco.lookingFor_Placeholder","type":"text"		},
     {"name":"profileSong",			"label":"poco.profileSong",		"placeholder":"poco.profileSong_Placeholder","type":"text"		},
     {"name":"profileVideo",			"label":"poco.profileVideo",		"placeholder":"poco.profileVideo_Placeholder","type":"text"		},
     {"name":"relationshipStatus",		"label":"poco.relationshipStatus",	"placeholder":"poco.relationshipStatus_Placeholder","type":"text"	},
     {"name":"religion",			"label":"poco.religion",		"placeholder":"poco.religion_Placeholder","type":"text"	        	},
     {"name":"romance",				"label":"poco.romance",			"placeholder":"poco.romance_Placeholder","type":"text"		        },
     {"name":"scaredOf",			"label":"poco.scaredOf",		"placeholder":"poco.scaredOf_Placeholder","type":"text"		        },
     {"name":"sexualOrientation",		"label":"poco.sexualOrientation",	"placeholder":"poco.sexualOrientation_Placeholder","type":"text"	},
     {"name":"smoker",				"label":"poco.smoker",			"placeholder":"poco.smoker_Placeholder","type":"text"		},
     {"name":"status",				"label":"poco.status",			"placeholder":"poco.status_Placeholder","type":"text"		},
     {"name":"children",	        	"label":"poco.children",		"placeholder":"poco.children_Placeholder","type":"text"		}, // @fixme it is unclear if this is a single text field or a repeating one
     {"name":"jobInterests",	        	"label":"poco.jobInterests",		"placeholder":"poco.jobInterests_Placeholder","type":"text"	}, // @fixme it is unclear if this is a single text field or a repeating one
     {"name":"pets",	                	"label":"poco.pets",	        	"placeholder":"poco.pets_Placeholder","type":"text"		}, // @fixme it is unclear if this is a single text field or a repeating one
     {"name":"politicalViews",	        	"label":"poco.politicalViews",	        "placeholder":"poco.politicalViews_Placeholder","type":"text"	}, // @fixme it is unclear if this is a single text field or a repeating one
     
     
   ],
   "groupFields":[
     {
     "legend":"poco.name_Legend", "rootElement":"name", "name":"name", "singleFields":[  
     { "rootElement":"name", "name":"givenName",	"label":"poco.givenName",		"placeholder":"poco.givenName_Placeholder",		"type":"text"			},
     { "rootElement":"name", "name":"familyName",	"label":"poco.familyName",		"placeholder":"poco.familyName_Placeholder",		"type":"text"			},
     { "rootElement":"name", "name":"middleName",	"label":"poco.middleName",		"placeholder":"poco.middleName_Placeholder",		"type":"text"			},
     { "rootElement":"name", "name":"honorificPrefix",	"label":"poco.honorificPrefix",		"placeholder":"poco.honorificPrefix_Placeholder",	"type":"text"		},  
     { "rootElement":"name", "name":"honorificSuffix",	"label":"poco.honorificSuffix",		"placeholder":"poco.honorificSuffix_Placeholder",	"type":"text"		},
     ] 
     },
     // Start Optional 
     {
     "legend":"poco.bodyType_Legend", "rootElement":"name", "name":"bodyType", "singleFields":[  
     { "rootElement":"bodyType", "name":"build",	"label":"poco.build",		"placeholder":"poco.bodyType_build_Placeholder",		"type":"text"			},
     { "rootElement":"bodyType", "name":"eyeColor",	"label":"poco.eyeColor",		"placeholder":"poco.eyeColor_Placeholder",		"type":"text"			},
     { "rootElement":"bodyType", "name":"hairColor",	"label":"poco.hairColor",		"placeholder":"poco.hairColor_Placeholder",		"type":"text"			},
     { "rootElement":"bodyType", "name":"height",	"label":"poco.height",		"placeholder":"poco.height_Placeholder",	"type":"text"		},  
     { "rootElement":"bodyType", "name":"weight",	"label":"poco.weight",		"placeholder":"poco.weight_Placeholder",	"type":"text"		},
     ] 
     },
   ],
   "repeatingFields":[
     {
     "legend":"poco.emails_Legend",
     "name":"email",	"rootElement":"emails",	"singleFields":[  
     { "name":"value",		"label":"poco.number",		"placeholder":"poco.email_number_Placeholder",		"type":"text"		       },
     { "name":"type",		"label":"poco.type",		"placeholder":"poco.email_type_Placeholder",		"type":"text"		       },
     { "name":"primary",		"label":"poco.primary",		"placeholder":"poco.primary_Placeholder",		"type":"boolean"       },
     ]
     },
     {
     "legend":"poco.phones_Legend",
     "name":"phone",	"rootElement":"phoneNumbers",	"singleFields":[  
     { "name":"value",		"label":"poco.number",		"placeholder":"poco.phone_number_Placeholder",		"type":"text"			},
     { "name":"type",		"label":"poco.type",		"placeholder":"poco.phone_type_Placeholder",		"type":"text"			},
     { "name":"primary",		"label":"poco.primary",		"placeholder":"poco.primary_Placeholder",		"type":"boolean"	},
     ]
     },
       {
       "legend":"poco.addresses_Legend",
       "name":"addresses",	"rootElement":"addresses",	"singleFields":[  
       { "name":"type",			"label":"poco.type",		"placeholder":"poco.url_type_Placeholder",		"type":"text"		 },
       { "name":"formatted",		"label":"poco.formatted",	"placeholder":"poco.formatted_Placeholder",		"type":"text"		 },
       { "name":"streetAddress",		"label":"poco.streetAddress",	"placeholder":"poco.streetAddress_Placeholder",		"type":"text"	 },
       { "name":"region",		"label":"poco.region",		"placeholder":"poco.region_Placeholder",		"type":"text"		 },
       { "name":"postalcode",		"label":"poco.postalcode",	"placeholder":"poco.postalcode_Placeholder",		"type":"text"		 },
       { "name":"country",		"label":"poco.country",		"placeholder":"poco.country_Placeholder",		"type":"text"		 },
	]
        },
        {
        "legend":"poco.organizations_Legend",
        "name":"organization",	"rootElement":"organizations",	"singleFields":[  
        { "name":"name",			"label":"poco.name",		"placeholder":"poco.organization_name_Placeholder",		"type":"text"		 },
        { "name":"departement",			"label":"poco.departement",		"placeholder":"poco.organization_departement_Placeholder",		"type":"text"		 },
        { "name":"type",			"label":"poco.type",		"placeholder":"poco.url_type_Placeholder",		"type":"text"		 },
        { "name":"title",		"label":"poco.title",	"placeholder":"poco.organization_title_Placeholder",		"type":"text"		 },
        { "name":"startDate",		"label":"poco.startdate",	"placeholder":"poco.startDate_Placeholder",		"type":"date"	 },
        { "name":"endDate",		"label":"poco.enddate",	"placeholder":"poco.endDate_Placeholder",		"type":"date"	 },
        { "name":"location",		"label":"poco.location",		"placeholder":"poco.location_Placeholder",		"type":"text"		 },
        { "name":"description",		"label":"poco.description",	"placeholder":"poco.organization_description_Placeholder",		"type":"text"		 },
        	]
         },
         {
         "legend":"poco.accounts_Legend",
         "name":"accounts",	"rootElement":"accounts",	"singleFields":[  
         { "name":"domain",		"label":"poco.domain",		"placeholder":"poco.account_domain_Placeholder",		"type":"text"		},
         { "name":"username",		"label":"poco.username",		"placeholder":"poco.username_Placeholder",		"type":"text"		},
         { "name":"userid",		"label":"poco.userid",		"placeholder":"poco.userid_Placeholder",		"type":"text"	},
         ]
         },
         {
         "legend":"poco.photos_Legend",
         "name":"photo",	"rootElement":"photos",	"singleFields":[  
         { "name":"value",		"label":"poco.number",		"placeholder":"poco.photo_number_Placeholder",		"type":"text"		},
         { "name":"type",		"label":"poco.type",		"placeholder":"poco.photo_type_Placeholder",		"type":"text"		},
         { "name":"primary",		"label":"poco.primary",		"placeholder":"poco.primary_Placeholder",		"type":"boolean"	},
         ]
         },
         {
         "legend":"poco.urls_Legend",
         "name":"url",	"rootElement":"urlNumbers",	"singleFields":[  
         { "name":"value",		"label":"poco.number",		"placeholder":"poco.url_number_Placeholder",		"type":"text"		},
         { "name":"type",		"label":"poco.type",		"placeholder":"poco.url_type_Placeholder",		"type":"text"		},
         { "name":"primary",		"label":"poco.primary",		"placeholder":"poco.primary_Placeholder",		"type":"boolean"	},
         ]
         },
         {
         "legend":"poco.ims_Legend",
         "name":"im",	"rootElement":"imNumbers",	"singleFields":[  
         { "name":"value",		"label":"poco.number",		"placeholder":"poco.im_number_Placeholder",		"type":"text"		 },
         { "name":"type",		"label":"poco.type",		"placeholder":"poco.im_type_Placeholder",		"type":"text"		 },
         { "name":"primary",		"label":"poco.primary",		"placeholder":"poco.primary_Placeholder",		"type":"boolean"	 },
          ]
         },
         // Start Really optional fields [Open Social Container Optional fields]
         {
         "legend":"poco.activities",
         "name":"activities",	"rootElement":"activities",	"singleFields":[  
         { "name":"activity",		"label":"poco.activity",		"placeholder":"poco.activity_Placeholder",		"type":"text"		 },
          ]
         },
         {
         "legend":"poco.books",
         "name":"books",	"rootElement":"books",	"singleFields":[  
         { "name":"book",		"label":"poco.book",		"placeholder":"poco.book_Placeholder",		"type":"text"		 },
          ]
         },
         {
         "legend":"poco.cars",
         "name":"cars",	"rootElement":"cars",	"singleFields":[  
         { "name":"car",		"label":"poco.car",		"placeholder":"poco.car_Placeholder",		"type":"text"		 },
          ]
         },
         {
         "legend":"poco.food",
         "name":"food",	"rootElement":"food",	"singleFields":[  
         { "name":"food",		"label":"poco.food",		"placeholder":"poco.food_Placeholder",		"type":"text"		 },
          ]
         }, // @fixme beware single and plural field have the same name. How is this possible in XML?
         {
         "legend":"poco.heroes",
         "name":"heroes",	"rootElement":"heroes",	"singleFields":[  
         { "name":"hero",		"label":"poco.hero",		"placeholder":"poco.hero_Placeholder",		"type":"text"		 },
          ]
         },
         {
         "legend":"poco.interests",
         "name":"interests",	"rootElement":"interests",	"singleFields":[  
         { "name":"interest",		"label":"poco.interest",		"placeholder":"poco.interest_Placeholder",		"type":"text"		 },
          ]
         },
         {
         "legend":"poco.languages",
         "name":"languages",	"rootElement":"languages",	"singleFields":[  
         { "name":"language",		"label":"poco.language",		"placeholder":"poco.language_Placeholder",		"type":"text"		 },
          ]
         },
         {
         "legend":"poco.spokenLanguages",
         "name":"languages",	"rootElement":"languages",	"singleFields":[  
         { "name":"language",		"label":"poco.language",		"placeholder":"poco.language_Placeholder",		"type":"text"		 },
          ]
         },
         {
         "legend":"poco.movies",
         "name":"movies",	"rootElement":"movies",	"singleFields":[  
         { "name":"movie",		"label":"poco.movie",		"placeholder":"poco.movie_Placeholder",		"type":"text"		 },
          ]
         },
         {
         "legend":"poco.music",
         "name":"music",	"rootElement":"music",	"singleFields":[  
         { "name":"music",		"label":"poco.music",		"placeholder":"poco.music_Placeholder",		"type":"text"		 },
          ]
         },
         {
         "legend":"poco.quotes",
         "name":"quotes",	"rootElement":"quotes",	"singleFields":[  
         { "name":"quote",		"label":"poco.quote",		"placeholder":"poco.quote_Placeholder",		"type":"text"		 },
          ]
         },
         {
         "legend":"poco.sports",
         "name":"sports",	"rootElement":"sports",	"singleFields":[  
         { "name":"sport",		"label":"poco.sport",		"placeholder":"poco.sport_Placeholder",		"type":"text"		 },
          ]
         },
         {
         "legend":"poco.turnOffs",
         "name":"turnOffs",	"rootElement":"turnOffs",	"singleFields":[  
         { "name":"turnOff",		"label":"poco.turnOff",		"placeholder":"poco.turnOff_Placeholder",		"type":"text"		 },
          ]
         },
         {
         "legend":"poco.turnOns",
         "name":"turnOns",	"rootElement":"turnOns",	"singleFields":[  
         { "name":"turnOn",		"label":"poco.turnOn",		"placeholder":"poco.turnOn_Placeholder",		"type":"text"		 },
          ]
         },
         {
         "legend":"poco.tvShows",
         "name":"tvShows",	"rootElement":"tvShows",	"singleFields":[  
         { "name":"tvShow",		"label":"poco.tvShow",		"placeholder":"poco.tvShow_Placeholder",		"type":"text"		 },
          ]
         },
   ],
   "defaultEntry": { id:"", displayName:"", published:"", updated:"", birthday:"", anniversary:"", gender:"", note:"", preferredUsername:"", utcOffset:"", connected:"", name:{ givenName: "", familyName: ""}, bodyType:{}, emails: [{type: "work"}], phoneNumbers: [{ type: "work"}], addresses: [] }
 };
