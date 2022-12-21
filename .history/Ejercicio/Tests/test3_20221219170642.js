const { t, Selector, ClientFunction } = require("testcafe");
import XPathSelector from '../../../lib/xpath-selector';

let response;

fixture('test 3');

test('Rename device', async t => {

    response = await t.request({
        url: 'http://localhost:3000/devices/e8okoP2l5',
        method: 'PUT'
    });

    console.log(response);
    await t.expect(response.status).eql(200);
    await t.expect(response.statusText).eql('OK');  
});

test('get new list', async t => {

    response = await t.request({
        url: 'http://localhost:3000/devices',
        method: 'GET'
    });
    
    console.log(response.body);
    await t.expect(response.status).eql(200);
    await t.expect(response.statusText).eql('OK');    
});