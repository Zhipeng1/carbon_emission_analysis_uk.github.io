mapboxgl.accessToken = 'pk.eyJ1IjoidWNmbmRqaSIsImEiOiJjanF6M3VjN2owOWdnNDJyemJwaTg2eWRnIn0.zGjL45699optNTcU_lAbBA';
    
function moveToMapPosition (master, clones) {
  var center = master.getCenter();
  var zoom = master.getZoom();
  var bearing = master.getBearing();
  var pitch = master.getPitch();

  clones.forEach(function (clone) {
    clone.jumpTo({
      center: center,
      zoom: zoom,
      bearing: bearing,
      pitch: pitch
    });
  });
}
function syncMaps () {
  var maps;
  var argLen = arguments.length;
  if (argLen === 1) {
    maps = arguments[0];
  } else {
    maps = [];
    for (var i = 0; i < argLen; i++) {
      maps.push(arguments[i]);
    }
  }
  var fns = [];
  maps.forEach(function (map, index) {
    fns[index] = sync.bind(null, map, maps.filter(function (o, i) { return i !== index; }));
  });

  function on () {
    maps.forEach(function (map, index) {
      map.on('move', fns[index]);
    });
  }

  function off () {
    maps.forEach(function (map, index) {
      map.off('move', fns[index]);
    });
  }
  function sync (master, clones) {
    off();
    moveToMapPosition(master, clones);
    on();
  }
  on();
}

var amap = new mapboxgl.Map({
    container: 'a',
    style: 'mapbox://styles/ucfndji/cjvruvrtu0tvz1coebat7uirx',
    center: [-0.1, 51.5], // initial map center in [lon, lat]
    zoom: 8.5
});

var bmap = new mapboxgl.Map({
    container: 'b',
    style: 'mapbox://styles/ucfndji/cjvrviml40uek1cs8o57la83a',
    center: [-0.1, 51.5], // initial map center in [lon, lat]
    zoom: 8.5
});
syncMaps(amap, bmap);


var overlay1 = document.getElementById('map-overlay1');
var overlay2 = document.getElementById('map-overlay2');


// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false
});

    
amap.on('load', function() {
    amap.addSource('Past', {
        "type": "vector",
        "url": "mapbox://ucfndji.5f5qq11l"
    });
    
    amap.addLayer({
        "id": "past-basemap",
        "type": "fill",
        "source": "Past",
        "source-layer": "1881-12jhla",
        "paint": {
            "fill-outline-color": "rgba(0,0,0,0.1)",
            "fill-color": "rgba(0,0,0,0.1)"
        }
    }); 
    
    amap.addLayer({
        "id": "past-highlighted",
        "type": "line",
        "source": "Past",
        "source-layer": "1881-12jhla",
        "paint": {   
            "line-color": "white",
            "line-opacity": 0.75,
            "line-width": 2
        },
        "filter": ["in", "name", ""]
    });
 
    amap.on('mousemove', 'past-basemap', function(e) {
        // Change the cursor style as a UI indicator.
        amap.getCanvas().style.cursor = 'pointer';
        var feature = e.features[0];
        overlay1.innerHTML = '';

        var title = document.createElement('strong');
        title.textContent = 'Area: ' + feature.properties.name;

        var employed = document.createElement('div');
        employed.textContent = 'Employed: ' + feature.properties.employed;
        var agri_fores = document.createElement('div');
        agri_fores.textContent = 'Agriculture Forestry and Fishing: ' + feature.properties.agri_fores;
        var energy_wat = document.createElement('div');
        energy_wat.textContent = 'Energy and Water: ' + feature.properties.energy_wat;
        var mining_man = document.createElement('div');
        mining_man.textContent = 'Mining and Manufacturing: ' + feature.properties.mining_man;
        var constructi = document.createElement('div');
        constructi.textContent = 'Construction: ' + feature.properties.constructi;
        var distributi = document.createElement('div');
        distributi.textContent = 'Distribution and Catering: ' + feature.properties.distributi;
        var transport_ = document.createElement('div');
        transport_.textContent = 'Transport and Communications: ' + feature.properties.transport_;
        var banking_fi = document.createElement('div');
        banking_fi.textContent = 'Banking and Finance: ' + feature.properties.banking_fi;
        var other = document.createElement('div');
        other.textContent = 'Other Services: ' + feature.properties.other;
        
        overlay1.appendChild(title);
        overlay1.appendChild(employed);
        overlay1.appendChild(agri_fores);
        overlay1.appendChild(energy_wat);
        overlay1.appendChild(mining_man);
        overlay1.appendChild(constructi);
        overlay1.appendChild(distributi);
        overlay1.appendChild(transport_);
        overlay1.appendChild(banking_fi);
        overlay1.appendChild(other);
        overlay1.style.display = 'block';

        // Add features that share the same county name to the highlighted layer.
        amap.setFilter('past-highlighted', ['in', 'name', feature.properties.name]);

        // Display a popup with the name of the county
       popup.setLngLat(e.lngLat)
            .setText(feature.properties.name)
            .addTo(amap);
    });

    amap.on('mouseleave', 'past-basemap', function() {
        amap.getCanvas().style.cursor = '';
        popup.remove();
        amap.setFilter('past-highlighted', ['in', 'name', '']);
        overlay1.style.display = 'none';
    });
});    



