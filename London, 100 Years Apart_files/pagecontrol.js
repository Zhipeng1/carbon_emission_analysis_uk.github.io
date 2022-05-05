



var apikey='a7929450b9fa95c1f85a586a20bb805b';

function shuffle(array) {
    /*
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    */
  
    return array;
  }
  

var getSearch = function(keyword, minyear, maxyear){
    console.log('searching' +keyword+minyear+maxyear)
    var base = 'https://api.flickr.com/services/rest';
    var format = 'json';
    var mindate = new Date(minyear,0,1).getTime()/1000
    var maxdate = new Date(maxyear,0,1).getTime()/1000

    var url = base +'/?method=flickr.photos.search&nojsoncallback=1&api_key='+ apikey + '&text='+keyword + '&format=' + format + '&woe_id=23416974&orientation=landscape%2Cpanorama&safesearch=1&content_type=1&sort=relevance&min_taken_date='+mindate+'&max_taken_date='+maxdate+'&license=1,2,3,4,5,6,8,9,10';

    return fetch(url);
}

var fetchPhoto = function(keyword, minyear, maxyear){
    return getSearch(keyword,minyear,maxyear)
    .then((result)=>{
        return result.json()    
    }).then((result)=>{
        return shuffle(result.photos.photo).slice(0,3).map((e)=>{
            return {
                id: e.id,
                secret: e.secret,
                url: 'https://farm'+ e.farm + '.staticflickr.com/'+e.server+'/'+e.id+'_'+ e.secret + '_n.jpg'
            
            }
        })
    })

}

