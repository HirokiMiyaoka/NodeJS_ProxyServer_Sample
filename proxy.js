var stream   = require( 'stream' );
var http     = require( 'http' );

var settings = require('./config.json');

function ProxyServerStart( settings )
{
	var server = http.createServer();
	server.on( 'request', function ( request, response )
	{
		const options =
		{
			host: settings.to.host,
			port: settings.to.port,
			path: request.url,
			method: request.method,
			headers: request.headers,
		};
		delete options.headers[ 'host' ];
		delete options.headers[ 'accept-encoding' ];

		const hreq = http.request( options, ( res ) =>
		{
			const buftrans = new stream.Transform( { transform( chunk, encoding, callback ) { callback( null, chunk ); } } );

			res.pipe( buftrans );
			buftrans.on( 'data', ( chunk ) => { response.write( chunk ); } );
			buftrans.on( 'end', () => { response.end(); } );
			buftrans.on( 'error', ( error ) => { response.end(); } );
			Object.keys( res.headers ).forEach( ( key ) =>
			{
				response.setHeader( key, res.headers[ key ] );
			} );
		} );
		hreq.on( 'error', (e) =>
		{
			console.log('problem with request: ' + e.message );

		} );
		request.setEncoding( 'utf8' );
		request.on( 'data', ( data ) => {console.log(data); hreq.write( data ); } );
		request.on( 'end', () => { hreq.end(); } );
	} );

	console.log( settings.host + ( settings.from.port === 80 ?  '' : ':' + settings.from.port ) );
	server.listen( settings.from.port, settings.from.host );
}

console.log( settings );

ProxyServerStart( settings );
