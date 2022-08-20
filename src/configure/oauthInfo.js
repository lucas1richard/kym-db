// const fitbitInfo = process.env.NODE_ENV === 'production'
//   ? {
//     clientID: '228KG4',
//     clientSecret: '472cb657341079a06f73ae8c96ac0e2c',
//     callbackURL: '/api/auth/fitbit/callback'
//   }
//   : {
//     clientID: '228PQF',
//     clientSecret: 'b2949530bb879d121ce359211eb283de',
//     callbackURL: '/api/auth/fitbit/callback'
//   };

const fitbitInfo = {
  clientID: process.env.FITBIT_CLIENT_ID,
  clientSecret: process.env.FITBIT_CLIENT_SECRET,
  callbackURL: process.env.FITBIT_CALLBACK_URL,
};

fitbitInfo.refreshBuffer = Buffer.from(`${fitbitInfo.clientID}:${fitbitInfo.clientSecret}`).toString('base64');

const googleInfo = {
  clientID: '996228923588-ma414rr4i6oumg6939tsv45kcn95imv4.apps.googleusercontent.com',
  clientSecret: '4XCnWYcRyxxeb3Xmldy_lIrF',
  callbackURL: '/api/auth/google/verify',
  // AWS credentials for google clientID:
  // '996228923588-7s60gcbgl6i98l525vv8ipmd6q2ka2f9.apps.googleusercontent.com',
  // clientSecret: '49kvsjJOhmOAtPi4_vf95nCq', callbackURL:
  // '/api/auth/google/verify'
};

export
  fitbitInfo,
  googleInfo,
};