$(document).ready(function(){
    $('#slidetwoselect').formSelect();

    $('#slideWrapper').fullpage({
        sectionsColor: ['#ffffff', '#a9a9a9', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'], // page background
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
        menu: '#menu',
    });


  });

  /* possible options
<option value="1" selected>Employment Rate of All Population</option>
<option value="2">Employment Rate of Women</option>
<option value="3">Employment Rate in Mining and Manufacturing</option>
<option value="4">Employment Rate in Banking and Finance</option>
<option value="5">Marriage Rate of All Population</option>
  */

var opValDict = {
    1: 'job',
    2: 'women',
    3: 'london factory',
    4: 'bank',
    5: 'family'    
};

var opDataDict = {
    1: {
        main: "EconomicallyActiveRate",
        change: "EconomicallyActiveRateChange"    
    },
    2:{
        main: "EconomicallyActiveRateWomen",
        change: "EconomicallyActiveRateWomenChange"
        
    },
    3:{
        main: "EmpRateMiningManufact",
        change: "EmpRateMiningManufactChange"
        
    },
    4:{
        main: "EmpRateBanking",
        change: "EmpRateBankingChange"
        
    },
    5:{
        main: "MarriageRate",
        change: "MarriageRateChange"   
    }
}

var yearDict = {
    old: [1881, 1891, 1901, 1911],
    new: [1981, 1991, 2001, 2011]
}

var axisDict = {
    'Year': 'x',
    'Rate': 'y'
}


var textStruct = {
    1: {
        old: 'The overall employment rate stays rather static between 67.12% and 68.53%.',
        new: 'The rate makes a rapid increase consistently over 40 years with a small dip of -0.79% between 1981 and 1991.',
    },
    2: {
        old: 'The female employment rate between 1881 and 1911 remains around 44%, and until the start of 1900, the female participation in economic activity does not pick up.',
        new: 'Female participation in the job market makes a drastic increase, contributing to the overall employment rate increase.',
    },
    3: {
        old: 'London serves as one of the epicentres of manufacturing boom, peaking the rate of employment in mining and manufacturing at 20.59% in 1901.',
        new: 'Transition to service industry has been ongoing throughout this period, but in 1980s, dramatic decrease of -7.43% is observed.',
    },
    4: {
        old: 'Professional job as a banker barely existed back 100 years ago although it is making a gradual increase to 3.12% in 1911.',
        new: 'Pivoting to the new service sector in London was mainly in finance and banking sector. Just over 20 years between 1981 and 2001, 14.54% of London population gained more jobs in the sector.',
    },
    5: {
        old: 'As the age structure of population was skewed towards younger people, the marriage rate in this period remains low between 33.39% and 35.68%.',
        new: 'Although the rate has been significantly higher at the start of 1981, now the marriage rate is back at the level back in late 1800s, at 34.83%.'
    }
};

var flickrLicenseList = {
    "licenses": {
        "license": [
            {
                "id": "0",
                "name": "All Rights Reserved",
                "url": ""
            },
            {
                "id": "4",
                "name": "Attribution License",
                "url": "https://creativecommons.org/licenses/by/2.0/"
            },
            {
                "id": "6",
                "name": "Attribution-NoDerivs License",
                "url": "https://creativecommons.org/licenses/by-nd/2.0/"
            },
            {
                "id": "3",
                "name": "Attribution-NonCommercial-NoDerivs License",
                "url": "https://creativecommons.org/licenses/by-nc-nd/2.0/"
            },
            {
                "id": "2",
                "name": "Attribution-NonCommercial License",
                "url": "https://creativecommons.org/licenses/by-nc/2.0/"
            },
            {
                "id": "1",
                "name": "Attribution-NonCommercial-ShareAlike License",
                "url": "https://creativecommons.org/licenses/by-nc-sa/2.0/"
            },
            {
                "id": "5",
                "name": "Attribution-ShareAlike License",
                "url": "https://creativecommons.org/licenses/by-sa/2.0/"
            },
            {
                "id": "7",
                "name": "No known copyright restrictions",
                "url": "https://www.flickr.com/commons/usage/"
            },
            {
                "id": "8",
                "name": "United States Government Work",
                "url": "http://www.usa.gov/copyright.shtml"
            },
            {
                "id": "9",
                "name": "Public Domain Dedication (CC0)",
                "url": "https://creativecommons.org/publicdomain/zero/1.0/"
            },
            {
                "id": "10",
                "name": "Public Domain Mark",
                "url": "https://creativecommons.org/publicdomain/mark/1.0/"
            }
        ]
    },
    "stat": "ok"
}

var flickrLicenseDict = flickrLicenseList.licenses.license.reduce((acc, curr)=>{acc[curr.id]= curr.name; return acc}, {});

/// initialise photo
var oldPhotos = fetchPhoto(opValDict[1], 1880, 1920);
var newPhotos = fetchPhoto(opValDict[1], 1980, 2010);

var fetchAttribute = function(arr){
    var base = 'https://api.flickr.com/services/rest';
    var format = 'json';

    urllist = arr.map((e)=>{
        return fetch(base +'/?method=flickr.photos.getInfo&nojsoncallback=1&api_key='+ apikey + '&photo_id=' + e.id + '&secret=' +e.secret + '&format=' + format) ;
    })
    
    return Promise.all(urllist);
};

oldPhotos.then((a)=>{
    a.forEach((e,n)=>{
        $('#old-'+n).attr('src', e.url)
    })

    fetchAttribute(a).then((arr)=>{
        return Promise.all(arr.map((e)=>{return e.json()}));
    }).then((arr)=>{
        var info = arr.map((e)=>{
            return {license: flickrLicenseDict[e.photo.license], username: e.photo.owner.username}
        })

        finalinfo = _.uniqWith(info, _.isEqual).map((e)=>{
            return 'Photo by '+e.username +' under '+e.license;
        })
        finalinfo.forEach((e)=>{
            $('#old-intro').before('<p class="credit">'+ e +'</p>');
        })
    })

    
});
    
    
newPhotos.then((a)=>{
    a.forEach((e,n)=>{
        $('#new-'+n).attr('src', e.url)
    })

    fetchAttribute(a).then((arr)=>{
        return Promise.all(arr.map((e)=>{return e.json()}));
    }).then((arr)=>{
        var info = arr.map((e)=>{
            return {license: flickrLicenseDict[e.photo.license], username: e.photo.owner.username}
        })

        finalinfo = _.uniqWith(info, _.isEqual).map((e)=>{
            return 'Photo by '+e.username +' under '+e.license;
        })

        finalinfo.forEach((e)=>{
            $('#new-intro').before('<p class="credit">'+ e +'</p>');
        })
    })
});

var data_loaded;


var processData = function(dictPos, data){
    var currentDict = opDataDict[dictPos];
    var graphdata = [...data];

    var main = graphdata.filter((e)=>{return e['Label']==currentDict.main})
    var change = graphdata.filter((e)=>{return e['Label']==currentDict.change})

    var mainConverted= _.chain(main).map((e)=>{return _.mapKeys(e, (v,k)=>{return axisDict[k]});}).map((e)=>{return {x: parseInt(e.x), y: parseFloat(e.y)}}).value();        
    var changeConverted= _.chain(change).map((e)=>{return _.mapKeys(e, (v,k)=>{return axisDict[k]});}).map((e)=>{return {x: parseInt(e.x), y: parseFloat(e.y)}}).value();

    var mainConOld = mainConverted.filter((e)=>{return _.includes(yearDict.old, e.x)});
    var mainConNew = mainConverted.filter((e)=>{return _.includes(yearDict.new, e.x)});
    var mainChgOld = changeConverted.filter((e)=>{return _.includes(yearDict.old, e.x)});
    var mainChgNew = changeConverted.filter((e)=>{return _.includes(yearDict.new, e.x)});


    return {currentDict: currentDict, 
        mainConOld: mainConOld,
         mainConNew:  mainConNew,
          mainChgOld:  mainChgOld,
           mainChgNew: mainChgNew};

}

var chartOption = function(inputmin, inputmax, title) {
    return {
    legend: {
        display: false
    },            
    responsive: true,
    aspectRatio: 1.3,
    title: {
        display: true,
        text: title
    },
    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';
                if (label) {
                    label += ': ';
                }
                label +=  (tooltipItem.yLabel * 100).toFixed(2)
                label += '%';
                return label;
            },
        }
    },
    hover: {
        mode: 'nearest',
        intersect: true
    },
    scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Year'
            }
        }],
        yAxes: [{
            display: true,
            
            ticks: {
                min: inputmin,
                max: inputmax,// Your absolute max value
                maxTicksLimit:7,
                callback: function (value) {
                return (value * 100).toFixed(2) + '%'; // convert it to percentage
                },
            },
            scaleLabel: {
                display: true,
                labelString: 'Rate'
            }
        }]
    }
}};