var toggleableLayerIdDict = 
{
    1: 'Employed',
    2:'Agriculture Forestry and Fishing',
    3:'Energy and Water', 
    4:'Mining and Manufacturing',
    5: 'Distribution and Catering',
    6:'Transport and Communications',
    7:'Banking and Finance',
    8: 'Other Services'

};    


$(document).ready(function(){
    $('#slideselect').formSelect();
    

});

$("#slideselect").on('change', function() {
    var newKey = $(this).val()
    var onLayer = toggleableLayerIdDict[newKey];
    var offList = Object.values(toggleableLayerIdDict).filter((e)=>{return e!=onLayer});

    offList.forEach((e)=>{
        amap.setLayoutProperty(e, 'visibility', 'none');
        bmap.setLayoutProperty(e, 'visibility', 'none');
    })

    amap.setLayoutProperty(onLayer, 'visibility', 'visible');
    bmap.setLayoutProperty(onLayer, 'visibility', 'visible');

})


bmap.on('load', function() {
    bmap.addSource('Current', {
        "type": "vector",
        "url": "mapbox://ucfndji.4b0q1w6p"
    });

    bmap.addLayer({
        "id": "current-basemap",
        "type": "fill",
        "source": "Current",
        "source-layer": "2011-1z4ap4",
        "paint": {
            "fill-outline-color": "rgba(0,0,0,0.1)",
            "fill-color": "rgba(0,0,0,0.1)"
        }
    }); 

    bmap.addLayer({
        "id": "current-highlighted",
        "type": "line",
        "source": "Current",
        "source-layer": "2011-1z4ap4",
        "paint": {   
            "line-color": "white",
            "line-opacity": 0.75,
            "line-width": 2
        },
        "filter": ["in", "name", ""]
    }); 
    
    bmap.on('mousemove', 'current-basemap', function(e) {
        bmap.getCanvas().style.cursor = 'pointer';
        var feature = e.features[0];
        overlay2.innerHTML = '';

        var title = document.createElement('strong');
        title.textContent = 'Area: ' + feature.properties.name;

        var employed = document.createElement('div');
        employed.textContent = 'Employed: ' + feature.properties.employed;
        
        var agri_fores = document.createElement('div');
        agri_fores.textContent = 'Agriculture Forestry and Fishing: ' + feature.properties.agri_fores;
        var energy_wat = document.createElement('div');
        energy_wat.textContent = 'Energy and Water: ' + feature.properties.energy_wat;
        var mining_man = document.createElement('div');
        mining_man.textContent = 'Mining and Manufacturing: ' + feature.properties.mining_man;
        var constructi = document.createElement('div');
        constructi.textContent = 'Construction: ' + feature.properties.constructi;
        var distributi = document.createElement('div');
        distributi.textContent = 'Distribution and Catering: ' + feature.properties.distributi;
        var transport_ = document.createElement('div');
        transport_.textContent = 'Transport and Communications: ' + feature.properties.transport_;
        var banking_fi = document.createElement('div');
        banking_fi.textContent = 'Banking and Finance: ' + feature.properties.banking_fi;
        var other = document.createElement('div');
        other.textContent = 'Other Services: ' + feature.properties.other;
        
        overlay2.appendChild(title);
        overlay2.appendChild(employed);
        overlay2.appendChild(agri_fores);
        overlay2.appendChild(energy_wat);
        overlay2.appendChild(mining_man);
        overlay2.appendChild(constructi);
        overlay2.appendChild(distributi);
        overlay2.appendChild(transport_);
        overlay2.appendChild(banking_fi);
        overlay2.appendChild(other);
        overlay2.style.display = 'block';


        // Add features that share the same county name to the highlighted layer.
        bmap.setFilter('current-highlighted', ['in', 'name', feature.properties.name]);

        // Display a popup with the name of the county
       popup.setLngLat(e.lngLat)
            .setText(feature.properties.name)
            .addTo(bmap);
    });

    bmap.on('mouseleave', 'current-basemap', function() {
        bmap.getCanvas().style.cursor = '';
        popup.remove();
        bmap.setFilter('current-highlighted', ['in', 'name', '']);
        overlay2.style.display = 'none';
    });
});
    
    
///chart start
var data1=[41.3,1.4,0.3,8,4.6,10.1,4,30.3];
var data2=[3.3,0.1,0.6,6.4,18.9,11.8,27.4,31.5];

