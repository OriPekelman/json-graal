(function($) {
    var cultures = $.global.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["oc"] = $.extend(true, {}, en, {
        name: "oc",
        englishName: "Occitan",
        nativeName: "Occitan",
        language: "oc",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': " ",
                '.': ",",
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                firstDay: 1,
                days: {
                    names: ["dimenge","diluns","dimars","dimècres","dijòus","divendres","dissabte"],
                    namesAbbr: ["dim.","lun.","mar.","mèc.","jòu.","ven.","sab."],
                    namesShort: ["di","lu","ma","mè","jò","ve","sa"]
                },
                months: {
                    names: ["genier","febrier","març","abril","mai","junh","julh","agost","setembre","octobre","novembre","desembre",""],
                    namesAbbr: ["gen.","feb.","mar.","abr.","mai.","jun.","jul.","ag.","set.","oct.","nov.","des.",""]
                },
                monthsGenitive: {
                    names: ["de genier","de febrier","de març","d'abril","de mai","de junh","de julh","d'agost","de setembre","d'octobre","de novembre","de desembre",""],
                    namesAbbr: ["gen.","feb.","mar.","abr.","mai.","jun.","jul.","ag.","set.","oct.","nov.","des.",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"après Jèsus-Crist","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd,' lo 'd MMMM' de 'yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dddd,' lo 'd MMMM' de 'yyyy HH:mm",
                    F: "dddd,' lo 'd MMMM' de 'yyyy HH:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["oc"]);
    culture.calendar = culture.calendars.standard;
})(Globalization);