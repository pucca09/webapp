exports.isInsidePolygon = function(pt, poly){
    
        for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)   
            ((poly[i].lat <= pt.lat && pt.lat < poly[j].lat) || (poly[j].lat <= pt.lat && pt.lat < poly[i].lat)) &&  
            (pt.lng < (poly[j].lng - poly[i].lng) * (pt.lat - poly[i].lat) / (poly[j].lat - poly[i].lat) + poly[i].lng) &&  
            (c = !c);  
        return c;

    
    
         
}