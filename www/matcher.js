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
        dir: '//extras.denverpost.com/app/nouner/lookup/',
        elements: '',
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
        if ( typeof this.config.elements == 'string' ) this.config.elements = jQuery(this.config.elements);
        this.config.elements.each( function() { 

            var text = $(this).html();

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
                    text = text.replace(this.children[i - 1].innerText, '');
                }
                i --;
            }
            text = jQuery('<p>' + text + '</p>').text();


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
                        // Also make sure the instance we're replacing is text and not markup.
                        // THE PROBLEM IS WE'RE SEARCHING THE MARKUP NOT JUST THE TEXT AND SOMETIMES
                        // THE MARKUP CONTAINS HIDDEN ELEMENTS THAT HAVE PROPER NOUNS.
                        console.log(jQuery(this).html().indexOf(item), jQuery(this).html().lastIndexOf(item), text.indexOf(item), text.lastIndexOf(item), item);jQuery
                        // We compare the position of the item in the html vs. the text, and we also
                        // look up the last position of the item in the hmtl and the text.
                        // We do this because proper nouns are sometimes in chunk of markup more than once,
                        // and some of those times the proper nouns are in attributes of elements in the markup.
                        // Yea, this sounds weird.
                        // SO: If all these values are equal, the item's in there once.
                        // If first position html == first position text, and last position html == last position text,
                        // the item's in the text more than once and that's okay.
                        // BUT, if first pos html != last pos html, and first pos text == last pos text, and first pos text !== first pos html,
                        // THEN WE HAVE TEXT WE WOULD BE HYPERLINKING IN AN ELEMENT'S ATTRIBUTE.
                        // When that happens, we replace the last element not the first.
                        var firsthtml = jQuery(this).html().indexOf(item), lasthtml = jQuery(this).html().lastIndexOf(item), firsttext = text.indexOf(item), lasttext = text.lastIndexOf(item);
                        if ( firsthtml != lasthtml && firsttext == lasttext && firsttext !== firsthtml )
                        {
                            // This regex allows us to replace against the last instance of the item.
                            // If there are more than two instances of the proper noun and the actual textual one
                            // is in the middle, we are SCREWED.
                            var pattern = new RegExp(item + "(?!.*" + item + ")");
                            jQuery(this).html(jQuery(this).html().replace(pattern, '<a href="' + matcher.lookup[item] + '">' + item + '</a>'));
                        }
                        else jQuery(this).html(jQuery(this).html().replace(item, '<a href="' + matcher.lookup[item] + '">' + item + '</a>'));

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

        jQuery.getScript(this.config.dir + this.config.section + ".js", function()
        {
            matcher.match();
        });
        
    }
}
