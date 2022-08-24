import { USER } from '../../../foreignKeys';

/* eslint-disable no-param-reassign */

function beforeBulkCreate(abbrevs) {
  abbrevs.forEach((abbrev) => {
    if (abbrev.gmWt_desc1 && abbrev.gmWt_desc1.gmWt_desc1 && abbrev.gmWt_desc1.gmWt_desc1.charAt(0) === '.') {
      abbrev.gmWt_desc1 = `0${abbrev.gmWt_desc1}`;
    }
    if (abbrev.gmWt_desc2 && abbrev.gmWt_desc2.gmWt_desc2 && abbrev.gmWt_desc2.gmWt_desc2.charAt(0) === '.') {
      abbrev.gmWt_desc2 = `0${abbrev.gmWt_desc2}`;
    }
    if (abbrev.UserID) abbrev[USER] = abbrev.UserID;
    if (abbrev[USER] === '0') abbrev[USER] = null;
  });
}

export default beforeBulkCreate;
