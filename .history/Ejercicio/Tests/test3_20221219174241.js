const { t, Selector, ClientFunction } = require("testcafe");

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

test('verifi new device', async t => {

    response = await t.request({
        url: 'http://localhost:3000/devices/e8okoP2l5',
        method: 'GET'
    });
    
    console.log(response.body);
    await t.expect(xpathsele"//span[normalize-space()='Renamed-Device']").eql(response.body.device_name);    
});