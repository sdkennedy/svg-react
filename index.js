var basename = require("path").basename,
    changeCase = require('change-case'),
    FS = require("q-io/fs"),
    Q = require("q"),
    parseXmlString = Q.denodeify( require('xml2js').parseString ),
    _ = require("underscore");

var elements = {
    circle:"D.circle",
    defs:"D.defs",
    ellipse:"D.ellipse",
    g:"D.g",
    line:"D.line",
    linearGradient:"D.linearGradient",
    mask:"D.mask",
    path:"D.path",
    pattern:"D.pattern",
    polygon:"D.polygon",
    polyline:"D.polyline",
    radialGradient:"D.radialGradient",
    rect:"D.rect",
    stop:"D.stop",
    svg:"D.svg",
    text:"D.text",
    tspan:"D.tspan"
};
var attributes = ["cx", "cy", "d", "dx", "dy", "fill", "fillOpacity", "fontFamily", "fontSize", "fx", "fy", "gradientTransform",
"gradientUnits", "markerEnd", "markerMid", "markerStart", "offset", "opacity",
"patternContentUnits", "patternUnits", "points", "preserveAspectRatio", "r", "rx", "ry",
"spreadMethod", "stopColor", "stopOpacity", "stroke", "strokeDasharray", "strokeLinecap",
"strokeOpacity", "strokeWidth", "textAnchor", "transform", "version", "viewBox", "x1", "x2", "x", "y1", "y2", "y"];

//Filesystem
var isSvg = function( path ){ return path.substr( -4 ) === ".svg"; };
var findFiles = (function(){
    var getDirectorySVGs = function( dirPath ){
        return FS.list(dirPath).
            then(function( files ){
                return files
                    .filter( isSvg )
                    .map( function( filename ){ return dirPath+"/"+filename; } );
            });
    };
    return function( path ){
        return FS.stat( path ).
            then(function( stat ){
                if( stat.isDirectory() ){
                    return getDirectorySVGs( path );
                } else if ( stat.isFile() && isSvg(path) ){
                    return [ path ];
                } else {
                    return [];
                }
            });
    };
})();

//SVG Parsing
var svgToComponent = function( dst, src ){
    var name, componentPath;

    name = basename(src);
    name = name.substr(0, name.length-4 );
    componentPath = dst+"/"+name+"-icon.coffee";

    return FS.read(src).
        then( parseXmlString ).
        then( parseRoot ).
        //Element is placed into template 3 tabs deep
        then( elementToString.bind(null, 3) ).
        then( renderTemplate.bind(null, name) ).
        then( function(body){
            return FS.write(componentPath, body);
        } );
    };
var parseRoot = function( obj ){
    return parseElement( 'svg', obj['svg'] );
};
var parseElement = function( key, node ){
    if( elements[key] ){
        return {
            name:elements[key],
            attributes:validAttributes( node.$ ),
            children:parseChildren( node )
        };
    }
};
var validAttributes = function(obj){
    if( !obj ) return {};
    return _.reduce(
        obj,
        function(acc, val, key){
            if( attributes.indexOf(key) !== -1 ){
                acc[key] = val;
            }
            return acc;
        },
        {}
    );
};
var parseChildren = function( node ){
    if( !node ) return [];
    return _.reduce(
        node,
        function(acc, children, key){
            if( elements[key] ){
                var result = acc.concat(
                    children.map(function(child){ return parseElement(key, child); })
                );
                return result;
            }
            return acc;
        },
        []
    );
};

//Rendering Functions
var elementToString = function( depth, el ){
    var output = wsp(depth) + el.name;

    if( Object.keys(el.attributes).length === 0 && el.children.length === 0 ){
        return output + "()\n";
    } else {
        output += "(\n";
    }

    // Output attributes
    if( Object.keys(el.attributes).length === 0 ){
        output += wsp(depth+1) + "{},\n";
    } else {
        output = _.reduce(
            el.attributes,
            function(acc, val, key){
                acc += wsp(depth+1) + key + ': "' + val + "\"\n";
                return acc;
            },
            output
        );
    }
    // Output children
    output = _.reduce(
        el.children,
        function(acc, child){
            acc += elementToString(depth+1, child);
            return acc;
        },
        output
    );

    output += wsp(depth) + ")\n";

    return output;
};
var wsp = function( depth ){
    var i, output;
    output = '';
    for( i=0; i<depth; i++){
        output += '    ';
    }
    return output;
};
var renderTemplate = function( name, svgString ){
    var componentName = changeCase.pascalCase(name) + "Icon";
    return FS.read( "./component.tpl" ).
        then(function( templateStr ){
            try{
                var template = _.template( templateStr );
                var data = { componentName:componentName, svgString:svgString };
                return template(data);
            } catch( e ){
                return e;
            }
        });
};

var src = process.argv[2];
var dst = process.argv[3];
findFiles( src ).
    // Process SVGs and save as components
    then(function( files ){
        var promises = files.map( svgToComponent.bind(null, dst) );
        return Q.all( promises );
    }).
    fail( console.log );