var chart1, chart2, chart3, chart4;

/// initialise chart
fetch('asset/graph_data.csv')
    .then((e)=>{
        return e.text()
    })
    .then((e)=>{
        return csv().fromString(e)
    }).then((e)=>{
        ///data here
        data_loaded = e;
        
        ///give a default key 1 and send for data proc
        var finaldata = processData(1, data_loaded)

        // draw canvas
        var ctx1 = $('#mainchart1')[0].getContext('2d');
        var ctx2 = $('#mainchart2')[0].getContext('2d');
        var ctx3 = $('#mainchart3')[0].getContext('2d');
        var ctx4 = $('#mainchart4')[0].getContext('2d');


        var stat ={
            ratemin: _.min([_.minBy(finaldata.mainConOld, 'y').y, _.minBy(finaldata.mainConNew, 'y').y]),
            ratemax: _.max([_.maxBy(finaldata.mainConOld, 'y').y, _.maxBy(finaldata.mainConNew, 'y').y]),
            chgmin: _.min([_.minBy(finaldata.mainChgOld, 'y').y, _.minBy(finaldata.mainChgNew, 'y').y]),
            chgmax: _.max([_.maxBy(finaldata.mainChgOld, 'y').y, _.maxBy(finaldata.mainChgNew, 'y').y]),

        }

        chart1 = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: yearDict.old,
                datasets: [
                    {
                        label: 'Rate',
                        data: finaldata.mainConOld,
                        fill: 'none'
                    }
                ]
            },
            options: chartOption(stat.ratemin,stat.ratemax, 'Rate')
        });

        chart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: yearDict.old,
                datasets: [
                    {
                        label: 'Rate',
                        data: finaldata.mainChgOld
                    }
                ]
            },
            options: chartOption(stat.chgmin,stat.chgmax, 'Change Rate')
        });

        chart3 = new Chart(ctx3, {
            type: 'line',
            data: {
                labels: yearDict.new,
                datasets: [
                    {
                        label: 'Rate',
                        data: finaldata.mainConNew,
                        fill: 'none'
                    }
                ]
            },
            options: chartOption(stat.ratemin,stat.ratemax, 'Rate')
        });        

        chart4 = new Chart(ctx4, {
            type: 'line',
            data: {
                labels: yearDict.new,
                datasets: [
                    {
                        label: 'Rate',
                        data: finaldata.mainChgNew
                    }
                ]
            },
            options: chartOption(stat.chgmin,stat.chgmax, 'Change Rate')
        });        


    })

    
  //// listen to the selector change
