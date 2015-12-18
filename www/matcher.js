// Look up proper nouns in an article against a lookup table of proper nouns to URLs.
// If there's a match, link the proper noun to the URL.
// Uses jQuery.

// var example_lookup = {
//  'Kanye West': 'http://kanyewest.com/',
//  'Cherry Creek': 'http://preps.denverpost.com/schools/cherry-creek/10/',
//  'The Denver Post': 'http://www.denverpost.com/'
// }
//
// REGEXEs
// Matches proper nouns
// \b([A-Z][a-z]+)\s(([A-Z][a-z]+)\s?)+\b
//
// Matches proper nouns with multiple capitalizations and periods, i.e.
// LeSean McCoy and A.C. Newman.
// \b([A-Z]\.?[A-Z]?\.?[a-z]*[A-Z]?[a-z]*)\s(([A-Z][a-z]+)\s?)+\b

var matcher = {
    config: {
        dir: 'http://extras.denverpost.com/app/nouner/lookup/',
        elements: '#articleBody p, #articleBody td',
        section: 'broncos'
    },
    lookup: {},
    update_config: function (config) {
        // Take an external config object and update this config object.
        for ( var key in config )
        {
            if ( config.hasOwnProperty(key) )
            {
                this.config[key] = config[key];
            }
        }
    },
    regex: new RegExp(/\b([A-Z]\.?[A-Z]?\.?[a-z]*[A-Z]?[a-z]*)\s(([A-Z][a-z]+)\s?)+\b/gm),
    match: function() {
        $(this.config.elements).each( function() { 

            var text = $(this).html();
console.log(text);

            // IN CASE OF EXISTING LINKS
            // Remove all existing links, we don't want to link those.
            // To do this we loop through the element's child nodes, and if the child's
            // an anchor node we take the linked text and remove it from the text var.
            elem = this
            i = this.children.length;
            while ( i > 0 )
            {
                if ( this.children[i - 1].localName === 'a' )
                {
                    text = text.replace(this.children[i - 1].innerText);
                }
                i --;
            }

            var results = text.match(matcher.regex);

            if ( results !== null )
            {

                var count = results.length;
                var item;
                for ( var i = 0; i < count; i++ )
                {
                    item = results[i].trim()
                    if ( matcher.lookup.hasOwnProperty(item) )
                    {
                        // Replace the first instance of the text with the linked text,
                        // then remove the lookup from the object so we don't link it again.
                        $(this).html($(this).html().replace(item, '<a href="' + matcher.lookup[item] + '">' + item + '</a>'));

                        // We only want to link the name once,
                        // so we remove it from the lookup when we're done.
                        delete(matcher.lookup[item]);
                    }
                }
            }

        });

    },
    init: function () {

        // Config handling. External config objects must be named matcher_config
        if ( typeof window.matcher_config !== 'undefined' )
        {
            this.update_config(matcher_config);
        }

        $.getScript(this.config.dir + this.config.section + ".js", function()
        {
            matcher.match();
        });
        
    }
}