var option= {
    responsive: false,
    legend: {
        display: false
    },
    title: {
        display: false,
    },
    tooltips: {enabled: false},
};

var color = ["rgba(90,169,204,0.8)", "rgba(21,113,153,0.8)", "rgba(138,255,227,0.8)", "rgba(255,187,179,0.8)", "rgba(204,90,108,0.8)", "rgba(30,153,21,0.8)", 'rgba(210,179,255,0.8)','rgba(153,28,22,0.8)']

var ctx1 = $('#subchart1')[0].getContext('2d');
var ctx2 = $('#subchart2')[0].getContext('2d');

var chart1 = new Chart(ctx1, {
    type: 'horizontalBar',
    data: {
        labels:["Mining and Manufacturing", "Agriculture Forestry and Fishing", "Energy and Water", "Construction", "Distribution and Catering", "Transport and Communications", "Banking and Finance", "Other Services"],
        datasets: [
            {
                datalabels: {
                    color: '#000000',
                    anchor:'end',
                    align:'end'
                },
                label: 'Rate',
                data: data1,
                backgroundColor: color
            }
        ]
    },
    options: option
});


var chart2 = new Chart(ctx2, {
    type: 'horizontalBar',
    data: {
        labels:["Mining and Manufacturing", "Agriculture Forestry and Fishing", "Energy and Water", "Construction", "Distribution and Catering", "Transport and Communications", "Banking and Finance", "Other Services"],
        datasets: [
            {
                datalabels: {
                    color: '#000000',
                    anchor:'end',
                    align:'end'
                },
                label: 'Rate',
                data: data2,
                backgroundColor: color
            }
        ]
    },
    options: option
});

/*
    
Highcharts.chart('container1', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'London Employment Industry (1881)'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },



    series: [{
        name: 'Industry (1881)',
        colorByPoint: true,
        data: [{
            name: 'Mining and Manufacturing',
            y: 41.3,
            sliced: true,
            selected: true
        },{
            name: 'Agriculture Forestry and Fishing',
            y: 1.4,
        },{
            name: 'Energy and Water',
            y: 0.3
        },  {
            name: 'Construction',
            y: 8
        }, {
            name: 'Distribution and Catering',
            y: 4.6
        }, {
            name: 'Transport and Communications',
            y: 10.1
        }, {
            name: 'Banking and Finance',
            y: 4
        },{
            name: 'Other Services',
            y: 30.3,
        } ]
    }]
});
    
    
Highcharts.chart('container2', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'London Employment Industry (2011)'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Industry (2011)',
        colorByPoint: true,
        data: [{
            name: 'Banking and Finance',
            y: 27.4,
            sliced: true,
            selected: true
        },{
            name: 'Agriculture Forestry and Fishing',
            y: 0.1,
        },{
            name: 'Energy and Water',
            y: 0.6
        },  {
            name: 'Mining and Manufacturing',
            y: 3.3
        },{
            name: 'Construction',
            y: 6.4
        }, {
            name: 'Distribution and Catering',
            y: 18.9
        }, {
            name: 'Transport and Communications',
            y: 11.8
        }, {
            name: 'Other Services',
            y: 31.5,
        } ]
    }]
});



*/