$("#slidetwoselect").on('change', function() {

    var newKey = $(this).val()
    var oldPhotos = fetchPhoto(opValDict[newKey], 1880, 1920);
    var newPhotos = fetchPhoto(opValDict[newKey], 1980, 2010);
    
    $('.credit').remove();


    oldPhotos.then((a)=>{

        console.log(a);
        a.forEach((e,n)=>{
            $('#old-'+n).attr('src', e.url)
        })


        fetchAttribute(a).then((arr)=>{
            return Promise.all(arr.map((e)=>{return e.json()}));
        }).then((arr)=>{
            var info = arr.map((e)=>{
                return {license: flickrLicenseDict[e.photo.license], username: e.photo.owner.username}
            })
    
            finalinfo = _.uniqWith(info, _.isEqual).map((e)=>{
                return 'Photo by '+e.username +' under '+e.license;
            })
            finalinfo.forEach((e)=>{
                $('#old-intro').before('<p class="credit">'+ e +'</p>');
            })
        })
    
    });
        
        
    newPhotos.then((a)=>{
        console.log(a);

        a.forEach((e,n)=>{
            $('#new-'+n).attr('src', e.url)
        });


        fetchAttribute(a).then((arr)=>{
            return Promise.all(arr.map((e)=>{return e.json()}));
        }).then((arr)=>{
            var info = arr.map((e)=>{
                return {license: flickrLicenseDict[e.photo.license], username: e.photo.owner.username}
            })
    
            finalinfo = _.uniqWith(info, _.isEqual).map((e)=>{
                return 'Photo by '+e.username +' under '+e.license;
            })
            finalinfo.forEach((e)=>{
                $('#new-intro').before('<p class="credit">'+ e +'</p>');
            })
        })    
    });

  ///give a default key 1 and send for data proc
  var finaldata = processData(newKey, data_loaded)

  var stat ={
      ratemin: _.min([_.minBy(finaldata.mainConOld, 'y').y, _.minBy(finaldata.mainConNew, 'y').y]),
      ratemax: _.max([_.maxBy(finaldata.mainConOld, 'y').y, _.maxBy(finaldata.mainConNew, 'y').y]),
      chgmin: _.min([_.minBy(finaldata.mainChgOld, 'y').y, _.minBy(finaldata.mainChgNew, 'y').y]),
      chgmax: _.max([_.maxBy(finaldata.mainChgOld, 'y').y, _.maxBy(finaldata.mainChgNew, 'y').y]),

  }
  console.log(chart1)

  chart1.data.datasets=[{ label: 'Rate',data: finaldata.mainConOld,fill: 'none'}];
  chart1.options=chartOption(stat.ratemin,stat.ratemax, 'Rate');
  chart1.update();


  chart2.data.datasets=[{ label: 'Rate',data: finaldata.mainChgOld}];
  chart2.options=chartOption(stat.chgmin,stat.chgmax, 'Change Rate');
  chart2.update();

  
  chart3.data.datasets=[{ label: 'Rate',data: finaldata.mainConNew,fill: 'none'}];
  chart3.options=chartOption(stat.ratemin,stat.ratemax, 'Rate');
  chart3.update();

  
  chart4.data.datasets=[{ label: 'Rate',data: finaldata.mainChgNew}];
  chart4.options=chartOption(stat.chgmin,stat.chgmax, 'Change Rate');
  chart4.update();

  $('#old-intro').text(textStruct[newKey].old);
  $('#new-intro').text(textStruct[newKey].new);


});



