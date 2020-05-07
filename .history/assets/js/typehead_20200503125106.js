
var pf=[
  {
    "proje":"TAI",
    "no":"93100070001",
    "name":"DANIŞMANLIK HİZMETİ",
    "tip":"SERVİS VE HİZMETLER",
    "sinif":"DANIŞMANLIK ÇALIŞMANLIK"

  },
  {
    "proje":"TAI",
    "no":"93100070002",
    "name":"ÇALIŞMANLIK HİZMETİ",
    "tip":"SERVİS VE HİZMETLER",
    "sinif":"DANIŞMANLIK ÇALIŞMANLIK"
  },
  {
    "proje":"COM",
    "no":"76100010030",
    "name":"BOYA SOKUCU, TURCO 6776 LO",
    "tip":"KİMYASALLAR",
    "sinif":"ASİTLER VE BAZLAR"
  },
  {
    "proje":"COM",
    "no":"82100031543",
    "name":"TAMIR KITI, TORK ANAHTARI 1/2 IN. ICIN",
    "tip":"EL ALETLERİ VE AKSESUARLARI",
    "sinif":"MANUEL EL ALETLERİ VE AKSESUARLARI"
  },
  {
    "proje":"TAI",
    "no":"9110002121212",
    "name":"MASA ÇALIŞMA (75X250)",
    "tip":"İÇ/DIŞ ORTAM MALZEME VE EKİPMANLAR",
    "sinif":"MOBİLYA BEYAZ EŞYA VE MUTFAK MALZEMELERİ"
  },
  {
    "proje":"TAI",
    "no":"93100010469",
    "name":"YAZILIM, MICROSOFT PROJECT",
    "tip":"SERVİS VE HİZMETLER",
    "sinif":"YAZILIM"
  },
  {
    "proje":"HRJ",
    "no":"5810-3010-0220",
    "name":"MILLI IFF ALICI VERICI UNITESİ",
    "tip":"EKİPMAN",
    "sinif":"EKİPMAN"
  },
  {
    "proje":"THB",
    "no":"49380-02",
    "name":"WESCAM_CMX15D",
    "tip":"EKİPMAN",
    "sinif":"EKİPMAN"
  },
  {
    "proje":"A4M",
    "no":"727-0790-06",
    "name":"AAR PROBE LIGHT POWER SUPPLY UNIT",
    "tip":"EKİPMAN",
    "sinif":"EKİPMAN"
  }
]
$(document).ready(function() {
  var engine, template, empty;


  template = Handlebars.compile($("#result-template").html());
  empty = Handlebars.compile($("#empty-template").html());

  engine = new Bloodhound({
    identify: function(o) { return o.no; },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('proje','no','name', 'tip', 'sinif'),
    dupDetector: function(a, b) { return a.no === b.no; },
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

