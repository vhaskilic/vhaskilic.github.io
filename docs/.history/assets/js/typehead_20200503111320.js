
var pf=[{"id":1,"id_str":"1","name":"VOLKAN","screen_name":"VOLKAN SCR","description":"DESCRIPTION","statuses_count":1,"friends_count":1,"followers_count":1,"profile_image_url_https":"https://pbs.twimg.com/profile_images/686436526696235008/t6hQ-EVj_normal.jpg"},{"id":2,"id_str":"2","name":"VOLKAN2","screen_name":"VOLKAN2 SCR","description":"DESCRIPTION2","statuses_count":2,"friends_count":2,"followers_count":2,"profile_image_url_https":"https://pbs.twimg.com/profile_images/686436526696235008/t6hQ-EVj_normal.jpg"}]
$(document).ready(function() {
  var engine, template, empty;


  template = Handlebars.compile($("#result-template").html());
  empty = Handlebars.compile($("#empty-template").html());

  engine = new Bloodhound({
    identify: function(o) { return o.id_str; },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name', 'screen_name'),
    dupDetector: function(a, b) { return a.id_str === b.id_str; },
    local: pf,
    remote: {
      url: 'http://www.google.com',
    }
  });

  // ensure default users are read on initialization
  engine.get('1', '2', '3', '4')

  function engineWithDefaults(q, sync, async) {
    if (q === '') {
      sync(engine.get('1', '2', '3', '4'));
      async([]);
    }

    else {
      engine.search(q, sync, async);
    }
  }

  $('#demo-input').typeahead({
    hint: $('.Typeahead-hint'),
    menu: $('.Typeahead-menu'),
    minLength: 0,
    classNames: {
      open: 'is-open',
      empty: 'is-empty',
      cursor: 'is-active',
      suggestion: 'Typeahead-suggestion',
      selectable: 'Typeahead-selectable'
    }
  }, {
    source: engineWithDefaults,
    displayKey: 'screen_name',
    templates: {
      suggestion: template,
      empty: empty
    }
  })
  .on('typeahead:asyncrequest', function() {
    $('.Typeahead-spinner').show();
  })
  .on('typeahead:asynccancel typeahead:asyncreceive', function() {
    $('.Typeahead-spinner').hide();
  })
  .on('typeahead:select', function(ev, suggestion) {
    console.log('Selection: ' + suggestion.name);
  });

});

