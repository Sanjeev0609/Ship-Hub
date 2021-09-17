var p = [0,0];
    function initMap() {
        const hub = {lat: 8.122808, lng: 77.321809};//8.122808, 77.321809
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: new google.maps.LatLng(8.120153, 77.321820)
        });
        markerhub = new google.maps.Marker({
          position : hub,
          map:map,
          label:"Hub"
        })



      marker = new google.maps.Marker({
        position : {lat:8.120153,lng:77.321820},//8.120153, 77.321820
        map: map,
        label:"21jph001",
        icon:"yacht.png"
      });
    
      const ship2 = {lat:8.087025,lng:77.424960};
      marker2 = new google.maps.Marker({
        position : ship2,//8.087025, 77.424960
        map: map,
        label:"21jph002",
        icon:"yacht.png",
        animation: google.maps.Animation.DROP
      });


      marker.setPosition(map.getCenter());


      var x = 0;

      map.addListener('click', function(e) {
        animatedMove(marker, .5, marker.position, e.latLng);
      });
    }
    google.maps.event.addDomListener(window, 'load', initMap);

    //google.maps.event.addListener(marker2)
    document.querySelector('#search').addEventListener('keypress',function(e){
        if(e.key==='Enter'){
            map.panTo(marker2.getPosition());
            if (marker2.getAnimation() !== null) {
                marker2.setAnimation(null);
              } else {
                marker2.setAnimation(google.maps.Animation.BOUNCE);
              }
            }
        
        });
    
// move marker from position current to moveto in t seconds
    function animatedMove(marker, t, current, moveto) {
      var lat = current.lat();
      var lng = current.lng();

      var deltalat = (moveto.lat() - current.lat()) / 100;
      var deltalng = (moveto.lng() - current.lng()) / 100;
  
      
      var delay = 300 * t;
  
      for (var i = 0; i < 100; i++) {
        
        (function(ind) {
          setTimeout(
            function() {
              
              var lat = marker.position.lat();
              var lng = marker.position.lng();
              lat += deltalat;
              lng += deltalng;
              
              
                p[0] = lat;
                p[1] = lng;
                
              
              //console.log(p[0]);
              
        //flightPlanCoordinates[1] = {lat:marker.getPosition().lat()+deltalat,lng:marker.getPosition().lng()+deltalng};
              
              latlng = new google.maps.LatLng(lat, lng);
              marker.setPosition(latlng);
              const flightPlanCoordinates = [
                { lat: 8.122808, lng: 77.321809 },
                { lat: p[0], lng: p[1] },
    
              ];
              
              const flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                geodesic: true,
                strokeColor: "#FFFFFF",
                strokeOpacity: 0.2,
                strokeWeight: 1,
              });
              flightPath.setMap(map);
              //flightPath.setMap(null);
              
            }, delay * ind
            
          );
          
        })(i)
        
      }
      
      
    
    }
    
    