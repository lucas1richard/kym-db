import beforeBulkCreate from '../../../../src/models/abbrev/hooks/beforeBulkCreate';

describe('abbrev beforeBulkCreate', () => {
  it('cleans up abbrevs', () => {
    const abbrevs = [{
      gmwt_desc1: '.5',
      gmwt_desc2: '.5',
      UserID: 1,
    }];
    beforeBulkCreate(abbrevs);
    expect(abbrevs[0]).toEqual({
      gmwt_desc1: '0.5',
      gmwt_desc2: '0.5',
      UserID: 1,
      user_uuid: 1,
    });
  });

  it('cleans up abbrevs with UserID === \'0\'', () => {
    const abbrevs = [{
      gmwt_desc1: '.5',
      gmwt_desc2: '.5',
      UserID: '0',
    }];
    beforeBulkCreate(abbrevs);
    expect(abbrevs[0]).toEqual({
      gmwt_desc1: '0.5',
      gmwt_desc2: '0.5',
      UserID: '0',
      user_uuid: null,
    });
  });
});
