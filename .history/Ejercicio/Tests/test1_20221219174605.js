const { t, Selector, ClientFunction } = require("testcafe");
import XPathSelector from '../../../lib/xpath-selector';

let response;
let body;

fixture('test 1');

test.skip('Get Devices List', async t => {

    response = await t.request({
        url: 'http://localhost:3000/devices',
        method: 'GET'
    });

    console.log( response.body);
    await t.expect(response.status).eql(200);
    await t.expect(response.statusText).eql('OK');
});

test.skip.page('http://localhost:3001/')('Verifi list in UI', async t => {

    response = await t.request({
        url: 'http://localhost:3000/devices',
        method: 'GET'
    }); 

    body = response.body;
        
        body.forEach( async device => {                 
        
            const device_name = XPathSelector(`//span[normalize-space()=${device.system_name}]`);
            console.log(device_name.innerText);
            await t.expect(device_name.innerText).eql(device.system_name);

            const device_type = XPathSelector(`//span[normalize-space()=${device.type}]`);
            console.log(device_type.innerText);
            await t.expect(device_name.innerText).eql(device.type);

            const device_hdd = XPathSelector(`//span[normalize-space()=${device.hdd_capacity} GB]`);
            console.log(device_hdd.innerText);
            await t.expect(device_name.innerText).eql(device.hdd_capacity);
                
    }); 
});

test.page('http://localhost:3001/')('Button in UI', async t => {

    response = await t.request({
        url: 'http://localhost:3000/devices',
        method: 'GET'
    });
    
    response.body.forEach( async device => {        
        
        const IDdevice = device.id;

        const editBtn = Selector(`a[href="/devices/edit/${IDdevice}"]`);
        const editBtnText = await editBtn.innerText;

        console.log(`${device.id} + ${editBtnText}`);
        t.expect(editBtnText).eql('EDIT');
        
    }); 
});