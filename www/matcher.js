// Look up proper nouns in an article against a lookup table of proper nouns to URLs.
// If there's a match, link the proper noun to the URL.
// Uses jQuery.

// var example_lookup = {
//  'Kanye West': 'http://kanyewest.com/',
//  'Cherry Creek': 'http://preps.denverpost.com/schools/cherry-creek/10/',
//  'The Denver Post': 'http://www.denverpost.com/'
// }

var matcher = {
    config: {
        dir: 'http://extras.denverpost.com/app/nounmatch/lookup/',
        dir: 'lookup/',
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
    regex: new RegExp(/\b([A-Z][a-z]+)\s(([A-Z][a-z]+)\s?)+\b/gm),
    init: function () {

        // Config handling. External config objects must be named matcher_config
        if ( typeof window.matcher_config !== 'undefined' )
        {
            this.update_config(matcher_config);
        }

        return $.getScript(this.config.dir + this.config.file, function()
        {
            $('#articleBody p, #articleBody td').each( function() { 
              var results = $(this).text().match(matcher.regex);

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
        });
        
    }
}
