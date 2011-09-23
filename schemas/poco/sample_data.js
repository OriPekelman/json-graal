// define some basic default data to start with
entries = [
  { name:{ givenName: "Dave", familyName: "Reed"}, birthday: "1990-6-7", 
	phoneNumbers: [
    		{ type: "Mobile", value: "(555) 121-2121", primary: "true" },
    		{ type: "Home", value: "(555) 123-4567" } ], 
	emails:[ 
		{ type: "personal", value: "reed@example.com", primary:true },
      		{ type: "work", value: "oops@sdkh.com" }],
      	activities:[{activity:"reading"}, {activity: "writing"}],
   },
  { name:{ givenName: "John", familyName: "Doe"}, birthday: "1972-10-1", 
	 phoneNumbers: [
    		{ type: "Mobile", value: "(555) 444-2222" },
    		{ type: "Home", value: "(555) 999-1212" } ], 
	 emails:[ 
      		{ type: "personal", value: "x@localhost" },
      		{ type: "work", value: "y@example.com" }]  
   },
];