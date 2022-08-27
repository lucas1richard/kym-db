import { USER } from '../../../foreignKeys';

/* eslint-disable no-param-reassign */

function beforeBulkCreate(abbrevs) {
  abbrevs.forEach((abbrev) => {
    if (abbrev.gmwt_desc1 && abbrev.gmwt_desc1.charAt(0) === '.') {
      abbrev.gmwt_desc1 = `0${abbrev.gmwt_desc1}`;
    }
    if (abbrev.gmwt_desc2 && abbrev.gmwt_desc2.charAt(0) === '.') {
      abbrev.gmwt_desc2 = `0${abbrev.gmwt_desc2}`;
    }
    if (abbrev.UserID) abbrev[USER] = abbrev.UserID;
    if (abbrev[USER] === '0') abbrev[USER] = null;
  });
}

export default beforeBulkCreate;
