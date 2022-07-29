const dns = require('dns');

dns.resolve4('sktalc.sktelecom.com', (err, addresses) => {
  if (err) throw err;

  console.log(`addresses: ${JSON.stringify(addresses)}`);

  addresses.forEach((a) => {
    dns.reverse(a, (err, hostnames) => {
      if (err) {
        throw err;
      }
      console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
    });
  });
});

dns.resolveNs('sktalc.sktelecom.com', (err, 
  addresses) => console.log('NS records: %j', addresses));


let options = {
      
    // Setting family as 6 i.e. IPv6
    family: 4,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
};
  
// Calling dns.lookup() for hostname geeksforgeeks.org
// and displaying them in console as a callback
dns.lookup('sktalc.sktelecom.com', options, (err, address, family) =>
        console.log('address: %j family: IPv%s', address, family));

// Setting options for dns.lookup() method
options = {
  // Setting family as 4 i.e. IPv4
  family: 4,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};

dns.lookup('sktalc.sktelecom.com', options, (err, address, family) => {
  console.log('address:', address);
  if(err){
    console.log(err.stack);
  } else{
    // Calling dns.lookupService() method 
    dns.lookupService(address, 80,
    (err, hostname, service) => {
      if(err){
          console.log(err.stack);
      }
      
      // Printing hostname and service
      // as callback
      console.log(hostname, service);
    });
  }
});
console.log("")
console.log("")
console.log("")
console.log(dns.getServers());